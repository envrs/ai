import type { FetchFunction, Resolvable } from '@ai-toolkit/provider-utils';

export type TopazConfig = {
  provider: string;
  baseURL: string;
  headers?: Resolvable<Record<string, string | undefined>>;
  fetch?: FetchFunction;
  _internal?: {
    currentDate?: () => Date;
  };
};
