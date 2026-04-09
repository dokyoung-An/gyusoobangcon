import { permanentRedirect } from "next/navigation";

/** 예전 북마크·링크 호환: /home → 루트 메인 */
export default function LegacyHomeRedirect() {
  permanentRedirect("/");
}
