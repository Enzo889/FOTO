import React from "react";
import { Input } from "./ui/input";

function SearchInput() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        inputMode="search"
        placeholder="Search images..."
        className="rounded-xl "
      />
    </div>
  );
}

export default SearchInput;
