import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAME, verifyAdminSession } from "@/lib/admin-session";
import { deleteInquiry } from "@/lib/inquiries/repository";

export async function POST(request: Request) {
  const c = await cookies();
  if (!verifyAdminSession(c.get(COOKIE_NAME)?.value)) {
    return NextResponse.json({ error: "인증되지 않았습니다." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const o = body as Record<string, unknown>;
  const id = typeof o?.id === "string" ? o.id : "";
  if (!id) {
    return NextResponse.json({ error: "삭제할 항목의 id가 필요합니다." }, { status: 400 });
  }

  const result = await deleteInquiry(id);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}

