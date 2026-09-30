/** 네이버 WCS 공통키(AccountId). CTS/서치어드바이저와 동일 값 유지 */
export const NAVER_WCS_ACCOUNT_ID = "s_5032715b122c";

/**
 * 네이버 가이드: `_conv.type` — 상담·문의 완료는 `lead`.
 * CTS에서 사용자정의 전환만 쓰는 경우 `custom001` ~ `custom010` 등으로 맞춤.
 */
export const NAVER_WCS_CONVERSION_TYPE: string =
  process.env.NEXT_PUBLIC_NAVER_WCS_CONV_TYPE?.trim() || "lead";

declare global {
  interface Window {
    wcs?: { trans: (conv: { type: string }) => void };
    wcs_add?: Record<string, string>;
  }
}

/** 문의 API 성공 직후 호출 — 페이지 클릭만으로는 전송되지 않음 */
export function trackNaverWcsConversion(): void {
  if (typeof window === "undefined") return;
  const { wcs } = window;
  if (!wcs?.trans) return;
  if (!window.wcs_add) window.wcs_add = {};
  window.wcs_add.wa = NAVER_WCS_ACCOUNT_ID;
  try {
    wcs.trans({ type: NAVER_WCS_CONVERSION_TYPE });
  } catch {
    /* 전환 수집 실패는 문의 UX에 영향 없음 */
  }
}
