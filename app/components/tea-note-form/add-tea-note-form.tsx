'use client';

import { TeaProductWithCharacteristicsAndNote } from '@/lib/data';
import { BrewingMethodSchema, TeaProductSchema } from '@/schemas/tea.schema';
import {
  ProductFormField,
  TeaCharacteristicsFormField,
  TeaNoteSchemaFormField
} from '@/schemas/types';
import { ServerActionReturnType } from '@/server/actions/types';
import {
  HookFormCheckboxGroup,
  HookFormRadioGroup,
  HookFormSelectField,
  HookFormTextField
} from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import RemoveIcon from '@mui/icons-material/Remove';
import { LoadingButton } from '@mui/lab';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography
} from '@mui/material';
import React, { useEffect, useState, useTransition } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import InfusionTeaNoteFields from './infusion-tea-note-fields';
import { upperCase } from 'lodash';
import { HookFormAutocomplete } from '@/shared/ui/form-fields/autocomplete';
import { SelectBrewingMethodDialog } from '@/components/tea-note-form/SelectBrewingMethodDialog';

interface Props {
  // regions: Region[];
  // colors: TeaColor[];
  defaultValues?: TeaProductWithCharacteristicsAndNote;
  submitButtonLabel: 'update_note' | 'add_note';
  submit: (
    data: TeaProductSchema,
    defaultValues?: TeaProductWithCharacteristicsAndNote
  ) => Promise<ServerActionReturnType>;
}

