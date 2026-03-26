"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import { useChargeCoin } from "@/hooks/useMypage";
import { useToast } from "@/components/common/Toast";

const AMOUNTS = [10, 30, 50, 100, 200, 500];

const PAYMENT_METHODS = [
  {
    id: "card",
    label: "신용/체크카드",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    color: "text-gray-300",
    bg: "bg-wt-bg-elevated",
  },
  {
    id: "kakao",
    label: "카카오페이",
    icon: (
      <span className="text-sm font-black">K</span>
    ),
    color: "text-yellow-900",
    bg: "bg-yellow-400",
  },
  {
    id: "naver",
    label: "네이버페이",
    icon: (
      <span className="text-sm font-black">N</span>
    ),
    color: "text-white",
    bg: "bg-green-500",
  },
  {
    id: "toss",
    label: "토스",
    icon: (
      <span className="text-sm font-black">T</span>
    ),
    color: "text-white",
    bg: "bg-blue-500",
  },
  {
    id: "phone",
    label: "휴대폰 결제",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: "text-gray-300",
    bg: "bg-wt-bg-elevated",
  },
];

export default function ChargePage() {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const chargeMutation = useChargeCoin();
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  const handlePayment = (methodId: string) => {
    if (!selectedAmount) return;
    const amount = selectedAmount;
    chargeMutation.mutate(amount, {
      onSuccess: () => {
        toast(`${amount} 코인 충전 완료!`, "success");
        setSelectedAmount(null);
      },
      onError: (err) => {
        toast(err instanceof Error ? err.message : "충전에 실패했습니다", "error");
      },
    });
  };

  return (
    <div className="min-h-screen bg-wt-bg">
      {/* Header area */}
      <div className="bg-wt-bg">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <Link
            href="/mypage"
            className="inline-flex items-center gap-1 text-sm text-wt-text-secondary hover:text-wt-text transition-colors mb-4 min-h-[44px]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            마이페이지
          </Link>
          <h1 className="text-2xl font-black text-wt-text">코인 충전</h1>
          {/* Current balance */}
          <div className="mt-4 inline-flex items-center gap-3 rounded-2xl bg-wt-bg-elevated backdrop-blur-sm px-5 py-3">
            <div>
              <p className="text-[11px] text-wt-text-muted">보유 코인</p>
              <p className="text-xl sm:text-2xl font-black text-wt-primary">
                {user?.coinBalance ?? 0} 코인
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6 space-y-8">
        {/* Step 1: Select coin amount */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-wt-primary text-xs font-bold text-white">1</span>
            <h2 className="text-base font-bold text-wt-text">충전할 코인을 선택하세요</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {AMOUNTS.map((amount) => {
              const isSelected = selectedAmount === amount;
              return (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  disabled={chargeMutation.isPending}
                  className={`group relative overflow-hidden rounded-2xl border-2 py-6 sm:py-8 text-center transition-all min-h-[44px] disabled:opacity-50 ${
                    isSelected
                      ? "border-wt-primary bg-wt-primary/10 shadow-lg shadow-wt-primary/10"
                      : "border-wt-border bg-wt-bg-card hover:border-wt-primary/50 hover:shadow-md"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <svg className="h-5 w-5 text-wt-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <p className={`text-2xl sm:text-3xl font-black transition-colors ${
                    isSelected ? "text-wt-primary" : "text-wt-text group-hover:text-wt-primary"
                  }`}>
                    {amount}
                  </p>
                  <p className="mt-1 text-xs text-wt-text-muted">코인</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 2: Select payment method */}
        <section className={`transition-opacity duration-300 ${selectedAmount ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
          <div className="flex items-center gap-2 mb-4">
            <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${
              selectedAmount ? "bg-wt-primary" : "bg-wt-text-muted"
            }`}>2</span>
            <h2 className="text-base font-bold text-wt-text">결제 수단을 선택하세요</h2>
          </div>
          <div className="space-y-2">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                onClick={() => handlePayment(method.id)}
                disabled={!selectedAmount || chargeMutation.isPending}
                className="flex w-full items-center gap-4 rounded-2xl border-2 border-wt-border bg-wt-bg-card px-5 py-4 text-left transition-all hover:border-wt-primary/50 hover:bg-wt-bg-elevated disabled:opacity-50 disabled:hover:border-wt-border disabled:hover:bg-wt-bg-card min-h-[56px]"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${method.bg} ${method.color} shrink-0`}>
                  {method.icon}
                </div>
                <span className="text-sm font-medium text-wt-text flex-1">{method.label}</span>
                {selectedAmount && (
                  <span className="text-sm font-bold text-wt-primary shrink-0">{selectedAmount} 코인</span>
                )}
                <svg className="h-4 w-4 text-wt-text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-wt-text-muted pb-4">
          포트폴리오용 프로젝트이므로 실제 결제 없이 충전됩니다.
        </p>
      </div>

    </div>
  );
}
