import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuthStore } from "@/stores/auth";
import type {
  Page,
  PurchaseItem,
  ReadHistoryItem,
  CoinTransaction,
} from "@/types";

export function usePurchases() {
  return useQuery({
    queryKey: ["purchases"],
    queryFn: async () => {
      const res = await api.get<Page<PurchaseItem>>("/purchases", {
        size: 20,
      });
      return res.data!;
    },
  });
}

export function useReadHistory() {
  return useQuery({
    queryKey: ["readHistory"],
    queryFn: async () => {
      const res =
        await api.get<ReadHistoryItem[]>("/read-history");
      return res.data ?? [];
    },
  });
}

export function useCoinTransactions() {
  return useQuery({
    queryKey: ["coinTransactions"],
    queryFn: async () => {
      const res = await api.get<Page<CoinTransaction>>(
        "/coins/transactions",
        { size: 20 }
      );
      return res.data!;
    },
  });
}

export function useChargeCoin() {
  const queryClient = useQueryClient();
  const { fetchMe } = useAuthStore();

  return useMutation({
    mutationFn: async (amount: number) => {
      const res = await api.post<{ coinBalance: number }>(
        "/coins/charge",
        { amount }
      );
      return res.data!;
    },
    onSuccess: () => {
      fetchMe();
      queryClient.invalidateQueries({ queryKey: ["coinTransactions"] });
    },
  });
}

export function usePurchaseEpisode() {
  const queryClient = useQueryClient();
  const { fetchMe } = useAuthStore();

  return useMutation({
    mutationFn: async ({
      comicId,
      episodeId,
    }: {
      comicId: string;
      episodeId: string;
    }) => {
      await api.post(`/comics/${comicId}/episodes/${episodeId}/purchase`);
    },
    onSuccess: (_, { comicId, episodeId }) => {
      fetchMe();
      queryClient.invalidateQueries({ queryKey: ["episodes", comicId] });
      queryClient.invalidateQueries({
        queryKey: ["episodes", comicId, episodeId],
      });
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
  });
}

export function useRateEpisode() {
  return useMutation({
    mutationFn: async ({
      comicId,
      episodeId,
      score,
    }: {
      comicId: string;
      episodeId: string;
      score: number;
    }) => {
      await api.post(`/comics/${comicId}/episodes/${episodeId}/rating`, {
        score,
      });
    },
  });
}

export function useMyRating(comicId: string, episodeId: string) {
  return useQuery({
    queryKey: ["rating", comicId, episodeId],
    queryFn: async () => {
      const res = await api.get<{ score: number | null }>(
        `/comics/${comicId}/episodes/${episodeId}/rating`
      );
      return res.data?.score ?? 0;
    },
    enabled: !!comicId && !!episodeId,
  });
}
