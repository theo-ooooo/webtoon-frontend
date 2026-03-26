"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/common/Modal";
import { useAuthStore } from "@/stores/auth";
import { usePurchaseEpisode } from "@/hooks/useMypage";
import { useToast } from "@/components/common/Toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  comicId: string;
  episodeId: string;
  episodeNumber: number;
  coinPrice: number;
  onSuccess?: () => void;
}

export default function PurchaseModal({
  isOpen,
  onClose,
  comicId,
  episodeId,
  episodeNumber,
  coinPrice,
  onSuccess,
}: Props) {
  const router = useRouter();
  const { user } = useAuthStore();
  const purchaseMutation = usePurchaseEpisode();
  const { toast } = useToast();

  const balance = user?.coinBalance ?? 0;
  const isInsufficient = balance < coinPrice;

  const handlePurchase = () => {
    purchaseMutation.mutate(
      { comicId, episodeId },
      {
        onSuccess: () => {
          toast("구매 완료!", "success");
          if (onSuccess) {
            onSuccess();
          } else {
            onClose();
            router.push(`/viewer/${comicId}/${episodeId}`);
          }
        },
        onError: (err) => {
          toast(err instanceof Error ? err.message : "구매에 실패했습니다", "error");
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center mb-5">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-wt-primary/15">
          <svg className="h-6 w-6 text-wt-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-base font-bold text-wt-text">{episodeNumber}화 구매</h2>
      </div>

      <div className="rounded-xl bg-wt-bg-elevated p-4 mb-5">
        <div className="flex items-center justify-between py-1">
          <span className="text-[13px] text-wt-text-secondary">가격</span>
          <span className="text-[13px] font-bold text-wt-primary">{coinPrice} 코인</span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-[13px] text-wt-text-secondary">보유 코인</span>
          <span className={`text-[13px] font-bold ${isInsufficient ? "text-wt-red" : "text-wt-text"}`}>
            {balance} 코인
          </span>
        </div>
        {!isInsufficient && (
          <div className="flex items-center justify-between border-t border-wt-border pt-2 mt-2">
            <span className="text-[13px] text-wt-text-secondary">구매 후 잔액</span>
            <span className="text-[13px] font-bold text-wt-text">{balance - coinPrice} 코인</span>
          </div>
        )}
      </div>

      {isInsufficient ? (
        <>
          <p className="mb-4 text-center text-[13px] text-wt-red">코인이 부족합니다</p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-wt-border-light py-3 text-[13px] font-medium text-wt-text-secondary hover:bg-wt-bg-elevated transition-colors"
            >
              닫기
            </button>
            <button
              onClick={() => router.push("/mypage/charge")}
              className="flex-1 rounded-xl bg-wt-primary py-3 text-[13px] font-bold text-white hover:bg-wt-primary-dark transition-colors"
            >
              충전하기
            </button>
          </div>
        </>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-wt-border-light py-3 text-[13px] font-medium text-wt-text-secondary hover:bg-wt-bg-elevated transition-colors"
          >
            취소
          </button>
          <button
            onClick={handlePurchase}
            disabled={purchaseMutation.isPending}
            className="flex-1 rounded-xl bg-wt-primary py-3 text-[13px] font-bold text-white hover:bg-wt-primary-dark transition-colors disabled:opacity-50"
          >
            {purchaseMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              </span>
            ) : (
              "구매하기"
            )}
          </button>
        </div>
      )}
    </Modal>
  );
}
