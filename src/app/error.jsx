"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-6">
          <AlertCircle className="h-10 w-10 text-red-600" aria-hidden="true" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
          Something went wrong
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          We apologize for the inconvenience. An unexpected error has occurred.
          Our team has been notified and we're working to fix it.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => reset()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 text-base font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 justify-center"
          >
            Try again
          </Button>
          <Link href="/" className="inline-flex">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 text-base font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Home className="h-5 w-5" />
              Go back home
            </Button>
          </Link>
        </div>
        <div className="mt-10 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            Error: {error.message || "Unknown error occurred"}
          </p>
          {/* {process.env.NODE_ENV === 'development' && error.stack && (
            <details className="mt-4 text-left">
              <summary className="text-sm font-medium text-gray-700 cursor-pointer">
                Stack trace
              </summary>
              <pre className="mt-2 p-4 bg-gray-50 rounded-md overflow-auto text-xs text-gray-600">
                {error.stack}
              </pre>
            </details>
          )} */}
        </div>
      </div>
    </div>
  );
}
