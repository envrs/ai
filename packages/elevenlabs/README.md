# ai-toolkit - ElevenLabs Provider

The **[ElevenLabs provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/elevenlabs)** for the [ai-toolkit](https://ai-toolkit.dev/docs)
contains speech generation plus batch and realtime transcription support for the ElevenLabs APIs.

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access ElevenLabs (and hundreds of models from other providers) — no additional packages, API keys, or extra cost. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

The ElevenLabs provider is available in the `@ai-toolkit/elevenlabs` module. You can install it with

```bash
npm i @ai-toolkit/elevenlabs
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `elevenlabs` from `@ai-toolkit/elevenlabs`:

```ts
import { elevenlabs } from '@ai-toolkit/elevenlabs';
```

## Example

```ts
import { elevenlabs } from '@ai-toolkit/elevenlabs';
import { transcribe } from 'ai';

const { text } = await transcribe({
  model: elevenlabs.transcription('scribe_v1'),
  audio: new URL(
    'https://github.com/khulnasoft/ai/raw/refs/heads/main/examples/ai-functions/data/galileo.mp3',
  ),
});
```

## Documentation

Please check out the **[ElevenLabs provider documentation](https://ai-toolkit.dev/providers/ai-toolkit-providers/elevenlabs)** for more information.
