'use client';

import { setDefaultProduct } from '@/lib/actions';
import assert from 'assert';
import { FormEvent, useState, useTransition } from 'react';
import { VscLoading } from 'react-icons/vsc';
import ProductItem from './ProductItem';
import { Product } from 'prisma/prisma-client';
import { User } from 'next-auth';

type Props = {
  products: Product[];
  className?: string;
} & Pick<User, 'defaultProduct'>;

export default function DefaultProductPageContent({
  products,
  defaultProduct,
  className
}: Props) {
  const [selectedProduct, setSelectedProduct] = useState(() => {
    return defaultProduct
      ? products.find((product) => product.name === defaultProduct)
      : undefined;
  });

  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(async () => {
      assert(selectedProduct);

      await setDefaultProduct(selectedProduct);
    });
  }

  function handleProductSelect(product?: Product) {
    !isPending && setSelectedProduct(product);
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className={className}>
        <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 disabled:bg-red-500">
          {products.map((product) => {
            const { id, name } = product;
            const checked = selectedProduct?.id === id;

            return (
              <li key={id} className="w-full">
                <ProductItem
                  name={name}
                  checked={checked}
                  disabled={isPending}
                  handleClick={() =>
                    handleProductSelect(!checked ? product : undefined)
                  }
                />
              </li>
            );
          })}
        </ul>
      </fieldset>

      <button
        type="submit"
        disabled={isPending || !selectedProduct}
        className="mt-5 rounded-full bg-gray-normal text-white font-semibold text-sm py-3 px-16 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Select Product
        {isPending && (
          <VscLoading className="ml-2 inline animate-spin h-5 w-5 text-white" />
        )}
      </button>
    </form>
  );
}
