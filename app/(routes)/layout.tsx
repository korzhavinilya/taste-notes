import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
        <main className={`${inter.className} antialiased h-dvh`}>
          {children}
        </main>
      </body>
    </html>
  );
}
