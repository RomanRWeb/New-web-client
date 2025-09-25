import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Укажите базовый путь если сайт размещается в подпапке
  assetPrefix: process.env.NODE_ENV === "production" ? "./_next/static" : "",
  basePath: process.env.NODE_ENV === "production" ? "" : "",
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;
