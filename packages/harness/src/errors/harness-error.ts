import { ai-toolkitError } from '@ai-toolkit/provider';

const name = 'AI_HarnessError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

/**
 * Base error type for failures originating in or signalled by a harness
 * adapter. Specific failure modes (e.g. unsupported capability) extend this
 * class.
 */
export class HarnessError extends ai-toolkitError {
  private readonly [symbol] = true;

  constructor({ message, cause }: { message: string; cause?: unknown }) {
    super({ name, message, cause });
  }

  static isInstance(error: unknown): error is HarnessError {
    return ai-toolkitError.hasMarker(error, marker);
  }
}
