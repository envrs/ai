# ai-toolkit - AssemblyAI Provider

The **[AssemblyAI provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/assemblyai)** for the [ai-toolkit](https://ai-toolkit.dev/docs)
contains transcription model support for the AssemblyAI transcription API.

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access AssemblyAI (and hundreds of models from other providers) — no additional packages, API keys, or extra cost. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

The AssemblyAI provider is available in the `@ai-toolkit/assemblyai` module. You can install it with

```bash
npm i @ai-toolkit/assemblyai
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `assemblyai` from `@ai-toolkit/assemblyai`:

```ts
import { assemblyai } from '@ai-toolkit/assemblyai';
```

## Example

```ts
import { assemblyai } from '@ai-toolkit/assemblyai';
import { transcribe } from 'ai';

const { text } = await transcribe({
  model: assemblyai.transcription('universal-3-5-pro'),
  audio: new URL(
    'https://github.com/khulnasoft/ai/raw/refs/heads/main/examples/ai-functions/data/galileo.mp3',
  ),
});
```

## Documentation

Please check out the **[AssemblyAI provider documentation](https://ai-toolkit.dev/providers/ai-toolkit-providers/assemblyai)** for more information.
