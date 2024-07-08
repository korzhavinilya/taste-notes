import { ProductName } from 'prisma/prisma-client';
import { IconType } from 'react-icons';
import { CiCoffeeCup } from 'react-icons/ci';
import { GiTeapotLeaves } from 'react-icons/gi';

type ProductManifest = {
  path: string;
  icon: IconType;
};

type ProductPagesManifest = {
  [productName in ProductName]: ProductManifest;
};

export const productPagesManifest: ProductPagesManifest = {
  tea: {
    path: '/tea-notes',
    icon: GiTeapotLeaves
  },
  coffee: {
    path: '/coffee-notes',
    icon: CiCoffeeCup
  }
};

export function isSupportedProductName(name?: string): name is ProductName {
  return Object.keys(ProductName).includes(name ?? '');
}

export function getProductManifest(name?: string) {
  if (!name) {
    return undefined;
  }

  return productPagesManifest[name as ProductName];
}
