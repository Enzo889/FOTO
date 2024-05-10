"use client";
import { UnsplashImagesCarousel1 } from "@/utils/data";
import Image from "next/image";

export default function Carosuel1() {
  const { data, error } = UnsplashImagesCarousel1();
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="overflow-hidden  rounded-lg aspect-ratio-[4/3] shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {data?.map((image) => (
          <Image
            key={image.id}
            src={image.urls.regular}
            alt={image.alt_description || "Unsplash Image"}
            loading="lazy"
            blurDataURL={image.urls.regular}
            title={image.alt_description || "Unsplash Image"}
            width={image.width}
            height={image.height}
          />
        ))}
      </div>
    </div>
  );
}
