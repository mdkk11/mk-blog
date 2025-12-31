import {
  composeRenderProps,
  FieldError,
  Label,
  Radio as RACRadio,
  RadioGroup as RACRadioGroup,
  type RadioGroupProps as RACRadioGroupProps,
  type RadioProps as RACRadioProps,
  Text,
  type ValidationResult,
} from 'react-aria-components';
import { cva, focusRing } from '@/ui/libs/cva';

const radioGroupStyles = cva({
  base: 'flex flex-col gap-2',
});

const labelStyles = cva({
  base: 'text-sm font-mono font-bold uppercase tracking-tight text-black',
});

const radioStyles = cva({
  base: 'group flex items-center gap-3 cursor-pointer text-sm font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-50',
});

const circleStyles = cva({
  base: [
    'w-5 h-5 rounded-full flex items-center justify-center',
    'border-2 border-black bg-white',
    'transition-all duration-200',
  ],
  variants: {
    isSelected: {
      true: 'border-black',
      false: 'border-black',
    },
    isInvalid: {
      true: 'border-destructive',
    },
  },
});

const dotStyles = cva({
  base: 'w-2.5 h-2.5 rounded-full bg-black',
  variants: {
    isSelected: {
      true: 'opacity-100 scale-100',
      false: 'opacity-0 scale-0',
    },
  },
});

const descriptionStyles = cva({
  base: 'text-xs text-gray-500 font-mono',
});

const fieldErrorStyles = cva({
  base: 'text-xs text-destructive font-bold font-mono',
});

export interface RadioGroupProps extends RACRadioGroupProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children?: React.ReactNode;
}

export const RadioGroup = ({
  label,
  description,
  errorMessage,
  className,
  children,
  ...props
}: RadioGroupProps) => {
  return (
    <RACRadioGroup
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        radioGroupStyles({ ...renderProps, className }),
      )}
    >
      {label && <Label className={labelStyles()}>{label}</Label>}
      <div className='flex flex-col gap-2'>{children}</div>
      {description && (
        <Text slot='description' className={descriptionStyles()}>
          {description}
        </Text>
      )}
      <FieldError className={fieldErrorStyles()}>{errorMessage}</FieldError>
    </RACRadioGroup>
  );
};

export interface RadioProps extends RACRadioProps {
  className?: string; // wrapper class
}

export const Radio = ({ className, children, ...props }: RadioProps) => {
  return (
    <RACRadio
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        radioStyles({ ...renderProps, className }),
      )}
    >
      {(renderProps) => (
        <>
          <div
            className={circleStyles({
              ...renderProps,
              className: focusRing(renderProps),
            })}
          >
            <div
              className={dotStyles({ isSelected: renderProps.isSelected })}
            />
          </div>
          {children}
        </>
      )}
    </RACRadio>
  );
};
