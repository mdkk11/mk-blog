import { cva, cx } from '@/ui/libs/cva';
import type { VariantProps } from 'cva';
import { useButton, useFocusRing, mergeProps, type AriaButtonProps } from 'react-aria';

import { buttonLinkVariants, buttonLinkDefaults } from '@/ui/libs/buttonLinkVariants';
import { useRef } from 'react';

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
  VariantProps<typeof buttonVariants>

const Button = (props: ButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton(props as AriaButtonProps<'button'>, ref);
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
        })
      )}
    />
  );
};

export { Button };
