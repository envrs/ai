'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import type { ReactNode } from 'react';
import { GeistdocsProvider } from '@/lib/ds/layout';
import type { GeistdocsConfig } from '@/lib/ds/config';

/**
 * Mounted in `[lang]/layout` so the first URL segment identifies the docs
 * version. The segment is forwarded as the search tag so search results stay
 * scoped to the version being read.
 */
export const DocsProvider = ({
  children,
  config,
  lang,
}: {
  children: ReactNode;
  config?: GeistdocsConfig;
  lang: string;
}) => {
  const segment = useSelectedLayoutSegment();
  const version = segment === 'v5' || segment === 'v6' ? segment : 'v7';

  return (
    <GeistdocsProvider
      config={config}
      lang={lang}
      // The tag becomes part of the search URL and the client's cache key.
      search={{ options: { tag: version } }}
    >
      {children}
    </GeistdocsProvider>
  );
};