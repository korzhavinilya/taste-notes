import type { Metadata } from 'next';
import { sora } from '@/fonts';
import '../../globals.css';

export const metadata: Metadata = {
  title: 'Onboarding | Taste Notes',
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
        <main className={`${sora.className} antialiased h-dvh`}>
          {children}
        </main>
      </body>
    </html>
  );
}
