import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  Rating
} from '@mui/material';
import type { FieldError, FieldPath, FieldValues } from 'react-hook-form';

export interface Props<Schema extends FieldValues> extends FormControlProps {
  label: string;
  name: FieldPath<Schema>;
  helperText?: string;
}

export default function HookFormRating<
  Schema extends FieldValues = FieldValues
>({ disabled, helperText, label, name, ...props }: Props<Schema>) {
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
          <Rating
            name={name}
            value={value || 0}
            onChange={(_, newValue) => {
              onChange(newValue);
            }}
            disabled={disabled || isSubmitting || isLoading}
          />
          <FormHelperText error={!!error}>
            {getHelperText(error)}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
