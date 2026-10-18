import type { Provider } from '@/lib/home/code-examples';

const PROVIDER_LABELS: Record<Provider, string> = {
  grok: 'Grok',
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  google: 'Google',
  mistral: 'Mistral',
  meta: 'Meta',
  perplexity: 'Perplexity',
  deepseek: 'DeepSeek',
  moonshot: 'Moonshot',
  zai: 'Z.AI',
  elevenlabs: 'ElevenLabs',
};

const PROVIDER_COLORS: Record<Provider, string> = {
  grok: '#000000',
  openai: '#10a37f',
  anthropic: '#d97757',
  google: '#4285f4',
  mistral: '#ff6600',
  meta: '#0082fb',
  perplexity: '#20808d',
  deepseek: '#4f6bff',
  moonshot: '#7c3aed',
  zai: '#0066ff',
  elevenlabs: '#000000',
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
  const label = PROVIDER_LABELS[provider];
  const initial = label.slice(0, 1);

  return (
    <svg
      aria-hidden="true"
      className={`${muted ? 'text-gray-900' : 'text-gray-1000'} ${className ?? ''}`}
      viewBox="0 0 16 16"
      role="img"
      width="16"
      height="16"
    >
      <circle
        cx="8"
        cy="8"
        r="7"
        fill={PROVIDER_COLORS[provider]}
        opacity={muted ? 0.4 : 1}
      />
      <text
        x="8"
        y="8"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#fff"
        fontSize="8"
        fontWeight="600"
      >
        {initial}
      </text>
    </svg>
  );
}
