# ai-toolkit - Cartesia Provider

The **[Cartesia provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/cartesia)** for the [ai-toolkit](https://ai-toolkit.dev/docs)
contains Sonic 3.5 speech generation, Ink-Whisper batch transcription, and Ink 2 realtime and streaming transcription support.

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access Cartesia (and hundreds of models from other providers) — no additional packages, API keys, or extra cost. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

The Cartesia provider is available in the `@ai-toolkit/cartesia` module. You can install it with

```bash
npm i @ai-toolkit/cartesia
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `cartesia` from `@ai-toolkit/cartesia`:

```ts
import { cartesia } from '@ai-toolkit/cartesia';
```

## Example

```ts
import { cartesia } from '@ai-toolkit/cartesia';
import { generateSpeech } from 'ai';

const { audio } = await generateSpeech({
  model: cartesia.speech('sonic-3.5'),
  text: 'Hello from the khulnasoft ai-toolkit!',
  voice: 'a0e99841-438c-4a64-b679-ae501e7d6091',
});
```

## Documentation

Please check out the **[Cartesia provider documentation](https://ai-toolkit.dev/providers/ai-toolkit-providers/cartesia)** for more information.
