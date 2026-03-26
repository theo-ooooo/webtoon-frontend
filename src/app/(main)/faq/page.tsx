"use client";

import { useState } from "react";
import Link from "next/link";

type Category = "전체" | "이용안내" | "코인/결제" | "계정";

interface FaqItem {
  id: number;
  category: Exclude<Category, "전체">;
  question: string;
  answer: string;
}

const CATEGORIES: Category[] = ["전체", "이용안내", "코인/결제", "계정"];

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    category: "이용안내",
    question: "웹툰은 어떻게 볼 수 있나요?",
    answer:
      "KYUNGWON TOON에서 웹툰을 보시려면 먼저 회원가입 후 로그인해주세요. 메인 페이지에서 요일별 연재 웹툰을 확인하거나, 인기 웹툰, 완결 웹툰 메뉴를 통해 다양한 작품을 찾아보실 수 있습니다. 원하는 작품을 클릭하면 에피소드 목록이 표시되며, 무료 회차는 바로 감상하실 수 있습니다.",
  },
  {
    id: 2,
    category: "이용안내",
    question: "무료 회차와 유료 회차의 차이는?",
    answer:
      "각 웹툰의 초반 에피소드는 무료로 제공되며, 이후 에피소드는 코인을 사용하여 구매해야 합니다. 무료 회차 수는 작품마다 다르며, 작품 상세 페이지에서 무료/유료 여부를 확인하실 수 있습니다. 한 번 구매한 에피소드는 계정이 유지되는 한 계속 열람 가능합니다.",
  },
  {
    id: 3,
    category: "이용안내",
    question: "에피소드는 어떻게 구매하나요?",
    answer:
      "유료 에피소드를 열람하려면 코인이 필요합니다. 에피소드를 클릭하면 구매 확인 팝업이 표시되며, 보유 코인이 충분한 경우 '구매하기' 버튼을 눌러 바로 구매하실 수 있습니다. 코인이 부족한 경우 코인 충전 페이지로 이동하여 충전 후 이용해주세요.",
  },
  {
    id: 4,
    category: "이용안내",
    question: "이어보기 기능은 어떻게 사용하나요?",
    answer:
      "로그인한 상태에서 웹툰을 감상하면 자동으로 읽은 기록이 저장됩니다. 메인 페이지 상단의 '이어보기' 섹션에서 최근에 읽었던 웹툰의 마지막 에피소드로 바로 이동할 수 있습니다. 마이페이지에서도 전체 열람 기록을 확인하실 수 있습니다.",
  },
  {
    id: 5,
    category: "코인/결제",
    question: "코인은 어떻게 충전하나요?",
    answer:
      "로그인 후 상단 메뉴의 코인 아이콘을 클릭하거나, 마이페이지의 '코인 충전' 메뉴를 통해 충전 페이지로 이동할 수 있습니다. 원하시는 충전 금액을 선택한 후 결제를 진행하시면 바로 코인이 충전됩니다. 충전된 코인은 모든 유료 에피소드 구매에 사용하실 수 있습니다.",
  },
  {
    id: 6,
    category: "코인/결제",
    question: "코인 환불은 가능한가요?",
    answer:
      "충전한 코인의 환불은 충전일로부터 7일 이내에 가능합니다. 단, 이미 사용한 코인은 환불이 불가하며, 이벤트나 프로모션으로 지급된 보너스 코인은 환불 대상에서 제외됩니다. 환불을 원하시는 경우 고객센터로 문의해주세요.",
  },
  {
    id: 7,
    category: "코인/결제",
    question: "충전한 코인의 유효기간은?",
    answer:
      "직접 충전한 코인은 충전일로부터 5년간 유효합니다. 이벤트나 프로모션으로 지급된 보너스 코인은 지급일로부터 30일간 유효하며, 유효기간이 지난 코인은 자동으로 소멸됩니다. 코인 사용 시에는 유효기간이 짧은 코인부터 우선 사용됩니다.",
  },
  {
    id: 8,
    category: "코인/결제",
    question: "결제 수단은 어떤 것이 있나요?",
    answer:
      "현재 KYUNGWON TOON에서는 신용카드, 체크카드, 카카오페이, 네이버페이, 휴대폰 소액결제를 지원하고 있습니다. 결제 수단은 향후 지속적으로 확대할 예정입니다. 결제 관련 문의사항은 고객센터로 연락해주세요.",
  },
  {
    id: 9,
    category: "계정",
    question: "회원가입은 어떻게 하나요?",
    answer:
      "KYUNGWON TOON 회원가입은 매우 간단합니다. 로그인 페이지 하단의 '회원가입' 링크를 클릭하여 이메일, 닉네임, 비밀번호를 입력하시면 됩니다. 가입 완료 후 바로 로그인하여 서비스를 이용하실 수 있습니다.",
  },
  {
    id: 10,
    category: "계정",
    question: "비밀번호를 잊었어요",
    answer:
      "비밀번호를 잊으셨다면 로그인 페이지에서 '비밀번호 찾기' 기능을 이용해주세요. 가입 시 등록한 이메일로 비밀번호 재설정 링크가 발송됩니다. 이메일을 받지 못하셨다면 스팸함을 확인하시거나 고객센터로 문의해주세요.",
  },
  {
    id: 11,
    category: "계정",
    question: "닉네임을 변경하고 싶어요",
    answer:
      "닉네임 변경은 마이페이지에서 가능합니다. 마이페이지 접속 후 프로필 설정에서 새로운 닉네임을 입력하시면 됩니다. 닉네임은 2~30자 이내로 설정 가능하며, 이미 다른 회원이 사용 중인 닉네임은 사용하실 수 없습니다.",
  },
  {
    id: 12,
    category: "계정",
    question: "회원 탈퇴는 어떻게 하나요?",
    answer:
      "회원 탈퇴를 원하시면 마이페이지 > 설정 > 회원 탈퇴 메뉴에서 진행하실 수 있습니다. 탈퇴 시 보유 중인 코인과 구매한 에피소드 열람 권한이 모두 소멸되며, 동일한 이메일로 재가입 시에도 이전 데이터는 복구되지 않습니다. 탈퇴 전 신중히 고려해주세요.",
  },
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("전체");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered =
    activeCategory === "전체"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  const toggle = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-wt-bg">
      {/* Page Header */}
      <div className="bg-wt-bg-card border-b border-wt-border">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs text-wt-text-secondary hover:text-wt-primary transition-colors mb-4"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            홈으로
          </Link>
          <h1 className="text-2xl font-black text-wt-text sm:text-3xl">자주 묻는 질문</h1>
          <p className="mt-2 text-sm text-wt-text-secondary">
            궁금한 점이 있으시면 아래에서 확인해보세요
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-wt-bg-card border-b border-wt-border">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setExpandedId(null);
                }}
                className={`shrink-0 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeCategory === cat
                    ? "border-wt-primary text-wt-primary"
                    : "border-transparent text-wt-text-muted hover:text-wt-text"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ List */}
      <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8">
        <div className="overflow-hidden rounded-xl bg-wt-bg-card shadow-sm border border-wt-border">
          {filtered.map((item, index) => (
            <div key={item.id}>
              {index > 0 && <div className="border-t border-wt-border" />}
              <button
                onClick={() => toggle(item.id)}
                className="flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-wt-bg-elevated sm:px-6"
              >
                <span className="mt-0.5 shrink-0 text-sm font-bold text-wt-primary">Q</span>
                <span className="flex-1 text-sm font-medium text-wt-text sm:text-[15px]">
                  {item.question}
                </span>
                <span className="shrink-0 rounded bg-wt-bg-elevated px-2 py-0.5 text-[11px] text-wt-text-muted hidden sm:block">
                  {item.category}
                </span>
                <svg
                  className={`mt-0.5 h-4 w-4 shrink-0 text-wt-text-muted transition-transform duration-200 ${
                    expandedId === item.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedId === item.id && (
                <div className="border-t border-wt-border bg-wt-bg-elevated px-5 py-5 sm:px-6">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-sm font-bold text-wt-orange">A</span>
                    <p className="text-sm leading-relaxed text-wt-text-secondary">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-wt-text-secondary">해당 카테고리의 FAQ가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
