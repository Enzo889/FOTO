import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Fingerprint,
  GalleryHorizontal,
  GalleryThumbnails,
  Home,
  LucideGithub,
  Menu,
  PanelBottomDashed,
  PersonStanding,
  Plane,
  Rabbit,
  Rotate3D,
  Shrink,
  Sprout,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import Logo from "./logo";

function SheetLeft() {
  const Pages: {
    title: string;
    href: string;
    icon: React.ReactElement;
  }[] = [
    {
      title: "Architecture",
      href: "/architecture",
      icon: <Home />, // Asigna el ícono Home
    },
    {
      title: "People",
      href: "/people",
      icon: <PersonStanding />, // Asigna el ícono PersonStanding
    },
    {
      title: "Travel",
      href: "/travel",
      icon: <Plane />, // Asigna el ícono Plane
    },
    {
      title: "Animals",
      href: "/animals",
      icon: <Rabbit />, // Asigna el ícono Rabbit
    },
    {
      title: "Nature",
      href: "/nature",
      icon: <Sprout />, // Asigna el ícono Sprout
    },
    {
      title: "Food",
      href: "/food",
      icon: <Utensils />, // Asigna el ícono Utensils
    },
    {
      title: "Shadcn-Version",
      href: "/carousel/1",
      icon: <GalleryHorizontal />, // Asigna el ícono Home
    },
    {
      title: "Divz-Version",
      href: "/carousel/2",
      icon: <Shrink />, // Asigna el ícono PersonStanding
    },
    {
      title: "3D Carousel",
      href: "/carousel/3",
      icon: <Rotate3D />, // Asigna el ícono Plane
    },
    {
      title: "Thumbnail",
      href: "/carousel/4",
      icon: <GalleryThumbnails />, // Asigna el ícono Rabbit
    },
    {
      title: "Swipeable",
      href: "/carousel/5",
      icon: <Fingerprint />, // Asigna el ícono Sprout
    },
    {
      title: "Swipe Carousel",
      href: "/carousel/6",
      icon: <PanelBottomDashed />, // Asigna el ícono Utensils
    },
  ];
  return (
    <div>
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className=" flex gap-2 items-center justify-center ">
              {" "}
              <Logo size={32} />
            </SheetTitle>
            <SheetDescription className="flex flex-col gap-4 text-lg">
              {Pages.map((page) => {
                return (
                  <Link
                    href={page.href}
                    key={page.title}
                    className="hover:opacity-70 flex items-center gap-2"
                  >
                    {page.icon} {page.title}
                  </Link>
                );
              })}

              <hr />
              <Link
                href="https://github.com/Enzo889/FOTO"
                className="hover:opacity-70 flex items-center gap-2"
                target="_blank"
              >
                <LucideGithub /> Github
              </Link>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SheetLeft;
