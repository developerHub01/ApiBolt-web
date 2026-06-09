"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        Something went wrong!
      </h2>

      <p className="text-muted-foreground mb-8 text-center max-w-md">
        {error.message ||
          "An unexpected error occurred while processing your request."}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={reset} className="cursor-pointer">
          Try again
        </Button>
        <Link href="/">
          <Button
            variant="secondary"
            className="cursor-pointer text-muted-foreground hover:text-foreground"
          >
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
