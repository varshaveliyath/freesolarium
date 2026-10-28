import Image from "next/image";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { HERO_PRICE, PRICING, inr, site } from "../lib/content";
import Reveal from "./Reveal";

export default function FinalCta() {
  const subsidy = PRICING.centralSubsidy + PRICING.stateSubsidy;

  return (
    <section className="bg-paper pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl">

            {/* ── Background image ── */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/institutional-solar.webp"
                alt="Institutional solar installation by Solarium"
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-center"
              />
              {/* Deep navy-to-transparent overlay from left */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#022b4e]/95 via-[#034982]/80 to-[#034982]/30" />
              {/* Bottom fade for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#022b4e]/60 via-transparent to-transparent" />
            </div>

            {/* ── Decorative ring accents ── */}
            <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border border-white/10" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-4 -top-8 h-44 w-44 rounded-full border border-white/8" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 right-1/3 h-64 w-64 rounded-full bg-orange/10 blur-3xl" aria-hidden="true" />

            {/* ── Content ── */}
            <div className="relative z-10 flex flex-col gap-8 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-16">

              {/* Left: text block */}
              <div className="max-w-[560px]">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-orange backdrop-blur-sm">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
                  </span>
                  PM Surya Ghar · Gujarat homes
                </div>

                <h2 className="mt-5 text-[clamp(1.9rem,4.6vw,3.1rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-white text-balance">
                  Your roof is ready.<br className="hidden sm:block" /> Are you?
                </h2>

                <p className="mt-3 text-[13px] font-medium leading-relaxed text-white/70">
                  2.18 kW · {inr(PRICING.systemValue)} system value ·{" "}
                  {inr(subsidy)} eligible subsidy* · 5-year insurance
                </p>

                {/* Trust chips */}
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {[
                    "No payment to book",
                    "5-year insurance free",
                    "Installed by our own team",
                  ].map((point) => (
                    <span
                      key={point}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 backdrop-blur-sm"
                    >
                      <ShieldCheck className="h-3 w-3 text-orange" />
                      {point}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: CTA card */}
              <div className="w-full flex-col gap-3 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md flex sm:min-w-[280px] lg:w-auto">
                {/* Price display */}
                <div className="text-center">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50">
                    Effective cost
                  </p>
                  <p className="mt-1 font-display text-[48px] font-extrabold leading-none tracking-[-0.05em] text-white">
                    {inr(HERO_PRICE)}
                    <span className="align-top text-[20px] font-bold text-orange">*</span>
                  </p>
                  <p className="mt-1 text-[11px] text-white/45">For eligible Gujarat homes</p>
                </div>

                <div className="my-1 h-px bg-white/10" />

                <a
                  href="#book"
                  className="group flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-orange px-6 text-[14px] font-bold text-white shadow-[0_14px_32px_-10px_rgba(245,132,1,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-deep"
                >
                  Book my ₹0 solar system
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href={site.phoneHref}
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/8 text-[13px] font-semibold text-white/85 transition-all duration-200 hover:bg-white/15"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {site.phoneDisplay}
                </a>

                <p className="text-center text-[10px] text-white/35">
                  *After {inr(subsidy)} total subsidy. No payment now.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
