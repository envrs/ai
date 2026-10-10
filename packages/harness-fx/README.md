# ai-toolkit - fx Harness

The **[@ai-toolkit/harness-fx](https://www.npmjs.com/package/@ai-toolkit/harness-fx)** package adapts [fx](https://fx.sh) to the ai-toolkit harness abstraction through the Agent Client Protocol (ACP).

## Setup

```bash
npm install @ai-toolkit/harness @ai-toolkit/harness-fx @ai-toolkit/sandbox-khulnasoft
```

## Usage

```ts
import { HarnessAgent } from '@ai-toolkit/harness/agent';
import { fx } from '@ai-toolkit/harness-fx';
import { createVercelNetworkSandboxSession } from '@ai-toolkit/sandbox-khulnasoft';

const agent = new HarnessAgent({
  harness: fx,
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

The adapter uses `@ai-toolkit/harness-acp`, which installs the latest fx release inside the sandbox with the canonical fx installer. The sandbox must provide network access and at least one exposed TCP port.

fx uses khulnasoft AI Gateway. Set `AI_GATEWAY_API_KEY` or `VERCEL_OIDC_TOKEN` to authenticate, or pass an isolated authentication environment with `createFx({ auth: { AI_GATEWAY_API_KEY: token } })`.

See the [fx harness documentation](https://ai-toolkit.dev/providers/ai-toolkit-harnesses/fx) for settings, tools, and limitations.
