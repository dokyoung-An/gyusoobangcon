"use client";

import type { CSSProperties } from "react";

const LINES = ["도시의 중심에서,", "가장 조용한 숲의 리듬을 살아가다."] as const;

/**
 * 슬로건을 글자(유니코드 스칼라) 단위로 나눠, 왼쪽→오른쪽 순으로 골드 하이라이트가 지나가게 함.
 */
export function SloganShimmerText() {
  let globalIndex = 0;
  const totalChars = LINES.reduce((n, line) => n + Array.from(line).length, 0);

  return (
    <span
      className="slogan-char-root"
      style={{ "--char-total": totalChars } as CSSProperties}
    >
      {LINES.map((line, lineIdx) => (
        <span key={lineIdx} className="block">
          {Array.from(line).map((ch, charIdx) => {
            const i = globalIndex++;
            return (
              <span
                key={`${lineIdx}-${charIdx}`}
                className="slogan-char-wave"
                style={{ "--char-i": i } as CSSProperties}
              >
                {ch === " " ? "\u00a0" : ch}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
