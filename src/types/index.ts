// Enums
export type DayOfWeek = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
export type ComicStatus = "ONGOING" | "COMPLETED";
export type RankingPeriod = "DAILY" | "WEEKLY";
export type CoinTransactionType = "CHARGE" | "USE";

// API Response
export interface ApiResponse<T> {
  status: number;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string>;
  };
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// Auth
export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  role: string;
  coinBalance: number;
}

export interface LoginResponse {
  token: string;
  user: UserInfo;
}

// Genre
export interface Genre {
  id: number;
  name: string;
}

// Comic
export interface ComicListItem {
  id: number;
  title: string;
  author: string;
  thumbnail: string | null;
  viewCount: number;
  averageRating: number;
  status: ComicStatus;
  days: DayOfWeek[];
  genres: string[];
}

export interface ComicDetail {
  id: number;
  title: string;
  author: string;
  description: string | null;
  thumbnail: string | null;
  viewCount: number;
  averageRating: number;
  freeEpisodeCount: number;
  status: ComicStatus;
  days: DayOfWeek[];
  genres: string[];
  createdAt: string;
  updatedAt: string;
}

// Episode
export interface EpisodeListItem {
  id: number;
  episodeNumber: number;
  title: string;
  thumbnail: string | null;
  coinPrice: number;
  free: boolean;
  purchased: boolean;
  read: boolean;
  createdAt: string;
}

export interface EpisodeDetail {
  id: number;
  comicId: number;
  episodeNumber: number;
  title: string;
  free: boolean;
  purchased: boolean;
  imageUrls: string[];
  prevEpisodeId: number | null;
  nextEpisodeId: number | null;
}

// Purchase
export interface PurchaseItem {
  id: number;
  episodeId: number;
  comicTitle: string;
  episodeTitle: string;
  coinUsed: number;
  purchasedAt: string;
}

// Coin
export interface CoinTransaction {
  id: number;
  type: CoinTransactionType;
  amount: number;
  reason: string;
  createdAt: string;
}

// Ranking
export interface PopularRankingItem {
  rank: number;
  comicId: number;
  title: string;
  author: string;
  thumbnail: string | null;
  viewCount: number;
}

// ReadHistory
export interface ReadHistoryItem {
  comicId: number;
  comicTitle: string;
  comicThumbnail: string | null;
  lastEpisodeId: number;
  lastEpisodeNumber: number;
  lastEpisodeTitle: string;
  updatedAt: string;
}

// Event
export interface EventItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  linkUrl: string;
  bgColor: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
}

// Notice
export interface NoticeListItem {
  id: number;
  title: string;
  isImportant: boolean;
  viewCount: number;
  createdAt: string;
}

export interface NoticeDetail {
  id: number;
  title: string;
  content: string;
  isImportant: boolean;
  viewCount: number;
  createdAt: string;
}
