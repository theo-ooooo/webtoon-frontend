"use client";

/** 빈 데이터 상태 */
export function EmptyState({
  message = "데이터가 없습니다",
  icon,
}: {
  message?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-3 text-wt-text-muted">
        {icon || (
          <svg className="h-10 w-10 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        )}
      </div>
      <p className="text-[13px] text-wt-text-muted">{message}</p>
    </div>
  );
}

/** 에러 상태 (데이터 로드 실패) */
export function ErrorState({
  message = "데이터를 불러오지 못했습니다",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-wt-red/10">
        <svg className="h-5 w-5 text-wt-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <p className="text-[13px] text-wt-text-muted mb-3">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg border border-wt-border-light px-4 py-2 text-[12px] font-medium text-wt-text-secondary hover:bg-wt-bg-hover hover:text-wt-text transition-colors"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}

/** 전체 페이지 로딩 스피너 */
export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-wt-bg-elevated border-t-wt-primary" />
    </div>
  );
}
