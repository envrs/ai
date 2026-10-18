import type { ComponentProps, ReactNode } from 'react';

export type IconProps = Omit<ComponentProps<'svg'>, 'children'> & {
  size?: number;
};

/**
 * All icons share one 16x16 stroke-based geometry and inherit `currentColor`,
 * which is what the previous package's icons did. A single factory keeps the
 * markup (and therefore the rendered output) consistent across the site.
 */
const createIcon =
  (displayName: string, paths: ReactNode, options?: { fill?: boolean }) =>
  ({ size = 16, className, ...props }: IconProps) => (
    <svg
      aria-hidden="true"
      className={className}
      fill={options?.fill ? 'currentColor' : 'none'}
      height={size}
      viewBox="0 0 16 16"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {paths}
    </svg>
  );

const stroke = {
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: 1.5,
} as const;

export const IconArrowDown = createIcon(
  'IconArrowDown',
  <>
    <path d="M8 2.5v11" {...stroke} />
    <path d="m3.5 9 4.5 4.5L12.5 9" {...stroke} />
  </>,
);

export const IconArrowUp = createIcon(
  'IconArrowUp',
  <>
    <path d="M8 13.5v-11" {...stroke} />
    <path d="m3.5 7 4.5-4.5L12.5 7" {...stroke} />
  </>,
);

export const IconArrowUpRight = createIcon(
  'IconArrowUpRight',
  <>
    <path d="M4.5 11.5 11.5 4.5" {...stroke} />
    <path d="M6 4.5h5.5V10" {...stroke} />
  </>,
);

export const IconArrowUpRightSmall = createIcon(
  'IconArrowUpRightSmall',
  <>
    <path d="M5 11 11 5" {...stroke} />
    <path d="M6.5 5H11v4.5" {...stroke} />
  </>,
);

export const IconCheck = createIcon(
  'IconCheck',
  <path d="m3 8.5 3.25 3.25L13 5" {...stroke} />,
);

export const IconCopy = createIcon(
  'IconCopy',
  <>
    <rect height="8.5" rx="1.5" width="8.5" x="5.75" y="5.75" {...stroke} />
    <path d="M10.25 3.75v-1a1.5 1.5 0 0 0-1.5-1.5h-6.5a1.5 1.5 0 0 0-1.5 1.5v6.5a1.5 1.5 0 0 0 1.5 1.5h1" {...stroke} />
  </>,
);

export const IconBell = createIcon(
  'IconBell',
  <>
    <path d="M4 6.5a4 4 0 0 1 8 0c0 3 1 4 1 4H3s1-1 1-4Z" {...stroke} />
    <path d="M6.5 12.5a1.5 1.5 0 0 0 3 0" {...stroke} />
  </>,
);

export const IconCheckCircleFill = createIcon(
  'IconCheckCircleFill',
  <>
    <circle cx="8" cy="8" fill="currentColor" r="7" />
    <path
      d="m4.75 8.25 2 2 4-4.5"
      stroke="var(--ds-code-foreground, #fff)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </>,
);

export const IconLocation = createIcon(
  'IconLocation',
  <>
    <path d="M8 14s4.5-4.2 4.5-7.5a4.5 4.5 0 1 0-9 0C3.5 9.8 8 14 8 14Z" {...stroke} />
    <circle cx="8" cy="6.5" r="1.5" {...stroke} />
  </>,
);

export const IconSun = createIcon(
  'IconSun',
  <>
    <circle cx="8" cy="8" r="3" {...stroke} />
    <path d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.95 3.05l-1.06 1.06M4.11 11.89l-1.06 1.06M12.95 12.95l-1.06-1.06M4.11 4.11 3.05 3.05" {...stroke} />
  </>,
);

export const IconSparkles = createIcon(
  'IconSparkles',
  <>
    <path d="M6 1.5 7 4.5l3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" {...stroke} />
    <path d="M11.5 8.5l.6 1.9 1.9.6-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.6.6-1.9Z" {...stroke} />
  </>,
);

export const IconForward10Seconds10 = createIcon(
  'IconForward10Seconds10',
  <>
    <path d="M8 3.5A5.5 5.5 0 1 1 2.5 9" {...stroke} />
    <path d="M2 1.5v2.5h2.5" {...stroke} />
    <path d="M6.5 6.75h1.75a1.25 1.25 0 0 1 0 2.5H6.5h1.75a1.25 1.25 0 0 1 0 2.5H6.5V6.75Z" {...stroke} />
  </>,
);

