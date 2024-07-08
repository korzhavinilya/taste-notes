'use server';

import { ZodError, z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import prismaClient from './prisma';
import { ServerActionReturnType, TeaNoteSchema } from './zod/schemas';
import {
  RedirectType,
  isRedirectError
} from 'next/dist/client/components/redirect';
import { auth, update } from '@/auth';
import { Product, ProductName } from 'prisma/prisma-client';
import { productPagesManifest } from '../constants/product-pages.manifest';
import { User } from 'next-auth';

export async function createTeaNote(
  data: TeaNoteSchema
): Promise<ServerActionReturnType> {
  try {
    // const { name, type, region_id, price, appearance, impression } =
    const { name, region_id, price, appearance } = TeaNoteSchema.parse(data);

    await prismaClient.teaNote.create({
      data: {
        name,
        // type: type as tea_type,
        // region_id,
        price,
        product_id: '983abbfe-a106-4547-af4c-e64f7cce33a7'
        // appearance
        // impression: impression as impression
      }
    });

    revalidatePath('/alt/tea-notes');
    redirect('/alt/tea-notes');
  } catch (e) {
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

    if (isRedirectError(e)) {
      console.log('catch redirect');
      throw e;
    }

    return {
      status: 'error',
      message: 'Something went wrong. Please try again.'
    };
  }
}

export async function deleteTeaNote(
  id: string
): Promise<ServerActionReturnType> {
  try {
    await prismaClient.teaNote.delete({ where: { id } });

    revalidatePath('/tea-notes');

    return {
      status: 'success',
      message: 'Tea deleted.'
    };
  } catch (e) {
    return {
      status: 'error',
      message: 'Something went wrong. Please try again.'
    };
  }
}

export async function setDefaultProduct({
  id,
  name
}: Product): Promise<ServerActionReturnType> {
  const session = await auth();

  await prismaClient.userSettings.update({
    where: {
      user_id: session?.user?.id!
    },
    data: {
      default_product_id: id
    }
  });

  const user = session?.user;
  await update({ ...user, defaultProduct: name } as any);

  redirect(productPagesManifest[name].path);
}
