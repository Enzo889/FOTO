"use client";
import { Spinner } from "@/components/Spinner";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { UnsplashImagesRandom } from "@/utils/data";
import {
  PanInfo,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";

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
          <p className=" text-xl absolute ">Have so much fun</p>
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
            {data?.map((images, i) => {
              return (
                <div
                  key={images.id}
                  className="absolute flex h-full origin-center items-center justify-center bg-mauve-dark-2 p-2"
                  style={{
                    width: `${faceWidth}px`,
                    transform: `rotateY(${
                      i * (360 / faceCount)
                    }deg) translateZ(${radius}px)`,
                  }}
                >
                  <Image
                    src={images.urls.regular}
                    alt="img"
                    width={images.width}
                    height={images.height}
                    loading="lazy"
                    className="pointer-events-none h-12 w-full rounded-xl object-cover md:h-20"
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
}
