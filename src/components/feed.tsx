"use client";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { InfiniteUnsplashImages, UnsplashImages } from "../utils/data";
import { Spinner } from "@/components/Spinner";
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
import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, MoveUpRight, X } from "lucide-react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import React, { useState } from "react";
import CategoryFeed from "./category-feed";
import { useInView } from "react-intersection-observer";
import Failed from "./failed";

export default function Feed() {
  const placeholders = [
    "Search for stunning landscapes...",
    "Find your next design inspiration...",
    "Discover beautiful nature photos...",
    "Explore creative art and illustrations...",
    "Look for breathtaking cityscapes...",
    "Find the perfect background image...",
    "Search for vibrant street photography...",
    "Discover unique fashion shots...",
    "Explore amazing wildlife photography...",
    "Find your next travel destination...",
  ];

  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");
  const { data, error, isLoading, setSize, size } = InfiniteUnsplashImages();

  const { ref, inView } = useInView();
  const [isFetching, setIsFetching] = React.useState(false);

  // Load more images when the sentinel is in view
  React.useEffect(() => {
    if (inView && !isLoading && !isFetching) {
      setIsFetching(true);
      setSize(size + 1).finally(() => setIsFetching(false));
    }
  }, [inView, isLoading, isFetching, setSize, size]);

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setQuery(searchText);
  };

  if (error) return <Failed />;
  if (!data)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size={"lg"} />
      </div>
    );

  return (
    <>
      <div className="mt-10 mb-6">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onSubmit={handleSearch}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {query ? (
        <CategoryFeed query={query} />
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="10px" className="py-5">
            {" "}
            {data
              ?.flatMap((page) => page)
              .map((image) => (
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
                        loading="eager"
                        blurDataURL={image.urls.regular}
                        title={image.alt_description || "Unsplash Image"}
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
                              <MoveUpRight className="w-4 h-4" /> view in
                              unsplash
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
          </Masonry>
          <div
            ref={ref}
            className="flex justify-center items-center my-5 gap-10"
          >
            {isLoading && <Spinner size={"lg"} />}
          </div>
        </ResponsiveMasonry>
      )}
    </>
  );
}
