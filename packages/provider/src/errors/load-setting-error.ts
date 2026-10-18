import { AIToolkitError } from './ai-toolkit-error';

const name = 'AI_LoadSettingError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

export class LoadSettingError extends AIToolkitError {
  private readonly [symbol] = true; // used in isInstance

  constructor({ message }: { message: string }) {
    super({ name, message });
  }

  static isInstance(error: unknown): error is LoadSettingError {
    return AIToolkitError.hasMarker(error, marker);
  }
}
