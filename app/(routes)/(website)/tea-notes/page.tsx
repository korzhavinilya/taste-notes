import TeaProductListSkeleton from './components/tea-product-list-skeleton';
import TeaProductSearch from './components/tea-product-search';
import TeaProductsTable from './components/tea-product-table';
import { FetchTeaProductsSearchParams } from '@/lib/data';
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Suspense } from 'react';

import SortIcon from '@mui/icons-material/Sort';
import AddNoteButton from './components/AddNoteButton';

interface Props {
  searchParams: FetchTeaProductsSearchParams;
}

export default async function TeaProductsPage({ searchParams }: Props) {
  return (
    <>
      <Typography variant="h1" mt={2} mb={3}>
        Tea notes
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <TeaProductSearch />

        <TextField
          size="small"
          select
          defaultValue={0}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SortIcon />
              </InputAdornment>
            )
          }}
        >
          <MenuItem value={0}>By date</MenuItem>
        </TextField>
      </Box>

      <Suspense key={searchParams.search} fallback={<TeaProductListSkeleton />}>
        <TeaProductsTable searchParams={searchParams} />
      </Suspense>

      <AddNoteButton sx={{ position: 'absolute', bottom: 40, right: 40 }} />
    </>
  );
}
