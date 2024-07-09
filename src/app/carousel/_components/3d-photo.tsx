"use client";
import { Spinner } from "@/components/Spinner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { UnsplashImagesRandom } from "@/utils/data";
import {
  PanInfo,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ArrowDownToLine, MoveUpRight, ThumbsUp, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ThreeDPhotoCarousel() {
  const { data, error } = UnsplashImagesRandom();

  const isScreenSizeSm = useMediaQuery("(max-width: 640px)");

  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = data?.length as number;
  const faceWidth = cylinderWidth / faceCount;
  const dragFactor = 0.05;
  const radius = cylinderWidth / (2 * Math.PI);

  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const handleDrag = (_: any, info: PanInfo) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: { type: "spring", stiffness: 100, damping: 30, mass: 0.1 },
    });
  };

  const transform = useTransform(rotation, (value) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <div className="flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );

  return (
    <>
      <div className="relative h-[500px] w-full overflow-hidden">
        <div
          className="flex h-full items-center justify-center bg-mauve-dark-2"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
            transform: "rotateX(0deg)",
          }}
        >
          <motion.div
            drag="x"
            className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
            style={{
              transform: transform,
              rotateY: rotation,
              width: cylinderWidth,
              transformStyle: "preserve-3d",
            }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={controls}
          >
            {data?.map((image, i) => {
              return (
                <div
                  key={image.id}
                  className="absolute flex h-full origin-center items-center justify-center bg-mauve-dark-2 "
                  style={{
                    width: `${faceWidth}px`,
                    transform: `rotateY(${
                      i * (360 / faceCount)
                    }deg) translateZ(${radius}px)`,
                  }}
                >
                  <Drawer>
                    <DrawerTrigger>
                      <Image
                        key={image.id}
                        src={image.urls.regular}
                        alt={image.alt_description || "Unsplash Image"}
                        loading="lazy"
                        width={image.width}
                        height={image.height}
                        className="pointer-events-none h-12 w-full rounded-xl object-cover md:h-20"
                      />
                      <p className="text-black opacity-80 hover:opacity-100 transition-opacity duration-100 dark:text-white flex justify-center items-center gap-3">
                        {image.user.total_likes}{" "}
                        <ThumbsUp className="w-3 h-3" />
                      </p>
                    </DrawerTrigger>
                    <DrawerContent className="flex items-center justify-center">
                      <DrawerHeader>
                        <DrawerTitle>
                          <Link
                            className="flex items-center gap-2  decoration-1 underline-offset-4 hover:underline "
                            href={image.user.links.html}
                            target="_blank"
                            about="Unsplash profile"
                          >
                            {image.user.name || "No name"}{" "}
                            <Image
                              src={image.user.profile_image.small}
                              alt={image.user.name}
                              loading="lazy"
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                          </Link>
                        </DrawerTitle>
                        <DrawerDescription className="space-y-5">
                          <p>
                            About <br />
                            <span className="text-black dark:text-white">
                              {image.user.bio || "No bio"}
                            </span>
                          </p>
                          <p>
                            Location <br />
                            <span className="text-black dark:text-white">
                              {image.user.location || "No location"}
                            </span>
                          </p>
                          <p>
                            Photo Description <br />{" "}
                            <span className="text-black dark:text-white">
                              {image.alt_description || "No description"}
                            </span>
                          </p>
                          <div className="flex  justify-between items-center">
                            <Link
                              className="hover:underline flex items-center gap-1"
                              href={image.links.html}
                              target="_blank"
                              title="to unsplash"
                            >
                              <MoveUpRight className="w-4 h-4" /> view in
                              unsplash
                            </Link>
                            <a
                              className="hover:underline flex items-center gap-1"
                              target="_blank"
                              title="download"
                              href={image.links.download}
                              download
                            >
                              <ArrowDownToLine className="w-4 h-4" />
                              view in fullscreen
                            </a>
                          </div>
                        </DrawerDescription>
                      </DrawerHeader>
                      <DrawerFooter>
                        <DrawerClose title="Close">
                          <X className="w-5 h-5 opacity-35 hover:opacity-100 transition-opacity duration-300" />
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
}
