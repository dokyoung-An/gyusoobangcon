import type { FloorPlanTypeId } from "@/lib/floorplan-data";

/**
 * 파일명 규칙:
 * - 타입 분기: `a-...` => A, `b-...` => B, ...
 * - 라벨 키: `-` 뒤 이름 (예: `b-parkinglot.png` -> parkinglot)
 */
const INTERIOR_IMAGE_PATHS = [
  "/interior/a-bathroom.png",
  "/interior/a-dressroom.png",
  "/interior/a-kitchen.png",
  "/interior/a-living.png",
  "/interior/a-rooftop.png",
  "/interior/b-bathroom.png",
  "/interior/b-dressroom.png",
  "/interior/b-elevator.png",
  "/interior/b-homebar.png",
  "/interior/b-kitchen.png",
  "/interior/b-livingroom.png",
  "/interior/b-mainroom.png",
  "/interior/b-parkinglot.png",
  "/interior/b-rooftop.png",
  "/interior/b-sauna.png",
  "/interior/b-screengolf.png",
  "/interior/b-swimmingpool.png",
  "/interior/c-bathroom.png",
  "/interior/c-dressroom.png",
  "/interior/c-elevator.png",
  "/interior/c-homebar.png",
  "/interior/c-kitchen.png",
  "/interior/c-livingroom.png",
  "/interior/c-mainroom.png",
  "/interior/c-parkinglot.png",
  "/interior/c-rooftop.png",
  "/interior/c-sauna.png",
  "/interior/c-screengolf.png",
  "/interior/c-swimmingpool.png",
  "/interior/d-bathroom.png",
  "/interior/d-dressroom.png",
  "/interior/d-elevator.png",
  "/interior/d-kitchen.png",
  "/interior/d-livingroom.png",
  "/interior/d-mainroom.png",
  "/interior/d-parkinglot.png",
  "/interior/d-rooftop.png",
  "/interior/d-sauna.png",
  "/interior/d-screengolf.png",
  "/interior/d-swimmingpool.png",
  "/interior/e-bathroom.png",
  "/interior/e-dressroom.png",
  "/interior/e-elevator.png",
  "/interior/e-homebar.png",
  "/interior/e-kitchen.png",
  "/interior/e-livingroom.png",
  "/interior/e-mainroom.png",
  "/interior/e-parkinglot.png",
  "/interior/e-rooftop.png",
  "/interior/e-sauna.png",
  "/interior/e-screengolf.png",
  "/interior/e-swimmingpool.png",
] as const;

const ROOM_LABEL_BY_KEY: Record<string, string> = {
  bathroom: "욕실",
  dressroom: "드레스룸",
  kitchen: "주방",
  living: "거실",
  livingroom: "거실",
  rooftop: "루프탑",
  elevator: "엘리베이터",
  homebar: "홈바",
  mainroom: "안방",
  parkinglot: "주차장",
  sauna: "사우나",
  screengolf: "스크린골프",
  swimmingpool: "수영장",
};

const SHARED_ROOM_IMAGE_BY_KEY: Partial<Record<string, string>> = {
  sauna: "/interior/sauna.jpg",
};

function getTypePrefix(src: string): FloorPlanTypeId | null {
  const file = src.split("/").pop()?.toLowerCase() ?? "";
  const head = file.charAt(0);
  if (head === "a" || head === "b" || head === "c" || head === "d" || head === "e") {
    return head.toUpperCase() as FloorPlanTypeId;
  }
  return null;
}

function getRoomKey(src: string): string {
  const file = src.split("/").pop()?.toLowerCase() ?? "";
  const noExt = file.replace(/\.[^.]+$/, "");
  const match = noExt.match(/^[a-e]-(.+)$/);
  return match?.[1] ?? noExt;
}

function uniqueInOrder(paths: readonly string[]): readonly string[] {
  return Array.from(new Set(paths));
}

export const INTERIOR_IMAGES: Record<FloorPlanTypeId, readonly string[]> = {
  A: uniqueInOrder(
    INTERIOR_IMAGE_PATHS.filter((src) => getTypePrefix(src) === "A").map(
      (src) => SHARED_ROOM_IMAGE_BY_KEY[getRoomKey(src)] ?? src
    )
  ),
  B: uniqueInOrder(
    INTERIOR_IMAGE_PATHS.filter((src) => getTypePrefix(src) === "B").map(
      (src) => SHARED_ROOM_IMAGE_BY_KEY[getRoomKey(src)] ?? src
    )
  ),
  C: uniqueInOrder(
    INTERIOR_IMAGE_PATHS.filter((src) => getTypePrefix(src) === "C").map(
      (src) => SHARED_ROOM_IMAGE_BY_KEY[getRoomKey(src)] ?? src
    )
  ),
  D: uniqueInOrder(
    INTERIOR_IMAGE_PATHS.filter((src) => getTypePrefix(src) === "D").map(
      (src) => SHARED_ROOM_IMAGE_BY_KEY[getRoomKey(src)] ?? src
    )
  ),
  E: uniqueInOrder(
    INTERIOR_IMAGE_PATHS.filter((src) => getTypePrefix(src) === "E").map(
      (src) => SHARED_ROOM_IMAGE_BY_KEY[getRoomKey(src)] ?? src
    )
  ),
};

export function getInteriorRoomLabel(src: string): string {
  const key = getRoomKey(src);
  return ROOM_LABEL_BY_KEY[key] ?? "공간";
}
