import { HarnessAgent, type HarnessAgentSession } from '@ai-toolkit/harness/agent';
import { createKhulnasoftNetworkSandboxSession } from '@ai-toolkit/sandbox-khulnasoft';
import { createCodexACP } from './_create';
import { run } from '../../lib/run';

run(async () => {
  const agent = new HarnessAgent({
    harness: createCodexACP(),
    sandboxConfig: {
      workDir: 'repo',
      bootstrapHash: 'project-tools-v1',
      onBootstrap: async ({ session, workDir, abortSignal }) => {
        await session.writeTextFile({
          path: `${workDir}/TOOLS.md`,
          content: 'Project tools ready.\n',
          abortSignal,
        });
      },
    },
  });
  const sandboxSession = await createKhulnasoftNetworkSandboxSession({
    runtime: 'node24',
    ports: [4000],
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
