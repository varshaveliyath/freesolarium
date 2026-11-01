"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Paperclip,
  X,
} from "lucide-react";

/* ─── helpers ─── */
const MAX_MB = 10;
const MAX_BYTES = MAX_MB * 1024 * 1024;

function FileUpload({
  id,
  label,
  hint,
  accept = "image/*,application/pdf",
  required = false,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  accept?: string;
  required?: boolean;
  value: File | null;
  onChange: (f: File | null) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-semibold text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-orange-500">*</span>}
        {hint && <span className="ml-1.5 font-normal text-slate-400">{hint}</span>}
      </label>
      <div
        onClick={() => ref.current?.click()}
        className={`flex min-h-[52px] cursor-pointer items-center gap-3 rounded-xl border-[1.5px] border-dashed px-4 py-3 transition-colors ${
          value
            ? "border-emerald-400 bg-emerald-50"
            : "border-slate-200 bg-white hover:border-orange-400 hover:bg-orange-50/40"
        }`}
      >
        <Paperclip className={`h-4 w-4 shrink-0 ${value ? "text-emerald-500" : "text-slate-400"}`} />
        <span className="flex-1 truncate text-[12.5px]">
          {value ? (
            <span className="font-medium text-emerald-700">{value.name}</span>
          ) : (
            <span className="text-slate-400">Click to upload</span>
          )}
        </span>
        {value && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onChange(null); if (ref.current) ref.current.value = ""; }}
            className="rounded-full p-0.5 text-slate-400 hover:text-red-500"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      <input
        ref={ref}
        id={id}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          if (f.size > MAX_BYTES) { alert(`File must be under ${MAX_MB} MB.`); return; }
          onChange(f);
        }}
      />
    </div>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[12px] font-semibold text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-orange-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-[11px] font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}

const inputCls =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-[13px] font-medium text-slate-800 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20";

const selectCls =
  "h-11 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-3.5 pr-10 text-[13px] font-medium text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20";

