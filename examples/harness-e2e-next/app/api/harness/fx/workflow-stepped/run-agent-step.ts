import {
  runHarnessAgentStep,
  type HarnessWorkflowState,
} from '@ai-toolkit/workflow-harness';

export async function runFxStep(
  state: HarnessWorkflowState,
): Promise<HarnessWorkflowState> {
  'use step';

  const { fxSteppedWorkflowAgent } =
    await import('@/agent/harness/fx/basic-stepped-agent');
  const { acquireHarnessSandboxSession } =
    await import('@/util/harness-sandbox-session');
  const sandboxSession = await acquireHarnessSandboxSession({
    agent: fxSteppedWorkflowAgent,
    sessionId: state.sessionId,
    ports: [4000],
    resumeFrom: state.resumeFrom,
    continueFrom: state.continueFrom,
  });
  return runHarnessAgentStep({
    agent: fxSteppedWorkflowAgent,
    state,
    sandboxSession,
  });
}
