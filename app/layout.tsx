import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#153D3D",
};

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orion One | Where the Lake Meets Living — DHA Phase III Islamabad",
  description:
    "Orion One is a landmark lakefront destination in DHA Phase III, Islamabad — luxury residences, commercial terraces, and lakeside lifestyle by SP Builders.",
  keywords: [
    "Orion One",
    "Where the Lake Meets Living",
    "DHA Phase III Islamabad",
    "SP Builders",
    "Prestige Lakefront Living",
    "Commercial Terraces Islamabad",
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
      className={`${cormorant.variable} ${montserrat.variable} ${playfair.variable} dark`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if('scrollRestoration' in history){history.scrollRestoration='manual';}window.scrollTo(0,0);}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-screen bg-[#153D3D] text-[#EDE5DA] antialiased selection:bg-[#62AA9E] selection:text-[#153D3D]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
