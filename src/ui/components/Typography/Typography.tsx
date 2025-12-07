import type React from 'react';
import type { VariantProps } from 'cva';
import { cva, cx } from '@/ui/libs/cva';

// 定義済みのTypographyスタイル
const typographyVariants = cva({
    base: "text-foreground",
    variants: {
        variant: {
            h1: "font-black font-heading text-4xl md:text-5xl uppercase tracking-tighter leading-tight",
            h2: "font-black font-heading text-3xl md:text-4xl uppercase tracking-tight leading-tight",
            h3: "font-bold font-heading text-2xl uppercase tracking-tight leading-snug",
            h4: "font-bold font-heading text-xl uppercase tracking-tight",
            p: "leading-7 text-[16px]",
            lead: "text-xl text-muted-foreground",
            large: "text-lg font-semibold",
            small: "text-sm font-medium leading-none",
            muted: "text-sm text-muted-foreground",
            mono: "font-mono text-sm",
        },
    },
    defaultVariants: {
        variant: "p",
    },
});

// タグの推論用マップ
const defaultTags = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    p: 'p',
    lead: 'p',
    large: 'div',
    small: 'small',
    muted: 'p',
    mono: 'span',
} as const;

export interface TypographyProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {
    as?: React.ElementType;
}

export const Typography = ({
    className,
    variant = "p",
    as,
    ...props
}: TypographyProps) => {
    // asが指定されていなければ、variantに基づいたデフォルトタグを使用
    // variantも指定なければ 'p' (defaultVariantsより)
    const Component = as ?? defaultTags[variant ?? 'p'] ?? 'p';

    return (
        <Component
            className={cx(typographyVariants({ variant, className }))}
            {...props}
        />
    );
};
