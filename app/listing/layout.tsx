import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Listings | Orion One — DHA Phase III, Islamabad",
  description:
    "Explore available properties, spaces, and suites at Orion One, Sector F, DHA Phase III, Islamabad.",
  keywords: [
    "Orion One Listings",
    "DHA Phase III Properties",
    "Islamabad Real Estate",
    "SP Builders Listings",
  ],
};

export default function ListingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
