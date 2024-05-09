"use client";

import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
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
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const BASE_URL = "https://api.unsplash.com/";
const SEARCH = "search/photos";
const RANDOM = "photos/random";
const FEED = "photos?page=1&per_page=22";
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
  user: {
    name: string;
    bio: string;
    location: string;
    username: string;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    links: {
      html: string;
    };
  };
  links: {
    html: string;
    download: string;
  };
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
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry gutter="10px" className="py-5">
        {data?.map((image) => (
          <div
            key={image.id}
            className="overflow-hidden  rounded-lg aspect-ratio-[4/3] shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <Drawer>
              <DrawerTrigger>
                <Image
                  key={image.id}
                  src={image.urls.regular}
                  alt={image.alt_description || "Unsplash Image"}
                  loading="lazy"
                  width={image.width}
                  height={image.height}
                  className="w-full h-full object-cover rounded-lg transform hover:scale-110 transition-transform duration-300"
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
                      {image.user.name}{" "}
                      <Image
                        src={image.user.profile_image.small}
                        alt={image.user.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    </Link>
                  </DrawerTitle>
                  <DrawerDescription>
                    <p>about: {image.user.bio}</p>
                    <p>location: {image.user.location}</p>
                    <div className="flex flex-col">
                      <Link
                        className="hover:underline"
                        href={image.links.html}
                        target="_blank"
                      >
                        view in unsplash
                      </Link>
                      <Link
                        className="hover:underline"
                        target="_blank"
                        href={image.links.download}
                      >
                        download image
                      </Link>
                    </div>
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};
