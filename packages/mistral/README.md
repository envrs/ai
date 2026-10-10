# ai-toolkit - Mistral Provider

The **[Mistral provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/mistral)** for the [ai-toolkit](https://ai-toolkit.dev/docs) contains language model, embedding model, and speech model support for Mistral APIs.

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access Mistral (and hundreds of models from other providers) — no additional packages, API keys, or extra cost. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

The Mistral provider is available in the `@ai-toolkit/mistral` module. You can install it with

```bash
npm i @ai-toolkit/mistral
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `mistral` from `@ai-toolkit/mistral`:

```ts
import { mistral } from '@ai-toolkit/mistral';
```

## Example

```ts
import { mistral } from '@ai-toolkit/mistral';
import { generateText } from 'ai';

const { text } = await generateText({
  model: mistral('mistral-large-latest'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[Mistral provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/mistral)** for more information.
