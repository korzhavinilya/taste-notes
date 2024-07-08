import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onboarding | Taste Notes'
};

export default function OnboardingLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="h-full">{children}</main>;
}
