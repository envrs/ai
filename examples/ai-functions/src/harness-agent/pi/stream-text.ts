import { HarnessAgent, type HarnessAgentSession } from '@ai-toolkit/harness/agent';
import { createPi } from './_create';
import { printFullStream } from '../../lib/print-full-stream';
import { run } from '../../lib/run';
import { createKhulnasoftNetworkSandboxSession } from '@ai-toolkit/sandbox-vercel';

const pi = createPi();

run(async () => {
  const agent = new HarnessAgent({
    harness: pi,
  });

  const sandboxSession = await createKhulnasoftNetworkSandboxSession({
    runtime: 'node24',
    timeout: 10 * 60 * 1000,
    template: await agent.getSandboxTemplate(),
  });
  let session: HarnessAgentSession | undefined;
  try {
    session = await agent.createSession({ sandboxSession });
    const result = await agent.stream({
      session,
      prompt: 'Recite the first sentence of "A Tale of Two Cities".',
    });

    await printFullStream({ result });

    console.log('finishReason:', await result.finishReason);
    console.log('usage:', await result.usage);
  } finally {
    await session?.destroy();
    await sandboxSession.destroy();
  }
});
