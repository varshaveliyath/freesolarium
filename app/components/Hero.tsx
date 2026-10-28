"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ShieldCheck,
} from "lucide-react";
import { useRef } from "react";
import { HERO_PRICE, PRICING, inr } from "../lib/content";
import Reveal from "./Reveal";

const HERO_POINTS = [
  "5-year insurance included",
  "No payment now",
  "Installed by our own team",
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) scale3d(1.025,1.025,1.025)`;
  }

  function onMouseLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transition: "transform 0.25s cubic-bezier(0.23,1,0.32,1)", willChange: "transform" }}
    >
      {children}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-manufacturing.webp"
          alt="Solarium solar manufacturing facility"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Navy overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#022b4e]/80 via-[#034982]/65 to-[#034982]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#022b4e]/55 via-[#034982]/10 to-[#022b4e]/25" />
      </div>

      {/* ── Decorative accents ── */}
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
        <div className="bg-dots absolute inset-0 opacity-[0.06]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy-line/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1200px] gap-8 px-4 pb-12 pt-14 sm:px-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12 lg:px-6 lg:pb-22 lg:pt-24">
        <Reveal>
          {/* Badge */}
          <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-orange">
            <span className="h-px w-8 bg-orange/60" aria-hidden="true" />
            Under PM Surya Ghar · Gujarat homes
          </p>

          {/* Headline */}
          <h1 className="mt-4 max-w-[16ch] text-[clamp(2.2rem,6.8vw,4.6rem)] font-extrabold leading-[1.0] tracking-[-0.04em] text-white">
            Solar for your home at{" "}
            <span className="mt-1.5 inline-block rounded-xl bg-orange px-3.5 pb-1 pt-0.5 text-ink">
              {inr(HERO_PRICE)}
              <span className="align-top text-[0.42em] font-bold">*</span>
            </span>
          </h1>

          {/* Sub-copy */}
          <p className="mt-5 max-w-[32rem] text-[14px] leading-[1.65] text-white/75 sm:text-[15px]">
            A complete 2.18 kW rooftop solar system, made and installed by
            Solarium. Government subsidy covers the system value for eligible
            homes.
          </p>

          {/* CTA buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-2.5">
            <a
              href="#book"
              className="group inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-orange px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_14px_32px_-12px_rgba(245,132,1,0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-deep"
            >
              Book my {inr(HERO_PRICE)} solar system
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#how"
              className="inline-flex min-h-[46px] items-center gap-1.5 rounded-lg border border-white/20 bg-white/8 px-4 py-2.5 text-[12px] font-semibold text-white/85 backdrop-blur-sm transition-all duration-200 hover:bg-white/15"
            >
              See what happens after booking
              <ArrowDown className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Trust checkpoints */}
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {HERO_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-center gap-1.5 text-[11.5px] font-semibold text-white/75"
              >
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-navy-soft/60 ring-1 ring-white/20">
                  <Check className="h-2 w-2 text-orange" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          {/* Footnote */}
          <p className="mt-6 max-w-[32rem] text-[10px] leading-[1.6] text-white/35">
            *Effective cost after central assistance of{" "}
            {inr(PRICING.centralSubsidy)} and Gujarat state assistance of{" "}
            {inr(PRICING.stateSubsidy)}, subject to subsidy eligibility,
            approval, standard system configuration and scheme terms in force
            at commissioning. Site-specific customisation may cost extra and is
            quoted before you confirm.
          </p>
        </Reveal>

        {/* ── Right card — hidden on mobile ── */}
        <Reveal delay={140} className="hidden lg:block">
          <TiltCard>
            <div className="relative mx-auto w-full max-w-[400px] overflow-hidden rounded-2xl shadow-[0_40px_80px_-20px_rgba(2,43,78,0.9)] lg:max-w-none">

              {/* ── Image — full, no overlay ── */}
              <div className="relative aspect-[16/7] w-full overflow-hidden">
                <Image
                  src="/images/home-cta.webp"
                  alt="Solarium solar system installed on a home rooftop"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 36vw"
                  className="object-cover object-center"
                />

              </div>

              {/* ── Info panel below image ── */}
              <div className="bg-white px-5 py-4">

                {/* System label row */}
                <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted">
                      Solarium Home Solar
                    </p>
                    <p className="mt-0.5 font-display text-[14px] font-bold text-navy">
                      2.18 kW Standard System
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-mist px-2.5 py-1 text-[9px] font-semibold text-navy">
                    On-grid · 4 modules
                  </span>
                </div>

                {/* Pricing rows */}
                <dl className="mt-3 space-y-1.5 text-[12px]">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-body">System value</dt>
                    <dd className="font-semibold tabular-nums text-navy">{inr(PRICING.systemValue)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-body">Central subsidy*</dt>
                    <dd className="font-semibold tabular-nums text-accent">− {inr(PRICING.centralSubsidy)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-body">Gujarat state subsidy*</dt>
                    <dd className="font-semibold tabular-nums text-accent">− {inr(PRICING.stateSubsidy)}</dd>
                  </div>
                </dl>

                <div className="my-3 h-px bg-line" />

                {/* Effective cost row */}
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-bold text-navy">Effective cost</p>
                    <p className="text-[10px] text-muted">For eligible Gujarat homes</p>
                  </div>
                  <p className="font-display text-[32px] font-extrabold leading-none tracking-[-0.05em] text-navy">
                    {inr(HERO_PRICE)}
                    <span className="align-top text-[13px] font-bold">*</span>
                  </p>
                </div>

                {/* Insurance strip */}
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-orange-soft px-3 py-2.5 text-[11.5px] font-semibold text-navy">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-orange-deep" />
                  5-year insurance included free
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
