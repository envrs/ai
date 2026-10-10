# ai-toolkit - Deepgram Provider

The **[Deepgram provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/deepgram)** for the [ai-toolkit](https://ai-toolkit.dev/docs)
contains transcription model support for the Deepgram transcription API and speech model support for the Deepgram text-to-speech API.

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access Deepgram (and hundreds of models from other providers) — no additional packages, API keys, or extra cost. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

The Deepgram provider is available in the `@ai-toolkit/deepgram` module. You can install it with

```bash
npm i @ai-toolkit/deepgram
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `deepgram` from `@ai-toolkit/deepgram`:

```ts
import { deepgram } from '@ai-toolkit/deepgram';
```

## Examples

### Transcription

```ts
import { deepgram } from '@ai-toolkit/deepgram';
import { transcribe } from 'ai';

const { text } = await transcribe({
  model: deepgram.transcription('nova-3'),
  audio: new URL(
    'https://github.com/khulnasoft/ai/raw/refs/heads/main/examples/ai-functions/data/galileo.mp3',
  ),
});
```

### Transcription with Language Detection

```ts
import { deepgram } from '@ai-toolkit/deepgram';
import { transcribe } from 'ai';

const { text, language } = await transcribe({
  model: deepgram.transcription('nova-3'),
  audio: new URL(
    'https://github.com/khulnasoft/ai/raw/refs/heads/main/examples/ai-functions/data/galileo.mp3',
  ),
  providerOptions: {
    deepgram: {
      detectLanguage: true,
    },
  },
});
```

### Text-to-Speech

```ts
import { deepgram } from '@ai-toolkit/deepgram';
import { generateSpeech } from 'ai';

const { audio } = await generateSpeech({
  model: deepgram.speech('aura-2'),
  voice: 'helena',
  text: 'Hello, welcome to Deepgram!',
});
```

## Documentation

Please check out the **[Deepgram provider documentation](https://ai-toolkit.dev/providers/ai-toolkit-providers/deepgram)** for more information.
