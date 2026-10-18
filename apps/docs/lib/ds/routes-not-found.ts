import type { GeistdocsConfig } from '../config';
import { absoluteUrl } from '@/lib/geistdocs/site-url';

/**
 * Backstop for unmatched paths. Browsers get an HTML 404; agents and Markdown
 * clients get a Markdown 404 that still advertises the discovery endpoints.
 */
export const createNotFoundRoute = ({ config }: { config?: GeistdocsConfig }) => {
  const GET = async (request: Request) => {
    const { pathname } = new URL(request.url);
    const accept = request.headers.get('accept') ?? '';

    if (accept.includes('text/markdown') || pathname.endsWith('.md')) {
      return new Response(
        [
          `# Not found: ${pathname}`,
          '',
          `No page matches ${pathname}.`,
          '',
          `- Page index: ${absoluteUrl('/llms.txt')}`,
          `- Browsable index: ${absoluteUrl('/sitemap.md')}`,
          `- Docs: ${absoluteUrl('/docs')}`,
          '',
        ].join('\n'),
        {
          status: 404,
          headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
        },
      );
    }

    return new Response(
      `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>404 — ${config?.title ?? 'Documentation'}</title>
  </head>
  <body>
    <h1>404</h1>
    <p>No page matches <code>${pathname}</code>.</p>
    <p><a href="/docs">Browse the documentation</a></p>
  </body>
</html>
`,
      {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      },
    );
  };

  return { GET };
};