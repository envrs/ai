import type {
  HarnessV1NetworkSandboxSession,
  HarnessV1SandboxProvider,
} from '@ai-toolkit/harness';
import type { Experimental_SandboxSession as SandboxSession } from '@ai-toolkit/provider-utils';
import { Sandbox } from '@khulnasoft/sandbox';
import { KhulnasoftNetworkSandboxSession } from './khulnasoft-network-sandbox-session';
import { KhulnasoftSandboxSession } from './khulnasoft-sandbox-session';
import {
  KHULNASOFT_PROVIDER_ID,
  createLiveSandboxFromSnapshot,
  ensureTemplateSnapshot,
  getSandboxLookupParams,
  withKhulnasoftSandboxAuthenticationError,
  withDefaultSandboxSettings,
  type BaseCreateSandboxParams,
} from './utils';

type KhulnasoftSandboxCreateParams = NonNullable<
  Parameters<typeof Sandbox.create>[0]
>;

type DistributiveOmit<T, K extends keyof any> = T extends unknown
  ? Omit<T, K>
  : never;

type KhulnasoftSandboxCreationSettings = DistributiveOmit<
  KhulnasoftSandboxCreateParams,
  'onResume'
> & {
  sandbox?: never;
  name?: string;
};

/**
 * Settings for `createKhulnasoftSandbox`. Two mutually-exclusive shapes:
 *
 * - `{ sandbox }` — wrap an already-created `@khulnasoft/sandbox` `Sandbox`. The
 *   caller owns its lifecycle; the provider's `stop()` and `destroy()` are
 *   no-ops.
 * - {@link KhulnasoftSandboxCreateParams} fields — provider creates the underlying
 *   sandbox. When the adapter declares a bootstrap recipe the provider uses
 *   `Sandbox.getOrCreate` to maintain a persistent named template snapshot
 *   keyed by the recipe identity, and forks an ephemeral sandbox per session
 *   from the snapshot. Use `name` to override the auto-derived template name.
 *
 * @deprecated Use `KhulnasoftNetworkSandboxSessionCreateOptions` for new sessions.
 */
export type KhulnasoftSandboxSettings =
  | { sandbox: Sandbox }
  | KhulnasoftSandboxCreationSettings;

const SESSION_NAME_PREFIX = 'ai-toolkit-harness-session';

function sessionSandboxName(sessionId: string): string {
  return `${SESSION_NAME_PREFIX}-${sessionId}`;
}

/** @deprecated Use `createKhulnasoftNetworkSandboxSession` instead. */
export function createKhulnasoftSandbox(
  settings: KhulnasoftSandboxSettings = {} as KhulnasoftSandboxSettings,
): HarnessV1SandboxProvider {
  console.warn(
    'createKhulnasoftSandbox is deprecated. Use createKhulnasoftNetworkSandboxSession and HarnessAgent.createSession({ sandboxSession }) instead.',
  );
  return new KhulnasoftSandboxProvider(settings);
}

/**
 * `HarnessV1SandboxProvider` implementation backed by `@khulnasoft/sandbox`.
 * Construct one via {@link createKhulnasoftSandbox} at module scope and pass it
 * to a `HarnessAgent` (or call `createSession()` directly if you want raw
 * access to a network sandbox session).
 */
/** @deprecated Use `createKhulnasoftNetworkSandboxSession` instead. */
export class KhulnasoftSandboxProvider implements HarnessV1SandboxProvider {
  readonly specificationVersion = 'harness-sandbox-v1' as const;
  readonly providerId = KHULNASOFT_PROVIDER_ID;

  constructor(private readonly settings: KhulnasoftSandboxSettings) {
    console.warn(
      'KhulnasoftSandboxProvider is deprecated. Use createKhulnasoftNetworkSandboxSession instead.',
    );
  }

