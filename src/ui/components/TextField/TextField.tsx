import {
  composeRenderProps,
  FieldError,
  Input,
  Label,
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
  Text,
  type ValidationResult,
} from 'react-aria-components';
import { cva, focusRing } from '@/ui/libs/cva';

const textFieldStyles = cva({
  base: 'flex flex-col gap-1.5 w-full max-w-sm',
});

const labelStyles = cva({
  base: 'text-sm font-mono font-bold uppercase tracking-tight',
});

const inputStyles = cva({
  base: [
    'w-full px-4 py-2',
    'bg-white text-black placeholder:text-gray-400',
    'border-2 border-black',
    'font-sans text-base',
    'min-h-[44px]',
    'disabled:bg-gray-100 disabled:cursor-not-allowed',
  ],
  variants: {
    isInvalid: {
      true: 'border-destructive focus:border-destructive outline-destructive',
    },
  },
});

const descriptionStyles = cva({
  base: 'text-xs text-gray-500 font-mono',
});

const fieldErrorStyles = cva({
  base: 'text-xs text-destructive font-bold font-mono',
});

export interface TextFieldProps extends RACTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
}

const TextField = ({
  label,
  description,
  errorMessage,
  className,
  ...props
}: TextFieldProps) => {
  return (
    <RACTextField
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        textFieldStyles({ ...renderProps, className }),
      )}
    >
      {label && <Label className={labelStyles()}>{label}</Label>}
      <Input
        className={(renderProps) =>
          inputStyles({
            ...renderProps,
            isInvalid: props.isInvalid,
            className: focusRing({
              isFocusVisible: renderProps.isFocusVisible,
            }),
          })
        }
      />
      {description && (
        <Text slot='description' className={descriptionStyles()}>
          {description}
        </Text>
      )}
      <FieldError className={fieldErrorStyles()}>{errorMessage}</FieldError>
    </RACTextField>
  );
};

export { TextField };
