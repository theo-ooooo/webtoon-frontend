"use client";

import Link from "next/link";
import { LogoSmall } from "@/components/common/Logo";

export default function Footer() {
  return (
    <footer className="bg-wt-bg-card border-t border-wt-border">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          {/* Logo + desc */}
          <div>
            <Link href="/">
              <LogoSmall />
            </Link>
            <p className="mt-2 text-[12px] leading-relaxed text-wt-text-muted max-w-xs">
              매일 새로운 웹툰을 만나보세요
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-10">
            <div>
              <h3 className="text-[12px] font-bold text-wt-text-secondary mb-3">서비스</h3>
              <ul className="space-y-2">
                <FooterLink href="/" label="요일연재" />
                <FooterLink href="/completed" label="완결" />
                <FooterLink href="/popular" label="인기" />
              </ul>
            </div>
            <div>
              <h3 className="text-[12px] font-bold text-wt-text-secondary mb-3">고객지원</h3>
              <ul className="space-y-2">
                <FooterLink href="/notice" label="공지사항" />
                <FooterLink href="/faq" label="자주묻는질문" />
                <FooterLink href="/terms" label="이용약관" />
                <FooterLink href="/privacy" label="개인정보처리방침" />
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-5 border-t border-wt-border">
          <p className="text-[11px] text-wt-text-muted">
            &copy; 2026 KYUNGWON TOON. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[12px] text-wt-text-muted transition-colors hover:text-wt-text-secondary"
      >
        {label}
      </Link>
    </li>
  );
}
