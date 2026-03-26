# KTOON Frontend

> 이야기에 빠져드는 가장 깊은 공간

웹툰 열람 플랫폼의 프론트엔드 프로젝트입니다. Next.js 16 App Router 기반의 SPA로, 요일별 웹툰 연재, 에피소드 뷰어, 코인 결제 시스템 등 웹툰 플랫폼의 핵심 기능을 구현합니다.

---

## 기술 스택

| 구분 | 기술 | 버전 |
|------|------|------|
| Framework | Next.js (App Router) | 16 |
| UI | React | 19 |
| Language | TypeScript | 5.9 |
| Styling | Tailwind CSS | 4 |
| 상태 관리 | Zustand | 5 |
| 서버 상태 | TanStack React Query | 5 |

---

## 주요 기능

- **홈 / 요일별 웹툰** -- 요일별 연재 웹툰 목록 조회
- **인기 웹툰** -- 일간/주간 인기 랭킹
- **완결 웹툰** -- 완결 작품 모아보기
- **웹툰 상세** -- 작품 정보, 에피소드 목록, 평점
- **에피소드 뷰어** -- 이미지 기반 웹툰 뷰어 (이전/다음 에피소드 이동)
- **로그인 / 회원가입** -- JWT 기반 인증
- **마이페이지** -- 열람 내역, 구매 내역, 코인 충전/사용 내역
- **코인 시스템** -- 유료 에피소드 코인 결제
- **공지사항 / 이벤트 / FAQ** -- 플랫폼 운영 페이지
- **다크 모드** -- 테마 전환 지원

---

## 프로젝트 구조

```
src/
├── app/                  # Next.js App Router 페이지
│   ├── (main)/           # 메인 레이아웃 (헤더/푸터 포함)
│   │   ├── comics/       # 웹툰 상세
│   │   ├── popular/      # 인기 웹툰
│   │   ├── completed/    # 완결 웹툰
│   │   ├── login/        # 로그인
│   │   ├── signup/       # 회원가입
│   │   ├── mypage/       # 마이페이지
│   │   ├── events/       # 이벤트
│   │   ├── notice/       # 공지사항
│   │   ├── faq/          # FAQ
│   │   └── admin/        # 관리자
│   └── (viewer)/         # 에피소드 뷰어 레이아웃
├── components/           # 재사용 컴포넌트
│   ├── common/           # 공통 (Toast 등)
│   ├── layout/           # 레이아웃 (Header, Footer, Navigation)
│   ├── comic/            # 웹툰 관련
│   └── episode/          # 에피소드 관련
├── hooks/                # Custom Hooks (React Query 기반)
├── lib/                  # API 클라이언트, 유틸리티
├── providers/            # Context Providers (Query, Theme)
├── stores/               # Zustand 스토어 (auth, theme)
└── types/                # TypeScript 타입 정의
```

---

## 실행 방법

### 사전 준비

- Node.js 18 이상
- 백엔드 API 서버 실행 필요 (프록시: `/api` -> 백엔드)

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint
```

---

## 환경 변수

프로젝트 루트에 `.env.local` 파일을 생성하여 환경 변수를 설정할 수 있습니다.

```env
# 백엔드 API 서버 주소 (Next.js rewrites 설정 시)
NEXT_PUBLIC_API_URL=http://localhost:8080
```

> API 클라이언트는 기본적으로 `/api` 경로를 사용합니다. Next.js의 `rewrites` 설정을 통해 백엔드 서버로 프록시됩니다.
