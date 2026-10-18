import type { ComponentProps } from 'react';

const cn = (...classes: (string | false | null | undefined)[]): string =>
  classes.filter(Boolean).join(' ');

export function Select({ className, ...props }: ComponentProps<'select'>) {
  return (
    <span className="group relative inline-flex items-center">
      <select
        className={cn(
          'h-8 cursor-pointer appearance-none truncate rounded-md border-none bg-background-100 pr-9 pl-3 text-sm text-gray-1000 shadow-[0_0_0_1px_var(--ds-gray-alpha-400)] transition-[box-shadow,color] duration-200 hover:shadow-[0_0_0_1px_var(--ds-gray-alpha-500)] focus:shadow-[var(--ds-focus-border)] focus:outline-hidden [&_option]:text-gray-1000',
          className,
        )}
        {...props}
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-3 size-3 text-gray-700 transition-colors duration-150 ease-in group-hover:text-gray-1000"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </span>
  );
}