function Select({ id, options, value, onChange, placeholder }: {
  id: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectCls}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

const DISCOMS = ["UGVCL", "MGVCL", "DGVCL", "PGVCL", "TORRENT", "Other"];
const PROJECT_TYPES = ["Residential", "Commercial", "Industrial", "Other"];
const LOAN_OPTIONS = ["Yes", "No", "Maybe"];
const YES_NO = ["Yes", "No"];

/* ─── form state shape ─── */
type FormState = {
  referralPartner: string;
  referralNo: string;
  customerName: string;
  contactNo: string;
  pincode: string;
  city: string;
  email: string;
  discom: string;
  projectType: string;
  nameSame: string;
  loanRequirement: string;
  tentativePaymentDate: string;
  tokenAmount: string;
  quotationId: string;
  shadowLength: string;
  shadowWidth: string;
  remarks: string;
};

type FileState = {
  lightBill: File | null;
  passport: File | null;
  aadharFront: File | null;
  aadharBack: File | null;
  panCard: File | null;
  cheque: File | null;
  housePhoto: File | null;
  geoTagged: File | null;
  site1: File | null;
  site2: File | null;
};

const EMPTY_FORM: FormState = {
  referralPartner: "", referralNo: "", customerName: "", contactNo: "",
  pincode: "", city: "", email: "", discom: "", projectType: "",
  nameSame: "", loanRequirement: "", tentativePaymentDate: "",
  tokenAmount: "", quotationId: "", shadowLength: "", shadowWidth: "", remarks: "",
};

const EMPTY_FILES: FileState = {
  lightBill: null, passport: null, aadharFront: null, aadharBack: null,
  panCard: null, cheque: null, housePhoto: null, geoTagged: null,
  site1: null, site2: null,
};

/* ─── sections ─── */
const SECTIONS = ["Partner & Customer", "Documents", "Site Details", "Review & Submit"];

export default function BookPage() {
  const [section, setSection] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [files, setFiles] = useState<FileState>(EMPTY_FILES);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function set(key: keyof FormState, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function setFile(key: keyof FileState, f: File | null) {
    setFiles((s) => ({ ...s, [key]: f }));
  }

  /* simple validate for section 0 */
  function validateSection0() {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.customerName.trim()) next.customerName = "Required";
    if (!/^\d{10}$/.test(form.contactNo.replace(/\D/g, ""))) next.contactNo = "Enter a 10-digit number";
    if (!/^\d{6}$/.test(form.pincode)) next.pincode = "Enter a 6-digit pincode";
    if (!form.city.trim()) next.city = "Required";
    if (!form.discom) next.discom = "Required";
    if (!form.projectType) next.projectType = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function next() {
    if (section === 0 && !validateSection0()) return;
    setSection((s) => Math.min(s + 1, SECTIONS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prev() {
    setSection((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    setSubmitting(true);
    try {
      const body = new FormData();
      Object.entries(form).forEach(([k, v]) => body.set(k, v));
      Object.entries(files).forEach(([k, v]) => { if (v) body.set(k, v); });
      // POST to /api/order — same endpoint, or extend as needed
      await fetch("/api/order", { method: "POST", body });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      alert("Submission failed. Please try again or WhatsApp us.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ── SUCCESS STATE ── */
  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f9fc] px-5 text-center">
        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-[0_24px_80px_-16px_rgba(3,73,130,0.14)]">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-9 w-9 text-emerald-500" />
          </span>
          <h1 className="mt-5 text-[22px] font-bold tracking-tight text-[#034982]">Order Submitted!</h1>
          <p className="mt-2 text-[13.5px] leading-relaxed text-slate-500">
            Thank you, <strong className="text-slate-700">{form.customerName || "customer"}</strong>. Our team will review your details and reach out within 24 working hours.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-[#034982] px-6 text-[13px] font-bold text-white transition hover:bg-[#022b4e]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc]">

      {/* ── Top bar ── */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-3.5">
          <Link href="/" className="flex items-center gap-2 text-[13px] font-semibold text-[#034982] hover:text-[#022b4e]">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-500">Solarium</p>
            <p className="text-[13px] font-bold text-[#034982]">New Order Form</p>
          </div>
          <div className="text-right text-[11px] font-semibold text-slate-400">
            Step {section + 1}/{SECTIONS.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-[3px] bg-slate-100">
          <div
            className="h-full bg-orange-500 transition-all duration-500"
            style={{ width: `${((section + 1) / SECTIONS.length) * 100}%` }}
          />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-24 pt-8">

        {/* Section title */}
        <div className="mb-7">
          <div className="mb-4 flex items-center gap-2">
            {SECTIONS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                    i < section
                      ? "bg-emerald-500 text-white"
                      : i === section
                        ? "bg-orange-500 text-white"
                        : "border border-slate-200 bg-white text-slate-400"
                  }`}
                >
                  {i < section ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span className={`text-[11px] font-semibold ${i === section ? "text-[#034982]" : "text-slate-400"}`}>
                  {s}
                </span>
                {i < SECTIONS.length - 1 && <span className="mx-1 h-px w-6 bg-slate-200" />}
              </div>
            ))}
          </div>
          <h1 className="text-[22px] font-bold tracking-tight text-[#034982]">{SECTIONS[section]}</h1>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-[0_4px_32px_-8px_rgba(3,73,130,0.10)] sm:p-8">

          {/* ══ SECTION 0: Partner & Customer ══ */}
          {section === 0 && (
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="referralPartner" label="Referral Partner Name">
                  <input id="referralPartner" className={inputCls} placeholder="Partner name" value={form.referralPartner} onChange={(e) => set("referralPartner", e.target.value)} />
                </Field>
                <Field id="referralNo" label="Referral No.">
                  <input id="referralNo" className={inputCls} placeholder="e.g. SOL-REF-001" value={form.referralNo} onChange={(e) => set("referralNo", e.target.value)} />
                </Field>
              </div>

              <div className="h-px bg-slate-100" />
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Customer Details</p>

              <Field id="customerName" label="Name of Customer (As per Electricity Bill)" required error={errors.customerName}>
                <input id="customerName" className={inputCls} placeholder="Full name as on bill" value={form.customerName} onChange={(e) => set("customerName", e.target.value)} />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="contactNo" label="Contact No." required error={errors.contactNo}>
                  <input id="contactNo" className={inputCls} inputMode="numeric" placeholder="10-digit mobile" value={form.contactNo} onChange={(e) => set("contactNo", e.target.value.replace(/\D/g, "").slice(0, 10))} />
                </Field>
                <Field id="email" label="Customer Email ID">
                  <input id="email" type="email" className={inputCls} placeholder="email@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
                </Field>
                <Field id="pincode" label="Pincode" required error={errors.pincode}>
                  <input id="pincode" className={inputCls} inputMode="numeric" placeholder="6-digit pincode" value={form.pincode} onChange={(e) => set("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))} />
                </Field>
                <Field id="city" label="City" required error={errors.city}>
                  <input id="city" className={inputCls} placeholder="e.g. Ahmedabad" value={form.city} onChange={(e) => set("city", e.target.value)} />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="discom" label="DISCOM" required error={errors.discom}>
                  <Select id="discom" options={DISCOMS} value={form.discom} onChange={(v) => set("discom", v)} placeholder="Select DISCOM" />
                </Field>
                <Field id="projectType" label="Type of Project" required error={errors.projectType}>
                  <Select id="projectType" options={PROJECT_TYPES} value={form.projectType} onChange={(v) => set("projectType", v)} placeholder="Select type" />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="quotationId" label="Quotation ID">
                  <input id="quotationId" className={inputCls} placeholder="e.g. SOL-Q-2024-001" value={form.quotationId} onChange={(e) => set("quotationId", e.target.value)} />
                </Field>
                <Field id="tokenAmount" label="Token Amount">
                  <input id="tokenAmount" className={inputCls} inputMode="numeric" placeholder="₹" value={form.tokenAmount} onChange={(e) => set("tokenAmount", e.target.value)} />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="tentativePaymentDate" label="Tentative Payment Date">
                  <input id="tentativePaymentDate" type="date" className={inputCls} value={form.tentativePaymentDate} onChange={(e) => set("tentativePaymentDate", e.target.value)} />
                </Field>
                <Field id="loanRequirement" label="Loan Requirement">
                  <Select id="loanRequirement" options={LOAN_OPTIONS} value={form.loanRequirement} onChange={(v) => set("loanRequirement", v)} placeholder="Select" />
                </Field>
              </div>
            </div>
          )}

          {/* ══ SECTION 1: Documents ══ */}
          {section === 1 && (
            <div className="space-y-5">
              <p className="text-[12.5px] leading-relaxed text-slate-500">
                Upload clear photos/scans of each document. Max {MAX_MB} MB per file.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <FileUpload id="lightBill"   label="Light Bill (Latest)"        hint="JPG, PNG or PDF"  accept="image/*,application/pdf" value={files.lightBill}   onChange={(f) => setFile("lightBill", f)} />
                <FileUpload id="passport"    label="Passport Size Photograph"   hint="JPG or PNG"       accept="image/*"                 value={files.passport}    onChange={(f) => setFile("passport", f)} />
                <FileUpload id="aadharFront" label="Aadhaar Card Front"         hint="JPG or PNG"       accept="image/*"                 value={files.aadharFront} onChange={(f) => setFile("aadharFront", f)} />
                <FileUpload id="aadharBack"  label="Aadhaar Card Back"          hint="JPG or PNG"       accept="image/*"                 value={files.aadharBack}  onChange={(f) => setFile("aadharBack", f)} />
                <FileUpload id="panCard"     label="PAN Card"                   hint="JPG or PNG"       accept="image/*"                 value={files.panCard}     onChange={(f) => setFile("panCard", f)} />
                <FileUpload id="cheque"      label="Cancelled Cheque / Passbook" hint="JPG, PNG or PDF" accept="image/*,application/pdf" value={files.cheque}      onChange={(f) => setFile("cheque", f)} />
              </div>

              <div className="h-px bg-slate-100" />

              <Field id="nameSame" label="Is your name in Cancelled Cheque/Passbook and Electricity Bill the same?">
                <Select id="nameSame" options={YES_NO} value={form.nameSame} onChange={(v) => set("nameSame", v)} placeholder="Select" />
              </Field>
            </div>
          )}

          {/* ══ SECTION 2: Site Details ══ */}
          {section === 2 && (
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="shadowLength" label="(लम्बाई) Shadow Free Area (in mtr.)">
                  <input id="shadowLength" className={inputCls} inputMode="decimal" placeholder="Length in metres" value={form.shadowLength} onChange={(e) => set("shadowLength", e.target.value)} />
                </Field>
                <Field id="shadowWidth" label="(चौड़ाई) Shadow Free Area (in mtr.)">
                  <input id="shadowWidth" className={inputCls} inputMode="decimal" placeholder="Width in metres" value={form.shadowWidth} onChange={(e) => set("shadowWidth", e.target.value)} />
                </Field>
              </div>

              <div className="h-px bg-slate-100" />
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Site Photos</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <FileUpload
                  id="housePhoto"
                  label="House Photo (all floors visible)"
                  hint="JPG or PNG"
                  accept="image/*"
                  value={files.housePhoto}
                  onChange={(f) => setFile("housePhoto", f)}
                />
                <FileUpload
                  id="geoTagged"
                  label="Geo Tagged Photo (Solar Location)"
                  hint="JPG or PNG"
                  accept="image/*"
                  value={files.geoTagged}
                  onChange={(f) => setFile("geoTagged", f)}
                />
                <FileUpload
                  id="site1"
                  label="Site Photos & Videos 1"
                  hint="JPG, PNG or MP4"
                  accept="image/*,video/*"
                  value={files.site1}
                  onChange={(f) => setFile("site1", f)}
                />
                <FileUpload
                  id="site2"
                  label="Site Photos & Videos 2"
                  hint="JPG, PNG or MP4"
                  accept="image/*,video/*"
                  value={files.site2}
                  onChange={(f) => setFile("site2", f)}
                />
              </div>

              <div className="h-px bg-slate-100" />

              <Field id="remarks" label="Detailed Remarks">
                <textarea
                  id="remarks"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-[13px] font-medium text-slate-800 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                  placeholder="Any additional details about this order not captured above…"
                  value={form.remarks}
                  onChange={(e) => set("remarks", e.target.value)}
                />
              </Field>
            </div>
          )}

          {/* ══ SECTION 3: Review ══ */}
          {section === 3 && (
            <div className="space-y-6">
              <p className="text-[13px] leading-relaxed text-slate-500">
                Please review the key details below before submitting.
              </p>

              <div className="divide-y divide-slate-100 rounded-xl border border-slate-100 bg-slate-50">
                {[
                  ["Customer", form.customerName || "—"],
                  ["Contact", form.contactNo || "—"],
                  ["Email", form.email || "—"],
                  ["City / Pincode", [form.city, form.pincode].filter(Boolean).join(" – ") || "—"],
                  ["DISCOM", form.discom || "—"],
                  ["Project Type", form.projectType || "—"],
                  ["Referral Partner", form.referralPartner || "—"],
                  ["Quotation ID", form.quotationId || "—"],
                  ["Token Amount", form.tokenAmount ? `₹${form.tokenAmount}` : "—"],
                  ["Loan Requirement", form.loanRequirement || "—"],
                  ["Shadow Area", form.shadowLength && form.shadowWidth ? `${form.shadowLength} × ${form.shadowWidth} mtr` : "—"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-start gap-4 px-4 py-3">
                    <span className="w-40 shrink-0 text-[11.5px] font-semibold text-slate-500">{label}</span>
                    <span className="text-[12.5px] font-medium text-slate-800">{value}</span>
                  </div>
                ))}
              </div>

              {/* Documents uploaded */}
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Documents attached</p>
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(files) as [keyof FileState, File | null][])
                    .filter(([, f]) => f !== null)
                    .map(([key, f]) => (
                      <span key={key} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" />
                        {f!.name.length > 24 ? f!.name.slice(0, 22) + "…" : f!.name}
                      </span>
                    ))}
                  {Object.values(files).every((f) => f === null) && (
                    <span className="text-[12px] text-slate-400">No documents uploaded</span>
                  )}
                </div>
              </div>

              {form.remarks && (
                <div className="rounded-xl bg-slate-50 px-4 py-3">
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Remarks</p>
                  <p className="text-[12.5px] leading-relaxed text-slate-700">{form.remarks}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Navigation buttons ── */}
        <div className="mt-5 flex items-center justify-between gap-4">
          {section > 0 ? (
            <button
              type="button"
              onClick={prev}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-[13px] font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          ) : (
            <Link href="/" className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-[13px] font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
              <ArrowLeft className="h-4 w-4" />
              Cancel
            </Link>
          )}

          {section < SECTIONS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="group flex items-center gap-2 rounded-xl bg-[#034982] px-6 py-3 text-[13.5px] font-bold text-white shadow-[0_8px_24px_-8px_rgba(3,73,130,0.45)] transition hover:bg-[#022b4e]"
            >
              Continue
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-7 py-3 text-[13.5px] font-extrabold text-white shadow-[0_8px_24px_-8px_rgba(245,132,1,0.55)] transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin" />Submitting…</> : "Submit Order"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
