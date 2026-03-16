import { unstable_noStore as noStore } from 'next/cache';
import prismaClient from './prisma';
import { Prisma } from '@prisma/client';
import assert from 'assert';

export interface FetchTeaProductsSearchParams {
  search?: string;
  page?: string;
  sortBy?: string;
}

export interface TeaProductDashboardRow {
  id: string;
  name: string;
  type: string;
  price: number;
  impression: string;
}

export async function fetchTeaProductDashboardRows(
  searchParams: FetchTeaProductsSearchParams
): Promise<TeaProductDashboardRow[]> {
  noStore();

  const teaProducts = await prismaClient.product.findMany({
    include: {
      tea_characteristics: true,
      tea_note: true
    },
    where: {
      category: { name: 'tea' },
      is_archived: false,
      AND: {
        name: {
          contains: searchParams.search
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  });

  return teaProducts.map((teaProduct) => {
    const { id, name, price, tea_characteristics, tea_note, is_favorite } =
      teaProduct;

    assert(tea_characteristics, 'Tea Characteristics not found.');
    assert(tea_note, 'Tea Note not found.');

    const { type } = tea_characteristics;
    const { impression } = tea_note;

    return {
      id,
      name,
      type,
      price,
      impression
    };
  });
}

export type TeaProductWithCharacteristicsAndNote = Prisma.ProductGetPayload<{
  include: {
    tea_characteristics: true;
    tea_note: {
      include: {
        infusion_tea_notes: {
          include: { brewing_method: true };
        };
      };
    };
  };
}>;

export async function fetchTeaProduct(
  id: string
): Promise<TeaProductWithCharacteristicsAndNote | null> {
  noStore();

  return prismaClient.product.findUnique({
    include: {
      tea_characteristics: true,
      tea_note: true
    },
    where: { id, category: { name: 'tea' } }
  });
}
