import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-red-500">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Oops! Page not found
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/" className="inline-flex">
            <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 text-base font-medium rounded-lg transition-colors duration-200 flex items-center gap-2">
              <Home className="h-5 w-5" />
              Go to Homepage
            </Button>
          </Link>
          <Link href="/booking" className="inline-flex">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 text-base font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              Explore Booking
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
