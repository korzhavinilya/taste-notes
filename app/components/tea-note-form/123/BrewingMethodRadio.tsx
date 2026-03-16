import React from 'react';
import { FormControlLabel, Radio, Box, RadioProps } from '@mui/material';
import BrewingMethodDetails from './BrewingMethodDetails';
import { BrewingMethod } from 'prisma/prisma-client';

interface Props extends RadioProps {
  brewingMethod: BrewingMethod;
}

export default function BrewingMethodRadio({ brewingMethod, ...props }: Props) {
  return (
    <FormControlLabel
      control={<Radio {...props} value={brewingMethod.id} />}
      label={
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 'calc(100% - 48px)',
            marginLeft: '48px'
          }}
        >
          <BrewingMethodDetails brewingMethod={brewingMethod} />
        </Box>
      }
      sx={{
        width: '100%',
        '& .MuiFormControlLabel-label': { width: '100%', display: 'flex' }
      }}
    />
  );
}
