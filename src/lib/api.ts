import type { ApiResponse } from "@/types";

const BASE_URL = "/api";

function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // multipart인 경우 Content-Type 제거 (브라우저가 자동 설정)
  if (options.body instanceof FormData) {
    delete headers["Content-Type"];
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data: ApiResponse<T> = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || `요청에 실패했습니다. (${res.status})`);
  }

  return data;
}

const api = {
  get: <T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
    }
    const query = searchParams.toString();
    const url = query ? `${endpoint}?${query}` : endpoint;
    return request<T>(url);
  },

  post: <T>(endpoint: string, body?: unknown) => {
    return request<T>(endpoint, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  },

  put: <T>(endpoint: string, body?: unknown) => {
    return request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  delete: <T>(endpoint: string) => {
    return request<T>(endpoint, { method: "DELETE" });
  },
};

export default api;
