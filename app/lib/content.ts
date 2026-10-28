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
  { value: "#1 in Gujarat*", label: "PM Surya Ghar installations" },
] as const;

export const INCLUDED = [
  {
    title: "Solarium solar modules",
    body: "Made in our own facility for Indian roofs. ALMM-listed, DCR-compliant modules built for Gujarat heat and monsoon.",
    icon: "panels",
  },
  {
    title: "On-grid inverter",
    body: "Sized to the system, with a proven warranty and monitoring so you can see generation from day one.",
    icon: "inverter",
  },
  {
    title: "ZAM mounting structure",
    body: "Zinc-aluminium-magnesium coated steel. Corrosion resistant for long outdoor life, engineered for your roof.",
    icon: "structure",
  },
  {
    title: "Complete electrical BOS",
    body: "ACDB, DCDB, cables, conduits, earthing and protection devices — every component, correctly rated.",
    icon: "bos",
  },
  {
    title: "Installation & commissioning",
    body: "By Solarium's own team, including net-meter paperwork support with your DISCOM.",
    icon: "tools",
  },
  {
    title: "One window, 5 years",
    body: "One point of contact for every service ticket for five years. No chasing multiple vendors.",
    icon: "service",
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
    body: "Choose your setup and share basic details. No payment to reserve.",
  },
  {
    n: "02",
    title: "Share documents",
    when: "Same day",
    body: "Electricity bill, rooftop and house photos — here or on WhatsApp.",
  },
  {
    n: "03",
    title: "Rooftop survey",
    when: "We call to schedule",
    body: "We check your roof, connection and load, and confirm what fits.",
  },
  {
    n: "04",
    title: "Final confirmation",
    when: "Before work starts",
    body: "You approve the final amount, including any customisation, in writing.",
  },
  {
    n: "05",
    title: "Installation",
    when: "After your approval",
    body: "Our own team installs and commissions the system, then hands over.",
  },
  {
    n: "06",
    title: "Subsidy & net meter",
    when: "As per DISCOM",
    body: "We file the subsidy claim and net-meter paperwork along with you.",
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
