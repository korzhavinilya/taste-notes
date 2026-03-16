import { CreateBrewingMethod } from '@/components/tea-note-form/SelectBrewingMethodDialog/components/CreateBrewingMethod';
import { useSelectBrewingMethodContext } from '@/components/tea-note-form/SelectBrewingMethodDialog/useSelectBrewingMethodContext';
import { BrewingMethodSchema } from '@/schemas/tea.schema';
import { DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

interface Props {
  onSelect: (id: string) => void;
}

export default function CreateFirstBrewingMethodStep({ onSelect }: Props) {
  const { stepper } = useSelectBrewingMethodContext();

  function handleSubmit(data: BrewingMethodSchema) {
    alert('submit');
  }

  return (
    <>
      <DialogTitle>
        You don&apos;t have any methods so far, please create a new one
      </DialogTitle>
      <DialogContent>
        <CreateBrewingMethod onSubmit={handleSubmit} />
      </DialogContent>
    </>
  );
}
