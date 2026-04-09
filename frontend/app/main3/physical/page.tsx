'use client'

import Link from 'next/link'
import { useState } from 'react'
import RevealWrapper from '@/components/main3/RevealWrapper'
import CTAFooter from '@/components/main3/CTAFooter'

type SubPage = 'gateway' | 'eap' | 'academy' | 'center'

const academyCourses = [
  { code: 'PCM', title: '피지컬케어 마스터', desc: '핵심 근막이완 및 체형교정 기술을 마스터하는 최고위 자격 과정.' },
  { code: 'PTS', title: '퍼스널 트레이닝 스페셜리스트', desc: '기능성 해부학과 실전 트레이닝을 결합한 실전 코칭 과정.' },
  { code: 'MD', title: '미넥신', desc: '신경/근육 심화 이완술 전문가 과정.' },
  { code: 'AI', title: '체형분석사', desc: '데이터 기반의 스마트 AI 스캐닝 및 체형 분석 전문 자격 과정.' },
]

const centers = [
  { badge: 'Center 01', name: '영등포 본점', address: '서울 영등포구 선유동2로 (대표 직영점)' },
  { badge: 'Center 02', name: '강남점', address: '서울 강남구 테헤란로 (강남권 거점 센터)' },
  { badge: 'Center 03', name: '동탄점', address: '경기 화성시 동탄대로 (경기 남부권 센터)' },
  { badge: 'Center 04', name: '여의도점', address: '서울 영등포구 여의대로 (직장인 특화 센터)' },
]

export default function PhysicalPage() {
  const [subPage, setSubPage] = useState<SubPage>('gateway')

  return (
    <>
      <RevealWrapper className="hero" style={{ backgroundColor: '#111' }}>
        <div className="container">
          <h1>현장과 실무를 잇는 <span>FaWW 피지컬케어</span></h1>
          <p>기업의 생산성부터 개인의 삶의 질 향상, 그리고 대한민국 최고 전문가 양성까지 아우릅니다.</p>
        </div>
      </RevealWrapper>

      {/* 게이트웨이 */}
      {subPage === 'gateway' && (
        <RevealWrapper>
          <div className="container" style={{ padding: '60px 20px' }}>
            <div className="card-grid" style={{ gap: 30 }}>
              <div
                className="info-card reveal reveal-scale delay-1"
                style={{ padding: '60px 30px', borderColor: '#1a56db', boxShadow: '0 10px 30px rgba(26,86,219,0.1)', cursor: 'pointer' }}
                onClick={() => setSubPage('eap')}
              >
                <div className="card-icon" style={{ width: 80, height: 80, fontSize: 24, background: '#1a56db', color: 'white' }}>EAP</div>
                <h3 style={{ fontSize: 26 }}>피지컬케어</h3>
                <p style={{ fontSize: 16 }}>기업 임직원을 위한 맞춤형 방문 솔루션</p>
                <div className="view-details-btn">자세히 보기</div>
              </div>
              <div
                className="info-card reveal reveal-scale delay-2"
                style={{ padding: '60px 30px', cursor: 'pointer' }}
                onClick={() => setSubPage('academy')}
              >
                <div className="card-icon" style={{ width: 80, height: 80, fontSize: 24, color: '#111' }}>EDU</div>
                <h3 style={{ fontSize: 26 }}>자격증</h3>
                <p style={{ fontSize: 16 }}>오리지널 피지컬케어 전문가 양성 과정</p>
                <div className="view-details-btn" style={{ color: '#111' }}>자세히 보기</div>
              </div>
              <div
                className="info-card reveal reveal-scale delay-3"
                style={{ padding: '60px 30px', cursor: 'pointer' }}
                onClick={() => setSubPage('center')}
              >
                <div className="card-icon" style={{ width: 80, height: 80, fontSize: 24, color: '#111' }}>CTR</div>
                <h3 style={{ fontSize: 26 }}>센터</h3>
                <p style={{ fontSize: 16 }}>가까운 직영 센터 1:1 맞춤형 피지컬케어</p>
                <div className="view-details-btn" style={{ color: '#111' }}>자세히 보기</div>
              </div>
            </div>
          </div>
        </RevealWrapper>
      )}

      {/* EAP 서브 */}
      {subPage === 'eap' && (
        <RevealWrapper className="category-section" style={{ backgroundColor: '#fff', paddingTop: 40 }}>
          <div className="container">
            <span className="back-btn-light" onClick={() => setSubPage('gateway')}>← 카테고리 선택으로 돌아가기</span>
            <h2 className="section-title">피지컬케어 (EAP)</h2>
            <p className="section-desc">기업 임직원을 위한 맞춤형 방문 피지컬케어 솔루션</p>
            <div style={{ maxWidth: 600, margin: '0 auto' }}>
              <Link href="/main3/ai/eap">
                <div
                  className="info-card"
                  style={{ borderColor: '#1a56db', boxShadow: '0 10px 30px rgba(26,86,219,0.1)' }}
                >
                  <div className="card-icon" style={{ background: '#1a56db', color: 'white', width: 80, height: 80, fontSize: 24, marginBottom: 30 }}>EAP</div>
                  <h3 style={{ fontSize: 24 }}>기업 EAP (임직원 대상)</h3>
                  <p style={{ fontSize: 16 }}>AI 체형분석과 연계된 B2B 전용 근골격계 질환 예방 프로그램입니다.</p>
                  <div className="view-details-btn" style={{ fontSize: 16, marginTop: 30 }}>스마트 EAP 솔루션 바로가기</div>
                </div>
              </Link>
            </div>
          </div>
        </RevealWrapper>
      )}

      {/* 아카데미 서브 */}
      {subPage === 'academy' && (
        <RevealWrapper className="category-section" style={{ backgroundColor: '#f8f9fa', paddingTop: 40 }}>
          <div className="container">
            <span className="back-btn-light" onClick={() => setSubPage('gateway')}>← 카테고리 선택으로 돌아가기</span>
            <h2 className="section-title">자격증 교육 (아카데미)</h2>
            <p className="section-desc">대한민국 오리지널 피지컬케어 노하우를 전수하는 정규 자격증 과정</p>
            <div className="grid-2x2">
              {academyCourses.map((course, i) => (
                <div key={i} className="info-card">
                  <div className="card-icon" style={{ color: '#111' }}>{course.code}</div>
                  <h3>{course.title}</h3>
                  <p>{course.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealWrapper>
      )}

      {/* 센터 서브 */}
      {subPage === 'center' && (
        <RevealWrapper className="category-section" style={{ backgroundColor: '#fff', paddingTop: 40 }}>
          <div className="container">
            <span className="back-btn-light" onClick={() => setSubPage('gateway')}>← 카테고리 선택으로 돌아가기</span>
            <h2 className="section-title">센터 (로컬) 소개</h2>
            <p className="section-desc">가까운 직영 센터에서 FaWW의 1:1 맞춤형 피지컬케어를 경험해 보세요.</p>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              {centers.map((center, i) => (
                <RevealWrapper key={i} className={`center-row-card delay-${i + 1}`}>
                  <div>
                    <span className="gateway-badge">{center.badge}</span>
                    <h3 style={{ fontSize: 24, fontWeight: 800, color: '#111' }}>{center.name}</h3>
                    <p style={{ color: '#666', marginTop: 5 }}>{center.address}</p>
                  </div>
                  <div style={{ color: '#1a56db', fontSize: 24 }}>→</div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </RevealWrapper>
      )}

      <CTAFooter />
    </>
  )
}
