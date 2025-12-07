import type React from 'react';
import type { Story } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';

interface StoryContentProps {
  story: Story;
}

export const StoryContent: React.FC<StoryContentProps> = ({ story }) => {
  return (
    <div className='relative w-full h-full'>
      {story.type === 'image' ? (
        <img
          src={story.content}
          alt='story'
          className='w-full h-full object-cover'
        />
      ) : (
        <div
          className='w-full h-full flex items-center justify-center overflow-y-auto'
          style={{
            background: story.backgroundColor || '#1a202c',
          }}
        >
          <MarkdownRenderer content={story.content} />
        </div>
      )}
    </div>
  );
};
