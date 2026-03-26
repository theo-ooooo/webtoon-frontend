"use client";

import { useState } from "react";
import Link from "next/link";
import { formatViewCount } from "@/lib/format";
import { usePopularRanking } from "@/hooks/useRanking";
import { EmptyState, ErrorState } from "@/components/common/StateView";
import type { RankingPeriod } from "@/types";

export default function PopularPage() {
  const [period, setPeriod] = useState<RankingPeriod>("DAILY");
  const { data: rankings = [], isLoading, isError, refetch } = usePopularRanking(period);

  return (
    <div className="min-h-screen bg-wt-bg">
      <div className="border-b border-wt-border">
        <div className="mx-auto max-w-5xl px-4 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-black text-wt-text">인기 웹툰</h1>
            <div className="flex rounded-lg bg-wt-bg-elevated p-0.5">
              {(["DAILY", "WEEKLY"] as RankingPeriod[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`rounded-md px-3.5 py-1.5 text-[12px] font-medium transition-all ${
                    period === p
                      ? "bg-wt-primary text-white"
                      : "text-wt-text-muted hover:text-wt-text"
                  }`}
                >
                  {p === "DAILY" ? "일간" : "주간"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-4">
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg p-3">
                <div className="skeleton h-6 w-6 rounded-full shrink-0" />
                <div className="skeleton h-14 w-10 rounded-md shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-4 w-32 rounded" />
                  <div className="skeleton h-3 w-20 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <ErrorState message="랭킹을 불러오지 못했습니다" onRetry={() => refetch()} />
        ) : rankings.length === 0 ? (
          <EmptyState message="랭킹 데이터가 없습니다" />
        ) : (
          <div className="space-y-1">
            {rankings.map((item, idx) => (
              <Link
                key={item.comicId}
                href={`/comics/${item.comicId}`}
                className="fade-in flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-wt-bg-card group"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div className="w-8 text-center shrink-0">
                  {item.rank <= 3 ? (
                    <span className={`text-xl font-black ${
                      item.rank === 1 ? "text-wt-gold" :
                      item.rank === 2 ? "text-wt-silver" :
                      "text-wt-bronze"
                    }`}>
                      {item.rank}
                    </span>
                  ) : (
                    <span className="text-base font-bold text-wt-text-muted">{item.rank}</span>
                  )}
                </div>

                <div className="h-14 w-10 shrink-0 overflow-hidden rounded-md bg-wt-bg-elevated transition-transform group-hover:scale-[1.03]">
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center img-placeholder" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`font-bold truncate text-wt-text group-hover:text-wt-primary transition-colors ${item.rank <= 3 ? "text-[14px]" : "text-[13px]"}`}>
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-wt-text-muted">{item.author}</p>
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-[12px] text-wt-text-muted font-medium tabular-nums">
                    {formatViewCount(item.viewCount)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
