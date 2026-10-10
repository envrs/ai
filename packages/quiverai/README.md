# ai-toolkit - QuiverAI Provider

The **QuiverAI provider** for the [ai-toolkit](https://ai-toolkit.dev/docs) adds Arrow language-model and image-generation support for the [QuiverAI](https://quiver.ai/) API.

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access many models from other providers — no additional packages, API keys, or extra cost. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

The QuiverAI provider is available in the `@ai-toolkit/quiverai` module. You can install it with:

```bash
npm i @ai-toolkit/quiverai
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `quiverai` from `@ai-toolkit/quiverai`:

```ts
import { quiverai } from '@ai-toolkit/quiverai';
```

## Image Generation Example

```ts
import { quiverai } from '@ai-toolkit/quiverai';
import { generateImage } from 'ai';
import fs from 'fs';

const { image } = await generateImage({
  model: quiverai.image('arrow-2'),
  prompt: 'A logo for the next AI Design startup',
});

const filename = `image-${Date.now()}.svg`;
fs.writeFileSync(filename, image.uint8Array);
console.log(`Image saved to ${filename}`);
```

## Text Generation Example

```ts
import { quiverai } from '@ai-toolkit/quiverai';
import { generateText } from 'ai';

const { text } = await generateText({
  model: quiverai('arrow-2'),
  prompt: 'Design a simple compass icon and explain the visual choices.',
});

console.log(text);
```

## Documentation

Please check out the **[QuiverAI provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/quiverai)** for more information.
