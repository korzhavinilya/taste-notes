'use client';

import React from 'react';
import clsx from 'clsx';
import type { ProductItem } from './ProductItem.types';
import { ProductName } from 'prisma/prisma-client';
import { productPagesManifest } from '@/constants/product-pages.manifest';

interface Props {
  name: ProductName;
  checked: boolean;
  disabled: boolean;
  handleClick: () => void;
}

export default function ProductItem({
  name,
  checked,
  disabled,
  handleClick
}: Props) {
  const Icon = productPagesManifest[name].icon;

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        className={clsx(
          'w-full relative aspect-square flex flex-col justify-center items-center',
          'border border-gray-normal  p-5 rounded-xl',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-gray-normal text-white': checked,
            'text-gray-normal bg-white': !checked
          }
        )}
        onClick={handleClick}
      >
        <Icon className="size-12" />
        <span className="font-semibold text-sm">{name}</span>
      </button>
    </>
  );
}
