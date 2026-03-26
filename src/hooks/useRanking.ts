import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { PopularRankingItem, RankingPeriod } from "@/types";

export function usePopularRanking(period: RankingPeriod) {
  return useQuery({
    queryKey: ["ranking", period],
    queryFn: async () => {
      const res = await api.get<PopularRankingItem[]>(
        "/comics/popular",
        { period }
      );
      return res.data ?? [];
    },
  });
}
