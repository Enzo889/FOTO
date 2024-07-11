import { Metadata } from "next";
import { SwipeCarousel } from "../_components/swipe-carousel";

export const metadata: Metadata = {
  title: "Carousel | FOTO",
};
export default function Random() {
  return (
    <div className="pt-40">
      <SwipeCarousel />
    </div>
  );
}
