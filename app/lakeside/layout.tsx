import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lakeside Experience | Orion One — Where the Lake Meets Living",
  description:
    "Explore the lakeside experience at Orion One, DHA Phase III Islamabad. A waterfront destination shaped around movement, dining, relaxation, and connection.",
  keywords: [
    "Orion One Lakeside Experience",
    "Waterfront Living Islamabad",
    "Lakeside Promenade DHA Phase III",
    "Waterfront Dining Islamabad",
    "Lakeview Living Sector F",
    "Where the Lake Meets Living",
  ],
};

export default function LakesideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
