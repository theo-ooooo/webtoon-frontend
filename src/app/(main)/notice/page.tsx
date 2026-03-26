"use client";

import { useState } from "react";
import Link from "next/link";
import { useNoticeList, useNoticeDetail } from "@/hooks/useNotice";

function NoticeContent({ id }: { id: number }) {
  const { data: detail, isLoading } = useNoticeDetail(id);

  if (isLoading) {
    return (
      <div className="border-t border-wt-border bg-wt-bg-elevated px-5 py-5 sm:px-6">
        <div className="animate-pulse space-y-2">
          <div className="h-3 w-1/4 rounded bg-wt-bg-card" />
          <div className="h-3 w-full rounded bg-wt-bg-card" />
          <div className="h-3 w-full rounded bg-wt-bg-card" />
          <div className="h-3 w-3/4 rounded bg-wt-bg-card" />
        </div>
      </div>
    );
  }

  if (!detail) return null;

  return (
    <div className="border-t border-wt-border bg-wt-bg-elevated px-5 py-5 sm:px-6">
      <p className="text-xs text-wt-text-muted mb-3 sm:hidden">{detail.createdAt.slice(0, 10)}</p>
      <p className="whitespace-pre-line text-sm leading-relaxed text-wt-text-secondary">
        {detail.content}
      </p>
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="overflow-hidden rounded-xl bg-wt-bg-card shadow-sm border border-wt-border">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i}>
          {i > 0 && <div className="border-t border-wt-border" />}
          <div className="flex w-full items-center gap-3 px-5 py-4 sm:px-6">
            <div className="animate-pulse flex flex-1 items-center gap-3">
              <div className="h-4 w-10 rounded bg-wt-bg-elevated shrink-0" />
              <div className="h-4 flex-1 rounded bg-wt-bg-elevated" />
              <div className="h-3 w-20 rounded bg-wt-bg-elevated shrink-0 hidden sm:block" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function NoticePage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { data: notices, isLoading } = useNoticeList();

  const toggle = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-wt-bg">
      {/* Page Header */}
      <div className="bg-wt-bg-card border-b border-wt-border">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs text-wt-text-secondary hover:text-wt-primary transition-colors mb-4"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            홈으로
          </Link>
          <h1 className="text-2xl font-black text-wt-text sm:text-3xl">공지사항</h1>
          <p className="mt-2 text-sm text-wt-text-secondary">
            KYUNGWON TOON의 새로운 소식을 확인하세요
          </p>
        </div>
      </div>

      {/* Notice List */}
      <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8">
        {isLoading ? (
          <SkeletonList />
        ) : !notices || notices.length === 0 ? (
          <div className="overflow-hidden rounded-xl bg-wt-bg-card shadow-sm border border-wt-border px-5 py-16 text-center">
            <p className="text-sm text-wt-text-muted">등록된 공지사항이 없습니다.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl bg-wt-bg-card shadow-sm border border-wt-border">
            {notices.map((notice, index) => (
              <div key={notice.id}>
                {index > 0 && <div className="border-t border-wt-border" />}
                <button
                  onClick={() => toggle(notice.id)}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-wt-bg-elevated sm:px-6"
                >
                  {notice.isImportant && (
                    <span className="shrink-0 rounded bg-wt-primary/10 px-2 py-0.5 text-[11px] font-bold text-wt-primary">
                      중요
                    </span>
                  )}
                  <span className="flex-1 text-sm font-medium text-wt-text sm:text-[15px]">
                    {notice.title}
                  </span>
                  <span className="shrink-0 text-xs text-wt-text-muted hidden sm:flex items-center gap-2">
                    <span className="inline-flex items-center gap-0.5">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {notice.viewCount.toLocaleString()}
                    </span>
                    <span>{notice.createdAt.slice(0, 10)}</span>
                  </span>
                  <svg
                    className={`h-4 w-4 shrink-0 text-wt-text-muted transition-transform duration-200 ${
                      expandedId === notice.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedId === notice.id && <NoticeContent id={notice.id} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
