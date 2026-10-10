import { getContext } from '@khulnasoft/oidc';
export { getVercelOidcToken } from '@khulnasoft/oidc';

export async function getVercelRequestId(): Promise<string | undefined> {
  return getContext().headers?.['x-khulnasoft-id'];
}
