import {
  HarnessAgent,
  createFileReporter,
  createTraceTreeReporter,
} from '@ai-toolkit/harness/agent';
import { openCode } from '@ai-toolkit/harness-opencode';
import { getUserNameTool } from '@/lib/tools/get-user-name-tool';
import { isStepCount } from 'ai';

export const openCodeSteppedWorkflowAgent = new HarnessAgent({
  harness: openCode,
  tools: { getUserName: getUserNameTool },
  stopWhen: isStepCount(1),
  debug: { enabled: true },
  telemetry: {
    integrations: [
      createTraceTreeReporter(),
      createFileReporter({
        dir: '.harness-observability/opencode/workflow-stepped',
      }),
    ],
  },
});
