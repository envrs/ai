import { AIToolkitError } from './ai-toolkit-error';

const name = 'AI_NoContentGeneratedError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

/**
 * Thrown when the AI provider fails to generate any content.
 */
export class NoContentGeneratedError extends AIToolkitError {
  private readonly [symbol] = true; // used in isInstance

  constructor({
    message = 'No content generated.',
  }: { message?: string } = {}) {
    super({ name, message });
  }

  static isInstance(error: unknown): error is NoContentGeneratedError {
    return AIToolkitError.hasMarker(error, marker);
  }
}
