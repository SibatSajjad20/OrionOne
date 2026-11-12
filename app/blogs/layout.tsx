import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs & Insights | Orion One — DHA Phase III, Islamabad",
  description:
    "Read the latest updates, architectural perspectives, and lakefront living stories from Orion One and SP Builders.",
  keywords: [
    "Orion One Blogs",
    "SP Builders News",
    "Islamabad Real Estate Insights",
    "Lakefront Living Journal",
  ],
  alternates: {
    canonical: "/blogs",
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
