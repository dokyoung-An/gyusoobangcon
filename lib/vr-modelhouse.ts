/** 사이버 모델하우스 VR (모델하우스 페이지·스플래시 등 공통) */

export const VR_MODELHOUSE_URLS = {
  in: "https://ttdesign-jk.synology.me/VR/20260307GSB/in/index.htm",
  ex: "https://ttdesign-jk.synology.me/VR/20260307GSB/ex/index.htm",
} as const;

export type VrModelhouseKey = keyof typeof VR_MODELHOUSE_URLS;

export const VR_WINDOW_NAMES: Record<VrModelhouseKey, string> = {
  in: "acro_dream_hill_vr_interior",
  ex: "acro_dream_hill_vr_exterior",
};

export type VrPopupSize = "default" | "fullViewport";

/**
 * VR을 새 창(팝업)으로 엽니다.
 * - default: 모델하우스 페이지와 동일한 중앙 팝업 크기
 * - fullViewport: 화면 사용 가능 영역 기준 전체에 가깝게 (높이 ≈ 100vh)
 */
export function openVrPopup(
  url: string,
  windowName: string,
  size: VrPopupSize = "default"
) {
  let width: number;
  let height: number;
  let left: number;
  let top: number;

  if (size === "fullViewport") {
    width = Math.max(320, Math.round(window.innerWidth));
    height = Math.max(320, Math.round(window.innerHeight));
    left = window.screenX;
    top = window.screenY;
  } else {
    width = Math.min(1280, Math.max(960, window.innerWidth - 80));
    height = Math.min(860, Math.max(700, window.innerHeight - 80));
    left =
      window.screenX +
      Math.max(0, Math.floor((window.outerWidth - width) / 2));
    top =
      window.screenY +
      Math.max(0, Math.floor((window.outerHeight - height) / 2));
  }

  const features = [
    "popup=yes",
    `width=${width}`,
    `height=${height}`,
    `left=${left}`,
    `top=${top}`,
    "scrollbars=yes",
    "resizable=yes",
    "noopener",
    "noreferrer",
  ].join(",");

  const win = window.open(url, windowName, features);
  if (win) {
    try {
      win.focus();
    } catch {
      /* ignore */
    }
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
}
