import { transformerMetaHighlight } from '@shikijs/transformers';
import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import {
  rehypeCodeTemplates,
  remarkCodeTemplates,
} from './lib/geistdocs/code-templates.mjs';

const createDocsCollection = (dir: string) =>
  defineDocs({
    dir,
    docs: {
      schema: frontmatterSchema,
      postprocess: {
        includeProcessedMarkdown: true,
      },
    },
    meta: {
      schema: metaSchema,
    },
  });

export const docsV5 = createDocsCollection('content/v5/docs');
export const docsV6 = createDocsCollection('content/v6/docs');
export const docsV7 = createDocsCollection('content/v7/docs');
export const providersV5 = createDocsCollection('content/v5/providers');
export const providersV6 = createDocsCollection('content/v6/providers');
export const providersV7 = createDocsCollection('content/v7/providers');
export const cookbookV5 = createDocsCollection('content/v5/cookbook');
export const cookbookV6 = createDocsCollection('content/v6/cookbook');
export const cookbookV7 = createDocsCollection('content/v7/cookbook');

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkCodeTemplates],
    rehypePlugins: defaults => [rehypeCodeTemplates, ...defaults],
    rehypeCodeOptions: {
      themes: { light: 'github-light', dark: 'github-dark' },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        // Supports `{1,3-5}` fence meta produced by the sync-content
        // transform from the legacy `highlight="1,3-5"` convention.
        transformerMetaHighlight(),
      ],
    },
  },
});