import useSWR from "swr";
import axios from "axios";
import Image from "next/image";

const BASE_URL = "https://api.unsplash.com/";
const SEARCH = "search/photos";
const RANDOM = "photos/random";
const FEED = "photos?page=1&per_page=22";
const API_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
const CAROUSEL1 = "photos?page=6&per_page=7";

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
  return { data, error };
};

export const UnsplashImagesCarousel1 = () => {
  const { data, error } = useSWR<Image[]>(`${BASE_URL}${CAROUSEL1}`, fetcher);
  return { data, error };
};

export const UnsplashImagesSearch = (query: string) => {
  const { data, error } = useSWR<Image[]>(
    `${BASE_URL}${SEARCH}?query=${query}`,
    fetcher
  );
  return { data, error };
};
