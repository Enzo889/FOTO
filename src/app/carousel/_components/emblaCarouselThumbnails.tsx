"use client";
import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./emblaCarouselThumb";
import "../_components/embla.css";
import { UnsplashImagesRandom } from "@/utils/data";
import { Spinner } from "@/components/Spinner";
import Image from "next/image";
import { ArrowDownToLine, Ellipsis, MoveUpRight, X } from "lucide-react";
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
import Link from "next/link";

type PropType = {
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  const { data, error } = UnsplashImagesRandom();

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <div className="flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {data?.map((image, index) => (
            <div className="embla__slide relative group" key={image.id}>
              <Image
                key={image.id}
                src={image.urls.regular}
                alt={image.alt_description}
                width={image.width}
                height={image.height}
                loading="lazy"
                className="embla__slide__img"
              />

              <Drawer>
                <DrawerTrigger>
                  <Ellipsis
                    key={`${image.id}-ellipsis`}
                    className=" absolute -top-2 right-2 w-14 h-14 p-4 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-black rounded-b-full text-blue-900 max-md:opacity-100 "
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
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {data?.map((image, index) => (
              <Thumb
                key={image.id}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                image={image.urls.thumb}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
