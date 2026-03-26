"use client";

/**
 * KYUNGWON TOON Brand Logo
 *
 * Concept: "Frame" — 둥근 사각형(만화 프레임) 안에 이야기가 펼쳐지는 형상.
 * 왼쪽의 아이콘은 겹쳐진 두 개의 페이지/프레임으로
 * "이야기가 겹겹이 쌓인 콘텐츠 플랫폼"을 표현.
 * Electric Violet 그래디언트로 창작과 상상력을 상징.
 */

/** 아이콘만 (정사각) */
export function LogoIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      {/* Back frame (offset) */}
      <rect x="6" y="3" width="20" height="24" rx="4" fill="#7C3AED" opacity="0.35" />
      {/* Front frame */}
      <rect x="4" y="5" width="20" height="24" rx="4" fill="url(#logo-grad)" />
      {/* Page lines */}
      <rect x="9" y="12" width="10" height="1.5" rx="0.75" fill="white" opacity="0.9" />
      <rect x="9" y="16" width="7" height="1.5" rx="0.75" fill="white" opacity="0.5" />
      <rect x="9" y="20" width="10" height="1.5" rx="0.75" fill="white" opacity="0.3" />
    </svg>
  );
}

/** 아이콘 + 텍스트 (기본 로고) */
export function LogoFull({ iconSize = 24 }: { iconSize?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <LogoIcon size={iconSize} />
      <span className="text-[15px] font-extrabold tracking-tight text-wt-text">
        <span className="text-wt-primary">K</span>TOON
      </span>
    </span>
  );
}

/** 작은 로고 (헤더용) */
export function LogoCompact() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <LogoIcon size={22} />
      <span className="text-[14px] font-extrabold tracking-tight text-wt-text">
        <span className="text-wt-primary">K</span>TOON
      </span>
    </span>
  );
}

/** 큰 로고 (로그인/회원가입용) */
export function LogoLarge() {
  return (
    <div className="flex flex-col items-center gap-2">
      <LogoIcon size={40} />
      <span className="text-xl font-extrabold tracking-tight text-wt-text">
        <span className="text-wt-primary">K</span>TOON
      </span>
    </div>
  );
}

/** 푸터용 작은 로고 */
export function LogoSmall() {
  return (
    <span className="inline-flex items-center gap-1">
      <LogoIcon size={18} />
      <span className="text-[12px] font-extrabold tracking-tight text-wt-text">
        <span className="text-wt-primary">K</span>TOON
      </span>
    </span>
  );
}
