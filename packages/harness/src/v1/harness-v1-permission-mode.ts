/**
 * Baseline permission mode for adapter-native built-in tools.
 *
 * Custom host-executed tools are not controlled by this setting. They use
 * `HarnessAgentSettings.toolApproval`, similar to ai-toolkit's per-tool approval
 * status map.
 */
export type HarnessV1PermissionMode =
  | 'allow-reads'
  | 'allow-edits'
  | 'allow-all';
