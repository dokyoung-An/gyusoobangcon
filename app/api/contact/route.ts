import { NextResponse } from "next/server";
import { saveInquiry } from "@/lib/inquiries/repository";
import type { ContactInquiryInput } from "@/lib/inquiries/types";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const o = body as Record<string, unknown>;
  const name = typeof o.name === "string" ? o.name.trim() : "";
  const phone = typeof o.phone === "string" ? o.phone.trim() : "";
  const visitTime =
    typeof o.visitTime === "string" && o.visitTime.trim()
      ? o.visitTime.trim()
      : null;
  const interestType =
    typeof o.interestType === "string" ? o.interestType.trim() : "";
  const privacyConsent = o.privacyConsent === true;
  const privacyConsentAt =
    typeof o.privacyConsentAt === "string" ? o.privacyConsentAt : "";

  if (!name || !phone) {
    return NextResponse.json(
      { error: "성함과 연락처는 필수입니다." },
      { status: 400 }
    );
  }
  if (!privacyConsent) {
    return NextResponse.json(
      { error: "개인정보 수집 및 이용에 동의해 주세요." },
      { status: 400 }
    );
  }

  const input: ContactInquiryInput = {
    name,
    phone,
    visitTime,
    interestType,
    privacyConsent,
    privacyConsentAt:
      privacyConsentAt && !Number.isNaN(Date.parse(privacyConsentAt))
        ? new Date(privacyConsentAt).toISOString()
        : new Date().toISOString(),
  };

  const result = await saveInquiry(input);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
