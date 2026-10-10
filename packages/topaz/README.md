# ai-toolkit - Topaz Labs Provider

The **Topaz Labs provider** for the [ai-toolkit](https://ai-toolkit.dev/docs) contains image and video model support for the [Topaz Labs API](https://developer.topazlabs.com).

Topaz models **enhance media you supply**. They upscale, denoise, sharpen and restore an existing image or video, and do not generate media from a text prompt.

> **Deploying to khulnasoft?** With khulnasoft's AI Gateway you can access Topaz Labs (and hundreds of models from other providers) — no additional packages, API keys, or extra cost. [Get started with AI Gateway](https://khulnasoft.com/ai-gateway).

## Setup

The Topaz Labs provider is available in the `@ai-toolkit/topaz` module. You can install it with:

```bash
npm i @ai-toolkit/topaz
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the ai-toolkit skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `topaz` from `@ai-toolkit/topaz`:

```ts
import { topaz } from '@ai-toolkit/topaz';
```

The default instance reads the API key from the `TOPAZ_API_KEY` environment variable. Use `createTopaz({ apiKey })` to pass it explicitly. See [API Key Setup](https://developer.topazlabs.com/getting-started/api-key-setup) to create a key.

## Image Enhancement Example

```ts
import { topaz } from '@ai-toolkit/topaz';
import { generateImage } from 'ai';

const { image } = await generateImage({
  model: topaz.image('wonder-3.5'),
  prompt: {
    images: ['https://example.com/photo.jpg'],
  },
  size: '4096x4096',
});
```

## Video Enhancement Example

`generateVideo` requires a prompt, so pass an empty one. `resolution` sets the output resolution. Starlight models also need the input video's properties in the `source` provider option:

```ts
import { topaz } from '@ai-toolkit/topaz';
import { experimental_generateVideo as generateVideo } from 'ai';

const { videos } = await generateVideo({
  model: topaz.video('proteus'),
  prompt: '',
  inputReferences: ['https://example.com/clip.mp4'],
  resolution: '3840x2160',
});
```

## Documentation

Please check out the **[Topaz Labs provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/topaz)** for more information.
