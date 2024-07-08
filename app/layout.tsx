import { urbanist } from '@/fonts';
import type { Metadata } from 'next';
import './globals.css';
import AuthWrapper from './providers/AuthWrapper';

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
      <AuthWrapper>
        <body className={`${urbanist.className} h-dvh antialiased`}>
          {children}
        </body>
      </AuthWrapper>
    </html>
  );
}
