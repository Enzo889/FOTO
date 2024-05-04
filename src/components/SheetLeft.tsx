import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HandMetalIcon, LucideGithub, Menu } from "lucide-react";
import { Category } from "./Category";
import Link from "next/link";

function SheetLeft() {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"} className="bg-white dark:bg-black">
          <SheetHeader>
            <SheetTitle className="text-left flex gap-4 items-center">
              {" "}
              <HandMetalIcon /> Foto
            </SheetTitle>
            <SheetDescription>
              <Category />
              <Link
                href="https://github.com/"
                className="hover:opacity-70"
                target="_blank"
              >
                <LucideGithub />
              </Link>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SheetLeft;
