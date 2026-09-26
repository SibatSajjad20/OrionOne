"use client";

import PageTransition from "@/components/PageTransition";

/** Remounts on client navigations — hosts enter transition only. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
