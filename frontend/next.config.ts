import type { NextConfig } from "next";
import path from "path";

const frontendDir = path.resolve(__dirname);

const nextConfig: NextConfig = {
  turbopack: {},
  webpack: (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.modules = [
      path.join(frontendDir, "node_modules"),
      ...(Array.isArray(config.resolve.modules) ? config.resolve.modules : ["node_modules"]),
    ];
    return config;
  },
};

export default nextConfig;