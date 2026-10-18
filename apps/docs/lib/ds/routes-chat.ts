import type { GeistdocsConfig } from '../config';
import type { VersionedSourceEntry } from '../source';

const noProxyResponse = () =>
  new Response(
    [
      'Ask AI is not configured for this deployment.',
      '',
      'Set GEISTDOCS_CHAT_PROXY_URL (and optionally',
      'GEISTDOCS_CHAT_PROXY_TOKEN) to proxy questions to a chat backend.',
      '',
    ].join('\n'),
    {
      status: 501,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    },
  );

/**
 * `/api/chat`: forwards a question to the configured chat proxy.
 *
 * The upstream package bundled a hosted chat service. There is no equivalent
 * service here and this app ships no model credentials, so the route proxies
 * verbatim when a backend is configured and otherwise reports that Ask AI is
 * unavailable rather than pretending to answer.
 */
export const createChatRoute = ({
  config,
  model,
  proxy,
  sources,
}: {
  config?: GeistdocsConfig;
  model?: string;
  proxy?: { url: string; headers?: Record<string, string> };
  sources?: VersionedSourceEntry[];
}) => {
  void config;
  void model;
  void sources;

  const POST = async (request: Request) => {
    if (!proxy?.url) return noProxyResponse();

    const upstream = await fetch(proxy.url, {
      body: await request.text(),
      headers: {
        ...proxy.headers,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    return new Response(upstream.body, {
      headers: upstream.headers,
      status: upstream.status,
    });
  };

  return { POST, maxDuration: 60 };
};