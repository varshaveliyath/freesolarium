import Image from "next/image";
import Reveal from "./Reveal";

const CLIENT_LOGOS = [
  { src: "/clients/indian-airforce.png", alt: "Indian Air Force" },
  { src: "/clients/indian-army.png",     alt: "Indian Army" },
  { src: "/clients/drdo.webp",           alt: "DRDO" },
  { src: "/clients/indian-railways.png", alt: "Indian Railways" },
  { src: "/clients/ntpc.png",            alt: "NTPC" },
  { src: "/clients/lic.webp",            alt: "LIC" },
  { src: "/clients/geb.png",             alt: "Gujarat Electricity Board" },
  { src: "/clients/bank-of-india.webp",  alt: "Bank of India" },
  { src: "/clients/itbp.png",            alt: "ITBP" },
  { src: "/clients/hindustan-petroleum.webp", alt: "Hindustan Petroleum" },
  { src: "/clients/counter-insurgency-force.webp", alt: "Counter Insurgency Force" },
  { src: "/clients/agl.webp",            alt: "AGL" },
  { src: "/clients/ahmedabad-university.webp", alt: "Ahmedabad University" },
  { src: "/clients/gudc.webp",           alt: "Gujarat Urban Development Company" },
  { src: "/clients/goa-shipyard.webp",   alt: "Goa Shipyard" },
  { src: "/clients/bsf.webp",            alt: "Border Security Force" },
];

export default function Institutions() {
  return (
    <section id="clients" className="border-y border-line bg-white py-14 lg:py-20">
      <div className="mx-auto grid max-w-[1200px] gap-9 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14 lg:px-6">

        {/* ── Left: copy ── */}
        <Reveal direction="left">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">
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
        <div>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {CLIENT_LOGOS.map((logo, i) => (
              <Reveal key={logo.alt} direction="scale" delay={(i % 4) * 55 + Math.floor(i / 4) * 45}>
                <div className="flex h-16 items-center justify-center rounded-xl border border-line bg-paper/60 p-2 transition-all duration-200 hover:border-line-strong hover:bg-white hover:shadow-sm sm:h-22 sm:p-3">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={64}
                    className="max-h-9 w-auto max-w-full object-contain sm:max-h-12"
                  />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={220}>
            <p className="mt-4 text-[10px] leading-relaxed text-muted">
              Institution names refer to projects executed. No endorsement of
              this offer is implied.
            </p>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
