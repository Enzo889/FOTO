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

  if (error)
    return (
      <div className="flex flex-col items-center">
        <p>Failed to load</p>
        <button
          onClick={() => window.location.reload()}
          className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200"
        >
          <div className="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <span>Reload</span>
        </button>
      </div>
    );
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
