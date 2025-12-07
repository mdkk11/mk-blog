import { useCallback, useEffect, useState } from 'react';
import type { StorySet, StoryViewerOptions } from '../types';

export const useStoryPlayback = (
  storySets: StorySet[],
  selectedSetIndex: number | null,
  options: StoryViewerOptions,
  onClose: () => void,
  onNavigateSet: (index: number | null) => void,
) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // リセット処理
  useEffect(() => {
    if (selectedSetIndex !== null) {
      setCurrentStoryIndex(0);
      setProgress(0);
      setIsPaused(false);
    }
  }, [selectedSetIndex]);

  // Duration取得
  const getCurrentDuration = useCallback(() => {
    if (selectedSetIndex === null) return options.defaultImageDuration;
    const currentStory = storySets[selectedSetIndex].stories[currentStoryIndex];
    return (
      currentStory.duration ??
      (currentStory.type === 'markdown'
        ? options.defaultMarkdownDuration
        : options.defaultImageDuration)
    );
  }, [selectedSetIndex, currentStoryIndex, storySets, options]);

  // 次へ
  const next = useCallback(() => {
    if (selectedSetIndex === null) return;

    const currentSet = storySets[selectedSetIndex];
    // 次のストーリーがある場合
    if (currentStoryIndex < currentSet.stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setProgress(0);
    }
    // 次のセットへ
    else if (selectedSetIndex < storySets.length - 1) {
      onNavigateSet(selectedSetIndex + 1);
    }
    // ループ or 終了
    else if (options.loop) {
      onNavigateSet(0);
    } else {
      onClose();
    }
  }, [
    selectedSetIndex,
    currentStoryIndex,
    storySets,
    options.loop,
    onNavigateSet,
    onClose,
  ]);

  // 前へ
  const prev = useCallback(() => {
    if (selectedSetIndex === null) return;

    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
      setProgress(0);
    } else if (selectedSetIndex > 0) {
      // 前のセットへ
      onNavigateSet(selectedSetIndex - 1);
      // 本来は前のセットの最後のストーリーに行くべきだが、セット切り替えと状態管理が複雑になるため
      // StoryViewer側で制御するか、ここではシンプルにセット移動だけにする。
    }
  }, [selectedSetIndex, currentStoryIndex, onNavigateSet]);

  // 再生タイマーロジック (setInterval)
  useEffect(() => {
    if (selectedSetIndex === null || !options.autoPlay || isPaused) return;

    const duration = getCurrentDuration();
    const _durationStep = duration / 100; // 1%あたりの時間
    const intervalTime = 100; // 100msごとに更新

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        // 100msでどれだけ進むか: 100ms / duration * 100(%)
        // = 100 / duration * 100 = 10000 / duration
        return prev + 100 / (duration / 100);
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [selectedSetIndex, options.autoPlay, isPaused, getCurrentDuration]);

  // 進捗完了監視
  useEffect(() => {
    if (
      progress >= 100 &&
      selectedSetIndex !== null &&
      options.autoPlay &&
      !isPaused
    ) {
      next();
    }
  }, [progress, selectedSetIndex, options.autoPlay, isPaused, next]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const jumpTo = useCallback((index: number) => {
    setCurrentStoryIndex(index);
    setProgress(0);
    setIsPaused(false);
  }, []);

  return {
    currentStoryIndex,
    progress,
    isPaused,
    next,
    prev,
    togglePause,
    jumpTo,
  };
};
