"use client";
import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl mb-4">Something went wrong!</h2>
          <p className="text-gray-700 mb-4">Error: {error.message}</p>
          {error.digest && (
            <p className="text-gray-700 mb-4">Digest: {error.digest}</p>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
