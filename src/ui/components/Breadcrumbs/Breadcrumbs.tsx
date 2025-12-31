import {
  composeRenderProps,
  Breadcrumb as RACBreadcrumb,
  type BreadcrumbProps as RACBreadcrumbProps,
  Breadcrumbs as RACBreadcrumbs,
  type BreadcrumbsProps as RACBreadcrumbsProps,
  Link as RACLink,
  type LinkProps as RACLinkProps,
} from 'react-aria-components';
import { cva, cx, focusRing } from '@/ui/libs/cva';

const breadcrumbsStyles = cva({
  base: 'flex flex-wrap items-center gap-2',
});

const breadcrumbStyles = cva({
  base: [
    'flex items-center gap-2',
    'after:content-["/"] after:text-gray-400 after:font-mono after:text-sm',
    'last:after:content-none',
  ],
});

const linkStyles = cva({
  base: [
    'font-mono text-sm text-black transition-colors',
    'hover:bg-black hover:text-white px-1',
    'data-[current]:font-bold data-[current]:hover:bg-transparent data-[current]:hover:text-black data-[current]:cursor-default',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'outline-none',
  ],
});

export interface BreadcrumbsProps<T extends object>
  extends RACBreadcrumbsProps<T> {
  className?: string;
}

export function Breadcrumbs<T extends object>({
  className,
  ...props
}: BreadcrumbsProps<T>) {
  return (
    <RACBreadcrumbs {...props} className={breadcrumbsStyles({ className })} />
  );
}

export interface BreadcrumbProps extends RACBreadcrumbProps {
  className?: string;
}

export function Breadcrumb({ className, ...props }: BreadcrumbProps) {
  return (
    <RACBreadcrumb
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        breadcrumbStyles({ ...renderProps, className }),
      )}
    />
  );
}

export interface BreadcrumbLinkProps extends RACLinkProps {
  className?: string;
}

export function BreadcrumbLink({ className, ...props }: BreadcrumbLinkProps) {
  return (
    <RACLink
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        linkStyles({
          ...renderProps,
          className: cx(focusRing(renderProps), className),
        }),
      )}
    />
  );
}
