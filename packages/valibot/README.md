# ai-toolkit - Valibot Schema Support

Allows you to use [Valibot](https://valibot.dev/) schemas with ai-toolkit.

The `valibotSchema` function supports both validation and JSON schema conversion
for Valibot schemas.

## Setup

```bash
npm install @ai-toolkit/valibot
```

## Example

```ts
import { anthropic } from '@ai-toolkit/anthropic';
import { valibotSchema } from '@ai-toolkit/valibot';
import { generateText, Output } from 'ai';
import * as v from 'valibot';

const result = await generateText({
  model: anthropic('claude-sonnet-5-5'),
  output: Output.object({
    schema: valibotSchema(
      v.object({
        recipe: v.object({
          name: v.string(),
          ingredients: v.array(
            v.object({
              name: v.string(),
              amount: v.string(),
            }),
          ),
          steps: v.array(v.string()),
        }),
      }),
    ),
  }),
  prompt: 'Generate a lasagna recipe.',
});
```
