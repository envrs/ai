import { HarnessAgent, type HarnessAgentSession } from '@ai-toolkit/harness/agent';
import { createKhulnasoftNetworkSandboxSession } from '@ai-toolkit/sandbox-khulnasoft';
import { run } from '../../lib/run';
import { createFx } from './_create';

run(async () => {
  delete process.env.AI_GATEWAY_API_KEY;
  delete process.env.KHULNASOFT_OIDC_TOKEN;

  const agent = new HarnessAgent({
    harness: createFx({ auth: 'direct' }),
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
    const result = await agent.generate({
      session,
      prompt: 'In one sentence, what is the capital of France?',
    });
    console.log(result.text);
  } finally {
    await session?.destroy();
    await sandboxSession.destroy();
  }
});
