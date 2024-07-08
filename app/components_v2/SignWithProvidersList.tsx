'use client';

import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoFacebook } from 'react-icons/io5';

interface Props {
  className?: string;
}

export default function SignWithProvidersList({ className }: Props) {
  return (
    <ul className={clsx(className, 'flex gap-4')}>
      <li>
        <button className="border rounded-full p-3 hover:bg-gray-50">
          <IoLogoFacebook className="size-9 text-blue-600/90" />
        </button>
      </li>
      <li>
        <button
          className="border rounded-full p-3 hover:bg-gray-50"
          onClick={() => signIn('google')}
        >
          <FcGoogle className="size-9" />
        </button>
      </li>
      <li>
        <button className="border rounded-full p-3 hover:bg-gray-50">
          <FaApple className="size-9" />
        </button>
      </li>
    </ul>
  );
}
