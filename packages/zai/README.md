# ai-toolkit - Z.AI Provider

The **Z.AI provider** for the [ai-toolkit](https://ai-toolkit.dev/docs) contains language model support for [Z.AI](https://z.ai/) GLM models.

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access Z.AI (and hundreds of models from other providers) without installing an additional provider package. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

Install the Z.AI provider with:

```bash
npm i @ai-toolkit/zai
```

## Provider Instance

Import the default provider instance from `@ai-toolkit/zai`:

```ts
import { zai } from '@ai-toolkit/zai';
```

The provider reads the API key from `ZAI_API_KEY` by default. To configure it explicitly, use `createZai`:

```ts
import { createZai } from '@ai-toolkit/zai';

const zai = createZai({
  apiKey: process.env.ZAI_API_KEY,
});
```

## Language Models

```ts
import { zai } from '@ai-toolkit/zai';
import { generateText } from 'ai';

const { text } = await generateText({
  model: zai('glm-5.3'),
  prompt: 'Explain why the sky is blue.',
});

console.log(text);
```

The provider supports streaming, reasoning, function tools, JSON object output, and URL-based image and video input on compatible GLM models.
