import BrewingMethodRadio from '@/components/tea-note-form/123/BrewingMethodRadio';
import { Box, Button, RadioGroup } from '@mui/material';
import assert from 'assert';
import { BrewingMethod } from 'prisma/prisma-client';
import React, { useState } from 'react';

interface Props {
  brewingMethods: BrewingMethod[];
  onCreate: () => void;
  onSelect: (id: string) => void;
  onCancel: () => void;
}

export default function SelectBrewingMethod({
  brewingMethods,
  onCreate,
  onSelect,
  onCancel
}: Props) {
  const [selectedId, setSelectedId] = useState<string>();

  return (
    <Box>
      <RadioGroup onChange={(e) => setSelectedId(e.target.value)}>
        {brewingMethods.map((method) => (
          <BrewingMethodRadio key={method.id} brewingMethod={method} />
        ))}
      </RadioGroup>

      <Button onClick={onCreate}>Create a new method</Button>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3, mt: 5 }}>
        {onCancel && (
          <Button color="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}

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
