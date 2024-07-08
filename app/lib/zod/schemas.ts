// import { impression, tea_type } from '@prisma/client';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

type ServerActionSuccessReturnType = {
  status: 'success';
  message: string;
};

type ServerActionFailureReturnType = {
  status: 'error';
  message: string;
  errors?: Array<{
    path: string;
    message: string;
  }>;
};

export type ServerActionReturnType =
  | ServerActionSuccessReturnType
  | ServerActionFailureReturnType
  | null;

export const TeaNoteSchema = z.object({
  name: zfd.text(z.string()),
  // type: zfd.text(
  //   z.enum(Object.keys(tea_type) as [string, ...string[]], {
  //     message: 'Please select a group.',
  //   })
  // ),
  region_id: zfd.numeric(
    z.number({
      errorMap: () => {
        return { message: 'Please select a region.' };
      },
    })
  ),
  price: zfd.numeric(z.coerce.number().optional()),
  appearance: zfd.text(z.string().optional()),
  // impression: zfd.text(
  //   z.enum(Object.keys(impression) as [string, ...string[]], {
  //     message: 'Please select impression.',
  //   })
  // ),
});

export type TeaNoteSchema = z.infer<typeof TeaNoteSchema>;
