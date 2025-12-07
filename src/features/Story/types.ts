export type StoryType = 'image' | 'markdown';

export interface Story {
    id: string;
    type: StoryType;
    content: string;
    backgroundColor?: string;
    duration?: number; // ミリ秒
    createdAt?: Date;
}

export interface StorySet {
    id: string;
    title: string;
    thumbnail?: string;
    stories: Story[];
}

export interface StoryGridColumns {
    mobile: number;
    tablet: number;
    desktop: number;
}

export interface StoryViewerOptions {
    autoPlay: boolean;
    defaultImageDuration: number;
    defaultMarkdownDuration: number;
    showProgressBar: boolean;
    showHeader: boolean;
    loop: boolean;
    enableKeyboardNavigation: boolean;
    gridColumns: StoryGridColumns;
    displayMode: 'fullscreen' | 'inline';
    aspectRatio: number;
}

export const defaultOptions: StoryViewerOptions = {
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
    },
    displayMode: 'fullscreen',
    aspectRatio: 9 / 16
};
