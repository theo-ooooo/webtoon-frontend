"use client";

import type { DayOfWeek } from "@/types";
import { DAY_LABELS } from "@/lib/format";

const DAYS: DayOfWeek[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface Props {
  selected: DayOfWeek | "ALL";
  onChange: (day: DayOfWeek | "ALL") => void;
}

export default function DayTabs({ selected, onChange }: Props) {
  return (
    <div className="sticky top-12 z-30 glass border-b border-wt-border">
      <div className="mx-auto max-w-5xl">
        <div className="flex overflow-x-auto scrollbar-hide">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => onChange(day)}
              className={`relative shrink-0 px-4 sm:px-5 py-3 text-[13px] font-semibold transition-colors ${
                selected === day
                  ? "text-wt-primary"
                  : "text-wt-text-muted hover:text-wt-text-secondary"
              }`}
            >
              {DAY_LABELS[day]}
              {selected === day && (
                <span className="absolute bottom-0 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-t-full bg-wt-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
