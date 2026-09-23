import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | SP Builders & Orion One — DHA Phase III Islamabad",
  description:
    "Discover the vision and architectural heritage of SP Builders, creators of Orion One in DHA Phase III, Islamabad. A landmark lakefront destination built for today, designed for tomorrow.",
  keywords: [
    "SP Builders",
    "Orion One About",
    "DHA Phase III Islamabad Developers",
    "Prestige Lakefront Living",
    "Architectural Excellence Islamabad",
    "Lakeview Commercial Sector F",
  ],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
