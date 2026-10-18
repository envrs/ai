import type { GeistdocsConfig } from '../config';
import { absoluteUrl } from '@/lib/geistdocs/site-url';

/**
 * `/agents.md`: machine-readable product description so coding agents can
 * decide whether this site is relevant before crawling it.
 */
export const createAgentsRoute = ({ config }: { config?: GeistdocsConfig }) => {
  const GET = async () => {
    const host = absoluteUrl('/').replace(/\/$/, '');
    const product = config?.agent?.product;

    const lines = [
      `# ${product?.name ?? config?.title ?? 'Documentation'}`,
      '',
      product?.description ?? '',
      '',
      product?.category ? `- Category: ${product.category}` : '',
      ...(product?.audience?.map(
        audience => `- Audience: ${audience}`,
      ) ?? []),
      ...(product?.useCases?.map(useCase => `- Use case: ${useCase}`) ?? []),
      config?.github
        ? `- Source: ${host}/ (${config.github.owner}/${config.github.repo})`
        : `- Source: ${host}/`,
      '',
      `Start at ${host}/llms.txt for the full page index, or ${host}/sitemap.md for a browsable index.`,
      '',
    ].filter(line => line !== undefined);

    return new Response(lines.join('\n'), {
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=3600',
        'Content-Type': 'text/markdown; charset=utf-8',
      },
    });
  };

  const generateStaticParams = async () => [{}];

  return { GET, generateStaticParams };
};