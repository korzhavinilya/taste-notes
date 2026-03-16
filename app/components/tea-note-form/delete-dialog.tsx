import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import React from 'react';

interface Props {
  open: boolean;
  handleDelete: () => void;
  handleCancel: () => void;
}

export default function DeleteDialog({
  open,
  handleDelete,
  handleCancel
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this teaware?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
