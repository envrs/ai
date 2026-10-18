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
import { createKhulnasoftSandbox } from '@ai-toolkit/sandbox-vercel';
import type { InferUITools, UIMessage } from 'ai';

export const weatherDeepAgentsHarnessAgent = new HarnessAgent({
  harness: deepAgents,
  instructions: weatherInstructions,
  skills: [weatherForecastSkill, weatherCodesSkill],
  tools: { get_weather: weatherTool },
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
      createFileReporter({ dir: '.harness-observability/deepagents/weather' }),
    ],
  },
});

// See basic-agent.ts for why the UIMessage type derives from agent.tools.
export type WeatherDeepAgentsHarnessAgentMessage = UIMessage<
  unknown,
  never,
  InferUITools<typeof weatherDeepAgentsHarnessAgent.tools>
>;
