import Carosuel1 from "@/app/carousel/_components/carousel-shadcn";
import { Metadata } from "next";
import SwipeableStackCards from "../_components/swipeable";

export const metadata: Metadata = {
  title: "Swipeable | FOTO",
};
export default function Random() {
  return (
    <div className="pt-40">
      <SwipeableStackCards />
    </div>
  );
}
