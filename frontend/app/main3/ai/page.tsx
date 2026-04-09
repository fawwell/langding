import Link from 'next/link'
import RevealWrapper from '@/components/main3/RevealWrapper'
import CTAFooter from '@/components/main3/CTAFooter'

export default function AiPage() {
  return (
    <>
      <RevealWrapper className="hero" style={{ backgroundColor: '#111' }}>
        <div className="container">
          <h1>데이터로 증명하는 <span>스마트 AI 체형분석</span></h1>
          <p>기업의 생산성 향상부터 학생들의 바른 성장까지, 정확한 진단 솔루션을 제공합니다.</p>
        </div>
      </RevealWrapper>

      <RevealWrapper className="category-section">
        <div className="container">
          <h2 className="section-title">AI 체형분석 솔루션 타겟</h2>
          <div className="card-grid">
            <Link href="/main3/ai/eap">
              <RevealWrapper
                className="info-card reveal-scale delay-1"
                style={{ borderColor: '#1a56db', boxShadow: '0 10px 30px rgba(26,86,219,0.1)' }}
              >
                <div className="card-icon" style={{ background: '#1a56db', color: 'white' }}>01</div>
                <h3>기업 EAP (임직원 대상)</h3>
                <p>임직원의 근골격계 질환을 예방하고 업무 효율을 높이는 B2B 전용 체형분석 솔루션입니다.</p>
                <div className="view-details-btn">기업 EAP 상세 보기</div>
              </RevealWrapper>
            </Link>
            <Link href="/main3/ai/school">
              <RevealWrapper
                className="info-card reveal-scale delay-2"
                style={{ borderColor: '#004d40', boxShadow: '0 10px 30px rgba(0,77,64,0.1)' }}
              >
                <div className="card-icon" style={{ background: '#004d40', color: 'white' }}>02</div>
                <h3>학교 (학생 대상)</h3>
                <p>성장기 학생들의 체형 검진과 더불어 스트레칭, 그룹운동 및 상세 통계 리포트를 제공합니다.</p>
                <div className="view-details-btn" style={{ color: '#004d40' }}>학교 프로그램 상세 보기</div>
              </RevealWrapper>
            </Link>
            <Link href="/main3/physical">
              <RevealWrapper className="info-card reveal-scale delay-3">
                <div className="card-icon" style={{ color: '#111' }}>03</div>
                <h3>개인</h3>
                <p>개인 맞춤형 체형 분석 및 근본적인 신체 개선을 원하신다면 가까운 피지컬케어 센터를 방문해 보세요.</p>
                <div className="view-details-btn" style={{ color: '#111' }}>가까운 센터 찾기</div>
              </RevealWrapper>
            </Link>
          </div>
        </div>
      </RevealWrapper>

      <CTAFooter />
    </>
  )
}
