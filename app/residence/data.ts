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

export type FloorCategory = "commercial" | "amenities" | "residential";

export interface TowerLevelData {
  /** 0 = Ground Floor, 1 = First Floor, 2 = Second Floor, 3..13 = Apartment Floors (14 floors total) */
  level: number;
  code: string;
  name: string;
  category: FloorCategory;
  /** Top Y percentage on 5-final.jpg (0-100) */
  yTop: number;
  /** Bottom Y percentage on 5-final.jpg (0-100) */
  yBottom: number;
  /** Left X percentage of slab on 5-final.jpg (0-100) */
  xLeft: number;
  /** Right X percentage of slab on 5-final.jpg (0-100) */
  xRight: number;
  subtitle: string;
  detailMeta: string;
  description: string;
  /** Available apartment suite slugs on this floor (for residential floors 03-13) */
  availableSuites: Array<"1-bedroom" | "2-bedroom" | "3-bedroom" | "private-pool">;
  /** Floor plan & gallery used when category is commercial or amenities */
  customPlanSrc?: string;
  customSpecs?: Array<{ label: string; value: string }>;
  customGallery?: string[];
}

export const RESIDENCE_SUITES: ResidenceSuiteData[] = [
  {
    slug: "1-bedroom",
    aliases: ["one-bedroom"],
    unitCode: "1 Bedroom",
    category: "1-bedroom",
    title: "One Bedroom Apartments",
    shortTitle: "1 Bedroom",
    headline: "1 Bed / 85 m²",
    heroSub: "Efficiently planned. Elegantly finished.",
    tagline:
      "Thoughtful spaces designed for comfortable modern living at Orion One.",
    levelMeta: "FLOORS 03 – 11 · LAKE FACING",
    completion: "4Q 2026",
    introHeading: "A SMARTER WAY TO LIVE",
    intro:
      "Designed for professionals, investors, and young families, the one-bedroom residences combine efficient planning with refined interiors, natural daylight, and uninterrupted lakefront views.",
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
        description:
          "Intelligent space planning for comfortable everyday living.",
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
        title: "Refined Finishes",
        description:
          "Considered materials and finishes throughout the residence.",
      },
      {
        number: "05",
        title: "Smart Living",
        description:
          "Smart-home automation integrated into the Orion One experience.",
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
          "Refined fixtures",
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
        description:
          "A contemporary residence within a complete waterfront destination.",
      },
      {
        title: "For Investors",
        description:
          "A finite residential position along Orion One's lakefront shoreline.",
      },
      {
        title: "For Young Families",
        description:
          "A practical home with direct access to the second-floor wellness and lifestyle facilities.",
      },
    ],
    floorPlanSrc: "/images/residence/1-bedroom.webp",
    gallery: [
      "/images/residence/pic-2.jpg",
      "/images/residence/dining-room.jpg",
      "/images/residence/balcony-view.jpg",
      "/images/residence/pic-1.jpg",
      "/images/residence/pic-4.png",
    ],
    quoteBanner: {
      tag: "LAKEFRONT RETREAT",
      quote:
        "Instead of Corridors, Walking Paths Connect the Apartments — Making Orion One Feel Closer to a Private Retreat.",
      imageSrc: "/images/residence/pic-3.webp",
    },
    lakeViewPerspective: {
      title: "Perfect Lake Views",
      subtitle: "FROM ELEVATED TERRACES & BALCONIES",
      text: "A short conversation is enough to understand which apartment fits your lifestyle — whether it is a private sanctuary, a family lakefront home, or a finite position on the water.",
      imageSrc: "/images/residence/pic-4.png",
    },
  },
  {
    slug: "2-bedroom",
    aliases: ["two-bedroom"],
    unitCode: "2 Bedroom",
    category: "2-bedroom",
    title: "Two Bedroom Apartments",
    shortTitle: "2 Bedroom",
    headline: "2 Bed / 135 m²",
    heroSub: "More space. More comfort.",
    tagline:
      "Thoughtfully planned residences designed around contemporary family living.",
    levelMeta: "FLOORS 03 – 12 · PANORAMIC VIEW",
    completion: "4Q 2026",
    introHeading: "SPACE DESIGNED AROUND LIFE",
    intro:
      "Two-bedroom residences offer a considered balance of space, functionality, and calm. Designed for growing families and homeowners who want more room to live, relax, and host, each residence combines generous living areas with refined finishes and practical planning.",
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
        description:
          "More room for family living, relaxation, and entertaining.",
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
        description:
          "Spaces arranged for practical movement and everyday functionality.",
      },
      {
        number: "05",
        title: "Natural Light",
        description: "Designed to bring daylight into key living spaces.",
      },
      {
        number: "06",
        title: "Smart Living",
        description:
          "Smart-home automation and smart entry integrated into the development.",
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
        description:
          "Additional space for everyday family life, guests, and changing needs.",
      },
      {
        title: "For Homeowners",
        description:
          "A balance between generous living space and practical functionality.",
      },
      {
        title: "For Those Who Want More",
        description:
          "Two bedrooms provide greater flexibility without moving into the scale of a larger family residence.",
      },
    ],
    floorPlanSrc: "/images/residence/2-bedroom.webp",
    gallery: [
      "/images/residence/pic-1.jpg",
      "/images/residence/pic-5.webp",
      "/images/residence/deck-terrace.jpg",
      "/images/residence/dining-room.jpg",
      "/images/residence/pic-2.jpg",
    ],
    quoteBanner: {
      tag: "LAKEFRONT RETREAT",
      quote:
        "Instead of Corridors, Walking Paths Connect the Apartments — Making Orion One Feel Closer to a Private Retreat.",
      imageSrc: "/images/residence/pic-3.webp",
    },
    lakeViewPerspective: {
      title: "Perfect Lake Views",
      subtitle: "FROM ELEVATED TERRACES & BALCONIES",
      text: "A short conversation is enough to understand which apartment fits your lifestyle — whether it is a private sanctuary, a family lakefront home, or a finite position on the water.",
      imageSrc: "/images/residence/pic-4.png",
    },
  },
  {
    slug: "3-bedroom",
    aliases: ["three-bedroom"],
    unitCode: "3 Bedroom",
    category: "3-bedroom",
    title: "Three Bedroom Apartments",
    shortTitle: "3 Bedroom",
    headline: "3 Bed / 195 m²",
    heroSub: "Generous family living by the water.",
    tagline:
      "Spacious residences designed for families who value comfort, privacy, and a refined living environment.",
    levelMeta: "FLOORS 05 – 13 · WATERFRONT CORNER",
    completion: "4Q 2026",
    introHeading: "SPACE FOR WHAT MATTERS",
    intro:
      "The three-bedroom residences bring together generous interiors, considered design, and open lake views. Designed for family living, they provide the space and flexibility to accommodate everyday routines, private moments, and time together.",
    specs: {
      bedrooms: "3",
      interiorArea: "195 M²",
      terrace: "42 M²",
      totalArea: "237 M²",
      bathrooms: "3",
      parking: "2 Reserved Bays",
      orientation: "Corner Lakefront View",
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
        description:
          "Dedicated private spaces for family members and guests.",
      },
      {
        number: "03",
        title: "Considered Design",
        description:
          "A refined interior environment with attention to detail.",
      },
      {
        number: "04",
        title: "Lake Views",
        description:
          "Uninterrupted waterfront views form part of the residential experience.",
      },
      {
        number: "05",
        title: "Intelligent Planning",
        description:
          "Spaces arranged to balance privacy, movement, and functionality.",
      },
      {
        number: "06",
        title: "Smart Living",
        description:
          "Smart-home automation and smart entry integrated into the development.",
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
        items: ["Finished bathrooms", "Sanitary fixtures", "Fittings"],
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
        description:
          "Dedicated bedrooms provide greater separation between private and shared spaces.",
      },
      {
        title: "More Flexibility",
        description:
          "Additional space can adapt to family, guests, work, or personal needs.",
      },
      {
        title: "More Presence",
        description:
          "A larger residential format paired with Orion One's elevated design and lakefront setting.",
      },
    ],
    floorPlanSrc: "/images/residence/3-bedroom.webp",
    gallery: [
      "/images/residence/pic-5.webp",
      "/images/residence/pic-1.jpg",
      "/images/residence/pic-4.png",
      "/images/residence/deck-terrace.jpg",
      "/images/residence/pic-2.jpg",
    ],
    quoteBanner: {
      tag: "LAKEFRONT RETREAT",
      quote:
        "Instead of Corridors, Walking Paths Connect the Apartments — Making Orion One Feel Closer to a Private Retreat.",
      imageSrc: "/images/residence/pic-3.webp",
    },
    lakeViewPerspective: {
      title: "Perfect Lake Views",
      subtitle: "FROM ELEVATED TERRACES & BALCONIES",
      text: "A short conversation is enough to understand which apartment fits your lifestyle — whether it is a private sanctuary, a family lakefront home, or a finite position on the water.",
      imageSrc: "/images/residence/pic-4.png",
    },
  },
  {
    slug: "private-pool",
    aliases: ["pool-suite", "private-pool-residence"],
    unitCode: "Pool Suite",
    category: "private-pool",
    title: "Private Pool Residences",
    shortTitle: "Private Pool",
    headline: "Pool Suite / 240 m²",
    heroSub: "Privacy, elevated.",
    tagline:
      "A residential experience that brings private pool living into the Orion One lakefront environment.",
    levelMeta: "FLOORS 09, 12 & 13 · SKY TERRACES",
    completion: "4Q 2026",
    introHeading: "YOUR OWN PRIVATE RETREAT",
    intro:
      "Private Pool Residences offer a secluded residential experience within Orion One. Designed around privacy, comfort, and open water horizons, these residences combine the intimacy of a private plunge pool with the wider benefits of a lakefront development.",
    specs: {
      bedrooms: "3+",
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
        description:
          "A dedicated pool experience within your private residence.",
      },
      {
        number: "02",
        title: "Secluded Living",
        description:
          "A residential environment designed around comfort and privacy.",
      },
      {
        number: "03",
        title: "Spacious Interiors",
        description: "Generous living spaces designed for contemporary life.",
      },
      {
        number: "04",
        title: "Lakefront Setting",
        description:
          "The wider residence experience is shaped by Orion One's waterfront environment.",
      },
      {
        number: "05",
        title: "Smart Living",
        description:
          "Smart-home automation and smart entry are part of the project's residential offering.",
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
        items: ["Finished bathrooms", "Sanitary fixtures", "Fittings"],
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
        description:
          "Enjoy your own private outdoor environment and plunge pool.",
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
        description:
          "Combine private outdoor living with the wider amenities of the development.",
      },
    ],
    floorPlanSrc: "/images/residence/private-pool.webp",
    gallery: [
      "/images/residence/pic-3.webp",
      "/images/residence/pic-1.jpg",
      "/images/residence/deck-terrace.jpg",
      "/images/residence/pic-5.webp",
      "/images/residence/pic-2.jpg",
    ],
    quoteBanner: {
      tag: "LAKEFRONT RETREAT",
      quote:
        "Instead of Corridors, Walking Paths Connect the Apartments — Making Orion One Feel Closer to a Private Retreat.",
      imageSrc: "/images/residence/pic-3.webp",
    },
    lakeViewPerspective: {
      title: "Perfect Lake Views",
      subtitle: "FROM ELEVATED TERRACES & BALCONIES",
      text: "A short conversation is enough to understand which apartment fits your lifestyle — whether it is a private sanctuary, a family lakefront home, or a finite position on the water.",
      imageSrc: "/images/residence/pic-4.png",
    },
  },
];

