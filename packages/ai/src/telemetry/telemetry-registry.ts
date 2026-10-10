import type { Telemetry } from './telemetry';

/**
 * Registers one or more telemetry integrations globally.
 */
export function registerTelemetry(...integrations: Telemetry[]): void {
  if (!globalThis.ai-toolkit_TELEMETRY_INTEGRATIONS) {
    globalThis.ai-toolkit_TELEMETRY_INTEGRATIONS = [];
  }
  globalThis.ai-toolkit_TELEMETRY_INTEGRATIONS.push(...integrations);
}

export function getGlobalTelemetryIntegrations(): Telemetry[] {
  return globalThis.ai-toolkit_TELEMETRY_INTEGRATIONS ?? [];
}
