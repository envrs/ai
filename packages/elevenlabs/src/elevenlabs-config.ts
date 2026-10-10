import type {
  FetchFunction,
  WebSocketConstructor,
} from '@ai-toolkit/provider-utils';

export type ElevenLabsConfig = {
  provider: string;
  url: (options: { modelId: string; path: string }) => string;
  headers?: () => Record<string, string | undefined>;
  fetch?: FetchFunction;
  generateId?: () => string;
  webSocket?: WebSocketConstructor;
};
