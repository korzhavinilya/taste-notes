import { CreateBrewingMethod } from '@/components/tea-note-form/SelectBrewingMethodDialog/components/CreateBrewingMethod';
import { SELECT_BREWING_METHOD_STEPS } from '@/components/tea-note-form/SelectBrewingMethodDialog/constants';
import { useSelectBrewingMethodContext } from '@/components/tea-note-form/SelectBrewingMethodDialog/useSelectBrewingMethodContext';
import { BrewingMethodSchema } from '@/schemas/tea.schema';
import { DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

interface Props {
  onSelect: (id: string) => void;
}

export default function CreateBrewingMethodStep({ onSelect }: Props) {
  const { stepper } = useSelectBrewingMethodContext();

  const { setStep } = stepper;

  function handleSubmit(data: BrewingMethodSchema) {
    alert('submit');
  }

  function handlePrevStep() {
    setStep(SELECT_BREWING_METHOD_STEPS.SELECT_METHOD);
  }

  return (
    <>
      <DialogTitle>Create a brewing method</DialogTitle>
      <DialogContent>
        <CreateBrewingMethod
          onSubmit={handleSubmit}
          onCancel={handlePrevStep}
        />
      </DialogContent>
    </>
  );
}
