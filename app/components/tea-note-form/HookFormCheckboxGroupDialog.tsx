import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useFormContext, FieldPath, FieldValues } from 'react-hook-form';
import { HookFormCheckboxGroup } from '@/shared/ui';
import { FormControlProps, FormHelperText } from '@mui/material';
import get from 'lodash/get';

interface Props<Schema extends FieldValues> extends FormControlProps<any> {
  label: string;
  name: FieldPath<Schema>;
  options: { label: string; value: any }[];
}

export default function HookFormCheckboxGroupDialog<
  Schema extends FieldValues = FieldValues
>({ label, name, options, disabled, helperText, ...props }: Props<Schema>) {
  const {
    watch,
    formState: { errors }
  } = useFormContext<Schema>();
  const selectedValue = watch(name);
  const [open, setOpen] = React.useState(false);

  const error = get(errors, name);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ListItemButton
        divider
        aria-haspopup="true"
        aria-controls={`${name}-menu`}
        aria-label={label}
        disabled={disabled}
        onClick={() => setOpen(true)}
      >
        <ListItemText
          primary={label}
          secondary={
            Array.isArray(selectedValue)
              ? selectedValue.join(', ')
              : selectedValue || 'Select an option'
          }
        />
      </ListItemButton>

      <FormHelperText error={!!error}>
        {error ? error.message : helperText}
      </FormHelperText>

      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
        onClose={() => handleClose()}
      >
        <DialogTitle>{label}</DialogTitle>
        <DialogContent dividers>
          <HookFormCheckboxGroup
            label={label}
            name={name}
            options={options}
            helperText={helperText}
            disabled={disabled}
            {...props}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
