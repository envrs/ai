# ai-toolkit - Rev.ai Provider

The **[Rev.ai provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/revai)** for the [ai-toolkit](https://ai-toolkit.dev/docs)
contains language model support for the Rev.ai transcription API.

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access Rev.ai (and hundreds of models from other providers) — no additional packages, API keys, or extra cost. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

The Rev.ai provider is available in the `@ai-toolkit/revai` module. You can install it with

```bash
npm i @ai-toolkit/revai
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `revai` from `@ai-toolkit/revai`:

```ts
import { revai } from '@ai-toolkit/revai';
```

## Example

```ts
import { revai } from '@ai-toolkit/revai';
import { transcribe } from 'ai';

const { text } = await transcribe({
  model: revai.transcription('machine'),
  audio: new URL(
    'https://github.com/khulnasoft/ai/raw/refs/heads/main/examples/ai-functions/data/galileo.mp3',
  ),
});
```

## Documentation

Please check out the **[Rev.ai provider documentation](https://ai-toolkit.dev/providers/ai-toolkit-providers/revai)** for more information.
