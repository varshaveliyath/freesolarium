"use client";

import { useEffect, useRef } from "react";
import Reveal from "./Reveal";

const PILLARS = [
  {
    n: "01",
    title: "STT - Solarium\nTrusted Technology",
    body: "Maximum power generation with expert engineering.",
  },
  {
    n: "02",
    title: "Super Solid\nStructure",
    body: "Steady and stable even in strong wind.",
  },
  {
    n: "03",
    title: "Stress-Free\nProcess",
    body: "Subsidy, DISCOM, bank, system engineering and installation — everything we will handle.",
  },
  {
    n: "04",
    title: "Service Promise\nBest-in-Class",
    body: "On-call helpline, free visit if required, service warranty of 5 years.",
  },
  {
    n: "05",
    title: "Safety &\nSecurity",
    body: "Extended warranty at every step, free insurance of 5 years.",
  },
  {
    n: "06",
    title: "Speed of\nExecution",
    body: "Fastest in the current market.",
  },
] as const;

const EXTRA_SCROLL = 1700;

export default function SixPillars() {
  const outerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (vw < 1024) return;

      // Desktop (lg+): pinned viewport, cards 02..06 slide in sequentially from the right edge
      const outer = outerRef.current;
      if (!outer) return;

      const { top, height } = outer.getBoundingClientRect();
      const scrolled = -top;
      const scrollableH = Math.max(height - vh, 1);
      const progress = Math.min(Math.max(scrolled / scrollableH, 0), 1);

      const total = PILLARS.length;
      let settledCount = 1;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        if (i === 0) {
          card.style.transform = "translate3d(0px, 0, 0)";
          card.style.opacity = "1";
          return;
        }

        // Distribute cards 1..5 across progress 0.02 -> 0.88
        const stepSpan = 0.86 / (total - 1);
        const start = 0.02 + (i - 1) * stepSpan;
        const duration = stepSpan * 1.15;
        const raw = (progress - start) / duration;
        const t = Math.min(Math.max(raw, 0), 1);

        // Cubic ease-out
        const eased = 1 - Math.pow(1 - t, 3);
        const translateX = (1 - eased) * vw;

        card.style.transform = `translate3d(${translateX}px, 0, 0)`;
        card.style.opacity = t <= 0 ? "0" : String(Math.min(1, t * 4));

        if (t > 0.65) {
          settledCount = i + 1;
        }
      });

      if (countRef.current) {
        countRef.current.textContent = `0${settledCount} / 0${total}`;
      }
      if (barRef.current) {
        barRef.current.style.width = `${progress * 100}%`;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="six-s" className="bg-paper" style={{ isolation: "isolate" }}>
      {/* ── Mobile & tablet (< lg): horizontal swipe snap layout like ProductSection ── */}
      <div className="py-14 lg:hidden">
        <div className="mx-auto max-w-[1200px] px-5">
          <Reveal direction="left">
            <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-orange">
              <span className="h-px w-8 bg-orange/50" aria-hidden="true" />
              The 6S
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,4.2vw,2.6rem)] font-bold leading-[1.08] tracking-[-0.035em] text-navy text-balance">
              Built on six non-negotiables.
            </h2>
          </Reveal>

          <div className="mt-7 mb-4 flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
              6 pillars
            </p>
            <p className="text-[11px] font-semibold text-muted/60">Swipe →</p>
          </div>
        </div>

        <div
          className="hide-scrollbar flex gap-4 overflow-x-auto"
          style={{
            paddingLeft: "1.25rem",
            paddingRight: "1.25rem",
            scrollSnapType: "x mandatory",
          }}
        >
          {PILLARS.map((item) => (
            <div
              key={item.n}
              style={{ scrollSnapAlign: "start" }}
              className="flex min-h-[250px] w-[265px] shrink-0 flex-col justify-between rounded-2xl bg-navy p-5 text-white shadow-[0_16px_36px_-20px_rgba(3,73,130,0.45)]"
            >
              <div>
                <span className="font-display text-[19px] font-bold leading-none tracking-[-0.03em] text-orange/85">
                  {item.n}
                </span>
                <h3 className="mt-4 whitespace-pre-line font-display text-[15px] font-semibold leading-[1.25] tracking-[-0.015em] text-white/95">
                  {item.title}
                </h3>
              </div>
              <p className="mt-5 border-t border-white/10 pt-3.5 text-[12px] leading-relaxed text-white/60">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop (lg+): pinned viewport, 6-column row, each card slides in from the right ── */}
      <div
        ref={outerRef}
        style={{ height: `calc(100vh + ${EXTRA_SCROLL}px)` }}
        className="relative hidden lg:block"
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-[1320px] px-6">
            {/* Header row */}
            <div className="flex items-end justify-between gap-8">
              <Reveal direction="left">
                <div>
                  <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-orange">
                    <span className="h-px w-8 bg-orange/50" aria-hidden="true" />
                    The 6S
                  </p>
                  <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.035em] text-navy">
                    Built on six non-negotiables.
                  </h2>
                </div>
              </Reveal>

              <span
                ref={countRef}
                className="font-display text-[13px] font-bold tabular-nums tracking-[0.08em] text-muted"
              >
                01 / 06
              </span>
            </div>

            {/* 6-column row with larger cards and subtle typography */}
            <div className="mt-9 grid grid-cols-6 gap-4">
              {PILLARS.map((item, i) => (
                <div
                  key={item.n}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  style={{
                    transform: i === 0 ? "translate3d(0,0,0)" : "translate3d(100vw,0,0)",
                    opacity: i === 0 ? 1 : 0,
                  }}
                  className="flex min-h-[265px] flex-col justify-between rounded-2xl bg-navy p-5.5 text-white shadow-[0_22px_48px_-22px_rgba(3,73,130,0.55)] will-change-transform"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-[20px] font-bold leading-none tracking-[-0.03em] text-orange/85">
                        {item.n}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-white/25" />
                    </div>

                    <div className="my-3.5 h-px w-full bg-white/10" />

                    <h3 className="whitespace-pre-line font-display text-[14.5px] font-semibold leading-[1.28] tracking-[-0.015em] text-white/95">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-4 text-[11.5px] font-normal leading-[1.6] text-white/60">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Subtle bottom progress line */}
            <div className="mt-8 h-[2px] w-full overflow-hidden rounded-full bg-line">
              <div
                ref={barRef}
                className="h-full bg-navy"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
