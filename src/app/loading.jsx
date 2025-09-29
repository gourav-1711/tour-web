import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-red-500 border-r-transparent">
          <Loader2Icon className="w-6 h-6 text-red-500 animate-spin" />
        </div>
        <p className="mt-4 text-lg font-medium text-gray-700">
          Loading your experience...
        </p>
      </div>
    </div>
  );
}
