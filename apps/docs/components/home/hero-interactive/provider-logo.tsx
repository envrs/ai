import { LogoIconAnthropicSvg } from '@khulnasoft/geistdocs/assets/logos/logo-icon-anthropic-svg';
import { LogoIconDeepseekSvg } from '@khulnasoft/geistdocs/assets/logos/logo-icon-deepseek-svg';
import { LogoIconElevenlabsSvg } from '@khulnasoft/geistdocs/assets/logos/logo-icon-elevenlabs-svg';
import { LogoIconGoogleSvg } from '@khulnasoft/geistdocs/assets/logos/logo-icon-google-svg';
import { LogoIconGrokSvg } from '@khulnasoft/geistdocs/assets/logos/logo-icon-grok-svg';
import { LogoIconMetaSvg } from '@khulnasoft/geistdocs/assets/logos/logo-icon-meta-svg';
import { LogoIconMistralSvg } from '@khulnasoft/geistdocs/assets/logos/logo-icon-mistral-svg';
import { LogoIconMoonshotSvg } from '@khulnasoft/geistdocs/assets/logos/logo-icon-moonshot-svg';
import { LogoIconOpenAiSvg } from '@khulnasoft/geistdocs/assets/logos/logo-icon-open-ai-svg';
import { LogoIconPerplexitySvg } from '@khulnasoft/geistdocs/assets/logos/logo-icon-perplexity-svg';
import { LogoIconZaiSvg } from '@khulnasoft/geistdocs/assets/logos/logo-icon-zai-svg';
import { cn } from '@khulnasoft/geistdocs/utils';
import type { Provider } from '@/lib/home/code-examples';

const LOGOS: Record<Provider, typeof LogoIconGrokSvg> = {
  grok: LogoIconGrokSvg,
  openai: LogoIconOpenAiSvg,
  anthropic: LogoIconAnthropicSvg,
  google: LogoIconGoogleSvg,
  mistral: LogoIconMistralSvg,
  meta: LogoIconMetaSvg,
  perplexity: LogoIconPerplexitySvg,
  deepseek: LogoIconDeepseekSvg,
  moonshot: LogoIconMoonshotSvg,
  zai: LogoIconZaiSvg,
  elevenlabs: LogoIconElevenlabsSvg,
};

export function ProviderLogo({
  provider,
  muted = false,
  className,
}: {
  provider: Provider;
  muted?: boolean;
  className?: string;
}) {
  const Logo = LOGOS[provider];
  return (
    <Logo
      aria-hidden="true"
      className={cn(muted ? 'text-gray-900' : 'text-gray-1000', className)}
      size={16}
    />
  );
}
