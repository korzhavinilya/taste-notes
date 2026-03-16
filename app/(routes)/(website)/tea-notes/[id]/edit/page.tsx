import AddTeaNoteForm from '@/components/tea-note-form/add-tea-note-form';
import { fetchTeaProduct } from '@/lib/data';
import { updateTeaProduct } from '@/server/actions';
import { Container } from '@mui/material';
import assert from 'assert';
import React from 'react';

export default async function TeaProductEditPage({
  params
}: {
  params: { id: string };
}) {
  assert(params.id, 'Product ID not specified.');

  const teaProduct = await fetchTeaProduct(params.id);
  assert(teaProduct, 'Product not found.');

  // const regions = await prismaClient.region.findMany();
  // const colors = await prismaClient.teaColor.findMany();

  return (
    <AddTeaNoteForm
      // regions={regions}
      // colors={colors}
      defaultValues={teaProduct}
      submitButtonLabel="update_note"
      submit={updateTeaProduct}
    />
  );
}
