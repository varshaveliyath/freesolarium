import type { Metadata } from "next";
import BookingSection from "./components/BookingSection";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Institutions from "./components/Institutions";
import MobileCta from "./components/MobileCta";
import ProductSection from "./components/ProductSection";
import TrustStrip from "./components/TrustStrip";
import { FAQS } from "./lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BookingSection />
        <TrustStrip />
        <ProductSection />
        <Institutions />
        <HowItWorks />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
