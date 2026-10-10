# ai-toolkit - Hume Provider

The **[Hume provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/hume)** for the [ai-toolkit](https://ai-toolkit.dev/docs)
contains support for the Hume API.

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access Hume (and hundreds of models from other providers) — no additional packages, API keys, or extra cost. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

The Hume provider is available in the `@ai-toolkit/hume` module. You can install it with

```bash
npm i @ai-toolkit/hume
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `hume` from `@ai-toolkit/hume`:

```ts
import { hume } from '@ai-toolkit/hume';
```

## Example

```ts
import { hume } from '@ai-toolkit/hume';
import { generateSpeech } from 'ai';

const result = await generateSpeech({
  model: hume.speech('aurora'),
  text: 'Hello, world!',
});
```

## Documentation

Please check out the **[Hume provider documentation](https://ai-toolkit.dev/providers/ai-toolkit-providers/hume)** for more information.
