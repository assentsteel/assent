import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG:true,
    unoptimized:true,
    domains: ["dl.dropboxusercontent.com","plus.unsplash.com"] // Add Dropbox domain here
  },
  compiler:{
    removeConsole : process.env.NODE_ENV === 'production'
  },
  webpack(config, { nextRuntime }) {
    if (nextRuntime === "nodejs") {
      config.resolve.alias.canvas = false;
    }

    return config;
  },
};

export default nextConfig;
