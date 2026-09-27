"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <h1>Something went wrong</h1>
        <p>This page could not be loaded. Please try again.</p>
        <button
          type="button"
          onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
}
