'use client';

import { FaRegUserCircle } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import Link from 'next/link';
import SignWithProvidersList from '@/components_v2/SignWithProvidersList';

export default function SignInPage() {
  return (
    <>
      <h1 className="font-semibold text-3xl">Sign in</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="mt-16 w-full flex flex-col justify-center"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Enter name of email"
            className="p-5 pl-14 rounded-2xl w-full placeholder:font-semibold placeholder:text-sm"
          />
          <FaRegUserCircle className="size-6 absolute inset-y-1/3 ml-4 text-gray-normal" />
        </div>

        <div className="relative mt-5">
          <input
            type="password"
            placeholder="Enter password"
            className="p-5 pl-14 rounded-2xl w-full placeholder:font-semibold placeholder:text-sm"
          />
          <MdLockOutline className="size-6 absolute inset-y-1/3 ml-4 text-gray-normal" />
        </div>

        <Link href="#" className="mt-5 font-semibold text-xs underline">
          Forgot password?
        </Link>

        <button
          type="submit"
          className="self-center mt-12 rounded-full bg-gray-normal text-white font-semibold text-sm py-3 px-16"
        >
          Sign in
        </button>
      </form>

      <SignWithProvidersList className="mt-24 " />

      <Link href="/sign-up" className="mt-20 font-semibold text-xs underline">
        Don&apos;t have an account? Create account
      </Link>
    </>
  );
}
