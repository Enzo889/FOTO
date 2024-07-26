import { RefreshCcw } from "lucide-react";
import React from "react";

function Failed() {
  return (
    <div className=" h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <p className="text-red-600 font-medium">Failed to load</p>
        <button
          onClick={() => window.location.reload()}
          className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-300 dark:bg-neutral-950 px-6 font-medium text-neutral-900 dark:text-neutral-200"
        >
          <div className="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
            <RefreshCcw className="h-5 w-5 " />
          </div>
          <span>Reload</span>
        </button>
      </div>
    </div>
  );
}

export default Failed;
