"use client";

import { useActiveEvents } from "@/hooks/useEvents";

export default function EventsPage() {
  const { data: events = [], isLoading } = useActiveEvents();

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  }

  return (
    <div className="min-h-screen bg-wt-bg">
      {/* Page header */}
      <div className="bg-wt-bg-card border-b border-wt-border">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-2xl font-black text-wt-text">이벤트</h1>
          <p className="mt-2 text-sm text-wt-text-secondary">
            진행 중인 이벤트를 확인하세요
          </p>
        </div>
      </div>

      {/* Events grid */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-56 rounded-2xl" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <svg
              className="h-16 w-16 text-wt-text-muted mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-wt-text-secondary text-sm">
              현재 진행 중인 이벤트가 없습니다.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {events.map((event) => (
              <a
                key={event.id}
                href={event.linkUrl}
                className="group relative block overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-lg border border-wt-border"
                style={{
                  background: `linear-gradient(135deg, ${event.bgColor}, #0B0B0B)`,
                }}
              >
                {/* Decorative glow */}
                <div
                  className="absolute -top-10 -right-10 h-48 w-48 rounded-full blur-3xl"
                  style={{ backgroundColor: event.bgColor, opacity: 0.3 }}
                />
                <div
                  className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full blur-3xl"
                  style={{ backgroundColor: event.bgColor, opacity: 0.2 }}
                />
                {/* Stripe pattern */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 11px)",
                  }}
                />

                <div className="relative px-6 py-8 sm:px-8 sm:py-10">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/50 sm:text-xs">
                    EVENT
                  </p>
                  <h2 className="mt-2 text-xl font-black leading-tight text-white sm:text-2xl">
                    {event.title}
                  </h2>
                  <p className="mt-2 text-sm text-white/70 line-clamp-2">
                    {event.description}
                  </p>
                  <p className="mt-4 text-xs text-white/40">
                    {formatDate(event.startDate)} ~ {formatDate(event.endDate)}
                  </p>
                  <div className="mt-5 inline-block rounded-full bg-wt-primary/80 px-5 py-2 text-xs font-bold text-white backdrop-blur-sm transition-colors group-hover:bg-wt-primary sm:text-sm">
                    자세히 보기 →
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
