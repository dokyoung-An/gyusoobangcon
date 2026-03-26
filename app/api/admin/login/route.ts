import { NextResponse } from "next/server";
import { COOKIE_NAME, signAdminSession } from "@/lib/admin-session";

function adminPassword(): string {
  const p = process.env.CONTACT_ADMIN_PASSWORD;
  return p && p.length > 0 ? p : "";
}

export async function POST(request: Request) {
  const pwd = adminPassword();
  if (!pwd) {
    return NextResponse.json(
      { error: "CONTACT_ADMIN_PASSWORD 환경 변수를 설정해 주세요." },
      { status: 500 }
    );
  }

  const signingSecret = process.env.CONTACT_ADMIN_SECRET;
  if (!signingSecret || signingSecret.length < 16) {
    return NextResponse.json(
      { error: "CONTACT_ADMIN_SECRET(16자 이상)을 환경 변수로 설정해 주세요." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const password =
    body &&
    typeof body === "object" &&
    "password" in body &&
    typeof (body as { password: unknown }).password === "string"
      ? (body as { password: string }).password
      : "";

  if (password !== pwd) {
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  const token = signAdminSession();
  if (!token) {
    return NextResponse.json(
      { error: "세션을 발급할 수 없습니다. CONTACT_ADMIN_SECRET을 확인해 주세요." },
      { status: 500 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
