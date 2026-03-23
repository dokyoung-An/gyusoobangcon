"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteInquiryButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (loading) return;
    const ok = window.confirm("정말 삭제할까요?");
    if (!ok) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        alert(data?.error ?? "삭제에 실패했습니다.");
        return;
      }

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void onDelete()}
      disabled={loading}
      className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-medium text-neutral-800 transition hover:bg-neutral-50 disabled:opacity-60"
      aria-label="문의 삭제"
    >
      {loading ? "삭제 중…" : "삭제"}
    </button>
  );
}

