import React from "react";

export const Spinner: React.FC = () => {
  return (
    <div className="h-[374px] w-full flex items-center justify-center">
      <div
        className="size-24 animate-spin inline-block size-6 border-3 border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
