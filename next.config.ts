import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only, so the site is exported to out/.
  // Note: this silently drops src/app/api/* from the build — the FASTag
  // enquiry form posts to NEXT_PUBLIC_ENQUIRY_API_URL instead.
  output: 'export',
  // Emits every route as a directory with index.html, which any static host
  // resolves unambiguously.
  trailingSlash: true,
  images: {
    // next/image's optimizer needs a server; export requires this off.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
