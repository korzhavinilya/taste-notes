'use client';

import { useTransition } from 'react';
import { VscLoading } from 'react-icons/vsc';
import { deleteTeaNote } from '@/lib/actions';

interface DeleteButtonProps {
  noteId: string;
}

export default function DeleteButton({ noteId }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async () => {
      await deleteTeaNote(noteId);
    });
  }

  return (
    <button
      className="flex w-full items-center gap-2 py-1.5 px-2 hover:bg-gray-100"
      onClick={handleDelete}
      disabled={isPending}
    >
      Delete
      {isPending && <VscLoading className="animate-spin h-5 w-5" />}
    </button>
  );
}
