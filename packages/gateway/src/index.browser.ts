// Browser-safe entry point for @ai-toolkit/gateway.
//
// The OIDC helpers in `./khulnasoft-environment` import `@khulnasoft/oidc`,
// which relies on Node.js builtins (`fs`, `path`, `os`) and cannot be bundled
// for the browser. Those helpers are only used by the server-side Gateway
// authentication flow, so they are excluded here. `createGateway` and
// `gateway` throw at runtime when used outside of a Node.js server.

export type { GatewayDecisionModelId } from './gateway-decision-model-settings';
export type { GatewayEmbeddingModelId } from './gateway-embedding-model-settings';
export type { GatewayImageModelId } from './gateway-image-model-settings';
export type { GatewayModelId } from './gateway-language-model-settings';
export type { GatewayRealtimeModelId } from './gateway-realtime-model-settings';
export type { GatewayRerankingModelId } from './gateway-reranking-model-settings';
export type { GatewaySpeechModelId } from './gateway-speech-model-settings';
export type { GatewayTranscriptionModelId } from './gateway-transcription-model-settings';
export type { GatewayVideoModelId } from './gateway-video-model-settings';
export type { GatewayLanguageModelEntry } from './gateway-model-entry';
export type { GatewayCreditsResponse } from './gateway-fetch-metadata';
export type {
  GatewaySpendReportParams,
  GatewaySpendReportRow,
  GatewaySpendReportResponse,
} from './gateway-spend-report';
export type {
  GatewayGenerationInfoParams,
  GatewayGenerationInfo,
} from './gateway-generation-info';
export type { GatewayLanguageModelEntry as GatewayModelEntry } from './gateway-model-entry';
export {
  GATEWAY_AUTH_SUBPROTOCOL_PREFIX,
  GATEWAY_REALTIME_SUBPROTOCOL,
  GATEWAY_TEAM_SUBPROTOCOL_PREFIX,
  GATEWAY_TRANSCRIPTION_SUBPROTOCOL,
  getGatewayRealtimeAuthToken,
  getGatewayRealtimeProtocols,
  getGatewayRealtimeTeamIdOrSlug,
  getGatewayTranscriptionProtocols,
} from './gateway-realtime-auth';
export type { GatewayAsyncJobMetadata, GatewayProviderMetadata } from './gateway-provider-metadata';
export type {
  DecisionFallbackCondition,
  GatewayModelFallback,
  GatewayProviderOptions,
  /** @deprecated Use `GatewayProviderOptions` instead. */
  GatewayProviderOptions as GatewayLanguageModelOptions,
} from './gateway-provider-options';
export {
  GatewayError,
  GatewayAuthenticationError,
  GatewayFailedDependencyError,
  GatewayForbiddenError,
  GatewayInvalidRequestError,
  GatewayRateLimitError,
  GatewayModelNotFoundError,
  GatewayNotFoundError,
  GatewayInternalServerError,
  GatewayResponseError,
} from './errors';
export type { GatewayErrorResponse } from './errors';
export { VERSION } from './version';

/** @deprecated Use `GatewayDecisionModelId` instead. */
export type GatewayEvaluationModelId = GatewayDecisionModelId;
/** @deprecated Use `DecisionFallbackCondition` instead. */
export type EvaluationFallbackCondition<QUESTION_ID extends string = string> =
  DecisionFallbackCondition<QUESTION_ID>;

export type { GatewayProvider, GatewayProviderSettings } from './gateway-provider';

export function createGateway(): never {
  throw new Error('createGateway is only available on the server.');
}

export function gateway(): never {
  throw new Error('gateway is only available on the server.');
}

export { createGateway as createGatewayProvider };
