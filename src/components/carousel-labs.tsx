"use client";

import * as React from "react";

import {
  Fingerprint,
  FireExtinguisher,
  GalleryHorizontal,
  GalleryThumbnails,
  Home,
  PanelBottomDashed,
  PersonStanding,
  Plane,
  Rabbit,
  Rotate3D,
  Shrink,
  Sprout,
  Utensils,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";

export function CarouselLabs() {
  const components: {
    title: string;
    href: string;
    description: string;
    icon: React.ReactElement;
  }[] = [
    {
      title: "Shadcn-Version",
      href: "/carousel/1",
      description: "A carousel with motion and swipe built using Embla.",
      icon: <GalleryHorizontal />, // Asigna el ícono Home
    },
    {
      title: "Divz-Version",
      href: "/carousel/2",
      description: "Scroll, swipe & zoom through content on the 3D z-axis",
      icon: <Shrink />, // Asigna el ícono PersonStanding
    },
    {
      title: "3D Carousel",
      href: "/carousel/3",
      description:
        "A 3D cylindrical photo carousel component that rotates on the Y-axis.",
      icon: <Rotate3D />, // Asigna el ícono Plane
    },
    {
      title: "Thumbnail",
      href: "/carousel/4",
      description: "A thumnails with motion and swipe built using Embla.",
      icon: <GalleryThumbnails />, // Asigna el ícono Rabbit
    },
    {
      title: "Swipeable",
      href: "/carousel/5",
      description:
        "Swipeable stack cards created using framer-motion. The cards can be dragged and sent to the back of the stack.",
      icon: <Fingerprint />, // Asigna el ícono Sprout
    },
    {
      title: "Swipe Carousel",
      href: "/carousel/6",
      description: "A carousel made with framer-motion and swipe interaction.",
      icon: <PanelBottomDashed />, // Asigna el ícono Utensils
    },
  ];

  return (
    <NavigationMenu className="hidden md:block  ">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Carousel Showcase</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]   ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

type ListItemProps = React.ComponentPropsWithoutRef<"a"> & {
  title: string;
  children?: React.ReactNode;
  icon: React.ReactElement;
};

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ",
              className
            )}
            {...props}
          >
            <div className="flex items-center space-x-2">
              <div>{icon}</div>
              <div className="text-sm font-medium leading-none"> {title}</div>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
