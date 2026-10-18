import type { ComponentProps } from 'react';

type LogoProps = Omit<ComponentProps<'svg'>, 'children'> & {
  size?: number;
  height?: number | string;
  width?: number | string;
};

/**
 * The previous package shipped third-party brand SVGs. Those marks are not
 * redistributable here, so each logo renders a same-sized monogram in
 * `currentColor`: the layout keeps its box and inherits text color exactly as
 * before, and callers control appearance through `className`.
 */
const createLogo = (displayName: string, label: string) => {
  const Logo = ({ size = 24, height, width, className, ...props }: LogoProps) => {
    const resolvedHeight = height ?? size;
    const resolvedWidth = width ?? size;

    return (
      <svg
        aria-label={label}
        className={className}
        height={resolvedHeight}
        role="img"
        viewBox="0 0 24 24"
        width={resolvedWidth}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect
          fill="none"
          height="23"
          rx="6"
          stroke="currentColor"
          strokeWidth="1.5"
          width="23"
          x="0.5"
          y="0.5"
        />
        <text
          dominantBaseline="central"
          fill="currentColor"
          fontFamily="inherit"
          fontSize="11"
          fontWeight="600"
          textAnchor="middle"
          x="12"
          y="12.5"
        >
          {label.slice(0, 2)}
        </text>
      </svg>
    );
  };

  Logo.displayName = displayName;
  return Logo;
};

export const LogoIconAnthropicSvg = createLogo(
  'LogoIconAnthropicSvg',
  'Anthropic',
);
export const LogoIconDeepseekSvg = createLogo(
  'LogoIconDeepseekSvg',
  'DeepSeek',
);
export const LogoIconElevenlabsSvg = createLogo(
  'LogoIconElevenlabsSvg',
  'ElevenLabs',
);
export const LogoIconGoogleSvg = createLogo('LogoIconGoogleSvg', 'Google');
export const LogoIconGrokSvg = createLogo('LogoIconGrokSvg', 'Grok');
export const LogoIconMetaSvg = createLogo('LogoIconMetaSvg', 'Meta');
export const LogoIconMistralSvg = createLogo('LogoIconMistralSvg', 'Mistral');
export const LogoIconMoonshotSvg = createLogo('LogoIconMoonshotSvg', 'Moonshot');
export const LogoIconOpenAiSvg = createLogo('LogoIconOpenAiSvg', 'OpenAI');
export const LogoIconPerplexitySvg = createLogo(
  'LogoIconPerplexitySvg',
  'Perplexity',
);
export const LogoIconZaiSvg = createLogo('LogoIconZaiSvg', 'Z.AI');
export const LogoIconVercelSvg = createLogo('LogoIconVercelSvg', 'AI');
export const LogoIconAngularSvg = createLogo('LogoIconAngularSvg', 'Angular');
export const LogoIconNuxtSvg = createLogo('LogoIconNuxtSvg', 'Nuxt');
export const LogoIconReactSvg = createLogo('LogoIconReactSvg', 'React');
export const LogoIconSolidstartSvg = createLogo(
  'LogoIconSolidstartSvg',
  'SolidStart',
);
export const LogoIconSvelteSvg = createLogo('LogoIconSvelteSvg', 'Svelte');
export const LogoIconVueSvg = createLogo('LogoIconVueSvg', 'Vue');
export const LogoNextJs = createLogo('LogoNextJs', 'Next.js');
export const LogoNextjs = createLogo('LogoNextjs', 'Next.js');
export const LogoSvelteKit = createLogo('LogoSvelteKit', 'SvelteKit');
export const LogoExpo = createLogo('LogoExpo', 'Expo');
export const LogoaiToolkit = createLogo('LogoaiToolkit', 'ai');

export const Logo = LogoaiToolkit;