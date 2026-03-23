"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminInquiriesToolbar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void logout()}
      disabled={loading}
      className="shrink-0 rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 disabled:opacity-60"
    >
      {loading ? "로그아웃 중…" : "로그아웃"}
    </button>
  );
}
