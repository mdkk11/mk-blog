import type React from 'react';
import { Separator } from '@/ui/components/Separator';
import { cx } from '@/ui/libs/cva';

interface SectionHeaderRootProps extends React.HTMLAttributes<HTMLDivElement> {}

const SectionHeaderRoot = ({ className, ...props }: SectionHeaderRootProps) => (
  <div className={cx('flex items-center gap-4 mb-8', className)} {...props} />
);

interface SectionHeaderTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: React.ElementType;
}

const SectionHeaderTitle = ({
  className,
  as: Component = 'h3',
  ...props
}: SectionHeaderTitleProps) => (
  <Component
    className={cx(
      'font-mono font-bold bg-background px-2 border-[2px] border-border -rotate-3',
      className,
    )}
    {...props}
  />
);

interface SectionHeaderSeparatorProps
  extends React.ComponentProps<typeof Separator> {
  flex?: boolean;
}

const SectionHeaderSeparator = ({
  className,
  flex,
  ...props
}: SectionHeaderSeparatorProps) => (
  <Separator className={cx(flex ? 'flex-1' : 'w-8', className)} {...props} />
);

export interface SectionHeaderProps {
  title: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const SectionHeader = ({
  title,
  className = '',
  as,
}: SectionHeaderProps) => {
  return (
    <SectionHeaderRoot className={className}>
      <SectionHeaderSeparator flex />
      <SectionHeaderTitle as={as}>{title}</SectionHeaderTitle>
      <SectionHeaderSeparator />
    </SectionHeaderRoot>
  );
};

export { SectionHeaderRoot, SectionHeaderTitle, SectionHeaderSeparator };
