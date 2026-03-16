import { fetchTeaProduct } from '@/lib/data';
import {
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import assert from 'assert';
import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default async function TeaProductPage({
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
    <>
      <IconButton href="/tea-notes">
        <ArrowBackIosIcon />
      </IconButton>
      <List disablePadding>
        <Item label="Name" value={teaProduct.name} />
        <Item label="Type" value={teaProduct.tea_characteristics?.type!} />
        <Item label="Season" value={teaProduct.tea_characteristics?.season!} />
        <Item label="Year" value={`${teaProduct.tea_characteristics?.year!}`} />
        <Item label="Price" value={`${teaProduct.price} BYN`} />
        <Item
          label="Quality"
          value={teaProduct.tea_characteristics?.quality!}
        />
        <Item
          label="Created at"
          value={teaProduct.created_at?.toDateString()!}
        />
        <Item label="Appearance" value={teaProduct.tea_note?.appearance!} />
        <Item
          label="Dry leaf aroma"
          value={teaProduct.tea_note?.aroma?.join(', ')!}
        />

        {teaProduct.tea_note?.infusion_notes?.map((infusionNote) => {
          return (
            <React.Fragment key={infusionNote.id}>
              <Divider />
              <Item label="Teaware" value={infusionNote.teaware} />
              <Item
                key={infusionNote.id}
                label="Impression"
                value={infusionNote.impression!}
              />
              <Item
                label="Infusion aroma"
                value={infusionNote?.aroma?.join(', ')!}
              />
            </React.Fragment>
          );
        })}
      </List>
    </>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <ListItem sx={{ py: 1, px: 0 }}>
      <ListItemText sx={{ mr: 2 }} primary={label} />
      <Typography variant="body1" fontWeight="medium">
        {value}
      </Typography>
    </ListItem>
  );
}
