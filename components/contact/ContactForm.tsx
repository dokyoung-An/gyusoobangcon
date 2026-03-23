"use client";

import { useState } from "react";
import { FLOOR_PLAN_TYPES } from "@/lib/floorplan-data";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [interestType, setInterestType] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!name.trim() || !phone.trim()) {
      setStatus("err");
      setMessage("성함과 연락처를 입력해 주세요.");
      return;
    }

    if (!privacyConsent) {
      setStatus("err");
      setMessage("개인정보 수집 및 이용에 동의해 주세요.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          visitTime: visitTime || null,
          interestType,
          privacyConsent,
          privacyConsentAt: new Date().toISOString(),
        }),
      });

      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("err");
        setMessage(data.error ?? "전송에 실패했습니다.");
        return;
      }

      setStatus("ok");
      setMessage("접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");
      setName("");
      setPhone("");
      setVisitTime("");
      setInterestType("");
      setPrivacyConsent(false);
    } catch {
      setStatus("err");
      setMessage("네트워크 오류가 발생했습니다.");
    }
  }

  return (
    <section className="mt-14 md:mt-16">
      <h2 className="font-serif text-xl font-semibold text-[#1a3329] md:text-2xl">
        상담 접수
      </h2>
      <p className="mt-2 text-sm text-neutral-600">
        필수: 성함, 연락처 · 선택: 모델하우스 방문 시간, 관심 타입
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-6 rounded-2xl border border-[#1a3329]/10 bg-white/80 p-6 shadow-sm md:p-8"
      >
        <div>
          <label htmlFor="contact-name" className="text-sm font-semibold text-[#1a3329]">
            고객 성함 <span className="text-red-600">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm outline-none ring-[#1a3329]/20 transition focus:border-[#1a3329]/40 focus:ring-2"
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="text-sm font-semibold text-[#1a3329]">
            연락처 <span className="text-red-600">*</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="010-0000-0000"
            className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm outline-none ring-[#1a3329]/20 transition focus:border-[#1a3329]/40 focus:ring-2"
          />
        </div>

        <div>
          <label htmlFor="contact-visit" className="text-sm font-semibold text-[#1a3329]">
            모델하우스 방문 시간{" "}
            <span className="font-normal text-neutral-500">(선택)</span>
          </label>
          <input
            id="contact-visit"
            name="visitTime"
            type="datetime-local"
            value={visitTime}
            onChange={(e) => setVisitTime(e.target.value)}
            className="mt-2 w-full max-w-md rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm outline-none ring-[#1a3329]/20 transition focus:border-[#1a3329]/40 focus:ring-2"
          />
        </div>

        <fieldset>
          <legend className="text-sm font-semibold text-[#1a3329]">
            관심 타입{" "}
            <span className="font-normal text-neutral-500">(선택)</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-800">
              <input
                type="radio"
                name="interestType"
                value=""
                checked={interestType === ""}
                onChange={() => setInterestType("")}
                className="size-4 border-neutral-300 text-[#1a3329] focus:ring-[#1a3329]"
              />
              선택 안 함
            </label>

            {FLOOR_PLAN_TYPES.map((t) => (
              <label
                key={t.id}
                className="flex cursor-pointer items-center gap-2 text-sm text-neutral-800"
              >
                <input
                  type="radio"
                  name="interestType"
                  value={t.id}
                  checked={interestType === t.id}
                  onChange={() => setInterestType(t.id)}
                  className="size-4 border-neutral-300 text-[#1a3329] focus:ring-[#1a3329]"
                />
                {t.tabLabel}
              </label>
            ))}
          </div>
        </fieldset>

        <section
          id="privacy"
          className="scroll-mt-28 rounded-2xl border border-[#1a3329]/10 bg-white/50 p-4 md:p-5"
        >
          <h3 className="font-serif text-base font-semibold text-[#1a3329]">
            개인정보 수집 및 이용 동의
          </h3>
          <p className="mt-3 text-xs leading-relaxed text-neutral-600 break-keep md:text-sm">
            1. 수집 및 이용 목적: 고객 문의 응대, 서비스 안내 및 상담, 본인 확인
            <br />
            2. 수집하는 항목: 성명, 연락처(휴대전화 번호), 방문 희망시간, 관심 타입
            <br />
            3. 보유 및 이용 기간: 이용 목적 달성 후 즉시 파기 (단, 관계 법령에 따라
            보존이 필요한 경우 해당 기간까지 보관)
            <br />
            4. 동의 거부 권리: 귀하는 본 개인정보 수집 및 이용 동의를 거부할 권리가
            있습니다. 다만, 동의를 거부하실 경우 상담 신청 및 서비스 이용에 제한이 있을 수 있습니다.
          </p>

          <label className="mt-4 flex cursor-pointer items-start gap-2.5 rounded-lg bg-[#1a3329]/4 px-3 py-2.5 text-sm text-[#1a3329]">
            <input
              type="checkbox"
              checked={privacyConsent}
              onChange={(e) => setPrivacyConsent(e.target.checked)}
              required
              className="mt-0.5 size-4 rounded border-neutral-300 text-[#1a3329] focus:ring-[#1a3329]"
            />
            <span className="leading-relaxed">
              개인정보 수집 및 이용에 동의합니다.{" "}
              <span className="text-red-600">*</span>
            </span>
          </label>
        </section>

        {message ? (
          <p
            className={`text-sm ${status === "ok" ? "text-[#1a3329]" : "text-red-600"}`}
            role={status === "err" ? "alert" : undefined}
          >
            {message}
          </p>
        ) : null}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-[#1a3329] py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#14261f] disabled:opacity-60 md:max-w-xs"
          >
            {status === "loading" ? "전송 중…" : "문의 보내기"}
          </button>
        </div>
      </form>
    </section>
  );
}
