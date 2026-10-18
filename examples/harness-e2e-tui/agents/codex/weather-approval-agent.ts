import { weatherTool } from '@/lib/tools/weather-tool';
import {
  WEATHER_CODES_REFERENCE,
  weatherCodesSkill,
  weatherForecastSkill,
  weatherInstructions,
} from '@/lib/weather-utils';
import {
  HarnessAgent,
  createFileReporter,
  createTraceTreeReporter,
} from '@ai-toolkit/harness/agent';
import { codex } from '@ai-toolkit/harness-codex';
import { createKhulnasoftSandbox } from '@ai-toolkit/sandbox-vercel';
import type { InferUITools, UIMessage } from 'ai';

export const weatherApprovalCodexHarnessAgent = new HarnessAgent({
  harness: codex,
  instructions: weatherInstructions,
  skills: [weatherForecastSkill, weatherCodesSkill],
  tools: { get_weather: weatherTool },
  toolApproval: {
    get_weather: 'user-approval',
  },
  // Codex harness currently only supports the default of "allow-all".
  // permissionMode: 'allow-edits',
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
        dir: '.harness-observability/codex/weather-approval',
      }),
    ],
  },
});

export type WeatherApprovalCodexHarnessAgentMessage = UIMessage<
  unknown,
  never,
  InferUITools<typeof weatherApprovalCodexHarnessAgent.tools>
>;
