# 색인·canonical 점검 가이드

Google Search Console [페이지 색인 생성 보고서](https://support.google.com/webmasters/answer/7440203) 및  
[“Duplicate, Google chose different canonical than user”](https://support.google.com/webmasters/answer/7440203#google_chose_different_canonical_than_user) 설명을 참고해 정리했습니다.

---

## 색인 문제는 “이제 해결됐나?”

**코드·URL 구조만으로는 “완전히 해결”이라고 말할 수 없습니다.**  
구글·네이버가 다시 크롤링하고 색인을 갱신하는 데 시간이 걸리고, 검색 노출은 품질·경쟁·역사적 신호 등 다른 요인도 큽니다.

다만 **이 저장소에서 이미 맞춰 둔 것**은 다음과 같습니다.

| 항목 | 목적 |
|------|------|
| 메인을 **루트 `/`**에 두고 **`/home` → `/` 영구 리다이렉트** | 홈 URL이 하나로 모이도록 (중복·canonical 충돌 완화) |
| **사이트맵**에 `/`만 `priority: 1`, `/home` 미포함 | 제출 URL과 실제 메인이 일치 |
| **`lib/site.ts`** — Production에서는 `canonicalSiteUrl`(실제 도메인) 사용 | sitemap·OG·`metadataBase`가 `*.vercel.app`으로 나가던 문제 완화 |
| **`robots.txt`** (`app/robots.ts`) | 크롤 허용 + sitemap 위치 안내 |
| 루트 메타 **`canonical: "/"`**, OG URL = 사이트 origin | 사용자 선언 canonical과 실제 URL 정합 |

즉, **“색인을 막는 구조적 모순”은 많이 줄인 상태**이고, 남은 건 **배포 반영·Search Console 작업·시간**입니다.

---

## 현재 사이트 구조 (요약)

- **메인 페이지:** `https://www.gyusoobangcon.kr/` (`app/(site)/page.tsx`)
- **예전 주소:** `https://www.gyusoobangcon.kr/home` → **`/`로 308 영구 리다이렉트** (`app/(site)/home/page.tsx`)
- **사이트맵:** `app/sitemap.ts` → 공개 URL 목록, 홈은 `/`만 포함
- **절대 URL 기준:** `getSiteUrl()` / `siteConfig.url` — 자세한 우선순위는 `lib/site.ts` 주석 참고

---

## 배포 후 꼭 할 일 (Search Console)

1. **속성(property)**  
   실제 서비스와 같은 호스트로 등록되어 있는지 확인합니다. (예: `https://www.gyusoobangcon.kr/`)

2. **URL 검사**  
   - `https://www.gyusoobangcon.kr/`  
   - (선택) `https://www.gyusoobangcon.kr/home` — 리다이렉트·canonical이 기대와 같은지 확인  
   **색인 생성**에서 **사용자가 선언한 canonical**과 **Google이 선택한 canonical**을 비교합니다.  
   [도움말: 다른 canonical을 고른 경우](https://support.google.com/webmasters/answer/7440203#google_chose_different_canonical_than_user)

3. **사이트맵**  
   - `https://www.gyusoobangcon.kr/sitemap.xml` 를 다시 제출하거나 “다시 읽기”를 요청합니다.  
   - `<loc>`에 **프로덕션 도메인**만 나오는지 브라우저에서 열어 확인합니다.

4. **색인 생성 요청**  
   메인이 크게 바뀐 뒤에는 URL 검사에서 **라이브 URL 테스트** 후 **색인 생성 요청**을 할 수 있습니다. (과도한 반복 요청은 피합니다.)

5. **보고서의 과거 오류**  
   예전에 `/` vs `/home`·vercel 도메인으로 쌓인 이슈는 **다시 크롤링되며 점차 반영**됩니다. “수정 완료” 후 [유효성 검사](https://support.google.com/webmasters/answer/7440203)를 쓰는 경우도 있습니다.

---

## 네이버 서치어드바이저

- 사이트 URL은 가능하면 **루트** `https://www.gyusoobangcon.kr` 기준으로 두는 것이 `robots.txt`·루트 진단과 맞기 쉽습니다.
- `robots.txt`는 항상 **`https://www.gyusoobangcon.kr/robots.txt`** 로 직접 확인합니다.

---

## 대외 링크·마케팅

- 새로 걸 링크는 **`https://www.gyusoobangcon.kr/`** (또는 정책에 맞는 단일 형태)로 통일합니다.
- 예전에 `/home`으로 퍼진 링크는 리다이렉트로 `/`로 모이므로, **새 자료는 루트만** 쓰면 됩니다.

---

## 환경 변수 (선택이지만 권장)

- Vercel **Production**에 `NEXT_PUBLIC_SITE_URL=https://www.gyusoobangcon.kr` 를 넣으면, 도메인 변경 시에도 `lib/site.ts`의 `getSiteUrl()`이 일관됩니다.  
- 설정하지 않아도 **Production 빌드**에서는 `canonicalSiteUrl`이 사용되도록 되어 있습니다 (`lib/site.ts`).

---

## 그래도 이슈가 남을 때

- **URL 검사** 스크린샷과 “Google이 선택한 canonical” 문구를 기준으로 [해당 이유별 도움말](https://support.google.com/webmasters/answer/7440203)을 읽습니다.
- 리다이렉트 연쇄·중복 페이지·`noindex` 등은 **라이브 페이지 HTML/헤더**로 재확인합니다.

---

**한 줄 요약:** 구조는 메인을 `/`로 통일해 두었으므로 색인 신호는 이전보다 맞추기 쉬운 상태입니다. **“해결 여부”는 Search Console에서 루트 URL을 검사해 확인**하고, 사이트맵 재제출 후 **며칠~몇 주 단위로** 지켜보는 것이 좋습니다.
