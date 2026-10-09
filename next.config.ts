import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["172.26.225.164", "localhost", "127.0.0.1"],
  transpilePackages: ["@swc/helpers"],
};

export default nextConfig;
