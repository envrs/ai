# ai-toolkit - xAI Grok Provider

The **[xAI Grok provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/xai)** for the [ai-toolkit](https://ai-toolkit.dev/docs)
contains language model support for the xAI chat and completion APIs.

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access xAI (and hundreds of models from other providers) — no additional packages, API keys, or extra cost. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

The xAI Grok provider is available in the `@ai-toolkit/xai` module. You can install it with

```bash
npm i @ai-toolkit/xai
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `xai` from `@ai-toolkit/xai`:

```ts
import { xai } from '@ai-toolkit/xai';
```

## Example

```ts
import { xai } from '@ai-toolkit/xai';
import { generateText } from 'ai';

const { text } = await generateText({
  model: xai('grok-4.7'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[xAI Grok provider documentation](https://ai-toolkit.dev/providers/ai-toolkit-providers/xai)** for more information.
