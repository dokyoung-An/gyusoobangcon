import type { FloorPlanTypeId } from "@/lib/floorplan-data";

/**
 * 타입별 인테리어 갤러리 (public 기준 절대 경로).
 * 실제 컷은 `/interior/A-01.jpg` 형태로 두고 여기만 맞추면 됩니다.
 */
export const INTERIOR_IMAGES: Record<
  FloorPlanTypeId,
  readonly string[]
> = {
  A: [
    "/main/hero1.jpg",
    "/main/hero2.jpg",
    "/main/hero3.jpg",
    "/main/hero4.jpg",
    "/main/hero5.jpg",
    "/main/hero6.jpg",
  ],
  B: [
    "/main/hero2.jpg",
    "/main/hero3.jpg",
    "/main/hero4.jpg",
    "/main/hero5.jpg",
    "/main/hero6.jpg",
    "/main/hero1.jpg",
  ],
  C: [
    "/main/hero3.jpg",
    "/main/hero4.jpg",
    "/main/hero5.jpg",
    "/main/hero6.jpg",
    "/main/hero1.jpg",
    "/main/hero2.jpg",
  ],
  D: [
    "/main/hero4.jpg",
    "/main/hero5.jpg",
    "/main/hero6.jpg",
    "/main/hero1.jpg",
    "/main/hero2.jpg",
    "/main/hero3.jpg",
  ],
  E: [
    "/main/hero5.jpg",
    "/main/hero6.jpg",
    "/main/hero1.jpg",
    "/main/hero2.jpg",
    "/main/hero3.jpg",
    "/main/hero4.jpg",
  ],
};
