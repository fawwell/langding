const mediaItems = [
  '기업 복지 트렌드, 이제는 맞춤형 피지컬케어 시대',
  'FaWW, AI 체형분석 도입으로 업계 혁신 선도',
  '직장인 거북목 완화 프로젝트 성공 사례 조명',
  '건강한 조직문화를 위한 필수 선택, EAP 솔루션',
]

interface MediaSectionProps {
  style?: React.CSSProperties
}

export default function MediaSection({ style }: MediaSectionProps) {
  return (
    <section className="media" style={style}>
      <div className="container">
        <h2 className="section-title">FaWW 미디어 보도</h2>
        <div className="media-grid">
          {mediaItems.map((title, i) => (
            <div key={i} className="media-item">
              <div className="media-thumb">기사 썸네일 이미지</div>
              <div className="media-title">{title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
