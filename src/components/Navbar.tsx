import { LucideGithub } from "lucide-react";
import { Category } from "./Category";
import { ModeToggle } from "./ModeToggle";
import { CommandMenu } from "./command-menu";
import Link from "next/link";
import SheetLeft from "./SheetLeft";
import Logo from "./logo";

export function Navbar() {
  return (
    <nav className="flex z-50 items-center justify-between  gap-12 p-4 border-b dark:border-neutral-900 border-neutral-300 backdrop-blur-lg fixed w-full">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-4">
          <Logo size={32} />
        </Link>
        <Category />
      </div>
      <div className="flex items-center gap-2 max-sm:w-full">
        <CommandMenu />
        <Link
          href="https://github.com/Enzo889/FOTO"
          className=" p-3  dark:hover:bg-neutral-800/50 hover:bg-neutral-200  rounded-xl"
          target="_blank"
        >
          <LucideGithub className="hidden md:block h-[1.2rem] w-[1.2rem]" />
        </Link>
        <ModeToggle />
        <SheetLeft />
      </div>
    </nav>
  );
}
