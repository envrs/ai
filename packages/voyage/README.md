# ai-toolkit - Voyage AI Provider

The **[Voyage AI provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/voyage)** for the [ai-toolkit](https://ai-toolkit.dev/docs) contains embedding and reranking model support for the [Voyage AI](https://voyageai.com/) APIs.

## Setup

The Voyage AI provider is available in the `@ai-toolkit/voyage` module. You can install it with

```bash
npm i @ai-toolkit/voyage
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `voyage` from `@ai-toolkit/voyage`:

```ts
import { voyage } from '@ai-toolkit/voyage';
```

## Example

```ts
import { voyage } from '@ai-toolkit/voyage';
import { embedMany } from 'ai';

const { embeddings } = await embedMany({
  model: voyage.textEmbedding('voyage-4'),
  values: [
    'Sunny days are great for hiking',
    'Machine learning is a subset of AI',
  ],
});
```

## Documentation

Please check out the **[Voyage AI provider documentation](https://ai-toolkit.dev/providers/ai-toolkit-providers/voyage)** for more information.
