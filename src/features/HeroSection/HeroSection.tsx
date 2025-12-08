import type React from 'react';
import { Typography } from '@/ui/components/Typography';

export interface HeroSectionProps {
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  className = '',
  children,
}) => {
  return (
    <section className={`py-8 space-y-12 ${className}`}>
      <Typography
        variant='h2'
        className='text-5xl md:text-6xl font-black font-heading uppercase tracking-tighter mb-6'
      >
        {title}
      </Typography>
      <Typography
        variant='p'
        className='text-lg font-mono leading-relaxed max-w-2xl border-l-[3px] border-border pl-4'
      >
        {description}
      </Typography>
      {children}
    </section>
  );
};
