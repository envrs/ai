import type { VersionedSourceEntry } from '../source';
import { getRootLang } from '@/lib/geistdocs/root-params';

type Transform = (markdown: string) => string;

type SourcePage = {
  url: string;
  slugs: string[];
  data: { title?: string; description?: string };
  getText: (type: 'raw' | 'processed') => Promise<string>;
};

const markdownResponse = (body: string) =>
  new Response(body, {
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });

/**
 * `/llms.txt`: every page across the given sources as one Markdown index, each
 * entry linking to the page's own Markdown endpoint.
 */
export const createLlmsRoute = ({
  sources,
  transform = markdown => markdown,
}: {
  sources: VersionedSourceEntry[];
  transform?: Transform;
}) => {
  const GET = async () => {
    const lang = await getRootLang();
    const sections: string[] = [];

    for (const source of sources) {
      const pages = source.loader.getPages(lang) as unknown as SourcePage[];
      if (pages.length === 0) continue;

      const lines = [
        `## ${source.label}`,
        '',
        ...pages
          .slice()
          .sort((a, b) => a.url.localeCompare(b.url))
          .map(page => {
            const title = page.data.title ?? page.url;
            const summary = page.data.description ? `: ${page.data.description}` : '';
            return `- [${title}](${page.url}.md)${summary}`;
          }),
        '',
      ];

      sections.push(transform(lines.join('\n')));
    }

    return markdownResponse(sections.join('\n'));
  };

  return { GET };
};

/**
 * `/…md`: the processed Markdown of a single page. Code-template placeholders
 * are resolved so the result is runnable rather than containing tokens.
 */
export const createDocsMarkdownRoute = ({
  source,
  transform = markdown => markdown,
}: {
  source: VersionedSourceEntry;
  transform?: Transform;
}) => {
  const GET = async (request: Request) => {
    const lang = await getRootLang();
    const { pathname } = new URL(request.url);
    const slug = pathname
      .split('/')
      .filter(Boolean)
      .slice(0, -1); // drop the trailing `index` segment of the .md route

    const page = source.loader.getPage(slug, lang) as unknown as
      | SourcePage
      | undefined;

    if (!page) {
      return markdownResponse(`# Not found\n\nNo page at ${pathname}.\n`);
    }

    const body = transform(await page.getText('processed'));
    return markdownResponse(body);
  };

  const generateStaticParams = async () => {
    const lang = await getRootLang();

    return source.loader
      .getPages(lang)
      .map(page => ({ slug: page.slugs }));
  };

  return { GET, generateStaticParams };
};