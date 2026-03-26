"use client";

import { useCompletedComics } from "@/hooks/useComics";
import ComicCard from "@/components/comic/ComicCard";
import { EmptyState, ErrorState } from "@/components/common/StateView";

export default function CompletedPage() {
  const { data, isLoading, isError, refetch } = useCompletedComics();
  const comics = data?.content ?? [];

  return (
    <div className="min-h-screen bg-wt-bg">
      <div className="border-b border-wt-border">
        <div className="mx-auto max-w-5xl px-4 py-5">
          <h1 className="text-lg font-black text-wt-text">완결 웹툰</h1>
          <p className="mt-0.5 text-[12px] text-wt-text-muted">완결된 명작을 한번에</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-5">
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
          <ErrorState message="완결 웹툰을 불러오지 못했습니다" onRetry={() => refetch()} />
        ) : comics.length === 0 ? (
          <EmptyState message="완결된 웹툰이 없습니다" />
        ) : (
          <div className="grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {comics.map((comic) => (
              <ComicCard key={comic.id} comic={comic} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
