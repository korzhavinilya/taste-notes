'use client';

import { MyResponsiveTree } from '@/(routes)/(website)/test/NewTree';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useEffect, useRef } from 'react';

export default function TestPage() {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      // Adjust the height of the dialog content based on its width to ensure proper rendering of the chart
      const resizeListener = () => {
        if (dialogRef.current) {
          dialogRef.current.style.height = `${window.innerHeight * 0.6}px`; // Example: 60% of the viewport height
        }
      };

      resizeListener();
      window.addEventListener('resize', resizeListener);
      return () => window.removeEventListener('resize', resizeListener);
    }
  }, []);

  return (
    <Dialog
      open
      fullWidth
      maxWidth="md"
      PaperProps={{
        style: {
          height: '80vh', // Adjust the dialog height
          maxHeight: '90vh' // Max height of the dialog
        }
      }}
    >
      <DialogTitle>Select Dry Leaf Aroma</DialogTitle>
      <DialogContent ref={dialogRef} dividers>
        <div style={{ height: '100%', width: '100%' }}>
          <MyResponsiveTree />
        </div>
      </DialogContent>
    </Dialog>
  );
}
