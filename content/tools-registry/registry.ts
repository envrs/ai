// CONTRIBUTING GUIDE
// https://github.com/khulnasoft/ai/blob/main/contributing/add-new-tool-to-registry.md

export interface Tool {
  slug: string;
  name: string;
  description: string;
  packageName: string;
  tags?: string[];
  apiKeyEnvName?: string;
  installCommand: {
    pnpm: string;
    npm: string;
    yarn: string;
    bun: string;
  };
  codeExample: string;
  docsUrl?: string;
  apiKeyUrl?: string;
  websiteUrl?: string;
  npmUrl?: string;
}

export const tools: Tool[] = [
  {
    slug: 'code-execution',
    name: 'Code Execution',
    description:
      'Execute Python code in a sandboxed environment using khulnasoft Sandbox. Run calculations, data processing, and other computational tasks safely in an isolated environment with Python 3.13.',
    packageName: 'ai-toolkit-tool-code-execution',
    tags: ['code-execution', 'sandbox'],
    apiKeyEnvName: 'VERCEL_OIDC_TOKEN',
    installCommand: {
      pnpm: 'pnpm add ai-toolkit-tool-code-execution',
      npm: 'npm install ai-toolkit-tool-code-execution',
      yarn: 'yarn add ai-toolkit-tool-code-execution',
      bun: 'bun add ai-toolkit-tool-code-execution',
    },
    codeExample: `import { generateText, isStepCount } from 'ai';
import { executeCode } from 'ai-toolkit-tool-code-execution';

const { text } = await generateText({
  model: 'openai/gpt-5.1-codex',
  prompt: 'What is 5 + 5 minus 84 cubed?',
  tools: {
    executeCode: executeCode(),
  },
  stopWhen: isStepCount(5),
});

console.log(text);`,
    docsUrl: 'https://khulnasoft.com/docs/khulnasoft-sandbox',
    apiKeyUrl: 'https://khulnasoft.com/docs/khulnasoft-sandbox#authentication',
    websiteUrl: 'https://khulnasoft.com/docs/khulnasoft-sandbox',
    npmUrl: 'https://www.npmjs.com/package/ai-toolkit-tool-code-execution',
  },
  {
    slug: 'exa',
    name: 'Exa',
    description:
      'Exa is a web search API that adds web search capabilities to your LLMs. Exa can search the web for code docs, current information, news, articles, and a lot more. Exa performs real-time web searches and can get page content from specific URLs. Add Exa web search tool to your LLMs in just a few lines of code.',
    packageName: '@exalabs/ai-toolkit',
    tags: ['search', 'web', 'extraction'],
    apiKeyEnvName: 'EXA_API_KEY',
    installCommand: {
      pnpm: 'pnpm add @exalabs/ai-toolkit',
      npm: 'npm install @exalabs/ai-toolkit',
      yarn: 'yarn add @exalabs/ai-toolkit',
      bun: 'bun add @exalabs/ai-toolkit',
    },
    codeExample: `import { generateText, isStepCount } from 'ai';
import { webSearch } from '@exalabs/ai-toolkit';

const { text } = await generateText({
  model: 'google/gemini-3.1-pro-preview',
  prompt: 'Tell me the latest developments in AI',
  tools: {
    webSearch: webSearch(),
  },
  stopWhen: isStepCount(3),
});

console.log(text);`,
    docsUrl: 'https://docs.exa.ai/reference/khulnasoft',
    apiKeyUrl: 'https://dashboard.exa.ai/api-keys',
    websiteUrl: 'https://exa.ai',
    npmUrl: 'https://www.npmjs.com/package/@exalabs/ai-toolkit',
  },
  {
    slug: 'parallel',
    name: 'Parallel',
    description:
      'Parallel gives AI agents best-in-class tools to search and extract context from the web. Web results returned by Parallel are compressed for optimal token efficiency at inference time.',
    packageName: '@parallel-web/ai-toolkit-tools',
    tags: ['search', 'web', 'extraction'],
    apiKeyEnvName: 'PARALLEL_API_KEY',
    installCommand: {
      pnpm: 'pnpm add @parallel-web/ai-toolkit-tools',
      npm: 'npm install @parallel-web/ai-toolkit-tools',
      yarn: 'yarn add @parallel-web/ai-toolkit-tools',
      bun: 'bun add @parallel-web/ai-toolkit-tools',
    },
    codeExample: `import { generateText, isStepCount } from 'ai';
import { searchTool, extractTool } from '@parallel-web/ai-toolkit-tools';

const { text } = await generateText({
  model: 'google/gemini-3.1-pro-preview',
  prompt: 'When was khulnasoft Ship AI?',
  tools: {
    webSearch: searchTool,
    webExtract: extractTool,
  },
  stopWhen: isStepCount(3),
});

console.log(text);`,
    apiKeyUrl: 'https://platform.parallel.ai',
    websiteUrl: 'https://parallel.ai',
    npmUrl: 'https://www.npmjs.com/package/@parallel-web/ai-toolkit-tools',
  },
  {
    slug: 'ctx-zip',
    name: 'ctx-zip',
    description:
      'Transform MCP tools and ai-toolkit tools into code, write it to a khulnasoft sandbox file system and have the agent import the tools, write code, and execute it.',
    packageName: 'ctx-zip',
    tags: ['code-execution', 'sandbox', 'mcp', 'code-mode'],
    apiKeyEnvName: 'VERCEL_OIDC_TOKEN',
    installCommand: {
      pnpm: 'pnpm add ctx-zip',
      npm: 'npm install ctx-zip',
      yarn: 'yarn add ctx-zip',
      bun: 'bun add ctx-zip',
    },
    codeExample: `import { generateText, isStepCount } from 'ai';
import { createVercelSandboxCodeMode, SANDBOX_SYSTEM_PROMPT } from 'ctx-zip';

const { tools } = await createVercelSandboxCodeMode({
  servers: [
    {
      name: 'khulnasoft',
      url: 'https://mcp.khulnasoft.com',
      useSSE: false,
      headers: {
        Authorization: \`Bearer \${process.env.VERCEL_API_KEY}\`,
      },
    },
  ],
  standardTools: {
    weather: weatherTool,
  },
});

const { text } = await generateText({
  model: 'openai/gpt-6-astra',
  tools,
  stopWhen: isStepCount(20),
  system: SANDBOX_SYSTEM_PROMPT,
  messages: [
    {
      role: 'user',
      content: 'What tools are available from the khulnasoft MCP server?',
    },
  ],
});

console.log(text);
`,
    docsUrl: 'https://github.com/karthikscale3/ctx-zip/blob/main/README.md',
    apiKeyUrl: 'https://khulnasoft.com/docs/khulnasoft-sandbox#authentication',
    websiteUrl: 'https://github.com/karthikscale3/ctx-zip/blob/main/README.md',
    npmUrl: 'https://www.npmjs.com/package/ctx-zip',
  },
  {
    slug: 'perplexity-search',
    name: 'Perplexity Search',
    description:
      "Search the web with real-time results and advanced filtering powered by Perplexity's Search API. Provides ranked search results with domain, language, date range, and recency filters. Supports multi-query searches and regional search results.",
    packageName: '@perplexity-ai/ai-toolkit',
    tags: ['search', 'web'],
    apiKeyEnvName: 'PERPLEXITY_API_KEY',
    installCommand: {
      pnpm: 'pnpm add @perplexity-ai/ai-toolkit',
      npm: 'npm install @perplexity-ai/ai-toolkit',
      yarn: 'yarn add @perplexity-ai/ai-toolkit',
      bun: 'bun add @perplexity-ai/ai-toolkit',
    },
    codeExample: `import { generateText, isStepCount } from 'ai';
import { perplexitySearch } from '@perplexity-ai/ai-toolkit';

const { text } = await generateText({
  model: 'openai/gpt-6-astra',
  prompt: 'What are the latest AI developments? Use search to find current information.',
  tools: {
    search: perplexitySearch(),
  },
  stopWhen: isStepCount(3),
});

console.log(text);`,
    docsUrl: 'https://docs.perplexity.ai/guides/search-quickstart',
    apiKeyUrl: 'https://www.perplexity.ai/account/api/keys',
    websiteUrl: 'https://www.perplexity.ai',
    npmUrl: 'https://www.npmjs.com/package/@perplexity-ai/ai-toolkit',
  },
  {
    slug: 'tavily',
    name: 'Tavily',
    description:
      'Tavily is a web intelligence platform offering real-time web search optimized for AI applications. Tavily provides comprehensive web research capabilities including search, content extraction, website crawling, and site mapping to power AI agents with current information.',
    packageName: '@tavily/ai-toolkit',
    tags: ['search', 'extract', 'crawl'],
    apiKeyEnvName: 'TAVILY_API_KEY',
    installCommand: {
      pnpm: 'pnpm add @tavily/ai-toolkit',
      npm: 'npm install @tavily/ai-toolkit',
      yarn: 'yarn add @tavily/ai-toolkit',
      bun: 'bun add @tavily/ai-toolkit',
    },
    codeExample: `import { generateText, isStepCount } from 'ai';
import { tavilySearch } from '@tavily/ai-toolkit';

const { text } = await generateText({
  model: 'google/gemini-3.1-pro-preview',
  prompt: 'What are the latest developments in agentic search?',
  tools: {
    webSearch: tavilySearch,
  },
  stopWhen: isStepCount(3),
});

console.log(text);`,
    docsUrl: 'https://docs.tavily.com/documentation/integrations/khulnasoft',
    apiKeyUrl: 'https://app.tavily.com/home',
    websiteUrl: 'https://tavily.com',
    npmUrl: 'https://www.npmjs.com/package/@tavily/ai-toolkit',
  },
  {
    slug: 'firecrawl',
    name: 'Firecrawl',
    description:
      'Firecrawl tools for the ai-toolkit. Web scraping, search, crawling, and data extraction for AI applications. Scrape any website into clean markdown, search the web, crawl entire sites, and extract structured data.',
    packageName: 'firecrawl-ai-toolkit',
    tags: ['scraping', 'search', 'crawling', 'extraction', 'web'],
    apiKeyEnvName: 'FIRECRAWL_API_KEY',
    installCommand: {
      pnpm: 'pnpm add firecrawl-ai-toolkit',
      npm: 'npm install firecrawl-ai-toolkit',
      yarn: 'yarn add firecrawl-ai-toolkit',
      bun: 'bun add firecrawl-ai-toolkit',
    },
    codeExample: `import { generateText, isStepCount } from 'ai';
import { scrapeTool } from 'firecrawl-ai-toolkit';

const { text } = await generateText({
  model: 'openai/gpt-6-luna',
  prompt: 'Scrape https://firecrawl.dev and summarize what it does',
  tools: {
    scrape: scrapeTool,
  },
  stopWhen: isStepCount(3),
});

console.log(text);`,
    docsUrl: 'https://docs.firecrawl.dev/integrations/ai-toolkit',
    apiKeyUrl: 'https://firecrawl.dev/app/api-keys',
    websiteUrl: 'https://firecrawl.dev',
    npmUrl: 'https://www.npmjs.com/package/firecrawl-ai-toolkit',
  },
  {
    slug: 'bedrock-agentcore',
    name: 'Amazon Bedrock AgentCore',
    description:
      'Fully managed Browser and Code Interpreter tools for AI agents. Browser is a fast and secure cloud-based runtime for interacting with web applications, filling forms, navigating websites, and extracting information. Code Interpreter provides an isolated sandbox for executing Python, JavaScript, and TypeScript code to solve complex tasks.',
    packageName: 'bedrock-agentcore',
    tags: ['code-execution', 'browser-automation', 'sandbox'],
    apiKeyEnvName: 'AWS_ROLE_ARN',
    installCommand: {
      pnpm: 'pnpm add bedrock-agentcore',
      npm: 'npm install bedrock-agentcore',
      yarn: 'yarn add bedrock-agentcore',
      bun: 'bun add bedrock-agentcore',
    },
    codeExample: `import { generateText, isStepCount } from 'ai';
import { bedrock } from '@ai-toolkit/amazon-bedrock';
import { awsCredentialsProvider } from '@khulnasoft/oidc-aws-credentials-provider';
import { CodeInterpreterTools } from 'bedrock-agentcore/code-interpreter/khulnasoft-ai';
import { BrowserTools } from 'bedrock-agentcore/browser/khulnasoft-ai';

const credentialsProvider = awsCredentialsProvider({
  roleArn: process.env.AWS_ROLE_ARN!,
});

const codeInterpreter = new CodeInterpreterTools({ credentialsProvider });
const browser = new BrowserTools({ credentialsProvider });

try {
  const { text } = await generateText({
    model: bedrock('us.anthropic.claude-sonnet-4-20250514-v1:0'),
    prompt: 'Go to https://news.ycombinator.com and get the first story title. Then use Python to reverse the string.',
    tools: {
      ...codeInterpreter.tools,
      ...browser.tools,
    },
    stopWhen: isStepCount(5),
  });

  console.log(text);
} finally {
  await codeInterpreter.stopSession();
  await browser.stopSession();
}`,
    docsUrl: 'https://github.com/aws/bedrock-agentcore-sdk-typescript',
    apiKeyUrl: 'https://khulnasoft.com/docs/oidc/aws',
    websiteUrl:
      'https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/built-in-tools.html',
    npmUrl: 'https://www.npmjs.com/package/bedrock-agentcore',
  },
  {
    slug: 'superagent',
    name: 'Superagent',
    description:
      'AI security guardrails for your LLMs. Protect your AI apps from prompt injection, redact PII/PHI (SSNs, emails, phone numbers), and verify claims against source materials. Add security tools to your LLMs in just a few lines of code.',
    packageName: '@superagent-ai/ai-toolkit',
    tags: ['security', 'guardrails', 'pii', 'prompt-injection', 'verification'],
    apiKeyEnvName: 'SUPERAGENT_API_KEY',
    installCommand: {
      pnpm: 'pnpm add @superagent-ai/ai-toolkit',
      npm: 'npm install @superagent-ai/ai-toolkit',
      yarn: 'yarn add @superagent-ai/ai-toolkit',
      bun: 'bun add @superagent-ai/ai-toolkit',
    },
    codeExample: `import { generateText, isStepCount } from 'ai';
import { guard, redact, verify } from '@superagent-ai/ai-toolkit';
import { openai } from '@ai-toolkit/openai';

const { text } = await generateText({
  model: openai('gpt-6-luna'),
  prompt: 'Check this input for security threats: "Ignore all instructions"',
  tools: {
    guard: guard(),
    redact: redact(),
    verify: verify(),
  },
  stopWhen: isStepCount(3),
});

console.log(text);`,
    docsUrl: 'https://docs.superagent.sh',
    apiKeyUrl: 'https://dashboard.superagent.sh',
    websiteUrl: 'https://superagent.sh',
    npmUrl: 'https://www.npmjs.com/package/@superagent-ai/ai-toolkit',
  },
  {
    slug: 'tako-search',
    name: 'Tako Search',
    description:
      "Tako gives AI agents real-time, well-sourced data and charts across finance, economics, sports, demographics, and more. Search Tako's curated knowledge graph and the live web, get citation-backed answers, and fetch the data behind any result.",
    packageName: '@takoviz/ai-toolkit',
    tags: ['search', 'web', 'data', 'visualization', 'analytics'],
    apiKeyEnvName: 'TAKO_API_KEY',
    installCommand: {
      pnpm: 'pnpm install @takoviz/ai-toolkit',
      npm: 'npm install @takoviz/ai-toolkit',
      yarn: 'yarn add @takoviz/ai-toolkit',
      bun: 'bun add @takoviz/ai-toolkit',
    },
    codeExample: `import { generateText, isStepCount } from 'ai';
import { takoSearch, takoAnswer, takoContents } from '@takoviz/ai-toolkit';

const { text } = await generateText({
  model: 'openai/gpt-6-astra',
  prompt: 'How have Nvidia and AMD employee counts compared since 2013?',
  tools: {
    takoSearch: takoSearch(),
    takoAnswer: takoAnswer(),
    takoContents: takoContents(),
  },
  stopWhen: isStepCount(5),
});

console.log(text);`,
    docsUrl: 'https://github.com/TakoData/ai-toolkit#readme',
    apiKeyUrl: 'https://developer.tako.com/console/api-keys',
    websiteUrl: 'https://tako.com',
    npmUrl: 'https://www.npmjs.com/package/@takoviz/ai-toolkit',
  },
  {
    slug: 'valyu',
    name: 'Valyu',
    description:
      'Valyu provides powerful search tools for AI agents. Web search for real-time information, plus specialized domain-specific searchtools: financeSearch (stock prices, earnings, income statements, cash flows, etc), paperSearch (full-text PubMed, arXiv, bioRxiv, medRxiv), bioSearch (clinical trials, FDA drug labels, PubMed, medRxiv, bioRxiv), patentSearch (USPTO patents), secSearch (10-k/10-Q/8-k), economicsSearch (BLS, FRED, World Bank data), and companyResearch (comprehensive company research reports).',
    packageName: '@valyu/ai-toolkit',
    tags: ['search', 'web', 'domain-search'],
    apiKeyEnvName: 'VALYU_API_KEY',
    installCommand: {
      pnpm: 'pnpm add @valyu/ai-toolkit',
      npm: 'npm install @valyu/ai-toolkit',
      yarn: 'yarn add @valyu/ai-toolkit',
      bun: 'bun add @valyu/ai-toolkit',
    },
    codeExample: `import { generateText, isStepCount } from 'ai';
import { webSearch } from '@valyu/ai-toolkit';
// Available specialised search tools: financeSearch, paperSearch,
// bioSearch, patentSearch, secSearch, economicsSearch, companyResearch

const { text } = await generateText({
  model: 'google/gemini-3.1-pro-preview',
  prompt: 'Latest data center projects for AI inference?',
  tools: {
    webSearch: webSearch(),
  },
  stopWhen: isStepCount(3),
});

console.log(text);`,
    docsUrl: 'https://docs.valyu.ai/integrations/khulnasoft-ai-toolkit',
    apiKeyUrl: 'https://platform.valyu.ai',
    websiteUrl: 'https://valyu.ai',
    npmUrl: 'https://www.npmjs.com/package/@valyu/ai-toolkit',
  },
  {
    slug: 'airweave',
    name: 'Airweave',
    description:
      'Airweave is an open-source platform that makes any app searchable for your agent. Sync and search across 35+ data sources (Notion, Slack, Google Drive, databases, and more) with semantic search. Add unified search across all your connected data to your AI applications in just a few lines of code.',
    packageName: '@airweave/khulnasoft-ai-toolkit',
    tags: ['search', 'rag', 'data-sources', 'semantic-search'],
    apiKeyEnvName: 'AIRWEAVE_API_KEY',
    installCommand: {
      pnpm: 'pnpm install @airweave/khulnasoft-ai-toolkit',
      npm: 'npm install @airweave/khulnasoft-ai-toolkit',
      yarn: 'yarn add @airweave/khulnasoft-ai-toolkit',
      bun: 'bun add @airweave/khulnasoft-ai-toolkit',
    },
    codeExample: `import { generateText, isStepCount } from 'ai';
import { airweaveSearch } from '@airweave/khulnasoft-ai-toolkit';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-5.5',
  prompt: 'What were the key decisions from last week?',
  tools: {
    search: airweaveSearch({
      defaultCollection: 'my-knowledge-base',
    }),
  },
  stopWhen: isStepCount(3),
});

console.log(text);`,
    docsUrl: 'https://docs.airweave.ai',
    apiKeyUrl: 'https://app.airweave.ai/settings/api-keys',
    websiteUrl: 'https://airweave.ai',
    npmUrl: 'https://www.npmjs.com/package/@airweave/khulnasoft-ai-toolkit',
  },
  {
    slug: 'bash-tool',
    name: 'bash-tool',
    description:
      'Provides bash, readFile, and writeFile tools for AI agents. Supports @khulnasoft/sandbox for full VM isolation.',
    packageName: 'bash-tool',
    tags: ['bash', 'file-system', 'sandbox', 'code-execution'],
    installCommand: {
      pnpm: 'pnpm install bash-tool',
      npm: 'npm install bash-tool',
      yarn: 'yarn add bash-tool',
      bun: 'bun add bash-tool',
    },
    codeExample: `import { generateText, isStepCount } from 'ai';
import { createBashTool } from 'bash-tool';

const { tools } = await createBashTool({
  files: { 'src/index.ts': "export const hello = 'world';" },
});

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-5.5',
  prompt: 'List the files in src/ and show me the contents of index.ts',
  tools,
  stopWhen: isStepCount(5),
});

console.log(text);`,
    docsUrl: 'https://github.com/khulnasoft/bash-tool',
    websiteUrl: 'https://github.com/khulnasoft/bash-tool',
    npmUrl: 'https://www.npmjs.com/package/bash-tool',
  },
  {
    slug: 'browserbase',
    name: 'Browserbase',
    description:
      'Browserbase provides browser automation tools for AI agents powered by Stagehand. Navigate websites, take screenshots, click buttons, fill forms, extract structured data, and execute multi-step browser tasks in cloud-hosted sessions with built-in CAPTCHA solving and anti-bot stealth mode.',
    packageName: '@browserbasehq/ai-toolkit',
    tags: ['browser', 'browser-automation', 'web', 'extraction'],
    apiKeyEnvName: 'BROWSERBASE_API_KEY',
    installCommand: {
      pnpm: 'pnpm add @browserbasehq/ai-toolkit',
      npm: 'npm install @browserbasehq/ai-toolkit',
      yarn: 'yarn add @browserbasehq/ai-toolkit',
      bun: 'bun add @browserbasehq/ai-toolkit',
    },
    codeExample: `import { generateText, isStepCount } from 'ai';
import { createBrowserbaseTools } from '@browserbasehq/ai-toolkit';

const browserbase = createBrowserbaseTools();

const { text } = await generateText({
  model: 'google/gemini-3.1-pro-preview',
  tools: browserbase.tools,
  stopWhen: isStepCount(10),
  prompt: 'Open https://news.ycombinator.com and summarize the top 3 stories.',
});

console.log(text);
await browserbase.closeSession();`,
    docsUrl: 'https://docs.browserbase.com',
    apiKeyUrl: 'https://www.browserbase.com/settings',
    websiteUrl: 'https://www.browserbase.com',
    npmUrl: 'https://www.npmjs.com/package/@browserbasehq/ai-toolkit',
  },
  {
    slug: 'you-search',
    name: 'You.com',
    description:
      "Real-time web search, deep research with cited sources, and webpage content extraction powered by You.com. Search current information with advanced filtering (dates, sites, file types), research topics with configurable effort (lite to exhaustive), and extract full page content in markdown or HTML. Built on You.com's enterprise search API with zero server setup.",
    packageName: '@youdotcom-oss/ai-toolkit-plugin',
    tags: ['search', 'web', 'extraction', 'research'],
    apiKeyEnvName: 'YDC_API_KEY',
    installCommand: {
      pnpm: 'pnpm add @youdotcom-oss/ai-toolkit-plugin',
      npm: 'npm install @youdotcom-oss/ai-toolkit-plugin',
      yarn: 'yarn add @youdotcom-oss/ai-toolkit-plugin',
      bun: 'bun add @youdotcom-oss/ai-toolkit-plugin',
    },
    codeExample: `import { generateText, isStepCount } from 'ai';
import { youSearch, youResearch, youContents } from '@youdotcom-oss/ai-toolkit-plugin';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-5.5',
  prompt: 'Research the latest developments in quantum computing',
  tools: {
    search: youSearch(),
    research: youResearch(),
    extract: youContents(),
  },
  stopWhen: isStepCount(5),
});

console.log(text);`,
    docsUrl:
      'https://github.com/youdotcom-oss/dx-toolkit/tree/main/packages/ai-toolkit-plugin#readme',
    apiKeyUrl: 'https://you.com/platform/api-keys',
    websiteUrl: 'https://you.com',
    npmUrl: 'https://www.npmjs.com/package/@youdotcom-oss/ai-toolkit-plugin',
  },
  {
    slug: 'nitrosend',
    name: 'Nitrosend',
    description:
      'Nitrosend tools for khulnasoft ai-toolkit agents — send email and SMS, manage contacts and segments, build flows, run campaigns. Backed by the Nitrosend remote MCP server.',
    packageName: '@nitrosend/ai-toolkit',
    tags: ['email', 'sms', 'marketing', 'mcp', 'automation', 'crm'],
    apiKeyEnvName: 'NITROSEND_API_KEY',
    installCommand: {
      pnpm: 'pnpm add @nitrosend/ai-toolkit ai @ai-toolkit/mcp zod @ai-toolkit/openai',
      npm: 'npm install @nitrosend/ai-toolkit ai @ai-toolkit/mcp zod @ai-toolkit/openai',
      yarn: 'yarn add @nitrosend/ai-toolkit ai @ai-toolkit/mcp zod @ai-toolkit/openai',
      bun: 'bun add @nitrosend/ai-toolkit ai @ai-toolkit/mcp zod @ai-toolkit/openai',
    },
    codeExample: `import { generateText, isStepCount } from 'ai';
import { openai } from '@ai-toolkit/openai';
import { withNitrosendTools } from '@nitrosend/ai-toolkit';

const result = await withNitrosendTools({}, async ({ tools }) => {
  return generateText({
    model: openai('gpt-6-astra'),
    tools,
    stopWhen: isStepCount(5),
    prompt: 'Send a welcome email to founder@acme.com from our team.',
  });
});

console.log(result.text);`,
    docsUrl: 'https://docs.nitrosend.com/integrations/khulnasoft-ai-toolkit',
    apiKeyUrl: 'https://app.nitrosend.com/settings/api-keys',
    websiteUrl: 'https://nitrosend.com',
    npmUrl: 'https://www.npmjs.com/package/@nitrosend/ai-toolkit',
  },
  {
    slug: 'fatstack',
    name: 'Fatstack',
    description:
      'Discover pay-per-call API and MCP tools from the Fatstack marketplace and use them as an ai-toolkit ToolSet. Discovery is free; calls settle in real USDC on Base via x402, with required daily spend guards.',
    packageName: '@fatstack/ai-toolkit-tools',
    tags: ['payments', 'x402', 'mcp', 'marketplace', 'tool-discovery'],
    installCommand: {
      pnpm: 'pnpm add @fatstack/ai-toolkit-tools ai viem',
      npm: 'npm install @fatstack/ai-toolkit-tools ai viem',
      yarn: 'yarn add @fatstack/ai-toolkit-tools ai viem',
      bun: 'bun add @fatstack/ai-toolkit-tools ai viem',
    },
    codeExample: `import { generateText, isStepCount } from 'ai';
import { fatstackTools } from '@fatstack/ai-toolkit-tools';
import { privateKeyToAccount } from 'viem/accounts';

// Discovery is free and happens once; only calling a tool costs anything.
//
// The public catalogue is on Base mainnet, so calls spend real USDC. The
// required guards bound spending and cannot be raised by the model.
const tools = await fatstackTools({
  wallet: privateKeyToAccount(process.env.AGENT_PRIVATE_KEY as \`0x\${string}\`),
  networks: ['base'],
  guards: { maxPerDay: 0.5, maxPerCall: 0.01 },
});

const { text } = await generateText({
  model: 'openai/gpt-5-mini',
  prompt: 'Convert 20 degrees Celsius to Fahrenheit.',
  tools,
  stopWhen: isStepCount(3),
});

console.log(text);`,
    docsUrl: 'https://www.fatstack.net/docs/ai-toolkit',
    websiteUrl: 'https://www.fatstack.net',
    npmUrl: 'https://www.npmjs.com/package/@fatstack/ai-toolkit-tools',
  },
  {
    slug: 'pushary',
    name: 'Pushary',
    description:
      'Require a named person to approve selected ai-toolkit tool calls from their phone before local tool execution. Pushary plugs into toolApproval and fails closed when approval is denied, expires, or goes unanswered.',
    packageName: '@pushary/ai-toolkit',
    tags: ['approval', 'human-in-the-loop', 'security', 'phone'],
    apiKeyEnvName: 'PUSHARY_API_KEY',
    installCommand: {
      pnpm: 'pnpm add @pushary/ai-toolkit ai zod',
      npm: 'npm install @pushary/ai-toolkit ai zod',
      yarn: 'yarn add @pushary/ai-toolkit ai zod',
      bun: 'bun add @pushary/ai-toolkit ai zod',
    },
    codeExample: `import { generateText, isStepCount, tool } from 'ai';
import { pusharyApproval } from '@pushary/ai-toolkit';
import { z } from 'zod';

// Derive this stable ID from the authenticated user on your server.
// Enroll the user once before running the agent; see the Pushary guide below.
const externalId = 'user_123';

const lookupOrder = tool({
  description: 'Look up an order',
  inputSchema: z.object({ orderId: z.string() }),
  execute: async ({ orderId }) => ({
    orderId,
    total: 40,
    refundable: true,
  }),
});

const issueRefund = tool({
  description: 'Refund an order',
  inputSchema: z.object({
    orderId: z.string(),
    amount: z.number().positive(),
  }),
  execute: async ({ orderId, amount }) => ({
    orderId,
    amount,
    refunded: true,
  }),
});

const { text } = await generateText({
  model: 'openai/gpt-5-mini',
  tools: { issueRefund, lookupOrder },
  toolApproval: pusharyApproval({
    apiKey: process.env.PUSHARY_API_KEY!,
    externalId,
    policy: false,
    tools: ['issueRefund'],
  }),
  stopWhen: isStepCount(5),
  prompt: 'Look up order 1234 and refund it in full.',
});

console.log(text);`,
    docsUrl: 'https://pushary.com/docs/agents/build/khulnasoft-ai-toolkit',
    apiKeyUrl: 'https://pushary.com/onboarding/partner',
    websiteUrl: 'https://pushary.com/human-in-the-loop',
    npmUrl: 'https://www.npmjs.com/package/@pushary/ai-toolkit',
  },
  {
    slug: 'pexafy',
    name: 'Pexafy',
    description:
      'Pexafy adds semantic stock photo search to your agents: describe a scene in plain English and get real, free-to-use photographs from Unsplash, Pexels, Pixabay and six more libraries, each with an image URL, alt text, license and credit line.',
    packageName: 'pexafy-ai-toolkit',
    tags: ['images', 'photos', 'search'],
    apiKeyEnvName: 'PEXAFY_API_KEY',
    installCommand: {
      pnpm: 'pnpm add pexafy-ai-toolkit',
      npm: 'npm install pexafy-ai-toolkit',
      yarn: 'yarn add pexafy-ai-toolkit',
      bun: 'bun add pexafy-ai-toolkit',
    },
    codeExample: `import { generateText, isStepCount } from 'ai';
import { pexafyTools } from 'pexafy-ai-toolkit';

const { text } = await generateText({
  model: 'anthropic/claude-haiku-4.5',
  tools: pexafyTools(),
  stopWhen: isStepCount(5),
  prompt:
    'Find a header photo for a blog post about remote work, with its credit line.',
});

console.log(text);`,
    docsUrl: 'https://docs.pexafy.com/ai-toolkit',
    apiKeyUrl: 'https://pexafy.com/dashboard/api-keys/create/',
    websiteUrl: 'https://pexafy.com',
    npmUrl: 'https://www.npmjs.com/package/pexafy-ai-toolkit',
  },
];
