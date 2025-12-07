import type React from 'react';
import { useCallback, useState } from 'react';
import { AspectRatio } from '@/ui/components/AspectRatio';
import { cva, cx } from '@/ui/libs/cva';
import {
  defaultOptions,
  type StorySet,
  type StoryViewerOptions,
} from '../types';
import { StoryListItem } from './StoryListItem';
import { StoryPlayer } from './StoryPlayer';

export interface StoryListProps {
  storySets: StorySet[];
  options?: Partial<StoryViewerOptions>;
  className?: string;
}

const gridVariants = cva({
  base: 'grid gap-6',
  variants: {
    cols: {
      2: 'grid-cols-2',
      3: 'grid-cols-2 md:grid-cols-3',
      4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    },
  },
  defaultVariants: {
    cols: 4,
  },
});

export const StoryList: React.FC<StoryListProps> = ({
  storySets,
  options: userOptions,
  className,
}) => {
  const options = { ...defaultOptions, ...userOptions };
  const [selectedSetIndex, setSelectedSetIndex] = useState<number | null>(null);

  const openStory = useCallback((index: number) => {
    setSelectedSetIndex(index);
  }, []);

  const closeStory = useCallback(() => {
    setSelectedSetIndex(null);
  }, []);

  const handleNavigateSet = useCallback(
    (index: number | null) => {
      if (index === null || index < 0 || index >= storySets.length) {
        closeStory();
      } else {
        setSelectedSetIndex(index);
      }
    },
    [storySets.length, closeStory],
  );

  // グリッドのカラムスタイルを解決
  const appliedGridClass = cx(gridVariants({ cols: 4 }), className);

  // inlineモードなら選択されたアイテムの場所に展開、fullscreenなら全体オーバーレイ
  const isFullscreen = options.displayMode === 'fullscreen';

  return (
    <>
      <div className={appliedGridClass}>
        {storySets.map((set, index) => {
          const isSelected = selectedSetIndex === index;

          return (
            <AspectRatio key={set.id} ratio={options.aspectRatio}>
              <StoryListItem
                storySet={set}
                index={index}
                onSelect={openStory}
              />

              {!isFullscreen && isSelected && (
                <StoryPlayer
                  storySet={set}
                  storySets={storySets} // 前後のセット情報
                  setIndex={index}
                  options={options}
                  onClose={closeStory}
                  onNavigateSet={handleNavigateSet}
                />
              )}
            </AspectRatio>
          );
        })}
      </div>

      {isFullscreen && selectedSetIndex !== null && (
        <StoryPlayer
          storySet={storySets[selectedSetIndex]}
          storySets={storySets}
          setIndex={selectedSetIndex}
          options={options}
          onClose={closeStory}
          onNavigateSet={handleNavigateSet}
        />
      )}
    </>
  );
};
