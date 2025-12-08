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
    'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none',
    'focus:outline-none',
  ],
  variants: buttonLinkVariants,
  defaultVariants: buttonLinkDefaults,
});

export type ButtonProps = AriaButtonProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
  };

const Button = (props: ButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton(props, ref);
  const { focusProps } = useFocusRing();
  const {
    className,
    variant,
    size,
    fullWidth,
    shadow,
    interactive,
    isDisabled,
    ...rest
  } = props;

  return (
    <button
      type='button'
      ref={ref}
      {...mergeProps(buttonProps, focusProps, rest)}
      data-pressed={isPressed || undefined}
      data-disabled={isDisabled || undefined}
      className={cx(
        buttonVariants({
          variant,
          size,
          fullWidth,
          shadow,
          interactive,
          className,
        }),
      )}
    />
  );
};

export { Button };
