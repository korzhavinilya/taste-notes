'use client';

import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  styled
} from '@mui/material';
import { usePathname } from 'next/navigation';

export default function NextBreadcrumbs() {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);

  return (
    <Box display="flex" alignItems="center">
      <Breadcrumbs
        maxItems={3}
        // separator={<DotSeparator />}
        aria-label="breadcrumb"
      >
        <Link href="/categories">
          <AutoAwesomeMotionIcon
            sx={{
              color: 'text.primary',
              fontSize: 20,
              position: 'relative',
              top: 3
            }}
          />
        </Link>

        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join('/')}`;
          let itemLink =
            link[0].toUpperCase() +
            link.slice(1, link.length).replace('-', ' ');

          if (index === pathNames.length - 1) {
            return (
              <Typography key={index} variant="subtitle2" color="text.primary">
                {itemLink}
              </Typography>
            );
          }

          return (
            <Link
              key={index}
              href={href}
              variant="subtitle2"
              sx={{
                textDecoration: 'none',
                color: (theme) => theme.palette.text.disabled,
                '&:hover': {
                  color: (theme) => theme.palette.text.primary
                }
              }}
            >
              {itemLink}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}

const DotSeparator = styled('span')(({ theme }) => ({
  height: 3,
  width: 3,
  backgroundColor: theme.palette.text.disabled,
  borderRadius: '100%'
}));
