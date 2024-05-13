import useSWR from "swr";
import axios from "axios";
import { Image, ImagesSearch } from "@/interfaces";

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

export const UnsplashImagesRandom = () => {
  const { data, error } = useSWR<Image[]>(`${BASE_URL}${CAROUSEL}`, fetcher);
  return { data, error };
};

export const UnsplashImagesSearch = (query: string) => {
  const { data, error } = useSWR<ImagesSearch>(
    `${BASE_URL}${SEARCH}/?page=1&per_page=22&query=${query}`,
    fetcher
  );
  return { data, error };
};
