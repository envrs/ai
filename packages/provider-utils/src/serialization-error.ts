import { AIToolkitError } from '@ai-toolkit/provider';

const name = 'AI_SerializationError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

export class SerializationError extends AIToolkitError {
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
    return AIToolkitError.hasMarker(error, marker);
  }
}
