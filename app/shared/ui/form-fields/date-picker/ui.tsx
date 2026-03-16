import {
  DateOrTimeView,
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
  MobileTimePicker
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { FieldError, FieldPath, FieldValues } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

export interface Props<Schema extends FieldValues> {
  label: string;
  name: FieldPath<Schema>;
  pickerType?: 'date' | 'time' | 'datetime';
  format?: string;
  views?: DateOrTimeView[];
  helperText?: string;
  minDate?: Date | null;
  maxDate?: Date | null;
  size?: 'small' | 'medium';
  variant?: 'filled' | 'outlined' | 'standard';
  ampm?: boolean;
}

export default function HookFormDatePicker<
  Schema extends FieldValues = FieldValues
>({
  label,
  name,
  pickerType = 'date',
  format = 'YYYY-MM-DD',
  views,
  helperText,
  minDate,
  maxDate,
  size = 'small',
  variant = 'standard',
  ampm
}: Props<Schema>) {
  const { control } = useFormContext<Schema>();

  const getHelperText = (error?: FieldError) =>
    error ? error.message : helperText;

  const PickerComponent =
    pickerType === 'time'
      ? MobileTimePicker
      : pickerType === 'datetime'
      ? DateTimePicker
      : DatePicker;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        control={control}
        name={name}
        render={({
          field: { value, onChange },
          fieldState: { error },
          formState: { isLoading, isSubmitting }
        }) => (
          <div>
            <PickerComponent
              label={label}
              value={value ?? null}
              disabled={isSubmitting || isLoading}
              onChange={onChange}
              format={format}
              views={views as any}
              minDate={minDate}
              maxDate={maxDate}
              ampm={ampm}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size,
                  variant,
                  error: !!error,
                  helperText: getHelperText(error)
                }
              }}
            />
          </div>
        )}
      />
    </LocalizationProvider>
  );
}
