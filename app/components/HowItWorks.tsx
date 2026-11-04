"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { JOURNEY } from "../lib/content";
import Reveal from "./Reveal";

// 6 clockwise positions around the circle starting at 12 o'clock (0° top center):
// 01: 0°   (top center, right under the section title)
// 02: 60°  (upper right)
// 03: 120° (lower right)
// 04: 180° (bottom center, directly opposite 01)
// 05: 240° (lower left)
// 06: 300° (upper left)
const CLOCK_ANGLES_DEG = [0, 60, 120, 180, 240, 300] as const;
const NODE_PCT = [0, 16.67, 33.33, 50, 66.67, 83.33] as const;

const RADIUS = 114; // px
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const circleWrapRef = useRef<HTMLDivElement>(null);
  const [progressPct, setProgressPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const vh = window.innerHeight;
      const target =
        window.innerWidth >= 1024 && circleWrapRef.current
          ? circleWrapRef.current
          : sectionRef.current;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;

      // Start filling as the circle's center enters at 82% of viewport height,
      // and complete at 28% of viewport height while the circle is still in full view.
      const startY = vh * 0.82;
      const endY = vh * 0.28;
      const raw = (startY - centerY) / (startY - endY);
      const clamped = Math.min(Math.max(raw, 0), 1);

      setProgressPct(clamped * 100);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const dashOffset = CIRCUMFERENCE * (1 - progressPct / 100);

  return (
    <section
      id="how"
      ref={sectionRef}
      className="relative overflow-hidden bg-navy py-10 text-white lg:py-12"
    >
      {/* Full-bleed background image */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/images/roadmap-bg.png?v=3"
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#022b4e]/65 via-[#034982]/55 to-[#022b4e]/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 lg:grid lg:grid-cols-[0.36fr_0.64fr] lg:items-center lg:gap-6 lg:px-6">
        {/* ── Center-left: Section label + headline ── */}
        <Reveal direction="left">
          <div className="max-w-[420px]">
            <p className="flex items-center gap-2.5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-orange">
              <span className="h-px w-8 bg-orange/70" aria-hidden="true" />
              After you book
            </p>
            <h2 className="mt-2.5 text-[clamp(1.75rem,3vw,2.45rem)] font-bold leading-[1.08] tracking-[-0.035em] text-white text-balance">
              From booking to solar power
            </h2>
            <p className="mt-2.5 text-[13px] leading-relaxed text-white/85">
              Six steps, one team. You always know what happens next and what it costs.
            </p>
          </div>
        </Reveal>

        {/* ── Center-right (Desktop): Circular 6-step roadmap ── */}
        <Reveal direction="right" delay={120}>
          <div
            ref={circleWrapRef}
            className="relative mx-auto hidden h-[460px] w-full max-w-[700px] lg:block"
          >
            {/* Central SVG circle track + scroll-lit arc */}
            <svg
              width={300}
              height={300}
              viewBox="0 0 300 300"
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              aria-hidden="true"
            >
              {/* Base circle */}
              <circle
                cx={150}
                cy={150}
                r={RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.32)"
                strokeWidth={2}
              />
              {/* Active circle starting at 12 o'clock (-90° from +X axis) */}
              <circle
                cx={150}
                cy={150}
                r={RADIUS}
                fill="none"
                stroke="#ffffff"
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 150 150)"
              />
            </svg>

            {/* Center hub label */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/40 bg-white/95 text-center shadow-lg backdrop-blur-sm">
              <span className="font-display text-[19px] font-extrabold tracking-[-0.03em] text-navy">
                6 Steps
              </span>
              <span className="mt-0.5 text-[9.5px] font-semibold text-muted">
                One in-house team
              </span>
            </div>

            {/* 6 nodes on the circle + 6 cards positioned radially */}
            {JOURNEY.map((item, i) => {
              const deg = CLOCK_ANGLES_DEG[i];
              const rad = ((deg - 90) * Math.PI) / 180;
              const nodeX = Math.cos(rad) * RADIUS;
              const nodeY = Math.sin(rad) * RADIUS;
              const isLit = progressPct > NODE_PCT[i];

              const isTop = deg === 0;
              const isBottom = deg === 180;
              const isRightSide = deg === 60 || deg === 120;

              const stemLen = isTop || isBottom ? 20 : 24;
              const cardAnchorX = isTop || isBottom
                ? 0
                : nodeX + (isRightSide ? stemLen : -stemLen);
              const cardAnchorY = isTop
                ? nodeY - stemLen
                : isBottom
                  ? nodeY + stemLen
                  : nodeY * 1.22;

              const cardTransform = isTop
                ? "translate(-50%, -100%)"
                : isBottom
                  ? "translate(-50%, 0)"
                  : isRightSide
                    ? "translate(0, -50%)"
                    : "translate(-100%, -50%)";

              return (
                <div key={item.n}>
                  {/* Numbered node on the circle */}
                  <div
                    style={{
                      left: `calc(50% + ${nodeX}px)`,
                      top: `calc(50% + ${nodeY}px)`,
                    }}
                    className={`absolute z-10 flex h-7.5 w-7.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 font-display text-[10px] font-extrabold transition-all duration-200 ${
                      isLit
                        ? "scale-110 border-white bg-orange text-white shadow-[0_0_12px_rgba(223,122,28,0.55)]"
                        : "border-white/50 bg-white/90 text-navy"
                    }`}
                  >
                    {item.n}
                  </div>

                  {/* Connector tick */}
                  {isTop || isBottom ? (
                    <span
                      style={{
                        left: "50%",
                        top: isTop
                          ? `calc(50% + ${nodeY - stemLen}px)`
                          : `calc(50% + ${nodeY + 15}px)`,
                        height: `${stemLen - 15}px`,
                      }}
                      className={`absolute w-[1.5px] -translate-x-1/2 transition-colors duration-200 ${
                        isLit ? "bg-white" : "bg-white/35"
                      }`}
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      style={{
                        left: isRightSide
                          ? `calc(50% + ${nodeX + 15}px)`
                          : `calc(50% + ${nodeX - stemLen}px)`,
                        top: `calc(50% + ${nodeY}px)`,
                        width: `${stemLen - 15}px`,
                      }}
                      className={`absolute h-[1.5px] -translate-y-1/2 transition-colors duration-200 ${
                        isLit ? "bg-white" : "bg-white/35"
                      }`}
                      aria-hidden="true"
                    />
                  )}

                  {/* Card */}
                  <div
                    style={{
                      left: `calc(50% + ${cardAnchorX}px)`,
                      top: `calc(50% + ${cardAnchorY}px)`,
                      transform: cardTransform,
                    }}
                    className={`absolute w-[196px] rounded-xl border bg-white p-2.5 transition-all duration-300 ${
                      isLit
                        ? "border-navy shadow-[0_16px_32px_-16px_rgba(3,73,130,0.26)]"
                        : "border-line shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-display text-[15px] font-bold leading-none tracking-[-0.03em] transition-colors duration-200 ${
                          isLit ? "text-orange" : "text-orange/45"
                        }`}
                      >
                        {item.n}
                      </span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.08em] transition-colors duration-200 ${
                          isLit
                            ? "bg-navy/10 text-navy"
                            : "bg-paper text-muted"
                        }`}
                      >
                        {item.when}
                      </span>
                    </div>

                    <h3 className="mt-1 font-display text-[12.5px] font-bold leading-snug text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-[10px] leading-snug text-body/85">
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* ── Mobile & tablet (< lg): horizontal swipe snap layout like ProductSection ── */}
        <div className="mt-7 -mx-5 lg:hidden">
          <div className="mb-3.5 flex items-center justify-between px-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
              6 steps
            </p>
            <p className="text-[11px] font-semibold text-white/65">Swipe →</p>
          </div>

          <div
            className="hide-scrollbar flex gap-4 overflow-x-auto pb-2"
            style={{
              paddingLeft: "1.25rem",
              paddingRight: "1.25rem",
              scrollSnapType: "x mandatory",
            }}
          >
            {JOURNEY.map((item) => (
              <div
                key={item.n}
                style={{ scrollSnapAlign: "start" }}
                className="flex w-[250px] shrink-0 flex-col justify-between rounded-2xl border border-white/25 bg-white p-4 shadow-[0_12px_28px_-14px_rgba(2,27,51,0.45)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-[18px] font-bold leading-none tracking-[-0.03em] text-orange">
                      {item.n}
                    </span>
                    <span className="rounded bg-navy/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-navy">
                      {item.when}
                    </span>
                  </div>
                  <h3 className="mt-2.5 font-display text-[14.5px] font-bold leading-snug text-navy">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-2 text-[11.5px] leading-relaxed text-body/85">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
