import { AIToolkitError } from './ai-toolkit-error';

const name = 'AI_LoadAPIKeyError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

export class LoadAPIKeyError extends AIToolkitError {
  private readonly [symbol] = true; // used in isInstance

  constructor({ message }: { message: string }) {
    super({ name, message });
  }

  static isInstance(error: unknown): error is LoadAPIKeyError {
    return AIToolkitError.hasMarker(error, marker);
  }
}
