# ai-toolkit - Claude Platform on AWS Provider

The **[Claude Platform on AWS provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/anthropic-aws)** for the [ai-toolkit](https://ai-toolkit.dev/docs)
gives you access to the Anthropic Messages API hosted in AWS at
`aws-external-anthropic.{region}.api.aws`, authenticated with AWS SigV4 or an
AWS-provisioned API key.

Same wire format and feature set as `@ai-toolkit/anthropic` — model IDs, streaming,
prompt caching, tool use, computer use, Agent Skills, and `anthropic-beta`
headers all match the first-party Claude API.

## Setup

```bash
npm install @ai-toolkit/anthropic-aws
```

## Provider Instance

```ts
import { createAnthropicAws } from '@ai-toolkit/anthropic-aws';

// SigV4 — picks up AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY / AWS_SESSION_TOKEN
const anthropicAws = createAnthropicAws({
  region: 'us-west-2',
  workspaceId: 'wrkspc_…',
});
```

## Example

```ts
import { createAnthropicAws } from '@ai-toolkit/anthropic-aws';
import { generateText } from 'ai';

const anthropicAws = createAnthropicAws();

const { text } = await generateText({
  model: anthropicAws('claude-sonnet-5-5'),
  prompt: 'Invent a new holiday and describe its traditions.',
});
```

## Documentation

Please check out the **[Claude Platform on AWS provider documentation](https://ai-toolkit.dev/providers/ai-toolkit-providers/anthropic-aws)** for more information.
