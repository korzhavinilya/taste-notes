import TeaProductDateGrid from './tea-product-date-grid';
import {
  FetchTeaProductsSearchParams,
  fetchTeaProductDashboardRows
} from '@/lib/data';
import { Box } from '@mui/material';

interface Props {
  searchParams: FetchTeaProductsSearchParams;
}

export default async function TeaProductsTable({ searchParams }: Props) {
  // TODO list is empty

  const teaProducts = await fetchTeaProductDashboardRows(searchParams);
  console.log({ teaProducts });

  return (
    <Box sx={{ width: '100%' }}>
      <TeaProductDateGrid teaProducts={teaProducts} />
    </Box>
  );
}
