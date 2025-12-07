import type React from 'react';
import { Typography } from '@/ui/components/Typography';

export interface HeroSectionProps {
    title: React.ReactNode;
    description: string;
    className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
    title,
    description,
    className = '',
}) => {
    return (
        <section className={`py-8 ${className}`}>
            <Typography variant="h2" className="text-5xl md:text-6xl font-black font-heading uppercase tracking-tighter mb-6">
                {title}
            </Typography>
            <Typography variant="p" className="text-lg font-mono leading-relaxed max-w-2xl border-l-[3px] border-border pl-4">
                {description}
            </Typography>
        </section>
    );
};
