import Image from "next/image";
import { JOURNEY } from "../lib/content";
import Reveal from "./Reveal";

export default function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden bg-navy py-16 text-paper lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-dots absolute inset-0 opacity-25" />
        <div className="sun-glow absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full opacity-25" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 lg:px-6">

        {/* ── Section label + headline ── */}
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">
            After you book
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,4.2vw,2.9rem)] font-bold leading-[1.05] tracking-[-0.035em]">
            From booking to solar power
          </h2>
          <p className="mt-3 max-w-[400px] text-[13px] leading-relaxed text-paper/55">
            Six steps, one team. You always know what happens next and what it costs.
          </p>
        </Reveal>

        {/* ── Two-column: 40% cards | 60% image ── */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">

          {/* Left: collapsed accordion cards — 40% */}
          <div className="flex w-full flex-col gap-2 lg:w-1/2 lg:shrink-0">
            {JOURNEY.map((item, index) => (
              <Reveal key={item.n} delay={index * 50}>
                    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-all duration-300 hover:border-orange/40 hover:bg-white/[0.08]">

                  {/* Header row */}
                  <div className="flex items-center gap-3">
                    <span className="font-display text-[18px] font-extrabold leading-none tracking-[-0.04em] text-orange shrink-0">
                      {item.n}
                    </span>
                    <div className="flex flex-1 items-center justify-between gap-2">
                      <h3 className="font-display text-[13.5px] font-bold leading-snug">
                        {item.title}
                      </h3>
                      <span className="shrink-0 rounded-md bg-orange/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-orange">
                        {item.when}
                      </span>
                    </div>
                  </div>

                  {/* Body — always visible */}
                  <p className="mt-2 pl-9 text-[12px] leading-relaxed text-paper/60">
                    {item.body}
                  </p>

                  {/* Bottom accent bar */}
                  <span
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange transition-all duration-300 group-hover:w-full"
                    aria-hidden="true"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          {/* Right: image — 60% */}
          <Reveal delay={80} className="hidden w-full lg:block lg:w-1/2 lg:self-center">
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-[28px] bg-orange/10 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/images/how-it-works-hero.png"
                  alt="Solarium solar installation process"
                  width={720}
                  height={600}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
