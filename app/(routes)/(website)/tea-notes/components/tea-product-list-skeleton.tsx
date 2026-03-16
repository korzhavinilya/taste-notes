import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

export default function TeaProductListSkeleton() {
  return (
    <>
      {/* <Grid container wrap="nowrap" gap={5} justifyContent="center"> */}
      {[...new Array(1)].map((_, index) => {
        return <TeaProductCardSkeleton key={index} />;
      })}
      {/* </Grid> */}
    </>
  );
}

function TeaProductCardSkeleton() {
  return (
    <Box sx={{ width: 210, marginRight: 0.5, mt: 2, mx: 2 }}>
      <Skeleton variant="rectangular" width={210} height={118} />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    </Box>
  );
}
