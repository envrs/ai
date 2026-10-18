import { HarnessAgent, type HarnessAgentSession } from '@ai-toolkit/harness/agent';
import { createPi } from './_create';
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
    const result = await agent.generate({
      session,
      prompt: 'In one sentence, what is the capital of France?',
    });
    console.log('text:', result.text);
    console.log('finishReason:', result.finishReason);
    console.log('usage:', result.usage);
  } finally {
    await session?.destroy();
    await sandboxSession.destroy();
  }
});
