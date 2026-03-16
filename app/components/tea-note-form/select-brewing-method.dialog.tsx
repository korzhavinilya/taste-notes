'use client';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';

import CreateBrewingMethodForm from '@/components/tea-note-form/123/CreateBrewingMethodForm';
import SelectBrewingMethod from '@/components/tea-note-form/123/SelectBrewingMethod';
import { BrewingMethod } from 'prisma/prisma-client';
import { useState } from 'react';

interface Props {
  open: boolean;
  brewingMethods: BrewingMethod[];
  onSelect: (brewingMethodId: string) => void;
  onCancel: () => void;
}

export default function SelectBrewingMethodDialog({
  open,
  brewingMethods,
  onSelect,
  onCancel
}: Props) {
  const hasMethods = brewingMethods.length;
  const [showForm, setShowForm] = useState(!hasMethods);

  const title = showForm
    ? !hasMethods
      ? "You don't have any methods so far, please create a new one"
      : 'Create a brewing method'
    : 'Brewing Methods';

  return (
    <Dialog
      scroll="paper"
      open={open}
      onClose={onCancel}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {showForm ? (
          <CreateBrewingMethodForm
            onSubmit={() => {}}
            onCancel={hasMethods ? () => setShowForm(false) : undefined}
          />
        ) : (
          <SelectBrewingMethod
            brewingMethods={brewingMethods}
            onCreate={() => setShowForm(true)}
            onSelect={onSelect}
            onCancel={onCancel}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
