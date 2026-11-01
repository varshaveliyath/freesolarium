"use client";

import Image from "next/image";
import { ArrowRight, Check, Download, FileText, RefreshCw } from "lucide-react";
import { useState } from "react";
import { HERO_PRICE, PRICING, inr } from "../lib/content";
import Reveal from "./Reveal";

/* ─── Constants ─── */
const HERO_POINTS = [
  "5-year insurance included",
  "No payment now",
  "Installed by our own team",
];

/* ─── Quotation map: category + floor → PDF ─── */
const QUOTATION_MAP: Record<string, { file: string; filename: string; label: string }> = {
  "general|ground":  { file: "/quotation-general.pdf",        filename: "Solarium-Quotation-General.pdf",       label: "General Category — Ground / G+1" },
  "general|multi":   { file: "/quotation-general.pdf",        filename: "Solarium-Quotation-General.pdf",       label: "General Category — G+2 & above" },
  "sc-st|ground":    { file: "/quotation-sc-st.pdf",          filename: "Solarium-Quotation-SC-ST.pdf",         label: "SC / ST Category — Ground / G+1" },
  "sc-st|multi":     { file: "/quotation-sc-st.pdf",          filename: "Solarium-Quotation-SC-ST.pdf",         label: "SC / ST Category — G+2 & above" },
};

type Category = "general" | "sc-st" | null;
type Floor    = "ground"  | "multi" | null;

