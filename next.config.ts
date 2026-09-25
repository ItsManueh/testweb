import type { NextConfig } from "next";

// En GitHub Pages el sitio vive en /<repo>; en local se sirve desde la raíz.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
