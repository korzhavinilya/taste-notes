import { useState } from 'react';

interface Options {
  startStep?: number;
  stepCount: number;
}

export type FormStepper = ReturnType<typeof useFormStepper>;

export default function useFormStepper({ startStep, stepCount }: Options) {
  const [step, setStep] = useState(startStep ?? 0);
  const [isAllStepsCompleted, setIsAllStepsCompleted] = useState(false);

  const isFirstStep = step === 0;
  const isLastStep = step === stepCount - 1;

  return {
    step,
    isFirstStep,
    isLastStep,
    isAllStepsCompleted,
    setIsAllStepsCompleted,
    setStep
  };
}
