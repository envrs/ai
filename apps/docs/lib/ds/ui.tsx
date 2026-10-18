import Link from 'next/link';
import type { ComponentProps, ComponentType, ReactNode } from 'react';
import { cn } from '@/lib/ds/utils';

/* -------------------------------------------------------------------------- */
/* Badge                                                                      */
/* -------------------------------------------------------------------------- */

const badgeSizes = {
  sm: 'h-5 px-1.5 text-label-12',
  md: 'h-6 px-2 text-label-13',
} as const;

const badgeVariants = {
  default: 'bg-gray-200 text-gray-1000',
  inverted: 'bg-gray-1000 text-background-100',
  outline: 'border border-gray-alpha-400 text-gray-1000',
} as const;

export const Badge = ({
  className,
  size = 'md',
  variant = 'default',
  ...props
}: ComponentProps<'span'> & {
  size?: keyof typeof badgeSizes;
  variant?: keyof typeof badgeVariants;
}) => (
  <span
    className={cn(
      'inline-flex items-center rounded-md font-medium whitespace-nowrap',
      badgeSizes[size],
      badgeVariants[variant],
      className,
    )}
    {...props}
  />
);

/* -------------------------------------------------------------------------- */
/* Button                                                                     */
/* -------------------------------------------------------------------------- */

const buttonSizes = {
  tiny: 'h-6 gap-1 px-2 text-label-12',
  small: 'h-8 gap-1 px-2.5 text-label-13',
  medium: 'h-10 gap-2 px-4 text-label-14',
  large: 'h-11 gap-2 px-5 text-label-15',
} as const;

const buttonVariants = {
  default: 'bg-gray-1000 text-background-100 hover:bg-gray-900',
  secondary:
    'border border-gray-alpha-400 bg-background-100 text-gray-1000 hover:bg-gray-100',
  tertiary: 'bg-transparent text-gray-1000 hover:bg-gray-100',
} as const;

const buttonShapes = {
  square: 'rounded-md',
  rounded: 'rounded-full',
  circle: 'rounded-full',
} as const;

export const Button = ({
  children,
  className,
  Component = 'button',
  prefix,
  shape,
  size = 'medium',
  svgOnly,
  variant = 'secondary',
  ...props
}: ComponentProps<'button'> & {
  Component?: ComponentType<ComponentProps<'a'>> | 'button';
  prefix?: ReactNode;
  shape?: keyof typeof buttonShapes;
  size?: keyof typeof buttonSizes;
  svgOnly?: boolean;
  variant?: keyof typeof buttonVariants;
  href?: string;
  target?: string;
  rel?: string;
}) => {
  const classes = cn(
    'not-prose inline-flex items-center justify-center font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-700',
    buttonSizes[size],
    buttonVariants[variant],
    shape ? buttonShapes[shape] : 'rounded-md',
    svgOnly && 'aspect-square px-0',
    className,
  );

  if (Component === 'button') {
    return (
      <button className={classes} type="button" {...props}>
        {prefix}
        {children}
      </button>
    );
  }

  return (
    <Component className={classes} {...props}>
      {prefix}
      {children}
    </Component>
  );
};

/** Button wired to Next's link so client-side navigation is preserved. */
export const LinkButton = ({
  href,
  ...props
}: ComponentProps<typeof Button>) => (
  <Button Component={Link as ComponentType<ComponentProps<'a'>>} href={href} {...props} />
);

/* -------------------------------------------------------------------------- */
/* Callout                                                                    */
/* -------------------------------------------------------------------------- */

const calloutTypes = {
  info: {
    container: 'border-blue-alpha-400 bg-blue-100 text-blue-1000',
    label: 'Note',
  },
  warn: {
    container: 'border-amber-alpha-400 bg-amber-100 text-amber-1000',
    label: 'Warning',
  },
  error: {
    container: 'border-red-alpha-400 bg-red-100 text-red-1000',
    label: 'Error',
  },
} as const;

export const Callout = ({
  children,
  className,
  id,
  type = 'info',
  ...props
}: Omit<ComponentProps<'div'>, 'title'> & {
  type?: keyof typeof calloutTypes;
  title?: string;
}) => {
  const { container, label } = calloutTypes[type] ?? calloutTypes.info;

  return (
    <div
      className={cn(
        'not-prose my-6 flex flex-col gap-1.5 rounded-lg border p-4',
        container,
        className,
      )}
      id={id}
      {...props}
    >
      <span className="text-label-13 font-medium">{label}</span>
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">{children}</div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* CodeBlock                                                                  */
/* -------------------------------------------------------------------------- */

export const CodeBlock = ({
  children,
  className,
  title,
  ...props
}: ComponentProps<'div'> & { title?: ReactNode }) => (
  <div
    className={cn(
      'not-prose my-6 flex w-full flex-col overflow-hidden rounded-lg border border-gray-alpha-400 bg-background-100',
      className,
    )}
    {...props}
  >
    {title ? (
      <div className="border-b border-gray-alpha-400 px-4 py-2 text-label-12 text-gray-900">
        {title}
      </div>
    ) : null}
    <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6">
      <code className="block w-fit min-w-full">{children}</code>
    </pre>
  </div>
);