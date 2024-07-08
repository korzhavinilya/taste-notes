// src/ui/update_button.tsx
'use client';
import { useSession } from 'next-auth/react';

export default function ClientSessionUpdateButton({
  newName
}: {
  newName: String;
}) {
  const { data: session, update } = useSession();
  return (
    <button
      className="block border border-black"
      onClick={() => {
        update({ ...session!.user, name: newName });
      }}
    >
      Client Side Update
    </button>
  );
}
