import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Exhibitions | Orion One — DHA Phase III, Islamabad",
  description:
    "Discover upcoming private viewings, architectural exhibitions, and community events at Orion One.",
  keywords: [
    "Orion One Events",
    "Private Viewings Islamabad",
    "SP Builders Exhibitions",
    "Waterfront Community Events",
  ],
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
