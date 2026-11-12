export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://orionone.com.pk/#website",
        url: "https://orionone.com.pk",
        name: "Orion One",
        description: "Where the Lake Meets Living — DHA Phase III Islamabad",
        publisher: {
          "@id": "https://orionone.com.pk/#organization",
        },
        inLanguage: "en-PK",
      },
      {
        "@type": ["Organization", "RealEstateAgent"],
        "@id": "https://orionone.com.pk/#organization",
        name: "Orion One",
        legalName: "SP Builders (Pvt) Ltd",
        url: "https://orionone.com.pk",
        logo: {
          "@type": "ImageObject",
          url: "https://orionone.com.pk/orion-logo-clean.png",
          caption: "Orion One Logo",
        },
        image: "https://orionone.com.pk/images/hero-lakefront.jpg",
        description:
          "Orion One is a landmark luxury lakefront destination in DHA Phase III, Islamabad — luxury residences, commercial terraces, and lakeside lifestyle developed by SP Builders.",
        telephone: "+92 300 9079 164",
        email: "info@orionone.com.pk",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Sector F, DHA Phase III",
          addressLocality: "Islamabad",
          addressRegion: "Islamabad Capital Territory",
          postalCode: "44000",
          addressCountry: "PK",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 33.5262,
          longitude: 73.1362,
        },
        sameAs: [
          "https://www.facebook.com/orionone.com.pk",
          "https://www.instagram.com/oriononeofficial/",
          "https://www.youtube.com/@Oriononecompk",
          "https://www.tiktok.com/@orionone.com.pk",
        ],
        priceRange: "$$$$",
      },
      {
        "@type": "ApartmentComplex",
        "@id": "https://orionone.com.pk/#apartmentcomplex",
        name: "Orion One Luxury Residences",
        url: "https://orionone.com.pk/residence",
        description:
          "Prestige lakefront residences in Sector F, DHA Phase III Islamabad featuring 1, 2, 3 Bedroom apartments and Private Pool Suites overlooking the serene lake.",
        containedInPlace: {
          "@type": "Place",
          name: "DHA Phase III, Islamabad",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Islamabad",
            addressCountry: "PK",
          },
        },
        amenityFeature: [
          {
            "@type": "LocationFeatureSpecification",
            name: "Lakeside Infinity Pool",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Panoramic Lake & Parkland Views",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Commercial Terraces & Lakeside Promenade",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Fitness Gym & Wellness Suite",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "24/7 Security & Concierge Service",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Dedicated Underground Parking",
            value: true,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
