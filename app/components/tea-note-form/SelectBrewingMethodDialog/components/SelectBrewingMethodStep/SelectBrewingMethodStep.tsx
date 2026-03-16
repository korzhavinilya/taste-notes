import SelectBrewingMethod from '@/components/tea-note-form/SelectBrewingMethodDialog/components/SelectBrewingMethodStep/components/SelectBrewingMethod';
import { SELECT_BREWING_METHOD_STEPS } from '@/components/tea-note-form/SelectBrewingMethodDialog/constants';
import { useSelectBrewingMethodContext } from '@/components/tea-note-form/SelectBrewingMethodDialog/useSelectBrewingMethodContext';
import { DialogContent, DialogTitle } from '@mui/material';
import { BrewingMethod } from 'prisma/prisma-client';
import React from 'react';

interface Props {
  brewingMethods: BrewingMethod[];
  onSelect: (id: string) => void;
  onClose: () => void;
}

export default function SelectBrewingMethodStep({
  brewingMethods,
  onSelect,
  onClose
}: Props) {
  const { stepper } = useSelectBrewingMethodContext();

  const { setStep } = stepper;

  function handleSelect(id: string) {
    onSelect(id);
  }

  function handleOpenCreateStep() {
    setStep(SELECT_BREWING_METHOD_STEPS.CREATE_METHOD);
  }

  return (
    <>
      <DialogTitle>Brewing Methods</DialogTitle>
      <DialogContent>
        <SelectBrewingMethod
          brewingMethods={brewingMethods}
          onSelect={handleSelect}
          onOpenCreateStep={handleOpenCreateStep}
          onClose={onClose}
        />
      </DialogContent>
    </>
  );
}
