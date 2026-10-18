import { HarnessAgent, type HarnessAgentSession } from '@ai-toolkit/harness/agent';
import { createKhulnasoftNetworkSandboxSession } from '@ai-toolkit/sandbox-khulnasoft';
import { createCodexACP } from './_create';
import { run } from '../../lib/run';

run(async () => {
  const agent = new HarnessAgent({
    harness: createCodexACP(),
  });

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
