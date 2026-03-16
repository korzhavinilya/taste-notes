import NextBreadcrumbs from '@/components/NextBreadcrumbs';
import { Container } from '@mui/material';

export default function WebsiteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container
      maxWidth="md"
      sx={{
        py: 2
      }}
    >
      <NextBreadcrumbs />
      {children}
    </Container>
  );
}
