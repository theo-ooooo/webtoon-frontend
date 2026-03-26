"use client";

import Link from "next/link";

export default function TermsPage() {
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
          <h1 className="text-2xl font-black text-wt-text sm:text-3xl">이용약관</h1>
          <p className="mt-2 text-sm text-wt-text-secondary">
            KYUNGWON TOON 서비스 이용약관
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8">
        <div className="rounded-xl bg-wt-bg-card p-6 shadow-sm border border-wt-border sm:p-8">
          <p className="mb-8 text-xs text-wt-text-muted">
            최종 수정일: 2026년 3월 15일
          </p>

          <div className="space-y-8">
            {/* 제1조 */}
            <section>
              <h2 className="mb-3 text-base font-bold text-wt-text">
                제1조 (목적)
              </h2>
              <p className="text-sm leading-relaxed text-wt-text-secondary">
                이 약관은 KYUNGWON TOON(이하 &quot;회사&quot;)이 제공하는 웹툰 서비스(이하 &quot;서비스&quot;)의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            {/* 제2조 */}
            <section>
              <h2 className="mb-3 text-base font-bold text-wt-text">
                제2조 (정의)
              </h2>
              <div className="space-y-2 text-sm leading-relaxed text-wt-text-secondary">
                <p>
                  1. &quot;서비스&quot;란 회사가 제공하는 웹툰 열람, 코인 충전 및 결제, 기타 관련 서비스를 의미합니다.
                </p>
                <p>
                  2. &quot;이용자&quot;란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 의미합니다.
                </p>
                <p>
                  3. &quot;회원&quot;이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며 서비스를 계속적으로 이용할 수 있는 자를 의미합니다.
                </p>
                <p>
                  4. &quot;코인&quot;이란 서비스 내에서 유료 콘텐츠를 이용하기 위해 사용되는 가상 화폐를 의미합니다.
                </p>
                <p>
                  5. &quot;에피소드&quot;란 개별 웹툰의 한 회차를 의미합니다.
                </p>
              </div>
            </section>

            {/* 제3조 */}
            <section>
              <h2 className="mb-3 text-base font-bold text-wt-text">
                제3조 (약관의 효력)
              </h2>
              <div className="space-y-2 text-sm leading-relaxed text-wt-text-secondary">
                <p>
                  1. 본 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용됩니다.
                </p>
                <p>
                  2. 회사는 필요한 경우 관련 법령에 위배되지 않는 범위 내에서 본 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해 공시합니다.
                </p>
                <p>
                  3. 변경된 약관은 공시한 날로부터 7일 이후 효력이 발생합니다. 이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 회원 탈퇴를 할 수 있습니다.
                </p>
                <p>
                  4. 이용자가 변경된 약관의 효력 발생일 이후에도 서비스를 계속 이용하는 경우 약관 변경에 동의한 것으로 간주합니다.
                </p>
              </div>
            </section>

            {/* 제4조 */}
            <section>
              <h2 className="mb-3 text-base font-bold text-wt-text">
                제4조 (서비스 이용)
              </h2>
              <div className="space-y-2 text-sm leading-relaxed text-wt-text-secondary">
                <p>
                  1. 서비스 이용은 회사의 서비스 제공 시간에 한하며, 회사는 업무상 또는 기술상 특별한 사유가 없는 한 연중무휴 24시간 서비스를 제공합니다.
                </p>
                <p>
                  2. 회사는 서비스의 안정적인 운영을 위하여 정기 또는 비정기적으로 시스템 점검을 실시할 수 있으며, 점검 일정은 사전에 공지합니다.
                </p>
                <p>
                  3. 이용자는 서비스를 이용하여 얻은 정보를 회사의 사전 승인 없이 복제, 전송, 출판, 배포, 방송 등의 방법으로 이용하거나 제3자에게 제공할 수 없습니다.
                </p>
                <p>
                  4. 회사는 이용자가 본 약관 및 관련 법령을 위반하는 경우 서비스 이용을 제한하거나 회원 자격을 정지시킬 수 있습니다.
                </p>
              </div>
            </section>

            {/* 제5조 */}
            <section>
              <h2 className="mb-3 text-base font-bold text-wt-text">
                제5조 (코인 및 결제)
              </h2>
              <div className="space-y-2 text-sm leading-relaxed text-wt-text-secondary">
                <p>
                  1. 이용자는 유료 콘텐츠를 이용하기 위해 회사가 정한 방법에 따라 코인을 충전할 수 있습니다.
                </p>
                <p>
                  2. 충전된 코인의 유효기간은 충전일로부터 5년이며, 이벤트 등으로 무상 지급된 코인은 별도의 유효기간이 적용될 수 있습니다.
                </p>
                <p>
                  3. 코인 환불은 충전일로부터 7일 이내에 가능하며, 이미 사용한 코인은 환불 대상에서 제외됩니다. 무상 지급된 코인은 환불이 불가합니다.
                </p>
                <p>
                  4. 에피소드 구매에 사용된 코인은 취소 및 환불이 불가하며, 구매한 에피소드의 열람 권한은 회원 자격이 유지되는 한 계속 유효합니다.
                </p>
              </div>
            </section>

            {/* 제6조 */}
            <section>
              <h2 className="mb-3 text-base font-bold text-wt-text">
                제6조 (저작권)
              </h2>
              <div className="space-y-2 text-sm leading-relaxed text-wt-text-secondary">
                <p>
                  1. 서비스 내 모든 콘텐츠(웹툰, 이미지, 텍스트, 디자인 등)에 대한 저작권 및 지적재산권은 회사 또는 원저작자에게 있습니다.
                </p>
                <p>
                  2. 이용자는 서비스를 통해 제공받은 콘텐츠를 개인적인 용도로만 이용할 수 있으며, 영리 목적으로의 이용, 무단 복제, 배포, 전시, 전송 등의 행위를 할 수 없습니다.
                </p>
                <p>
                  3. 저작권을 침해하는 행위가 발견될 경우 회사는 해당 이용자의 서비스 이용을 즉시 중단하고, 법적 조치를 취할 수 있습니다.
                </p>
              </div>
            </section>

            {/* 제7조 */}
            <section>
              <h2 className="mb-3 text-base font-bold text-wt-text">
                제7조 (면책조항)
              </h2>
              <div className="space-y-2 text-sm leading-relaxed text-wt-text-secondary">
                <p>
                  1. 회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중단 등 불가항력적인 사유로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임을 지지 않습니다.
                </p>
                <p>
                  2. 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
                </p>
                <p>
                  3. 회사는 이용자가 서비스를 통해 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않습니다.
                </p>
                <p>
                  4. 회사는 이용자가 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-10 border-t border-wt-border pt-6">
            <p className="text-xs text-wt-text-muted">
              본 약관은 2026년 3월 15일부터 시행합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
