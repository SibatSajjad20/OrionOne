export interface ResidenceSuiteSpec {
  bedrooms: string;
  interiorArea: string;
  terrace: string;
  totalArea: string;
  bathrooms: string;
  parking: string;
  orientation: string;
}

export interface KeyFeature {
  number: string;
  title: string;
  description: string;
}

export interface InclusionCategory {
  category: string;
  items: string[];
}

export interface SpaceExperience {
  space: string;
  experience: string;
}

export interface ResidentBenefit {
  title: string;
  description: string;
}

export interface ResidenceSuiteData {
  slug: string;
  aliases: string[];
  unitCode: string;
  category: "1-bedroom" | "2-bedroom" | "3-bedroom" | "private-pool";
  title: string;
  shortTitle: string;
  headline: string;
  heroSub: string;
  tagline: string;
  levelMeta: string;
  completion: string;
  introHeading: string;
  intro: string;
  specs: ResidenceSuiteSpec;
  keyFeatures: KeyFeature[];
  inclusions: InclusionCategory[];
  spaces: SpaceExperience[];
  benefits: ResidentBenefit[];
  floorPlanSrc: string;
  gallery: string[];
  quoteBanner: {
    tag: string;
    quote: string;
    imageSrc: string;
  };
  lakeViewPerspective: {
    title: string;
    subtitle: string;
    text: string;
    imageSrc: string;
  };
}

