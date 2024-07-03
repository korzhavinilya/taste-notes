import React from 'react';

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    !!message && <p className="text-sm font-thin text-red-700"> {message}</p>
  );
}
