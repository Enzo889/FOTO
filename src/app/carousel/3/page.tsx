import { Metadata } from "next";
import ThreeDPhotoCarousel from "../_components/3d-photo";

export const metadata: Metadata = {
  title: "3D Carousel | FOTO",
};
export default function Random() {
  return (
    <div>
      <ThreeDPhotoCarousel />
    </div>
  );
}
