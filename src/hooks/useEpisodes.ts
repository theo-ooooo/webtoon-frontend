import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { EpisodeListItem, EpisodeDetail } from "@/types";

export function useEpisodeList(comicId: string) {
  return useQuery({
    queryKey: ["episodes", comicId],
    queryFn: async () => {
      const res = await api.get<EpisodeListItem[]>(
        `/comics/${comicId}/episodes`
      );
      return res.data ?? [];
    },
    enabled: !!comicId,
  });
}

export function useEpisodeDetail(comicId: string, episodeId: string) {
  return useQuery({
    queryKey: ["episodes", comicId, episodeId],
    queryFn: async () => {
      const res = await api.get<EpisodeDetail>(
        `/comics/${comicId}/episodes/${episodeId}`
      );
      return res.data!;
    },
    enabled: !!comicId && !!episodeId,
    retry: false,
  });
}
