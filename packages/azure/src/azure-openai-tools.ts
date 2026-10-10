import {
  codeInterpreter,
  fileSearch,
  imageGeneration,
  webSearch,
  webSearchPreview,
} from '@ai-toolkit/openai/internal';

export const azureOpenaiTools: {
  codeInterpreter: typeof codeInterpreter;
  fileSearch: typeof fileSearch;
  imageGeneration: typeof imageGeneration;
  webSearch: typeof webSearch;
  webSearchPreview: typeof webSearchPreview;
} = {
  codeInterpreter,
  fileSearch,
  imageGeneration,
  webSearch,
  webSearchPreview,
};
