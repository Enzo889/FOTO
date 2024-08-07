"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Fingerprint,
  GalleryHorizontal,
  GalleryThumbnails,
  Home,
  LaptopIcon,
  MoonIcon,
  PanelBottomDashed,
  PersonStanding,
  Plane,
  Rabbit,
  Rotate3D,
  Shrink,
  Sprout,
  SunIcon,
  Utensils,
} from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export function CommandMenu({ ...props }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandSeparator />
          <CommandGroup heading="Category">
            <CommandItem onSelect={() => router.push("/architecture")}>
              <Home className="mr-2 h-4 w-4" />
              Architecture
            </CommandItem>
            <CommandItem onSelect={() => router.push("/people")}>
              <PersonStanding className="mr-2 h-4 w-4" />
              People
            </CommandItem>
            <CommandItem onSelect={() => router.push("/travel")}>
              <Plane className="mr-2 h-4 w-4" />
              Travel
            </CommandItem>
            <CommandItem onSelect={() => router.push("/animals")}>
              <Rabbit className="mr-2 h-4 w-4" />
              Animals
            </CommandItem>
            <CommandItem onSelect={() => router.push("/nature")}>
              <Sprout className="mr-2 h-4 w-4" />
              Nature
            </CommandItem>
            <CommandItem onSelect={() => router.push("/food")}>
              <Utensils className="mr-2 h-4 w-4" />
              Food
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />

          <CommandSeparator />
          <CommandGroup heading="Carousel Showcase">
            <CommandItem onSelect={() => router.push("/carousel/1")}>
              <GalleryHorizontal className="mr-2 h-4 w-4" />
              Shadcn-Version
            </CommandItem>
            <CommandItem onSelect={() => router.push("/carousel/2")}>
              <Shrink className="mr-2 h-4 w-4" />
              Divz-Version
            </CommandItem>
            <CommandItem onSelect={() => router.push("/carousel/3")}>
              <Rotate3D className="mr-2 h-4 w-4" />
              3D Carousel
            </CommandItem>
            <CommandItem onSelect={() => router.push("/carousel/4")}>
              <GalleryThumbnails className="mr-2 h-4 w-4" />
              Thumbnail
            </CommandItem>
            <CommandItem onSelect={() => router.push("/carousel/5")}>
              <Fingerprint className="mr-2 h-4 w-4" />
              Swipeable
            </CommandItem>
            <CommandItem onSelect={() => router.push("/carousel/6")}>
              <PanelBottomDashed className="mr-2 h-4 w-4" />
              Swipe Carousel
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunIcon className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <MoonIcon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <LaptopIcon className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
