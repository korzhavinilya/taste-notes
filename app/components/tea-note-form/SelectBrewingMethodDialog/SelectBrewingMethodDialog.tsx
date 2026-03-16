import {
  CreateBrewingMethodStep,
  CreateFirstBrewingMethodStep,
  SelectBrewingMethodStep
} from '@/components/tea-note-form/SelectBrewingMethodDialog/components';
import { SELECT_BREWING_METHOD_STEPS } from '@/components/tea-note-form/SelectBrewingMethodDialog/constants';
import {
  SelectBrewingMethodProvider,
  useSelectBrewingMethodContext
} from '@/components/tea-note-form/SelectBrewingMethodDialog/useSelectBrewingMethodContext';
import { Dialog, IconButton } from '@mui/material';
import { BrewingMethod } from 'prisma/prisma-client';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  brewingMethods: BrewingMethod[];
  onSelect: (id: string) => void;
  onClose: () => void;
}

export default function SelectBrewingMethodDialog({
  open,
  brewingMethods,
  onSelect,
  onClose
}: Props) {
  const hasMethods = brewingMethods.length;
  const startStep = !hasMethods
    ? SELECT_BREWING_METHOD_STEPS.CREATE_FIRST_METHOD
    : SELECT_BREWING_METHOD_STEPS.SELECT_METHOD;

  return (
    <Dialog
      scroll="paper"
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <SelectBrewingMethodProvider startStep={startStep}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>

        <Content
          brewingMethods={brewingMethods}
          onSelect={onSelect}
          onClose={onClose}
        />
      </SelectBrewingMethodProvider>
    </Dialog>
  );
}

type ContentProps = Omit<Props, 'open'>;

function Content({ brewingMethods, onSelect, onClose }: ContentProps) {
  const { stepper } = useSelectBrewingMethodContext();
  const { step } = stepper;

  switch (step) {
    case SELECT_BREWING_METHOD_STEPS.CREATE_FIRST_METHOD:
      return <CreateFirstBrewingMethodStep onSelect={onSelect} />;
    case SELECT_BREWING_METHOD_STEPS.SELECT_METHOD:
      return (
        <SelectBrewingMethodStep
          brewingMethods={brewingMethods}
          onSelect={onSelect}
          onClose={onClose}
        />
      );
    case SELECT_BREWING_METHOD_STEPS.CREATE_METHOD:
      return <CreateBrewingMethodStep onSelect={onSelect} />;
    default:
      return null;
  }
}
