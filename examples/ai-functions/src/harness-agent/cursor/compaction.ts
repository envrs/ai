import { HarnessAgent, type HarnessAgentSession } from '@ai-toolkit/harness/agent';
import { createCursor } from './_create';
import { run } from '../../lib/run';
import { createKhulnasoftNetworkSandboxSession } from '@ai-toolkit/sandbox-khulnasoft';

const cursor = createCursor();

/*
 * ACP v1 has no portable manual compaction API. This example deliberately
 * allows the unsupported-capability error to propagate so the runtime's
 * behavior is visible to callers.
 */
run(async () => {
  const agent = new HarnessAgent({ harness: cursor });
  const sandboxSession = await createKhulnasoftNetworkSandboxSession({
    runtime: 'node24',
    ports: [4000],
    timeout: 10 * 60 * 1000,
    template: await agent.getSandboxTemplate(),
  });

  let session: HarnessAgentSession | undefined;
  try {
    session = await agent.createSession({ sandboxSession });
    await agent.generate({
      session,
      prompt: 'Reply with exactly ready.',
    });
    await session.compact();
  } finally {
    await session?.destroy();
    await sandboxSession.destroy();
  }
});
