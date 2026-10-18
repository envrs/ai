import type { GeistdocsConfig } from '../config';
import type { VersionedSourceEntry } from '../source';
import { getRootLang } from '@/lib/geistdocs/root-params';
import { absoluteUrl, siteUrlIssue } from '@/lib/geistdocs/site-url';

type SourcePage = {
  url: string;
  slugs: string[];
  data: { title?: string; description?: string };
};

const markdownResponse = (body: string) =>
  new Response(body, {
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });

/**
 * `/sitemap.md`: a Markdown page index grouped by content family, used by
 * agents to discover the site's public documentation.
 */
export const createSitemapMarkdownRoute = ({
  config,
  sources,
  title,
}: {
  config?: GeistdocsConfig;
  sources: { source: VersionedSourceEntry; title: string }[];
  title: string;
}) => {
  const GET = async () => {
    const lang = await getRootLang();
    const host = absoluteUrl('/').replace(/\/$/, '');

    const sections = sources.map(({ source, title: groupTitle }) => {
      const pages = (source.loader.getPages(lang) as unknown as SourcePage[])
        .slice()
        .sort((a, b) => a.url.localeCompare(b.url));

      return [
        `## ${groupTitle}`,
        '',
        ...pages.map(page => {
          const pageTitle = page.data.title ?? page.url;
          const summary = page.data.description
            ? `: ${page.data.description}`
            : '';
          return `- [${pageTitle}](${host}${page.url})${summary}`;
        }),
        '',
      ].join('\n');
    });

    const header = [
      `# ${title}`,
      '',
      `Source: ${host}`,
      '',
      config?.title ? `Product: ${config.title}` : '',
      '',
    ]
      .filter(Boolean)
      .join('\n');

    return markdownResponse(`${header}\n${sections.join('\n')}`);
  };

  const generateStaticParams = async () => {
    const lang = await getRootLang();
    void lang;
    return [{}];
  };

  return { GET, generateStaticParams, siteUrlIssue };
};