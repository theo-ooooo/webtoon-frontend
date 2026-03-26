import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { EventItem } from "@/types";

export function useActiveEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await api.get<EventItem[]>("/events");
      return res.data ?? [];
    },
  });
}
