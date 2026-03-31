/** SNS·검색 미리보기용 OG 이미지 경로 (`public/main/main.png`) */
export const openGraphImagePath = "/premium/hap.jpg";

/** @deprecated `openGraphImagePath` 사용 권장 */
export const openGraphImage = openGraphImagePath;

export const featureImages = [
  // 1) 도심 속 프라이빗 포레스트 (숲/산책로 느낌)
  "/premium/hap.jpg",
  // 2) 럭셔리 볼륨 & 품격 있는 외관 (모던 하우스 외관)
  "/exterior/ex_A-1.jpg",
  // 3) 최적화된 동선과 커뮤니티 (로비/라운지 인테리어)
  "/interior/c-livingroom.png",
] as const;
