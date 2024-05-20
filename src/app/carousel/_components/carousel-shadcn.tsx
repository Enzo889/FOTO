"use client";
import { UnsplashImagesRandom } from "@/utils/data";
import Image from "next/image";
import { Spinner } from "../../../components/Spinner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ArrowDownToLine, MoveUpRight, X } from "lucide-react";

import { Card, CardContent } from "../../../components/ui/card";
import Link from "next/link";

export default function Carousel1() {
  const { data, error } = UnsplashImagesRandom();

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <div className="flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );

  const filteredData = data.filter((image) => image.height > 5000);
  console.table(filteredData);

  return (
    <Carousel
      className="w-full max-w-xs max-md:max-w-72 mx-auto"
      opts={{ loop: true }}
    >
      <CarouselContent>
        {filteredData.map((image) => (
          <CarouselItem key={image.id}>
            <div className="p-1 h-[25rem] cursor-grab aspect-auto ">
              <Drawer>
                <DrawerTrigger>
                  <Image
                    key={image.id}
                    src={image.urls.regular}
                    alt={image.alt_description || "Unsplash Image"}
                    loading="lazy"
                    blurDataURL={image.urls.regular}
                    title={image.alt_description || "Unsplash Image"}
                    width={image.width}
                    height={image.height}
                    className="w-full h-full object-cover "
                  />
                </DrawerTrigger>
                <DrawerContent className="flex items-center justify-center">
                  <DrawerHeader>
                    <DrawerTitle>
                      <Link
                        className="flex items-center gap-2  decoration-1 underline-offset-4 hover:underline "
                        href={image.user.links.html}
                        target="_blank"
                        about="Unsplash profile"
                      >
                        {image.user.name || "No name"}{" "}
                        <Image
                          src={image.user.profile_image.small}
                          alt={image.user.name}
                          loading="lazy"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      </Link>
                    </DrawerTitle>
                    <DrawerDescription className="space-y-5">
                      <p>
                        About <br />
                        <span className="text-black dark:text-white">
                          {image.user.bio || "No bio"}
                        </span>
                      </p>
                      <p>
                        Location <br />
                        <span className="text-black dark:text-white">
                          {image.user.location || "No location"}
                        </span>
                      </p>
                      <p>
                        Photo Description <br />{" "}
                        <span className="text-black dark:text-white">
                          {image.alt_description || "No description"}
                        </span>
                      </p>
                      <div className="flex  justify-between items-center">
                        <Link
                          className="hover:underline flex items-center gap-1"
                          href={image.links.html}
                          target="_blank"
                          title="to unsplash"
                        >
                          <MoveUpRight className="w-4 h-4" /> view in unsplash
                        </Link>
                        <a
                          className="hover:underline flex items-center gap-1"
                          target="_blank"
                          title="download"
                          href={image.links.download}
                          download
                        >
                          <ArrowDownToLine className="w-4 h-4" />
                          view in fullscreen
                        </a>
                      </div>
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <DrawerClose title="Close">
                      <X className="w-5 h-5 opacity-35 hover:opacity-100 transition-opacity duration-300" />
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
