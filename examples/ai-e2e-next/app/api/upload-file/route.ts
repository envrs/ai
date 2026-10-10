import { anthropic } from '@ai-toolkit/anthropic';
import { google } from '@ai-toolkit/google';
import { openai } from '@ai-toolkit/openai';
import { xai } from '@ai-toolkit/xai';
import { uploadFile } from 'ai';

export async function POST(req: Request) {
  const {
    data,
    mediaType,
    filename,
    provider,
  }: {
    data: string;
    mediaType: string;
    filename: string;
    provider: 'anthropic' | 'google' | 'openai' | 'xai';
  } = await req.json();

  const filesMap = {
    anthropic: () => anthropic.files(),
    google: () => google.files(),
    openai: () => openai.files(),
    xai: () => xai.files(),
  };

  const result = await uploadFile({
    api: filesMap[provider](),
    data,
    mediaType,
    filename,
  });

  return Response.json({
    providerReference: result.providerReference,
    mediaType,
    filename,
  });
}
