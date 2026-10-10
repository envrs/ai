import {
  HarnessAgent,
  createFileReporter,
  createTraceTreeReporter,
} from '@ai-toolkit/harness/agent';
import { claudeCode } from '@ai-toolkit/harness-claude-code';
import { getUserNameTool } from '@/lib/tools/get-user-name-tool';
import { isStepCount } from 'ai';

export const claudeCodeSteppedWorkflowAgent = new HarnessAgent({
  harness: claudeCode,
  tools: { getUserName: getUserNameTool },
  stopWhen: isStepCount(1),
  debug: { enabled: true },
  telemetry: {
    integrations: [
      createTraceTreeReporter(),
      createFileReporter({
        dir: '.harness-observability/claude-code/workflow-stepped',
      }),
    ],
  },
});
