import type { FloorPlanTypeId } from "@/lib/floorplan-data";

/**
 * 타입별 인테리어 갤러리 (public 기준 절대 경로).
 * - A 타입: 현재 선택한 실 이미지 연결
 * - B~E 타입: 아직 미지정 시 기본 샘플 사용
 */
const A_SELECTED_IMAGES = [
  "/interior/a_living.png",
  "/interior/a_living_2.png",
  "/interior/a_kichen.png",
  "/interior/a_bedroom.png",
  "/interior/a_room1.png",
  "/interior/a_rooftop.png",
] as const;

  const B_SELECTED_IMAGES = [
    "/interior/b_1b.png",
    "/interior/b_1b2.png",
    "/interior/b_bathroom.png",
    "/interior/b_bedroom.png",
    "/interior/b_living.png",
    "/interior/b-kitchen.png",
  ] as const;

  const C_SELECTED_IMAGES = [
    "/interior/c_1b.png",
    "/interior/c_2_living.png",
    "/interior/c_b_homebar.png",
    "/interior/c_bedroom2.png",
    "/interior/c_dining.png",
    "/interior/c_front.png",
    "/interior/c_roof.png",
    "/interior/c_room1.png",
    "/interior/c_swim.png",
  ] as const;

  const D_SELECTED_IMAGES = [
    "/interior/d_dining.png",
    "/interior/d_familly.png",
    "/interior/d_front.png",
    "/interior/d_living.png",
    "/interior/d_master.png",
    "/interior/d_roof.png",
    "/interior/d_room1.png",
  ] as const;

  const E_SELECTED_IMAGES = [
    "/interior/e_bathroom.png",
    "/interior/e_hombar.png",
    "/interior/e_library.png",
    "/interior/e_living.png",
    "/interior/e_roof.png",
    "/interior/e_room1.png",
    "/interior/e_room2.png",
    "/interior/e_swiming.png",
  ] as const;



export const INTERIOR_IMAGES: Record<FloorPlanTypeId, readonly string[]> = {
  A: A_SELECTED_IMAGES,
  B: B_SELECTED_IMAGES,
  C: C_SELECTED_IMAGES,
  D: D_SELECTED_IMAGES,
  E: E_SELECTED_IMAGES,
};

/**
 * 갤러리 상단 오버레이에 표시할 ROOM 명칭.
 * 필요 시 아래 텍스트를 직접 수정하면 즉시 반영됩니다.
 */
export const INTERIOR_ROOM_LABEL_BY_SRC: Record<string, string> = {
  "/interior/a_living.png": "거실",
  "/interior/a_living_2.png": "거실",
  "/interior/a_kichen.png": "주방",
  "/interior/a_bedroom.png": "침실",
  "/interior/a_room1.png": "침실 1",
  "/interior/a_rooftop.png": "루프탑",

  "/interior/b_1b.png": "침실 2",
  "/interior/b_1b2.png": "다이닝",
  "/interior/b_bathroom.png": "욕실",
  "/interior/b_bedroom.png": "침실 1",
  "/interior/b_living.png": "거실",
  "/interior/b_kitchen.png": "주방",

  "/interior/c_1b.png": "지하 1층",
  "/interior/c_2_living.png": "거실",
  "/interior/c_b_homebar.png": "홈바",
  "/interior/c_bedroom2.png": "침실 1",
  "/interior/c_dining.png": "다이닝",
  "/interior/c_front.png": "현관",
  "/interior/c_roof.png": "루프탑",
  "/interior/c_room1.png": "침실 2",
  "/interior/c_swim.png": "수영장",

  "/interior/d_dining.png": "다이닝",
  "/interior/d_familly.png": "패밀리룸",
  "/interior/d_front.png": "현관",
  "/interior/d_living.png": "거실",
  "/interior/d_master.png": "마스터룸",
  "/interior/d_roof.png": "루프탑",
  "/interior/d_room1.png": "침실 1",

  "/interior/e_bathroom.png": "욕실",
  "/interior/e_hombar.png": "홈바",
  "/interior/e_library.png": "서재",
  "/interior/e_living.png": "거실",
  "/interior/e_roof.png": "루프탑",
  "/interior/e_room1.png": "침실 1",
  "/interior/e_room2.png": "침실 2",
  "/interior/e_swiming.png": "수영장",
};

export function getInteriorRoomLabel(src: string): string {
  return INTERIOR_ROOM_LABEL_BY_SRC[src] ?? "ROOM";
}
