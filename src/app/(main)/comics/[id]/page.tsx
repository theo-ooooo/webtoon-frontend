"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { formatViewCount, formatDate, DAY_LABELS } from "@/lib/format";
import { useComicDetail } from "@/hooks/useComics";
import { useEpisodeList } from "@/hooks/useEpisodes";
import { useReadHistory } from "@/hooks/useMypage";
import { useAuthStore } from "@/stores/auth";
import PurchaseModal from "@/components/episode/PurchaseModal";
import { ErrorState } from "@/components/common/StateView";
import type { EpisodeListItem } from "@/types";

export default function ComicDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const comicId = id as string;
  const { user } = useAuthStore();
  const { data: comic, isLoading: comicLoading, isError: comicError, refetch: comicRefetch } = useComicDetail(comicId);
  const { data: episodes = [], isLoading: epLoading, isError: epError, refetch: epRefetch } = useEpisodeList(comicId);
  const { data: history = [] } = useReadHistory();

  const [purchaseTarget, setPurchaseTarget] = useState<EpisodeListItem | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const handleEpisodeClick = (ep: EpisodeListItem) => {
    if (ep.free || ep.purchased) {
      router.push(`/viewer/${comicId}/${ep.id}`);
    } else if (!user) {
      router.push("/login");
    } else {
      setPurchaseTarget(ep);
    }
  };

  const sortedEpisodes = [...episodes].sort((a, b) =>
    sortAsc ? a.episodeNumber - b.episodeNumber : b.episodeNumber - a.episodeNumber
  );

  const firstEpisode = episodes.length > 0
    ? episodes.reduce((min, ep) => ep.episodeNumber < min.episodeNumber ? ep : min, episodes[0])
    : null;

  // Find continue reading position for this comic
  const readProgress = history.find((h) => String(h.comicId) === comicId);

  if (comicLoading || epLoading) {
    return (
      <div className="min-h-screen bg-wt-bg">
        {/* Hero skeleton */}
        <div className="bg-wt-bg-card">
          <div className="mx-auto max-w-5xl px-4 py-8">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="mx-auto sm:mx-0 skeleton h-52 w-36 shrink-0 rounded-xl" />
              <div className="flex-1 space-y-3 pt-2">
                <div className="skeleton h-6 w-48 rounded mx-auto sm:mx-0" />
                <div className="skeleton h-4 w-28 rounded mx-auto sm:mx-0" />
                <div className="flex gap-1.5 justify-center sm:justify-start">
                  <div className="skeleton h-5 w-14 rounded-md" />
                  <div className="skeleton h-5 w-10 rounded-md" />
                  <div className="skeleton h-5 w-12 rounded-md" />
                </div>
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="flex gap-2 justify-center sm:justify-start pt-2">
                  <div className="skeleton h-10 w-28 rounded-lg" />
                  <div className="skeleton h-10 w-20 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Episode list skeleton */}
        <div className="mx-auto max-w-5xl px-4 py-5">
          <div className="skeleton h-5 w-24 rounded mb-3" />
          <div className="rounded-xl bg-wt-bg-card border border-wt-border overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-3 border-b border-wt-border last:border-b-0">
                <div className="skeleton h-16 w-12 rounded-md shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-4 w-40 rounded" />
                  <div className="skeleton h-3 w-24 rounded" />
                </div>
                <div className="skeleton h-5 w-12 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (comicError) {
    return (
      <div className="min-h-screen bg-wt-bg">
        <ErrorState message="작품 정보를 불러오지 못했습니다" onRetry={() => comicRefetch()} />
      </div>
    );
  }

  if (!comic) return null;

  return (
    <div className="min-h-screen bg-wt-bg">
      {/* Hero */}
      <div className="relative overflow-hidden">
        {comic.thumbnail && (
          <div className="absolute inset-0">
            <img src={comic.thumbnail} alt="" className="h-full w-full object-cover opacity-15 blur-3xl scale-125" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
          </div>
        )}

        <div className="relative mx-auto max-w-5xl px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Thumbnail */}
            <div className="mx-auto sm:mx-0 h-52 w-36 shrink-0 overflow-hidden rounded-xl bg-wt-bg-elevated shadow-2xl shadow-black/50">
              {comic.thumbnail ? (
                <img src={comic.thumbnail} alt={comic.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center img-placeholder text-wt-text-muted">
                  <svg className="h-10 w-10 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl font-black text-white sm:text-2xl">{comic.title}</h1>
              <p className="mt-1 text-[13px] text-wt-text-secondary">{comic.author}</p>

              <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-1.5">
                <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${
                  comic.status === "ONGOING"
                    ? "bg-wt-primary/15 text-wt-primary"
                    : "bg-wt-accent-red/15 text-wt-accent-red"
                }`}>
                  {comic.status === "ONGOING" ? "연재중" : "완결"}
                </span>
                {comic.days.map((d) => (
                  <span key={d} className="rounded-md bg-wt-bg-elevated px-2 py-0.5 text-[11px] text-wt-text-secondary">
                    {DAY_LABELS[d]}
                  </span>
                ))}
                {comic.genres.map((g) => (
                  <span key={g} className="rounded-md bg-wt-bg-elevated px-2 py-0.5 text-[11px] text-wt-text-muted">
                    {g}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-center sm:justify-start gap-3 text-[12px]">
                <span className="flex items-center gap-1 text-wt-text-secondary">
                  <svg className="h-3.5 w-3.5 text-wt-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {comic.averageRating > 0 ? comic.averageRating.toFixed(1) : "-"}
                </span>
                <span className="text-wt-text-muted">|</span>
                <span className="text-wt-text-secondary">{formatViewCount(comic.viewCount)} 조회</span>
                <span className="text-wt-text-muted">|</span>
                <span className="text-wt-success text-[11px] font-medium">{comic.freeEpisodeCount}화 무료</span>
              </div>

              {comic.description && (
                <div className="mt-3">
                  <p className={`text-[13px] text-wt-text-secondary leading-relaxed ${!showFullDesc ? "line-clamp-2" : ""}`}>
                    {comic.description}
                  </p>
                  {comic.description.length > 80 && (
                    <button
                      onClick={() => setShowFullDesc(!showFullDesc)}
                      className="mt-1 text-[11px] text-wt-text-muted hover:text-wt-text-secondary transition-colors"
                    >
                      {showFullDesc ? "접기" : "더보기"}
                    </button>
                  )}
                </div>
              )}

              {/* CTA Buttons */}
              <div className="mt-5 flex justify-center sm:justify-start gap-2">
                {/* Primary CTA: Continue or Start */}
                {readProgress ? (
                  <Link
                    href={`/viewer/${comicId}/${readProgress.lastEpisodeId}`}
                    className="rounded-lg bg-wt-primary px-6 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-wt-primary-dark active:scale-[0.97] flex items-center gap-1.5"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    {readProgress.lastEpisodeNumber}화 이어보기
                  </Link>
                ) : firstEpisode ? (
                  <button
                    onClick={() => handleEpisodeClick(firstEpisode)}
                    className="rounded-lg bg-wt-primary px-6 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-wt-primary-dark active:scale-[0.97]"
                  >
                    첫화 보기
                  </button>
                ) : null}
                <Link
                  href="/"
                  className="rounded-lg border border-wt-border-light px-6 py-2.5 text-[13px] font-medium text-wt-text-secondary transition-colors hover:bg-wt-bg-hover hover:text-wt-text"
                >
                  목록
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episode list */}
      <div className="mx-auto max-w-5xl px-4 py-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-wt-text">
            에피소드
            <span className="ml-1.5 text-[12px] font-normal text-wt-text-muted">{episodes.length}화</span>
          </h2>
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="flex items-center gap-1 text-[12px] text-wt-text-muted hover:text-wt-text-secondary transition-colors"
          >
            <svg className={`h-3.5 w-3.5 transition-transform ${sortAsc ? "" : "rotate-180"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            {sortAsc ? "1화부터" : "최신화부터"}
          </button>
        </div>

        {epError ? (
          <ErrorState message="에피소드 목록을 불러오지 못했습니다" onRetry={() => epRefetch()} />
        ) : (
          <div className="rounded-xl bg-wt-bg-card border border-wt-border overflow-hidden">
            {sortedEpisodes.map((ep) => (
              <button
                key={ep.id}
                onClick={() => handleEpisodeClick(ep)}
                className={`flex w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-wt-bg-hover border-b border-wt-border last:border-b-0 group ${
                  ep.read ? "opacity-50" : ""
                }`}
              >
                <div className="h-16 w-12 shrink-0 overflow-hidden rounded-md bg-wt-bg-elevated transition-transform group-hover:scale-[1.03]">
                  {ep.thumbnail ? (
                    <img src={ep.thumbnail} alt={ep.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-wt-text-muted text-[11px]">
                      {ep.episodeNumber}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[13px] font-medium text-wt-text truncate group-hover:text-wt-primary transition-colors">
                      {ep.episodeNumber}화 - {ep.title}
                    </p>
                    {isNewEpisode(ep.createdAt) && (
                      <span className="shrink-0 rounded bg-wt-accent-red px-1 py-px text-[9px] font-bold text-white">
                        N
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[11px] text-wt-text-muted">{formatDate(ep.createdAt)}</p>
                </div>

                <div className="shrink-0">
                  {ep.free ? (
                    <span className="text-[11px] font-bold text-wt-success">무료</span>
                  ) : ep.purchased ? (
                    <svg className="h-4 w-4 text-wt-text-muted" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="flex items-center gap-0.5 text-[11px] font-bold text-wt-primary">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      {ep.coinPrice}
                    </span>
                  )}
                </div>
              </button>
            ))}

            {episodes.length === 0 && (
              <div className="py-12 text-center text-[13px] text-wt-text-muted">
                아직 등록된 에피소드가 없습니다
              </div>
            )}
          </div>
        )}
      </div>

      {purchaseTarget && (
        <PurchaseModal
          isOpen={!!purchaseTarget}
          onClose={() => setPurchaseTarget(null)}
          comicId={comicId}
          episodeId={String(purchaseTarget.id)}
          episodeNumber={purchaseTarget.episodeNumber}
          coinPrice={purchaseTarget.coinPrice}
          onSuccess={() => {
            const epId = purchaseTarget.id;
            setPurchaseTarget(null);
            router.push(`/viewer/${comicId}/${epId}`);
          }}
        />
      )}
    </div>
  );
}

function isNewEpisode(dateStr: string): boolean {
  const created = new Date(dateStr);
  const now = new Date();
  const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 3;
}
