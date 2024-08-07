import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FOTO",
  description: "a simple photo gallery powered by Unsplash API",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo/logo-white-256x256.png",
        href: "/logo/logo-white-256x256.png",
      },
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo/logo-black-256x256.png",
        href: "/logo/logo-black-256x256.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#99e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#00224D_100%)]"></div>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
