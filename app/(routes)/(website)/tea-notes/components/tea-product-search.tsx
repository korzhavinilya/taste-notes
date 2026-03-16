'use client';

import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function TeaProductSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((searchTerms: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerms) {
      params.set('search', searchTerms);
    } else {
      params.delete('search');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <TextField
      placeholder="Search..."
      size="small"
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get('search')?.toString()}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
}
