import { HandMetalIcon, LucideGithub, Menu } from "lucide-react";
import { Category } from "./Category";
import { ModeToggle } from "./ModeToggle";
import SearchInput from "./SearchInput";
import Link from "next/link";
import SheetLeft from "./SheetLeft";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b dark:border-neutral-900 border-neutral-300 backdrop-blur-sm fixed w-full ">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-4">
          <HandMetalIcon />
          <h1 className="text-2xl font-bold">Foto</h1>
        </Link>
        <Category />
      </div>
      <div className="flex items-center gap-2">
        <SearchInput />
        <Link
          href="https://github.com/"
          className=" p-3 dark:hover:bg-neutral-800/50 hover:bg-neutral-200  rounded-xl"
          target="_blank"
        >
          <LucideGithub className="hidden md:block" />
        </Link>
        <SheetLeft />
        <ModeToggle />
      </div>
    </nav>
  );
}
