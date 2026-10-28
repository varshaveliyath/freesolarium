"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  FileText,
  Loader2,
  MessageCircle,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { HERO_PRICE, PRICING, inr, whatsappUrl } from "../lib/content";

type Floor = "ground" | "multi";
type Structure = "standard" | "elevated" | "unsure";
type FileKey = "bill" | "roof" | "front";
type Step = 1 | 2 | 3;
type FieldKey = "name" | "phone" | "pincode" | "consumer";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const DOCS: { key: FileKey; label: string; hint: string; accept: string }[] = [
  {
    key: "bill",
    label: "Latest electricity bill",
    hint: "JPG, PNG or PDF · up to 5 MB",
    accept: "image/*,application/pdf",
  },
  {
    key: "roof",
    label: "Rooftop photo",
    hint: "JPG or PNG · up to 5 MB",
    accept: "image/*",
  },
  {
    key: "front",
    label: "House front photo",
    hint: "JPG or PNG · up to 5 MB",
    accept: "image/*",
  },
];

const STEP_LABELS = ["Details", "Documents", "Reserved"];

function buildConfigSummary(floor: Floor, structure: Structure) {
  const floorName = floor === "multi" ? "G+2 and above" : "Ground / G+1";
  const structureName =
    structure === "elevated"
      ? "elevated structure"
      : structure === "unsure"
        ? "structure to be assessed"
        : "standard structure";
  return `${floorName} · ${structureName}`;
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[12.5px] font-bold text-navy"
      >
        {label} <span className="text-accent">*</span>
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[11px] font-semibold text-[#b3261e]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function OrderSummary({
  floor,
  structure,
}: {
  floor: Floor;
  structure: Structure;
}) {
  const custom =
    (floor === "multi" ? PRICING.multiFloorCost : 0) +
    (structure === "elevated" ? PRICING.elevatedCost : 0);
  const pending =
    (floor === "multi" && PRICING.multiFloorCost === 0) ||
    (structure === "elevated" && PRICING.elevatedCost === 0) ||
    structure === "unsure";
  const subsidy = PRICING.centralSubsidy + PRICING.stateSubsidy;
  const effective = HERO_PRICE + custom;

  const customLabel =
    custom > 0
      ? `${inr(custom)}${pending ? " + survey quote" : ""}`
      : pending
        ? "Quoted after survey"
        : "Included";

  return (
    <aside className="self-start rounded-2xl border border-line bg-white p-5 text-navy shadow-[0_8px_40px_-8px_rgba(3,73,130,0.12)] sm:p-7 lg:sticky lg:top-24">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-muted">
            Your order
          </p>
          <h3 className="mt-1.5 font-display text-[20px] font-bold leading-snug">
            Solarium 2.18 kW Home Solar
          </h3>
        </div>
        <span className="mt-0.5 shrink-0 rounded-full bg-mist px-2.5 py-1 text-[10px] font-bold text-accent">
          2.18 kW
        </span>
      </div>

      <p className="mt-1.5 text-[12.5px] text-muted">
        {buildConfigSummary(floor, structure)}
      </p>

      <dl className="mt-5 space-y-3 text-[13px]">
        <div className="flex items-start justify-between gap-4">
          <dt className="text-body">System value</dt>
          <dd className="font-semibold tabular-nums">{inr(PRICING.systemValue)}</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-body">Total eligible subsidy*</dt>
          <dd className="font-semibold tabular-nums text-accent">
            − {inr(subsidy)}
          </dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-body">5-year insurance</dt>
          <dd className="font-semibold text-accent">Free</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-body">Customisation</dt>
          <dd className="max-w-[150px] text-right font-semibold">
            {customLabel}
          </dd>
        </div>
      </dl>

      <div className="my-4 h-px bg-line" />

      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[12.5px] font-bold">Estimated effective cost</p>
          <span className="mt-1 inline-flex rounded-full bg-mist px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.12em] text-accent">
            Subsidy applied
          </span>
        </div>
        <p className="font-display text-[36px] font-extrabold leading-none tracking-[-0.05em]">
          {inr(effective)}
          <span className="align-top text-[16px] font-bold">*</span>
        </p>
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-muted">
        {pending
          ? "Customisation is quoted after your rooftop survey. You confirm the final amount before installation."
          : "Standard configuration. Final amount confirmed after your rooftop survey."}
      </p>

      <div className="mt-5 rounded-xl bg-paper p-4 text-[11.5px] leading-relaxed text-body">
        <p className="mb-1 flex items-center gap-1.5 font-bold text-navy">
          <ShieldCheck className="h-4 w-4 text-accent" />
          When do I pay?
        </p>
        No payment to reserve. After the survey you approve the final amount,
        and any subsidy is credited by the government directly to your bank
        account after commissioning and inspection.
      </div>
    </aside>
  );
}

