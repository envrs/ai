import type { FetchFunction } from '@ai-toolkit/provider-utils';

export type FishAudioConfig = {
  provider: string;
  url: (options: { modelId: string; path: string }) => string;
  headers?: () => Record<string, string | undefined>;
  fetch?: FetchFunction;
};
