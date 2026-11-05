/**
 * Single source of truth for copy, pricing and contact details.
 *
 * Values marked TODO are still awaiting written confirmation from Solarium.
 * They are kept here (rather than buried in components) so they can be
 * updated in one place before launch.
 */

export const site = {
  brand: "SOLARIUM",
  legalName: "Solarium Green Energy Ltd",
  tagline: "India's integrated solar company",
  phoneDisplay: "80030 80020",
  phoneHref: "tel:+918003080020",
  whatsappNumber: "918003080020",
  email: "info@solariumenergy.in",
  address:
    "B-1207, World Trade Tower, S.G. Highway, Sarkhej, Ahmedabad, Gujarat 380051",
  linkedin: "https://www.linkedin.com/company/solarium-green-energy/",
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** TODO: confirm final pricing with Solarium before launch. */
export const PRICING = {
  systemValue: 100_000,
  centralSubsidy: 63_240,
  stateSubsidy: 36_760,
  /** 0 means "quoted after the rooftop survey". */
  multiFloorCost: 0,
  /** 0 means "quoted after the rooftop survey". */
  elevatedCost: 0,
} as const;

export const HERO_PRICE = Math.max(
  0,
  PRICING.systemValue - PRICING.centralSubsidy - PRICING.stateSubsidy
);

export const inr = (value: number) =>
  `₹${Math.round(value).toLocaleString("en-IN")}`;

export const SYSTEM = {
  size: "2.18 kW",
  panels: "Solarium solar modules",
  inverter: "On-grid inverter",
  structure: "ZAM mounting structure",
  moduleCount: 4,
} as const;

export const TRUST_STATS = [
  { value: "25,000+", label: "Homes solarised" },
  { value: "Since 2018", label: "In rooftop solar" },
  { value: "BSE listed", label: "Public, audited company" },
  { value: "#1 in Gujarat*", label: "Home rooftop solar" },
] as const;

export const INCLUDED = [
  {
    title: "Solar Panels",
    subtitle: "Higher wattages are just the beginning",
    tag: "PV Modules",
    body: "World-class manufacturing, certified quality, and a reliable supply provide complete solutions for every project.",
    specs: [
      "1.2 GW automated manufacturing capacity",
      "30-year performance warranty",
      "DCR: 720Wp & 600Wp N-Type available",
      "Non-DCR: 725Wp N-Type available",
    ],
    image: "/images/hero-solar-panels-1280.webp",
    imageAlt: "Solarium high-efficiency N-Type solar panels",
    icon: "panels",
  },
  {
    title: "Solar Inverter",
    subtitle: "Brain of a Solar Plant",
    tag: "Power Conversion",
    body: "Generation, protection, and monitoring combined. Robust aluminum die-cast body with LCD display and remote dashboard.",
    specs: [
      "Up to 130% overloading capacity & 20–23A input",
      "Type-II SPD surge protection (DC & AC)",
      "In-built anti-islanding & optional AFCI protection",
      "Remote plant monitoring & 10 years warranty",
    ],
    image: "/images/solar-inverter-installation.webp",
    imageAlt: "Solarium on-grid solar inverter",
    icon: "inverter",
  },
  {
    title: "Mounting Structure",
    subtitle: "Engineered for 30-Year Rooftop Life",
    tag: "HDGI Structure",
    body: "This is exactly where low-cost systems quietly compromise. Heavy-duty HDGI steel engineered to survive extreme weather.",
    specs: [
      "HDGI steel with certified ISI mark",
      "Legs & Rafters: Heavy-gauge HDGI 72 x 72 mm",
      "Heavyweight structural capacity: 26–27 Kg",
      "Purlins: HDGI 40 x 40 mm, 2+ mm, up to 60 micron",
    ],
    image: "/images/solar-mounting-kit.webp",
    imageAlt: "HDGI solar mounting structure",
    icon: "structure",
  },
  {
    title: "Base Plate",
    subtitle: "Silver Painted Foundation Support",
    tag: "Foundation",
    body: "High-strength color-coated mild steel base plates engineered for rock-solid stability under severe wind loads.",
    specs: [
      "Size: 150 X 150 mm heavy-duty base plate",
      "Material: M.S (Color Coated finish)",
      "Heavy 5 mm plate thickness",
      "Solid 900 gm weight for wind resistance",
    ],
    image: "/images/stat_house.png",
    imageAlt: "Solarium heavy-duty base plate",
    icon: "baseplate",
  },
  {
    title: "SS Fasteners & Hardware",
    subtitle: "S.S304 Stainless Steel Grade",
    tag: "SS Hardware",
    body: "Full marine-grade S.S304 stainless steel hardware ensuring zero corrosion, rust, or structural weakness for 30+ years.",
    specs: [
      "Nut-Bolt: Marine-grade S.S304, Size M10x180",
      "Anchor Bolt: High-tensile S.S304, Size M10x100",
      "J-Bolt: SS304M with 8 Flange Nuts",
      "100% rust-proof & corrosion-resistant stainless steel",
    ],
    image: "/images/institutional-solar.webp",
    imageAlt: "S.S304 stainless steel fasteners and anchor bolts",
    icon: "fasteners",
  },
  {
    title: "ACDB / DCDB / Switch",
    subtitle: "Small in size, vital for safety",
    tag: "Electrical Safety",
    body: "ACDB, DCDB, and isolation switches protect both equipment and people from electrical surges, shocks, and faults.",
    specs: [
      "5 years comprehensive manufacturer warranty",
      "Premium SPD & MCB: Schneider, Eaton, Elmex & L&K",
      "IP65/IP66 certified outdoor weatherproof enclosures",
      "100% factory tested for surge and electrical safety",
    ],
    image: "/images/solar-net-meter-kit.webp",
    imageAlt: "ACDB DCDB solar distribution and isolation boxes",
    icon: "bos",
  },
  {
    title: "Pipes and Fittings",
    subtitle: "UV-Protected RPVC Conduit",
    tag: "Conduit System",
    body: "Complete UV and weather-resistant conduit network protecting critical solar cables against extreme heat and cracking.",
    specs: [
      "RPVC 25 mm pipe, elbow, tee, coupler & saddle",
      "UV and weather-protected for outdoor rooftop use",
      "Rust-resistant and long-lasting ISI mark",
      "Strong RPVC prevents cable exposure & cracking",
    ],
    image: "/images/solar-panels.webp",
    imageAlt: "Heavy-duty RPVC conduit pipes and fittings",
    icon: "pipes",
  },
  {
    title: "Solar & Earthing Cables",
    subtitle: "What hides behind the wall ensures safety",
    tag: "Solar Cabling",
    body: "After installation, cables become invisible — verify quality first. High-purity copper guarantees low loss and safety.",
    specs: [
      "DC Solar Cable: 1 Core 4.0 SQ MM Polycab Type 1",
      "AC Cable: 2 Core 4.0 SQ MM copper flexible (Polycab)",
      "Earthing Cable: 1 Core 6 SQ MM Cu & 1 Core 16 SQ MM Al",
      "High-purity copper with UV, heat & weather insulation",
    ],
    image: "/images/hero-farm-1280.webp",
    imageAlt: "Polycab solar DC and AC copper cables",
    icon: "cables",
  },
  {
    title: "Earthing Components",
    subtitle: "Complete Grounding & Lightning Safety",
    tag: "Grounding",
    body: "Low earth resistance protection system designed for reliable lightning dissipation and shock safety in all soil types.",
    specs: [
      "Chemical earthing compound: 2 bags of 15 kg each",
      "14 mm dia, 1000 mm spike arrester (FRP, 50 micron)",
      "High-strength FRP pit chamber (165×250×250 mm)",
      "Low earth resistance, rust-proof all-weather safety",
    ],
    image: "/images/home-solar.png",
    imageAlt: "Earthing chemical bag rod and FRP pit",
    icon: "earthing",
  },
  {
    title: "Accessories & Connectors",
    subtitle: "Trust in every single connection",
    tag: "Connections",
    body: "Industrial-grade certified connectors, UV cable ties, and lugs ensuring leak-free current flow and long-term durability.",
    specs: [
      "MC4 Connector: Dash PV, 1500 V DC | IP68 | TÜV",
      "UV-protected heavy-duty solar cable ties",
      "High-quality certified crimp lugs from top brands",
      "Factory-rated watertight seals for zero power loss",
    ],
    image: "/images/solar-monitoring-app.webp",
    imageAlt: "Dash PV MC4 connectors and solar accessories",
    icon: "accessories",
  },
] as const;

export const INSTITUTIONS = [
  "Indian Armed Forces",
  "Military Engineer Services",
  "DRDO",
  "BARC",
  "LIC",
  "Indian Railways",
  "Leading banks & PSUs",
] as const;

export const JOURNEY = [
  {
    n: "01",
    title: "Book online",
    when: "Today",
    body: "Share basic details. Pay & get 100% subsidy back.",
  },
  {
    n: "02",
    title: "Share documents",
    when: "Same day",
    body: "Upload bill and roof photos here or on WhatsApp.",
  },
  {
    n: "03",
    title: "Rooftop survey",
    when: "We call to schedule",
    body: "We inspect your roof, load and connection.",
  },
  {
    n: "04",
    title: "Final confirmation",
    when: "Before work starts",
    body: "Approve the final quote before work starts.",
  },
  {
    n: "05",
    title: "Installation",
    when: "After your approval",
    body: "Our team installs, tests and hands over the system.",
  },
  {
    n: "06",
    title: "Subsidy & net meter",
    when: "As per DISCOM",
    body: "We file net-meter and subsidy paperwork with you.",
  },
] as const;

export const FAQS = [
  {
    q: "Is it really free?",
    a: "Effective cost is ₹0 for the standard 2.18 kW system: a ₹1,00,000 system value, less ₹63,240 central assistance under PM Surya Ghar and ₹36,760 Gujarat state assistance. You pay nothing to reserve. Site-specific customisation is quoted after the rooftop survey and confirmed by you before any work begins.",
  },
  {
    q: "When is the subsidy credited, and to whom?",
    a: "Assistance is credited by the government directly to the customer's bank account after installation, commissioning and DISCOM inspection. Timelines are set by MNRE, GEDA and your DISCOM — your relationship manager tracks the claim with you and shares the status at each stage.",
  },
  {
    q: "Who is eligible?",
    a: "Residential consumers in Gujarat with their own roof, a valid DISCOM connection and no previous rooftop solar subsidy. The name on the electricity bill should match the applicant. We verify your eligibility before the survey.",
  },
  {
    q: "What could cost extra?",
    a: "Buildings above G+1, elevated structures and unusual roof conditions. These are quoted after the rooftop survey and you confirm before any work starts.",
  },
  {
    q: "What does the 5-year insurance cover?",
    a: "Every Solarium home system includes five years of system insurance at no extra cost. Cover, the insurer and the claim process are set out in the policy document shared with your order.",
  },
] as const;

export const DISCLAIMER =
  "Effective cost assumes approval of central assistance under PM Surya Ghar: Muft Bijli Yojana and Gujarat state assistance as notified at the time of commissioning, for the standard 2.18 kW configuration. Subsidy amounts, eligibility and disbursement timelines are set by MNRE, GEDA and the DISCOM, not by Solarium. Site-specific customisation is quoted after survey and before order confirmation.";
