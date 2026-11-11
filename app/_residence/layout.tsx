import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Residences | Orion One — Lakefront Living in DHA Phase III, Islamabad",
  description:
    "Explore lakefront residences at Orion One, DHA Phase III, Islamabad. Featuring one, two, three-bedroom apartments and private pool residences shaped around comfort, natural light, and waterfront stillness.",
  keywords: [
    "Orion One Residences",
    "Lakefront Residences Islamabad",
    "DHA Phase III Apartments",
    "Private Pool Residences Islamabad",
    "Luxury Apartments Islamabad",
    "SP Builders Residences",
    "Waterfront Living Islamabad",
  ],
  openGraph: {
    title: "Residences | Orion One — Lakefront Living",
    description:
      "Lakefront homes shaped around comfort, natural light, considered spaces, and exceptional views in Sector F, DHA Phase III, Islamabad.",
    images: [
      {
        url: "/images/residence/pic-5.webp",
        width: 1920,
        height: 2112,
        alt: "Orion One Lakefront Residences",
      },
    ],
  },
};

export default function ResidenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
