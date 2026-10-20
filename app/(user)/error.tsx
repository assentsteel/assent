"use client";

import { useEffect } from "react";

// Catches any otherwise-uncaught render error on a public page (e.g. a
// failed chunk load) so it degrades to this message instead of leaving a
// blank page for users and crawlers. Navbar/Footer (from the layout above
// this segment) keep rendering regardless.
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
    <div className="container flex flex-col items-center justify-center text-center py-[100px] gap-5">
      <h1 className="text-xl font-[600] text-primary">Something went wrong</h1>
      <p className="text-sm text-territory max-w-[60ch]">
        This section couldn&apos;t load. Please try again, or head back to the homepage.
      </p>
      <button
        onClick={() => reset()}
        className="border border-secondary py-2 px-6 rounded-full hover:bg-secondary hover:text-primary transition-all ease-in-out duration-500 text-sm uppercase"
      >
        Try again
      </button>
    </div>
  );
}
