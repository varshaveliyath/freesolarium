"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { HERO_PRICE, inr } from "../lib/content";

export default function MobileCta() {
  const [inBooking, setInBooking] = useState(false);

  useEffect(() => {
    const target = document.getElementById("book");
    if (!target || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        setInBooking(entries.some((entry) => entry.isIntersecting));
      },
      { threshold: 0.08 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (inBooking) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_30px_-20px_rgba(16,35,26,0.5)] backdrop-blur-md sm:hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5">
        <div>
          <p className="font-display text-[18px] font-extrabold leading-none tracking-[-0.03em] text-navy">
            {inr(HERO_PRICE)}
            <span className="align-top text-[10px] font-bold">*</span>
          </p>
          <p className="mt-1 text-[9.5px] font-semibold text-muted">
            Effective cost · 2.18 kW
          </p>
        </div>
        <a
          href="#book"
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-navy px-4 text-[12.5px] font-bold text-paper"
        >
          Book my system
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
