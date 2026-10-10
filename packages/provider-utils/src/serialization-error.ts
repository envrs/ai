import { ai-toolkitError } from '@ai-toolkit/provider';

const name = 'AI_SerializationError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

export class SerializationError extends ai-toolkitError {
  private readonly [symbol] = true; // used in isInstance

  constructor({
    message = 'Failed to serialize value.',
    cause,
  }: {
    message?: string;
    cause?: unknown;
  } = {}) {
    super({ name, message, cause });
  }

  static isInstance(error: unknown): error is SerializationError {
    return ai-toolkitError.hasMarker(error, marker);
  }
}
