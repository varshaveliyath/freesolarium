"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { INCLUDED } from "../lib/content";
import Reveal from "./Reveal";

/* ─── Card images ─── */
const CARD_IMAGES: Record<
  (typeof INCLUDED)[number]["icon"],
  { src: string; alt: string }
> = {
  panels:    { src: "/images/hero-solar-panels-1280.webp",      alt: "Solarium solar modules on a rooftop" },
  inverter:  { src: "/images/solar-inverter-installation.webp", alt: "On-grid solar inverter installed on wall" },
  structure: { src: "/images/solar-mounting-kit.webp",          alt: "ZAM mounting structure components" },
  bos:       { src: "/images/solar-net-meter-kit.webp",         alt: "Net meter and electrical BOS components" },
  tools:     { src: "/images/stat_house.png",                   alt: "Solarium installation team at work" },
  service:   { src: "/images/solar-monitoring-app.webp",        alt: "Solarium solar monitoring app on phone" },
};

/* ─── Layout constants ─── */
const CARD_W   = 320;  // px — card width on desktop
const CARD_GAP = 20;   // px — gap between cards
const N        = INCLUDED.length; // 6

export default function ProductSection() {
  const outerRef    = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dotRefs     = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    function onScroll() {
      const outer = outerRef.current;
      const track = trackRef.current;
      const bar   = progressRef.current;
      if (!outer || !track) return;

      const { top, height } = outer.getBoundingClientRect();
      const scrolled    = -top;
      const scrollableH = height - window.innerHeight;
      const progress    = Math.min(Math.max(scrolled / scrollableH, 0), 1);

      // paddingLeft in px (mirrors the inline style below)
      const pl = Math.max(24, (window.innerWidth - 1200) / 2 + 24);

      // When progress === 1 the LAST card should be centered in the viewport.
      // center of last card (in track coords) = pl + (N-1)*(CARD_W+CARD_GAP) + CARD_W/2
      // We want that to sit at window.innerWidth/2, so:
      const lastCardCenter = pl + (N - 1) * (CARD_W + CARD_GAP) + CARD_W / 2;
      const maxSlide = Math.max(lastCardCenter - window.innerWidth / 2, 0);
      const translateX = progress * maxSlide;

      track.style.transform = `translateX(-${translateX}px)`;
      if (bar) bar.style.width = `${progress * 100}%`;

      // highlight active dot
      const activeIndex = Math.min(Math.round(progress * (N - 1)), N - 1);
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        if (i === activeIndex) {
          dot.style.width   = "28px";
          dot.style.opacity = "1";
          dot.style.background = "var(--color-orange)";
        } else {
          dot.style.width   = "8px";
          dot.style.opacity = "0.35";
          dot.style.background = "white";
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // At ~1280px viewport: pl≈64, lastCardCenter≈64+5*340+160=684, maxSlide≈684-640=44... too small
  // Using a fixed safe value based on actual card travel distance.
  const extraScroll = 1800;

  /* ── shared card renderer ── */
  function Card({
    item,
    index,
    mobile = false,
  }: {
    item: (typeof INCLUDED)[number];
    index: number;
    mobile?: boolean;
  }) {
    const img = CARD_IMAGES[item.icon];
    return (
      <div
        className="group relative flex shrink-0 flex-col overflow-hidden rounded-3xl"
        style={{
          width: mobile ? "300px" : `${CARD_W}px`,
          background: "linear-gradient(160deg, #0c2d4a 0%, #051d33 100%)",
          boxShadow: mobile
            ? "0 8px 32px -8px rgba(2,27,51,0.55)"
            : "0 32px 80px -24px rgba(2,27,51,0.75), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* ── Image ── */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: mobile ? "16/9" : "4/3" }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={mobile ? "300px" : "320px"}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#051d33]/80 via-[#051d33]/20 to-transparent" />

          {/* Number badge — top-left */}
          <span
            className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-extrabold text-white"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 flex-col p-6" style={mobile ? { padding: "1rem 1.1rem" } : {}}>
          {/* Orange accent line */}
          <div
            className="mb-4 h-[2px] w-10 rounded-full bg-orange opacity-80 transition-all duration-500 group-hover:w-16 group-hover:opacity-100"
            style={mobile ? { marginBottom: "0.6rem" } : {}}
          />

          <h3
            className="font-display font-bold leading-snug tracking-[-0.02em] text-white"
            style={{ fontSize: mobile ? "15px" : "16px" }}
          >
            {item.title}
          </h3>
          <p
            className="mt-2 flex-1 leading-relaxed text-white/55"
            style={{ fontSize: mobile ? "12px" : "12.5px" }}
          >
            {item.body}
          </p>

          {/* Bottom row — subtle "included" pill */}
          <div className="mt-5 flex items-center justify-between" style={mobile ? { marginTop: "0.75rem" } : {}}>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-orange"
              style={{
                background: "rgba(223,122,28,0.14)",
                border: "1px solid rgba(223,122,28,0.28)",
              }}
            >
              Included
            </span>
            {/* Arrow — appears on hover */}
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0-3.5-3.5M13 8l-3.5 3.5" />
              </svg>
            </span>
          </div>
        </div>

        {/* Edge highlight on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ border: "1px solid rgba(223,122,28,0.32)" }}
        />
      </div>
    );
  }

  return (
    <section id="product" className="bg-paper" style={{ isolation: "isolate" }}>

      {/* ── Static header + insurance ── */}
      <div className="mx-auto max-w-[1200px] px-5 pb-12 pt-16 lg:px-6 lg:pt-24">
        <Reveal direction="left">
          <div className="max-w-[720px]">
            <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-orange">
              <span className="h-px w-8 bg-orange/50" aria-hidden="true" />
              What you get
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,2.9rem)] font-bold leading-[1.05] tracking-[-0.035em] text-navy text-balance">
              Complete system. Nothing to source yourself.
            </h2>
            <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-body">
              Effective ₹0 does not mean a stripped-down kit. This is the same system we
              install on paid orders — designed, supplied and commissioned by one company.
            </p>
          </div>
        </Reveal>

        {/* Insurance banner */}
        <Reveal direction="up" delay={120}>
          <div className="relative mt-10 overflow-hidden rounded-2xl p-6 text-paper sm:p-9">
            {/* Background image (previously used in hero) */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/hero-manufacturing.webp"
                alt="Solarium solar manufacturing facility"
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#022b4e]/90 via-[#034982]/75 to-[#034982]/35" />
            </div>

            <div className="relative z-10 max-w-[560px]">
              <span className="inline-flex rounded-full bg-orange px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">Only at Solarium</span>
              <h3 className="mt-3 font-display text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight tracking-[-0.03em]">5-year insurance. Free.</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-paper/80">
                Your system is insured for five years at no extra cost. Cover, the insurer and the claim process are set out in the policy document shared with your order.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Mobile: swipe snap (hidden lg+) ── */}
      <div className="lg:hidden pb-12">
        <div className="mb-5 flex items-center justify-between px-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">6 components included</p>
          <p className="text-[11px] font-semibold text-muted/60">Swipe →</p>
        </div>
        <div
          className="hide-scrollbar flex gap-5 overflow-x-auto"
          style={{ paddingLeft: "1.25rem", paddingRight: "1.25rem", scrollSnapType: "x mandatory" }}
        >
          {INCLUDED.map((item, i) => (
            <div key={item.title} style={{ scrollSnapAlign: "start" }}>
              <Card item={item} index={i} mobile />
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop: sticky horizontal scroll (hidden mobile) ── */}
      {/* bg-[#051525] on the outer div ensures no paper bg shows while scrolling */}
      <div
        ref={outerRef}
        style={{ height: `calc(100vh + ${extraScroll}px)` }}
        className="relative hidden bg-[#051525] lg:block"
      >
        {/* Sticky viewport — solid dark background, no smoke */}
        <div
          className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden bg-[#051525]"
        >
          {/* Top label row */}
          <div className="mx-auto mb-7 w-full max-w-[1200px] px-6 flex items-end justify-end">
            <p className="pb-1 text-[11.5px] font-semibold text-white/35 tracking-wide">
              Scroll to explore ↓
            </p>
          </div>

          {/* Horizontal card track */}
          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{
              gap: `${CARD_GAP}px`,
              paddingLeft: "max(1.5rem, calc((100vw - 1200px)/2 + 1.5rem))",
              paddingRight: "80px",
            }}
            aria-label="What you get — scroll to see all 6 components"
          >
            {INCLUDED.map((item, i) => (
              <Card key={item.title} item={item} index={i} />
            ))}
          </div>

          {/* Bottom progress + dots */}
          <div className="mx-auto mt-8 w-full max-w-[1200px] px-6 flex items-center gap-5">
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {INCLUDED.map((item, i) => (
                <span
                  key={item.title}
                  ref={(el) => { dotRefs.current[i] = el; }}
                  className="block rounded-full"
                  style={{
                    height: "8px",
                    width: i === 0 ? "28px" : "8px",
                    background: i === 0 ? "var(--color-orange)" : "white",
                    opacity: i === 0 ? 1 : 0.35,
                    transition: "width 0.3s ease, opacity 0.3s ease, background 0.3s ease",
                  }}
                />
              ))}
            </div>
            {/* Progress bar */}
            <div className="flex-1 h-[2px] rounded-full overflow-hidden bg-white/10">
              <div
                ref={progressRef}
                className="h-full rounded-full"
                style={{
                  width: "0%",
                  background: "linear-gradient(90deg, var(--color-orange), #ffc947)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transition back to light bg */}
      <div className="h-6 bg-paper lg:hidden" />
    </section>
  );
}
