import BrewingMethodRadio from '@/components/tea-note-form/123/BrewingMethodRadio';
import { Box, Button, RadioGroup } from '@mui/material';
import assert from 'assert';
import { BrewingMethod } from 'prisma/prisma-client';
import React, { useState } from 'react';

interface Props {
  brewingMethods: BrewingMethod[];
  onOpenCreateStep: () => void;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export default function SelectBrewingMethod({
  brewingMethods,
  onOpenCreateStep,
  onSelect,
  onClose
}: Props) {
  const [selectedId, setSelectedId] = useState<string>();

  return (
    <Box>
      <RadioGroup onChange={(e) => setSelectedId(e.target.value)}>
        {brewingMethods.map((method) => (
          <BrewingMethodRadio
            key={method.id}
            checked={selectedId === method.id}
            brewingMethod={method}
          />
        ))}
      </RadioGroup>

      <Button onClick={onOpenCreateStep}>Create a new method</Button>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3, mt: 5 }}>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button
          color="primary"
          disabled={!selectedId}
          onClick={() => {
            assert(selectedId);
            return onSelect(selectedId);
          }}
        >
          Select
        </Button>
      </Box>
    </Box>
  );
}
