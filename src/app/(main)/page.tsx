"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { getTodayDay } from "@/lib/format";
import { useComicsByDay } from "@/hooks/useComics";
import { usePopularRanking } from "@/hooks/useRanking";
import { useReadHistory } from "@/hooks/useMypage";
import { useActiveEvents } from "@/hooks/useEvents";
import { useAuthStore } from "@/stores/auth";
import type { DayOfWeek } from "@/types";
import ComicCard from "@/components/comic/ComicCard";
import DayTabs from "@/components/comic/DayTabs";
import { EmptyState, ErrorState } from "@/components/common/StateView";

const DEFAULT_BANNER = {
  id: 0,
  title: "KYUNGWON TOON",
  description: "다양한 장르의 웹툰을 무료로 즐기세요",
  bgColor: "#1a1a2e",
  linkUrl: "/",
};

export default function HomePage() {
  const [day, setDay] = useState<DayOfWeek>(getTodayDay() as DayOfWeek);
  const { data, isLoading, isError, refetch } = useComicsByDay(day);
  const { user } = useAuthStore();
  const { data: history = [] } = useReadHistory();
  const { data: rankings = [] } = usePopularRanking("DAILY");
  const { data: events = [] } = useActiveEvents();

  const banners = useMemo(() => {
    if (events.length === 0) return [DEFAULT_BANNER];
    return events.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      bgColor: event.bgColor,
      linkUrl: event.linkUrl,
    }));
  }, [events]);

  const [currentBanner, setCurrentBanner] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setCurrentBanner(0);
  }, [banners]);

  const nextBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (isPaused || banners.length <= 1) return;
    const timer = setInterval(nextBanner, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextBanner, banners.length]);

  const comics = data?.content ?? [];
  const isToday = day === getTodayDay();

  return (
    <div className="min-h-screen bg-wt-bg">
      {/* Hero Banner */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex transition-transform duration-600 ease-out"
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        >
          {banners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.linkUrl}
              className="relative w-full shrink-0 overflow-hidden group"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 30% 50%, ${banner.bgColor}80 0%, transparent 70%), radial-gradient(ellipse at 70% 80%, ${banner.bgColor}40 0%, transparent 60%), #000`,
                }}
              />
              <div className="relative mx-auto flex min-h-[180px] max-w-5xl items-center px-5 py-12 sm:min-h-[240px] sm:py-16">
                <div className="max-w-lg">
                  <h2 className="text-2xl font-black leading-tight text-white sm:text-3xl">
                    {banner.title}
                  </h2>
                  <p className="mt-2 text-[13px] text-white/60 sm:text-sm line-clamp-2">
                    {banner.description}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1 rounded-lg bg-wt-primary px-4 py-2 text-[12px] font-bold text-white transition-all group-hover:bg-wt-primary-dark group-hover:gap-2">
                    자세히 보기
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {banners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentBanner(i)}
                className={`h-1 rounded-full transition-all ${
                  i === currentBanner ? "w-5 bg-wt-primary" : "w-1 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Continue reading */}
      {user && history.length > 0 && (
        <section className="border-b border-wt-border">
          <div className="mx-auto max-w-5xl px-4 py-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[14px] font-bold text-wt-text flex items-center gap-2">
                <svg className="h-4 w-4 text-wt-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                이어보기
              </h2>
              <Link href="/mypage" className="text-[11px] text-wt-text-muted hover:text-wt-text-secondary transition-colors">
                전체보기
              </Link>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
              {history.slice(0, 10).map((item) => (
                <Link
                  key={item.comicId}
                  href={`/viewer/${item.comicId}/${item.lastEpisodeId}`}
                  className="group shrink-0 w-20"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-wt-bg-elevated">
                    {item.comicThumbnail ? (
                      <img
                        src={item.comicThumbnail}
                        alt={item.comicTitle}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center img-placeholder" />
                    )}
                    {/* Play icon on hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="rounded-full bg-wt-primary p-1.5">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
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
          </div>
        </section>
      )}

      {/* Day tabs */}
      <DayTabs selected={day} onChange={(d) => { if (d !== "ALL") setDay(d); }} />

      {/* Comic grid */}
      <section className="mx-auto max-w-5xl px-4 py-6">
        {isLoading ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i}>
                <div className="skeleton aspect-[3/4] rounded-lg" />
                <div className="mt-2 skeleton h-3.5 w-3/4 rounded" />
                <div className="mt-1 skeleton h-3 w-1/2 rounded" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <ErrorState message="웹툰 목록을 불러오지 못했습니다" onRetry={() => refetch()} />
        ) : comics.length === 0 ? (
          <EmptyState message="해당 요일에 연재 중인 웹툰이 없습니다" />
        ) : (
          <div className="grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {comics.map((comic, idx) => (
              <ComicCard key={comic.id} comic={comic} showUp={isToday && idx < 3} />
            ))}
          </div>
        )}
      </section>

      {/* Popular ranking */}
      {rankings.length > 0 && (
        <section className="border-t border-wt-border bg-wt-bg-card">
          <div className="mx-auto max-w-5xl px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[14px] font-bold text-wt-text flex items-center gap-2">
                <svg className="h-4 w-4 text-wt-accent-red" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                실시간 인기
              </h2>
              <Link href="/popular" className="text-[11px] text-wt-text-muted hover:text-wt-text-secondary transition-colors">
                더보기
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {rankings.slice(0, 10).map((item) => (
                <Link
                  key={item.comicId}
                  href={`/comics/${item.comicId}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-wt-bg-hover transition-colors group"
                >
                  <span className={`w-5 text-center text-[14px] font-black tabular-nums ${
                    item.rank <= 3 ? "text-wt-primary" : "text-wt-text-muted"
                  }`}>
                    {item.rank}
                  </span>
                  <div className="h-10 w-7 shrink-0 overflow-hidden rounded bg-wt-bg-elevated">
                    {item.thumbnail && (
                      <img src={item.thumbnail} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-wt-text truncate group-hover:text-wt-primary transition-colors">{item.title}</p>
                    <p className="text-[11px] text-wt-text-muted">{item.author}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
