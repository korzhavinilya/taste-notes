'use client';

import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, SxProps } from '@mui/material';

interface Props {
  sx?: SxProps;
}

export default function AddNoteButton({ sx }: Props) {
  return (
    <IconButton
      size="large"
      sx={{
        backgroundColor: (theme) => theme.palette.text.primary,
        color: (theme) => theme.palette.common.white,
        '&:hover': {
          backgroundColor: (theme) => theme.palette.text.secondary
        },
        borderRadius: '50%',
        ...sx
      }}
      href="/tea-notes/add"
    >
      <AddIcon />
    </IconButton>
  );
}
