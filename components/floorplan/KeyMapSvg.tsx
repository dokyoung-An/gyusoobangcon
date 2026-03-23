/** 단지 내 타입 위치 강조용 단순 KEY MAP (5슬롯) */

type KeyMapSvgProps = {
  activeSlot: number;
  className?: string;
};

const SLOT_LABELS = ["A", "B", "C", "D", "E"] as const;

export function KeyMapSvg({ activeSlot, className = "" }: KeyMapSvgProps) {
  const w = 280;
  const h = 128;
  const slotW = 48;
  const gap = 8;
  const startX = (w - (5 * slotW + 4 * gap)) / 2;
  const y = 40;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden>
      <text
        x={w / 2}
        y={20}
        textAnchor="middle"
        fill="#1a3329"
        style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em" }}
      >
        KEY MAP
      </text>
      {SLOT_LABELS.map((label, i) => {
        const x = startX + i * (slotW + gap);
        const active = i === activeSlot;
        return (
          <g key={label}>
            <rect
              x={x}
              y={y}
              width={slotW}
              height={64}
              rx={6}
              fill={active ? "#1a3329" : "#e5e5e5"}
              stroke={active ? "#1a3329" : "#d4d4d4"}
              strokeWidth={1.5}
            />
            <text
              x={x + slotW / 2}
              y={y + 41}
              textAnchor="middle"
              fill={active ? "#c6a667" : "#737373"}
              style={{ fontSize: 15, fontWeight: 700 }}
            >
              {label}
            </text>
          </g>
        );
      })}
      <text
        x={w / 2}
        y={h - 6}
        textAnchor="middle"
        fill="#a3a3a3"
        style={{ fontSize: 9 }}
      >
        단지 배치도 · 상담 시 상세 안내
      </text>
    </svg>
  );
}
