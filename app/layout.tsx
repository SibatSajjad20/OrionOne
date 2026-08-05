import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orion One | Lakefront Living & Commercial Destination, DHA Phase III Islamabad",
  description:
    "Orion One is a landmark lakefront development in DHA Phase III, Islamabad — premium residences, commercial spaces, and lakeside lifestyle by SP Builders. Register your interest today.",
  keywords: [
    "Orion One",
    "DHA Phase III Islamabad",
    "SP Builders",
    "Lakefront Living Islamabad",
    "Commercial Terraces Islamabad",
    "Prestige Lakefront",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${playfair.variable} dark`}
    >
      <body className="min-h-screen bg-[#09191a] text-[#FAFAFA] antialiased selection:bg-[#C5A880] selection:text-[#09191a]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
