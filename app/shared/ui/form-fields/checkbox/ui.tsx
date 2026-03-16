import type { CheckboxProps } from '@mui/material/Checkbox';
import Checkbox from '@mui/material/Checkbox';
import type { FormControlLabelProps } from '@mui/material/FormControlLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ChangeEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export interface Props extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  required?: boolean;
  CheckboxProps?: Omit<CheckboxProps, 'checked' | 'onChange'>;
}

function HookFormCheckbox({
  disabled,
  name,
  value,
  required,
  CheckboxProps,
  ...props
}: Props) {
  const { control, watch, setValue } = useFormContext();
  const currentValue = watch(name);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (value === undefined) {
      // Single checkbox logic
      setValue(name, e.target.checked);
    } else {
      // Multiple checkbox logic
      const newValue = e.target.checked
        ? [...(currentValue || []), value]
        : (currentValue || []).filter((v: string) => v !== value);
      setValue(name, newValue);
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, ...field },
        formState: { isLoading, isSubmitting }
      }) => (
        <FormControlLabel
          {...props}
          disabled={disabled || isLoading || isSubmitting}
          control={
            <Checkbox
              {...CheckboxProps}
              required={required}
              {...field}
              checked={
                value === undefined
                  ? currentValue ?? false // Single checkbox
                  : (currentValue || []).includes(value) // Multiple checkboxes
              }
              onChange={handleChange}
            />
          }
        />
      )}
    />
  );
}

export default HookFormCheckbox;
