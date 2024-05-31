import { EmblaOptionsType } from "embla-carousel";
import { Metadata } from "next";
import EmblaCarousel from "../_components/emblaCarouselThumbnails";
import "../_components/embla.css";

export const metadata: Metadata = {
  title: "Thumbnails | FOTO",
};
export default function Random() {
  const OPTIONS: EmblaOptionsType = {};

  return (
    <div className="py-32">
      <EmblaCarousel options={OPTIONS} />
    </div>
  );
}
