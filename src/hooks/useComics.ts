import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type {
  Page,
  ComicListItem,
  ComicDetail,
  DayOfWeek,
} from "@/types";

const EMPTY_PAGE: Page<ComicListItem> = {
  content: [], totalElements: 0, totalPages: 0, size: 20, number: 0, first: true, last: true,
};

export function useComicsByDay(day: DayOfWeek) {
  return useQuery({
    queryKey: ["comics", "day", day],
    queryFn: async () => {
      const res = await api.get<Page<ComicListItem>>("/comics", {
        day, size: 20,
      });
      return res.data ?? EMPTY_PAGE;
    },
  });
}

export function useCompletedComics() {
  return useQuery({
    queryKey: ["comics", "completed"],
    queryFn: async () => {
      const res = await api.get<Page<ComicListItem>>("/comics", {
        completed: true, size: 20,
      });
      return res.data ?? EMPTY_PAGE;
    },
  });
}

export function useComicSearch(keyword: string) {
  return useQuery({
    queryKey: ["comics", "search", keyword],
    queryFn: async () => {
      const res = await api.get<Page<ComicListItem>>("/comics", {
        keyword, size: 20,
      });
      return res.data ?? EMPTY_PAGE;
    },
    enabled: keyword.length > 0,
  });
}

export function useComicDetail(id: string) {
  return useQuery({
    queryKey: ["comics", id],
    queryFn: async () => {
      const res = await api.get<ComicDetail>(`/comics/${id}`);
      return res.data!;
    },
    enabled: !!id,
  });
}
