/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: "build",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],

        unoptimized: true,
    },
};

export default nextConfig;
