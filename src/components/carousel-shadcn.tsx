"use client";
import { UnsplashImagesCarousel1 } from "@/utils/data";
import Image from "next/image";
import { Spinner } from "./Spinner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";

export default function Carosuel1() {
  const { data, error } = UnsplashImagesCarousel1();
  if (error) return <div>failed to load </div>;
  if (!data)
    return (
      <div className="flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  return (
    <Carousel
      className=" w-full max-w-xs max-md:max-w-72 mx-auto"
      opts={{ loop: true }}
    >
      <CarouselContent>
        {data?.map((image) => (
          <CarouselItem key={image.id}>
            <div className="p-1 h-[25rem] cursor-grab">
              {" "}
              {image.height >= 4000 ? (
                <Image
                  src={image.urls.regular}
                  alt={image.alt_description || "Unsplash Image"}
                  loading="lazy"
                  width={1000}
                  height={400}
                  priority={false}
                />
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center h-[25rem] w-full">
                    <Spinner size={"lg"} />
                  </CardContent>
                </Card>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
