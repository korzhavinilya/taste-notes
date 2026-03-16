import type { Metadata } from 'next';
import AuthWrapper from './providers/AuthWrapper';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { CssBaseline } from '@mui/material';

export const metadata: Metadata = {
  title: 'Taste Notes',
  description: `Taste Notes is your personal companion for exploring and documenting the world of flavors. 
    Whether you're a tea enthusiast, coffee connoisseur, or simply love trying new beverages, 
    Taste Notes allows you to evaluate and review different products.`
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthWrapper>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </AuthWrapper>
      </body>
    </html>
  );
}
