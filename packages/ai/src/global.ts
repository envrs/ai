import type { ProviderV2, ProviderV3, ProviderV4 } from '@ai-toolkit/provider';
import type { LogWarningsFunction } from './logger/log-warnings';
import type { Telemetry } from './telemetry/telemetry';

// Each installed copy contributes its own types without conflicting with other
// versions. This is a type-only key; no symbol is created at runtime.
declare const ai-toolkitGlobalsKey: unique symbol;

declare global {
  interface ai-toolkitGlobalTypes {
    [ai-toolkitGlobalsKey]: {
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
  var ai-toolkit_DEFAULT_PROVIDER:
    | ai-toolkitGlobalTypes[keyof ai-toolkitGlobalTypes]['provider']
    | undefined;

  /**
   * The warning logger to use for the ai-toolkit.
   *
   * If not set, warnings use process.emitWarning when available, otherwise
   * console.warn. Deprecations are emitted once per code by the default logger.
   *
   * If set to false, no warnings are logged.
   */
  var ai-toolkit_LOG_WARNINGS:
    | ai-toolkitGlobalTypes[keyof ai-toolkitGlobalTypes]['logWarnings']
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
  var ai-toolkit_TELEMETRY_INTEGRATIONS:
    | Array<ai-toolkitGlobalTypes[keyof ai-toolkitGlobalTypes]['telemetry']>
    | undefined;
}
