import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, IconButton } from '@mui/material';
import React from 'react';

interface Props {
  children: React.ReactNode;
  isSelected: boolean;
  onChange: () => void;
}

export default function SelectableCard({
  children,
  isSelected,
  onChange
}: Props) {
  return (
    <Box
      onClick={onChange}
      sx={{
        border: isSelected ? 2 : 1,
        borderRadius: 4,
        borderColor: isSelected ? 'primary.main' : 'grey.400',
        height: '100%',
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer'
      }}
    >
      {isSelected && (
        <IconButton
          sx={{
            position: 'absolute',
            top: -10,
            right: -10,
            color: 'primary.main',
            background: 'white',
            pointerEvents: 'none',
            zIndex: 100,
            p: 0
          }}
        >
          <CheckCircleIcon />
        </IconButton>
      )}
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
