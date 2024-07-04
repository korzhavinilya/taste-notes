'use server';

import { z } from 'zod';
import { tea_type } from '@prisma/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const TeaNoteSchema = z.object({
  name: z.string().min(1),
  type: z.enum(Object.keys(tea_type) as [string, ...string[]]),
  region_id: z.coerce.number().min(1),
  price: z.coerce.number(),
  appearance: z.string(),
  rating: z.coerce.number()
});

export async function createTeaNote(prevState: any, formData: FormData) {
  try {
    const { name, type, region_id, price, appearance, rating } =
      TeaNoteSchema.parse({
        name: formData.get('name'),
        type: formData.get('type'),
        region_id: formData.get('region_id'),
        price: formData.get('price'),
        appearance: formData.get('appearance'),
        rating: formData.get('rating')
      });

    await global.prisma?.tea_notes.create({
      data: {
        name,
        type: type as tea_type,
        region_id,
        price,
        appearance,
        rating
      }
    });

    revalidatePath('/notes');
    redirect('/notes');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues.reduce((acc, cur) => {
        return { ...acc, [cur.path[0]]: cur.message };
      }, {} as { [field: string]: string | undefined });
    }

    throw error;
  }
}
