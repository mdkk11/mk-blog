import type React from 'react';
import { useState, useEffect, useCallback } from 'react';

interface Story {
    id: string;
    type: 'image' | 'markdown';
    content: string;
    backgroundColor?: string;
    duration?: number; // 個別のストーリーの表示時間（ミリ秒）
    createdAt: Date;
}

interface StorySet {
    id: string;
    title: string;
    thumbnail?: string;
    stories: Story[];
}

interface StoryViewerOptions {
    autoPlay: boolean; // 自動再生
    defaultImageDuration: number; // 画像のデフォルト表示時間（ミリ秒）
    defaultMarkdownDuration: number; // Markdownのデフォルト表示時間（ミリ秒）
    showProgressBar: boolean; // プログレスバーを表示
    showHeader: boolean; // ヘッダーを表示
    loop: boolean; // 最後まで行ったら最初に戻る
    enableKeyboardNavigation: boolean; // キーボード操作を有効化
    gridColumns: {
        mobile: number;
        tablet: number;
        desktop: number;
    };
}

const defaultOptions: StoryViewerOptions = {
    autoPlay: true,
    defaultImageDuration: 3000,
    defaultMarkdownDuration: 5000,
    showProgressBar: true,
    showHeader: true,
    loop: false,
    enableKeyboardNavigation: true,
    gridColumns: {
        mobile: 2,
        tablet: 3,
        desktop: 4
    }
};

// シンプルなMarkdownレンダラー
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const parseMarkdown = (text: string) => {
        text = text.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2">$1</h3>');
        text = text.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3">$1</h2>');
        text = text.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>');
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
        text = text.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
        text = text.replace(/^- (.*$)/gim, '<li class="ml-4">• $1</li>');
        text = text.replace(/\n/g, '<br />');
        return text;
    };

    return (
        <div
            className="prose prose-invert max-w-none p-6 text-white"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
        />
    );
};

