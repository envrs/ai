import { weatherTool } from '@/lib/tools/weather-tool';
import {
  WEATHER_CODES_REFERENCE,
  weatherCodesSkill,
  weatherForecastSkill,
  weatherInstructions,
} from '@/lib/weather-utils';
import {
  createFileReporter,
  createTraceTreeReporter,
  HarnessAgent,
} from '@ai-toolkit/harness/agent';
import { deepAgents } from '@ai-toolkit/harness-deepagents';
import { createKhulnasoftSandbox } from '@ai-toolkit/sandbox-khulnasoft';
import type { InferUITools, UIMessage } from 'ai';

export const weatherApprovalDeepAgentsHarnessAgent = new HarnessAgent({
  harness: deepAgents,
  instructions: weatherInstructions,
  skills: [weatherForecastSkill, weatherCodesSkill],
  tools: { get_weather: weatherTool },
  // Host-tool approval is handled by HarnessAgent, independent of the adapter's
  // built-in tool approval support.
  toolApproval: {
    get_weather: 'user-approval',
  },
  sandbox: createKhulnasoftSandbox({
    runtime: 'node24',
    ports: [4000],
  }),
  sandboxConfig: {
    onSession: async ({ session, sessionWorkDir, abortSignal }) => {
      await session.writeTextFile({
        path: `${sessionWorkDir}/weather-codes.md`,
        content: WEATHER_CODES_REFERENCE,
        abortSignal,
      });
    },
  },
  debug: { enabled: true },
  telemetry: {
    integrations: [
      createTraceTreeReporter(),
      createFileReporter({
        dir: '.harness-observability/deepagents/weather-approval',
      }),
    ],
  },
});

export type WeatherApprovalDeepAgentsHarnessAgentMessage = UIMessage<
  unknown,
  never,
  InferUITools<typeof weatherApprovalDeepAgentsHarnessAgent.tools>
>;