export default function BookingSection() {
  const [floor, setFloor] = useState<Floor>("ground");
  const [structure, setStructure] = useState<Structure>("standard");
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    consumer: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [files, setFiles] = useState<Record<FileKey, File | null>>({
    bill: null,
    roof: null,
    front: null,
  });
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [booking, setBooking] = useState<{ id: string; message: string } | null>(
    null
  );
  const [copied, setCopied] = useState(false);

  const configSummary = buildConfigSummary(floor, structure);

  function updateField(key: FieldKey, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate() {
    const next: Partial<Record<FieldKey, string>> = {};
    if (form.name.trim().length < 2) {
      next.name = "Please enter your full name.";
    }
    if (form.phone.replace(/\D/g, "").length !== 10) {
      next.phone = "Enter a 10-digit mobile number.";
    }
    if (!/^\d{6}$/.test(form.pincode)) {
      next.pincode = "Enter a 6-digit pincode.";
    }
    if (form.consumer.trim().length < 6) {
      next.consumer = "Enter the consumer number from your bill.";
    }
    setErrors(next);

    const firstError = (Object.keys(next) as FieldKey[])[0];
    if (firstError) {
      document.getElementById(`booking-${firstError}`)?.focus();
      return false;
    }
    return true;
  }

  function goToDocuments() {
    if (!validate()) return;
    setStep(2);
  }

  function handleFile(key: FileKey, file: File | undefined) {
    if (!file) return;
    if (key !== "bill" && !file.type.startsWith("image/")) {
      setFileError("Please upload a JPG or PNG photo.");
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setFileError("Each file must be 5 MB or smaller.");
      return;
    }
    setFileError(null);
    setFiles((current) => ({ ...current, [key]: file }));
  }

  async function confirmOrder(skipUploads = false) {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const body = new FormData();
      body.set("name", form.name.trim());
      body.set("phone", form.phone.replace(/\D/g, ""));
      body.set("pincode", form.pincode);
      body.set("consumer", form.consumer.trim());
      body.set("floor", floor);
      body.set("structure", structure);
      body.set("config", configSummary);
      body.set("effectiveCost", String(HERO_PRICE));

      if (!skipUploads) {
        (Object.keys(files) as FileKey[]).forEach((key) => {
          const file = files[key];
          if (file) body.set(key, file);
        });
      }

      const response = await fetch("/api/order", {
        method: "POST",
        body,
      });

      if (!response.ok) {
        throw new Error("Order request failed");
      }

      const data = (await response.json()) as { id?: string };
      const id = data.id ?? "SOL-PENDING";

      setBooking({
        id,
        message: `Hi Solarium, I have reserved a 2.18 kW home solar system (${configSummary}). My booking ID is ${id}.`,
      });
      setStep(3);
    } catch {
      setSubmitError("We couldn't submit your order just now.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetOrder() {
    setForm({ name: "", phone: "", pincode: "", consumer: "" });
    setErrors({});
    setFiles({ bill: null, roof: null, front: null });
    setFileError(null);
    setSubmitError(null);
    setBooking(null);
    setCopied(false);
    setStep(1);
  }

  async function copyBookingId() {
    if (!booking) return;
    try {
      await navigator.clipboard.writeText(booking.id);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const inputClass =
    "h-12 w-full rounded-xl border border-line-strong bg-white px-3.5 text-[14px] font-medium text-navy outline-none transition placeholder:font-normal placeholder:text-muted/55 focus:border-orange focus:ring-2 focus:ring-orange/30";

  const optionClass = (active: boolean) =>
    `flex min-h-[68px] flex-1 basis-[158px] flex-col items-start justify-center gap-0.5 rounded-xl border-2 px-4 py-3 text-left transition-all duration-200 ${
      active
        ? "border-orange bg-orange text-navy shadow-[0_10px_24px_-14px_rgba(245,132,1,0.35)]"
        : "border-line-strong bg-white text-navy hover:border-orange/50 hover:bg-orange-soft/40"
    }`;

  return (
    <section id="book" className="relative overflow-hidden bg-white">
      {/* Subtle decorative accents on white */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-orange-soft/60 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[360px] w-[360px] rounded-full bg-mist/80 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-[1200px] gap-10 px-5 py-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14 lg:px-6 lg:py-24">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">
            Book your system
          </p>
          <h2 className="mt-3 max-w-[13ch] text-[clamp(2rem,4.6vw,3rem)] font-bold leading-[1.04] tracking-[-0.03em] text-navy text-balance">
            Tell us about your home
          </h2>
          <p className="mt-3 max-w-[34rem] text-[14px] leading-relaxed text-body sm:text-[15px]">
            The standard system fits a ground-floor-access roof with a
            standard-height structure. Anything else is quoted after the
            rooftop survey, before you confirm.
          </p>

          <div className="mt-7">
            <p className="mb-2.5 text-[13px] font-bold text-navy">
              <span className="mr-1.5 text-orange">1</span> Your building
            </p>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                aria-pressed={floor === "ground"}
                onClick={() => setFloor("ground")}
                className={optionClass(floor === "ground")}
              >
                <span className="text-[13.5px] font-bold">Ground / G+1</span>
                <span
                  className={`text-[11px] font-medium ${
                    floor === "ground" ? "text-navy/70" : "text-muted"
                  }`}
                >
                  Included
                </span>
              </button>
              <button
                type="button"
                aria-pressed={floor === "multi"}
                onClick={() => setFloor("multi")}
                className={optionClass(floor === "multi")}
              >
                <span className="text-[13.5px] font-bold">G+2 and above</span>
                <span
                  className={`text-[11px] font-medium ${
                    floor === "multi" ? "text-navy/70" : "text-muted"
                  }`}
                >
                  {PRICING.multiFloorCost > 0
                    ? `+ ${inr(PRICING.multiFloorCost)}`
                    : "Quoted after survey"}
                </span>
              </button>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2.5 text-[13px] font-bold text-navy">
              <span className="mr-1.5 text-orange">2</span> Structure height
            </p>
            <div className="flex flex-wrap gap-2.5">
              {(
                [
                  { id: "standard", label: "Standard height" },
                  { id: "elevated", label: "Elevated structure" },
                  { id: "unsure", label: "Not sure" },
                ] as const
              ).map((option) => {
                const active = structure === option.id;
                const sub =
                  option.id === "standard"
                    ? "Included"
                    : option.id === "elevated"
                      ? PRICING.elevatedCost > 0
                        ? `+ ${inr(PRICING.elevatedCost)}`
                        : "Quoted after survey"
                      : "We will assess";
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setStructure(option.id)}
                    className={optionClass(active)}
                  >
                    <span className="text-[13.5px] font-bold">
                      {option.label}
                    </span>
                    <span
                      className={`text-[11px] font-medium ${
                        active ? "text-navy/70" : "text-muted"
                      }`}
                    >
                      {sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Get Quotation ── */}
          <div className="mt-6">
            <p className="mb-2.5 text-[13px] font-bold text-navy">
              <span className="mr-1.5 text-orange">3</span> Get quotation
            </p>
            <p className="mb-3 text-[11.5px] leading-relaxed text-muted">
              Download the detailed system quotation for your category before booking.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {/* General quotation */}
              <a
                href="/quotation-general.pdf"
                download="Solarium-Quotation-General.pdf"
                className="group inline-flex min-h-[64px] flex-1 basis-[158px] flex-col items-start justify-center gap-0.5 rounded-xl border-2 border-line-strong bg-white px-4 py-3 text-left transition-all duration-200 hover:border-orange/50 hover:bg-orange-soft/40"
              >
                <span className="flex items-center gap-1.5 text-[13px] font-bold text-navy">
                  <svg className="h-4 w-4 shrink-0 text-orange-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0-3-3m3 3 3-3M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2M16 6l-4-4-4 4" />
                  </svg>
                  General Category
                </span>
                <span className="pl-5.5 text-[11px] font-medium text-muted">
                  Download PDF quotation
                </span>
              </a>

              {/* SC / ST quotation */}
              <a
                href="/quotation-sc-st.pdf"
                download="Solarium-Quotation-SC-ST.pdf"
                className="group inline-flex min-h-[64px] flex-1 basis-[158px] flex-col items-start justify-center gap-0.5 rounded-xl border-2 border-line-strong bg-white px-4 py-3 text-left transition-all duration-200 hover:border-orange/50 hover:bg-orange-soft/40"
              >
                <span className="flex items-center gap-1.5 text-[13px] font-bold text-navy">
                  <svg className="h-4 w-4 shrink-0 text-orange-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0-3-3m3 3 3-3M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2M16 6l-4-4-4 4" />
                  </svg>
                  SC / ST Category
                </span>
                <span className="pl-5.5 text-[11px] font-medium text-muted">
                  Download PDF quotation
                </span>
              </a>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-paper p-5 text-navy shadow-sm sm:p-7">
            <ol className="mb-6 flex items-center gap-2" aria-label="Order progress">
              {STEP_LABELS.map((label, index) => {
                const number = (index + 1) as Step;
                const complete = step > number;
                const current = step === number;
                return (
                  <li
                    key={label}
                    className="flex min-w-0 flex-1 items-center gap-2 last:flex-none"
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                        complete
                          ? "bg-accent text-white"
                          : current
                            ? "bg-orange text-navy"
                            : "border border-line-strong bg-transparent text-muted"
                      }`}
                      aria-current={current ? "step" : undefined}
                    >
                      {complete ? <Check className="h-3 w-3" strokeWidth={3} /> : number}
                    </span>
                    <span
                      className={`min-w-0 truncate text-[10px] font-semibold sm:text-[11px] ${
                        current ? "text-navy" : "text-muted"
                      }`}
                    >
                      {label}
                    </span>
                    {index < STEP_LABELS.length - 1 ? (
                      <span className="ml-1 h-px flex-1 bg-line" />
                    ) : null}
                  </li>
                );
              })}
            </ol>

            {step === 1 ? (
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-accent">
                  Step 1 of 2
                </p>
                <h3 className="mt-1 font-display text-[22px] font-bold tracking-tight">
                  Your details
                </h3>

                <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
                  <Field id="booking-name" label="Full name" error={errors.name}>
                    <input
                      id="booking-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      placeholder="e.g. Rajesh Patel"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "booking-name-error" : undefined}
                      className={inputClass}
                    />
                  </Field>

                  <Field
                    id="booking-phone"
                    label="Mobile number"
                    error={errors.phone}
                  >
                    <input
                      id="booking-phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(event) =>
                        updateField(
                          "phone",
                          event.target.value.replace(/\D/g, "").slice(0, 10)
                        )
                      }
                      placeholder="10-digit mobile"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "booking-phone-error" : undefined}
                      className={inputClass}
                    />
                  </Field>

                  <Field
                    id="booking-pincode"
                    label="Pincode"
                    error={errors.pincode}
                  >
                    <input
                      id="booking-pincode"
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      value={form.pincode}
                      onChange={(event) =>
                        updateField(
                          "pincode",
                          event.target.value.replace(/\D/g, "").slice(0, 6)
                        )
                      }
                      placeholder="e.g. 380051"
                      aria-invalid={Boolean(errors.pincode)}
                      aria-describedby={errors.pincode ? "booking-pincode-error" : undefined}
                      className={inputClass}
                    />
                  </Field>

                  <Field
                    id="booking-consumer"
                    label="Electricity consumer number"
                    error={errors.consumer}
                  >
                    <input
                      id="booking-consumer"
                      type="text"
                      value={form.consumer}
                      onChange={(event) =>
                        updateField("consumer", event.target.value)
                      }
                      placeholder="On your DISCOM bill"
                      autoComplete="off"
                      aria-invalid={Boolean(errors.consumer)}
                      aria-describedby={errors.consumer ? "booking-consumer-error" : undefined}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <button
                  type="button"
                  onClick={goToDocuments}
                  className="mt-5 flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-navy px-5 text-[15px] font-bold text-white transition-colors hover:bg-navy-soft"
                >
                  Reserve my system
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-3 text-[10.5px] leading-relaxed text-muted">
                  No payment now. By continuing you agree to be contacted by
                  Solarium for verification and installation.
                </p>
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-accent">
                  Step 2 of 2
                </p>
                <h3 className="mt-1 font-display text-[22px] font-bold tracking-tight">
                  Upload documents
                </h3>
                <p className="mt-1 text-[12px] leading-relaxed text-muted">
                  Speeds up verification. You can also send these later on
                  WhatsApp.
                </p>

                <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
                  {DOCS.map((doc) => {
                    const selected = files[doc.key];
                    return (
                      <label
                        key={doc.key}
                        htmlFor={`file-${doc.key}`}
                        className={`group flex cursor-pointer flex-col gap-1.5 rounded-xl border-[1.5px] border-dashed p-3.5 transition-colors ${
                          selected
                            ? "border-accent bg-mist/60"
                            : "border-line-strong bg-white hover:border-orange hover:bg-orange-soft/30"
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-paper">
                            <FileText className="h-4 w-4 text-navy" />
                          </span>
                          {selected ? (
                            <CheckCircle2 className="h-4 w-4 text-accent" />
                          ) : (
                            <Upload className="h-4 w-4 text-muted transition-colors group-hover:text-orange-deep" />
                          )}
                        </span>
                        <span className="mt-1 text-[12px] font-bold leading-snug">
                          {doc.label}
                        </span>
                        <span className="truncate text-[10.5px] text-muted">
                          {selected ? selected.name : doc.hint}
                        </span>
                        <input
                          id={`file-${doc.key}`}
                          type="file"
                          accept={doc.accept}
                          className="sr-only"
                          onChange={(event) =>
                            handleFile(doc.key, event.target.files?.[0])
                          }
                        />
                      </label>
                    );
                  })}
                </div>

                {fileError ? (
                  <p role="alert" className="mt-3 text-[11px] font-semibold text-[#b3261e]">
                    {fileError}
                  </p>
                ) : null}

                {submitError ? (
                  <p
                    role="alert"
                    className="mt-4 rounded-xl border border-[#e6b8b4] bg-[#fdf2f1] px-3.5 py-2.5 text-[11.5px] font-medium leading-relaxed text-[#8c1d18]"
                  >
                    {submitError} Please try again, or{" "}
                    <a
                      href={whatsappUrl(
                        `Hi Solarium, I'd like to book a 2.18 kW home solar system (${configSummary}).`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold underline decoration-[#8c1d18]/40 underline-offset-2"
                    >
                      message us on WhatsApp
                    </a>{" "}
                    and we&apos;ll take it from there.
                  </p>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={submitting}
                    className="flex min-h-[52px] items-center gap-1.5 rounded-xl border border-line-strong px-4 text-[13.5px] font-semibold transition-colors hover:bg-white disabled:opacity-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => confirmOrder(false)}
                    disabled={submitting}
                    className="flex min-h-[52px] flex-1 basis-[220px] items-center justify-center gap-2 rounded-xl bg-orange px-5 text-[14.5px] font-extrabold text-navy transition-colors hover:bg-[#ffc41a] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Reserving…
                      </>
                    ) : (
                      "Confirm my solar order"
                    )}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => confirmOrder(true)}
                  disabled={submitting}
                  className="mt-1.5 w-full px-1 py-2 text-left text-[12px] font-semibold text-accent transition-colors hover:text-navy disabled:opacity-50"
                >
                  Skip — I will send documents on WhatsApp
                </button>
              </div>
            ) : null}

            {step === 3 && booking ? (
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mist">
                  <CheckCircle2 className="h-7 w-7 text-accent" />
                </span>
                <h3 className="mt-4 font-display text-[25px] font-bold tracking-tight">
                  Your system is reserved
                </h3>
                <p className="mt-2 max-w-[30rem] text-[13.5px] leading-relaxed text-body">
                  Our team will call you on{" "}
                  <strong className="font-bold text-navy">
                    {form.phone || "your number"}
                  </strong>{" "}
                  within 24 working hours to schedule your rooftop survey.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5">
                  <span className="text-[11px] font-semibold text-muted">
                    Booking ID
                  </span>
                  <span className="font-mono text-[14px] font-bold tracking-wide">
                    {booking.id}
                  </span>
                  <button
                    type="button"
                    onClick={copyBookingId}
                    className="ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold text-accent transition-colors hover:bg-mist"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>

                <a
                  href={whatsappUrl(booking.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-[50px] items-center gap-2 rounded-xl bg-accent px-5 text-[14px] font-bold text-white transition-colors hover:bg-[#11603d]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat with us on WhatsApp
                </a>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-muted">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                    No payment taken
                  </span>
                  <button
                    type="button"
                    onClick={resetOrder}
                    className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-navy"
                  >
                    Book another system
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <OrderSummary floor={floor} structure={structure} />
      </div>
    </section>
  );
}
