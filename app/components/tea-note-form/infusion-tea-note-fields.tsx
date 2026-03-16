import HookFormCheckboxGroupDialog from '@/components/tea-note-form/HookFormCheckboxGroupDialog';
import HookFormRadioGroupDialog from '@/components/tea-note-form/HookFormRadioGroupDialog';
import { TeaProductSchema } from '@/schemas/tea.schema';
import {
  InfusionTeaNoteSchemaFormField,
  ProductFormField,
  TeaNoteSchemaFormField
} from '@/schemas/types';
import {
  HookFormCheckboxGroup,
  HookFormRadioGroup,
  HookFormRating
} from '@/shared/ui';
import { Grid } from '@mui/material';

interface Props {
  disabled: boolean;
  tabIndex: number;
}

export default function InfusionTeaNoteFields({ disabled, tabIndex }: Props) {
  const panelName =
    `${ProductFormField.TeaNote}.${TeaNoteSchemaFormField.InfusionTeaNotes}.${tabIndex}` as const;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* <HookFormCheckboxGroupDialog<TeaProductSchema>
          label="Infusion"
          name={`${panelName}.${InfusionTeaNoteSchemaFormField.Infusion}`}
          options={['яркйи', 'тусклый', 'прозрачный', 'мутный'].map(
            (clarity) => {
              return { label: clarity, value: clarity };
            }
          )}
          disabled={disabled}
        /> */}
        <HookFormCheckboxGroup<TeaProductSchema>
          label="Infusion"
          name={`${panelName}.${InfusionTeaNoteSchemaFormField.Infusion}`}
          options={['яркйи', 'тусклый', 'прозрачный', 'мутный'].map(
            (clarity) => {
              return { label: clarity, value: clarity };
            }
          )}
          disabled={disabled}
        />
      </Grid>

      <Grid item xs={12}>
        {/* <HookFormRadioGroupDialog<TeaProductSchema>
          label="Color"
          name={`${panelName}.${InfusionTeaNoteSchemaFormField.Color}`}
          options={['светло-зелёный', 'зелёный'].map((color) => {
            return { label: color, value: color };
          })}
          disabled={disabled}
        /> */}
        <HookFormRadioGroup<TeaProductSchema>
          label="Color"
          name={`${panelName}.${InfusionTeaNoteSchemaFormField.Color}`}
          options={['светло-зелёный', 'зелёный'].map((color) => {
            return { label: color, value: color };
          })}
          disabled={disabled}
        />
      </Grid>

      <Grid item xs={12}>
        <HookFormCheckboxGroup<TeaProductSchema>
          label="Flavor"
          name={`${panelName}.${InfusionTeaNoteSchemaFormField.Flavor}`}
          options={['fruity', 'berry', 'woody'].map((flavor) => {
            return { label: flavor, value: flavor };
          })}
          disabled={disabled}
        />
      </Grid>

      <Grid item xs={12}>
        <HookFormCheckboxGroup<TeaProductSchema>
          label="Extractivity"
          name={`${panelName}.${InfusionTeaNoteSchemaFormField.Extractivity}`}
          options={['низкая', 'средняя', 'высокая'].map((extractivity) => {
            return { label: extractivity, value: extractivity };
          })}
          disabled={disabled}
        />
      </Grid>

      <Grid item xs={12}>
        <HookFormCheckboxGroup<TeaProductSchema>
          label="Body"
          name={`${panelName}.${InfusionTeaNoteSchemaFormField.Body}`}
          options={[
            'сочный',
            'терпкий',
            'вязкий, шершавый',
            'маслянистый, гладкий',
            'лёгкий',
            'плотный'
          ].map((body) => {
            return { label: body, value: body };
          })}
          disabled={disabled}
        />
      </Grid>

      <Grid item xs={12}>
        <HookFormCheckboxGroup<TeaProductSchema>
          label="Taste"
          name={`${panelName}.${InfusionTeaNoteSchemaFormField.Taste}`}
          options={['горький', 'кислый', 'сладкий', 'солёный', 'умами'].map(
            (taste) => {
              return { label: taste, value: taste };
            }
          )}
          disabled={disabled}
        />
      </Grid>

      <Grid item xs={12}>
        <HookFormCheckboxGroup<TeaProductSchema>
          label="Balance"
          name={`${panelName}.${InfusionTeaNoteSchemaFormField.Balance}`}
          options={['сбалансированный, гармоничный', 'резкий, грубый'].map(
            (balance) => {
              return { label: balance, value: balance };
            }
          )}
          disabled={disabled}
        />
      </Grid>

      <Grid item xs={12}>
        <HookFormCheckboxGroup<TeaProductSchema>
          label="Bouquet"
          name={`${panelName}.${InfusionTeaNoteSchemaFormField.Bouquet}`}
          options={[
            'сложный, богатый',
            'простой, однообразный',
            'характерный',
            'нетипичный'
          ].map((bouquet) => {
            return { label: bouquet, value: bouquet };
          })}
          disabled={disabled}
        />
      </Grid>

      <Grid item xs={12}>
        <HookFormCheckboxGroup<TeaProductSchema>
          label="Aftertaste"
          name={`${panelName}.${InfusionTeaNoteSchemaFormField.Aftertaste}`}
          options={[
            'выраженное, интенсивное',
            'сдержанное, лёгкое',
            'длительное',
            'быстро уходящее',
            'вкусое',
            'ароматическое',
            'физическое',
            'температурное'
          ].map((bouquet) => {
            return { label: bouquet, value: bouquet };
          })}
          disabled={disabled}
        />
      </Grid>

      <Grid item xs={12}>
        <HookFormRating<TeaProductSchema>
          label="Rating"
          name={`${panelName}.${InfusionTeaNoteSchemaFormField.Rating}`}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
}
