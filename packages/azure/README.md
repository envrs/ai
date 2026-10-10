# ai-toolkit - Azure OpenAI Provider

The **[Azure provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/azure)** for the [ai-toolkit](https://ai-toolkit.dev/docs) contains language model support for the Azure OpenAI API.

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access Azure OpenAI (and hundreds of models from other providers) — no additional packages, API keys, or extra cost. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

The Azure provider is available in the `@ai-toolkit/azure` module. You can install it with

```bash
npm i @ai-toolkit/azure
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `azure` from `@ai-toolkit/azure`:

```ts
import { azure } from '@ai-toolkit/azure';
```

## Example

```ts
import { azure } from '@ai-toolkit/azure';
import { generateText } from 'ai';

const { text } = await generateText({
  model: azure('gpt-4o'), // your deployment name
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[Azure provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/azure)** for more information.
