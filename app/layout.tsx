import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import SmoothScroll from "@/components/SmoothScroll";
import OrionCursor from "@/components/OrionCursor";
import MagneticEffects from "@/components/MagneticEffects";
import AgentationToolbar from "@/components/AgentationToolbar";
import JsonLd from "@/components/seo/JsonLd";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#153D3D",
};

// Brand Guidelines: Luxia Regular — Subheadings & Editorial Serif
const luxia = localFont({
  src: [{ path: "./fonts/luxia-regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-luxia-src",
  display: "swap",
  adjustFontFallback: false,
});

// Brand Guidelines: Luxia Display — Large Headings & Hero Titles (>= 48px)
const luxiaDisplay = localFont({
  src: [{ path: "./fonts/luxia-display.woff2", weight: "500", style: "normal" }],
  variable: "--font-luxia-display-src",
  display: "swap",
  adjustFontFallback: false,
});

// Brand Guidelines: Montserrat — Body Copy, Navigation, Captions & UI
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://orionone.com.pk"),
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
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Orion One | Where the Lake Meets Living — DHA Phase III Islamabad",
    description:
      "Orion One is a landmark lakefront destination in DHA Phase III, Islamabad — luxury residences, commercial terraces, and lakeside lifestyle by SP Builders.",
    url: "https://orionone.com.pk",
    siteName: "Orion One",
    images: [
      {
        url: "/images/hero-lakefront.jpg",
        width: 1200,
        height: 630,
        alt: "Orion One — Lakefront Luxury Residences & Commercial Terraces",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orion One | Where the Lake Meets Living — DHA Phase III Islamabad",
    description:
      "Orion One is a landmark lakefront destination in DHA Phase III, Islamabad — luxury residences, commercial terraces, and lakeside lifestyle by SP Builders.",
    images: ["/images/hero-lakefront.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${luxia.variable} ${luxiaDisplay.variable} ${montserrat.variable} dark`}
      suppressHydrationWarning
    >
      <head suppressHydrationWarning>
        <JsonLd />
        <script
          id="scroll-restoration"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              "try{if('scrollRestoration' in history){history.scrollRestoration='manual';}window.scrollTo(0,0);if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.reducedMotion='true';}}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-screen bg-[#153D3D] text-[#EDE5DA] selection:bg-[#62AA9E] selection:text-[#153D3D]">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <OrionCursor />
        <MagneticEffects />
        {process.env.NODE_ENV === "development" && <AgentationToolbar />}
      </body>
    </html>
  );
}
