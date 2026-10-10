// These codes are stable identifiers. Do not rename or reuse an existing code.
const deprecationCodes = new Map<string, string>([
  ['generateObject', 'ai-toolkit_DEP_GENERATE_OBJECT'],
  ['streamObject', 'ai-toolkit_DEP_STREAM_OBJECT'],
  ['experimental_generateSpeech', 'ai-toolkit_DEP_EXPERIMENTAL_GENERATE_SPEECH'],
  ['experimental_transcribe', 'ai-toolkit_DEP_EXPERIMENTAL_TRANSCRIBE'],
  ['"image" content part', 'ai-toolkit_DEP_IMAGE_CONTENT_PART'],
  [
    '"tool-result" content of type "file-data"',
    'ai-toolkit_DEP_TOOL_RESULT_FILE_DATA',
  ],
  [
    '"tool-result" content of type "file-url"',
    'ai-toolkit_DEP_TOOL_RESULT_FILE_URL',
  ],
  ['"tool-result" content of type "file-id"', 'ai-toolkit_DEP_TOOL_RESULT_FILE_ID'],
  [
    '"tool-result" content of type "file-reference"',
    'ai-toolkit_DEP_TOOL_RESULT_FILE_REFERENCE',
  ],
  [
    '"tool-result" content of type "image-data"',
    'ai-toolkit_DEP_TOOL_RESULT_IMAGE_DATA',
  ],
  [
    '"tool-result" content of type "image-url"',
    'ai-toolkit_DEP_TOOL_RESULT_IMAGE_URL',
  ],
  [
    '"tool-result" content of type "image-file-id"',
    'ai-toolkit_DEP_TOOL_RESULT_IMAGE_FILE_ID',
  ],
  [
    '"tool-result" content of type "image-file-reference"',
    'ai-toolkit_DEP_TOOL_RESULT_IMAGE_FILE_REFERENCE',
  ],
  [
    'rawInput in output-error UI message parts',
    'ai-toolkit_DEP_UI_MESSAGE_RAW_INPUT',
  ],
]);

/**
 * Escape punctuation and UTF-16 code units without losing case or collapsing
 * distinct settings. Underscores are escaped too, so `__` separates code parts.
 */
function encodeCodePart(value: string): string {
  return value.replace(
    /[^a-zA-Z0-9]/g,
    character =>
      `_${character.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`,
  );
}

export function getDeprecationCode({
  setting,
  provider,
}: {
  setting: string;
  provider?: string;
}): string {
  if (provider == null) {
    return (
      deprecationCodes.get(setting) ??
      `ai-toolkit_DEP_SETTING_${encodeCodePart(setting)}`
    );
  }

  // Provider codes are scoped to the provider, but not to a particular model or
  // message. This works for third-party providers without changing their spec.
  return `ai-toolkit_DEP_PROVIDER_${encodeCodePart(provider)}__${encodeCodePart(setting)}`;
}
