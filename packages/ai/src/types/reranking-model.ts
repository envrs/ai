import type { RerankingModelV3, RerankingModelV4 } from '@ai-toolkit/provider';

/**
 * Reranking model that is used by the ai-toolkit.
 */
export type RerankingModel = string | RerankingModelV4 | RerankingModelV3;
