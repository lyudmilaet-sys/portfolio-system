import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Storybook is built into public/storybook (see the "build" script). Next.js doesn't serve
  // folder index files, and Storybook's assets use relative paths, so /storybook (and /storybook/,
  // which Next.js trims to /storybook) goes to the index file itself.
  redirects() {
    return [{ source: "/storybook", destination: "/storybook/index.html", permanent: false }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
