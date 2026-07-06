'use client';

import React from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: Props) => {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <h2 className='mb-2'>Now something seriously went wrong!</h2>
      <button className='btn btn-secondary btn-md' onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}

export default Error;
