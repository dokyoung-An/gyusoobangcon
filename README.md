# 규수방 건설 — 홍보 웹사이트

Next.js(App Router) + Tailwind CSS + Framer Motion.

## 로컬 실행

```bash
npm install
npm run dev
```

- `/` — Coming Soon (`public/main/main.jpg`)
- `/home` — 본 메인 페이지

## Vercel 배포

1. [Vercel](https://vercel.com)에서 이 GitHub 저장소를 Import합니다.
2. **Root Directory**는 저장소 루트(이 `package.json`이 있는 폴더)로 둡니다. 상위 폴더만 연결했다면 Root를 해당 프로젝트 폴더로 지정하세요.
3. Framework Preset은 **Next.js**로 자동 인식됩니다.
4. Node 버전은 `.nvmrc`(22)와 `package.json`의 `engines`를 따릅니다.

코드를 푸시하면 자동으로 재배포됩니다. 배포 후에도 예전 화면이 보이면 브라우저 캐시를 비우거나 시크릿 창으로 확인해 보세요.
