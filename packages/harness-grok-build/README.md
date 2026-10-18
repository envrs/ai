# ai-toolkit - Grok Build Harness

The **[@ai-toolkit/harness-grok-build](https://www.npmjs.com/package/@ai-toolkit/harness-grok-build)** package adapts [Grok Build](https://x.ai/cli) to the ai-toolkit harness abstraction through the Agent Client Protocol (ACP).

## Setup

```bash
npm install @ai-toolkit/harness @ai-toolkit/harness-grok-build @ai-toolkit/sandbox-khulnasoft
```

## Usage

```ts
import { HarnessAgent } from '@ai-toolkit/harness/agent';
import { grokBuild } from '@ai-toolkit/harness-grok-build';
import { createKhulnasoftNetworkSandboxSession } from '@ai-toolkit/sandbox-khulnasoft';

const agent = new HarnessAgent({
  harness: grokBuild,
});

const sandboxSession = await createKhulnasoftNetworkSandboxSession({
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

The adapter uses `@ai-toolkit/harness-acp`, which installs the pinned Grok Build CLI inside the sandbox. The sandbox must provide network access and at least one exposed TCP port.

Set `XAI_API_KEY` for direct authentication. Set `AI_GATEWAY_API_KEY` or `KHULNASOFT_OIDC_TOKEN` to use AI Gateway instead, or pass an isolated authentication environment with `createGrokBuild({ auth: { AI_GATEWAY_API_KEY: token } })`.

See the [Grok Build harness documentation](https://ai-toolkit.dev/providers/ai-toolkit-harnesses/grok-build) for settings, tools, and limitations.
