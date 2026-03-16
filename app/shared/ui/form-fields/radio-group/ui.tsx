import type { FormControlProps } from '@mui/material';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import type { FieldError, FieldPath, FieldValues } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

export interface Props<Schema extends FieldValues>
  extends FormControlProps<any> {
  label: string;
  name: FieldPath<Schema>;
  options: { label: string; value: any }[];
}

export default function HookFormRadioGroup<
  Schema extends FieldValues = FieldValues
>({
  disabled,
  helperText,
  label,
  name,
  options,
  required,
  ...props
}: Props<Schema>) {
  const { control } = useFormContext();

  const getHelperText = (error?: FieldError) =>
    error ? error.message : helperText;

  const labelId = `${name}-label`;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, ...field },
        fieldState: { error },
        formState: { isLoading, isSubmitting }
      }) => (
        <FormControl
          disabled={disabled || isSubmitting || isLoading}
          {...props}
        >
          <FormLabel id={labelId} required={required}>
            {label}
          </FormLabel>
          <RadioGroup
            aria-labelledby={labelId}
            data-testid={`radio-group-${name}`}
            {...field}
            sx={{
              display: 'flex',
              flexDirection: 'row'
            }}
            // Provide nullish fallback to keep the component controlled.
            value={value ?? null}
            onChange={(_, fieldValue) => {
              console.log('onCHange', fieldValue);

              if (fieldValue === value) {
                onChange(null);
              } else {
                onChange(fieldValue);
              }
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                control={<Radio />}
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </RadioGroup>

          <FormHelperText error={!!error}>
            {getHelperText(error)}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
