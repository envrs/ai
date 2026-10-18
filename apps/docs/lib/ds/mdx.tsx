import Image from 'next/image';
import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';

/**
 * Baseline MDX element mapping. Markdown content relies on these being
 * styled: headings, lists, tables, blockquotes, and inline code all render as
 * plain elements without it.
 */
export const createMdxComponents = (
  overrides: MDXComponents = {},
): MDXComponents => ({
  a: ({ href = '', ...props }: ComponentProps<'a'>) => {
    const external = href.startsWith('http');

    return external ? (
      <a
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        {...props}
      />
    ) : (
      <Link href={href} {...props} />
    );
  },
  blockquote: props => (
    <blockquote
      className="my-6 border-l-2 border-gray-alpha-600 pl-4 text-gray-900 italic"
      {...props}
    />
  ),
  code: props => (
    <code
      className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-[0.9em] text-gray-1000"
      {...props}
    />
  ),
  h1: props => (
    <h1 className="mt-0 mb-4 text-heading-32 font-semibold" {...props} />
  ),
  h2: props => (
    <h2
      className="mt-10 mb-3 scroll-mt-20 text-heading-24 font-semibold"
      {...props}
    />
  ),
  h3: props => (
    <h3
      className="mt-8 mb-2 scroll-mt-20 text-heading-20 font-semibold"
      {...props}
    />
  ),
  h4: props => (
    <h4
      className="mt-6 mb-2 scroll-mt-20 text-heading-16 font-semibold"
      {...props}
    />
  ),
  hr: props => <hr className="my-8 border-gray-alpha-400" {...props} />,
  img: ({ alt, ...props }: ComponentProps<'img'>) =>
    props.src ? (
      <Image
        alt={alt ?? ''}
        className="rounded-md"
        height={props.height ?? 800}
        src={props.src}
        width={props.width ?? 1200}
      />
    ) : null,
  li: props => <li className="my-1 ml-5 list-disc" {...props} />,
  ol: props => <ol className="my-4 ml-5 list-decimal" {...props} />,
  p: props => <p className="my-4 leading-7" {...props} />,
  pre: props => (
    <pre
      className="overflow-x-auto rounded-lg border border-gray-alpha-400 bg-background-100 p-4 font-mono text-[13px] leading-6"
      {...props}
    />
  ),
  table: props => (
    <table className="my-6 w-full border-collapse text-left" {...props} />
  ),
  td: props => (
    <td className="border border-gray-alpha-400 px-3 py-2 align-top" {...props} />
  ),
  th: props => (
    <th className="border border-gray-alpha-400 px-3 py-2 font-medium" {...props} />
  ),
  tr: props => <tr className="even:bg-background-200" {...props} />,
  ul: props => <ul className="my-4 ml-5 list-disc" {...props} />,
  ...overrides,
});