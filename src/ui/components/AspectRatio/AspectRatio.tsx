import * as React from 'react';
import { cx } from '@/ui/libs/cva';

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = 1 / 1, style, children, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: `${100 / ratio}%`,
      }}
      data-radix-aspect-ratio-wrapper=''
    >
      <div
        className={cx('absolute inset-0', className)}
        style={style}
        {...props}
      >
        {children}
      </div>
    </div>
  ),
);
AspectRatio.displayName = 'AspectRatio';
