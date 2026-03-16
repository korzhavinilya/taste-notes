export const ProductFormField = {
  Id: 'id',
  Name: 'name',
  Price: 'price',
  Region_Id: 'region_id',
  Link: 'link',
  IsFavorite: 'is_favorite',
  TeaCharacteristics: 'tea_characteristics',
  TeaNote: 'tea_note'
} as const;

export const TeaCharacteristicsFormField = {
  Id: 'id',
  Type: 'type',
  Season: 'season',
  Year: 'year'
} as const;

export const TeaNoteSchemaFormField = {
  Id: 'id',
  ProductId: 'product_id',
  Appearance: 'appearance',
  DryLeafAroma: 'dry_leaf_aroma',
  InfusionTeaNotes: 'infusion_tea_notes'
} as const;

export const InfusionTeaNoteSchemaFormField = {
  Id: 'id',
  TeaNoteId: 'tea_note_id',
  BrewingMethodId: 'brewing_method_id',
  Infusion: 'infusion',
  Color: 'color',
  Flavor: 'flavor',
  Extractivity: 'extractivity',
  Body: 'body',
  Taste: 'taste',
  Balance: 'balance',
  Bouquet: 'bouquet',
  Aftertaste: 'aftertaste',
  Rating: 'rating',
  BrewingMethod: 'brewing_method'
} as const;

export const BrewingMethodFormField = {
  Id: 'id',
  Teaware: 'teaware',
  TeaWeight: 'tea_weight',
  WaterVolume: 'water_volume',
  WaterTemperature: 'water_temperature',
  BrewingTime: 'brewing_time',
  IsSteeping: 'is_steeping'
} as const;
