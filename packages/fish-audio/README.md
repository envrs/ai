# ai-toolkit - Fish Audio Provider

The **[Fish Audio provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/fish-audio)** for the [ai-toolkit](https://ai-toolkit.dev/docs)
contains speech generation (S1 and S2 models) and speech-to-text transcription support.

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access Fish Audio (and hundreds of models from other providers) — no additional packages, API keys, or extra cost. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

The Fish Audio provider is available in the `@ai-toolkit/fish-audio` module. You can install it with

```bash
npm i @ai-toolkit/fish-audio
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `fishAudio` from `@ai-toolkit/fish-audio`:

```ts
import { fishAudio } from '@ai-toolkit/fish-audio';
```

## Example

### Speech generation

```ts
import { fishAudio } from '@ai-toolkit/fish-audio';
import { generateSpeech } from 'ai';

const { audio } = await generateSpeech({
  model: fishAudio.speech('s1'),
  text: 'Hello from Fish Audio!',
  // A voice model ID from https://fish.audio, or omit for the default voice.
  voice: '933563129e564b19a115bedd57b7406a',
});
```

### Transcription

```ts
import { fishAudio } from '@ai-toolkit/fish-audio';
import { transcribe } from 'ai';
import { readFile } from 'node:fs/promises';

const { text, segments } = await transcribe({
  model: fishAudio.transcription(),
  audio: await readFile('audio.mp3'),
});
```

## Documentation

Please check out the **[Fish Audio provider documentation](https://ai-toolkit.dev/providers/ai-toolkit-providers/fish-audio)** for more information.
