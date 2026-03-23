import { promises as fs } from "fs";
import path from "path";
import type { ContactInquiryInput, ContactInquiryRecord } from "@/lib/inquiries/types";
import { getSupabaseServiceClient } from "@/lib/supabase/service";

const LOCAL_FILE = path.join(process.cwd(), "data", "contact-inquiries.json");

async function ensureDataDir() {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
}

async function readLocalFile(): Promise<ContactInquiryRecord[]> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function newId(): string {
  return `inq_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

export async function saveInquiry(
  input: ContactInquiryInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  const interest = input.interestType?.trim();
  const row = {
    name: input.name.trim(),
    phone: input.phone.trim(),
    visit_time: input.visitTime?.trim() || null,
    interest_type: interest && interest.length > 0 ? interest : null,
    privacy_consent: input.privacyConsent,
    privacy_consent_at: input.privacyConsentAt,
  };

  const sb = getSupabaseServiceClient();
  if (sb) {
    const { error } = await sb.from("gyusoobangcon").insert(row);
    if (error) {
      console.error("[gyusoobangcon]", error);
      return { ok: false, error: "저장에 실패했습니다. 잠시 후 다시 시도해 주세요." };
    }
    return { ok: true };
  }

  if (process.env.NODE_ENV === "development") {
    await ensureDataDir();
    const list = await readLocalFile();
    const rec: ContactInquiryRecord = {
      id: newId(),
      createdAt: new Date().toISOString(),
      name: row.name,
      phone: row.phone,
      visitTime: row.visit_time ?? "",
      interestType: row.interest_type ?? "",
      privacyConsent: row.privacy_consent,
      privacyConsentAt: row.privacy_consent_at,
    };
    list.unshift(rec);
    await fs.writeFile(LOCAL_FILE, JSON.stringify(list, null, 2), "utf8");
    return { ok: true };
  }

  return {
    ok: false,
    error:
      "문의 저장 서버가 설정되지 않았습니다. 관리자에게 NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 설정을 요청해 주세요.",
  };
}

export async function listInquiries(): Promise<ContactInquiryRecord[]> {
  const sb = getSupabaseServiceClient();
  if (sb) {
    const { data, error } = await sb
      .from("gyusoobangcon")
      .select(
        "id, created_at, name, phone, visit_time, interest_type, privacy_consent, privacy_consent_at"
      )
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[list inquiries]", error);
      return [];
    }
    return (data ?? []).map((r) => ({
      id: String(r.id),
      createdAt: r.created_at as string,
      name: r.name as string,
      phone: r.phone as string,
      visitTime: (r.visit_time as string | null) ?? "",
      interestType: (r.interest_type as string | null) ?? "",
      privacyConsent: (r.privacy_consent as boolean | null) ?? false,
      privacyConsentAt: (r.privacy_consent_at as string | null) ?? "",
    }));
  }

  if (process.env.NODE_ENV === "development") {
    return readLocalFile();
  }

  return [];
}

export async function deleteInquiry(
  id: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const sb = getSupabaseServiceClient();

  if (sb) {
    const maybeNum = Number(id);
    const idValue = Number.isNaN(maybeNum) ? id : maybeNum;

    const { error } = await sb.from("gyusoobangcon").delete().eq("id", idValue);
    if (error) {
      console.error("[delete inquiry]", error);
      return { ok: false, error: "삭제에 실패했습니다. 잠시 후 다시 시도해 주세요." };
    }
    return { ok: true };
  }

  if (process.env.NODE_ENV === "development") {
    await ensureDataDir();
    const list = await readLocalFile();
    const next = list.filter((r) => r.id !== id);
    await fs.writeFile(LOCAL_FILE, JSON.stringify(next, null, 2), "utf8");
    return { ok: true };
  }

  return {
    ok: false,
    error: "문의 삭제 서버가 설정되지 않았습니다.",
  };
}
