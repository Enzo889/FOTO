"use client";

import useSWR from "swr";
import axios from "axios";
import Image from "next/image";

const BASE_URL = "https://api.unsplash.com/";
const SEARCH = "search/photos";
const RANDOM = "photos/random";
const FEED = "photos";
const API_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

interface Image {
  id: string;
  urls: {
    regular: string;
    full: string;
    small: string;
    small_s3: string;
  };
  description: string;
  width: number;
  height: number;
  color: string;
  alt_description: string;
}

const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
    })
    .then((res) => res.data);

export const UnsplashImages = () => {
  const { data, error } = useSWR<Image[]>(`${BASE_URL}${FEED}`, fetcher);

  if (error) return <div>Failed to load images</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 md:gap-8 gap-4 my-10">
      {data?.map((image) => (
        <div
          key={image.id}
          className="overflow-hidden  rounded-lg aspect-ratio-[4/3] shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <Image
            key={image.id}
            src={image.urls.regular}
            alt={image.alt_description || "Unsplash Image"}
            loading="lazy"
            width={image.width}
            height={image.height}
            className="w-full h-full object-cover rounded-lg transform hover:scale-110 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
};
