import { MessageCircle, Phone, Plus } from "lucide-react";
import { FAQS, site, whatsappUrl } from "../lib/content";
import Reveal from "./Reveal";

export default function Faq() {
  return (
    <section id="faq" className="bg-paper py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-6">
        <Reveal>
          <div className="lg:sticky lg:top-24">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
              Straight answers
            </p>
            <h2 className="mt-4 max-w-[10ch] text-[clamp(1.9rem,4.2vw,2.9rem)] font-bold leading-[1.05] tracking-[-0.035em] text-balance">
              Questions, answered.
            </h2>
            <p className="mt-4 max-w-[320px] text-[13.5px] leading-relaxed text-body">
              Everything worth knowing before you reserve. If something is
              still unclear, talk to a real person — no call centre.
            </p>

            <div className="mt-7 rounded-2xl border border-line bg-white p-5">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-muted">
                Talk to Solarium
              </p>
              <a
                href={site.phoneHref}
                className="mt-2 flex items-center gap-2 font-display text-[18px] font-bold tracking-tight text-navy transition-colors hover:text-accent"
              >
                <Phone className="h-4 w-4 text-orange-deep" />
                {site.phoneDisplay}
              </a>
              <a
                href={whatsappUrl(
                  "Hi Solarium, I have a question about the ₹0 home solar offer."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-accent transition-colors hover:text-navy"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Ask on WhatsApp
              </a>
              <p className="mt-3 border-t border-line pt-3 text-[10.5px] leading-relaxed text-muted">
                Mon–Sat, 9:30 am – 6:30 pm
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="border-t border-line">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="text-[14.5px] font-bold leading-snug text-navy transition-colors group-hover:text-accent">
                    {faq.q}
                  </span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-white text-accent transition-transform duration-300 group-open:rotate-45">
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </summary>
                <p className="max-w-[40rem] pb-5 pr-10 text-[13px] leading-[1.7] text-body">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
