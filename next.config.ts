import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG:true,
    domains: ["dl.dropboxusercontent.com","plus.unsplash.com"], // Add Dropbox domain here
  },
};

export default nextConfig;