export default function AddTeaNoteForm({
  // regions,
  // colors,
  defaultValues,
  submitButtonLabel,
  submit
}: Props) {
  const formMethods = useForm<TeaProductSchema>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(TeaProductSchema),
    shouldUseNativeValidation: false
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    trigger
  } = formMethods;

  const { fields, append } = useFieldArray({
    control,
    name: `${ProductFormField.TeaNote}.${TeaNoteSchemaFormField.InfusionTeaNotes}`,
    keyName: 'uniq_id'
  });

  const [isPending, startTransition] = useTransition();

  const [isTeawareDeleteDialogOpen, setIsTeawareDeleteDialogOpen] =
    useState(false);

  const [isAddBrewingMethodDialogOpen, setIsAddBrewingMethodDialogOpen] =
    useState(false);

  const [teawareIndexToDelete, setTeawareIndexToDelete] = useState<number>();

  const [currentTab, setCurrentTab] = useState(0);
  // const [expandedPanel, setExpandedPanel] = useState<string>();
  const [expandedPanel, setExpandedPanel] = useState<number>(-1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    const errorKeys = Object.keys(errors.tea_note?.infusion_tea_notes || {});
    if (errorKeys.length > 0) {
      const firstErrorKey = Number(errorKeys[0]);
      setExpandedPanel(firstErrorKey);
    }
  }, [errors]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSubmit = handleSubmit((data) => {
    console.log({ data });

    // startTransition(async () => {
    //   const response = await submit(data, defaultValues);
    //   if (response?.status === 'error') {
    //     alert(response?.message);
    //   } else {
    //     reset();
    //   }
    // });
  });

  const handleErrors = async () => {
    const result = await trigger();
    if (!result) {
      console.log({ errors });

      const errorKeys = Object.keys(errors.tea_note?.infusion_tea_notes || {});
      console.log({ errorKeys });

      if (errorKeys.length > 0) {
        const firstErrorKey = errorKeys[0];
        console.log({ firstErrorKey });

        setExpandedPanel(+firstErrorKey);
      }
    }
  };

  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={onSubmit}>
          <Stack spacing={4}>
            <Box>
              {/* <Typography variant="h2">Basic info</Typography> */}

              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <HookFormTextField<TeaProductSchema>
                    label="Name"
                    name={ProductFormField.Name}
                    disabled={isPending}
                  />
                </Grid>

                <Grid item xs={4}>
                  <HookFormSelectField<TeaProductSchema>
                    label="Type"
                    name={`${ProductFormField.TeaCharacteristics}.${TeaCharacteristicsFormField.Type}`}
                    disabled={isPending}
                  >
                    {['green', 'white', 'oolong'].map((quality) => (
                      <MenuItem key={quality} value={quality}>
                        {quality}
                      </MenuItem>
                    ))}
                  </HookFormSelectField>
                </Grid>

                <Grid item xs={12}>
                  <HookFormAutocomplete
                    disabled={isPending}
                    label="Region"
                    name={ProductFormField.Region_Id}
                    options={['fruity', 'berry', 'woody']}
                  />
                </Grid>

                <Grid item xs={3}>
                  <HookFormSelectField
                    label="Season"
                    name={`${ProductFormField.TeaCharacteristics}.${TeaCharacteristicsFormField.Season}`}
                    disabled={isPending}
                  >
                    <MenuItem value="">None</MenuItem>
                    {['spring', 'summer', 'fall', 'winter'].map((season) => (
                      <MenuItem key={season} value={season}>
                        {season}
                      </MenuItem>
                    ))}
                  </HookFormSelectField>
                </Grid>

                <Grid item xs={3}>
                  <HookFormTextField<TeaProductSchema>
                    label="Year"
                    type="number"
                    name={`${ProductFormField.TeaCharacteristics}.${TeaCharacteristicsFormField.Year}`}
                    disabled={isPending}
                  />
                </Grid>

                <Grid item xs={3}>
                  <HookFormTextField<TeaProductSchema>
                    label="Price"
                    name={ProductFormField.Price}
                    type="number"
                    placeholder="0.00"
                    disabled={isPending}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              {/* <Typography variant="h2">Appearance & Aroma</Typography> */}

              <Grid container spacing={2} mt={2}>
                <Grid item xs={12}>
                  <HookFormTextField<TeaProductSchema>
                    label="Appearance"
                    name={`${ProductFormField.TeaNote}.${TeaNoteSchemaFormField.Appearance}`}
                    helperText="Write a few sentences about tea appearance."
                    disabled={isPending}
                    rows={2}
                    multiline
                  />
                </Grid>

                <Grid item xs={12}>
                  <HookFormCheckboxGroup
                    disabled={isPending}
                    label="Dry Leaf Aroma"
                    name={`${ProductFormField.TeaNote}.${TeaNoteSchemaFormField.DryLeafAroma}`}
                    options={['fruity', 'berry', 'woody'].map((aroma) => {
                      return { label: aroma, value: aroma };
                    })}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Typography variant="h2" gutterBottom>
                Infusion & Taste
              </Typography>

              <Button
                type="button"
                onClick={() => setIsAddBrewingMethodDialogOpen(true)}
                disabled={isPending}
                variant="outlined"
              >
                Add a brewing method
                <AddIcon />
              </Button>

              {fields.map((field, index) => {
                // const expanded = expandedPanel === field.uniq_id;
                const expanded = expandedPanel === index;
                return (
                  <Accordion
                    key={field.uniq_id}
                    expanded={expanded}
                    onChange={() => {
                      if (expanded) {
                        // setExpandedPanel(undefined);
                        setExpandedPanel(-1);
                      } else {
                        // setExpandedPanel(field.uniq_id);
                        setExpandedPanel(index);
                      }
                    }}
                    elevation={0}
                    sx={{
                      '& .MuiAccordionSummary-expandIconWrapper': {
                        transform: 'none'
                      },
                      '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                        transform: 'none'
                      },
                      background: 'none',
                      '&:before': {
                        display: 'none'
                      }
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <IconButton>
                          {expanded ? <RemoveIcon /> : <AddIcon />}
                        </IconButton>
                      }
                      sx={{
                        padding: 0,
                        borderBottom: '1px solid',
                        '& .MuiAccordionSummary-content': {
                          display: 'flex',
                          alignItems: 'center'
                        }
                      }}
                    >
                      <Grid container>
                        <Grid item xs={2}>
                          {/* <BrewingMethodAccordionTitle
                            title="посуда"
                            value={field.teaware}
                          /> */}
                          123
                        </Grid>

                        {/* <Grid item xs={2}>
                          <BrewingMethodAccordionTitle
                            title="чай"
                            value={String(field.tea)}
                            adornment="g"
                          />
                        </Grid>

                        <Grid item xs={2}>
                          <BrewingMethodAccordionTitle
                            title="вода"
                            value={String(field.water)}
                            adornment="ml"
                          />
                        </Grid>

                        <Grid item xs={2}>
                          <BrewingMethodAccordionTitle
                            title="температура"
                            value={String(field.temperature)}
                            adornment="°"
                          />
                        </Grid>

                        <Grid item xs={2}>
                          <BrewingMethodAccordionTitle
                            title="время"
                            value={String(field.time)}
                            adornment="min"
                          />
                        </Grid> */}
                      </Grid>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setTeawareIndexToDelete(index);
                          setIsTeawareDeleteDialogOpen(true);
                        }}
                        component="span"
                      >
                        <CloseIcon sx={{ fontSize: 15 }} />
                      </IconButton>
                    </AccordionSummary>
                    <AccordionDetails>
                      <InfusionTeaNoteFields
                        disabled={isPending}
                        tabIndex={index}
                      />
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          </Stack>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isPending}
            loadingPosition="end"
            endIcon={<CreateIcon fontSize="small" />}
            sx={{ mt: 2 }}
          >
            {submitButtonLabel}
          </LoadingButton>
        </form>
      </FormProvider>

      <SelectBrewingMethodDialog
        brewingMethods={[]}
        // brewingMethods={[
        //   {
        //     id: '1',
        //     teaware: 'gaiwan',
        //     tea_weight: 2,
        //     water_volume: 100,
        //     water_temperature: 95,
        //     brewing_time: 2,
        //     is_steeping: true
        //   },
        //   {
        //     id: '2',
        //     teaware: 'teapot',
        //     tea_weight: 10,
        //     water_volume: 100,
        //     water_temperature: 80,
        //     is_steeping: false
        //   }
        // ]}
        open={isAddBrewingMethodDialogOpen}
        onSelect={(brewingMethodId) => {
          setIsAddBrewingMethodDialogOpen(false);
          append({ brewing_method_id: brewingMethodId } as any);
        }}
        onClose={() => setIsAddBrewingMethodDialogOpen(false)}
      />
    </>
  );
}
