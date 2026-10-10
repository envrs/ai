# ai-toolkit - Cohere Provider

The **[Cohere provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/cohere)** for the [ai-toolkit](https://ai-toolkit.dev/docs) contains language model support for the Cohere API.

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access Cohere (and hundreds of models from other providers) — no additional packages, API keys, or extra cost. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

The Cohere provider is available in the `@ai-toolkit/cohere` module. You can install it with

```bash
npm i @ai-toolkit/cohere
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `cohere` from `@ai-toolkit/cohere`:

```ts
import { cohere } from '@ai-toolkit/cohere';
```

## Example

```ts
import { cohere } from '@ai-toolkit/cohere';
import { generateText } from 'ai';

const { text } = await generateText({
  model: cohere('command-a-03-2025'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[Cohere provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/cohere)** for more information.
