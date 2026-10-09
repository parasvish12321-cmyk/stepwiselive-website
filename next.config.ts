import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: { unoptimized: true },
  allowedDevOrigins: ["172.26.225.164", "localhost", "127.0.0.1"],
};

export default nextConfig;
