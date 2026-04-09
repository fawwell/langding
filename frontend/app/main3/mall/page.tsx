import RevealWrapper from '@/components/main3/RevealWrapper'
import CTAFooter from '@/components/main3/CTAFooter'

const products = [
  { name: '블랙테라' },
  { name: '마사지스틱' },
  { name: '스포츠밴드' },
  { name: '스트랩' },
  { name: '테이핑' },
]

export default function MallPage() {
  return (
    <>
      <RevealWrapper className="hero" style={{ backgroundColor: '#212529' }}>
        <div className="container">
          <h1>검증된 교구, <span>피지컬케어 mall</span></h1>
          <p>임직원 복지 포인트 차감을 지원하는 전용 교구몰입니다.</p>
        </div>
      </RevealWrapper>

      <RevealWrapper className="category-section" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <h2 className="section-title">전문가 검증 교구</h2>
          <p className="section-desc">피지컬케어 전문가가 직접 선별한 홈케어 교구입니다.</p>
          <div className="product-grid">
            {products.map((product, i) => (
              <RevealWrapper key={i} className={`product-card reveal-scale delay-${(i % 4) + 1}`}>
                <div className="product-img">{product.name}</div>
                <div className="product-info">
                  <div className="product-title">{product.name}</div>
                  <button className="buy-btn">도입 문의</button>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </RevealWrapper>

      <CTAFooter />
    </>
  )
}
