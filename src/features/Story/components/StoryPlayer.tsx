import type React from 'react';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useStoryPlayback } from '../hooks/useStoryPlayback';
import type { StorySet, StoryViewerOptions } from '../types';
import { StoryContent } from './StoryContent';
import { StoryProgressBar } from './StoryProgressBar';

interface StoryPlayerProps {
  storySet: StorySet;
  storySets: StorySet[]; // 全セット（前後のセット遷移用）
  setIndex: number;
  options: StoryViewerOptions;
  onClose: () => void;
  onNavigateSet: (index: number | null) => void;
}

export const StoryPlayer: React.FC<StoryPlayerProps> = ({
  storySet,
  storySets,
  setIndex,
  options,
  onClose,
  onNavigateSet,
}) => {
  const {
    currentStoryIndex,
    progress,
    isPaused,
    next,
    prev,
    togglePause,
    jumpTo,
  } = useStoryPlayback(storySets, setIndex, options, onClose, onNavigateSet);

  useKeyboardControls(
    options.enableKeyboardNavigation,
    next,
    prev,
    onClose,
    togglePause,
  );

  const currentStory = storySet.stories[currentStoryIndex];

  const isFullscreen = (options.displayMode || 'fullscreen') === 'fullscreen';

  // Fullscreen mode styles: Fixed overlay with centered content
  // Inline mode styles: Absolute positioning filling parent
  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-50 bg-black flex items-center justify-center'
    : 'absolute inset-0 z-20 bg-black rounded-lg overflow-hidden';

  // Inner wrapper styles (only relevant for fullscreen to simulate mobile aspect ratio on desktop)
  const contentClasses = isFullscreen
    ? 'relative w-full h-full md:max-w-md md:aspect-[9/16] md:h-[90vh] bg-black md:rounded-lg overflow-hidden md:shadow-2xl'
    : 'relative w-full h-full';

  return (
    /* biome-ignore lint/a11y/noStaticElementInteractions: background overlay click to close modal */
    /* biome-ignore lint/a11y/useKeyWithClickEvents: background overlay click to close modal */
    <div
      className={containerClasses}
      onClick={isFullscreen ? onClose : undefined}
    >
      {/* biome-ignore lint/a11y/noStaticElementInteractions: stop propagation for content area */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: stop propagation only needs mouse event */}
      <div className={contentClasses} onClick={(e) => e.stopPropagation()}>
        {options.showProgressBar && (
          <StoryProgressBar
            count={storySet.stories.length}
            currentIndex={currentStoryIndex}
            progress={progress}
            onJump={jumpTo}
          />
        )}

        {/* ヘッダー */}
        {options.showHeader && (
          <div className='absolute top-4 left-3 right-3 flex items-center justify-between z-20 pointer-events-none'>
            <div className='flex items-center gap-2 pointer-events-auto'>
              <span className='text-white font-bold text-sm drop-shadow-md'>
                {storySet.title}
              </span>
              <span className='text-white/60 text-xs ml-1 font-mono'>
                {currentStoryIndex + 1}/{storySet.stories.length}
              </span>
            </div>
            <div className='flex items-center gap-4 pointer-events-auto'>
              {options.autoPlay && (
                <button
                  type='button'
                  aria-label='Toggle play/pause'
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation
                    togglePause();
                  }}
                  className='text-white hover:opacity-70 transition p-1'
                >
                  {isPaused ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <title>Play</title>
                      <path d='M8 5v14l11-7z' />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <title>Pause</title>
                      <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
                    </svg>
                  )}
                </button>
              )}
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className='text-white hover:opacity-70 transition p-1'
                aria-label='Close'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <title>Close</title>
                  <line x1='18' y1='6' x2='6' y2='18'></line>
                  <line x1='6' y1='6' x2='18' y2='18'></line>
                </svg>
              </button>
            </div>
          </div>
        )}

        <StoryContent story={currentStory} />

        {/* タップエリア (ナビゲーション) */}
        <div className='absolute inset-0 z-10 flex'>
          <button
            type='button'
            className='flex-1 h-full cursor-pointer outline-none focus:bg-white/5 transition-colors'
            onClick={prev}
            aria-label='Previous story'
            title='Previous'
          />
          <button
            type='button'
            className='flex-[2] h-full cursor-pointer outline-none focus:bg-white/5 transition-colors' // 中央タップでポーズなどの拡張余地あり
            onClick={() => {
              // 中央タップでもNextの挙動にする場合が多いが、
              // Facebook/Insta仕様では左1/3がPrev、右2/3がNextに近い。
              // ここではシンプルに左右分割にするか、中央でPauseにするか。
              // 上記コードでは flex-1 (左半分), flex-1 (右半分) だが、
              // handleNext を呼びたいので右側のボタンとして機能させる。
              next();
            }}
            aria-label='Next story'
            title='Next'
          />
        </div>
      </div>
    </div>
  );
};
