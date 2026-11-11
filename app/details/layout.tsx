import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Details | Orion One — DHA Phase III, Islamabad",
  description:
    "Detailed specifications, architectural features, and floor layouts at Orion One, Sector F, DHA Phase III, Islamabad.",
  keywords: [
    "Orion One Property Details",
    "Floor Plans Islamabad",
    "DHA Phase III Specifications",
    "SP Builders Details",
  ],
};

export default function DetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
