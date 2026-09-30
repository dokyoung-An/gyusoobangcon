import { siteConfig } from "@/lib/site";

import { NAVER_WCS_ACCOUNT_ID } from "./naver-wcs-track";

export { NAVER_WCS_ACCOUNT_ID };

/** PV 스크립트용 1차 도메인(www 제거). 서브도메인 간 쿠키 유실 방지용 inflow 인자. */
export function getNaverWcsInflowDomain(): string {
  try {
    const host = new URL(siteConfig.url).hostname;
    return host.replace(/^www\./, "") || host;
  } catch {
    return "gyusoobangcon.kr";
  }
}
