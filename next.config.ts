import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => [
    {
      source: "/",
      destination: "/clients",
      permanent: true,
    },
  ],
};

export default nextConfig;
