"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Home,
  PersonStanding,
  Plane,
  Rabbit,
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

export function Category() {
  const components: {
    title: string;
    href: string;
    description: string;
    icon: React.ReactElement;
  }[] = [
    {
      title: "Architecture",
      href: "/architecture",
      description:
        "Explore the world's iconic buildings and delve into architectural history and styles.",
      icon: <Home />, // Asigna el ícono Home
    },
    {
      title: "People",
      href: "/people",
      description:
        "Connect with diverse cultures, discover inspiring stories, and celebrate human diversity.",
      icon: <PersonStanding />, // Asigna el ícono PersonStanding
    },
    {
      title: "Travel",
      href: "/travel",
      description:
        "Embark on virtual journeys, uncover hidden gems, and plan your dream vacation with our guides.",
      icon: <Plane />, // Asigna el ícono Plane
    },
    {
      title: "Animals",
      href: "/animals",
      description:
        "Admire the wonders of the animal kingdom, learn about endangered species, and explore animal behavior.",
      icon: <Rabbit />, // Asigna el ícono Rabbit
    },
    {
      title: "Nature",
      href: "/nature",
      description:
        "Immerse yourself in the beauty of nature, understand ecosystems, and discover the importance of conservation.",
      icon: <Sprout />, // Asigna el ícono Sprout
    },
    {
      title: "Food",
      href: "/food",
      description:
        "Indulge in a global culinary adventure, learn to cook authentic dishes, and discover food traditions.",
      icon: <Utensils />, // Asigna el ícono Utensils
    },
  ];

  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Category</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]  ">
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