interface StoryViewerProps {
    storySets: StorySet[];
    options?: Partial<StoryViewerOptions>;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ storySets, options: userOptions }) => {
    const options = { ...defaultOptions, ...userOptions };

    const [selectedSet, setSelectedSet] = useState<number | null>(null);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const getCurrentStoryDuration = useCallback(() => {
        if (selectedSet === null) return options.defaultImageDuration;

        const currentStory = storySets[selectedSet].stories[currentStoryIndex];
        if (currentStory.duration) return currentStory.duration;

        return currentStory.type === 'markdown'
            ? options.defaultMarkdownDuration
            : options.defaultImageDuration;
    }, [selectedSet, currentStoryIndex, storySets, options]);

    const jumpToStory = useCallback((storyIdx: number) => {
        setCurrentStoryIndex(storyIdx);
        setProgress(0);
        setIsPaused(false);
    }, []);

    const closeViewer = useCallback(() => {
        setSelectedSet(null);
        setCurrentStoryIndex(0);
        setProgress(0);
        setIsPaused(false);
    }, []);

    const handleNext = useCallback(() => {
        if (selectedSet === null) return;

        const currentSet = storySets[selectedSet];
        if (currentStoryIndex < currentSet.stories.length - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            setProgress(0);
        } else if (selectedSet < storySets.length - 1) {
            setSelectedSet(prev => (prev !== null ? prev + 1 : null));
            setCurrentStoryIndex(0);
            setProgress(0);
        } else if (options.loop) {
            setSelectedSet(0);
            setCurrentStoryIndex(0);
            setProgress(0);
        } else {
            closeViewer();
        }
    }, [selectedSet, currentStoryIndex, storySets, options.loop, closeViewer]);

    const handlePrev = useCallback(() => {
        if (selectedSet === null) return;

        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(prev => prev - 1);
            setProgress(0);
        } else if (selectedSet > 0) {
            const prevSetIndex = selectedSet - 1;
            setSelectedSet(prevSetIndex);
            const prevSet = storySets[prevSetIndex];
            setCurrentStoryIndex(prevSet.stories.length - 1);
            setProgress(0);
        }
    }, [selectedSet, currentStoryIndex, storySets]);

    // 自動再生のタイマー
    useEffect(() => {
        if (selectedSet === null || !options.autoPlay || isPaused) return;

        const duration = getCurrentStoryDuration();
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    return 100;
                }
                return prev + (100 / (duration / 100));
            });
        }, 100);

        return () => clearInterval(interval);
    }, [selectedSet, options.autoPlay, isPaused, getCurrentStoryDuration]);

    useEffect(() => {
        if (progress >= 100 && selectedSet !== null && options.autoPlay && !isPaused) {
            handleNext();
        }
    }, [progress, selectedSet, options.autoPlay, isPaused, handleNext]);

    // キーボード操作
    useEffect(() => {
        if (!options.enableKeyboardNavigation || selectedSet === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                handlePrev();
            } else if (e.key === 'Escape') {
                closeViewer();
            } else if (e.key === ' ') {
                e.preventDefault();
                setIsPaused(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [options.enableKeyboardNavigation, selectedSet, handleNext, handlePrev, closeViewer]);

    const openStory = (setIndex: number) => {
        setSelectedSet(setIndex);
        setCurrentStoryIndex(0);
        setProgress(0);
        setIsPaused(false);
    };

    const getThumbnail = (storySet: StorySet): string => {
        if (storySet.thumbnail) return storySet.thumbnail;
        const firstImageStory = storySet.stories.find(s => s.type === 'image');
        if (firstImageStory) return firstImageStory.content;
        return '';
    };

    const togglePause = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPaused(prev => !prev);
    };

    const gridClass = `grid gap-4 grid-cols-${options.gridColumns.mobile} md:grid-cols-${options.gridColumns.tablet} lg:grid-cols-${options.gridColumns.desktop}`;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* ストーリーグリッド */}
            <div className={gridClass}>
                {storySets.map((storySet, index) => {
                    const thumbnailUrl = getThumbnail(storySet);
                    const hasImageThumbnail = thumbnailUrl !== '';

                    return (
                        <div
                            key={storySet.id}
                            className="relative bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer aspect-square"
                            onClick={() => selectedSet === index ? closeViewer() : openStory(index)}
                        >
                            {/* ストーリーが選択されていない時 */}
                            {selectedSet !== index && (
                                <div className="relative w-full h-full">
                                    {hasImageThumbnail ? (
                                        <img
                                            src={thumbnailUrl}
                                            alt={storySet.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div
                                            className="w-full h-full flex items-center justify-center p-4"
                                            style={{
                                                background: storySet.stories[0].backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                            }}
                                        >
                                            <span className="text-white font-bold text-2xl text-center">
                                                {storySet.title}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                        <span className="text-white font-medium text-sm">{storySet.title}</span>
                                    </div>
                                </div>
                            )}

                            {/* ストーリービューアー（選択時） */}
                            {selectedSet === index && (
                                <div className="relative w-full h-full bg-black">
                                    {/* プログレスバー */}
                                    {options.showProgressBar && (
                                        <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 z-20">
                                            {storySets[selectedSet].stories.map((_, storyIdx) => (
                                                <button
                                                    key={storyIdx}
                                                    className="flex-1 h-0.5 bg-gray-500 rounded-full overflow-hidden cursor-pointer hover:h-1 transition-all"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        jumpToStory(storyIdx);
                                                    }}
                                                >
                                                    <div
                                                        className="h-full bg-white transition-all duration-100"
                                                        style={{
                                                            width: `${storyIdx < currentStoryIndex
                                                                    ? 100
                                                                    : storyIdx === currentStoryIndex
                                                                        ? progress
                                                                        : 0
                                                                }%`
                                                        }}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* ヘッダー */}
                                    {options.showHeader && (
                                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                                            <div className="flex items-center gap-2">
                                                <span className="text-white font-medium text-sm">{storySets[selectedSet].title}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {options.autoPlay && (
                                                    <button
                                                        onClick={togglePause}
                                                        className="text-white hover:opacity-70 transition"
                                                    >
                                                        {isPaused ? 'Play' : 'Pause'}
                                                    </button>
                                                )}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        closeViewer();
                                                    }}
                                                    className="text-white hover:opacity-70 transition"
                                                >
                                                    close
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* ストーリーコンテンツ */}
                                    <div className="relative w-full h-full">
                                        {storySets[selectedSet].stories[currentStoryIndex].type === 'image' ? (
                                            <img
                                                src={storySets[selectedSet].stories[currentStoryIndex].content}
                                                alt="story"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div
                                                className="w-full h-full flex items-center justify-center overflow-y-auto"
                                                style={{
                                                    background: storySets[selectedSet].stories[currentStoryIndex].backgroundColor || '#1a202c'
                                                }}
                                            >
                                                <MarkdownRenderer
                                                    content={storySets[selectedSet].stories[currentStoryIndex].content}
                                                />
                                            </div>
                                        )}

                                        {/* ナビゲーションエリア */}
                                        <div className="absolute inset-0 flex z-10">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePrev();
                                                }}
                                                className="flex-1 cursor-pointer"
                                                disabled={selectedSet === 0 && currentStoryIndex === 0}
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleNext();
                                                }}
                                                className="flex-1 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// 使用例
const App: React.FC = () => {
    const sampleStorySets: StorySet[] = [
        {
            id: '1',
            title: '旅行の記録',
            thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
            stories: [
                {
                    id: 's1',
                    type: 'image',
                    content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
                    duration: 4000,
                    createdAt: new Date()
                },
                {
                    id: 's2',
                    type: 'markdown',
                    content: `# 山登りの一日

今日は**素晴らしい天気**でした！

## やったこと
- 朝5時に出発
- 標高2000mまで登頂
- 絶景を堪能

*最高の一日でした*`,
                    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    createdAt: new Date()
                },
                {
                    id: 's3',
                    type: 'image',
                    content: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400',
                    createdAt: new Date()
                }
            ]
        },
        {
            id: '2',
            title: 'レシピ集',
            stories: [
                {
                    id: 's4',
                    type: 'markdown',
                    content: `# パスタの作り方

## 材料
- パスタ 100g
- トマトソース
- オリーブオイル
- バジル

## 手順
**1.** お湯を沸かす
**2.** パスタを茹でる
**3.** ソースと絡める`,
                    backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    createdAt: new Date()
                },
                {
                    id: 's5',
                    type: 'image',
                    content: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400',
                    createdAt: new Date()
                }
            ]
        },
        {
            id: '3',
            title: '今日の気づき',
            stories: [
                {
                    id: 's6',
                    type: 'markdown',
                    content: `# 今日学んだこと

*小さな一歩が大きな変化を生む*

継続は力なり。

**今日から始めよう！**`,
                    backgroundColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                    createdAt: new Date()
                }
            ]
        }
    ];

    return (
        <StoryViewer
            storySets={sampleStorySets}
            options={{
                autoPlay: true,
                defaultImageDuration: 3000,
                defaultMarkdownDuration: 5000,
                showProgressBar: true,
                showHeader: true,
                loop: false,
                enableKeyboardNavigation: true
            }}
        />
    );
};

export default App;