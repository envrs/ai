import type { HarnessV1NetworkSandboxSession } from '@ai-toolkit/harness';
import type {
  HarnessAgent,
  HarnessAgentContinueTurnState,
  HarnessAgentResumeSessionState,
} from '@ai-toolkit/harness/agent';
import {
  createKhulnasoftNetworkSandboxSession,
  resumeKhulnasoftNetworkSandboxSession,
} from '@ai-toolkit/sandbox-vercel';

export async function acquireHarnessSandboxSession({
  agent,
  sessionId,
  resumeFrom,
  continueFrom,
  ports,
}: {
  agent: Pick<HarnessAgent, 'getSandboxTemplate'>;
  sessionId: string;
  resumeFrom?: HarnessAgentResumeSessionState;
  continueFrom?: HarnessAgentContinueTurnState;
  ports?: number[];
}): Promise<HarnessV1NetworkSandboxSession> {
  const sandboxId = `ai-sdk-harness-session-${sessionId}`;
  if (resumeFrom != null || continueFrom != null) {
    return resumeKhulnasoftNetworkSandboxSession({ sandboxId });
  }

  return createKhulnasoftNetworkSandboxSession({
    sandboxId,
    runtime: 'node24',
    ...(ports == null ? {} : { ports }),
    template: await agent.getSandboxTemplate(),
  });
}
