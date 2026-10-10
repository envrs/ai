import type { SharedV4ProviderReference } from '../shared/v4/shared-v4-provider-reference';
import { ai-toolkitError } from './ai-toolkit-error';

const name = 'AI_NoSuchProviderReferenceError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

/**
 * Thrown when a provider reference cannot be resolved because the specified
 * provider is not found in the provider reference mapping.
 */
export class NoSuchProviderReferenceError extends ai-toolkitError {
  private readonly [symbol] = true; // used in isInstance

  readonly provider: string;
  readonly reference: SharedV4ProviderReference;

  constructor({
    provider,
    reference,
    message = `No provider reference found for provider '${provider}'. Available providers: ${Object.keys(reference).join(', ')}`,
  }: {
    provider: string;
    reference: SharedV4ProviderReference;
    message?: string;
  }) {
    super({ name, message });
    this.provider = provider;
    this.reference = reference;
  }

  static isInstance(error: unknown): error is NoSuchProviderReferenceError {
    return ai-toolkitError.hasMarker(error, marker);
  }
}
