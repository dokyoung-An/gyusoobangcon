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
    "/interior/c-front.png",
    "/interior/c-roof.png",
    "/interior/c-room1.png",
    "/interior/c-swim.png",
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
