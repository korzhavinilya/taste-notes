import { SELECT_BREWING_METHOD_STEPS } from '@/components/tea-note-form/SelectBrewingMethodDialog/constants';
import useFormStepper, {
  FormStepper
} from '@/components/tea-note-form/SelectBrewingMethodDialog/useFormStepper';
import { createContext, useContext } from 'react';

interface ContextState {
  stepper: FormStepper;
}

const SelectBrewingMethodContext = createContext<ContextState>({
  stepper: undefined as any
});

interface Props {
  startStep: number;
  children: React.ReactNode;
}

export function SelectBrewingMethodProvider({ startStep, children }: Props) {
  const stepper = useFormStepper({
    stepCount: Object.keys(SELECT_BREWING_METHOD_STEPS).length,
    startStep
  });

  const value = {
    stepper
  };

  return (
    <SelectBrewingMethodContext.Provider value={value}>
      {children}
    </SelectBrewingMethodContext.Provider>
  );
}

export const useSelectBrewingMethodContext = () =>
  useContext(SelectBrewingMethodContext);
