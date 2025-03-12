import { memo } from "react";

export const Loader = memo(() => (
  <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
    <div className="flex items-center space-x-2">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
      <span>Loading...</span>
    </div>
  </div>
))