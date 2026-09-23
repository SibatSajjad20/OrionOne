import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | SP Builders — Luxury Real Estate & Landmark Developments",
  description:
    "Get in touch with SP Builders. Discover Orion One in DHA Phase III, Islamabad. Reach our executive concierge desk at District 101, Bahria Town Phase 8, Rawalpindi.",
  keywords: [
    "SP Builders Contact",
    "Orion One Contact",
    "DHA Phase III Islamabad Real Estate",
    "SP Builders Bahria Town Phase 8",
    "Prestige Lakefront Living",
    "District 101 Rawalpindi",
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
