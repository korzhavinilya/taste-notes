import {
  BrewingMethodFormField,
  InfusionTeaNoteSchemaFormField,
  ProductFormField,
  TeaCharacteristicsFormField,
  TeaNoteSchemaFormField
} from '@/schemas/types';
import { z } from 'zod';

export const BrewingMethodSchema = z.object({
  [InfusionTeaNoteSchemaFormField.Id]: z.string().optional(),
  [BrewingMethodFormField.Teaware]: z.string(),
  [BrewingMethodFormField.TeaWeight]: z.number().positive(),
  [BrewingMethodFormField.WaterVolume]: z.number(),
  [BrewingMethodFormField.WaterTemperature]: z.number(),
  [BrewingMethodFormField.BrewingTime]: z.number(),
  [BrewingMethodFormField.IsSteeping]: z.boolean()
});

const InfusionTeaNoteSchema = z.object({
  [InfusionTeaNoteSchemaFormField.Id]: z.string().optional(),
  [InfusionTeaNoteSchemaFormField.Infusion]: z.array(z.string()),
  [InfusionTeaNoteSchemaFormField.Color]: z.string(),
  [InfusionTeaNoteSchemaFormField.Flavor]: z.array(z.string()),
  [InfusionTeaNoteSchemaFormField.Extractivity]: z.array(z.string()),
  [InfusionTeaNoteSchemaFormField.Body]: z.array(z.string()),
  [InfusionTeaNoteSchemaFormField.Taste]: z.array(z.string()),
  [InfusionTeaNoteSchemaFormField.Balance]: z.array(z.string()),
  [InfusionTeaNoteSchemaFormField.Bouquet]: z.array(z.string()),
  [InfusionTeaNoteSchemaFormField.Aftertaste]: z.array(z.string()),
  [InfusionTeaNoteSchemaFormField.Rating]: z.number(),
  [InfusionTeaNoteSchemaFormField.BrewingMethodId]: z.string()
});

const TeaNoteSchema = z.object({
  [TeaNoteSchemaFormField.Id]: z.string().optional(),
  [TeaNoteSchemaFormField.Appearance]: z.string(),
  [TeaNoteSchemaFormField.DryLeafAroma]: z.array(z.string()),
  [TeaNoteSchemaFormField.InfusionTeaNotes]: InfusionTeaNoteSchema.array()
});

const TeaCharacteristicsSchema = z.object({
  [TeaCharacteristicsFormField.Id]: z.string().optional(),
  [TeaCharacteristicsFormField.Type]: z.string(),
  [TeaCharacteristicsFormField.Season]: z.string().nullable(),
  [TeaCharacteristicsFormField.Year]: z
    .number()
    .min(1900, { message: 'Year must be 1900 or later' })
    .max(2099, { message: 'Year must be 2099 or earlier' })
    .nullable()
});

export const TeaProductSchema = z.object({
  [ProductFormField.Id]: z.string().optional(),
  [ProductFormField.Name]: z.string(),
  [ProductFormField.Price]: z.number().positive('Price must be positive'),
  [ProductFormField.Region_Id]: z.string(),
  [ProductFormField.IsFavorite]: z.boolean().nullish(),
  [ProductFormField.TeaCharacteristics]: TeaCharacteristicsSchema.nullable(),
  [ProductFormField.TeaNote]: TeaNoteSchema.nullable()
});

export type TeaProductSchema = z.infer<typeof TeaProductSchema>;
export type BrewingMethodSchema = z.infer<typeof BrewingMethodSchema>;
