import {
  lazySchema,
  zodSchema,
  type InferSchema,
} from '@ai-toolkit/provider-utils';
import { z } from 'zod/v4';

export type OpenAISpeechTranslationModelId =
  | 'gpt-realtime-translate'
  | (string & {});

export const openAISpeechTranslationModelOptions = lazySchema(() =>
  zodSchema(z.object({})),
);

export type OpenAISpeechTranslationModelOptions = InferSchema<
  typeof openAISpeechTranslationModelOptions
>;
