import type { FormControlProps } from '@mui/material';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel
} from '@mui/material';
import type { FieldError, FieldPath, FieldValues } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

export interface Props<Schema extends FieldValues>
  extends FormControlProps<any> {
  label: string;
  name: FieldPath<Schema>;
  options: { label: string; value: any }[];
}

export default function HookFormCheckboxGroup<
  Schema extends FieldValues = FieldValues
>({ disabled, helperText, label, name, options, ...props }: Props<Schema>) {
  const { control } = useFormContext<Schema>();

  const getHelperText = (error?: FieldError) =>
    error ? error.message : helperText;

  const labelId = `${name}-label`;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange },
        fieldState: { error },
        formState: { isLoading, isSubmitting }
      }) => (
        <FormControl
          disabled={disabled || isSubmitting || isLoading}
          {...props}
        >
          <FormLabel id={labelId}>{label}</FormLabel>
        <FormGroup
            aria-labelledby={labelId}
            data-testid={`checkbox-group-${name}`}
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={((value as any[]) || []).includes(option.value)}
                    onChange={(e) => {
                      const newValue: any = e.target.checked
                        ? [...(value || []), option.value]
                        : (value || []).filter(
                            (v: string) => v !== option.value
                          );

                      onChange(newValue);
                    }}
                  />
                }
                key={option.value}
                label={option.label}
              />
            ))}
          </FormGroup>

          <FormHelperText error={!!error}>
            {getHelperText(error)}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
