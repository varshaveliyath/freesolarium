import { ArrowUpRight, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { DISCLAIMER, site } from "../lib/content";

const LINKS = [
  { label: "What you get", href: "#product" },
  { label: "How it works", href: "#how" },
  { label: "FAQ", href: "#faq" },
  { label: "Book my system", href: "#book" },
];

const SOCIALS = [
  { label: "LinkedIn", href: site.linkedin },
  { label: "Instagram", href: "https://www.instagram.com/solariumgreenenergy/" },
  { label: "YouTube", href: "https://www.youtube.com/@solariumgreenenergy" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-paper">
      <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-14 sm:pb-10 lg:px-6 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.7fr_1.05fr] lg:gap-14">
          <div>
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="5.2" fill="#F4B400" />
                <g stroke="#F4B400" strokeWidth="2" strokeLinecap="round">
                  <path d="M16 2.5v3.6M16 25.9v3.6M2.5 16h3.6M25.9 16h3.6" />
                  <path d="M6.5 6.5l2.5 2.5M23 23l2.5 2.5M25.5 6.5L23 9M9 23l-2.5 2.5" />
                </g>
              </svg>
              <span className="font-display text-[20px] font-extrabold tracking-[-0.03em]">
                {site.brand}
              </span>
            </div>
            <p className="mt-3 max-w-[300px] text-[12px] leading-relaxed text-paper/55">
              India&apos;s integrated solar company — modules, engineering and
              installation under one roof since 2018.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-semibold text-paper/65">
                <ShieldCheck className="h-3 w-3 text-orange" />
                BSE Listed
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-semibold text-paper/65">
                MNRE approved channel partner
              </span>
            </div>

            <div className="mt-5 flex items-center gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-paper/55 transition-colors hover:text-orange"
                >
                  {social.label}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-paper/65">
              On this page
            </h3>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[12.5px] font-medium text-paper/70 transition-colors hover:text-orange"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-paper/65">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3 text-[12.5px] text-paper/70">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-start gap-2.5 transition-colors hover:text-orange"
                >
                  <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange" />
                  <span>
                    {site.phoneDisplay}
                    <span className="block text-[10.5px] text-paper/55">
                      Toll-free · Mon–Sat, 9:30 am – 6:30 pm
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-2.5 transition-colors hover:text-orange"
                >
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange" />
                <span className="leading-relaxed">{site.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          id="disclaimer"
          className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-[10px] leading-[1.7] text-paper/55 sm:p-5"
        >
          <p>
            *{DISCLAIMER} &lsquo;#1 in Gujarat&rsquo;: PM Surya Ghar
            installation ranking, [SOURCE AND DATE]. Institution names refer to
            projects executed; no endorsement implied.
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-6 text-[10.5px] text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://solariumenergy.in/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-orange"
            >
              Privacy
            </a>
            <a href="#disclaimer" className="transition-colors hover:text-orange">
              Disclaimer
            </a>
            <a href="#top" className="inline-flex items-center gap-1 transition-colors hover:text-orange">
              Back to top
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
