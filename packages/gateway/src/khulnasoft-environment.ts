import { getContext } from '@khulnasoft/oidc';
export { getKhulnasoftOidcToken } from '@khulnasoft/oidc';

export async function getKhulnasoftRequestId(): Promise<string | undefined> {
  return getContext().headers?.['x-khulnasoft-id'];
}
