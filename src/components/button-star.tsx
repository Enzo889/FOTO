import React from "react";

interface ButtonShootingStarBorderProps {
  children: React.ReactNode;
}

const ButtonShootingStarBorder: React.FC<ButtonShootingStarBorderProps> = ({
  children,
}) => {
  return (
    <button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_10%)_inset] dark:shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
      <span>
        <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(yellow,_transparent_50%)] dark:[mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,yellow_360deg)] dark:before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
      </span>
      <span className="backdrop absolute inset-[1px] rounded-full  bg-neutral-100 dark:bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-800" />
      <span className="z-10 py-0.5 text-sm text-neutral-900 dark:text-neutral-100">
        {children}
      </span>
    </button>
  );
};

export default ButtonShootingStarBorder;

/* 
tailwind.config.ts

...
extend: {
  animation: {
    flip: "flip 6s infinite steps(2, end)",
    rotate: "rotate 3s linear infinite both",
  },
  keyframes: {
    flip: {
      to: {
        transform: "rotate(360deg)",
      },
    },
    rotate: {
      to: {
        transform: "rotate(90deg)",
      },
    },
  },
}
*/
