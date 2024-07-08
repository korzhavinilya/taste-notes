'use client';

import { User } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Page() {
  const { data: session, update } = useSession();
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    if (session && session.user) {
      setUser(session.user as User);
      // console.log(session);
    }
  }, [session]);

  return (
    session && (
      <div>
        <h1>Client Side Rendeing Page</h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>

        <br />

        <button
          className="block border border-black"
          onClick={() => {
            // using update() called from the useSession hook
            update({ ...user, name: 'Client-Man' });
          }}
        >
          Client Side Update
        </button>
        <button
          className="block border border-black"
          onClick={() => {
            signOut();
          }}
        >
          Log Out
        </button>
      </div>
    )
  );
}
