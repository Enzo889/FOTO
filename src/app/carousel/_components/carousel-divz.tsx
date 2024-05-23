"use client";
import { UnsplashImagesRandom } from "@/utils/data";
import Image from "next/image";
import { Divz } from "divz";
import { Spinner } from "../../../components/Spinner";

export default function CarouselDivz() {
  const { data, error } = UnsplashImagesRandom();

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <div className="flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );

  return (
    <div>
      <Divz
        autoPlay={true}
        autoPlayDuration={5000}
        isDarkMode={true}
        className="w-full h-full z-10"
      >
        {data.map((image) => (
          <div key={image.id}>
            <Image
              src={image.urls.regular}
              alt={image.alt_description || "Unsplash Image"}
              loading="lazy"
              width={image.width}
              height={image.height}
            />
          </div>
        ))}
      </Divz>
    </div>
  );
}
