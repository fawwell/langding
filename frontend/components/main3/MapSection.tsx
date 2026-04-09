import RevealWrapper from './RevealWrapper'

const markers = [
  { top: '25%', left: '35%', label: '서울/경기 230곳', items: ['삼성 계열사', '현대 계열사', '네이버/카카오'] },
  { top: '40%', left: '60%', label: '충청권 85곳', items: ['SK하이닉스', '주요 공공기관'] },
  { top: '75%', left: '75%', label: '부산/경남 110곳', items: ['현대자동차', '주요 초중고교'] },
  { top: '60%', left: '40%', label: '전라권 65곳', items: ['LG화학', '주요 협력업체'] },
]

interface MapSectionProps {
  style?: React.CSSProperties
  showDetail?: boolean
}

export default function MapSection({ style, showDetail = true }: MapSectionProps) {
  return (
    <section className="map-section" style={style}>
      <div className="container">
        <h2 className="section-title">전국 어디든, FaWW가 찾아갑니다</h2>
        <p className="section-desc">전국 주요 기업 및 학교 500곳 이상 누적 방문 달성</p>
        <RevealWrapper>
          <div className="map-wrapper">
            {markers.map((marker, i) => (
              <div key={i} className="map-marker" style={{ top: marker.top, left: marker.left }}>
                {showDetail ? (
                  <>
                    <div className="marker-btn">{marker.label}</div>
                    <div className="marker-detail">
                      <ul>
                        {marker.items.map((item, j) => <li key={j}>{item}</li>)}
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="marker-dot" />
                    <div className="marker-label">{marker.label}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
