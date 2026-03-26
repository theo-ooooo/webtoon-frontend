"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth";
import { useEpisodeDetail, useEpisodeList } from "@/hooks/useEpisodes";
import { useComicDetail } from "@/hooks/useComics";
import { useRateEpisode, useMyRating } from "@/hooks/useMypage";
import PurchaseModal from "@/components/episode/PurchaseModal";
import { useToast } from "@/components/common/Toast";

export default function EpisodeViewerPage() {
  const params = useParams();
  const router = useRouter();
  const comicId = params.comicId as string;
  const episodeId = params.episodeId as string;
  const { user } = useAuthStore();
  const [drawerPurchaseTarget, setDrawerPurchaseTarget] = useState<{
    id: number;
    episodeNumber: number;
    coinPrice: number;
  } | null>(null);
  const [showNav, setShowNav] = useState(true);
  const [showEpisodeDrawer, setShowEpisodeDrawer] = useState(false);

  const { data: comic } = useComicDetail(comicId);
  const { data: episodeList = [] } = useEpisodeList(comicId);
  const { data: episode, isLoading, error } = useEpisodeDetail(comicId, episodeId);

  const episodeMeta = episodeList.find((ep) => String(ep.id) === episodeId);
  const { data: myRating = 0 } = useMyRating(comicId, episodeId);
  const rateMutation = useRateEpisode();
  const { toast } = useToast();

  const handleViewerClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button") || target.closest("[data-no-toggle]")) return;
    setShowNav((prev) => !prev);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowEpisodeDrawer(false);
  }, [episodeId]);

  useEffect(() => {
    if (showEpisodeDrawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showEpisodeDrawer]);

  const handleRate = (score: number) => {
    rateMutation.mutate(
      { comicId, episodeId, score },
      {
        onSuccess: () => toast(`${score}점 평가 완료`, "success"),
        onError: () => toast("평가에 실패했습니다", "error"),
      }
    );
  };

  // Redirect on auth/error — must be in useEffect, not during render
  useEffect(() => {
    if (!isLoading && error && episodeMeta && !user) {
      router.replace("/login");
    } else if (!isLoading && error && !episodeMeta) {
      router.back();
    }
  }, [isLoading, error, episodeMeta, user, router]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-wt-bg-elevated border-t-wt-primary" />
      </div>
    );
  }

  if (error && episodeMeta) {
    if (!user) return null;
    return (
      <div className="min-h-screen bg-black">
        <PurchaseModal
          isOpen={true}
          onClose={() => router.back()}
          comicId={comicId}
          episodeId={episodeId}
          episodeNumber={episodeMeta.episodeNumber}
          coinPrice={episodeMeta.coinPrice}
          onSuccess={() => router.push(`/viewer/${comicId}/${episodeId}`)}
        />
      </div>
    );
  }

  if (error) return null;
  if (!episode) return null;

  const currentRating = rateMutation.variables?.score ?? myRating;

  return (
    <div className="min-h-screen bg-black" onClick={handleViewerClick}>
      {/* Top nav */}
      <div className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}>
        <div className="glass border-b border-white/[0.06]">
          <div className="mx-auto flex h-11 max-w-3xl items-center justify-between px-4">
            <Link
              href={`/comics/${comicId}`}
              className="p-1.5 text-wt-text-secondary hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="text-center min-w-0 flex-1 px-4">
              <p className="text-[11px] text-wt-text-muted truncate">{comic?.title}</p>
              <p className="text-[13px] text-white font-medium truncate">
                {episode.episodeNumber}화 - {episode.title}
              </p>
            </div>
            <button
              onClick={() => setShowEpisodeDrawer(true)}
              className="p-1.5 text-wt-text-secondary hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Image viewer */}
      <div
        className="mx-auto max-w-3xl select-none"
        style={{ paddingTop: showNav ? 44 : 0 }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {episode.imageUrls.length > 0 ? (
          episode.imageUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`${i + 1}`}
              className="w-full block pointer-events-none"
              loading="lazy"
              draggable={false}
            />
          ))
        ) : (
          <div className="flex items-center justify-center py-40">
            <p className="text-wt-text-muted text-[13px]">이미지가 없습니다</p>
          </div>
        )}
      </div>

      {/* Rating + navigation */}
      <div className="mx-auto max-w-3xl">
        {user && (
          <div className="border-t border-wt-border py-8 px-4">
            <p className="text-center text-[13px] text-wt-text-muted mb-3">
              이 에피소드 어떠셨나요?
            </p>
            <div className="flex justify-center gap-1.5">
              {Array.from({ length: 5 }, (_, i) => i + 1).map((score) => (
                <button
                  key={score}
                  onClick={() => handleRate(score)}
                  className={`transition-all ${
                    score <= currentRating
                      ? "text-wt-gold scale-110"
                      : "text-wt-text-muted hover:text-wt-text-secondary"
                  }`}
                >
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            {currentRating > 0 && (
              <p className="mt-2 text-center text-[13px] font-bold text-wt-gold">{currentRating}점</p>
            )}
          </div>
        )}

        {/* Nav buttons */}
        <div className="border-t border-wt-border px-4 py-4">
          <div className="flex gap-2">
            {episode.prevEpisodeId ? (
              <Link
                href={`/viewer/${comicId}/${episode.prevEpisodeId}`}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-wt-border-light py-3 text-[13px] text-wt-text-secondary hover:bg-wt-bg-hover hover:text-white transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                이전화
              </Link>
            ) : (
              <div className="flex flex-1 items-center justify-center py-3 rounded-lg border border-wt-border text-[13px] text-wt-text-muted">
                이전화 없음
              </div>
            )}
            <Link
              href={`/comics/${comicId}`}
              className="flex flex-1 items-center justify-center rounded-lg bg-wt-primary py-3 text-[13px] font-bold text-white hover:bg-wt-primary-dark transition-colors"
            >
              목록
            </Link>
            {episode.nextEpisodeId ? (
              <Link
                href={`/viewer/${comicId}/${episode.nextEpisodeId}`}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-wt-border-light py-3 text-[13px] text-wt-text-secondary hover:bg-wt-bg-hover hover:text-white transition-colors"
              >
                다음화
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div className="flex flex-1 items-center justify-center py-3 rounded-lg border border-wt-border text-[13px] text-wt-text-muted">
                다음화 없음
              </div>
            )}
          </div>
        </div>

        <div className="pb-16 text-center">
          <p className="text-[10px] text-wt-text-muted">
            본 콘텐츠의 저작권은 작가에게 있습니다.
          </p>
        </div>
      </div>

      {/* Floating bottom bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${
        showNav ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}>
        <div className="glass border-t border-white/[0.06]">
          <div className="mx-auto flex h-11 max-w-3xl items-center justify-between px-6">
            {episode.prevEpisodeId ? (
              <button
                onClick={() => router.push(`/viewer/${comicId}/${episode.prevEpisodeId}`)}
                className="flex items-center gap-1 text-[13px] text-wt-text-secondary hover:text-white transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                이전화
              </button>
            ) : (
              <span className="text-[13px] text-wt-text-muted">이전화</span>
            )}
            <span className="text-[13px] font-medium text-wt-text-secondary">
              {episode.episodeNumber}화
            </span>
            {episode.nextEpisodeId ? (
              <button
                onClick={() => router.push(`/viewer/${comicId}/${episode.nextEpisodeId}`)}
                className="flex items-center gap-1 text-[13px] text-wt-text-secondary hover:text-white transition-colors"
              >
                다음화
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <span className="text-[13px] text-wt-text-muted">다음화</span>
            )}
          </div>
        </div>
      </div>

      {/* Episode drawer */}
      {showEpisodeDrawer && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowEpisodeDrawer(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-72 max-w-[80vw] bg-wt-bg-elevated border-l border-wt-border-light slide-in-right flex flex-col">
            <div className="flex items-center justify-between border-b border-wt-border px-4 py-3">
              <h3 className="text-[13px] font-bold text-white">에피소드</h3>
              <button
                onClick={() => setShowEpisodeDrawer(false)}
                className="p-1 text-wt-text-muted hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto" data-no-toggle>
              {episodeList.map((ep) => {
                const isCurrent = String(ep.id) === episodeId;
                const isLocked = !ep.free && !ep.purchased;
                return (
                  <button
                    key={ep.id}
                    onClick={() => {
                      if (ep.free || ep.purchased) {
                        router.push(`/viewer/${comicId}/${ep.id}`);
                        setShowEpisodeDrawer(false);
                      } else if (user) {
                        setDrawerPurchaseTarget({ id: ep.id, episodeNumber: ep.episodeNumber, coinPrice: ep.coinPrice });
                      } else {
                        router.push("/login");
                      }
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                      isCurrent
                        ? "bg-wt-primary/10 border-l-2 border-wt-primary"
                        : "border-l-2 border-transparent hover:bg-wt-bg-hover"
                    } ${isLocked ? "opacity-60" : ""}`}
                  >
                    <div className="h-12 w-9 shrink-0 overflow-hidden rounded bg-wt-bg-elevated">
                      {ep.thumbnail ? (
                        <img src={ep.thumbnail} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-wt-text-muted">
                          {ep.episodeNumber}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[12px] truncate ${
                        isCurrent ? "font-bold text-wt-primary" : "text-wt-text-secondary"
                      }`}>
                        {ep.episodeNumber}화 - {ep.title}
                      </p>
                    </div>
                    <div className="shrink-0">
                      {ep.free ? (
                        <span className="text-[10px] font-bold text-wt-success">무료</span>
                      ) : ep.purchased ? (
                        <svg className="h-3.5 w-3.5 text-wt-text-muted" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-[10px] font-bold text-wt-primary">
                          {ep.coinPrice}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {drawerPurchaseTarget && (
        <PurchaseModal
          isOpen={!!drawerPurchaseTarget}
          onClose={() => setDrawerPurchaseTarget(null)}
          comicId={comicId}
          episodeId={String(drawerPurchaseTarget.id)}
          episodeNumber={drawerPurchaseTarget.episodeNumber}
          coinPrice={drawerPurchaseTarget.coinPrice}
          onSuccess={() => {
            const epId = drawerPurchaseTarget.id;
            setDrawerPurchaseTarget(null);
            setShowEpisodeDrawer(false);
            router.push(`/viewer/${comicId}/${epId}`);
          }}
        />
      )}
    </div>
  );
}
