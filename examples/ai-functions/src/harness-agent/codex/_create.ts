import {
  createCodex as createCodexHarness,
  type CodexHarnessSettings,
} from '@ai-toolkit/harness-codex';

export function createCodex(
  settings: CodexHarnessSettings = {},
): ReturnType<typeof createCodexHarness> {
  const forceAuth = process.env.HARNESS_FORCE_AUTH;

  if (forceAuth == null) {
    return createCodexHarness(settings);
  }

  return createCodexHarness({
    ...settings,
    auth: forceAuth === 'ai-gateway' ? 'ai-gateway' : 'direct',
  });
}
