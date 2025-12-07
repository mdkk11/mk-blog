import type { VariantProps } from 'cva';
import { useRef } from 'react';
import {
  type AriaButtonProps,
  mergeProps,
  useButton,
  useFocusRing,
} from 'react-aria';

import {
  buttonLinkDefaults,
  buttonLinkVariants,
} from '@/ui/libs/buttonLinkVariants';
import { cva, cx } from '@/ui/libs/cva';

const buttonVariants = cva({
  base: [
    'uppercase transition-all relative',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'focus:outline-none',
  ],
  variants: buttonLinkVariants,
  defaultVariants: buttonLinkDefaults,
});

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof buttonVariants>;

const Button = (props: ButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton(
    props as AriaButtonProps<'button'>,
    ref,
  );
  const { focusProps, isFocusVisible } = useFocusRing();
  const { className, variant, size, fullWidth, shadow, ...rest } = props;

  return (
    <button
      ref={ref}
      {...mergeProps(buttonProps, focusProps, rest)}
      data-pressed={isPressed || undefined}
      className={cx(
        buttonVariants({
          variant,
          size,
          fullWidth,
          shadow,
          className,
        }),
      )}
    />
  );
};

export { Button };
