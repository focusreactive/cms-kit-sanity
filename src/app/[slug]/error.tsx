'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={'p-5'}>
      <h2>Something went wrong!</h2>

      <button
        className={
          'text-sm mt-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition-all'
        }
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
