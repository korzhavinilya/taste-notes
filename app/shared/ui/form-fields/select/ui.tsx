import { HookFormTextField } from '@/shared/ui';
import { Props } from '../text-field/ui';
import type { FieldValues } from 'react-hook-form';

interface HookFormSelectFieldProps<Schema extends Record<string, unknown>>
  extends Props<Schema> {}

export default function HookFormSelectField<
  Schema extends FieldValues = FieldValues
>({
  name,
  InputProps,
  SelectProps,
  ...props
}: HookFormSelectFieldProps<Schema>) {
  return (
    <HookFormTextField
      {...props}
      name={name}
      select
      SelectProps={{
        ...SelectProps,
        MenuProps: {
          anchorOrigin: {
            horizontal: 'center',
            vertical: 'bottom'
          },
          ...SelectProps?.MenuProps
        },
        SelectDisplayProps: {
          ...SelectProps?.SelectDisplayProps,
          // For testing.
          // @ts-ignore
          'data-testid': `${name}-button`
        }
      }}
    />
  );
}
