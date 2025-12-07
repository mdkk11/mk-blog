import type React from 'react';

interface StoryProgressBarProps {
  count: number;
  currentIndex: number;
  progress: number;
  onJump: (index: number) => void;
}

export const StoryProgressBar: React.FC<StoryProgressBarProps> = ({
  count,
  currentIndex,
  progress,
  onJump,
}) => {
  return (
    <div className='absolute top-0 left-0 right-0 flex gap-1 p-2 z-30'>
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          className='relative flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden cursor-pointer hover:h-1 transition-all'
          onClick={(e) => {
            e.stopPropagation();
            onJump(index);
          }}
          aria-label={`Jump to story ${index + 1}`}
        >
          <div
            className='h-full bg-white transition-all duration-100 linear'
            style={{
              width: `${
                index < currentIndex
                  ? 100
                  : index === currentIndex
                    ? progress
                    : 0
              }%`,
            }}
          />
        </button>
      ))}
    </div>
  );
};
