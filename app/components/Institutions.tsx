import Image from "next/image";
import Reveal from "./Reveal";

const CLIENT_LOGOS = [
  { src: "/clients/indian-airforce.png", alt: "Indian Air Force" },
  { src: "/clients/indian-army.png",     alt: "Indian Army" },
  { src: "/clients/drdo.webp",           alt: "DRDO" },
  { src: "/clients/indian-railways.png", alt: "Indian Railways" },
  { src: "/clients/ntpc.png",            alt: "NTPC" },
  { src: "/clients/lic.webp",            alt: "LIC" },
];

export default function Institutions() {
  return (
    <section className="border-y border-line bg-white py-14 lg:py-20">
      <div className="mx-auto grid max-w-[1200px] gap-9 px-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16 lg:px-6">

        {/* ── Left: copy ── */}
        <Reveal>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
              Institutional track record
            </p>
            <h2 className="mt-4 max-w-[18ch] text-[clamp(1.75rem,3.6vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.035em] text-balance">
              The engineering we deliver to India&apos;s most demanding sites
            </h2>
            <p className="mt-4 max-w-[34rem] text-[14px] leading-relaxed text-body">
              Solarium has executed solar projects for the armed forces,
              research institutions, public sector undertakings and some of
              India&apos;s largest banks.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold text-navy">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
              Same engineering standards, now on your rooftop.
            </p>
          </div>
        </Reveal>

        {/* ── Right: logo grid ── */}
        <Reveal delay={100}>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-3">
            {CLIENT_LOGOS.map((logo) => (
              <div
                key={logo.alt}
                className="flex items-center justify-center rounded-xl border border-line bg-paper/60 p-5 transition-all duration-200 hover:border-line-strong hover:bg-white hover:shadow-sm"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={64}
                  className="h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>
          <p className="mt-4 text-[10px] leading-relaxed text-muted">
            Institution names refer to projects executed. No endorsement of
            this offer is implied.
          </p>
        </Reveal>

      </div>
    </section>
  );
}
