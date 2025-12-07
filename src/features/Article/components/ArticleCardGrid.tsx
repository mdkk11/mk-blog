import type { VariantProps } from 'cva';
import { cva, cx } from '@/ui/libs/cva';
import { ArticleCard, type ArticleCardProps } from './ArticleCard';

const gridVariants = cva({
  base: 'grid auto-rows-fr',
  variants: {
    columns: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    },
    gap: {
      sm: 'gap-4',
      md: 'gap-8',
      lg: 'gap-12',
      xl: 'gap-16',
    },
  },
  defaultVariants: {
    columns: 3,
    gap: 'md',
  },
});

export interface ArticleCardGridProps
  extends VariantProps<typeof gridVariants> {
  articles: ArticleCardProps[];
  maxItems?: number;
  className?: string;
  // Props to pass down to ArticleCard
  cardVariant?: ArticleCardProps['variant'];
  cardShadow?: ArticleCardProps['shadow'];
}

export const ArticleCardGrid = ({
  articles,
  columns,
  maxItems,
  gap,
  className,
  cardVariant,
  cardShadow,
}: ArticleCardGridProps) => {
  const displayedArticles = maxItems ? articles.slice(0, maxItems) : articles;

  return (
    <div className={cx(gridVariants({ columns, gap }), className)}>
      {displayedArticles.map((article, index) => (
        <ArticleCard
          key={article.id}
          {...article}
          variant={cardVariant ?? article.variant}
          shadow={cardShadow ?? article.shadow}
        />
      ))}
    </div>
  );
};
