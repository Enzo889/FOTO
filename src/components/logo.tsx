"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
const Logo = ({ size = 32 }) => {
  const { resolvedTheme } = useTheme();
  const logoTheme = resolvedTheme === "light" ? "black" : "white";
  const logoPath = `/logo/logo-${logoTheme}-${size}x${size}.png`;

  return (
    <div className="flex items-center space-x-2">
      <Image src={logoPath} alt="Logo" width={size} height={size} />
      <h1 className={montserrat.className}>FOTO</h1>
    </div>
  );
};

export default Logo;
