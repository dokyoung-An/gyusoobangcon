import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { COOKIE_NAME, verifyAdminSession } from "@/lib/admin-session";
import { FLOOR_PLAN_TYPES } from "@/lib/floorplan-data";
import { listInquiries } from "@/lib/inquiries/repository";
import { AdminInquiriesToolbar } from "./AdminInquiriesToolbar";
import { DeleteInquiryButton } from "./DeleteInquiryButton";

type SearchParams = {
  page?: string;
};

export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const c = await cookies();
  if (!verifyAdminSession(c.get(COOKIE_NAME)?.value)) {
    redirect("/admin/login");
  }

  const allRows = await listInquiries();

  const pageSize = 10;
  const currentPage = (() => {
    const raw = searchParams?.page;
    const n = raw ? Number(raw) : 1;
    if (!Number.isFinite(n) || n < 1) return 1;
    return Math.floor(n);
  })();

  const totalPages = Math.max(1, Math.ceil(allRows.length / pageSize));
  const page = Math.min(currentPage, totalPages);

  const start = (page - 1) * pageSize;
  const rows = allRows.slice(start, start + pageSize);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <div className="flex flex-col gap-4 border-b border-neutral-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-[#1a3329]">
            상담 문의 목록
          </h1>
          <p className="mt-1 text-sm text-neutral-600">이 페이지는 관리자 전용입니다.</p>
        </div>
        <AdminInquiriesToolbar />
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] border-collapse text-center text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/90">
              <th className="px-4 py-3 font-semibold text-[#1a3329]">번호</th>
              <th className="px-4 py-3 font-semibold text-[#1a3329]">날짜</th>
              <th className="px-4 py-3 font-semibold text-[#1a3329]">성함</th>
              <th className="px-4 py-3 font-semibold text-[#1a3329]">연락처</th>
              <th className="px-4 py-3 font-semibold text-[#1a3329]">방문 시간</th>
              <th className="px-4 py-3 font-semibold text-[#1a3329]">관심 타입</th>
              <th className="px-4 py-3 font-semibold text-[#1a3329]">개인정보 동의</th>
              <th className="px-4 py-3 font-semibold text-[#1a3329]">삭제</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-neutral-500">
                  아직 문의가 없습니다.
                </td>
              </tr>
            ) : (
              rows.map((r, idx) => (
                <tr key={r.id} className="hover:bg-neutral-50/80">
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-neutral-700">
                    {start + idx + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-neutral-700">
                    {formatDate(r.createdAt)}
                  </td>
                  <td className="px-4 py-3 font-medium text-[#1a3329]">{r.name}</td>
                  <td className="px-4 py-3 tabular-nums text-neutral-800">{r.phone}</td>
                  <td className="max-w-48 px-4 py-3 text-neutral-600">
                    {r.visitTime || "미기입"}
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    {r.interestType
                      ? (FLOOR_PLAN_TYPES.find((t) => t.id === r.interestType)?.tabLabel ??
                          r.interestType)
                      : "미기입"}
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    {r.privacyConsent ? "동의함" : "미동의"}
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    <DeleteInquiryButton id={r.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-neutral-500">
          총 {allRows.length}건 · {page}/{totalPages}페이지
        </div>

        <div className="flex items-center gap-2">
          {page > 1 ? (
            <Link
              href={`/admin/inquiries?page=${page - 1}`}
              className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-medium text-neutral-800 hover:bg-neutral-50"
            >
              이전
            </Link>
          ) : (
            <span className="cursor-not-allowed rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-medium text-neutral-400">
              이전
            </span>
          )}

          {page < totalPages ? (
            <Link
              href={`/admin/inquiries?page=${page + 1}`}
              className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-medium text-neutral-800 hover:bg-neutral-50"
            >
              다음
            </Link>
          ) : (
            <span className="cursor-not-allowed rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-medium text-neutral-400">
              다음
            </span>
          )}
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-neutral-500">
        <Link href="/contact" className="underline-offset-2 hover:underline">
          문의 페이지로 돌아가기
        </Link>
      </p>
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("ko-KR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(d);
  } catch {
    return iso;
  }
}
