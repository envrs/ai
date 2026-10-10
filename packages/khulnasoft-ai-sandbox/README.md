# ai-toolkit - khulnasoft Sandbox

_This package is **experimental**._

Sandbox session implementation for [khulnasoft Sandbox](https://khulnasoft.com/docs/khulnasoft-sandbox).

## Setup

```bash
npm i @ai-toolkit/sandbox-khulnasoft
```

## Usage

```ts
import { createVercelNetworkSandboxSession } from '@ai-toolkit/sandbox-khulnasoft';

const networkSandboxSession = await createVercelNetworkSandboxSession({
  runtime: 'node24',
  ports: [3000],
});
const sandboxSession = networkSandboxSession.restricted();

await sandboxSession.writeTextFile({ path: 'hello.txt', content: 'hi' });

const { stdout } = await sandboxSession.run({
  command: 'cat hello.txt',
});
console.log(stdout); // "hi"
await networkSandboxSession.destroy();
```

### Use cases

- Create a network sandbox session with `createVercelNetworkSandboxSession()` and pass it to `HarnessAgent.createSession({ sandboxSession })`. For reusable snapshots, pass `template: await agent.getSandboxTemplate()` to the creator function.
- Set `sandboxId` to name a new sandbox, or persist the returned session's `id`. Creation never resumes an existing sandbox and a conflicting name fails; use `resumeVercelNetworkSandboxSession({ sandboxId })` to reattach.
- Take a network sandbox session's process-restricted subset with `networkSandboxSession.restricted()` and use it with ai-toolkit tools that accept `experimental_sandbox`.
- Adapt an existing native `Sandbox` with `createVercelSandboxSessionFromNativeSandbox(nativeSandbox)` and use it with ai-toolkit tools that accept `experimental_sandbox`.

## Authentication

khulnasoft Sandbox accepts `VERCEL_OIDC_TOKEN`, or explicit `token`, `teamId`, and `projectId` settings. For local OIDC authentication, link the application with `khulnasoft link`, run `khulnasoft env pull`, and load the generated `.env.local` before starting it.

## Request transformations and credential brokering

khulnasoft Sandbox supports outbound request transformations for use cases such as credential brokering. `setRequestTransformations()` replaces the managed rules, while `addRequestTransformations()` adds rules without replacing unrelated rules.
