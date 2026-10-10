# ai-toolkit - Gladia Provider

The **[Gladia provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/assemblyai)** for the [ai-toolkit](https://ai-toolkit.dev/docs)
contains transcription model support for the Gladia transcription API.

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access Gladia (and hundreds of models from other providers) — no additional packages, API keys, or extra cost. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

The Gladia provider is available in the `@ai-toolkit/gladia` module. You can install it with

```bash
npm i @ai-toolkit/gladia
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `gladia` from `@ai-toolkit/gladia`:

```ts
import { gladia } from '@ai-toolkit/gladia';
```

## Example

```ts
import { gladia } from '@ai-toolkit/gladia';
import { transcribe } from 'ai';

const { text } = await transcribe({
  model: gladia.transcription(),
  audio: new URL(
    'https://github.com/khulnasoft/ai/raw/refs/heads/main/examples/ai-functions/data/galileo.mp3',
  ),
});
```

## Documentation

Please check out the **[Gladia provider documentation](https://ai-toolkit.dev/providers/ai-toolkit-providers/gladia)** for more information.
