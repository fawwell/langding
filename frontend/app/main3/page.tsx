'use client'

import Link from 'next/link'
import RevealWrapper from '@/components/main3/RevealWrapper'
import CountUp from '@/components/main3/CountUp'
import ReviewSwiper from '@/components/main3/ReviewSwiper'
import PartnerSwiper from '@/components/main3/PartnerSwiper'
import MapSection from '@/components/main3/MapSection'
import MediaSection from '@/components/main3/MediaSection'
import CTAFooter from '@/components/main3/CTAFooter'
import { useModal } from '@/components/main3/ModalContext'

export default function Main3Home() {
  const { openModal } = useModal()

  return (
    <>
      {/* 히어로 브랜드 */}
      <RevealWrapper className="hero-brand">
        <div className="container">
          <div className="hero-subtitle">FaWW : Family Wholesome Wellness</div>
          <h1>
            임직원의 건강한 신체는 기업의 성장을 견인하고,<br />
            <span>안전한 사회를 만드는 가장 확실한 자산입니다.</span>
          </h1>
          <p>
            신체적, 정신적, 사회적 건강의 조화를 추구하며,<br />
            20,000+ 데이터로 검증된 업계 최초 피지컬케어 원조 전문가가 함께합니다.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => openModal('proposal')}>맞춤 솔루션 문의하기</button>
            <Link href="/main3/ai">
              <button
                className="btn-outline"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(5px)' }}
              >
                프로그램 자세히 보기
              </button>
            </Link>
          </div>
        </div>
        <div className="hero-stats-wrapper">
          <RevealWrapper className="hero-stats reveal-scale">
            <div className="stat-item"><h3><CountUp target={12} />년+</h3><p>웰니스 관리 노하우</p></div>
            <div className="stat-item"><h3><CountUp target={120} />+</h3><p>파트너 기업 및 학교</p></div>
            <div className="stat-item"><h3><CountUp target={99} />%</h3><p>고객 만족도</p></div>
            <div className="stat-item"><h3><CountUp target={20000} format />+</h3><p>누적 관리 회원</p></div>
          </RevealWrapper>
        </div>
      </RevealWrapper>

      {/* 티저 섹션 */}
      <RevealWrapper className="teaser-section">
        <div className="container text-center">
          <div className="teaser-text step-1">담당자님,</div>
          <div className="teaser-text step-2">임직원 분들의 <span style={{ color: '#1a56db' }}>건강과 행복</span>을 찾으시나요?</div>
          <div className="teaser-text step-3">주식회사 파우(FaWW)가 찾아드리겠습니다.</div>
          <div className="teaser-text step-4">&quot;피지컬케어의 원조&quot;로서 증명해 온 결과값으로 직접 느껴보세요.</div>
          <div className="teaser-text step-5">지금부터 주식회사 파우(FaWW)를 소개합니다. ▼</div>
        </div>
      </RevealWrapper>

      {/* 어젠다 섹션 */}
      <RevealWrapper className="agenda-section">
        <div className="container">
          <div className="agenda-header">
            <h2>조직의 가장 큰 고민,<br /><span>&apos;신체 건강(Physical)&apos;</span>에서 해답을 찾다</h2>
            <p>단순한 복지를 넘어 중대재해, 저출산, 멘탈케어까지. 국가와 기업의 핵심 과제를 해결합니다.</p>
          </div>
          <div className="agenda-grid">
            <RevealWrapper className="agenda-card reveal-left delay-1">
              <div className="agenda-icon">🚨</div>
              <h3>건강한 몸이 최고의 퍼포먼스입니다</h3>
              <p>눈에 보이지 않는 신체의 피로와 통증은 예고 없이 찾아오는 산재의 씨앗입니다. 근골격계 질환을 선제적으로 예방하여 법적 리스크를 낮추고 조직의 생산성을 극대화하십시오.</p>
            </RevealWrapper>
            <RevealWrapper className="agenda-card delay-2">
              <div className="agenda-icon">👶</div>
              <h3>여성 임직원의 일·가정 양립 파트너</h3>
              <p>출산 친화적 조직문화, 이제는 신체의 근본적인 건강에서 출발해야 합니다. 전문가의 섬세한 피지컬케어로 출산 전후의 신체 회복을 돕고, 일과 가정이 양립하는 건강한 환경을 완성합니다.</p>
            </RevealWrapper>
            <RevealWrapper className="agenda-card reveal-right delay-3">
              <div className="agenda-icon">🧠</div>
              <h3>신체의 활력이 마음 안식을 보장입니다</h3>
              <p>굳어있는 몸의 긴장은 곧 우울감과 번아웃으로 이어집니다. 전문가의 직접적인 피지컬케어로 신체의 활력을 되찾아주고, 마음의 병과 극단적인 선택을 예방하는 새로운 EAP를 제시합니다.</p>
            </RevealWrapper>
          </div>

          <RevealWrapper className="expert-banner reveal-scale">
            <h4>⚠️ 자격증 없는 무자격 플랫폼 업체를 주의하십시오.</h4>
            <p>단순 요가 강사나 마사지사를 매칭해주는 타 플랫폼과 비교를 거부합니다. FaWW는 <strong>12년 이상의 독보적 임상 노하우</strong>를 바탕으로 &apos;피지컬케어관리사&apos; 자격증을 창시한 <strong>대한민국 &apos;원조(Original)&apos;</strong> 그룹입니다.<br />검증되지 않은 1회성 휴식이 아닌, 뼈와 근막을 완벽히 이해하는 진짜 전문가의 개입만이 실질적인 지표 변화를 만듭니다.</p>
          </RevealWrapper>

          <div className="expert-features">
            <RevealWrapper className="section-title" style={{ fontSize: 28, marginBottom: 30 }}>
              FaWW만의 독보적 EAP 운영 시스템
            </RevealWrapper>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
              <RevealWrapper className="agenda-card reveal-left" style={{ border: '2px solid #1a56db', boxShadow: '0 10px 30px rgba(26,86,219,0.08)' }}>
                <div className="agenda-icon">📊</div>
                <h3>담당자의 성과를 증명하는 &apos;사후 리포트&apos;</h3>
                <p>현장 케어 후 단순 만족도 조사가 아닌, <strong>AI 스캐닝 기반의 신체 개선 수치를 시각화한 리포트</strong>를 제공합니다. 인사평가, ESG 및 산업안전보건 증빙 자료로 즉시 활용 가능한 결과물을 책임집니다.</p>
                <div className="mini-chart">
                  <div className="mini-bar mini-bar-1" />
                  <div className="mini-bar mini-bar-2" />
                  <div className="mini-bar mini-bar-3" />
                </div>
              </RevealWrapper>
              <RevealWrapper className="agenda-card reveal-right" style={{ border: '2px solid #111', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                <div className="agenda-icon">🏅</div>
                <h3>&apos;원조&apos; 피지컬 마스터 100% 검증 파견</h3>
                <p>외부 강사를 대충 소싱하여 단순 매칭하지 않습니다. 12년 노하우가 담긴 자체 아카데미의 <strong>피지컬케어 자격 인증(PCM, PTS)을 완벽히 통과한 최상위 전문가</strong>만을 육성 및 파견합니다. 이것이 흉내 낼 수 없는 원조의 격차입니다.</p>
              </RevealWrapper>
            </div>
          </div>
        </div>
      </RevealWrapper>

      {/* 게이트웨이 섹션 */}
      <RevealWrapper className="gateway-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#111', letterSpacing: -1 }}>온전한 웰니스를 향한 세 가지 솔루션</h2>
            <p style={{ color: '#666', fontSize: 16 }}>FaWW의 3가지 핵심 비즈니스로 여러분의 조직과 일상에 건강을 선물하세요.</p>
          </div>
          <div className="gateway-grid">
            <Link href="/main3/ai">
              <RevealWrapper className="gateway-card reveal-scale delay-1">
                <div className="gateway-img scan-wrapper" style={{ backgroundColor: '#f0f4ff', color: '#1a56db' }}>
                  <div className="scan-line" />
                  B2B / 학교 솔루션 화면
                </div>
                <div className="gateway-content">
                  <div className="tags-wrap"><span className="hash-tag">#임직원_통증관리</span><span className="hash-tag">#학생_체형검진</span></div>
                  <h2>스마트 AI 체형분석 솔루션</h2>
                  <p>기업의 업무 효율을 높이는 EAP 복지 프로그램부터 학교 단체 검진까지, 데이터 기반의 정확한 리포트를 제공합니다.</p>
                  <div className="gateway-btn">조직 맞춤 솔루션 보기</div>
                </div>
              </RevealWrapper>
            </Link>
            <Link href="/main3/physical">
              <RevealWrapper className="gateway-card reveal-scale delay-2">
                <div className="gateway-img">피지컬케어 센터/아카데미 화면</div>
                <div className="gateway-content">
                  <div className="tags-wrap"><span className="hash-tag">#로컬센터</span><span className="hash-tag">#전문가양성</span></div>
                  <h2>FaWW 피지컬케어</h2>
                  <p>전국 주요 오프라인 거점 센터를 통한 개인 맞춤 관리와, 압도적인 전문가를 양성하는 아카데미 교육 과정을 운영합니다.</p>
                  <div className="gateway-btn">피지컬케어 자세히 보기</div>
                </div>
              </RevealWrapper>
            </Link>
            <Link href="/main3/mall">
              <RevealWrapper className="gateway-card reveal-scale delay-3">
                <div className="gateway-img">교구몰 쇼핑 화면</div>
                <div className="gateway-content">
                  <div className="tags-wrap"><span className="hash-tag">#홈케어교구</span><span className="hash-tag">#복지포인트</span></div>
                  <h2>피지컬케어 Mall</h2>
                  <p>전문가가 직접 검증한 릴렉싱 및 트레이닝 교구. 기업 복지 포인트 차감 및 안전한 셀프 홈케어를 완벽 지원합니다.</p>
                  <div className="gateway-btn">검증 교구 쇼핑하기</div>
                </div>
              </RevealWrapper>
            </Link>
          </div>
        </div>
      </RevealWrapper>

      {/* 후기 */}
      <RevealWrapper className="testimonials">
        <div className="container">
          <h2 className="section-title">조직 담당자 98% 추천 생생 후기</h2>
          <ReviewSwiper />
        </div>
      </RevealWrapper>

      {/* 지도 */}
      <MapSection showDetail />

      {/* 파트너 */}
      <RevealWrapper className="partners">
        <div className="container">
          <h2 className="section-title">대한민국 일류 기업과 학교들이 FaWW와 함께합니다</h2>
          <PartnerSwiper />
        </div>
      </RevealWrapper>

      {/* 미디어 */}
      <MediaSection />

      {/* CTA */}
      <CTAFooter />
    </>
  )
}
