import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Turbopack workspace root preservation
  turbopack: {
    root: path.resolve("."),
  },

  // Note: Hostinger Node.js Web Apps automatically injects output: 'standalone' during deploy.
  // We omit output: 'standalone' here so `next start` works smoothly out of the box locally.
  // Do NOT set output: 'export'.

  // Image optimization using Next.js default built-in optimizer (fully supported on Node.js / Hostinger).
  // All current assets are served locally from public/.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Redirects previously handled via Vercel / client routes
  async redirects() {
    return [
      {
        source: "/lakeside-experience",
        destination: "/lakeside",
        permanent: true,
      },
      {
        source: "/listings",
        destination: "/listing",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/event",
        destination: "/events",
        permanent: true,
      },
    ];
  },

  // Rewrites for media asset paths to preserve legacy root video URLs
  async rewrites() {
    return [
      {
        source: "/scene_3.mp4",
        destination: "/videos/scene_3.mp4",
      },
      {
        source: "/scene_5_balcony_backup.mp4",
        destination: "/videos/scene_5_balcony_backup.mp4",
      },
    ];
  },

  // Security and static asset caching headers for Node.js / Hostinger reverse proxy
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/(images|videos|fonts|_next/static)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
