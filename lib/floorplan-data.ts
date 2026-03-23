/** 평면안내 탭·표기용 데이터 및 이미지 경로 규칙 */

export type FloorPlanTypeId = "A" | "B" | "C" | "D" | "E";

/** 파일 접미사: 1B=지하1층, 1F=1층, 2F=2층, 3F=3층 */
export type FloorFileCode = "1B" | "1F" | "2F" | "3F";

export type UnitPlanRow = { label: string; value: string };

/**
 * 층별 이미지
 * - 필드 생략: 아래 규칙의 기본 경로 사용
 * - `string`: public 기준 절대 경로 (예: `/floorplan/custom.png`)
 * - `null`: 해당 층은 이미지 없음(플레이스홀더만)
 *
 * 기본 2D: `/floorplan/TOP_{타입}_{1B|1F|2F|3F}.png`
 * 기본 아이소: `/iso/iso_{타입}-{1B|1F|2F|3F} 01.png` (공백 포함 파일명)
 */
export type FloorImages = {
  plan2d?: Partial<Record<FloorFileCode, string | null>>;
  iso?: Partial<Record<FloorFileCode, string | null>>;
};

export type FloorPlanTypeConfig = {
  id: FloorPlanTypeId;
  tabLabel: string;
  unitCode: string;
  households: string;
  keyMapSlot: number;
  unitPlan: readonly UnitPlanRow[];
  images?: FloorImages;
};

export const FLOOR_LEVELS_META = [
  { label: "지하 1층", code: "1B" as const },
  { label: "1층", code: "1F" as const },
  { label: "2층", code: "2F" as const },
  { label: "3층", code: "3F" as const },
] as const;

/** @deprecated FLOOR_LEVELS_META 사용 권장 */
export const FLOOR_LEVELS_4 = FLOOR_LEVELS_META.map((m) => m.label);
export const PLAN_2D_FLOORS = FLOOR_LEVELS_4;
export const ISO_FLOORS = FLOOR_LEVELS_4;

export function defaultPlan2dPath(
  typeId: FloorPlanTypeId,
  code: FloorFileCode
): string {
  return `/floorplan/TOP_${typeId}_${code}.png`;
}

export function defaultIsoPath(
  typeId: FloorPlanTypeId,
  code: FloorFileCode
): string {
  return encodeURI(`/iso/iso_${typeId}-${code} 01.png`);
}

export function resolvePlan2dSrc(
  cfg: FloorPlanTypeConfig,
  code: FloorFileCode
): string | null {
  const o = cfg.images?.plan2d?.[code];
  if (o === null) return null;
  if (typeof o === "string" && o.length > 0) return o;
  return defaultPlan2dPath(cfg.id, code);
}

export function resolveIsoSrc(
  cfg: FloorPlanTypeConfig,
  code: FloorFileCode
): string | null {
  const o = cfg.images?.iso?.[code];
  if (o === null) return null;
  if (typeof o === "string" && o.length > 0) return o;
  return defaultIsoPath(cfg.id, code);
}

export const FLOOR_PLAN_TYPES: readonly FloorPlanTypeConfig[] = [
  {
    id: "A",
    tabLabel: "A Type",
    unitCode: "A-1",
    households: "8세대",
    keyMapSlot: 0,
    unitPlan: [
      { label: "전용면적", value: "84.12㎡" },
      { label: "공용면적", value: "35.45㎡" },
      { label: "연면적", value: "119.57㎡" },
      { label: "테라스", value: "12.30㎡" },
      { label: "대지지분", value: "142.5㎡" },
      { label: "주차", value: "2대" },
    ],
  },
  {
    id: "B",
    tabLabel: "B Type",
    unitCode: "B-1",
    households: "6세대",
    keyMapSlot: 1,
    unitPlan: [
      { label: "전용면적", value: "91.48㎡" },
      { label: "공용면적", value: "38.20㎡" },
      { label: "연면적", value: "129.68㎡" },
      { label: "테라스", value: "14.05㎡" },
      { label: "대지지분", value: "155.2㎡" },
      { label: "주차", value: "2대" },
    ],
  },
  {
    id: "C",
    tabLabel: "C Type",
    unitCode: "C-1",
    households: "10세대",
    keyMapSlot: 2,
    unitPlan: [
      { label: "전용면적", value: "76.33㎡" },
      { label: "공용면적", value: "32.10㎡" },
      { label: "연면적", value: "108.43㎡" },
      { label: "테라스", value: "9.85㎡" },
      { label: "대지지분", value: "128.0㎡" },
      { label: "주차", value: "1대" },
    ],
  },
  {
    id: "D",
    tabLabel: "D Type",
    unitCode: "D-1",
    households: "4세대",
    keyMapSlot: 3,
    unitPlan: [
      { label: "전용면적", value: "102.05㎡" },
      { label: "공용면적", value: "41.88㎡" },
      { label: "연면적", value: "143.93㎡" },
      { label: "테라스", value: "18.20㎡" },
      { label: "대지지분", value: "172.4㎡" },
      { label: "주차", value: "2대" },
    ],
  },
  {
    id: "E",
    tabLabel: "E Type",
    unitCode: "E-1",
    households: "4세대",
    keyMapSlot: 4,
    unitPlan: [
      { label: "전용면적", value: "88.76㎡" },
      { label: "공용면적", value: "36.52㎡" },
      { label: "연면적", value: "125.28㎡" },
      { label: "테라스", value: "11.40㎡" },
      { label: "대지지분", value: "148.9㎡" },
      { label: "주차", value: "2대" },
    ],
  },
] as const;
