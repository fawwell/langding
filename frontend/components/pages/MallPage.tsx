'use client';

import React from 'react';

interface MallPageProps {
    activePage: string;
    openModal: (id: string) => void;
}

const MallPage = ({ activePage, openModal }: MallPageProps) => {
    return (
        <main id="page-mall" className={`page-content ${activePage === 'page-mall' ? 'active' : ''}`}>
            <section className="hero-brand hero-brand-sub reveal" style={{ backgroundColor: '#111', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="hero-subtitle hero-el hero-el-1 reveal soft-reveal">Physical Care Mall</div>
                    <h1 className="hero-el hero-el-2 reveal soft-reveal">검증된 교구, <span>피지컬케어 mall</span></h1>
                    <p className="hero-el hero-el-3 reveal soft-reveal">
                        <strong>전문가가 직접 선별한 건강 굿즈</strong><br />
                        임직원 복지 포인트 차감을 지원하는 전용 교구몰에서<br />일상을 변화시키는 건강 아이템을 만나보세요
                    </p>
                </div>
            </section>
            
            <section className="floating-gallery reveal" style={{ padding: '100px 0', background: '#0b0c10' }}>
                <div className="container">
                    <div className="product-grid-premium">
                        {/* 제품 1: 블랙테라 */}
                        <div className="product-card-premium reveal">
                            <div className="product-tag-premium">BEST</div>
                            <div className="product-img-wrapper">
                                <img src="/images/mall/blackterra.png" alt="블랙테라" />
                            </div>
                            <div className="product-info-premium">
                                <h3 className="product-name-premium">블랙테라</h3>
                                <p className="product-desc-premium" style={{ fontSize: '13px', color: '#888', marginBottom: '10px' }}>전문가용 프리미엄 온열 마사지 케어 툴</p>
                                <p className="product-price-premium">도입가 별도문의</p>
                                <button className="buy-btn-premium" onClick={() => openModal('modal-proposal')}>제품 상세 보기</button>
                            </div>
                        </div>

                        {/* 제품 2: 피지컬 밴드 */}
                        <div className="product-card-premium reveal">
                            <div className="product-tag-premium">NEW</div>
                            <div className="product-img-wrapper">
                                <img src="/images/mall/physicalband.png" alt="피지컬 밴드" />
                            </div>
                            <div className="product-info-premium">
                                <h3 className="product-name-premium">피지컬 밴드</h3>
                                <p className="product-desc-premium" style={{ fontSize: '13px', color: '#888', marginBottom: '10px' }}>고탄성 프리미엄 저항 밴드</p>
                                <p className="product-price-premium">도입가 별도문의</p>
                                <button className="buy-btn-premium" onClick={() => openModal('modal-proposal')}>제품 상세 보기</button>
                            </div>
                        </div>

                        {/* 제품 3: 피지컬볼 */}
                        <div className="product-card-premium reveal">
                            <div className="product-tag-premium">PREMIUM</div>
                            <div className="product-img-wrapper">
                                <img src="/images/mall/physicalball.png" alt="피지컬볼" />
                            </div>
                            <div className="product-info-premium">
                                <h3 className="product-name-premium">피지컬볼</h3>
                                <p className="product-desc-premium" style={{ fontSize: '13px', color: '#888', marginBottom: '10px' }}>심부 근육 이완용 고강도 마사지볼</p>
                                <p className="product-price-premium">도입가 별도문의</p>
                                <button className="buy-btn-premium" onClick={() => openModal('modal-proposal')}>제품 상세 보기</button>
                            </div>
                        </div>

                        {/* 제품 4: 3d스트랩 */}
                        <div className="product-card-premium reveal">
                            <div className="product-tag-premium">IOT</div>
                            <div className="product-img-wrapper">
                                <img src="/images/mall/strap3d.png" alt="3d스트랩" />
                            </div>
                            <div className="product-info-premium">
                                <h3 className="product-name-premium">3d스트랩</h3>
                                <p className="product-desc-premium" style={{ fontSize: '13px', color: '#888', marginBottom: '10px' }}>정밀 측정이 가능한 IT 융합 스트랩</p>
                                <p className="product-price-premium">도입가 별도문의</p>
                                <button className="buy-btn-premium" onClick={() => openModal('modal-proposal')}>제품 상세 보기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-footer reveal">
                <div className="container">
                    <h2>FaWW가 엄선한 프리미엄 교구를 만나보세요</h2>
                    <p style={{ marginBottom: '30px' }}>기업 복지 포인트 도입을 위한 교구 대량 구매 견적 및 제품 상세 소개서를 제공해 드립니다.</p>
                    <button className="cta-btn-white" onClick={() => openModal('modal-proposal')}>도입 문의 및 견적 신청</button>
                </div>
            </section>

            <footer style={{ backgroundColor: '#111', color: '#888', padding: '60px 20px', fontSize: '14px', lineHeight: '1.6' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
                        <div style={{ fontSize: '24px', fontWeight: '900', color: '#fff', letterSpacing: '-1px' }}>FaWW</div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>이용약관</a>
                            <a href="#" style={{ color: '#ccc', textDecoration: 'none', fontWeight: 'bold' }}>개인정보처리방침</a>
                        </div>
                    </div>
                    <div>
                        <p style={{ margin: '0 0 5px 0' }}>주식회사 파우(FaWW) | 대표이사: 김은주 | 사업자등록번호: 107-88-12047</p>
                        <p style={{ margin: '0 0 5px 0' }}>주소: 서울특별시 영등포구 도신로 143, 대원빌딩 301호 | 고객센터: 02-6482-9003</p>
                        <p style={{ margin: '0' }}>이메일: contact@faww.co.kr</p>
                    </div>
                    <div style={{ marginTop: '10px', color: '#555' }}>
                        © {new Date().getFullYear()} FaWW Korea. All rights reserved.<br />
                        <span style={{ fontSize: '12px', opacity: 0.7 }}>파우(FaWW)는 기업의 안전보건 컴플라이언스 파트너로서 법령 준수를 지원합니다.</span>
                    </div>
                </div>
            </footer>
        </main>
    );
};

export default MallPage;
