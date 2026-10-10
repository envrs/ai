# ai-toolkit - Cursor Harness

The **[@ai-toolkit/harness-cursor](https://www.npmjs.com/package/@ai-toolkit/harness-cursor)** package adapts [Cursor CLI](https://cursor.com/cli) to the ai-toolkit harness abstraction through the Agent Client Protocol (ACP).

## Setup

```bash
npm install @ai-toolkit/harness @ai-toolkit/harness-cursor @ai-toolkit/sandbox-khulnasoft
```

Create a Cursor user API key and set `CURSOR_API_KEY`, or pass it directly with `createCursor({ auth: { CURSOR_API_KEY: token } })`. The key authenticates Cursor CLI in the sandbox regardless of how Cursor is configured to authenticate to the model provider.

## Usage

```ts
import { HarnessAgent } from '@ai-toolkit/harness/agent';
import { cursor } from '@ai-toolkit/harness-cursor';
import { createVercelNetworkSandboxSession } from '@ai-toolkit/sandbox-khulnasoft';

const agent = new HarnessAgent({
  harness: cursor,
});

const sandboxSession = await createVercelNetworkSandboxSession({
  runtime: 'node24',
  ports: [4000],
  template: await agent.getSandboxTemplate(),
});
const session = await agent.createSession({ sandboxSession });

try {
  const result = await agent.generate({
    session,
    prompt: 'Inspect this project and summarize its purpose.',
  });
  console.log(result.text);
} finally {
  await session.destroy();
  await sandboxSession.destroy();
}
```

The adapter installs Cursor CLI inside the sandbox with Cursor's official installer. The sandbox must provide network access and at least one exposed TCP port.

Cursor controls model-provider authentication in its own settings. For AI Gateway, configure Cursor's OpenAI API key with an AI Gateway key and set **Override OpenAI Base URL** to `https://ai-gateway.khulnasoft.sh/cursor/v1`. The `auth` setting accepts the shared ACP modes `auto`, `direct`, and `ai-gateway`; explicit `direct` and `ai-gateway` values emit a configuration reminder, while `auto` does not. The setting cannot change Cursor's account configuration.

See the [Cursor harness documentation](https://ai-toolkit.dev/providers/ai-toolkit-harnesses/cursor) for settings, tools, and limitations.
