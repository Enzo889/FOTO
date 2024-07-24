import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import axios from "axios";
import { Image } from "@/interfaces/feed";
import { ImagesSearch } from "@/interfaces/search";
import { useState } from "react";

const BASE_URL = "https://api.unsplash.com/";
const SEARCH = "search/photos";
const FEED = "photos?page=1&per_page=22";
const API_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
const CAROUSEL = "photos?page=6&per_page=18";

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
  return { data, error };
};

export const InfiniteUnsplashImages = () => {
  const { data, error, isLoading, setSize, size } = useSWRInfinite<Image[]>(
    (index) => `https://api.unsplash.com/photos?page=${index + 1}&per_page=22`,
    fetcher
  );
  return { data, error, isLoading, setSize, size };
};

export const UnsplashImagesRandom = () => {
  const { data, error } = useSWR<Image[]>(`${BASE_URL}${CAROUSEL}`, fetcher);
  return { data, error };
};

export const UnsplashImagesSearch = (query: string) => {
  const { data, error, isLoading } = useSWR<ImagesSearch>(
    `${BASE_URL}${SEARCH}/?page=1&per_page=22&query=${query}`,
    fetcher
  );
  return { data, error, isLoading };
};

export const InfinteUnsplashImagesSearch = (query: string) => {
  const { data, error, isLoading, size, setSize } =
    useSWRInfinite<ImagesSearch>(
      (index) =>
        `${BASE_URL}${SEARCH}/?page=${index + 1}&per_page=22&query=${query}`,
      fetcher
    );

  return { data, error, isLoading, size, setSize };
};
