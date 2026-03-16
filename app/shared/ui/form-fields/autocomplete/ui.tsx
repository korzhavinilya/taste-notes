import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Controller, useFormContext, Path } from 'react-hook-form';

interface HookFormAutocompleteProps<Schema extends Record<string, unknown>> {
  name: Path<Schema>;
  label: string;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
}

export default function HookFormAutocomplete<
  Schema extends Record<string, unknown>
>({
  name,
  label,
  options,
  placeholder,
  disabled
}: HookFormAutocompleteProps<Schema>) {
  const { control } = useFormContext<Schema>();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onBlur, onChange, ref, value },
        fieldState: { error }
      }) => (
        <Autocomplete
          options={options}
          onChange={(_, value) => onChange(value)}
          value={(value as string) || null}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!error}
              label={label}
              variant="standard"
              placeholder={placeholder}
              inputRef={ref}
              onBlur={onBlur}
              helperText={error ? error.message : null}
            />
          )}
        />
      )}
    />
  );
}
