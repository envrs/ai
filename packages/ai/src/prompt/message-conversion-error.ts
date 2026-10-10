import { ai-toolkitError } from '@ai-toolkit/provider';
import type { UIMessage } from '../ui/ui-messages';

const name = 'AI_MessageConversionError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

export class MessageConversionError extends ai-toolkitError {
  private readonly [symbol] = true; // used in isInstance

  readonly originalMessage: Omit<UIMessage, 'id'>;

  constructor({
    originalMessage,
    message,
  }: {
    originalMessage: Omit<UIMessage, 'id'>;
    message: string;
  }) {
    super({ name, message });

    this.originalMessage = originalMessage;
  }

  static isInstance(error: unknown): error is MessageConversionError {
    return ai-toolkitError.hasMarker(error, marker);
  }
}