/**
 * Exact 14-Floor Building Structure of Orion One mapped to /images/residence/5-final.jpg:
 * - Ground Floor (GF): Commercial Shops & Waterfront Promenade
 * - First Floor (01): Commercial Shops & Showrooms
 * - Second Floor (02): Gym, Infinity Pool, Spa & Resident Amenities
 * - 3rd Floor to 13th Floor (03 – 13): Residential Apartments (11 apartment floors)
 * Total = 14 Floors including Ground Floor.
 */
export const TOWER_LEVELS: TowerLevelData[] = [
  {
    level: 13,
    code: "13",
    name: "13th Floor",
    category: "residential",
    yTop: 6.2,
    yBottom: 13.0,
    xLeft: 59.5,
    xRight: 80.0,
    subtitle: "PRIVATE POOL RESIDENCES · 3 BEDROOM APARTMENTS",
    detailMeta: "Crown Residential Level · Lakefront Facing",
    description:
      "The uppermost residential floor of Orion One, home to private plunge pool residences and corner three-bedroom apartments with open horizon views.",
    availableSuites: ["private-pool", "3-bedroom"],
  },
  {
    level: 12,
    code: "12",
    name: "12th Floor",
    category: "residential",
    yTop: 13.0,
    yBottom: 19.2,
    xLeft: 57.0,
    xRight: 81.0,
    subtitle: "PRIVATE POOL RESIDENCES · 2 & 3 BEDROOM APARTMENTS",
    detailMeta: "Upper Tower Residences · Panoramic Outlook",
    description:
      "Elevated sky residences combining cantilevered private pool terraces with spacious two- and three-bedroom family layouts.",
    availableSuites: ["private-pool", "3-bedroom", "2-bedroom"],
  },
  {
    level: 11,
    code: "11",
    name: "11th Floor",
    category: "residential",
    yTop: 19.2,
    yBottom: 25.4,
    xLeft: 56.4,
    xRight: 81.2,
    subtitle: "1 BEDROOM · 2 BEDROOM · 3 BEDROOM APARTMENTS",
    detailMeta: "Residential Apartments · Lakefront & Parkland View",
    description:
      "High-floor apartments with deep wrap-around balconies overlooking the Sector F lakefront and surrounding parkland.",
    availableSuites: ["3-bedroom", "2-bedroom", "1-bedroom"],
  },
  {
    level: 10,
    code: "10",
    name: "10th Floor",
    category: "residential",
    yTop: 25.4,
    yBottom: 31.6,
    xLeft: 56.2,
    xRight: 81.2,
    subtitle: "1 BEDROOM · 2 BEDROOM · 3 BEDROOM APARTMENTS",
    detailMeta: "Residential Apartments · Direct Waterfront Horizon",
    description:
      "Well-proportioned one-, two-, and three-bedroom residences planned around natural daylight and uninterrupted water views.",
    availableSuites: ["2-bedroom", "3-bedroom", "1-bedroom"],
  },
  {
    level: 9,
    code: "09",
    name: "9th Floor",
    category: "residential",
    yTop: 31.6,
    yBottom: 37.8,
    xLeft: 56.2,
    xRight: 81.2,
    subtitle: "2 BEDROOM · 3 BEDROOM · PRIVATE POOL RESIDENCES",
    detailMeta: "Cantilevered Terrace Level · Lakefront Facing",
    description:
      "Architectural cantilevered terrace floor featuring private pool suites alongside generous two- and three-bedroom residences.",
    availableSuites: ["private-pool", "3-bedroom", "2-bedroom"],
  },
  {
    level: 8,
    code: "08",
    name: "8th Floor",
    category: "residential",
    yTop: 37.8,
    yBottom: 44.0,
    xLeft: 56.2,
    xRight: 81.2,
    subtitle: "1 BEDROOM · 2 BEDROOM · 3 BEDROOM APARTMENTS",
    detailMeta: "Residential Apartments · Lakefront Facing",
    description:
      "Mid-rise residences offering balanced elevation above the shoreline promenade with expansive outdoor balconies.",
    availableSuites: ["2-bedroom", "1-bedroom", "3-bedroom"],
  },
  {
    level: 7,
    code: "07",
    name: "7th Floor",
    category: "residential",
    yTop: 44.0,
    yBottom: 50.2,
    xLeft: 55.8,
    xRight: 81.5,
    subtitle: "1 BEDROOM · 2 BEDROOM · 3 BEDROOM APARTMENTS",
    detailMeta: "Sky Garden Transition · Lakefront Facing",
    description:
      "Positioned directly above the landscaped podium crown, combining botanical terrace views with open lake horizons.",
    availableSuites: ["2-bedroom", "3-bedroom", "1-bedroom"],
  },
  {
    level: 6,
    code: "06",
    name: "6th Floor",
    category: "residential",
    yTop: 50.2,
    yBottom: 56.5,
    xLeft: 52.8,
    xRight: 84.8,
    subtitle: "1 BEDROOM · 2 BEDROOM · 3 BEDROOM APARTMENTS",
    detailMeta: "Wide Terrace Residences · Shoreline Outlook",
    description:
      "Generous floorplate residences featuring extended waterfront terraces and floor-to-ceiling acoustic glazing.",
    availableSuites: ["3-bedroom", "2-bedroom", "1-bedroom"],
  },
  {
    level: 5,
    code: "05",
    name: "5th Floor",
    category: "residential",
    yTop: 56.5,
    yBottom: 62.5,
    xLeft: 52.5,
    xRight: 85.0,
    subtitle: "1 BEDROOM · 2 BEDROOM · 3 BEDROOM APARTMENTS",
    detailMeta: "Residential Apartments · Direct Lake View",
    description:
      "One-, two-, and three-bedroom apartments connected directly to the visual rhythm of the lake and dancing fountains.",
    availableSuites: ["2-bedroom", "3-bedroom", "1-bedroom"],
  },
  {
    level: 4,
    code: "04",
    name: "4th Floor",
    category: "residential",
    yTop: 62.5,
    yBottom: 68.5,
    xLeft: 52.2,
    xRight: 85.0,
    subtitle: "1 BEDROOM · 2 BEDROOM APARTMENTS",
    detailMeta: "Residential Apartments · Promenade & Lake View",
    description:
      "Thoughtfully planned one- and two-bedroom residences overlooking the landscaped waterside boardwalk.",
    availableSuites: ["1-bedroom", "2-bedroom"],
  },
  {
    level: 3,
    code: "03",
    name: "3rd Floor",
    category: "residential",
    yTop: 68.5,
    yBottom: 74.5,
    xLeft: 52.0,
    xRight: 85.0,
    subtitle: "1 BEDROOM · 2 BEDROOM APARTMENTS",
    detailMeta: "First Residential Level · Direct Amenity Access",
    description:
      "The first residential apartment level of Orion One, positioned immediately above the second-floor wellness club with landscaped terrace outlooks.",
    availableSuites: ["1-bedroom", "2-bedroom"],
  },
  {
    level: 2,
    code: "02",
    name: "2nd Floor",
    category: "amenities",
    yTop: 74.5,
    yBottom: 80.0,
    xLeft: 51.5,
    xRight: 85.2,
    subtitle: "GYM · INFINITY POOL · SPA & WELLNESS AMENITIES",
    detailMeta: "Dedicated Resident Wellness & Recreation Level",
    description:
      "The entire second floor is dedicated to movement, recovery, and community — housing the double-height fitness club, cantilevered infinity pool, steam and sauna suites, indoor/outdoor jogging tracks, and resident lounges.",
    availableSuites: [],
    customPlanSrc: "/images/gym.png",
    customSpecs: [
      { label: "Fitness", value: "Gym" },
      { label: "Aquatics", value: "Pool" },
      { label: "Recovery", value: "Spa" },
      { label: "Elevation", value: "Level 02" },
    ],
    customGallery: [
      "/images/amenities/fitness-gym.jpg",
      "/images/amenities/infinity-pool.jpg",
      "/images/amenities/spa.jpg",
      "/images/amenities/jogging-track.jpg",
      "/images/amenities/concierge.jpg",
    ],
  },
  {
    level: 1,
    code: "01",
    name: "1st Floor",
    category: "commercial",
    yTop: 80.0,
    yBottom: 85.0,
    xLeft: 51.5,
    xRight: 85.2,
    subtitle: "COMMERCIAL SHOPS · SHOWROOMS & DINING TERRACES",
    detailMeta: "Upper Commercial Promenade · Lakeview Frontage",
    description:
      "First-floor commercial shops, boutique showrooms, and open-air lakeside dining terraces overlooking the shoreline promenade and dancing fountains.",
    availableSuites: [],
    customPlanSrc: "/images/commercial/floor-plan-ground.png",
    customSpecs: [
      { label: "Format", value: "Shops" },
      { label: "Dining", value: "Terraces" },
      { label: "Frontage", value: "Lakeview" },
      { label: "Elevation", value: "Level 01" },
    ],
    customGallery: [
      "/images/commercial/dining-terrace.jpg",
      "/images/commercial/retail-arcade.jpg",
      "/images/commercial/slide-dining.jpg",
      "/images/commercial/slide-retail.jpg",
    ],
  },
  {
    level: 0,
    code: "GF",
    name: "Ground Floor",
    category: "commercial",
    yTop: 85.0,
    yBottom: 90.0,
    xLeft: 51.5,
    xRight: 85.2,
    subtitle: "COMMERCIAL SHOPS · WATERFRONT RETAIL ARCADE",
    detailMeta: "Shoreline Arrival & Retail Promenade",
    description:
      "Double-height ground-floor commercial shops and flagship retail spaces with direct pedestrian access from the shoreline boardwalk, arrival plaza, and dedicated residential lobby.",
    availableSuites: [],
    customPlanSrc: "/images/commercial/floor-plan-ground.png",
    customSpecs: [
      { label: "Format", value: "Retail" },
      { label: "Access", value: "Promenade" },
      { label: "Lobby", value: "Concierge" },
      { label: "Elevation", value: "Ground" },
    ],
    customGallery: [
      "/images/commercial.png",
      "/images/commercial/podium-exterior.jpg",
      "/images/commercial/retail-arcade.jpg",
      "/images/commercial/slide-podium.jpg",
    ],
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

export function getTowerLevel(levelNum: number): TowerLevelData | undefined {
  return TOWER_LEVELS.find((l) => l.level === levelNum);
}