  createSession = async (options?: {
    sessionId?: string;
    abortSignal?: AbortSignal;
    identity?: string;
    onFirstCreate?: (
      session: SandboxSession,
      opts: { abortSignal?: AbortSignal },
    ) => Promise<void>;
  }): Promise<HarnessV1NetworkSandboxSession> => {
    options?.abortSignal?.throwIfAborted();

    if ('sandbox' in this.settings && this.settings.sandbox != null) {
      return new KhulnasoftNetworkSandboxSession({
        sandbox: this.settings.sandbox,
        ownsLifecycle: false,
      });
    }

    type CreateNewBranch = BaseCreateSandboxParams & {
      sandbox?: never;
      name?: string;
    };
    const settings = this.settings as CreateNewBranch;
    const {
      sandbox: _ignoredSandbox,
      name: explicitName,
      ...createParams
    } = settings;
    // Sandbox v3 changed its implicit default from the Node 24 runtime to the
    // Universal managed image. Keep this adapter's existing default stable while
    // allowing callers to opt into managed images explicitly.
    const baseParams = withDefaultSandboxSettings(
      createParams as BaseCreateSandboxParams,
    );

    const identity = options?.identity;
    const onFirstCreate = options?.onFirstCreate;

    // When sessionId is supplied, name the per-session sandbox deterministically
    // so a future `resumeSession({ sessionId })` can locate it via
    // `Sandbox.get({ name })`. Absent sessionId (e.g. prewarm), fall back to
    // khulnasoft's auto-naming.
    const sessionNameOverride = options?.sessionId
      ? { name: sessionSandboxName(options.sessionId) }
      : {};

    if (identity == null || onFirstCreate == null) {
      const sandbox = await withKhulnasoftSandboxAuthenticationError({
        settings: this.settings,
        operation: () =>
          Sandbox.create({
            ...baseParams,
            ...sessionNameOverride,
            ...(options?.abortSignal ? { signal: options.abortSignal } : {}),
          }),
      });
      return new KhulnasoftNetworkSandboxSession({ sandbox, ownsLifecycle: true });
    }

    const templateName = explicitName ?? `ai-toolkit-harness-${identity}`;
    const snapshotId = await withKhulnasoftSandboxAuthenticationError({
      settings: this.settings,
      operation: () =>
        ensureTemplateSnapshot({
          baseParams,
          templateName,
          lookupParams: getSandboxLookupParams(baseParams),
          abortSignal: options?.abortSignal,
          snapshotCache: getSnapshotCache(),
          onCreate: async sbx => {
            await onFirstCreate(new KhulnasoftSandboxSession(sbx), {
              abortSignal: options?.abortSignal,
            });
          },
        }),
    });

    const fork = await withKhulnasoftSandboxAuthenticationError({
      settings: this.settings,
      operation: () =>
        createLiveSandboxFromSnapshot({
          baseParams,
          snapshotId,
          liveName: sessionNameOverride.name,
          abortSignal: options?.abortSignal,
        }),
    });
    return new KhulnasoftNetworkSandboxSession({
      sandbox: fork,
      ownsLifecycle: true,
    });
  };

  resumeSession = async (options: {
    sessionId: string;
    abortSignal?: AbortSignal;
  }): Promise<HarnessV1NetworkSandboxSession> => {
    options.abortSignal?.throwIfAborted();

    // Wrap-existing case: caller owns the sandbox. Same session as createSession.
    if ('sandbox' in this.settings && this.settings.sandbox != null) {
      return new KhulnasoftNetworkSandboxSession({
        sandbox: this.settings.sandbox,
        ownsLifecycle: false,
      });
    }

    const sandbox = await withKhulnasoftSandboxAuthenticationError({
      settings: this.settings,
      operation: () =>
        Sandbox.get({
          ...getSandboxLookupParams(this.settings),
          name: sessionSandboxName(options.sessionId),
          ...(options.abortSignal ? { signal: options.abortSignal } : {}),
        }),
    });
    return new KhulnasoftNetworkSandboxSession({ sandbox, ownsLifecycle: true });
  };
}

const SNAPSHOT_CACHE_KEY = Symbol.for(
  'ai-toolkit.harness.khulnasoft-template-snapshots',
);

type SnapshotCache = Map<string, string>;
function getSnapshotCache(): SnapshotCache {
  const globals = globalThis as {
    [SNAPSHOT_CACHE_KEY]?: SnapshotCache;
  };
  let cache = globals[SNAPSHOT_CACHE_KEY];
  if (cache == null) {
    cache = new Map();
    globals[SNAPSHOT_CACHE_KEY] = cache;
  }
  return cache;
}
