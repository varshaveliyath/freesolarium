"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { site } from "../lib/content";

const NAV = [
  { label: "What you get", href: "#product" },
  { label: "How it works", href: "#how" },
  { label: "FAQ", href: "#faq" },
];

function BrandLogo() {
  return (
    <Image
      src="/images/solarium-logo.png"
      alt="Solarium Green Energy"
      width={3349}
      height={1119}
      priority
      sizes="136px"
      className="h-9 w-auto lg:h-10"
    />
  );
}

export default function Header() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden]   = useState(false);

  const lastY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      const diff = y - lastY.current;

      // Only trigger hide/show after passing 80px from top
      if (y > 80) {
        if (diff > 6)  setHidden(true);   // scrolling down → hide
        if (diff < -6) setHidden(false);  // scrolling up   → show
      } else {
        setHidden(false); // always show near top
      }

      setScrolled(y > 12);
      lastY.current = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-line bg-white/95 text-navy backdrop-blur-md
        rounded-b-2xl
        transition-all duration-300 ease-in-out
        ${scrolled ? "shadow-[0_18px_40px_-30px_rgba(3,73,130,0.45)]" : ""}
        ${hidden ? "-translate-y-full" : "translate-y-0"}
      `}
    >
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-4 px-5 lg:px-6">
        <a
          href="#top"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <BrandLogo />
          <span className="ml-1 hidden rounded-full border border-line bg-paper px-2.5 py-1 text-[10px] font-semibold tracking-wide text-muted sm:inline-block">
            BSE Listed
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-navy/70 transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.phoneHref}
            className="hidden items-center gap-1.5 text-sm font-semibold text-navy/70 transition-colors hover:text-accent xl:flex"
          >
            <Phone className="h-3.5 w-3.5 text-orange-deep" />
            {site.phoneDisplay}
          </a>
          <a
            href="#book"
            className="group inline-flex items-center gap-1.5 rounded-full bg-navy px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-navy-soft"
          >
            Book at ₹0
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="#book"
            className="inline-flex items-center gap-1 rounded-full bg-navy px-4 py-2 text-[12px] font-bold text-white"
          >
            Book at ₹0
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-full p-2 text-navy/70 transition-colors hover:bg-paper-deep hover:text-navy"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="rounded-b-2xl border-t border-white/10 bg-navy px-5 pb-6 pt-3 lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-3.5 text-[15px] font-medium text-paper/80"
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 py-3.5 text-sm font-semibold text-paper/80"
            >
              <Phone className="h-4 w-4 text-orange" />
              {site.phoneDisplay}
            </a>
          </nav>
          <a
            href="#book"
            onClick={() => setOpen(false)}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-orange px-5 py-3.5 text-sm font-bold text-ink"
          >
            Book my ₹0 system
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </header>
  );
}
