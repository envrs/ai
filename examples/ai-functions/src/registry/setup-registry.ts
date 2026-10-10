import { anthropic } from '@ai-toolkit/anthropic';
import { elevenLabs } from '@ai-toolkit/elevenlabs';
import { fal } from '@ai-toolkit/fal';
import { groq } from '@ai-toolkit/groq';
import { luma } from '@ai-toolkit/luma';
import { mistral } from '@ai-toolkit/mistral';
import { openai } from '@ai-toolkit/openai';
import { replicate } from '@ai-toolkit/replicate';
import { xai } from '@ai-toolkit/xai';
import {
  createProviderRegistry,
  customProvider,
  defaultSettingsMiddleware,
  wrapLanguageModel,
} from 'ai';
import 'dotenv/config';

// custom provider with alias names:
const myAnthropic = customProvider({
  languageModels: {
    opus: anthropic('claude-opus-5-5'),
    sonnet: anthropic('claude-sonnet-5-5'),
    haiku: anthropic('claude-haiku-5-5'),
  },
  fallbackProvider: anthropic,
});

// custom provider with different model settings:
const myOpenAI = customProvider({
  languageModels: {
    // replacement model with custom provider options:
    'gpt-6-astra': wrapLanguageModel({
      model: openai('gpt-6-astra'),
      middleware: defaultSettingsMiddleware({
        settings: {
          providerOptions: {
            openai: {
              reasoningEffort: 'high',
            },
          },
        },
      }),
    }),
    // alias model with custom provider options:
    'gpt-6-astra-high-reasoning': wrapLanguageModel({
      model: openai('gpt-6-astra'),
      middleware: defaultSettingsMiddleware({
        settings: {
          providerOptions: {
            openai: {
              reasoningEffort: 'high',
            },
          },
        },
      }),
    }),
  },
  fallbackProvider: openai,
});

export const registry = createProviderRegistry({
  mistral,
  anthropic: myAnthropic,
  openai: myOpenAI,
  xai,
  groq,
  elevenLabs,
});

registry.languageModel('anthropic:haiku');

const registryWithCustomSeparator = createProviderRegistry(
  {
    mistral,
    anthropic: myAnthropic,
    openai: myOpenAI,
    xai,
    groq,
    elevenLabs,
  },
  { separator: ' > ' },
);

registryWithCustomSeparator.languageModel('anthropic > haiku');

export const myImageModels = customProvider({
  imageModels: {
    recraft: fal.imageModel('recraft-v3'),
    photon: luma.imageModel('photon-flash-1'),
    flux: replicate.imageModel('black-forest-labs/flux-schnell'),
  },
});
