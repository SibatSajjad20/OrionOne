import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Orion One | Where the Lake Meets Living",
    short_name: "Orion One",
    description:
      "Orion One is a landmark lakefront destination in DHA Phase III, Islamabad — luxury residences, commercial terraces, and lakeside lifestyle by SP Builders.",
    start_url: "/",
    display: "standalone",
    background_color: "#153D3D",
    theme_color: "#153D3D",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48 32x32 16x16",
        type: "image/x-icon",
      },
      {
        src: "/icon-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/icon-96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
