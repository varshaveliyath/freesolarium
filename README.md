# Solarium — ₹0 Home Solar Order Page

A single-page Next.js (App Router) site for Solarium's **2.18 kW home solar at ₹0 effective cost** offer under PM Surya Ghar.

Built from the client's `Solarium ₹0 Solar Order Page.html` content brief, redesigned as a production-ready Next.js page.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.tsx                  Fonts, metadata, global shell
  page.tsx                    Page composition + FAQ structured data
  globals.css                 Tailwind theme, textures, reveal/marquee animations
  lib/content.ts              All copy, pricing, contact details, FAQs
  components/
    Header.tsx                Sticky nav + mobile menu
    Hero.tsx                  Hero + price card
    BookingSection.tsx        Interactive 3-step order flow + live order summary
    TrustStrip.tsx
    ProductSection.tsx
    Institutions.tsx
    HowItWorks.tsx
    Faq.tsx
    FinalCta.tsx
    Footer.tsx
    MobileCta.tsx              Sticky mobile conversion bar
    Reveal.tsx                 Lightweight scroll reveal
  api/order/route.ts          Order endpoint (stores leads locally)
public/
  images/                     Hero / product imagery
```

Institution names are rendered as text pills rather than client logos: the supplied logo files were too small to use legibly on a single page.

## Before launch — please confirm

These values came from the client brief or the existing Solarium site. Anything marked **TODO** needs sign-off:

1. **Pricing** (`app/lib/content.ts` → `PRICING`)
   - System value ₹1,00,000
   - Central subsidy ₹63,240
   - Gujarat state subsidy ₹36,760
   - Effective cost ₹0
   - Multi-floor / elevated structure charges (currently `0` = "quoted after survey")
2. **Timelines** — survey and installation windows are intentionally non-committal ("we call to schedule", "after your approval"). Add real SLAs if the client wants them.
3. **Insurance** — insurer name, perils covered and claim process are referenced but not published. Add the policy document link if available.
4. **Ranking claim** — the footer retains `[SOURCE AND DATE]` for the “#1 in Gujarat” claim. Replace or remove it.
5. **Legal** — the footer links Privacy to `https://solariumenergy.in/privacy-policy/` and Disclaimer to the on-page disclaimer note. The main site has no Terms page, so no Terms link is included. Add CIN and registered address if the client wants them in the footer.
6. **Phone / WhatsApp** — uses the existing toll-free number `80030 80020` (`+91 80030 80020` for WhatsApp). Confirm WhatsApp is enabled on this number, or update `site.whatsappNumber`.
7. **Order handling** — `app/api/order/route.ts` writes each order to `.uploads/orders.jsonl` and stores uploaded documents under `.uploads/<booking-id>/`. This is a local fallback so no lead is lost during hand-off.
   - Connect it to the Solarium CRM / email service before going live.
   - On serverless hosts (e.g. Vercel) the filesystem is ephemeral — use object storage or a CRM webhook instead.
   - `.uploads/` is gitignored.

## Notes

- Uploads are capped at 5 MB per file and limited to JPG/PNG/WebP/HEIC/PDF.
- The booking form validates name, 10-digit mobile, 6-digit pincode and consumer number before continuing.
- All animations respect `prefers-reduced-motion`.
- Fonts: Inter (body) and Sora (display) via `next/font`.
