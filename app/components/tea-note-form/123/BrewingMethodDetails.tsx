import { Box, Grid, Typography } from '@mui/material';
import { upperCase } from 'lodash';
import { BrewingMethod } from 'prisma/prisma-client';

interface Props {
  brewingMethod: BrewingMethod;
}

export default function BrewingMethodDetails({ brewingMethod }: Props) {
  const {
    teaware,
    tea_weight,
    water_volume,
    water_temperature,
    is_steeping,
    brewing_time
  } = brewingMethod;

  return (
    <Grid container spacing={2} sx={{ width: '100%', flexGrow: 1 }}>
      <Grid item xs={2}>
        <Column title="teaware" value={teaware} />
      </Grid>
      <Grid item xs={2}>
        <Column title="tea" value={String(tea_weight)} adornment="g" />
      </Grid>
      <Grid item xs={2}>
        <Column title="water" value={String(water_volume)} adornment="ml" />
      </Grid>
      <Grid item xs={2}>
        <Column
          title="temperature"
          value={String(water_temperature)}
          adornment="°"
        />
      </Grid>
      <Grid item xs={2}>
        <Column title="brewing" value={is_steeping ? 'steeping' : 'Gongfu'} />
      </Grid>
      {brewing_time && (
        <Grid item xs={2}>
          <Column title="time" value={String(brewing_time)} adornment="sec" />
        </Grid>
      )}
    </Grid>
  );
}

interface ColumnProps {
  title: string;
  value: string;
  adornment?: string;
}

function Column({ title, value, adornment }: ColumnProps) {
  return (
    <Box display="flex" flexDirection="column">
      <Typography fontSize={15} component="span" textAlign="center">
        {upperCase(title)}
      </Typography>
      <Typography fontSize={20} component="span" textAlign="center">
        {upperCase(value)}
        {adornment}
      </Typography>
    </Box>
  );
}
