"use client";

import Image from "next/image";
import { ArrowRight, Check, ChevronDown, Download, PhoneCall, RefreshCw } from "lucide-react";
import { useState } from "react";
import { HERO_PRICE, PRICING, inr } from "../lib/content";
import Reveal from "./Reveal";

/* ─── Constants ─── */
const HERO_POINTS = [
  "5-year insurance included",
  "Pay & get 100% subsidy in return",
  "Installed by our own team",
];

const BUILDING_OPTIONS = [
  "G+1",
  "G+2",
  "G+3",
  "G+4",
  "G+5 and above",
] as const;

const HEIGHT_OPTIONS = [
  "0.5mt",
  "1mt",
  "1.5mt",
  "2mt",
  "2.5mt",
  "3mt",
  "3mt and above",
] as const;

type Category        = "general" | "sc-st" | null;
type FloorOption     = (typeof BUILDING_OPTIONS)[number] | "";
type StructureHeight = (typeof HEIGHT_OPTIONS)[number] | "";

/* ─── Choice button — light card variant ─── */
function ChoiceBtn({
  label,
  sub,
  active,
  missing,
  onClick,
}: {
  label: string;
  sub?: string;
  active: boolean;
  missing?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex flex-1 flex-col items-start rounded-xl border px-4 py-2.5 text-left transition-all duration-200 ${
        active
          ? "border-navy bg-navy text-white shadow-[0_6px_16px_-8px_rgba(3,73,130,0.4)]"
          : missing
          ? "border-orange/50 bg-orange/[0.04] text-navy hover:border-navy/30"
          : "border-slate-200 bg-slate-50 text-navy hover:border-navy/30 hover:bg-slate-100"
      }`}
    >
      <span className="text-[11.5px] font-bold leading-snug">{label}</span>
      {sub && (
        <span className={`mt-0.5 text-[9.5px] font-medium ${active ? "text-white/70" : "text-slate-400"}`}>
          {sub}
        </span>
      )}
    </button>
  );
}

/* ─── Quotation card (right panel) — full opaque white ─── */
function QuotationCard() {
  const [category, setCategory]               = useState<Category>(null);
  const [floor, setFloor]                     = useState<FloorOption>("");
  const [structureHeight, setStructureHeight] = useState<StructureHeight>("");
  const [name, setName]                       = useState("");
  const [phone, setPhone]                     = useState("");
  const [email, setEmail]                     = useState("");
  const [attempted, setAttempted]             = useState(false);
  const [callbackSent, setCallbackSent]       = useState(false);

  const validName  = name.trim().length > 1;
  const validPhone = /^\d{10}$/.test(phone);
  const validEmail = email.includes("@") && email.includes(".");

  const selectionsComplete = Boolean(category && floor && structureHeight);
  const needsCallback = floor === "G+5 and above" || structureHeight === "3mt and above";
  const allReady = selectionsComplete && validName && validPhone && validEmail;

  function reset() {
    setCategory(null);
    setFloor("");
    setStructureHeight("");
    setAttempted(false);
    setCallbackSent(false);
  }

  function handleActionClick() {
    if (!allReady) {
      setAttempted(true);
      return;
    }

    setAttempted(false);

    if (needsCallback) {
      setCallbackSent(true);
      return;
    }

    const file = category === "sc-st" ? "/quotation-sc-st.pdf" : "/quotation-general.pdf";
    const filename = category === "sc-st" ? "Solarium-Quotation-SC-ST.pdf" : "Solarium-Quotation-General.pdf";
    const link = document.createElement("a");
    link.href = file;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const baseInp = "h-[38px] w-full rounded-xl border bg-white px-3.5 text-[11px] font-medium text-navy outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-navy/40 focus:ring-1 focus:ring-navy/10";
  const baseSel = "h-[38px] w-full appearance-none rounded-xl border pl-3.5 pr-8 text-[11px] font-semibold text-navy outline-none transition hover:border-navy/30 focus:border-navy/40 focus:bg-white focus:ring-1 focus:ring-navy/10";

  return (
    <div
      id="quotation"
      className="relative overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_-20px_rgba(3,73,130,0.25)]"
      style={{ scrollMarginTop: "80px" }}
    >
      {/* Header */}
      <div className="border-b border-slate-100 px-6 py-3.5">
        <p className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-orange-deep">Get your quotation</p>
        <p className="mt-0.5 font-display text-[15.5px] font-extrabold leading-tight tracking-[-0.02em] text-navy">Download detailed pricing</p>
      </div>

      <div className="space-y-2.5 px-6 py-4">

        {/* Subsidy breakdown — 3-column */}
        <div className="grid grid-cols-3 divide-x divide-navy/15 overflow-hidden rounded-xl border border-navy/30">
          <div className="bg-slate-50 px-3.5 py-2 text-center">
            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400">System value</p>
            <p className="mt-0.5 text-[11px] font-bold text-navy">{inr(PRICING.systemValue)}</p>
          </div>
          <div className="bg-slate-50 px-3.5 py-2 text-center">
            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400">Total subsidy</p>
            <p className="mt-0.5 text-[11px] font-bold text-emerald-600">−{inr(PRICING.centralSubsidy + PRICING.stateSubsidy)}</p>
          </div>
          <div className="bg-navy px-3.5 py-2 text-center">
            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-white/60">Net investment</p>
            <p className="mt-0.5 text-[12.5px] font-extrabold tracking-tight text-white">{inr(HERO_PRICE)}*</p>
          </div>
        </div>

        {/* Category */}
        <div>
          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">Your category</p>
          <div className="flex gap-2">
            <ChoiceBtn
              label="General"
              sub="Standard subsidy"
              active={category === "general"}
              missing={attempted && !category}
              onClick={() => setCategory("general")}
            />
            <ChoiceBtn
              label="SC / ST"
              sub="Enhanced subsidy"
              active={category === "sc-st"}
              missing={attempted && !category}
              onClick={() => setCategory("sc-st")}
            />
          </div>
        </div>

        {/* Building & Structure Height Dropdowns */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="quote-building" className="mb-1 block text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
              Your building
            </label>
            <div className="relative">
              <select
                id="quote-building"
                value={floor}
                onChange={(e) => {
                  setFloor(e.target.value as FloorOption);
                  setCallbackSent(false);
                }}
                className={`${baseSel} ${
                  attempted && !floor
                    ? "border-orange/50 bg-orange/[0.04]"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <option value="" disabled>Select floor</option>
                {BUILDING_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div>
            <label htmlFor="quote-height" className="mb-1 block text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
              Structure height
            </label>
            <div className="relative">
              <select
                id="quote-height"
                value={structureHeight}
                onChange={(e) => {
                  setStructureHeight(e.target.value as StructureHeight);
                  setCallbackSent(false);
                }}
                className={`${baseSel} ${
                  attempted && !structureHeight
                    ? "border-orange/50 bg-orange/[0.04]"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <option value="" disabled>Select height</option>
                {HEIGHT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Contact fields — 2 on top row (Full name + Phone), Email full width below */}
        <div>
          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">Your details</p>
          <div className="grid grid-cols-2 gap-2">
            <input
              className={`${baseInp} ${attempted && !validName ? "border-orange/50 bg-orange/[0.03]" : "border-slate-200"}`}
              type="text"
              placeholder="Full name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={`${baseInp} ${attempted && !validPhone ? "border-orange/50 bg-orange/[0.03]" : "border-slate-200"}`}
              type="tel"
              inputMode="numeric"
              placeholder="Phone number"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            />
            <input
              className={`${baseInp} col-span-2 ${attempted && !validEmail ? "border-orange/50 bg-orange/[0.03]" : "border-slate-200"}`}
              type="email"
              placeholder="Email address"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Subtle, refined inline hint when fields are incomplete */}
        {attempted && !allReady && (
          <div className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-50 px-3 py-2 text-[10px] font-medium text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
            <span>Complete the highlighted fields above to continue</span>
          </div>
        )}

        {/* Always-visible Download / Callback CTA */}
        {callbackSent ? (
          <div className="flex items-center justify-between gap-2.5 rounded-xl border border-navy/15 bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                <Check className="h-3 w-3" strokeWidth={2.5} />
              </span>
              <p className="text-[10.5px] font-semibold leading-snug text-navy">
                Thank you! The Solarium team will reach out to you shortly.
              </p>
            </div>
            <button type="button" onClick={reset} className="text-slate-400 hover:text-navy">
              <RefreshCw className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleActionClick}
            className="group flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-navy px-4 text-[11px] font-bold text-white shadow-[0_8px_20px_-10px_rgba(3,73,130,0.45)] transition-all duration-200 hover:bg-navy-deep"
          >
            {needsCallback ? (
              <>
                <PhoneCall className="h-3.5 w-3.5 text-orange" />
                Request callback from Solarium team
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5 text-orange transition-transform duration-300 group-hover:translate-y-0.5" />
                Download my quotation PDF
              </>
            )}
          </button>
        )}
      </div>

    </div>
  );
}

/* ─── Main export ─── */
export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-banner.png"
          alt="Solarium rooftop solar system"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#022b4e]/55 via-[#034982]/35 to-[#034982]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#022b4e]/30 via-transparent to-[#022b4e]/15" />
      </div>

      {/* Decorative dots */}
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
        <div className="bg-dots absolute inset-0 opacity-[0.06]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy-line/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] gap-8 px-4 pb-12 pt-[calc(56px+2rem)] sm:px-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:px-6 lg:pb-16 lg:pt-[calc(56px+2.5rem)]">

        {/* ── Left — Hero copy ── */}
        <div>
          <Reveal direction="left" delay={0}>
            <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-orange">
              <span className="h-px w-8 bg-orange/60" aria-hidden="true" />
              Under PM Surya Ghar · Gujarat homes
            </p>
          </Reveal>

          <Reveal direction="left" delay={80}>
            <h1 className="mt-4 max-w-[16ch] text-[clamp(2.2rem,6.8vw,4.6rem)] font-extrabold leading-[1.0] tracking-[-0.04em] text-white">
              Solar for your home at{" "}
              <span className="mt-1.5 inline-block rounded-xl bg-orange px-3.5 pb-1 pt-0.5 text-white">
                {inr(HERO_PRICE)}
                <span className="align-top text-[0.42em] font-bold">*</span>
              </span>
            </h1>
          </Reveal>

          <Reveal direction="left" delay={160}>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {HERO_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-1.5 text-[12px] font-semibold text-white/85">
                  <Check className="h-3 w-3 shrink-0 text-white" strokeWidth={2.5} />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="up" delay={240}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="/book"
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-orange px-6 text-[13.5px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(223,122,28,0.45)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#cc6d14]"
              >
                Book my system
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#how"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-white px-5 text-[13px] font-bold text-navy shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
              >
                See how it works
              </a>
            </div>
          </Reveal>

          <Reveal direction="up" delay={300}>
            <p className="mt-6 text-[10px] leading-[1.6] text-white/35">
              *After central ({inr(PRICING.centralSubsidy)}) and Gujarat state ({inr(PRICING.stateSubsidy)}) subsidy. Subject to eligibility and scheme terms.
            </p>
          </Reveal>
        </div>

        {/* ── Right — Quotation card ── */}
        <Reveal direction="right" delay={140}>
          <QuotationCard />
        </Reveal>
      </div>
    </section>
  );
}
