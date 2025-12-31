import type { VariantProps } from 'cva';

import {
  composeRenderProps,
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from 'react-aria-components';
import { ProgressCircle } from '@/ui/components/ProgressCircle';
import {
  buttonLinkDefaults,
  buttonLinkVariants,
} from '@/ui/libs/buttonLinkVariants';
import { cva, cx, focusRing } from '@/ui/libs/cva';

const buttonVariants = cva({
  base: [
    'uppercase transition-all relative',
    'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none',
    'focus:outline-none',
  ],
  variants: buttonLinkVariants,
  defaultVariants: buttonLinkDefaults,
});

export type ButtonProps = RACButtonProps &
  VariantProps<typeof buttonVariants> & {
    className?: string;
  };

const Button = (props: ButtonProps) => {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        buttonVariants({
          ...renderProps,
          variant: props.variant,
          size: props.size,
          fullWidth: props.fullWidth,
          shadow: props.shadow,
          interactive: props.interactive,
          className: cx(focusRing(renderProps), className),
        }),
      )}
      data-variant={props.variant}
    >
      {composeRenderProps(props.children, (children, { isPending }) => (
        <>
          {!isPending && children}
          {isPending && (
            <ProgressCircle aria-label='Loading...' isIndeterminate />
          )}
        </>
      ))}
    </RACButton>
  );
};

export { Button };
