"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import { usePurchases, useReadHistory } from "@/hooks/useMypage";
import { formatDate } from "@/lib/format";

export default function MyPage() {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const { data: purchaseData } = usePurchases();
  const { data: history = [] } = useReadHistory();

  const purchases = purchaseData?.content ?? [];

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-wt-bg">
      {/* Profile */}
      <div className="border-b border-wt-border">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wt-primary text-lg font-black text-white">
              {user.nickname.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-[16px] font-bold text-wt-text">{user.nickname}</h1>
              <p className="text-[12px] text-wt-text-muted">{user.email}</p>
            </div>
          </div>

          {/* Coin */}
          <Link
            href="/mypage/charge"
            className="mt-4 flex items-center justify-between rounded-xl bg-wt-bg-elevated px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-wt-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a5.38 5.38 0 01-.491-.971H10a1 1 0 100-2H8.003a7.364 7.364 0 010-1H10a1 1 0 100-2H8.245c.155-.339.328-.654.491-.971z" />
              </svg>
              <span className="text-lg font-black text-wt-primary">{user.coinBalance}</span>
              <span className="text-[11px] text-wt-text-muted">코인</span>
            </div>
            <span className="rounded-full bg-wt-primary/15 px-3 py-1 text-[11px] font-bold text-wt-primary">
              충전
            </span>
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-5 space-y-5">
        {/* Continue reading */}
        {history.length > 0 && (
          <section>
            <h2 className="text-[14px] font-bold text-wt-text mb-3 flex items-center gap-2">
              <svg className="h-4 w-4 text-wt-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              이어보기
              <span className="text-[11px] font-normal text-wt-text-muted">{history.length}</span>
            </h2>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
              {history.map((item) => (
                <Link
                  key={item.comicId}
                  href={`/viewer/${item.comicId}/${item.lastEpisodeId}`}
                  className="group shrink-0 w-20"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-wt-bg-elevated">
                    {item.comicThumbnail ? (
                      <img src={item.comicThumbnail} alt={item.comicTitle} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center img-placeholder" />
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-1.5 pb-1 pt-3">
                      <p className="text-[10px] font-medium text-white">{item.lastEpisodeNumber}화</p>
                    </div>
                  </div>
                  <p className="mt-1.5 text-[11px] font-bold text-wt-text truncate group-hover:text-wt-primary transition-colors">
                    {item.comicTitle}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Purchase history */}
        <section>
          <h2 className="text-[14px] font-bold text-wt-text mb-3 flex items-center gap-2">
            구매 내역
            <span className="text-[11px] font-normal text-wt-text-muted">{purchases.length}</span>
          </h2>
          <div className="rounded-xl bg-wt-bg-card border border-wt-border overflow-hidden">
            {purchases.length > 0 ? (
              purchases.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between px-4 py-3 border-b border-wt-border last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-wt-text truncate">{p.comicTitle}</p>
                    <p className="mt-0.5 text-[11px] text-wt-text-muted">{p.episodeTitle}</p>
                  </div>
                  <div className="shrink-0 text-right ml-4">
                    <p className="text-[13px] font-bold text-wt-primary">-{p.coinUsed}</p>
                    <p className="mt-0.5 text-[10px] text-wt-text-muted">{formatDate(p.purchasedAt)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-[13px] text-wt-text-muted">구매 내역이 없습니다</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