export const RESIDENCE_SUITES: ResidenceSuiteData[] = [
  {
    slug: "1-bedroom",
    aliases: ["one-bedroom"],
    unitCode: "NO. 101",
    category: "1-bedroom",
    title: "One Bedroom Apartments",
    shortTitle: "1 Bedroom",
    headline: "1 BED / 85 M²",
    heroSub: "Efficiently planned. Elegantly finished.",
    tagline: "Thoughtful spaces designed for comfortable modern living at Orion One.",
    levelMeta: "LEVELS 02 – 08 · LAKE FACING",
    completion: "4Q 2026",
    introHeading: "A SMARTER WAY TO LIVE",
    intro:
      "Designed for professionals, investors, and young families, the one-bedroom residences combine efficient planning with elegant interiors, premium finishes, and lakefront views.",
    specs: {
      bedrooms: "1",
      interiorArea: "85 M²",
      terrace: "18 M²",
      totalArea: "103 M²",
      bathrooms: "1",
      parking: "1 Reserved Bay",
      orientation: "Direct Lakefront Facing",
    },
    keyFeatures: [
      {
        number: "01",
        title: "Efficient Layout",
        description: "Intelligent space planning for comfortable everyday living.",
      },
      {
        number: "02",
        title: "Natural Light",
        description: "Designed to make the most of available daylight.",
      },
      {
        number: "03",
        title: "Lake Views",
        description: "A residential setting connected to the waterfront.",
      },
      {
        number: "04",
        title: "Premium Finishes",
        description: "Refined materials and finishes throughout the residence.",
      },
      {
        number: "05",
        title: "Smart Living",
        description: "Smart-home automation integrated into the Orion One experience.",
      },
      {
        number: "06",
        title: "Secure Access",
        description: "Smart entry systems and dedicated building security.",
      },
    ],
    inclusions: [
      {
        category: "Living & Dining",
        items: [
          "Spacious living area",
          "Integrated dining area",
          "Planned circulation",
          "Abundant natural daylight",
        ],
      },
      {
        category: "Bedroom",
        items: [
          "Dedicated private bedroom",
          "Built-in storage provision",
          "Lakefront outlooks",
        ],
      },
      {
        category: "Kitchen",
        items: [
          "Functional kitchen layout",
          "Fitted architectural cabinetry",
          "Polished stone countertop",
          "Premium fixtures",
        ],
      },
      {
        category: "Bathroom",
        items: ["Finished bathroom", "Sanitary fixtures", "Designer fittings"],
      },
      {
        category: "Installations & Systems",
        items: [
          "Smart-home automation",
          "Smart entry access",
          "High-speed lifts",
          "24/7 CCTV surveillance",
          "Security systems",
        ],
      },
      {
        category: "Building Access",
        items: [
          "Private parking bay",
          "Dedicated residential entrance",
          "Concierge and welcome lounge",
        ],
      },
    ],
    spaces: [
      {
        space: "Living Room",
        experience: "Comfortable space for everyday living and relaxation",
      },
      {
        space: "Dining Area",
        experience: "Integrated area for meals and gatherings",
      },
      {
        space: "Bedroom",
        experience: "Private space designed for rest",
      },
      {
        space: "Kitchen",
        experience: "Functional space designed around everyday use",
      },
      {
        space: "Bathroom",
        experience: "Refined private facility",
      },
      {
        space: "Entry & Circulation",
        experience: "Efficient movement through the residence",
      },
    ],
    benefits: [
      {
        title: "For Professionals",
        description: "A contemporary residence within a complete mixed-use destination.",
      },
      {
        title: "For Investors",
        description: "A prime residential product within Orion One's broader lakefront development.",
      },
      {
        title: "For Young Families",
        description: "A practical home with access to the project's wider lifestyle facilities.",
      },
    ],
    floorPlanSrc: "/images/residence/1-bedroom.webp",
    gallery: [
      "/images/residence/pic-1.jpg",
      "/images/residence/pic-2.jpg",
      "/images/residence/pic-4.png",
    ],
    quoteBanner: {
      tag: "GATED COMMUNITY · LAKEFRONT RETREAT",
      quote:
        "INSTEAD OF CORRIDORS, WALKING PATHS CONNECT THE APARTMENTS — MAKING ORION ONE FEEL CLOSER TO A PRIVATE RETREAT.",
      imageSrc: "/images/residence/pic-3.webp",
    },
    lakeViewPerspective: {
      title: "PERFECT LAKE VIEWS",
      subtitle: "FROM ELEVATED TERRACES & BALCONIES",
      text: "A short conversation is enough to understand which apartment fits your lifestyle — whether it is a private sanctuary, a family lakefront home, or a finite investment.",
      imageSrc: "/images/residence/pic-4.png",
    },
  },
  {
    slug: "2-bedroom",
    aliases: ["two-bedroom"],
    unitCode: "NO. 204",
    category: "2-bedroom",
    title: "Two Bedroom Apartments",
    shortTitle: "2 Bedroom",
    headline: "2 BED / 135 M²",
    heroSub: "More space. More comfort.",
    tagline: "Thoughtfully planned residences designed around contemporary family living.",
    levelMeta: "LEVELS 03 – 12 · PANORAMIC VIEW",
    completion: "4Q 2026",
    introHeading: "SPACE DESIGNED AROUND LIFE",
    intro:
      "Two-bedroom residences offer a considered balance of space, functionality, and sophistication. Designed for growing families and homeowners who want more room to live, relax, and host, each residence combines generous living areas with refined finishes and practical planning.",
    specs: {
      bedrooms: "2",
      interiorArea: "135 M²",
      terrace: "28 M²",
      totalArea: "163 M²",
      bathrooms: "2",
      parking: "1 Reserved Bay",
      orientation: "Panoramic Lake & Parkland View",
    },
    keyFeatures: [
      {
        number: "01",
        title: "Generous Living Areas",
        description: "More room for family living, relaxation, and entertaining.",
      },
      {
        number: "02",
        title: "Two Private Bedrooms",
        description: "Separate spaces designed around privacy and comfort.",
      },
      {
        number: "03",
        title: "Refined Finishes",
        description: "A considered interior palette throughout the residence.",
      },
      {
        number: "04",
        title: "Intelligent Planning",
        description: "Spaces arranged for practical movement and everyday functionality.",
      },
      {
        number: "05",
        title: "Natural Light",
        description: "Designed to bring daylight into key living spaces.",
      },
      {
        number: "06",
        title: "Smart Living",
        description: "Smart-home automation and smart entry integrated into the development.",
      },
    ],
    inclusions: [
      {
        category: "Living & Dining",
        items: [
          "Generous living area",
          "Dedicated dining area",
          "Functional circulation",
          "Natural light throughout",
        ],
      },
      {
        category: "Bedrooms",
        items: [
          "2 private bedrooms",
          "Private bedroom spaces",
          "Built-in storage provision",
        ],
      },
      {
        category: "Kitchen",
        items: [
          "Functional kitchen layout",
          "Custom cabinetry",
          "Stone countertop",
          "Kitchen fixtures",
        ],
      },
      {
        category: "Bathrooms",
        items: [
          "Finished bathrooms",
          "Sanitary fixtures",
          "Designer fittings",
        ],
      },
      {
        category: "Installations & Systems",
        items: [
          "Smart-home automation",
          "Smart entry access",
          "High-speed lifts",
          "CCTV surveillance",
          "Building security",
        ],
      },
      {
        category: "Building Access",
        items: [
          "Private parking bay",
          "Dedicated residential entrance",
          "Concierge and welcome lounge",
        ],
      },
    ],
    spaces: [
      {
        space: "Living Room",
        experience: "Generous space for family life and relaxation",
      },
      {
        space: "Dining Area",
        experience: "Dedicated space for everyday meals and gatherings",
      },
      {
        space: "Master Bedroom",
        experience: "Private space designed around comfort",
      },
      {
        space: "Bedroom 02",
        experience: "Flexible space for family, guests, or personal use",
      },
      {
        space: "Kitchen",
        experience: "Functional layout designed for everyday living",
      },
      {
        space: "Bathroom",
        experience: "Refined private facilities",
      },
      {
        space: "Entry & Circulation",
        experience: "Practical movement throughout the residence",
      },
    ],
    benefits: [
      {
        title: "For Families",
        description: "Additional space for everyday family life, guests, and changing needs.",
      },
      {
        title: "For Homeowners",
        description: "A balance between generous living space and practical functionality.",
      },
      {
        title: "For Those Who Want More",
        description: "Two bedrooms provide greater flexibility without moving into the scale of a larger family residence.",
      },
    ],
    floorPlanSrc: "/images/residence/2-bedroom.webp",
    gallery: [
      "/images/residence/pic-1.jpg",
      "/images/residence/pic-2.jpg",
      "/images/residence/pic-5.webp",
    ],
    quoteBanner: {
      tag: "GATED COMMUNITY · LAKEFRONT RETREAT",
      quote:
        "INSTEAD OF CORRIDORS, WALKING PATHS CONNECT THE APARTMENTS — MAKING ORION ONE FEEL CLOSER TO A PRIVATE RETREAT.",
      imageSrc: "/images/residence/pic-3.webp",
    },
    lakeViewPerspective: {
      title: "PERFECT LAKE VIEWS",
      subtitle: "FROM ELEVATED TERRACES & BALCONIES",
      text: "A short conversation is enough to understand which apartment fits your lifestyle — whether it is a private sanctuary, a family lakefront home, or a finite investment.",
      imageSrc: "/images/residence/pic-4.png",
    },
  },
  {
    slug: "3-bedroom",
    aliases: ["three-bedroom"],
    unitCode: "NO. 308",
    category: "3-bedroom",
    title: "Three Bedroom Apartments",
    shortTitle: "3 Bedroom",
    headline: "3 BED / 195 M²",
    heroSub: "The pinnacle of family living.",
    tagline: "Spacious residences designed for families who value comfort, privacy, and a refined living environment.",
    levelMeta: "LEVELS 06 – 14 · WATERFRONT CORNER",
    completion: "4Q 2026",
    introHeading: "SPACE FOR WHAT MATTERS",
    intro:
      "The three-bedroom residences bring together generous interiors, elevated design, and spectacular lake views. Designed for family living, they provide the space and flexibility to accommodate everyday routines, private moments, and time together.",
    specs: {
      bedrooms: "3",
      interiorArea: "195 M²",
      terrace: "42 M²",
      totalArea: "237 M²",
      bathrooms: "3",
      parking: "2 Reserved Bays",
      orientation: "Spectacular Corner Lakefront View",
    },
    keyFeatures: [
      {
        number: "01",
        title: "Spacious Interiors",
        description: "Generous living spaces designed around family life.",
      },
      {
        number: "02",
        title: "Three Bedrooms",
        description: "Dedicated private spaces for family members and guests.",
      },
      {
        number: "03",
        title: "Elevated Design",
        description: "A refined interior environment with attention to detail.",
      },
      {
        number: "04",
        title: "Lake Views",
        description: "Spectacular waterfront views form part of the residential experience.",
      },
      {
        number: "05",
        title: "Intelligent Planning",
        description: "Spaces arranged to balance privacy, movement, and functionality.",
      },
      {
        number: "06",
        title: "Smart Living",
        description: "Smart-home automation and smart entry integrated into the development.",
      },
    ],
    inclusions: [
      {
        category: "Living & Dining",
        items: [
          "Spacious living area",
          "Dedicated dining area",
          "Practical circulation",
          "Natural light from multiple aspects",
        ],
      },
      {
        category: "Bedrooms",
        items: [
          "3 private bedrooms",
          "Private bedroom spaces",
          "Storage provision",
        ],
      },
      {
        category: "Kitchen",
        items: [
          "Functional kitchen layout",
          "Cabinetry",
          "Countertop",
          "Kitchen fixtures",
        ],
      },
      {
        category: "Bathrooms",
        items: [
          "Finished bathrooms",
          "Sanitary fixtures",
          "Fittings",
        ],
      },
      {
        category: "Installations & Systems",
        items: [
          "Smart-home automation",
          "Smart entry access",
          "High-speed lifts",
          "CCTV surveillance",
          "Building security",
        ],
      },
      {
        category: "Building Access",
        items: [
          "2 reserved parking bays",
          "Dedicated residential entrance",
          "Concierge and welcome lounge",
        ],
      },
    ],
    spaces: [
      {
        space: "Living Room",
        experience: "Spacious setting for family life and entertaining",
      },
      {
        space: "Dining Area",
        experience: "Dedicated space for meals and gatherings",
      },
      {
        space: "Master Bedroom",
        experience: "Private space designed around comfort",
      },
      {
        space: "Bedroom 02",
        experience: "Flexible private space for family or guests",
      },
      {
        space: "Bedroom 03",
        experience: "Additional room for family, guests, or personal use",
      },
      {
        space: "Kitchen",
        experience: "Functional space for everyday living",
      },
      {
        space: "Bathrooms",
        experience: "Private facilities designed for convenience",
      },
      {
        space: "Entry & Circulation",
        experience: "Practical movement throughout the residence",
      },
    ],
    benefits: [
      {
        title: "More Space",
        description: "Room for family life to evolve with ease and comfort.",
      },
      {
        title: "More Privacy",
        description: "Dedicated bedrooms provide greater separation between private and shared spaces.",
      },
      {
        title: "More Flexibility",
        description: "Additional space can adapt to family, guests, work, or personal needs.",
      },
      {
        title: "More Presence",
        description: "A larger residential format paired with Orion One's elevated design and lakefront setting.",
      },
    ],
    floorPlanSrc: "/images/residence/3-bedroom.webp",
    gallery: [
      "/images/residence/pic-1.jpg",
      "/images/residence/pic-4.png",
      "/images/residence/pic-2.jpg",
      "/images/residence/pic-5.webp",
    ],
    quoteBanner: {
      tag: "GATED COMMUNITY · LAKEFRONT RETREAT",
      quote:
        "INSTEAD OF CORRIDORS, WALKING PATHS CONNECT THE APARTMENTS — MAKING ORION ONE FEEL CLOSER TO A PRIVATE RETREAT.",
      imageSrc: "/images/residence/pic-3.webp",
    },
    lakeViewPerspective: {
      title: "PERFECT LAKE VIEWS",
      subtitle: "FROM ELEVATED TERRACES & BALCONIES",
      text: "A short conversation is enough to understand which apartment fits your lifestyle — whether it is a private sanctuary, a family lakefront home, or a finite investment.",
      imageSrc: "/images/residence/pic-4.png",
    },
  },
  {
    slug: "private-pool",
    aliases: ["pool-suite", "private-pool-residence"],
    unitCode: "NO. 501",
    category: "private-pool",
    title: "Private Pool Residences",
    shortTitle: "Private Pool",
    headline: "POOL SUITE / 240 M²",
    heroSub: "Privacy, elevated.",
    tagline: "A premium residential experience that brings private pool living into the Orion One lakefront environment.",
    levelMeta: "PODIUM & EXECUTIVE PENTHOUSES",
    completion: "4Q 2026",
    introHeading: "YOUR OWN PRIVATE RETREAT",
    intro:
      "Private Pool Residences offer a more exclusive residential experience within Orion One. Designed around privacy, comfort, and elevated living, these residences combine the intimacy of a private pool with the wider benefits of a professionally planned lakefront development.",
    specs: {
      bedrooms: "Multi",
      interiorArea: "240 M²",
      terrace: "65 M²",
      totalArea: "305 M²",
      bathrooms: "4",
      parking: "2 Reserved Bays",
      orientation: "Private Water Deck & Horizon Outlook",
    },
    keyFeatures: [
      {
        number: "01",
        title: "Private Pool",
        description: "A dedicated pool experience within your private residence.",
      },
      {
        number: "02",
        title: "Premium Living",
        description: "A residential environment designed around comfort and exclusivity.",
      },
      {
        number: "03",
        title: "Spacious Interiors",
        description: "Generous living spaces designed for contemporary life.",
      },
      {
        number: "04",
        title: "Lakefront Setting",
        description: "The wider residence experience is shaped by Orion One's waterfront environment.",
      },
      {
        number: "05",
        title: "Smart Living",
        description: "Smart-home automation and smart entry are part of the project's residential offering.",
      },
      {
        number: "06",
        title: "Dedicated Parking",
        description: "Private parking and secure building access.",
      },
    ],
    inclusions: [
      {
        category: "Private Pool",
        items: [
          "Private plunge pool",
          "Dedicated poolside terrace",
          "Poolside outdoor living space",
          "Ambient poolside lighting",
        ],
      },
      {
        category: "Living & Dining",
        items: [
          "Spacious living area",
          "Dedicated dining area",
          "Natural light throughout",
          "Planned circulation",
        ],
      },
      {
        category: "Bedrooms",
        items: [
          "Private bedroom spaces",
          "Storage provision",
          "Direct terrace connections",
        ],
      },
      {
        category: "Kitchen",
        items: [
          "Functional kitchen layout",
          "Cabinetry",
          "Countertop",
          "Kitchen fixtures",
        ],
      },
      {
        category: "Bathrooms",
        items: [
          "Finished bathrooms",
          "Sanitary fixtures",
          "Fittings",
        ],
      },
      {
        category: "Installations & Systems",
        items: [
          "Smart-home automation",
          "Smart entry access",
          "High-speed lifts",
          "CCTV surveillance",
          "Security systems",
        ],
      },
      {
        category: "Building Services",
        items: [
          "2 reserved parking bays",
          "Concierge / welcome lounge",
          "Dedicated residential entrance",
        ],
      },
    ],
    spaces: [
      {
        space: "Living Room",
        experience: "Spacious setting for everyday living",
      },
      {
        space: "Dining Area",
        experience: "Dedicated space for meals and gatherings",
      },
      {
        space: "Bedrooms",
        experience: "Private spaces designed around rest and comfort",
      },
      {
        space: "Kitchen",
        experience: "Functional space for everyday use",
      },
      {
        space: "Bathrooms",
        experience: "Refined private facilities",
      },
      {
        space: "Private Pool",
        experience: "Personal outdoor leisure space",
      },
      {
        space: "Outdoor Area",
        experience: "Extension of the living environment",
      },
    ],
    benefits: [
      {
        title: "Privacy",
        description: "Enjoy your own private outdoor environment and plunge pool.",
      },
      {
        title: "Convenience",
        description: "Bring a resort-style experience closer to home.",
      },
      {
        title: "Exclusivity",
        description: "A distinct residential offering within Orion One.",
      },
      {
        title: "Lifestyle",
        description: "Combine private outdoor living with the wider amenities of the development.",
      },
    ],
    floorPlanSrc: "/images/residence/private-pool.webp",
    gallery: [
      "/images/residence/pic-3.webp",
      "/images/residence/pic-1.jpg",
      "/images/residence/pic-2.jpg",
      "/images/residence/pic-5.webp",
    ],
    quoteBanner: {
      tag: "GATED COMMUNITY · LAKEFRONT RETREAT",
      quote:
        "INSTEAD OF CORRIDORS, WALKING PATHS CONNECT THE APARTMENTS — MAKING ORION ONE FEEL CLOSER TO A PRIVATE RETREAT.",
      imageSrc: "/images/residence/pic-3.webp",
    },
    lakeViewPerspective: {
      title: "PERFECT LAKE VIEWS",
      subtitle: "FROM ELEVATED TERRACES & BALCONIES",
      text: "A short conversation is enough to understand which apartment fits your lifestyle — whether it is a private sanctuary, a family lakefront home, or a finite investment.",
      imageSrc: "/images/residence/pic-4.png",
    },
  },
];

export function getSuiteBySlug(slug: string): ResidenceSuiteData | undefined {
  const normalized = slug.toLowerCase().trim();
  return RESIDENCE_SUITES.find(
    (s) => s.slug === normalized || s.aliases.includes(normalized)
  );
}

export function getSimilarSuites(currentSlug: string): ResidenceSuiteData[] {
  const current = getSuiteBySlug(currentSlug);
  return RESIDENCE_SUITES.filter((s) => s.slug !== current?.slug);
}
