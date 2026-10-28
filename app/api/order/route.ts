import { NextResponse } from "next/server";
import { appendFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_FILES = 3;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
]);
const FILE_KEYS = ["bill", "roof", "front"] as const;
const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function bookingReference() {
  let suffix = "";
  for (let index = 0; index < 6; index += 1) {
    suffix += REF_ALPHABET[Math.floor(Math.random() * REF_ALPHABET.length)];
  }
  return `SOL-${suffix}`;
}

function safeName(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-64) || "file";
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").replace(/\D/g, "");

    if (name.length < 2 || name.length > 120 || phone.length !== 10) {
      return NextResponse.json(
        { error: "Please check your name and mobile number." },
        { status: 400 }
      );
    }

    const id = bookingReference();
    const uploadDir = path.join(process.cwd(), ".uploads");
    const documents: string[] = [];

    let fileCount = 0;
    for (const key of FILE_KEYS) {
      const value = form.get(key);
      if (!(value instanceof File) || value.size === 0) continue;

      fileCount += 1;
      if (fileCount > MAX_FILES) {
        return NextResponse.json(
          { error: "Too many documents." },
          { status: 400 }
        );
      }
      if (value.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { error: "Each document must be 5 MB or smaller." },
          { status: 413 }
        );
      }
      if (value.type && !ALLOWED_TYPES.has(value.type)) {
        return NextResponse.json(
          { error: "Please upload JPG, PNG or PDF documents." },
          { status: 415 }
        );
      }

      const orderDir = path.join(uploadDir, id);
      await mkdir(orderDir, { recursive: true });
      const filename = `${key}-${safeName(value.name)}`;
      await writeFile(
        path.join(orderDir, filename),
        Buffer.from(await value.arrayBuffer())
      );
      documents.push(filename);
    }

    const order = {
      id,
      createdAt: new Date().toISOString(),
      name,
      phone,
      pincode: String(form.get("pincode") ?? ""),
      consumerNumber: String(form.get("consumer") ?? ""),
      building: String(form.get("floor") ?? ""),
      structure: String(form.get("structure") ?? ""),
      configuration: String(form.get("config") ?? ""),
      effectiveCost: Number(form.get("effectiveCost") ?? 0),
      documents,
    };

    // Local fallback store so no lead is lost while the CRM integration is pending.
    // TODO: forward `order` + documents to the Solarium CRM / email service.
    await mkdir(uploadDir, { recursive: true });
    await appendFile(
      path.join(uploadDir, "orders.jsonl"),
      `${JSON.stringify(order)}\n`,
      "utf8"
    );

    return NextResponse.json({ id });
  } catch (error) {
    console.error("[order] failed to record order", error);
    return NextResponse.json(
      { error: "We could not record this order. Please try again." },
      { status: 500 }
    );
  }
}
