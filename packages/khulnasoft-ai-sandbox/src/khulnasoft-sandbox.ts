import {
  type HarnessV1NetworkSandboxSession,
  type HarnessV1SandboxSessionCreateOptions,
  type HarnessV1SandboxSessionResumeOptions,
} from '@ai-toolkit/harness';
import type { Experimental_SandboxSession as SandboxSession } from '@ai-toolkit/provider-utils';
import { Sandbox } from '@khulnasoft/sandbox';
import { KhulnasoftNetworkSandboxSession } from './khulnasoft-network-sandbox-session';
import { KhulnasoftSandboxSession } from './khulnasoft-sandbox-session';
import {
  createLiveSandboxFromSnapshot,
  ensureTemplateSnapshot,
  getSandboxLookupParams,
  withKhulnasoftSandboxAuthenticationError,
  withDefaultSandboxSettings,
  type BaseCreateSandboxParams,
  type DistributiveOmit,
  type Prettify,
  type KhulnasoftSandboxCreateParams,
} from './utils';

export type KhulnasoftNativeSandboxSession = Sandbox;

type KhulnasoftSandboxCreationSettings = KhulnasoftSandboxCreateParams & {
  sandbox?: never;
  name?: string;
};

type KhulnasoftCreationSettings = DistributiveOmit<
  KhulnasoftSandboxCreationSettings,
  'sandbox'
>;
export type KhulnasoftNetworkSandboxSessionCreateOptions = Prettify<
  HarnessV1SandboxSessionCreateOptions<KhulnasoftCreationSettings> & {
    sandbox?: never;
  }
>;

type KhulnasoftLookupSettings = DistributiveOmit<
  NonNullable<Parameters<typeof Sandbox.get>[0]>,
  'name' | 'resume'
> & {
  name?: never;
  resume?: never;
};

export type KhulnasoftNetworkSandboxSessionResumeOptions = Prettify<
  HarnessV1SandboxSessionResumeOptions<KhulnasoftLookupSettings>
>;

export {
  DEFAULT_SANDBOX_TIMEOUT_MS,
  DEFAULT_SANDBOX_RUNTIME,
  KHULNASOFT_PROVIDER_ID,
  getSandboxLookupParams,
  hasExplicitSandboxEnvironment,
  pollForTemplateSnapshot,
  withKhulnasoftSandboxAuthenticationError,
} from './utils';
export type { BaseCreateSandboxParams } from './utils';

export async function createKhulnasoftNetworkSandboxSession(
  options: KhulnasoftNetworkSandboxSessionCreateOptions = {},
): Promise<HarnessV1NetworkSandboxSession> {
  if ('sandbox' in options) {
    throw new Error(
      'createKhulnasoftNetworkSandboxSession: use createKhulnasoftNetworkSandboxSessionFromNativeSandbox for an existing sandbox.',
    );
  }
  const {
    template,
    abortSignal,
    sandboxId,
    sandbox: _sandbox,
    ...nativeOptions
  } = options;
  const effectiveSignal = abortSignal ?? nativeOptions.signal;
  effectiveSignal?.throwIfAborted();
  const { name, ...creationOptions } = nativeOptions;
  if (sandboxId != null && name != null && sandboxId !== name) {
    throw new Error(
      'createKhulnasoftNetworkSandboxSession: sandboxId and name must match when both are provided.',
    );
  }
  const liveName = sandboxId ?? name;
  const baseParams = withDefaultSandboxSettings({
    ...creationOptions,
    ...(effectiveSignal ? { signal: effectiveSignal } : {}),
  } as BaseCreateSandboxParams);
  const settings = options;
  if (template == null) {
    const sandbox = await withKhulnasoftSandboxAuthenticationError({
      settings,
      operation: () =>
        Sandbox.create({
          ...baseParams,
          ...(liveName != null ? { name: liveName } : {}),
        }),
    });
    return createKhulnasoftNetworkSandboxSessionFromNativeSandbox(sandbox);
  }

  const selection =
    'source' in baseParams && baseParams.source != null
      ? baseParams.source
      : 'image' in baseParams && baseParams.image != null
        ? { image: baseParams.image }
        : { runtime: baseParams.runtime };
  const material = JSON.stringify([2, template.identity, selection]);
  const digest = new Uint8Array(
    await crypto.subtle.digest('SHA-256', new TextEncoder().encode(material)),
  );
  const templateName = `ai-toolkit-harness-v2-${Array.from(digest.slice(0, 12), byte => byte.toString(16).padStart(2, '0')).join('')}`;
  const snapshotId = await withKhulnasoftSandboxAuthenticationError({
    settings,
    operation: () =>
      ensureTemplateSnapshot({
        baseParams,
        templateName,
        lookupParams: getSandboxLookupParams(baseParams),
        abortSignal: effectiveSignal,
        onCreate: async sandbox => {
          await template.prepare({
            session: createKhulnasoftSandboxSessionFromNativeSandbox(sandbox),
            abortSignal: effectiveSignal,
          });
        },
      }),
  });
  const liveSandbox = await withKhulnasoftSandboxAuthenticationError({
    settings,
    operation: () =>
      createLiveSandboxFromSnapshot({
        baseParams,
        snapshotId,
        liveName,
      }),
  });
  return createKhulnasoftNetworkSandboxSessionFromNativeSandbox(liveSandbox);
}

export async function resumeKhulnasoftNetworkSandboxSession(
  options: KhulnasoftNetworkSandboxSessionResumeOptions,
): Promise<HarnessV1NetworkSandboxSession> {
  const {
    sandboxId,
    abortSignal,
    signal,
    name: _name,
    resume: _resume,
    ...lookupOptions
  } = options;
  const effectiveSignal = abortSignal ?? signal;
  effectiveSignal?.throwIfAborted();
  const sandbox = await withKhulnasoftSandboxAuthenticationError({
    settings: options,
    operation: () =>
      Sandbox.get({
        ...lookupOptions,
        name: sandboxId,
        resume: true,
        ...(effectiveSignal ? { signal: effectiveSignal } : {}),
      }),
  });
  return createKhulnasoftNetworkSandboxSessionFromNativeSandbox(sandbox);
}

export function createKhulnasoftSandboxSessionFromNativeSandbox(
  nativeSandbox: KhulnasoftNativeSandboxSession,
): SandboxSession {
  return new KhulnasoftSandboxSession(nativeSandbox);
}

export function createKhulnasoftNetworkSandboxSessionFromNativeSandbox(
  nativeSandbox: KhulnasoftNativeSandboxSession,
): HarnessV1NetworkSandboxSession {
  return new KhulnasoftNetworkSandboxSession({
    sandbox: nativeSandbox,
    ownsLifecycle: true,
  });
}