export const IconRewind10Seconds = createIcon(
  'IconRewind10Seconds',
  <>
    <path d="M8 3.5A5.5 5.5 0 1 0 13.5 9" {...stroke} />
    <path d="M14 1.5V4h-2.5" {...stroke} />
    <path d="M6.5 6.75h1.75a1.25 1.25 0 0 1 0 2.5H6.5h1.75a1.25 1.25 0 0 1 0 2.5H6.5V6.75Z" {...stroke} />
  </>,
);

export const IconPause = createIcon(
  'IconPause',
  <>
    <path d="M6 3.5v9" {...stroke} strokeWidth="2" />
    <path d="M10 3.5v9" {...stroke} strokeWidth="2" />
  </>,
);

export const IconPlayFill = createIcon(
  'IconPlayFill',
  <path d="M5 3.2v9.6l8-4.8-8-4.8Z" fill="currentColor" />,
);

export const IconSpeakerOff = createIcon(
  'IconSpeakerOff',
  <>
    <path d="M2.5 6.25H5L8 3.5v9L5 9.75H2.5v-3.5Z" {...stroke} />
    <path d="m11 6 3 4M14 6l-3 4" {...stroke} />
  </>,
);

export const IconSpeakerVolumeLoud = createIcon(
  'IconSpeakerVolumeLoud',
  <>
    <path d="M2.5 6.25H5L8 3.5v9L5 9.75H2.5v-3.5Z" {...stroke} />
    <path d="M10.5 6.25a2.75 2.75 0 0 1 0 3.5M12.75 4.5a5.25 5.25 0 0 1 0 7" {...stroke} />
  </>,
);

export const IconChevronDownSmall = createIcon(
  'IconChevronDownSmall',
  <path d="m4.5 6.5 3.5 3.5 3.5-3.5" {...stroke} />,
);

export const IconRoute = createIcon(
  'IconRoute',
  <>
    <circle cx="4" cy="4" r="1.75" {...stroke} />
    <circle cx="12" cy="12" r="1.75" {...stroke} />
    <path d="M4 5.75v2.5A3.75 3.75 0 0 0 7.75 12H12" {...stroke} />
  </>,
);

export const IconShieldCheck = createIcon(
  'IconShieldCheck',
  <>
    <path d="M8 1.5 13 3.5v4c0 3.2-2.1 5.9-5 7-2.9-1.1-5-3.8-5-7v-4l5-2Z" {...stroke} />
    <path d="m5.75 8 1.5 1.5 3-3" {...stroke} />
  </>,
);

export const IconToggleOn = createIcon(
  'IconToggleOn',
  <>
    <rect height="7" rx="3.5" width="12.5" x="1.75" y="4.5" {...stroke} />
    <circle cx="11" cy="8" fill="currentColor" r="1.75" />
  </>,
);

export const IconApi = createIcon(
  'IconApi',
  <>
    <path d="M6 3.25 2.5 8 6 12.75M10 3.25 13.5 8 10 12.75" {...stroke} />
  </>,
);

export const IconDisplay = createIcon(
  'IconDisplay',
  <>
    <rect height="9" rx="1.5" width="12" x="2" y="2.25" {...stroke} />
    <path d="M6 13.75h4" {...stroke} />
  </>,
);

export const IconFileText = createIcon(
  'IconFileText',
  <>
    <path d="M9 1.75H4.5A1.5 1.5 0 0 0 3 3.25v9.5a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5V5.75L9 1.75Z" {...stroke} />
    <path d="M5.5 8h5M5.5 10.5h5" {...stroke} />
  </>,
);

export const IconLogs = createIcon(
  'IconLogs',
  <>
    <path d="M3 4h10M3 8h10M3 12h6" {...stroke} />
  </>,
);

export const IconMessage = createIcon(
  'IconMessage',
  <path
    d="M2.5 3.5h11a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H6l-3.5 2.5V11.5h0a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z"
    {...stroke}
  />,
);

export const IconSandbox = createIcon(
  'IconSandbox',
  <>
    <path d="M6.5 2.25 2 5l6.5 2.75L15 5l-4.5-2.75L6.5 2.25Z" {...stroke} />
    <path d="M2 8.25 6.5 11 11 8.25M2 11.25 6.5 14 11 11.25" {...stroke} />
  </>,
);

export const IconWrench = createIcon(
  'IconWrench',
  <path
    d="M10.4 1.9a3.6 3.6 0 0 0-4.2 4.6l-4 4a1.1 1.1 0 0 0 1.55 1.55l4-4a3.6 3.6 0 0 0 4.6-4.2l-2.1 2.1-1.9-.48-.48-1.9 2.53-1.67Z"
    {...stroke}
  />,
);