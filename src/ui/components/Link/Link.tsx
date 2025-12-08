import type { VariantProps } from 'cva';
import NextLink from 'next/link';
import { useRef } from 'react';
import { type AriaLinkOptions, useLink } from 'react-aria';
import {
  buttonLinkDefaults,
  buttonLinkVariants,
} from '@/ui/libs/buttonLinkVariants';
import { compose, cva, cx, focusRing } from '@/ui/libs/cva';

const _linkVariants = cva({
  base: [
    'font-bold uppercase transition-all relative inline-block',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'focus:outline-none',
    'cursor-pointer',
  ],
  variants: {
    ...buttonLinkVariants,
    fullWidth: {
      true: 'w-full text-center',
      false: '',
    },
  },
  defaultVariants: buttonLinkDefaults,
});

const linkVariants = compose(focusRing, _linkVariants);

export interface LinkProps
  extends AriaLinkOptions,
    VariantProps<typeof linkVariants> {
  className?: string;
  children?: React.ReactNode;
  // HTML属性も受け取れるようにする（target, relなど）
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>['rel'];
}

const Link = (props: LinkProps) => {
  const {
    className,
    variant,
    size,
    fullWidth,
    shadow,
    interactive,
    children,
    href,
    ...rest
  } = props;
  const ref = useRef<HTMLAnchorElement>(null);
  const { linkProps } = useLink({ ...rest, href }, ref);

  // hrefがある場合は、Next.jsのLinkを使う（自動でaタグが生成される）
  if (href) {
    return (
      <NextLink
        href={href}
        ref={ref}
        {...linkProps}
        className={cx(
          linkVariants({
            variant,
            size,
            fullWidth,
            shadow,
            interactive,
            className,
          }),
        )}
      >
        {children}
      </NextLink>
    );
  }

  // hrefがない場合（JS制御のリンクなど）は通常のaタグ
  return (
    <a
      ref={ref}
      {...linkProps}
      className={cx(
        linkVariants({
          variant,
          size,
          fullWidth,
          shadow,
          interactive,
          className,
        }),
      )}
    >
      {children}
    </a>
  );
};

export { Link, linkVariants };
