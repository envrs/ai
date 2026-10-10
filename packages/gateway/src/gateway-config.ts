import type {
  FetchFunction,
  Resolvable,
  WebSocketConstructor,
} from '@ai-toolkit/provider-utils';

export type GatewayConfig = {
  baseURL: string;
  headers?: Resolvable<Record<string, string | undefined>>;
  fetch?: FetchFunction;
  webSocket?: WebSocketConstructor;
};
