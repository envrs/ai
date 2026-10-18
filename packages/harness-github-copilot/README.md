# ai-toolkit - GitHub Copilot Harness

The **[@ai-toolkit/harness-github-copilot](https://www.npmjs.com/package/@ai-toolkit/harness-github-copilot)** package runs GitHub Copilot CLI through its Agent Client Protocol server and the ai-toolkit harness abstraction.

## Setup

```bash
npm install @ai-toolkit/harness @ai-toolkit/harness-github-copilot @ai-toolkit/sandbox-khulnasoft
```

## Usage

```ts
import { HarnessAgent } from '@ai-toolkit/harness/agent';
import { githubCopilot } from '@ai-toolkit/harness-github-copilot';
import { createKhulnasoftNetworkSandboxSession } from '@ai-toolkit/sandbox-khulnasoft';

const agent = new HarnessAgent({
  harness: githubCopilot,
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

The adapter uses `@ai-toolkit/harness-acp`, which installs the pinned GitHub Copilot CLI inside the sandbox. The sandbox must provide network access and at least one exposed TCP port.

Set one of `COPILOT_GITHUB_TOKEN`, `GH_TOKEN`, or `GITHUB_TOKEN` for direct authentication. Without one of these variables, direct authentication reads the GitHub Copilot CLI login from the host's native credential store or plaintext fallback. If neither contains a token and the host has `gh` on `PATH`, the adapter reads `gh auth token` without modifying either credential store. Set `AI_GATEWAY_API_KEY` or `KHULNASOFT_OIDC_TOKEN` to use AI Gateway instead, or pass an isolated authentication environment with `createGitHubCopilot({ auth: { AI_GATEWAY_API_KEY: token } })`.

See the [GitHub Copilot harness documentation](https://ai-toolkit.dev/providers/ai-toolkit-harnesses/github-copilot) for authentication security, settings, tools, and lifecycle support.
