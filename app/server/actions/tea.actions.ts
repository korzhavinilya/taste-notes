'use server';

import prismaClient from '@/lib/prisma';
import { TeaProductSchema } from '@/schemas/tea.schema';
import assert from 'assert';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';
import { ZodError } from 'zod';
import { ServerActionReturnType } from './types';

export async function createTeaProduct(
  data: TeaProductSchema
): Promise<ServerActionReturnType> {
  try {
    const { tea_note, tea_characteristics, ...restProductData } = data;

    const category = await prismaClient.productCategory.findUnique({
      where: { name: 'tea' },
      select: {
        id: true
      }
    });

    assert(category, 'Category not found.');

    await prismaClient.product.create({
      data: {
        ...restProductData,
        category_id: category.id,
        tea_characteristics: { create: tea_characteristics! },
        tea_note: {
          create: tea_note!
        }
      }
    });

    revalidatePath('/tea-notes');
    redirect('/tea-notes');
  } catch (e) {
    if (isRedirectError(e)) {
      console.log('catch redirect');
      throw e;
    }

    console.log('Error', e);

    if (e instanceof ZodError) {
      return {
        status: 'error',
        message: 'Invalid form data.',
        errors: e.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: `Server validation: ${issue.message}`
        }))
      };
    }

    return {
      status: 'error',
      message: 'Something went wrong. Please try again.'
    };
  }
}

export async function updateTeaProduct(
  teaProduct: TeaProductSchema
): Promise<ServerActionReturnType> {
  try {
    const { tea_note, tea_characteristics, ...restTeaProductFields } =
      teaProduct;

    await prismaClient.product.update({
      where: {
        id: teaProduct.id
      },
      data: {
        ...restTeaProductFields,
        tea_characteristics: {
          update: {
            data: tea_characteristics!
          }
        },
        tea_note: {
          update: {
            data: tea_note!
          }
        }
      }
    });

    revalidatePath('/tea-notes');
    redirect('/tea-notes');
  } catch (e) {
    if (isRedirectError(e)) {
      console.log('catch redirect');
      throw e;
    }

    console.log('Error', e);

    if (e instanceof ZodError) {
      return {
        status: 'error',
        message: 'Invalid form data.',
        errors: e.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: `Server validation: ${issue.message}`
        }))
      };
    }

    return {
      status: 'error',
      message: 'Something went wrong. Please try again.'
    };
  }
}

export async function archiveProduct(id: string) {
  await prismaClient.product.update({
    where: { id },
    data: {
      is_archived: true
    }
  });

  revalidatePath('/tea-notes');
}
