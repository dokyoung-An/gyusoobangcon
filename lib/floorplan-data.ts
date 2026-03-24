/** 평면안내 탭·표기용 데이터 및 이미지 경로 규칙 */

export type FloorPlanTypeId = "A" | "B" | "C" | "D" | "E";

/** 파일 접미사: 1B=지하1층, 1F=1층, 2F=2층, 3F=3층 */
export type FloorFileCode = "1B" | "1F" | "2F" | "3F";

export type UnitPlanRow = { label: string; value: string };

/** Unit Plan 표: 좌측에 rowspan으로 묶이는 그룹(건축·토지 등) */
export type UnitPlanSection = {
  category: string;
  rows: readonly UnitPlanRow[];
};

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
  /** 평면 안내 상단 카드용 외관 참고 이미지 (`public` 기준 경로) */
  exteriorSrc: string;
  /** 건축·토지 등 그룹별 행 — 평면안내 Unit Plan 표에 그대로 반영 */
  unitPlan: readonly UnitPlanSection[];
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
    exteriorSrc: "/exterior/ex_A-1.jpg",
    unitPlan: [
      {
        category: "건축",
        rows: [
          { label: "전용면적", value: "125.75㎡" },
          { label: "2층면적", value: "28㎡" },
          { label: "3층면적", value: "28㎡" },
          { label: "분양면적", value: "153.75㎡" },
        ],
      },
      {
        category: "토지",
        rows: [
          { label: "전용면적", value: "252㎡~" },
          { label: "공용면적", value: "75㎡~" },
          { label: "분양면적", value: "327㎡~" },
        ],
      },
    ],
  },
  {
    id: "B",
    tabLabel: "B Type",
    unitCode: "B-1",
    households: "6세대",
    exteriorSrc: "/exterior/ex_B-1.jpg",
    unitPlan: [
      {
        category: "건축",
        rows: [
          { label: "전용면적", value: "125.75㎡" },
          { label: "2층면적", value: "28㎡" },
          { label: "3층면적", value: "28㎡" },
          { label: "분양면적", value: "153.75㎡" },
        ],
      },
      {
        category: "토지",
        rows: [
          { label: "전용면적", value: "252㎡~" },
          { label: "공용면적", value: "75㎡~" },
          { label: "분양면적", value: "327㎡~" },
        ],
      },
    ],
  },
  {
    id: "C",
    tabLabel: "C Type",
    unitCode: "C-1",
    households: "10세대",
    exteriorSrc: "/exterior/ex_C-1.jpg",
    unitPlan: [
      {
        category: "건축",
        rows: [
          { label: "전용면적", value: "125.75㎡" },
          { label: "2층면적", value: "28㎡" },
          { label: "3층면적", value: "28㎡" },
          { label: "분양면적", value: "153.75㎡" },
        ],
      },
      {
        category: "토지",
        rows: [
          { label: "전용면적", value: "108㎡~" },
          { label: "공용면적", value: "32㎡~" },
          { label: "분양면적", value: "140㎡~" },
        ],
      },
    ],
  },
  {
    id: "D",
    tabLabel: "D Type",
    unitCode: "D-1",
    households: "4세대",
    exteriorSrc: "/exterior/ex_D-1.jpg",
    unitPlan: [
      {
        category: "건축",
        rows: [
          { label: "전용면적", value: "125.75㎡" },
          { label: "2층면적", value: "28㎡" },
          { label: "3층면적", value: "28㎡" },
          { label: "분양면적", value: "153.75㎡" },
        ],
      },
      {
        category: "토지",
        rows: [
          { label: "전용면적", value: "252㎡~" },
          { label: "공용면적", value: "75㎡~" },
          { label: "분양면적", value: "327㎡~" },
        ],
      },
    ],
  },
  {
    id: "E",
    tabLabel: "E Type",
    unitCode: "E-1",
    households: "4세대",
    exteriorSrc: "/exterior/ex_E-1.jpg",
    unitPlan: [
      {
        category: "건축",
        rows: [
          { label: "전용면적", value: "125.75㎡" },
          { label: "2층면적", value: "28㎡" },
          { label: "3층면적", value: "28㎡" },
          { label: "분양면적", value: "153.75㎡" },
        ],
      },
      {
        category: "토지",
        rows: [
          { label: "전용면적", value: "252㎡~" },
          { label: "공용면적", value: "75㎡~" },
          { label: "분양면적", value: "327㎡~" },
        ],
      },
    ],
  },
] as const;
