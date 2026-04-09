'use client'

import Link from 'next/link'
import RevealWrapper from '@/components/main3/RevealWrapper'
import ReviewSwiper from '@/components/main3/ReviewSwiper'
import PartnerSwiper from '@/components/main3/PartnerSwiper'
import MapSection from '@/components/main3/MapSection'
import MediaSection from '@/components/main3/MediaSection'
import CTAFooter from '@/components/main3/CTAFooter'
import { useModal } from '@/components/main3/ModalContext'
import { useState } from 'react'

const faqItems = [
  {
    tags: ['🧘‍♀️ 웰니스', '📅 헬스데이', '🏃 사내 운동'],
    title: '사내 웰니스 문화를 만들고 싶어요',
    content: 'FaWW의 단체 오피스 스트레칭과 건강 특강 모듈을 통해 직원들이 일상에서 쉽게 참여할 수 있는 웰니스 문화를 조성해 드립니다.',
  },
  {
    tags: ['🤯 직무스트레스', '🔋 번아웃', '💬 감정 노동'],
    title: '임직원들의 마음의 피로를 풀어주고 싶어요',
    content: '1:1 수기 케어를 통해 굳어있는 신체의 긴장을 풀고, 교감신경을 안정화하여 육체적/정신적 스트레스와 번아웃을 동시에 케어합니다.',
  },
]

const serviceCards = [
  { badge: 'BLOCK 1. 진단', title: '스마트 Ai 체형분석', desc: '통증의 원인을 파악하고, 신체 불균형을 구조적으로 분석하여 정확하게 관리합니다.', img: 'AI 스캐닝 이미지', badgeStyle: {}, cardStyle: {} },
  { badge: 'BLOCK 2. 케어', title: '1:1 피지컬 케어', desc: '통증 개선과 부상 예방을 위한 전문가 수기치료와 테이핑, MCT 등을 현장에서 진행합니다.', img: '전문가 케어 이미지', badgeStyle: { background: '#1a56db', color: '#fff' }, cardStyle: { border: '2px solid #1a56db' } },
  { badge: 'BLOCK 3. 실습', title: '단체 운동 프로그램', desc: '의자나 소도구를 활용하여 업무 중에도 실천 가능한 코어 강화 및 근육 이완 루틴.', img: '단체 운동 이미지', badgeStyle: {}, cardStyle: {} },
  { badge: 'BLOCK 4. 교육', title: '강의 프로그램', desc: '거북목 교정, 대사증후군 예방, 식습관 개선 등 맞춤형 건강 특강을 제공합니다.', img: '강의 진행 이미지', badgeStyle: {}, cardStyle: {} },
]

export default function EapPage() {
  const { openModal } = useModal()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <RevealWrapper className="hero-premium">
        <div className="container">
          <div style={{ textAlign: 'left' }}>
            <Link href="/main3/ai" className="back-btn">← 타겟 선택으로 돌아가기</Link>
          </div>
          <h1>인재가 머무는 회사,<br />조직문화의 완성은 FaWW</h1>
          <p>데이터 기반의 피지컬케어 솔루션을 제안합니다.</p>
          <button className="btn-primary" onClick={() => openModal('proposal')} style={{ fontSize: 18, padding: '16px 36px' }}>
            우리 회사 맞춤 제안서 받기
          </button>
        </div>
      </RevealWrapper>

      <RevealWrapper className="services">
        <div className="container">
          <h2 className="section-title">FaWW 스마트 EAP 솔루션</h2>
          <p className="section-desc">조직에 맞게 설계된 과학적 블록을 운영합니다.</p>
          <div className="service-grid">
            {serviceCards.map((card, i) => (
              <RevealWrapper
                key={i}
                className={`smart-card ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'} delay-${(i % 2) + 1}`}
                style={card.cardStyle}
              >
                <div className="smart-card-top">
                  <div className="smart-card-img">{card.img}</div>
                  <div className="smart-card-body">
                    <span className="gateway-badge" style={card.badgeStyle}>{card.badge}</span>
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </RevealWrapper>

      <RevealWrapper className="faq-section">
        <div className="container text-center">
          <div className="faq-header-wrap">
            <h2>기업 복지 담당자님, <span>이런 고민이 있으신가요?</span></h2>
            <p>운동부터 강연, 콘텐츠까지 맞춤 프로그램으로 해결해 드립니다.</p>
          </div>
          <div className="faq-list">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className={`faq-item ${openFaq === i ? 'active' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="faq-tags">
                  {item.tags.map((tag, j) => <span key={j} className="faq-tag">{tag}</span>)}
                </div>
                <div className="faq-title-wrap">
                  <div className="faq-title">{item.title}</div>
                  <div className="faq-icon">+</div>
                </div>
                {openFaq === i && <div className="faq-content">{item.content}</div>}
              </div>
            ))}
          </div>
        </div>
      </RevealWrapper>

      <RevealWrapper className="testimonials" style={{ background: '#fff' }}>
        <div className="container">
          <h2 className="section-title">임직원 98% 추천 생생 후기</h2>
          <ReviewSwiper cardStyle={{ background: '#f8f9fa' }} />
        </div>
      </RevealWrapper>

      <MapSection style={{ background: '#f4f6f9' }} showDetail={false} />

      <RevealWrapper className="partners">
        <div className="container">
          <h2 className="section-title">대한민국 일류 기업들이 FaWW와 함께합니다</h2>
          <PartnerSwiper />
        </div>
      </RevealWrapper>

      <MediaSection style={{ background: '#f8f9fa' }} />

      <CTAFooter />
    </>
  )
}
