import {
  HarnessAgent,
  createFileReporter,
  createTraceTreeReporter,
} from '@ai-toolkit/harness/agent';
import { cursor } from '@ai-toolkit/harness-cursor';
import { getUserNameTool } from '@/lib/tools/get-user-name-tool';
import { isStepCount } from 'ai';

export const cursorSteppedWorkflowAgent = new HarnessAgent({
  harness: cursor,
  tools: { getUserName: getUserNameTool },
  stopWhen: isStepCount(1),
  debug: { enabled: true },
  telemetry: {
    integrations: [
      createTraceTreeReporter(),
      createFileReporter({
        dir: '.harness-observability/cursor/workflow-stepped',
      }),
    ],
  },
});
