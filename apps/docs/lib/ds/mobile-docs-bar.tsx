'use client';

import { useState } from 'react';
import { cn } from '@/lib/ds/utils';

type TocItem = {
  title: string;
  url: string;
  children?: TocItem[];
};

/**
 * Collapsible table of contents shown above the content on narrow screens. The
 * persistent sidebar TOC is hidden below `lg`, so this is the only TOC
 * affordance there.
 */
export const MobileDocsBar = ({ toc }: { toc?: TocItem[] }) => {
  const [open, setOpen] = useState(false);

  if (!toc?.length) return null;

  return (
    <div className="mb-6 rounded-md border border-gray-alpha-400 lg:hidden">
      <button
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3 text-label-14 font-medium text-gray-1000"
        onClick={() => setOpen(value => !value)}
        type="button"
      >
        On this page
        <span aria-hidden="true" className="text-gray-900">
          {open ? '−' : '+'}
        </span>
      </button>

      {open ? (
        <nav className="border-t border-gray-alpha-400 px-4 py-3">
          <ul className="flex flex-col gap-1.5">
            {toc.map(item => (
              <li key={item.url}>
                <a
                  className={cn('block text-label-13 text-gray-900')}
                  href={item.url}
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </a>
                {item.children?.length ? (
                  <ul className="mt-1.5 ml-3 flex flex-col gap-1.5 border-l border-gray-alpha-400 pl-3">
                    {item.children.map(child => (
                      <li key={child.url}>
                        <a
                          className="block text-label-13 text-gray-900"
                          href={child.url}
                          onClick={() => setOpen(false)}
                        >
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
};