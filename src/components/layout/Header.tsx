"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "@/stores/auth";
import { useThemeStore } from "@/stores/theme";
import { useComicSearch } from "@/hooks/useComics";
import { LogoCompact } from "@/components/common/Logo";

export default function Header() {
  const { user, token, logout, fetchMe } = useAuthStore();
  const { theme, toggle: toggleTheme } = useThemeStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const { data: searchResults } = useComicSearch(searchKeyword);

  useEffect(() => {
    if (token && !user) {
      fetchMe();
    }
  }, [token, user, fetchMe]);

  useEffect(() => {
    if (searchOpen && mobileSearchRef.current) {
      mobileSearchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      setSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-wt-border">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <LogoCompact />
        </Link>

        {/* Center nav - desktop */}
        <nav className="hidden md:flex items-center gap-1">
          <NavTab href="/" label="요일연재" />
          <NavTab href="/popular" label="인기" />
          <NavTab href="/completed" label="완결" />
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1">
          {/* Desktop search */}
          <div className="relative hidden md:block">
            <form onSubmit={handleSearchSubmit}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="검색"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-44 rounded-lg bg-wt-bg-elevated py-1.5 pl-8 pr-3 text-[13px] text-wt-text placeholder-wt-text-muted outline-none transition-all focus:w-56 focus:ring-1 focus:ring-wt-primary/40"
              />
              <svg className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-wt-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>
            {/* Search dropdown */}
            {searchKeyword.length > 0 && searchResults && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-xl bg-wt-bg-card border border-wt-border-light shadow-2xl overflow-hidden z-50">
                {searchResults.content.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto py-1">
                    {searchResults.content.slice(0, 8).map((comic) => (
                      <Link
                        key={comic.id}
                        href={`/comics/${comic.id}`}
                        onClick={() => setSearchKeyword("")}
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-wt-bg-hover transition-colors"
                      >
                        <div className="h-12 w-9 shrink-0 overflow-hidden rounded-md bg-wt-bg-elevated">
                          {comic.thumbnail && (
                            <img src={comic.thumbnail} alt={comic.title} className="h-full w-full object-cover" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-wt-text truncate">{comic.title}</p>
                          <p className="text-[11px] text-wt-text-muted">{comic.author}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-[13px] text-wt-text-muted">
                    검색 결과가 없습니다
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile search button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="rounded-lg p-2 text-wt-text-secondary hover:text-wt-text transition-colors md:hidden"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-wt-text-secondary hover:text-wt-text transition-colors"
            aria-label={theme === "dark" ? "라이트 모드" : "다크 모드"}
          >
            {theme === "dark" ? (
              <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>

          {/* Menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-wt-text-secondary hover:text-wt-text transition-colors"
            aria-label="메뉴 열기"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile search overlay */}
      {searchOpen && (
        <div className="border-t border-wt-border bg-wt-bg px-4 py-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              ref={mobileSearchRef}
              type="text"
              placeholder="제목, 작가로 검색"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full rounded-lg bg-wt-bg-elevated py-2.5 pl-10 pr-4 text-[13px] text-wt-text placeholder-wt-text-muted outline-none focus:ring-1 focus:ring-wt-primary/40"
            />
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-wt-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </form>
          {searchKeyword.length > 0 && searchResults && (
            <div className="mt-2 rounded-lg bg-wt-bg-card border border-wt-border overflow-hidden max-h-64 overflow-y-auto">
              {searchResults.content.length > 0 ? (
                searchResults.content.slice(0, 6).map((comic) => (
                  <Link
                    key={comic.id}
                    href={`/comics/${comic.id}`}
                    onClick={() => { setSearchKeyword(""); setSearchOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-wt-bg-hover transition-colors"
                  >
                    <div className="h-10 w-7 shrink-0 overflow-hidden rounded bg-wt-bg-elevated">
                      {comic.thumbnail && (
                        <img src={comic.thumbnail} alt={comic.title} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-wt-text truncate">{comic.title}</p>
                      <p className="text-[11px] text-wt-text-muted">{comic.author}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="px-4 py-4 text-center text-[13px] text-wt-text-muted">검색 결과가 없습니다</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-72 max-w-[80vw] bg-wt-bg-elevated border-l border-wt-border-light slide-in-right flex flex-col">
            {/* Close button */}
            <div className="flex items-center justify-end px-4 py-3">
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-lg p-2 text-wt-text-muted hover:text-wt-text transition-colors"
                aria-label="메뉴 닫기"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* User section */}
            <div className="px-5 pb-5">
              {user ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-wt-primary text-base font-black text-white">
                      {user.nickname.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[15px] font-bold text-wt-text truncate">{user.nickname}</p>
                      <p className="text-[11px] text-wt-text-muted truncate">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/mypage/charge"
                    onClick={() => setSidebarOpen(false)}
                    className="mt-4 flex items-center justify-between rounded-xl bg-wt-bg-elevated px-4 py-3"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-wt-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a5.38 5.38 0 01-.491-.971H10a1 1 0 100-2H8.003a7.364 7.364 0 010-1H10a1 1 0 100-2H8.245c.155-.339.328-.654.491-.971z" />
                      </svg>
                      <span className="text-lg font-black text-wt-primary">{user.coinBalance}</span>
                      <span className="text-[11px] text-wt-text-muted">코인</span>
                    </div>
                    <span className="rounded-full bg-wt-primary/15 px-3 py-1 text-[11px] font-bold text-wt-primary">
                      충전
                    </span>
                  </Link>
                </>
              ) : (
                <div>
                  <p className="text-[13px] text-wt-text-muted mb-4">로그인하고 웹툰을 즐겨보세요</p>
                  <div className="flex gap-2">
                    <Link
                      href="/login"
                      onClick={() => setSidebarOpen(false)}
                      className="flex-1 rounded-lg bg-wt-primary py-2.5 text-center text-[13px] font-bold text-white transition-colors hover:bg-wt-primary-dark"
                    >
                      로그인
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setSidebarOpen(false)}
                      className="flex-1 rounded-lg border border-wt-border-light py-2.5 text-center text-[13px] font-medium text-wt-text-secondary transition-colors hover:border-wt-text-muted hover:text-wt-text"
                    >
                      회원가입
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-wt-border mx-5" />

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-3">
              <SidebarLink href="/" label="요일연재" onClick={() => setSidebarOpen(false)} />
              <SidebarLink href="/popular" label="인기" onClick={() => setSidebarOpen(false)} />
              <SidebarLink href="/completed" label="완결" onClick={() => setSidebarOpen(false)} />
              <SidebarLink href="/events" label="이벤트" onClick={() => setSidebarOpen(false)} />
              {user && (
                <SidebarLink href="/mypage" label="마이페이지" onClick={() => setSidebarOpen(false)} />
              )}
            </nav>

            {/* Footer */}
            {user && (
              <div className="border-t border-wt-border px-5 py-4">
                <button
                  onClick={handleLogout}
                  className="w-full rounded-lg py-2.5 text-[13px] text-wt-text-muted hover:text-wt-text transition-colors"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function NavTab({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 text-[13px] font-medium text-wt-text-secondary hover:text-wt-text transition-colors rounded-md hover:bg-white/[0.05]"
    >
      {label}
    </Link>
  );
}

function SidebarLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center rounded-lg px-3 py-3 text-[14px] font-medium text-wt-text-secondary transition-colors hover:bg-wt-bg-hover hover:text-wt-text"
    >
      {label}
    </Link>
  );
}