/* ─── Choice button — light card variant ─── */
function ChoiceBtn({
  label,
  sub,
  active,
  onClick,
}: {
  label: string;
  sub?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex flex-1 flex-col items-start rounded-xl border-2 px-4 py-2.5 text-left transition-all duration-200 ${
        active
          ? "border-navy bg-navy text-white shadow-[0_8px_20px_-10px_rgba(3,73,130,0.45)]"
          : "border-slate-200 bg-slate-50 text-navy hover:border-navy/40 hover:bg-slate-100"
      }`}
    >
      <span className="text-[12.5px] font-bold leading-snug">{label}</span>
      {sub && (
        <span className={`mt-0.5 text-[10.5px] font-medium ${active ? "text-white/60" : "text-slate-400"}`}>
          {sub}
        </span>
      )}
    </button>
  );
}

/* ─── Quotation card (right panel) — white compact ─── */
function QuotationCard() {
  const [category, setCategory] = useState<Category>(null);
  const [floor, setFloor]       = useState<Floor>(null);
  const [name, setName]         = useState("");
  const [phone, setPhone]       = useState("");
  const [pincode, setPincode]   = useState("");
  const [email, setEmail]       = useState("");

  const key    = category && floor ? `${category}|${floor}` : null;
  const result = key ? QUOTATION_MAP[key] : null;

  const formDone = name.trim().length > 1
    && /^\d{10}$/.test(phone)
    && /^\d{6}$/.test(pincode)
    && email.includes("@");

  const canDownload = Boolean(result) && formDone;

  function reset() { setCategory(null); setFloor(null); }

  const inp = "h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-[12px] font-medium text-navy outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-navy/40 focus:ring-2 focus:ring-navy/10";

  return (
    <div
      id="quotation"
      className="relative overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_-20px_rgba(3,73,130,0.22)]"
      style={{ scrollMarginTop: "80px" }}
    >
      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-2.5">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Get your quotation</p>
        <p className="text-[13.5px] font-bold text-navy">Download detailed pricing</p>
      </div>

      <div className="space-y-3 px-5 py-3">

        {/* Subsidy breakdown — compact 3-column */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 overflow-hidden rounded-xl border border-slate-100">
          <div className="bg-slate-50 px-3 py-2 text-center">
            <p className="text-[8.5px] font-bold uppercase tracking-[0.1em] text-slate-400">System value</p>
            <p className="text-[12px] font-bold text-navy">{inr(PRICING.systemValue)}</p>
          </div>
          <div className="bg-slate-50 px-3 py-2 text-center">
            <p className="text-[8.5px] font-bold uppercase tracking-[0.1em] text-slate-400">Total subsidy</p>
            <p className="text-[12px] font-bold text-emerald-600">−{inr(PRICING.centralSubsidy + PRICING.stateSubsidy)}</p>
          </div>
          <div className="bg-navy px-3 py-2 text-center">
            <p className="text-[8.5px] font-bold uppercase tracking-[0.1em] text-white/50">You pay</p>
            <p className="text-[14px] font-extrabold tracking-tight text-white">{inr(HERO_PRICE)}*</p>
          </div>
        </div>

        {/* Category */}
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Your category</p>
          <div className="flex gap-2">
            <ChoiceBtn label="General" sub="Standard subsidy" active={category === "general"} onClick={() => setCategory("general")} />
            <ChoiceBtn label="SC / ST" sub="Enhanced subsidy" active={category === "sc-st"}  onClick={() => setCategory("sc-st")} />
          </div>
        </div>

        {/* Building */}
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Your building</p>
          <div className="flex gap-2">
            <ChoiceBtn label="Ground / G+1" sub="Standard" active={floor === "ground"} onClick={() => setFloor("ground")} />
            <ChoiceBtn label="G+2 & above" sub="Multi-floor" active={floor === "multi"} onClick={() => setFloor("multi")} />
          </div>
        </div>

        {/* Contact fields — always visible, 2×2 grid */}
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Your details</p>
          <div className="grid grid-cols-2 gap-2">
            <input className={inp} type="text" placeholder="Full name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className={inp} type="email" placeholder="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className={inp} type="tel" inputMode="numeric" placeholder="Phone" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} />
            <input className={inp} type="text" inputMode="numeric" placeholder="Pincode" autoComplete="postal-code" value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))} />
          </div>
        </div>

        {/* Download / placeholder */}
        {canDownload && result ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <FileText className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              <span className="flex-1 text-[11px] font-semibold text-navy">{result.label}</span>
              <button type="button" onClick={reset} className="text-slate-300 hover:text-slate-600"><RefreshCw className="h-3 w-3" /></button>
            </div>
            <a
              href={result.file}
              download={result.filename}
              className="group flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-orange px-5 text-[13px] font-extrabold text-navy shadow-[0_10px_24px_-10px_rgba(245,132,1,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-deep"
            >
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              Download my quotation PDF
            </a>
          </div>
        ) : (
          <div className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 text-[12px] font-semibold text-slate-300">
            <Download className="h-4 w-4" />
            {!category || !floor ? "Select category & building" : "Fill your details"}
          </div>
        )}
      </div>

    </div>
  );
}

/* ─── Main export ─── */
export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-manufacturing.webp"
          alt="Solarium solar manufacturing facility"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#022b4e]/65 via-[#034982]/45 to-[#034982]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#022b4e]/40 via-transparent to-[#022b4e]/15" />
      </div>

      {/* Decorative dots */}
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
        <div className="bg-dots absolute inset-0 opacity-[0.06]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy-line/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1200px] gap-8 px-4 pb-12 pt-[calc(72px+2.5rem)] sm:px-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:px-6 lg:pb-16 lg:pt-[calc(72px+3.5rem)]">

        {/* ── Left — Hero copy ── */}
        <Reveal>
          <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-orange">
            <span className="h-px w-8 bg-orange/60" aria-hidden="true" />
            Under PM Surya Ghar · Gujarat homes
          </p>

          <h1 className="mt-4 max-w-[16ch] text-[clamp(2.2rem,6.8vw,4.6rem)] font-extrabold leading-[1.0] tracking-[-0.04em] text-white">
            Solar for your home at{" "}
            <span className="mt-1.5 inline-block rounded-xl bg-orange px-3.5 pb-1 pt-0.5 text-ink">
              {inr(HERO_PRICE)}
              <span className="align-top text-[0.42em] font-bold">*</span>
            </span>
          </h1>

          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {HERO_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-1.5 text-[11.5px] font-semibold text-white/75">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-navy-soft/60 ring-1 ring-white/20">
                  <Check className="h-2 w-2 text-orange" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="/book"
              className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-orange px-6 text-[13.5px] font-extrabold text-navy shadow-[0_12px_28px_-10px_rgba(245,132,1,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-deep"
            >
              Book my system
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#how"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/20 bg-white/8 px-5 text-[13px] font-semibold text-white/85 backdrop-blur-sm transition-all duration-200 hover:bg-white/14 hover:text-white"
            >
              See how it works
            </a>
          </div>

          <p className="mt-6 text-[10px] leading-[1.6] text-white/35">
            *After central ({inr(PRICING.centralSubsidy)}) and Gujarat state ({inr(PRICING.stateSubsidy)}) subsidy. Subject to eligibility and scheme terms.
          </p>
        </Reveal>

        {/* ── Right — Quotation card ── */}
        <Reveal delay={140}>
          <QuotationCard />
        </Reveal>
      </div>
    </section>
  );
}
