'use client';

import { FaRegUserCircle } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { MdOutlineMail } from 'react-icons/md';
import Link from 'next/link';
import SignWithProvidersList from '@/components_v2/SignWithProvidersList';

export default function SignUpPage() {
  return (
    <>
      <h1 className="font-semibold text-3xl">Create account</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="mt-16 w-full flex flex-col justify-center gap-5"
      >
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="p-5 pl-14 rounded-2xl w-full placeholder:font-semibold placeholder:text-sm"
          />
          <FaRegUserCircle className="size-6 absolute inset-y-1/3 ml-4 text-gray-normal" />
        </div>

        <div className="relative">
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="p-5 pl-14 rounded-2xl w-full placeholder:font-semibold placeholder:text-sm"
          />
          <MdOutlineMail className="size-6 absolute inset-y-1/3 ml-4 text-gray-normal" />
        </div>

        <div className="relative">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="p-5 pl-14 rounded-2xl w-full placeholder:font-semibold placeholder:text-sm"
          />
          <MdLockOutline className="size-6 absolute inset-y-1/3 ml-4 text-gray-normal" />
        </div>

        <div className="space-x-2">
          <input
            id="terms-agreement"
            type="checkbox"
            name="terms-agreement"
            className="text-black"
          />
          <label htmlFor="terms-agreement" className="text-xs">
            I agree with <b>tastenotes&apos;</b>{' '}
            <Link href="#">
              <u>terms and Conditions</u>
            </Link>
            .
          </label>
        </div>

        <button
          type="submit"
          className="self-center mt-5 rounded-full bg-gray-normal text-white font-semibold text-sm py-3 px-16"
        >
          Create account
        </button>
      </form>

      <SignWithProvidersList className="mt-8 " />

      <Link href="/sign-in" className="mt-20 font-semibold text-xs underline">
        Already have an account? Sign in
      </Link>
    </>
  );
}
