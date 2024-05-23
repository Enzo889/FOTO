import { Metadata } from "next";
import CarouselDivz from "../_components/carousel-divz";

export const metadata: Metadata = {
  title: "Carousel-divz | FOTO",
};
export default function Random() {
  return (
    <div>
      <CarouselDivz />
    </div>
  );
}
