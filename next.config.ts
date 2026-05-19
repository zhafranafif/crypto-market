import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://flagcdn.com/w40/**"), new URL("https://assets.coingecko.com/coins/images/**")],
  }
};

export default nextConfig;
