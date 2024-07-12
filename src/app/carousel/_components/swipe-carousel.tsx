"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { UnsplashImagesRandom } from "@/utils/data";
import { Spinner } from "@/components/Spinner";

const imgs = [
  "https://i.pinimg.com/564x/8c/e3/5f/8ce35f08a33293522c4d60cbc5e642be.jpg",
  "https://i.pinimg.com/564x/8c/e3/5f/8ce35f08a33293522c4d60cbc5e642be.jpg",
  "https://i.pinimg.com/564x/8c/e3/5f/8ce35f08a33293522c4d60cbc5e642be.jpg",
  "https://i.pinimg.com/564x/8c/e3/5f/8ce35f08a33293522c4d60cbc5e642be.jpg",
  "https://i.pinimg.com/564x/8c/e3/5f/8ce35f08a33293522c4d60cbc5e642be.jpg",
  "https://i.pinimg.com/564x/8c/e3/5f/8ce35f08a33293522c4d60cbc5e642be.jpg",
  "https://i.pinimg.com/564x/8c/e3/5f/8ce35f08a33293522c4d60cbc5e642be.jpg",
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export const SwipeCarousel = () => {
  const [imgIndex, setImgIndex] = useState(0);

  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === imgs.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-neutral-950/70 py-8">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        <Images imgIndex={imgIndex} />
      </motion.div>

      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
      <GradientEdges />
    </div>
  );
};

const Images = ({ imgIndex }: { imgIndex: number }) => {
  const { data, error } = UnsplashImagesRandom();

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <div className="aspect-video w-full h-full flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );

  return (
    <>
      {data?.map((imgSrc, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${imgSrc.urls.regular})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            animate={{
              scale: imgIndex === idx ? 0.95 : 0.85,
            }}
            transition={SPRING_OPTIONS}
            className="aspect-video w-full h-[80vh] shrink-0 rounded-xl bg-neutral-800 object-cover"
          />
        );
      })}
    </>
  );
};

const Dots = ({
  imgIndex,
  setImgIndex,
}: {
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {imgs.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex
                ? "bg-green-700 dark:bg-neutral-200"
                : "bg-green-400 dark:bg-neutral-500"
            }`}
          />
        );
      })}
    </div>
  );
};

const GradientEdges = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
    </>
  );
};
