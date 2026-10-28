import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://solariumenergy.in"
  ),
  title: "Solarium 2.18 kW Home Solar — ₹0 Under PM Surya Ghar",
  description:
    "A complete 2.18 kW rooftop solar system for Gujarat homes at an effective cost of ₹0 after central and state subsidy. 5-year insurance included. Book online — no payment now.",
  keywords: [
    "PM Surya Ghar",
    "free solar Gujarat",
    "2.18 kW solar system",
    "rooftop solar Ahmedabad",
    "Solarium solar",
    "solar subsidy Gujarat",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Solar for your home at ₹0 — Solarium 2.18 kW Home Solar",
    description:
      "Complete 2.18 kW rooftop solar, installed by Solarium. Central and Gujarat state subsidy cover the system value for eligible homes. 5-year insurance included.",
    type: "website",
    locale: "en_IN",
    siteName: "Solarium Green Energy",
    images: [{ url: "/images/home-solar.png", width: 1024, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar for your home at ₹0 — Solarium",
    description:
      "A complete 2.18 kW rooftop solar system for eligible Gujarat homes. Book online — no payment now.",
    images: ["/images/home-solar.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
