import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Commercial Terraces & Lakeside Retail | Orion One — DHA Phase III Islamabad",
  description:
    "Explore prime commercial terraces, lakefront dining, and luxury retail arcade opportunities at Orion One in Sector F, DHA Phase III, Islamabad.",
  alternates: {
    canonical: "/commercial",
  },
  openGraph: {
    title: "Commercial Terraces & Lakeside Retail | Orion One",
    description:
      "Explore prime commercial terraces, lakefront dining, and luxury retail arcade opportunities at Orion One in Sector F, DHA Phase III, Islamabad.",
    url: "https://orionone.com.pk/commercial",
    images: ["/images/hero-lakefront.jpg"],
  },
};

export default function CommercialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
