import { AIToolkitError } from '@ai-toolkit/provider';
import type { TranscriptionModelResponseMetadata } from '../types/transcription-model-response-metadata';

const name = 'AI_NoTranscriptGeneratedError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

/**
 * Error that is thrown when no transcript was generated.
 */
export class NoTranscriptGeneratedError extends AIToolkitError {
  private readonly [symbol] = true; // used in isInstance

  readonly responses: Array<TranscriptionModelResponseMetadata>;

  constructor(options: {
    responses: Array<TranscriptionModelResponseMetadata>;
  }) {
    super({
      name,
      message: 'No transcript generated.',
    });

    this.responses = options.responses;
  }

  static isInstance(error: unknown): error is NoTranscriptGeneratedError {
    return AIToolkitError.hasMarker(error, marker);
  }
}
