# ai-toolkit - Google Provider

The **[Google provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/google)** for the [ai-toolkit](https://ai-toolkit.dev/docs) contains language model support for the [Google Generative AI](https://ai.google/discover/generativeai/) APIs.

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access Google (and hundreds of models from other providers) — no additional packages, API keys, or extra cost. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

The Google provider is available in the `@ai-toolkit/google` module. You can install it with

```bash
npm i @ai-toolkit/google
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `google` from `@ai-toolkit/google`:

```ts
import { google } from '@ai-toolkit/google';
```

## Example

```ts
import { google } from '@ai-toolkit/google';
import { generateText } from 'ai';

const { text } = await generateText({
  model: google('gemini-3.1-pro-preview'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[Google provider documentation](https://ai-toolkit.dev/providers/ai-toolkit-providers/google)** for more information.
