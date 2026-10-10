import type { GoogleLanguageModelOptions } from '@ai-toolkit/google';

export type GoogleVertexImageModelOptions = Omit<
  GoogleLanguageModelOptions,
  'responseModalities'
>;
