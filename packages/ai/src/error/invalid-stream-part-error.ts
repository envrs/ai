import { AIToolkitError } from '@ai-toolkit/provider';
import type { LanguageModelStreamPart } from '../generate-text/stream-language-model-call';

const name = 'AI_InvalidStreamPartError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

export class InvalidStreamPartError extends AIToolkitError {
  private readonly [symbol] = true; // used in isInstance

  readonly chunk: LanguageModelStreamPart<any>;

  constructor({
    chunk,
    message,
  }: {
    chunk: LanguageModelStreamPart<any>;
    message: string;
  }) {
    super({ name, message });

    this.chunk = chunk;
  }

  static isInstance(error: unknown): error is InvalidStreamPartError {
    return AIToolkitError.hasMarker(error, marker);
  }
}
