const RING_TEXT = "SUJI DREAM THE HILL Ⅱ · SUJI DREAM THE HILL Ⅱ · ";
const RING_RADIUS = 76;
const RING_LENGTH = Math.round(2 * Math.PI * RING_RADIUS);

type OpeningBadgeProps = {
  /** 위치·크기 지정용 (바깥 래퍼에 적용) */
  className?: string;
};

export function OpeningBadge({ className = "" }: OpeningBadgeProps) {
  return (
    <div className={className}>
      <div
        role="img"
        aria-label="샘플하우스 오픈"
        className="relative aspect-square w-full rounded-full bg-white text-[#3f141b] shadow-[0_12px_40px_rgb(0_0_0_/_0.35)]"
      >
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 size-full animate-[spin_24s_linear_infinite] motion-reduce:animate-none"
          aria-hidden
        >
          <defs>
            <path
              id="opening-badge-ring"
              d={`M100,100 m-${RING_RADIUS},0 a${RING_RADIUS},${RING_RADIUS} 0 1,1 ${RING_RADIUS * 2},0 a${RING_RADIUS},${RING_RADIUS} 0 1,1 -${RING_RADIUS * 2},0`}
            />
          </defs>
          <text fill="currentColor" fontSize="13" fontWeight="600" letterSpacing="2">
            <textPath
              href="#opening-badge-ring"
              textLength={RING_LENGTH}
              lengthAdjust="spacing"
            >
              {RING_TEXT}
            </textPath>
          </text>
        </svg>
        <div
          className="absolute inset-[22%] rounded-full border border-[#3f141b]/15"
          aria-hidden
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
          <span className="text-[0.6875rem] font-bold md:text-sm">샘플하우스</span>
          <span className="mt-0.5 text-lg font-extrabold tracking-[0.12em] md:text-2xl">
            OPEN
          </span>
        </div>
      </div>
    </div>
  );
}
