import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orion One | A Landmark Lakefront Destination — DHA Phase III, Islamabad",
  description:
    "Explore Orion One: A landmark lakefront mixed-use development combining fluid contemporary architecture, lakeside residences, curated commercial terraces, restorative wellness, and community in Sector F, DHA Phase III, Islamabad.",
  keywords: [
    "Orion One",
    "Orion One Islamabad",
    "DHA Phase III Lakefront",
    "Luxury Lakefront Residences",
    "Commercial Terraces Islamabad",
    "SP Builders",
    "Lakeview Commercial",
  ],
};

export default function OrionOneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
