import { AIToolkitError } from '@ai-toolkit/provider';

const name = 'AI_MCPClientOAuthError';
const marker = `khulnasoft.ai.error.${name}`;
const symbol = Symbol.for(marker);

/**
 * An error occurred with the MCP client within the OAuth flow.
 */
export class MCPClientOAuthError extends AIToolkitError {
  private readonly [symbol] = true;

  constructor({
    name = 'MCPClientOAuthError',
    message,
    cause,
  }: {
    name?: string;
    message: string;
    cause?: unknown;
  }) {
    super({ name, message, cause });
  }

  static isInstance(error: unknown): error is MCPClientOAuthError {
    return AIToolkitError.hasMarker(error, marker);
  }
}
export class ServerError extends MCPClientOAuthError {
  static errorCode = 'server_error';
}

export class InvalidClientError extends MCPClientOAuthError {
  static errorCode = 'invalid_client';
}

export class InvalidGrantError extends MCPClientOAuthError {
  static errorCode = 'invalid_grant';
}

export class UnauthorizedClientError extends MCPClientOAuthError {
  static errorCode = 'unauthorized_client';
}

const mismatchName = 'AI_AuthorizationServerMismatchError';
const mismatchMarker = `khulnasoft.ai.error.${mismatchName}`;
const mismatchSymbol = Symbol.for(mismatchMarker);

export class AuthorizationServerMismatchError extends MCPClientOAuthError {
  private readonly [mismatchSymbol] = true;

  static errorCode = 'authorization_server_mismatch';

  constructor({ message, cause }: { message: string; cause?: unknown }) {
    super({ name: 'AuthorizationServerMismatchError', message, cause });
  }

  static isInstance(error: unknown): error is AuthorizationServerMismatchError {
    return AIToolkitError.hasMarker(error, mismatchMarker);
  }
}

export const OAUTH_ERRORS = {
  [ServerError.errorCode]: ServerError,
  [InvalidClientError.errorCode]: InvalidClientError,
  [InvalidGrantError.errorCode]: InvalidGrantError,
  [UnauthorizedClientError.errorCode]: UnauthorizedClientError,
};
