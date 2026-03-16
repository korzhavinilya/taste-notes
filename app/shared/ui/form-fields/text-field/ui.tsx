import type { TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';
import type { FieldError, FieldPath, FieldValues } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

export type Props<Schema extends Record<string, unknown>> = Omit<
  TextFieldProps,
  'name'
> & {
  name: FieldPath<Schema>;
};

export default function HookFormTextField<
  Schema extends FieldValues = FieldValues
>({ helperText, name, ...props }: Props<Schema>) {
  const { control } = useFormContext();

  const getHelperText = (error?: FieldError) => {
    return error ? error.message : helperText;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onBlur, onChange, ref, value },
        fieldState: { error },
        formState: { isLoading, isSubmitting }
      }) => (
        <TextField
          error={!!error}
          fullWidth
          helperText={getHelperText(error)}
          size="small"
          variant="standard"
          {...props}
          name={name}
          value={value ?? ''}
          onChange={(e) => {
            const newValue = e.target.value;
            if (props.type === 'number') {
              onChange(newValue === '' ? null : Number(newValue));
            } else {
              onChange(newValue);
            }
          }}
          ref={ref}
          InputProps={{
            ref,
            ...props.InputProps
          }}
          disabled={isLoading || isSubmitting || props.disabled}
          onBlur={onBlur}
        />
      )}
    />
  );
}
