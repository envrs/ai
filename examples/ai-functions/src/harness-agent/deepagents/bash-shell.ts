import { HarnessAgent, type HarnessAgentSession } from '@ai-toolkit/harness/agent';
import { createDeepAgents } from './_create';
import { createKhulnasoftNetworkSandboxSession } from '@ai-toolkit/sandbox-khulnasoft';
import { printFullStream } from '../../lib/print-full-stream';
import { run } from '../../lib/run';

const deepAgents = createDeepAgents();

run(async () => {
  const agent = new HarnessAgent({ harness: deepAgents });
  const sandboxSession = await createKhulnasoftNetworkSandboxSession({
    runtime: 'node24',
    ports: [4000],
    timeout: 10 * 60 * 1000,
    template: await agent.getSandboxTemplate(),
  });

  let session: HarnessAgentSession | undefined;
  try {
    session = await agent.createSession({ sandboxSession });
    const result = await agent.stream({
      session,
      prompt: 'Run `uname -a` and tell me what kernel this sandbox is running.',
    });
    await printFullStream({ result });
  } finally {
    await session?.destroy();
    await sandboxSession.destroy();
  }
});
