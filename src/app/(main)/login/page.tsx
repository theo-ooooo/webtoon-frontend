"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth";
import { LogoLarge } from "@/components/common/Logo";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-7rem)] items-center justify-center bg-wt-bg px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl bg-wt-bg-card p-7 border border-wt-border">
          <div className="text-center mb-7">
            <div className="mb-2"><LogoLarge /></div>
            <p className="text-[13px] text-wt-text-muted">로그인하고 웹툰을 즐기세요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-wt-text-muted mb-1">이메일</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-wt-border bg-wt-bg-elevated px-3.5 py-2.5 text-[13px] text-wt-text placeholder-wt-text-muted outline-none transition-colors focus:border-wt-primary/50 focus:ring-1 focus:ring-wt-primary/20"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-wt-text-muted mb-1">비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-wt-border bg-wt-bg-elevated px-3.5 py-2.5 text-[13px] text-wt-text placeholder-wt-text-muted outline-none transition-colors focus:border-wt-primary/50 focus:ring-1 focus:ring-wt-primary/20"
                required
              />
            </div>
            {error && (
              <div className="rounded-lg bg-wt-red/10 px-3 py-2">
                <p className="text-[12px] text-wt-red">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-wt-primary py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-wt-primary-dark disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                </span>
              ) : (
                "로그인"
              )}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-[13px] text-wt-text-muted">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="font-bold text-wt-primary hover:underline">
            회원가입
          </Link>
        </p>

        <div className="mt-3 rounded-lg bg-wt-bg-card px-3 py-2.5 text-center border border-wt-border">
          <p className="text-[11px] text-wt-text-muted">
            테스트:{" "}
            <span className="text-wt-text-secondary">user1@test.com</span>
            {" / "}
            <span className="text-wt-text-secondary">test1234</span>
          </p>
        </div>
      </div>
    </div>
  );
}
