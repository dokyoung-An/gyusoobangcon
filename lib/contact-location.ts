/**
 * 상담 문의 — 위치안내(분양 홍보관 단일 블록)
 * 주소·링크는 실제 값으로 수정해 사용하세요.
 */

export type ContactLocationData = {
  /** Google Maps embed 검색어 */
  mapEmbedQuery: string;
  mapIframeTitle: string;
  company: {
    title: string;
    tel: string;
    fax: string;
    address: string;
    naverMapUrl: string;
  };
  transport: {
    title: string;
    byCar: string;
    bus: string;
    subway: { badge: string; detail: string }[];
  };
};

export const CONTACT_LOCATION: ContactLocationData = {
  mapEmbedQuery: "경기 용인시 수지구 동천동 483-13",
  mapIframeTitle: "분양 홍보관 지도",
  company: {
    title: "홍보관 안내",
    tel: "1551-8959",
    fax: "02-0000-0001",
    address: "경기도 수지구 동천동 483-8",
    naverMapUrl:
      "https://map.naver.com/v5/search/" +
      encodeURIComponent("경기도 수지구 동천동 483-8"),
  },
  transport: {
    title: "교통안내",
    byCar:
      "경부고속도로 → 신갈IC → 용인·수지 방향 → 동천로·성복로 일대 단지 인근 주차장 안내(상담 시 안내).",
    bus: "동천·수지권역 시내버스 정류장 하차 후 도보(노선은 시점에 따라 변동될 수 있습니다).",
    subway: [
      {
        badge: "신",
        detail:
          "신분당선 동천역 인근 — 도보 또는 환승(출구·거리는 현장 안내 기준).",
      },
      {
        badge: "수",
        detail: "수인·분당선 성복·수지권 — 환승은 지도 앱으로 확인해 주세요.",
      },
    ],
  },
};

export function googleMapsEmbedSrc(query: string): string {
  const q = encodeURIComponent(query);
  return `https://www.google.com/maps?q=${q}&output=embed`;
}
