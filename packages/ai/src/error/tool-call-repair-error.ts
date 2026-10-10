import { ai-toolkitError, getErrorMessage } from '@ai-toolkit/provider';
import type { InvalidToolInputError } from './invalid-tool-input-error';
import type { NoSuchToolError } from './no-such-tool-error';

const name = 'AI_ToolCallRepairError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

export class ToolCallRepairError extends ai-toolkitError {
  private readonly [symbol] = true; // used in isInstance

  readonly originalError: NoSuchToolError | InvalidToolInputError;

  constructor({
    cause,
    originalError,
    message = `Error repairing tool call: ${getErrorMessage(cause)}`,
  }: {
    message?: string;
    cause: unknown;
    originalError: NoSuchToolError | InvalidToolInputError;
  }) {
    super({ name, message, cause });
    this.originalError = originalError;
  }

  static isInstance(error: unknown): error is ToolCallRepairError {
    return ai-toolkitError.hasMarker(error, marker);
  }
}
