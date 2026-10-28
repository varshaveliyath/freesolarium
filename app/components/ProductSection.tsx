import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { INCLUDED } from "../lib/content";
import Reveal from "./Reveal";

// One image per card in INCLUDED order:
// panels, inverter, structure, bos, tools, service
const CARD_IMAGES: Record<
  (typeof INCLUDED)[number]["icon"],
  { src: string; alt: string }
> = {
  panels: {
    src: "/images/hero-solar-panels-1280.webp",
    alt: "Solarium solar modules on a rooftop",
  },
  inverter: {
    src: "/images/solar-inverter-installation.webp",
    alt: "On-grid solar inverter installed on wall",
  },
  structure: {
    src: "/images/solar-mounting-kit.webp",
    alt: "ZAM mounting structure components",
  },
  bos: {
    src: "/images/solar-net-meter-kit.webp",
    alt: "Net meter and electrical BOS components",
  },
  tools: {
    src: "/images/stat_house.png",
    alt: "Solarium installation team at work",
  },
  service: {
    src: "/images/solar-monitoring-app.webp",
    alt: "Solarium solar monitoring app on phone",
  },
};

export default function ProductSection() {
  return (
    <section id="product" className="bg-paper py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-6">

        {/* ── Header ── */}
        <Reveal>
          <div className="max-w-[720px]">
            <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
              What you get
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,2.9rem)] font-bold leading-[1.05] tracking-[-0.035em] text-navy text-balance">
              Complete system. Nothing to source yourself.
            </h2>
            <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-body">
              Effective ₹0 does not mean a stripped-down kit. This is the same
              system we install on paid orders — designed, supplied and
              commissioned by one company.
            </p>
          </div>
        </Reveal>

        {/* ── Insurance banner ── */}
        <Reveal>
          <div className="mt-10 relative overflow-hidden rounded-2xl bg-navy p-6 sm:p-9 text-paper">
            {/* Glow blob */}
            <div
              className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-orange/20 blur-3xl"
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-navy-soft/40 blur-2xl" aria-hidden="true" />

            <div className="relative flex flex-wrap items-center justify-between gap-6">
              <div className="max-w-[560px]">
                <span className="inline-flex rounded-full bg-orange px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-navy">
                  Only at Solarium
                </span>
                <h3 className="mt-3 font-display text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight tracking-[-0.03em]">
                  5-year insurance. Free.
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-paper/70">
                  Your system is insured for five years at no extra cost. Cover,
                  the insurer and the claim process are set out in the policy
                  document shared with your order.
                </p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange/30 bg-orange/10 sm:h-20 sm:w-20">
                <ShieldCheck className="h-8 w-8 text-orange sm:h-10 sm:w-10" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── 6 product cards ── */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INCLUDED.map((item, index) => {
            const img = CARD_IMAGES[item.icon];
            return (
              <Reveal key={item.title} delay={index * 60}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_28px_48px_-28px_rgba(3,73,130,0.22)]">

                  {/* Card image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-soft">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Subtle gradient at bottom of image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-[15.5px] font-bold leading-snug tracking-[-0.01em] text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-muted">
                      {item.body}
                    </p>
                    {/* Accent bottom line on hover */}
                    <div className="mt-4 h-0.5 w-0 rounded-full bg-orange transition-all duration-300 group-hover:w-8" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
