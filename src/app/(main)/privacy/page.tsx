"use client";

import Link from "next/link";

export default function PrivacyPage() {
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
          <h1 className="text-2xl font-black text-wt-text sm:text-3xl">개인정보처리방침</h1>
          <p className="mt-2 text-sm text-wt-text-secondary">
            KYUNGWON TOON의 개인정보 처리에 관한 방침
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8">
        <div className="rounded-xl bg-wt-bg-card p-6 shadow-sm border border-wt-border sm:p-8">
          <p className="mb-8 text-xs text-wt-text-muted">
            시행일: 2026년 3월 1일
          </p>

          <p className="mb-8 text-sm leading-relaxed text-wt-text-secondary">
            KYUNGWON TOON(이하 &quot;회사&quot;)은 이용자의 개인정보를 중요시하며, 「개인정보 보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 준수하고 있습니다. 회사는 개인정보처리방침을 통하여 이용자의 개인정보가 어떠한 목적과 방법으로 이용되고 있으며, 개인정보보호를 위해 어떤 조치를 취하고 있는지 안내드립니다.
          </p>

          <div className="space-y-8">
            {/* 1. 수집하는 개인정보 항목 */}
            <section>
              <h2 className="mb-3 text-base font-bold text-wt-text">
                1. 수집하는 개인정보 항목
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-wt-text-secondary">
                <p>회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>
                <div className="rounded-lg bg-wt-bg-elevated p-4">
                  <p className="font-medium text-wt-text mb-2">필수 수집 항목</p>
                  <ul className="list-disc list-inside space-y-1 text-wt-text-secondary">
                    <li>회원가입 시: 이메일, 비밀번호, 닉네임</li>
                    <li>서비스 이용 시: 서비스 이용 기록, IP 주소, 쿠키, 방문 일시</li>
                    <li>결제 시: 결제 수단 정보, 결제 기록</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-wt-bg-elevated p-4">
                  <p className="font-medium text-wt-text mb-2">선택 수집 항목</p>
                  <ul className="list-disc list-inside space-y-1 text-wt-text-secondary">
                    <li>프로필 이미지</li>
                    <li>생년월일 (연령 인증 목적)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 2. 개인정보의 수집 및 이용목적 */}
            <section>
              <h2 className="mb-3 text-base font-bold text-wt-text">
                2. 개인정보의 수집 및 이용목적
              </h2>
              <div className="space-y-2 text-sm leading-relaxed text-wt-text-secondary">
                <p>회사는 수집한 개인정보를 다음의 목적을 위해 이용합니다.</p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>회원 가입 및 관리: 회원제 서비스 이용에 따른 본인확인, 개인 식별, 부정 이용 방지</li>
                  <li>서비스 제공: 웹툰 열람 서비스, 맞춤형 콘텐츠 추천, 이어보기 기능 제공</li>
                  <li>결제 및 코인 관리: 코인 충전, 유료 콘텐츠 결제, 환불 처리</li>
                  <li>고객 지원: 이용자 문의 대응, 공지사항 전달, 서비스 관련 안내</li>
                  <li>서비스 개선: 서비스 이용 통계 분석, 신규 서비스 개발, 마케팅 활용</li>
                </ul>
              </div>
            </section>

            {/* 3. 개인정보의 보유 및 이용기간 */}
            <section>
              <h2 className="mb-3 text-base font-bold text-wt-text">
                3. 개인정보의 보유 및 이용기간
              </h2>
              <div className="space-y-2 text-sm leading-relaxed text-wt-text-secondary">
                <p>
                  회사는 이용자의 개인정보를 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관련 법령에 따라 보존이 필요한 경우 아래와 같이 일정 기간 동안 보관합니다.
                </p>
                <div className="rounded-lg bg-wt-bg-elevated p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 font-medium text-wt-text">-</span>
                    <span>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 font-medium text-wt-text">-</span>
                    <span>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래법)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 font-medium text-wt-text">-</span>
                    <span>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래법)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 font-medium text-wt-text">-</span>
                    <span>웹사이트 방문 기록: 3개월 (통신비밀보호법)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. 개인정보의 파기절차 및 방법 */}
            <section>
              <h2 className="mb-3 text-base font-bold text-wt-text">
                4. 개인정보의 파기절차 및 방법
              </h2>
              <div className="space-y-2 text-sm leading-relaxed text-wt-text-secondary">
                <p>
                  회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
                </p>
                <p>
                  <strong className="text-wt-text">파기절차:</strong> 이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.
                </p>
                <p>
                  <strong className="text-wt-text">파기방법:</strong> 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
                </p>
              </div>
            </section>

            {/* 5. 개인정보 제공 */}
            <section>
              <h2 className="mb-3 text-base font-bold text-wt-text">
                5. 개인정보 제공
              </h2>
              <div className="space-y-2 text-sm leading-relaxed text-wt-text-secondary">
                <p>
                  회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.
                </p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>이용자가 사전에 동의한 경우</li>
                  <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                  <li>통계 작성, 학술 연구 또는 시장 조사를 위하여 필요한 경우로서 특정 개인을 식별할 수 없는 형태로 제공하는 경우</li>
                </ul>
              </div>
            </section>

            {/* 6. 이용자의 권리 */}
            <section>
              <h2 className="mb-3 text-base font-bold text-wt-text">
                6. 이용자의 권리
              </h2>
              <div className="space-y-2 text-sm leading-relaxed text-wt-text-secondary">
                <p>이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다.</p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>개인정보 열람 요구: 회사가 보유하고 있는 본인의 개인정보에 대한 열람을 요구할 수 있습니다.</li>
                  <li>개인정보 정정 및 삭제 요구: 개인정보에 오류가 있는 경우 정정 또는 삭제를 요구할 수 있습니다.</li>
                  <li>개인정보 처리 정지 요구: 개인정보의 처리 정지를 요구할 수 있습니다.</li>
                  <li>회원 탈퇴: 마이페이지를 통해 직접 회원 탈퇴를 진행할 수 있으며, 탈퇴 시 개인정보는 즉시 파기됩니다.</li>
                </ul>
                <p>
                  위 권리의 행사는 서면, 이메일 등을 통해 하실 수 있으며, 회사는 이에 대해 지체 없이 조치를 취하겠습니다.
                </p>
              </div>
            </section>

            {/* 7. 개인정보보호책임자 */}
            <section>
              <h2 className="mb-3 text-base font-bold text-wt-text">
                7. 개인정보보호책임자
              </h2>
              <div className="space-y-2 text-sm leading-relaxed text-wt-text-secondary">
                <p>
                  회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만 처리 및 피해 구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다.
                </p>
                <div className="rounded-lg bg-wt-bg-elevated p-4 space-y-1">
                  <p><strong className="text-wt-text">개인정보보호책임자</strong></p>
                  <p>성명: 강경원</p>
                  <p>직위: 대표</p>
                  <p>이메일: privacy@kyungwontoon.com</p>
                </div>
                <p>
                  이용자는 서비스를 이용하면서 발생하는 모든 개인정보보호 관련 문의, 불만 처리, 피해 구제 등에 관한 사항을 개인정보보호책임자에게 문의하실 수 있습니다. 회사는 이용자의 문의에 대해 지체 없이 답변 및 처리해드리겠습니다.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-10 border-t border-wt-border pt-6">
            <p className="text-xs text-wt-text-muted">
              본 개인정보처리방침은 2026년 3월 1일부터 시행합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
