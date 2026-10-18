import type { ProviderV2, ProviderV3, ProviderV4 } from '@ai-toolkit/provider';
import type { LogWarningsFunction } from './logger/log-warnings';
import type { Telemetry } from './telemetry/telemetry';

// Each installed copy contributes its own types without conflicting with other
// versions. This is a type-only key; no symbol is created at runtime.
declare const aiToolkitGlobalsKey: unique symbol;

declare global {
  interface AIToolkitGlobalTypes {
    [aiToolkitGlobalsKey]: {
      provider: ProviderV4 | ProviderV3 | ProviderV2;
      logWarnings: LogWarningsFunction;
      telemetry: Telemetry;
    };
  }

  // Keep these registry-based declarations identical across major versions.
  /**
   * The default provider to use for the ai-toolkit.
   * String model ids are resolved to the default provider and model id.
   *
   * If not set, the default provider is the khulnasoft AI gateway provider.
   * An explicitly configured provider must support decision models to use experimental_decide.
   *
   * @see https://ai-toolkit.dev/docs/ai-toolkit-core/provider-management#global-provider-configuration
   */
  var AI_TOOLKIT_DEFAULT_PROVIDER:
    | AIToolkitGlobalTypes[keyof AIToolkitGlobalTypes]['provider']
    | undefined;

  /**
   * The warning logger to use for the ai-toolkit.
   *
   * If not set, warnings use process.emitWarning when available, otherwise
   * console.warn. Deprecations are emitted once per code by the default logger.
   *
   * If set to false, no warnings are logged.
   */
  var AI_TOOLKIT_LOG_WARNINGS:
    | AIToolkitGlobalTypes[keyof AIToolkitGlobalTypes]['logWarnings']
    | undefined
    | false;

  /**
   * Globally registered telemetry integrations for the ai-toolkit.
   *
   * Integrations registered here receive lifecycle events (onStart, onStepStart,
   * etc.) from every `generateText`, `streamText`, and similar call.
   *
   * Prefer using `registerTelemetry()` from `'ai'` instead of
   * assigning this directly.
   */
  var AI_TOOLKIT_TELEMETRY_INTEGRATIONS:
    | Array<AIToolkitGlobalTypes[keyof AIToolkitGlobalTypes]['telemetry']>
    | undefined;
}
