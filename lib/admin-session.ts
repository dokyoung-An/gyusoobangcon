import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "gyusoobang_admin_session";

function getSecret(): string {
  const s = process.env.CONTACT_ADMIN_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV === "development") {
    return "dev-contact-admin-secret-min-16-chars";
  }
  return "";
}

export { COOKIE_NAME };

export function signAdminSession(): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
  const payload = JSON.stringify({ v: 1, exp });
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return Buffer.from(JSON.stringify({ p: payload, s: sig }), "utf8").toString(
    "base64url"
  );
}

export function verifyAdminSession(token: string | undefined): boolean {
  if (!token) return false;
  const secret = getSecret();
  if (!secret) return false;
  try {
    const raw = Buffer.from(token, "base64url").toString("utf8");
    const { p, s } = JSON.parse(raw) as { p: string; s: string };
    const expected = createHmac("sha256", secret).update(p).digest("hex");
    const a = Buffer.from(s, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length) return false;
    if (!timingSafeEqual(a, b)) return false;
    const { exp } = JSON.parse(p) as { exp: number };
    return typeof exp === "number" && exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}
