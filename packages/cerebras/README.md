# ai-toolkit - Cerebras Provider

The **Cerebras provider** for the [ai-toolkit](https://ai-toolkit.dev/docs) contains language model support for [Cerebras](https://cerebras.ai), offering high-speed AI model inference powered by Cerebras Wafer-Scale Engines and CS-3 systems.

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access Cerebras (and hundreds of models from other providers) — no additional packages, API keys, or extra cost. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

The Cerebras provider is available in the `@ai-toolkit/cerebras` module. You can install it with

```bash
npm i @ai-toolkit/cerebras
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `cerebras` from `@ai-toolkit/cerebras`:

```ts
import { cerebras } from '@ai-toolkit/cerebras';
```

## Available Models

Cerebras offers a variety of high-performance language models:
https://inference-docs.cerebras.ai/models/overview

## Example

```ts
import { cerebras } from '@ai-toolkit/cerebras';
import { generateText } from 'ai';

const { text } = await generateText({
  model: cerebras('gpt-oss-120b'),
  prompt: 'Write a JavaScript function that sorts a list:',
});
```

## Documentation

For more information about Cerebras' high-speed inference capabilities and API documentation, please visit:

- [Cerebras Inference Documentation](https://inference-docs.cerebras.ai/introduction)
- [Cerebras Website](https://cerebras.ai)
