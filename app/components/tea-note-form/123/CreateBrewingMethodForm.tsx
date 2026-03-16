import SelectableCard from '@/components/tea-note-form/selectable-card';
import { BrewingMethodSchema } from '@/schemas/tea.schema';
import { BrewingMethodFormField } from '@/schemas/types';
import { HookFormSelectField, HookFormTextField } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Box, Typography, MenuItem, Button } from '@mui/material';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import TimerIcon from '@mui/icons-material/Timer';
import OpacityIcon from '@mui/icons-material/Opacity';

interface Props {
  onSubmit: (data: BrewingMethodSchema) => void;
  onCancel?: () => void;
}

export default function CreateBrewingMethodForm({ onSubmit, onCancel }: Props) {
  const formMethods = useForm<BrewingMethodSchema>({
    mode: 'onChange',
    resolver: zodResolver(BrewingMethodSchema)
  });

  const { handleSubmit, reset } = formMethods;

  const [isSteeping, setIsSteeping] = useState(true);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" gap={2} mt={2}>
              <SelectableCard onChange={() => {}} isSelected={true}>
                <TimerIcon />
                <Typography>Steeping</Typography>
              </SelectableCard>

              <SelectableCard onChange={() => {}} isSelected={false}>
                <OpacityIcon />
                <Typography>Gongfu Brewing</Typography>
              </SelectableCard>

              {/* Add more SelectableCards as needed */}
            </Box>

            {/* <Grid container spacing={2}>
                  <Grid
                    item
                    xs={4}
                    sx={{
                      aspectRatio: 16 / 9
                    }}
                  >
                    <Card />
                  </Grid>

                  <Grid
                    item
                    xs={4}
                    sx={{
                      aspectRatio: 16 / 9
                    }}
                  >
                    <Card />
                  </Grid>
                </Grid> */}
          </Grid>

          <Grid item xs={12} sm={12}>
            <HookFormSelectField<BrewingMethodSchema>
              label="Teaware"
              name={BrewingMethodFormField.Teaware}
            >
              <MenuItem value="gaiwan">Gaiwan</MenuItem>
              <MenuItem value="teapot">Teapot</MenuItem>
              <MenuItem value="cup">Cup</MenuItem>
              <MenuItem value="thermos">Thermos</MenuItem>
              <MenuItem value="Brewing by Lu Yu">Brewing by Lu Yu</MenuItem>
            </HookFormSelectField>
          </Grid>

          <Grid item xs={6} sm={12}>
            <HookFormTextField<BrewingMethodSchema>
              label="Tea"
              type="number"
              name={BrewingMethodFormField.TeaWeight}
            />
          </Grid>

          <Grid item xs={6} sm={12}>
            <HookFormTextField<BrewingMethodSchema>
              label="Water"
              type="number"
              name={BrewingMethodFormField.WaterVolume}
            />
          </Grid>

          <Grid item xs={6} sm={12}>
            <HookFormTextField<BrewingMethodSchema>
              label="Temperature"
              type="number"
              name={BrewingMethodFormField.WaterTemperature}
            />
          </Grid>

          <Grid item xs={6} sm={12}>
            <HookFormTextField<BrewingMethodSchema>
              label="Time"
              type="number"
              name={BrewingMethodFormField.BrewingTime}
            />
          </Grid>
        </Grid>

        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3, mt: 5 }}
        >
          {onCancel && (
            <Button color="secondary" type="button" onClick={onCancel}>
              Cancel
            </Button>
          )}

          <Button color="primary" type="submit">
            Create
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
}
