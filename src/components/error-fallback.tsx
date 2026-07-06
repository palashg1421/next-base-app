'use client';

import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { Copy, RotateCcw } from 'lucide-react';

const ErrorFallback = ({error, resetErrorBoundary }: FallbackProps) => {

  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown error';
      await navigator.clipboard.writeText(errorMessage);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy error message:', err);
    }
  };

  return (
    <div className="error-boundary shadow-[0px_0px_2px_1px_#dedede] p-2">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-red-500">Something went wrong with this component</h2>
          <p>
            {error instanceof Error
              ? error.message
              : 'Unknown error'}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleCopy}>
            <Copy size={14} />
          </button>
          <button onClick={resetErrorBoundary}>
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;