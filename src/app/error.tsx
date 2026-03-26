"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-wt-bg px-4">
      <div className="text-center max-w-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-wt-red/10">
          <svg className="h-7 w-7 text-wt-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h2 className="text-[16px] font-bold text-wt-text mb-1">문제가 발생했습니다</h2>
        <p className="text-[13px] text-wt-text-muted mb-5">
          일시적인 오류입니다. 다시 시도해주세요.
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-wt-primary px-5 py-2.5 text-[13px] font-bold text-white hover:bg-wt-primary-dark transition-colors"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
