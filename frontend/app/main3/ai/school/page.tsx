'use client'

import Link from 'next/link'
import RevealWrapper from '@/components/main3/RevealWrapper'
import CountUp from '@/components/main3/CountUp'
import ReviewSwiper from '@/components/main3/ReviewSwiper'
import PartnerSwiper from '@/components/main3/PartnerSwiper'
import MapSection from '@/components/main3/MapSection'
import CTAFooter from '@/components/main3/CTAFooter'
import { useModal } from '@/components/main3/ModalContext'

const processSteps = [
  { num: '01', title: '사전 협의', desc: '학교 환경 분석 및\n맞춤 프로그램 설계' },
  { num: '02', title: '체형 측정', desc: '전문 장비를 활용한\n정밀 체형분석 실시' },
  { num: '03', title: '데이터 분석', desc: '개인별·학급별\n건강 데이터 리포트' },
  { num: '04', title: '사후 관리', desc: '맞춤 운동 처방 및\n추적 관리 시스템' },
]

const programs = [
  { badge: 'PROGRAM 1', title: '스마트 AI 체형 분석 프로그램', desc: '정밀 카메라와 AI 솔루션을 활용해 학생들의 근골격계 상태와 성장 밸런스를 측정하고 평가합니다.', img: '스캐닝 진행 화면' },
  { badge: 'PROGRAM 2', title: '그룹 운동', desc: '스트레칭 및 자세교정을 위한 기능성 트레이닝. 성장기 학생들에게 꼭 필요한 맞춤형 운동 처방을 제공합니다.', img: '그룹 운동 진행 화면' },
  { badge: 'PROGRAM 3', title: '건강 교육', desc: '올바른 자세와 생활 습관을 가르치는 전문 강의. 학생들이 스스로 건강을 관리하는 역량을 기릅니다.', img: '교육 진행 화면' },
]

export default function SchoolPage() {
  const { openModal } = useModal()

  return (
    <>
      <RevealWrapper
        className="hero-premium"
        style={{ background: "linear-gradient(rgba(0,30,20,0.75),rgba(0,30,20,0.9)), url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop') no-repeat center/cover fixed" }}
      >
        <div className="container">
          <div style={{ textAlign: 'left' }}>
            <Link href="/main3/ai" className="back-btn">← 타겟 선택으로 돌아가기</Link>
          </div>
          <h1>바른 성장의 시작,<br />FaWW 학생 체형분석 솔루션</h1>
          <p>학교 현장에 최적화된 프로세스로 우리 아이들의 효율적인 건강관리를 지원합니다.</p>
          <button
            className="btn-primary"
            onClick={() => openModal('proposal')}
            style={{ fontSize: 18, padding: '16px 36px', backgroundColor: '#004d40', border: '1px solid #004d40' }}
          >
            학교 맞춤 제안서 받기
          </button>
        </div>
      </RevealWrapper>

      <RevealWrapper className="category-section" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="school-header-wrap">
            <span className="school-tag">SCHOOL PROGRAM</span>
            <h2>학교사업 ㅡ 학생 체형분석 솔루션</h2>
            <p>성장기 학생들의 체형 데이터를 과학적으로 분석하고, 맞춤형 운동 프로그램을 제공합니다.</p>
          </div>
          <div className="school-process-grid">
            {processSteps.map((step, i) => (
              <RevealWrapper key={i} className={`school-process-card reveal-scale delay-${i + 1}`}>
                <span className="school-process-num">{step.num}</span>
                <span className="school-process-title">{step.title}</span>
                <p className="school-process-desc">{step.desc.split('\n').map((line, j) => <span key={j}>{line}<br /></span>)}</p>
              </RevealWrapper>
            ))}
          </div>
          <RevealWrapper className="school-stats">
            <div className="school-stat-item"><h3><CountUp target={200} />+</h3><p>도입 학교 수</p></div>
            <div className="school-stat-item"><h3><CountUp target={30} format />만+</h3><p>학생 분석 데이터</p></div>
            <div className="school-stat-item"><h3><CountUp target={97} />%</h3><p>학교 재도입률</p></div>
          </RevealWrapper>
        </div>
      </RevealWrapper>

      <RevealWrapper className="services" style={{ backgroundColor: '#fff', paddingTop: 80 }}>
        <div className="container">
          <h2 className="section-title">주요 프로그램 종류</h2>
          <p className="section-desc">단순한 검진을 넘어 체계적인 교육과 관리를 동반합니다.</p>
          <div className="service-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {programs.map((prog, i) => (
              <div key={i} className="smart-card">
                <div className="smart-card-top" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div className="smart-card-img" style={{ width: '100%', height: 160, background: '#e0f2f1', color: '#004d40' }}>{prog.img}</div>
                  <div className="smart-card-body" style={{ textAlign: 'center', marginTop: 20 }}>
                    <span className="gateway-badge" style={{ background: '#e0f2f1', color: '#004d40' }}>{prog.badge}</span>
                    <h3>{prog.title}</h3>
                    <p>{prog.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealWrapper>

      <RevealWrapper className="testimonials" style={{ background: '#fff' }}>
        <div className="container">
          <h2 className="section-title">학교 담당자 97% 재도입 생생 후기</h2>
          <ReviewSwiper cardStyle={{ background: '#f8f9fa' }} />
        </div>
      </RevealWrapper>

      <MapSection style={{ background: '#f4f6f9' }} showDetail={false} />

      <RevealWrapper className="partners" style={{ background: '#fff' }}>
        <div className="container">
          <h2 className="section-title">전국 주요 학교들이 FaWW와 함께합니다</h2>
          <PartnerSwiper />
        </div>
      </RevealWrapper>

      <CTAFooter />
    </>
  )
}
