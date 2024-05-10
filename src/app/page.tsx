import ButtonShootingStarBorder from "@/components/button-star";
import { Button } from "@/components/ui/button";
import Feed from "@/components/feed";
import { Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container  pt-40">
      <div className="flex flex-col items-center gap-4 w-auto">
        <Link href={"https://twitter.com/enzonicolas24"} target="_blank">
          <ButtonShootingStarBorder>
            Follow me ⚡ on Twitter
          </ButtonShootingStarBorder>
        </Link>
        <h1 className="scroll-m-20  lg:text-5xl text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
          Embracing the Art of Seeing
        </h1>
        <p className=" text-center text-lg font-light text-foreground">
          In Foto, we believe in the power of visual storytelling, <br /> and
          with the Unsplash API at our fingertips, we bring you a curated
          collection of photographs <br /> that capture the essence of life,
          beauty, and emotion.
        </p>
        <div className="space-x-8">
          <Link href={"https://github.com/Enzo889/FOTO"} target="_blank">
            <Button>
              {" "}
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </Button>
          </Link>
          <Link href={"https://unsplash.com"} target="_blank">
            <Button variant="outline">Visit Unsplash</Button>
          </Link>
        </div>
      </div>
      <div>
        <Feed />
        {/* <UnsplashImages />
        <Gallery /> */}
      </div>
    </div>
  );
}
