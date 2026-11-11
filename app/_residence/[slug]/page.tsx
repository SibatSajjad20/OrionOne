import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RESIDENCE_SUITES, getSuiteBySlug } from "@/app/residence/data";
import ApartmentDetailView from "@/components/residence/ApartmentDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return RESIDENCE_SUITES.map((suite) => ({
    slug: suite.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const suite = getSuiteBySlug(slug);

  if (!suite) {
    return {
      title: "Apartment Not Found | Orion One",
    };
  }

  return {
    title: `${suite.title} (${suite.unitCode}) | Orion One — DHA Phase III, Islamabad`,
    description: `${suite.heroSub} ${suite.tagline} Featuring ${suite.specs.interiorArea} interior living, ${suite.specs.terrace} terrace, and ${suite.specs.orientation}.`,
    openGraph: {
      title: `${suite.title} | Orion One Residences`,
      description: suite.tagline,
      images: [
        {
          url: suite.floorPlanSrc,
          width: 2000,
          height: 2000,
          alt: `${suite.title} Architectural Plan`,
        },
      ],
    },
  };
}

export default async function ApartmentPage({ params }: PageProps) {
  const { slug } = await params;
  const suite = getSuiteBySlug(slug);

  if (!suite) {
    notFound();
  }

  return <ApartmentDetailView suite={suite} />;
}
