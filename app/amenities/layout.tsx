import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amenities | Orion One — Where the Lake Meets Living",
  description:
    "Explore the considered collection of amenities at Orion One: lake-facing infinity pool, double-height fitness center, wellness spa, jogging tracks, dining terraces, and smart living in DHA Phase III, Islamabad.",
  keywords: [
    "Orion One Amenities",
    "Luxury Amenities Islamabad",
    "Lakefront Living DHA Phase III",
    "Infinity Pool Residences",
    "Fitness Center Orion One",
    "SP Builders",
  ],
};

export default function AmenitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
