import { weatherTool } from '@/tool/weather-tool';
import { deepSeek } from '@ai-toolkit/deepseek';
import { ToolLoopAgent, type InferAgentUIMessage } from 'ai';
export const deepseekToolsAgent = new ToolLoopAgent({
  model: deepSeek('deepseek-v4-pro'),
  tools: { weather: weatherTool },
});

export type DeepSeekToolsAgentMessage = InferAgentUIMessage<
  typeof deepseekToolsAgent
>;
