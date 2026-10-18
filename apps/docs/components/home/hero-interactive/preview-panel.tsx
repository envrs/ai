'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getChatPreview,
  type ModelKind,
  type Provider,
} from '@/lib/home/code-examples';
import { IMAGE_SRC, VIDEO_SRC } from '../media-assets';
import { ImageGenerationPreview } from './image-generation';
import { AudioPlayer } from './speech-generation';
import { ChatBubble } from './text-generation';
import { TranscriptionPlayer } from './transcription-generation';
import { VideoGenerationPreview } from './video-generation';

const cn = (...classes: (string | false | null | undefined)[]): string =>
  classes.filter(Boolean).join(' ');

export function PreviewPanel({
  kind,
  selectedProvider,
  className,
}: {
  kind: ModelKind;
  selectedProvider: Provider;
  className?: string;
}) {
  const [animationKey, setAnimationKey] = useState(0);
  const [isProviderChange, setIsProviderChange] = useState(false);
  const prevKindRef = useRef(kind);
  const prevProviderRef = useRef(selectedProvider);
  const speechAudioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const kindChanged = prevKindRef.current !== kind;
    const providerChanged = prevProviderRef.current !== selectedProvider;
    if (!kindChanged && !providerChanged) return;

    prevKindRef.current = kind;
    prevProviderRef.current = selectedProvider;
    setIsProviderChange(providerChanged && !kindChanged);
    setAnimationKey(key => key + 1);

    if (kindChanged) {
      setIsMuted(true);
      if (speechAudioRef.current) speechAudioRef.current.muted = true;
    }
  }, [kind, selectedProvider]);

  useEffect(() => {
    const img = new Image();
    img.src = IMAGE_SRC;

    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.src = VIDEO_SRC;
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) return;
      if (speechAudioRef.current) speechAudioRef.current.muted = true;
      setIsMuted(true);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const toggleMute = useCallback(() => {
    const audio = speechAudioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  }, []);

  function renderContent() {
    switch (kind) {
      case 'image':
        return (
          <div className="flex min-w-0 flex-1 items-center justify-center overflow-hidden">
            <ImageGenerationPreview animationKey={animationKey} />
          </div>
        );
      case 'video':
        return (
          <div className="flex min-w-0 flex-1 items-center justify-center overflow-hidden">
            <VideoGenerationPreview animationKey={animationKey} />
          </div>
        );
      case 'speech':
        return (
          <div
            className="flex h-full flex-1 animate-[slideUpFadeIn_500ms_ease-out_both]"
            key={animationKey}
          >
            <AudioPlayer
              animationKey={animationKey}
              audioRef={speechAudioRef}
            />
          </div>
        );
      case 'transcription':
        return (
          <div
            className="flex flex-1 animate-[slideUpFadeIn_500ms_ease-out_both] items-start p-6"
            key={animationKey}
          >
            <TranscriptionPlayer animationKey={animationKey} />
          </div>
        );
      default:
        return (
          <div className="flex flex-1 flex-col justify-start gap-4 p-6">
            {getChatPreview(selectedProvider).map((message, index) => (
              <ChatBubble
                animationKey={animationKey}
                delay={isProviderChange ? 0 : index * 400}
                key={`${animationKey}-${message.role}`}
                message={message}
                skipAnimation={isProviderChange && message.role === 'user'}
              />
            ))}
          </div>
        );
    }
  }

  return (
    <div
      aria-label={`${kind} generation preview`}
      className={cn('relative min-w-0', className)}
      role="region"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-background-100 shadow-sm">
        {renderContent()}
      </div>
      {kind === 'speech' && (
        <button
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          className="absolute right-6 bottom-6 animate-[fadein-inplace_500ms_ease-out_both] text-gray-600"
          key={`mute-${animationKey}`}
          onClick={toggleMute}
          type="button"
        >
          {isMuted ? (
            <svg
              aria-hidden="true"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M11 5 6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M11 5 6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
