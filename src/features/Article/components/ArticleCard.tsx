import type { VariantProps } from 'cva';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  type CardProps,
  CardTitle,
} from '@/ui/components/Card';
import { cva, cx } from '@/ui/libs/cva';

const articleCardVariants = cva({
  base: 'relative block h-full group transition-all duration-300',
  variants: {
    variant: {
      default: [
        'pl-4',
        "before:absolute before:-left-2 before:top-8 before:-bottom-[10px] before:w-[3px] before:bg-foreground before:content-['']",
        "after:absolute after:top-2 after:-right-2 after:w-full after:h-full after:border-[3px] after:border-primary after:-z-10 after:content-['']",
      ],
      simple: 'before:none after:none',
      compact: '',
      inverted: 'hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ArticleCardProps
  extends VariantProps<typeof articleCardVariants> {
  category: string;
  id?: string;
  date: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  href?: string;
  className?: string;
  onClick?: () => void;
  shadow?: CardProps['shadow'];
}

export const ArticleCard = ({
  category,
  date,
  title,
  author,
  href,
  className = '',
  onClick,
  variant = 'default',
  shadow,
}: ArticleCardProps) => {
  const isInverted = variant === 'inverted';
  const isCompact = variant === 'compact';

  const cardContent = (
    <Card
      shadow={shadow ?? 'none'}
      className={cx(
        'h-full border-border flex flex-col relative z-10 rounded-none transition-colors',
        variant === 'simple' && 'border-[2px]',
        isCompact && 'border-[2px]',
        isInverted ? 'bg-foreground text-background border-primary' : 'bg-card',
      )}
    >
      <CardHeader
        className={cx(
          'flex flex-row items-start justify-between space-y-0 border-b-[2px] border-dashed border-border',
          isCompact ? 'p-3 pb-2' : 'p-4 pb-2',
          isInverted && 'border-background/20',
        )}
      >
        <span
          className={cx(
            'font-mono text-xs px-1 uppercase',
            isInverted
              ? 'bg-background text-foreground'
              : 'bg-foreground text-background',
          )}
        >
          {category}
        </span>
        <span
          className={cx(
            'font-mono text-xs',
            isInverted && 'text-background/80',
          )}
        >
          {date}
        </span>
      </CardHeader>

      <CardContent
        className={cx('flex-grow flex flex-col', isCompact ? 'p-3' : 'p-4')}
      >
        <CardTitle
          className={cx(
            'font-bold font-heading leading-tight line-clamp-3 flex-grow',
            isCompact ? 'text-lg' : 'text-2xl',
          )}
        >
          {title}
        </CardTitle>
      </CardContent>

      <CardFooter className={cx(isCompact ? 'p-3 pt-0' : 'p-4 pt-0')}>
        <div className='flex items-center gap-2'>
          <span
            className={cx(
              'font-mono font-bold',
              isCompact ? 'text-[10px]' : 'text-xs',
            )}
          >
            {author.name}
          </span>
        </div>
      </CardFooter>
    </Card>
  );

  const baseClassName = cx(articleCardVariants({ variant, className }));

  if (href) {
    return (
      <a href={href} className={baseClassName} onClick={onClick}>
        {cardContent}
      </a>
    );
  }

  return (
    <article
      className={baseClassName}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : undefined}
    >
      {cardContent}
    </article>
  );
};
