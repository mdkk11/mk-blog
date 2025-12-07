'use client';

import { StoryList, type StorySet } from '@/features/Story';
import { SectionHeader } from '@/ui/components/SectionHeader';
import { HeroSection } from '@/features/HeroSection';
import { mockStories } from '@/data/mockStories';

export default function StoriesPage() {
    return (
        <main className="space-y-16">
            <HeroSection
                title="Stories"
                description="Short, ephemeral updates from my daily dev life. Snapshots of code, gear, and random thoughts."
            />

            <section className="space-y-8">
                <SectionHeader title="THE_FEED" />
                <StoryList
                    storySets={mockStories as StorySet[]}
                    options={{
                        gridColumns: { mobile: 2, tablet: 3, desktop: 4 },
                        autoPlay: true,
                        displayMode: 'inline',
                    }}
                />
            </section>
        </main>
    );
}
