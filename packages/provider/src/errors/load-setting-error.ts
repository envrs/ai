import { ai-toolkitError } from './ai-toolkit-error';

const name = 'AI_LoadSettingError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

export class LoadSettingError extends ai-toolkitError {
  private readonly [symbol] = true; // used in isInstance

  constructor({ message }: { message: string }) {
    super({ name, message });
  }

  static isInstance(error: unknown): error is LoadSettingError {
    return ai-toolkitError.hasMarker(error, marker);
  }
}
