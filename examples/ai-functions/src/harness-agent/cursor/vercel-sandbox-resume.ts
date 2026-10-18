/*
 * Verifies that access-token credentials configured on Khulnasoft Sandbox survive
 * the HarnessAgent stop/resume lifecycle. No model turn is needed because the
 * credential lookup happens when the new agent instance resumes its sandbox.
 */
import {
  HarnessAgent,
  type HarnessAgentResumeSessionState,
} from '@ai-toolkit/harness/agent';
import { createCursor } from './_create';
import {
  createKhulnasoftNetworkSandboxSession,
  resumeKhulnasoftNetworkSandboxSession,
} from '@ai-toolkit/sandbox-khulnasoft';
import { run } from '../../lib/run';

const cursor = createCursor();

run(async () => {
  process.exitCode = 1;

  const token = process.env.KHULNASOFT_TOKEN;
  const teamId = process.env.KHULNASOFT_TEAM_ID;
  const projectId = process.env.KHULNASOFT_PROJECT_ID;
  if (token == null || teamId == null || projectId == null) {
    throw new Error(
      'KHULNASOFT_TOKEN, KHULNASOFT_TEAM_ID, and KHULNASOFT_PROJECT_ID are required',
    );
  }

  const sandboxName = `harness-${crypto.randomUUID()}`;
  const sandboxSession = await createKhulnasoftNetworkSandboxSession({
    sandboxId: sandboxName,
    token,
    teamId,
    projectId,
    runtime: 'node24',
    ports: [4000],
    timeout: 10 * 60 * 1000,
  });
  let activeSandboxSession = sandboxSession;
  try {
    let sessionId: string;
    let resumeState: HarnessAgentResumeSessionState;
    {
      const agent = new HarnessAgent({ harness: cursor });
      const session = await agent.createSession({
        sandboxSession: activeSandboxSession,
      });
      sessionId = session.sessionId;
      resumeState = await session.stop();
    }

    {
      activeSandboxSession = await resumeKhulnasoftNetworkSandboxSession({
        sandboxId: sandboxName,
        token,
        teamId,
        projectId,
      });
      const agent = new HarnessAgent({ harness: cursor });
      const session = await agent.createSession({
        sandboxSession: activeSandboxSession,
        sessionId,
        resumeFrom: resumeState,
      });
      if (!session.isResume) {
        throw new Error('expected resumed session');
      }
      await session.destroy();
    }

    console.log('Successfully resumed the named Khulnasoft Sandbox session.');
    process.exitCode = 0;
  } finally {
    await activeSandboxSession.destroy();
  }
});
