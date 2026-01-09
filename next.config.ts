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
    async redirects() {
    return [
      {
        source: "/team", // The old URL path
        destination: "/our-team", // The new URL path
        permanent: true, // Set to true for 301 (permanent) redirect
      },
      {
        source: "/global-presence-america/north-america",
        destination: "/global-presence/steel-engineering-service-in-north-america",
        permanent: true,
      },
      {
        source: "/global-presence-europe/europe",
        destination: "/global-presence/steel-engineering-service-in-europe",
        permanent: true,
      },
      {
        source: "/global-presence-africa/africa",
        destination: "/global-presence/steel-engineering-service-in-africa",
        permanent: true,
      },
      {
        source: "/accreditations",
        destination: "/awards-and-accreditations",
        permanent: true,
      },
      {
        source: "/engineering",
        destination: "/steel-engineering-services",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/steel-erection-services",
        permanent: true,
      },
      {
        source: "/fabrication",
        destination: "/steel-fabrication-services",
        permanent: true,
      },
      {
        source: "/blasting",
        destination: "/steel-blasting-painting-fire-proofing",
        permanent: true,
      },
      {
        source: "/projects-list/commercial-projects",
        destination: "/projects/commercial",
        permanent: true,
      },
      {
        source: "/projects-list/industrial-oil-gas-projects",
        destination: "/projects/industrial-oil-gas",
        permanent: true,
      },
      {
        source: "/projects-list/data-centre-projects",
        destination: "/projects/data-centres",
        permanent: true,
      },
      {
        source: "/news-details/engineering-marvels",
        destination: "/news/engineering-marvels",
        permanent: true,
      },
      {
        source: "/project/data-centres/project-pilot",
        destination: "/projects/data-centres/project-pilot",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
