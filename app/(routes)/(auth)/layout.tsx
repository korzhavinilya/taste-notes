import NavigationBar from '@/components_v2/NavigationBar';
import React from 'react';

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-full flex flex-col items-center justify-end max-w-lg mx-auto px-10 pb-16">
      {children}
    </main>
  );
}
