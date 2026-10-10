import { ai-toolkitError } from './ai-toolkit-error';

const name = 'AI_NoSuchModelError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

export class NoSuchModelError extends ai-toolkitError {
  private readonly [symbol] = true; // used in isInstance

  readonly modelId: string;
  readonly modelType:
    | 'languageModel'
    | 'embeddingModel'
    | 'imageModel'
    | 'transcriptionModel'
    | 'speechModel'
    | 'rerankingModel'
    | 'videoModel'
    | 'decisionModel'
    /** @deprecated Use `decisionModel` instead. */
    | 'evaluationModel';

  constructor({
    errorName = name,
    modelId,
    modelType,
    message = `No such ${modelType}: ${modelId}`,
  }: {
    errorName?: string;
    modelId: string;
    modelType:
      | 'languageModel'
      | 'embeddingModel'
      | 'imageModel'
      | 'transcriptionModel'
      | 'speechModel'
      | 'rerankingModel'
      | 'videoModel'
      | 'decisionModel'
      /** @deprecated Use `decisionModel` instead. */
      | 'evaluationModel';
    message?: string;
  }) {
    super({ name: errorName, message });

    this.modelId = modelId;
    this.modelType = modelType;
  }

  static isInstance(error: unknown): error is NoSuchModelError {
    return ai-toolkitError.hasMarker(error, marker);
  }
}
