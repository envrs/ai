# ai-toolkit - Gateway Provider

The Gateway provider for the [ai-toolkit](https://ai-toolkit.dev/docs) allows the use of a wide variety of AI models and providers.

## Setup

The Gateway provider is available in the `@ai-toolkit/gateway` module. You can install it with

```bash
npm i @ai-toolkit/gateway
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `gateway` from `@ai-toolkit/gateway`:

```ts
import { gateway } from '@ai-toolkit/gateway';
```

## Example

```ts
import { gateway } from '@ai-toolkit/gateway';
import { generateText } from 'ai';

const { text } = await generateText({
  model: gateway('spacexai/grok-4.7'),
  prompt:
    'Tell me about the history of the San Francisco Mission-style burrito.',
});
```

## Documentation

Please check out the [ai-toolkit documentation](https://ai-toolkit.dev/docs) for more information.
