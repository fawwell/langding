'use client';

import React from 'react';
import { useUI } from '@/context/UIContext';
import Footer from '@/components/layout/Footer';

const MallPage = () => {
    const { openModal } = useUI();

    return (
        <main id="page-mall" className="page-content active" style={{ position: 'relative', overflow: 'hidden' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes mallPawmiFloat {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(4deg); }
                }
                @keyframes pawmiGlowBounceMall {
                    0% { transform: translateY(-4px) scale(1.1) rotate(4deg); filter: drop-shadow(0 0 15px #00ff88) drop-shadow(0 0 25px rgba(43, 138, 62, 0.9)); }
                    100% { transform: translateY(-14px) scale(1.18) rotate(-4deg); filter: drop-shadow(0 0 22px #00ffcc) drop-shadow(0 0 35px rgba(0, 255, 136, 0.9)); }
                }
                .mall-pawmi-mascot {
                    width: 130px;
                    height: 130px;
                    object-fit: contain;
                    filter: drop-shadow(0 8px 20px rgba(0,0,0,0.4));
                    animation: mallPawmiFloat 3.8s ease-in-out infinite;
                    cursor: pointer;
                    margin-bottom: 20px;
                    transition: filter 0.3s ease;
                }
                .mall-pawmi-mascot:hover {
                    animation: pawmiGlowBounceMall 0.5s ease-in-out infinite alternate !important;
                }
                .mall-blurred-content {
                    filter: blur(10px) brightness(0.6);
                    pointer-events: none;
                    user-select: none;
                    transition: filter 0.3s ease;
                }
                .mall-coming-soon-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    min-height: 80vh;
                    z-index: 50;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 20px;
                    background: rgba(11, 12, 16, 0.45);
                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);
                }
                .coming-soon-card {
                    background: rgba(20, 24, 33, 0.85);
                    border: 1px solid rgba(43, 138, 62, 0.4);
                    box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 30px rgba(43, 138, 62, 0.25);
                    border-radius: 28px;
                    padding: 50px 40px;
                    max-width: 560px;
                    width: 90%;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
            `}} />

            {/* 준비 중 모달 오버레이 */}
            <div className="mall-coming-soon-overlay">
                <div className="coming-soon-card">
                    <img 
                        src="/images/pawmi/pawmi_theragun.png" 
                        alt="테라건 파우미" 
                        title="클릭하면 튀어오릅니다!"
                        className="mall-pawmi-mascot"
                    />
                    <span style={{ 
                        background: 'rgba(43, 138, 62, 0.2)', 
                        color: '#00ff88', 
                        border: '1px solid rgba(0, 255, 136, 0.3)', 
                        padding: '6px 16px', 
                        borderRadius: '20px', 
                        fontSize: '13px', 
                        fontWeight: 'bold', 
                        marginBottom: '16px',
                        letterSpacing: '1px'
                    }}>
                        COMING SOON
                    </span>
                    <h2 style={{ color: '#fff', fontSize: '28px', fontWeight: 900, marginBottom: '14px', letterSpacing: '-0.5px' }}>
                        피지컬케어 Mall 준비 중입니다
                    </h2>
                    <p style={{ color: '#aaa', fontSize: '15px', lineHeight: '1.6', marginBottom: '30px', wordBreak: 'keep-all' }}>
                        전문가가 직접 검증한 프리미엄 교구와<br />
                        기업 복지 포인트 연동 혜택으로 찾아뵙겠습니다.
                    </p>
                    <button 
                        className="cta-btn-white" 
                        onClick={() => openModal('modal-proposal')}
                        style={{ 
                            background: '#2b8a3e', 
                            color: '#fff', 
                            border: 'none', 
                            padding: '16px 36px', 
                            borderRadius: '30px', 
                            fontSize: '16px', 
                            fontWeight: 'bold', 
                            cursor: 'pointer',
                            boxShadow: '0 8px 20px rgba(43, 138, 62, 0.4)'
                        }}
                    >
                        도입 및 대량 구매 문의하기
                    </button>
                </div>
            </div>

            {/* 뿌연 배경 콘텐츠 */}
            <div className="mall-blurred-content">
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
                                    <button className="buy-btn-premium">제품 상세 보기</button>
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
                                    <button className="buy-btn-premium">제품 상세 보기</button>
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
                                    <button className="buy-btn-premium">제품 상세 보기</button>
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
                                    <button className="buy-btn-premium">제품 상세 보기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </main>
    );
};

export default MallPage;
