import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import test from 'node:test';
import 'next/dist/server/node-environment-baseline.js';
import {
  getRedirectUrl,
  unstable_getResponseFromNextConfig,
} from 'next/experimental/testing/server.js';

const source = await readFile(
  new URL('../lib/legacy-redirects.ts', import.meta.url),
  'utf8',
);
const { legacyRedirects } = await import(
  `data:text/javascript;base64,${Buffer.from(stripTypeScriptTypes(source)).toString('base64')}`
);
const redirects = new Map(legacyRedirects.map(redirect => [redirect.source, redirect]));

test('legacy redirects preserve representative production destinations', () => {
  for (const [source, destination, permanent] of [
    ['/docs', '/docs/introduction', true],
    ['/docs/guides/rag-chatbot', '/cookbook/guides/rag-chatbot', true],
    ['/docs/ai-core/generate-text', '/docs/ai-toolkit-core/generate-text', true],
    ['/docs/api-reference/use-chat', '/docs/reference/ai-toolkit-ui/use-chat', true],
    ['/docs/fundamentals/prompts', '/docs/foundations/prompts', true],
    ['/providers/legacy-providers/fireworks', '/providers/ai-toolkit-providers/fireworks', true],
    [
      '/docs/providers/ai-toolkit-providers/google-geneative-ai',
      '/providers/ai-toolkit-providers/google',
      true,
    ],
    ['/api/object', '/docs/reference/ai-toolkit-ui/use-object', true],
    ['/getting-started/nextjs-app-router', '/docs/getting-started/nextjs-app-router', true],
    ['/repo', 'https://github.com/khulnasoft/ai', false],
    ['/stream-data', '/docs/reference/ai-toolkit-ui/stream-data', true],
  ]) {
    assert.deepEqual(redirects.get(source), { source, destination, permanent });
  }
});

test('evaluation URLs permanently redirect to decision pages and preserve query parameters', async () => {
  for (const [source, destination] of [
    ['/docs/ai-toolkit-core/evaluation', '/docs/ai-toolkit-core/decisions'],
    ['/docs/reference/ai-toolkit-core/evaluate', '/docs/reference/ai-toolkit-core/decide'],
    [
      '/docs/reference/ai-toolkit-errors/ai-evaluation-unsupported-question-type-error',
      '/docs/reference/ai-toolkit-errors/ai-decision-unsupported-question-type-error',
    ],
  ]) {
    const response = await unstable_getResponseFromNextConfig({
      url: `https://ai-toolkit.dev${source}?ref=bookmark`,
      nextConfig: { redirects: () => legacyRedirects },
    });
    assert.equal(response.status, 308);
    assert.equal(getRedirectUrl(response), `https://ai-toolkit.dev${destination}?ref=bookmark`);
  }
});

test('legacy redirects are unique and cannot capture live or migrated routes', () => {
  assert.equal(legacyRedirects.length, 286);
  assert.equal(redirects.size, legacyRedirects.length);

  for (const source of [
    '/api/chat',
    '/api/search',
    '/playground',
    '/play',
    '/prompt',
    '/s/:path*',
    '/user',
  ]) {
    assert.equal(redirects.has(source), false);
  }
});
