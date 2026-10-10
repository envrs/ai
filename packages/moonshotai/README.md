# ai-toolkit - Moonshot AI Provider

The **[Moonshot AI provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/moonshotai)** for the [ai-toolkit](https://ai-toolkit.dev/docs) contains language model support for the [Kimi API Platform](https://platform.kimi.ai/docs), including the Kimi model series.

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access Moonshot AI (and hundreds of models from other providers) — no additional packages, API keys, or extra cost. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

The Moonshot AI provider is available in the `@ai-toolkit/moonshotai` module. You can install it with

```bash
npm i @ai-toolkit/moonshotai
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `moonshotai` from `@ai-toolkit/moonshotai`:

```ts
import { moonshotai } from '@ai-toolkit/moonshotai';
```

## Language Model Example

```ts
import { moonshotai } from '@ai-toolkit/moonshotai';
import { generateText } from 'ai';

const { text } = await generateText({
  model: moonshotai('kimi-k3'),
  prompt: 'Write a JavaScript function that sorts a list:',
});
```

## Reasoning Effort Example (Kimi K3)

```ts
import {
  moonshotai,
  type MoonshotAILanguageModelOptions,
} from '@ai-toolkit/moonshotai';
import { generateText } from 'ai';

const { text, reasoningText } = await generateText({
  model: moonshotai('kimi-k3'),
  prompt: 'Solve this problem step by step: What is 15% of 240?',
  providerOptions: {
    moonshotai: {
      reasoningEffort: 'high',
    } satisfies MoonshotAILanguageModelOptions,
  },
});

console.log(reasoningText);
console.log(text);
```

Kimi K2.6 supports thinking and non-thinking modes. Enable it with
`thinking: { type: 'enabled' }` or disable it with
`thinking: { type: 'disabled' }`.

Kimi K2.7 Code always has thinking enabled and uses Preserved Thinking. Keep
reasoning history in multi-turn conversations:

```ts
import {
  moonshotai,
  type MoonshotAILanguageModelOptions,
} from '@ai-toolkit/moonshotai';
import { generateText } from 'ai';

const { text, reasoningText } = await generateText({
  model: moonshotai('kimi-k2.7-code'),
  prompt: 'Solve this problem step by step: What is 15% of 240?',
  providerOptions: {
    moonshotai: {
      thinking: { type: 'enabled' },
      reasoningHistory: 'preserved',
    } satisfies MoonshotAILanguageModelOptions,
  },
});

console.log(reasoningText);
console.log(text);
```

## Documentation

Please check out the **[Moonshot AI provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/moonshotai)** for more information.
