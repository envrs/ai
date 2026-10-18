import { AIToolkitError } from '@ai-toolkit/provider';

const name = 'AI_UIMessageStreamError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

/**
 * Error thrown when a UI message stream reports an error or contains invalid
 * or out-of-sequence chunks.
 *
 * This typically occurs when:
 * - An error chunk is received
 * - A delta chunk is received without a corresponding start chunk
 * - An end chunk is received without a corresponding start chunk
 * - A tool invocation is not found for the given toolCallId
 *
 * @see https://ai-toolkit.dev/docs/reference/ai-toolkit-errors/ai-ui-message-stream-error
 */
export class UIMessageStreamError extends AIToolkitError {
  private readonly [symbol] = true; // used in isInstance

  /**
   * The type of chunk that caused the error (e.g., 'text-delta', 'reasoning-end').
   */
  readonly chunkType: string;

  /**
   * The ID associated with the failing chunk (part ID or toolCallId), or an
   * empty string when the chunk does not have an ID.
   */
  readonly chunkId: string;

  constructor({
    chunkType,
    chunkId,
    message,
  }: {
    chunkType: string;
    chunkId: string;
    message: string;
  }) {
    super({ name, message });

    this.chunkType = chunkType;
    this.chunkId = chunkId;
  }

  static isInstance(error: unknown): error is UIMessageStreamError {
    return AIToolkitError.hasMarker(error, marker);
  }
}
