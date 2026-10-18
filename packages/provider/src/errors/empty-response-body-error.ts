import { AIToolkitError } from './ai-toolkit-error';

const name = 'AI_EmptyResponseBodyError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

export class EmptyResponseBodyError extends AIToolkitError {
  private readonly [symbol] = true; // used in isInstance

  constructor({ message = 'Empty response body' }: { message?: string } = {}) {
    super({ name, message });
  }

  static isInstance(error: unknown): error is EmptyResponseBodyError {
    return AIToolkitError.hasMarker(error, marker);
  }
}
