import type { Metadata } from 'next';
import { sora } from '@/fonts';
import '../../globals.css';
import Navbar from '@/components/Navbar';

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
      <body className="h-dvh">
        <Navbar />

        <main
          className={`${sora.className} antialiased h-full pt-20 max-w-xl mx-auto`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
