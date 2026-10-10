import {
  HarnessAgent,
  createFileReporter,
  createTraceTreeReporter,
} from '@ai-toolkit/harness/agent';
import { fx } from '@ai-toolkit/harness-fx';
import { getUserNameTool } from '@/lib/tools/get-user-name-tool';
import { isStepCount } from 'ai';

export const fxSteppedWorkflowAgent = new HarnessAgent({
  harness: fx,
  tools: { getUserName: getUserNameTool },
  stopWhen: isStepCount(1),
  debug: { enabled: true },
  telemetry: {
    integrations: [
      createTraceTreeReporter(),
      createFileReporter({
        dir: '.harness-observability/fx/workflow-stepped',
      }),
    ],
  },
});
