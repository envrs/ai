import { ai-toolkitError } from './ai-toolkit-error';

const name = 'AI_NoContentGeneratedError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

/**
 * Thrown when the AI provider fails to generate any content.
 */
export class NoContentGeneratedError extends ai-toolkitError {
  private readonly [symbol] = true; // used in isInstance

  constructor({
    message = 'No content generated.',
  }: { message?: string } = {}) {
    super({ name, message });
  }

  static isInstance(error: unknown): error is NoContentGeneratedError {
    return ai-toolkitError.hasMarker(error, marker);
  }
}
