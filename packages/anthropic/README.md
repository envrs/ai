# ai-toolkit - Anthropic Provider

The **[Anthropic provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/anthropic)** for the [ai-toolkit](https://ai-toolkit.dev/docs) contains language model support for the [Anthropic Messages API](https://docs.anthropic.com/claude/reference/messages_post).

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access Anthropic (and hundreds of models from other providers) — no additional packages, API keys, or extra cost. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

The Anthropic provider is available in the `@ai-toolkit/anthropic` module. You can install it with

```bash
npm i @ai-toolkit/anthropic
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `anthropic` from `@ai-toolkit/anthropic`:

```ts
import { anthropic } from '@ai-toolkit/anthropic';
```

## Example

```ts
import { anthropic } from '@ai-toolkit/anthropic';
import { generateText } from 'ai';

const { text } = await generateText({
  model: anthropic('claude-haiku-5-5'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[Anthropic provider documentation](https://ai-toolkit.dev/providers/ai-toolkit-providers/anthropic)** for more information.
