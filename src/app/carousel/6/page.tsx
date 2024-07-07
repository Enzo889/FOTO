import Carosuel1 from "@/app/carousel/_components/carousel-shadcn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carousel | FOTO",
};
export default function Random() {
  return (
    <div className="pt-40">
      <Carosuel1 />
    </div>
  );
}
