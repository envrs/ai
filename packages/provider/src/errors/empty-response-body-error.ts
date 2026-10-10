import { ai-toolkitError } from './ai-toolkit-error';

const name = 'AI_EmptyResponseBodyError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

export class EmptyResponseBodyError extends ai-toolkitError {
  private readonly [symbol] = true; // used in isInstance

  constructor({ message = 'Empty response body' }: { message?: string } = {}) {
    super({ name, message });
  }

  static isInstance(error: unknown): error is EmptyResponseBodyError {
    return ai-toolkitError.hasMarker(error, marker);
  }
}
