import { AIToolkitError } from './ai-toolkit-error';
import { getErrorMessage } from './get-error-message';

const name = 'AI_JSONParseError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

export class JSONParseError extends AIToolkitError {
  private readonly [symbol] = true; // used in isInstance

  readonly text: string;

  constructor({ text, cause }: { text: string; cause: unknown }) {
    super({
      name,
      message:
        `JSON parsing failed: ` +
        `Text: ${text}.\n` +
        `Error message: ${getErrorMessage(cause)}`,
      cause,
    });

    this.text = text;
  }

  static isInstance(error: unknown): error is JSONParseError {
    return AIToolkitError.hasMarker(error, marker);
  }
}
