import Footer from '@/components_v2/Footer';
import NavigationBar from '@/components_v2/NavigationBar';
import React from 'react';

export default function WebsiteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full container max-w-7xl mx-auto flex flex-col px-8 pt-3">
      <NavigationBar />

      {/* <main className="w-full flex-grow mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-28 sm:pb-8"> */}
      <main className="flex-grow">{children}</main>

      {/* <Footer /> */}
    </div>
  );
}
