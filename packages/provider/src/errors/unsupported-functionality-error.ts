import { AIToolkitError } from './ai-toolkit-error';

const name = 'AI_UnsupportedFunctionalityError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

export class UnsupportedFunctionalityError extends AIToolkitError {
  private readonly [symbol] = true; // used in isInstance

  readonly functionality: string;

  constructor({
    functionality,
    message = `'${functionality}' functionality not supported.`,
  }: {
    functionality: string;
    message?: string;
  }) {
    super({ name, message });
    this.functionality = functionality;
  }

  static isInstance(error: unknown): error is UnsupportedFunctionalityError {
    return AIToolkitError.hasMarker(error, marker);
  }
}
