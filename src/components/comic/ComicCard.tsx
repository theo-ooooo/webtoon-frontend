"use client";

import Link from "next/link";
import type { ComicListItem } from "@/types";

export default function ComicCard({ comic, rank, showUp }: { comic: ComicListItem; rank?: number; showUp?: boolean }) {
  return (
    <Link href={`/comics/${comic.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-wt-bg-card">
        {comic.thumbnail ? (
          <img
            src={comic.thumbnail}
            alt={comic.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
          />
        ) : (
          <div className="flex h-full items-center justify-center img-placeholder text-wt-text-muted">
            <svg className="h-10 w-10 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Badges */}
        <div className="absolute left-1.5 top-1.5 flex flex-col gap-1">
          {showUp && (
            <span className="rounded bg-wt-accent-red px-1.5 py-0.5 text-[10px] font-black text-white leading-tight">
              UP
            </span>
          )}
          {comic.status === "COMPLETED" && (
            <span className="rounded bg-wt-primary px-1.5 py-0.5 text-[10px] font-bold text-white leading-tight">
              완결
            </span>
          )}
        </div>

        {/* Rank number */}
        {rank && (
          <div className="absolute left-1.5 bottom-1.5">
            <span className="text-[28px] font-black text-white leading-none drop-shadow-lg" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
              {rank}
            </span>
          </div>
        )}
      </div>

      <div className="mt-2 px-0.5">
        <h3 className="text-[13px] font-bold truncate text-wt-text group-hover:text-wt-primary transition-colors">
          {comic.title}
        </h3>
        <p className="mt-0.5 text-[11px] text-wt-text-muted truncate">{comic.author}</p>
        {comic.averageRating > 0 && (
          <div className="mt-1 flex items-center gap-1">
            <svg className="h-3 w-3 text-wt-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[11px] font-medium text-wt-text-secondary">{comic.averageRating.toFixed(1)}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
