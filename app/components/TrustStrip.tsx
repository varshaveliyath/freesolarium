import { TRUST_STATS } from "../lib/content";
import Reveal from "./Reveal";

export default function TrustStrip() {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-[1200px] px-5 py-10 lg:px-6">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-0">
          {TRUST_STATS.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 70}
              className={index > 0 ? "sm:border-l sm:border-white/10 sm:pl-7" : ""}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-[26px] font-extrabold leading-none tracking-[-0.03em] text-white sm:text-[30px]">
                  {stat.value}
                </span>
                <span className="mt-2 block text-[11px] font-medium leading-snug text-white/50">
                  {stat.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
