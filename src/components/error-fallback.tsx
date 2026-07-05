'use client';

import { FallbackProps } from 'react-error-boundary';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div>
      <h2>Something went wrong</h2>

      <p>
        {error instanceof Error
          ? error.message
          : 'Unknown error'}
      </p>

      <button onClick={resetErrorBoundary}>
        Retry
      </button>
    </div>
  );
}