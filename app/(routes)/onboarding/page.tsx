import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Onboarding | Taste Notes'
};

export default function OnboardingPage() {
  return (
    <main className="h-full flex flex-col justify-end bg-home-background bg-no-repeat bg-cover bg-center text-center pb-14">
      <h1 className="text-4xl font-semibold text-white">
        Discover the Art of Tasting: Embrace Your Palate
      </h1>

      <h2 className="mt-5 text-sm text-gray-500">
        Rate, review, and share your flavor experiences with fellow enthusiasts.
      </h2>

      <Link
        href="/sign-in"
        className="mt-5 rounded-full bg-gray-normal text-white font-semibold text-sm py-3 px-10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Get Started
      </Link>
    </main>
  );
}
