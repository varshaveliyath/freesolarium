"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { INCLUDED } from "../lib/content";
import Reveal from "./Reveal";

/* ─── Layout constants ─── */
const CARD_W   = 315;  // px — card width on desktop (compact)
const CARD_GAP = 20;   // px — gap between cards
const N        = INCLUDED.length; // 10

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

      // paddingLeft in px (mirrors container margin)
      const pl = Math.max(24, (window.innerWidth - 1200) / 2 + 24);

      // Track total travel distance
      const totalWidth = pl + N * CARD_W + (N - 1) * CARD_GAP + pl;
      const maxSlide = Math.max(totalWidth - window.innerWidth, 0);
      const translateX = progress * maxSlide;

      track.style.transform = `translateX(-${translateX}px)`;
      if (bar) bar.style.width = `${progress * 100}%`;

      // highlight active dot
      const activeIndex = Math.min(Math.floor(progress * N), N - 1);
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        if (i === activeIndex) {
          dot.style.width   = "24px";
          dot.style.opacity = "1";
          dot.style.background = "var(--color-orange)";
        } else {
          dot.style.width   = "7px";
          dot.style.opacity = "0.35";
          dot.style.background = "white";
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const extraScroll = 2800;

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
    return (
      <div
        className="group relative flex shrink-0 flex-col overflow-hidden rounded-2xl transition-all duration-300"
        style={{
          width: mobile ? "295px" : `${CARD_W}px`,
          background: "linear-gradient(160deg, #0c2d4a 0%, #051d33 100%)",
          boxShadow: mobile
            ? "0 8px 28px -8px rgba(2,27,51,0.55)"
            : "0 24px 60px -20px rgba(2,27,51,0.75), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* ── Image ── */}
        <div
          className="relative w-full overflow-hidden bg-[#031525]"
          style={{ height: mobile ? "140px" : "155px" }}
        >
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes={mobile ? "295px" : "315px"}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#051d33] via-[#051d33]/40 to-transparent" />

          {/* Number badge — top-left */}
          <span
            className="absolute left-3.5 top-3.5 flex h-7 w-7 items-center justify-center rounded-full text-[10.5px] font-extrabold text-white"
            style={{
              background: "rgba(255,255,255,0.14)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.22)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Category Tag badge — top-right */}
          <span
            className="absolute right-3.5 top-3.5 rounded-full px-2 py-0.5 text-[9.5px] font-semibold text-white/90"
            style={{
              background: "rgba(5,29,51,0.8)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {item.tag}
          </span>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 flex-col p-4 sm:p-5" style={mobile ? { padding: "1rem" } : {}}>
          {/* Orange accent line */}
          <div
            className="mb-2.5 h-[2px] w-8 rounded-full bg-orange opacity-85 transition-all duration-500 group-hover:w-14 group-hover:opacity-100"
          />

          <h3
            className="font-display font-bold leading-tight tracking-[-0.02em] text-white"
            style={{ fontSize: mobile ? "15.5px" : "16.5px" }}
          >
            {item.title}
          </h3>

          <p className="mt-1 text-[11px] font-semibold text-orange leading-snug">
            {item.subtitle}
          </p>

          <p
            className="mt-2 leading-relaxed text-white/65"
            style={{ fontSize: mobile ? "11.5px" : "12px" }}
          >
            {item.body}
          </p>

          {/* Divider */}
          <div className="my-3 h-px w-full bg-white/10" />

          {/* ── Specifications / Highlights ── */}
          <ul className="space-y-1.5 flex-1">
            {item.specs.map((spec, sIdx) => (
              <li
                key={sIdx}
                className="flex items-start gap-2 text-[11px] leading-snug text-white/80"
              >
                <svg
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Edge highlight on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ border: "1px solid rgba(223,122,28,0.35)" }}
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
            {/* Background image */}
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
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">{INCLUDED.length} components included</p>
          <p className="text-[11px] font-semibold text-muted/60">Swipe →</p>
        </div>
        <div
          className="hide-scrollbar flex gap-4 overflow-x-auto pb-4"
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
      <div
        ref={outerRef}
        style={{ height: `calc(100vh + ${extraScroll}px)` }}
        className="relative hidden bg-[#051525] lg:block"
      >
        {/* Sticky viewport — solid dark background */}
        <div
          className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden bg-[#051525]"
        >
          {/* Top label row */}
          <div className="mx-auto mb-6 w-full max-w-[1200px] px-6 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
              All {INCLUDED.length} Certified Components
            </span>
            <p className="text-[11.5px] font-semibold text-white/40 tracking-wide flex items-center gap-1.5">
              <span>Scroll to explore</span>
              <span>↓</span>
            </p>
          </div>

          {/* Horizontal card track */}
          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{
              gap: `${CARD_GAP}px`,
              paddingLeft: "max(1.5rem, calc((100vw - 1200px)/2 + 1.5rem))",
              paddingRight: "max(1.5rem, calc((100vw - 1200px)/2 + 1.5rem))",
            }}
            aria-label={`What you get — scroll to see all ${INCLUDED.length} components`}
          >
            {INCLUDED.map((item, i) => (
              <Card key={item.title} item={item} index={i} />
            ))}
          </div>

          {/* Bottom progress + dots */}
          <div className="mx-auto mt-8 w-full max-w-[1200px] px-6 flex items-center gap-6">
            {/* Dot indicators */}
            <div className="flex items-center gap-1.5 shrink-0">
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
