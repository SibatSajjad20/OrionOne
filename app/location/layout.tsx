import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Location | Orion One — Sector F, DHA Phase III Islamabad",
  description:
    "Explore the prime lakefront address of Orion One in Sector F, DHA Phase III, Islamabad. Positioned beside Lakeview Commercial with seamless connectivity to GT Road, Ring Road, Islamabad Expressway, and the International Airport.",
  keywords: [
    "Orion One Location",
    "Sector F DHA Phase III",
    "Lakeview Commercial Islamabad",
    "DHA Phase 3 Islamabad Waterfront",
    "Islamabad Real Estate Location",
    "Dancing Fountains DHA 3",
    "SP Builders Location",
  ],
};

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
