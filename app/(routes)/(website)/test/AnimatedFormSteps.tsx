'use client';

import { Box, Button, Fade, InputBase, Slide, Typography } from '@mui/material';
import { useState } from 'react';

function Card({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        border: '1px solid',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: 'custom.dark'
      }}
    >
      {children}
    </Box>
  );
}

const steps = [
  {
    title: 'Step 1',
    content: (
      <InputBase
        sx={{ color: 'custom.light', fontSize: 20, flexGrow: 1, px: 4 }}
        fullWidth
        placeholder="Enter a name"
      />
    )
  },
  {
    title: 'Step 2',
    content: (
      <InputBase
        sx={{ color: 'custom.light', fontSize: 20, flexGrow: 1, px: 4 }}
        fullWidth
        placeholder="Enter a name"
      />
    )
  },
  {
    title: 'Step 3',
    content: (
      <InputBase
        sx={{ color: 'custom.light', fontSize: 20, flexGrow: 1, px: 4 }}
        fullWidth
        placeholder="Enter a name"
      />
    )
  }
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [show, setShow] = useState(true);

  const handleNext = () => {
    setShow(false);
    setTimeout(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
      setShow(true);
    }, 300);
  };

  const handlePrev = () => {
    setShow(false);
    setTimeout(() => {
      setCurrentStep(
        (prevStep) => (prevStep - 1 + steps.length) % steps.length
      );
      setShow(true);
    }, 300);
  };

  return (
    <>
      <Card>
        <Box pt={7} pb={5} pl={5} bgcolor={'custom.main'}>
          <Slide direction="right" in={show} timeout={300}>
            <Typography
              color={'custom.light'}
              fontWeight="semi-bold"
              variant="h5"
            >
              {steps[currentStep].title}
            </Typography>
          </Slide>
        </Box>

        <Fade in={show}>{steps[currentStep].content}</Fade>

        <Fade in={show}>
          <Button
            sx={{ mb: 2, color: 'white', fontSize: 20 }}
            variant="text"
            onClick={handleNext}
          >
            Next
          </Button>
        </Fade>
      </Card>
    </>
  );
};

export default MultiStepForm;
