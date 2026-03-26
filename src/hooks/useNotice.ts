import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { NoticeListItem, NoticeDetail } from "@/types";

export function useNoticeList() {
  return useQuery({
    queryKey: ["notices"],
    queryFn: async () => {
      const res = await api.get<NoticeListItem[]>("/notices");
      return res.data ?? [];
    },
  });
}

export function useNoticeDetail(id: number) {
  return useQuery({
    queryKey: ["notices", id],
    queryFn: async () => {
      const res = await api.get<NoticeDetail>(`/notices/${id}`);
      return res.data!;
    },
    enabled: id > 0,
  });
}
