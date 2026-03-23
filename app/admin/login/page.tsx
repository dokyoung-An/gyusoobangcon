import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, verifyAdminSession } from "@/lib/admin-session";
import { AdminLoginForm } from "./AdminLoginForm";

export default async function AdminLoginPage() {
  const c = await cookies();
  if (verifyAdminSession(c.get(COOKIE_NAME)?.value)) {
    redirect("/admin/inquiries");
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-center font-serif text-xl font-semibold text-[#1a3329]">
          문의 관리 로그인
        </h1>
        <p className="mt-2 text-center text-xs text-neutral-500">
          이 페이지는 관리자 전용입니다. Supabase 인증 도입 시 이 방식은 교체될 수
          있습니다.
        </p>
        <AdminLoginForm />
      </div>
    </div>
  );
}
