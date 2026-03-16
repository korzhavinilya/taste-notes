import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, IconButton } from '@mui/material';
import React from 'react';

interface Props {
  children: React.ReactNode;
  isChecked: boolean;
  onChange: () => void;
}

export default function SelectableCard({
  children,
  isChecked,
  onChange
}: Props) {
  return (
    <Box
      onClick={onChange}
      sx={{
        border: isChecked ? 2 : 1,
        borderRadius: 4,
        borderColor: isChecked ? 'primary.main' : 'grey.400',
        height: '100%',
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
          opacity: 0.8
        }
      }}
    >
      {isChecked && (
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
