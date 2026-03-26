import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-wt-bg px-4">
      <div className="text-center max-w-sm">
        <p className="text-5xl font-black text-wt-primary mb-3">404</p>
        <h2 className="text-[16px] font-bold text-wt-text mb-1">페이지를 찾을 수 없습니다</h2>
        <p className="text-[13px] text-wt-text-muted mb-5">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-wt-primary px-5 py-2.5 text-[13px] font-bold text-white hover:bg-wt-primary-dark transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
