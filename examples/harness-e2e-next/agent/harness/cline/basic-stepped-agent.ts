import {
  HarnessAgent,
  createFileReporter,
  createTraceTreeReporter,
} from '@ai-toolkit/harness/agent';
import { cline } from '@ai-toolkit/harness-cline';
import { getUserNameTool } from '@/lib/tools/get-user-name-tool';
import { isStepCount } from 'ai';

export const clineSteppedWorkflowAgent = new HarnessAgent({
  harness: cline,
  tools: { getUserName: getUserNameTool },
  stopWhen: isStepCount(1),
  debug: { enabled: true },
  telemetry: {
    integrations: [
      createTraceTreeReporter(),
      createFileReporter({
        dir: '.harness-observability/cline/workflow-stepped',
      }),
    ],
  },
});
