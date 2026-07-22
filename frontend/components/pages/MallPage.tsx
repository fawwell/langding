'use client';

import React from 'react';
import { useUI } from '@/context/UIContext';
import Footer from '@/components/layout/Footer';
import { ShoppingBag, Truck, ExternalLink, X, ShoppingCart, ArrowRight } from 'lucide-react';

const PRODUCTS = [
    {
        id: 'strap3d',
        name: '3D 스트랩',
        tag: 'BEST',
        desc: '정밀 측정이 가능한 IT 융합 스트랩',
        details: [
            '정밀 모션 측정이 가능한 고탄성 3D 스트랩',
            '자세 분석 및 피지컬 케어 연동 인공지능 지원',
            '쿠팡 로켓배송 무료 배송 & 익일 빠르게 수령',
            'FaWW 100% 공식 인증 정품 보증'
        ],
        price: '쿠팡 로켓배송 특가',
        img: '/images/mall/strap3d.png',
        coupangUrl: 'https://www.coupang.com/vp/products/8477063323?itemId=18590264907&searchId=5ce4eabb056e45e6a10388d231097659&sourceType=brandstore_sdp_atf-baseline_list&storeId=111499&subSourceType=brandstore_sdp_atf-baseline_list&vendorId=A00920407&vendorItemId=85726579078',
    },
    {
        id: 'blackterra',
        name: '블랙테라',
        tag: 'HOT',
        desc: '전문가용 프리미엄 온열 마사지 케어 툴',
        details: [
            '전문가용 온열 딥티슈 근육 케어 시스템',
            '인체공학적 그립 설계 및 3단계 온도 조절',
            '쿠팡 로켓배송 무료 배송 & 익일 빠르게 수령',
            'FaWW 100% 공식 인증 정품 보증'
        ],
        price: '쿠팡 로켓배송 특가',
        img: '/images/mall/blackterra.png',
        coupangUrl: 'https://www.coupang.com/vp/products/7281228718?itemId=18590265091&searchId=5ce4eabb056e45e6a10388d231097659&sourceType=brandstore_sdp_atf-baseline_list&storeId=111499&subSourceType=brandstore_sdp_atf-baseline_list&vendorId=A00920407&vendorItemId=85726579068',
    }
];

const MallPage = () => {
    const { openModal } = useUI();
    const [activeCoupangProduct, setActiveCoupangProduct] = React.useState<typeof PRODUCTS[0] | null>(null);

    React.useEffect(() => {
        const revealElements = document.querySelectorAll('#page-mall .reveal');
        revealElements.forEach(el => el.classList.add('active'));
    }, []);

    const openInternalCoupangModal = (prod: typeof PRODUCTS[0]) => {
        setActiveCoupangProduct(prod);
    };

    const goToCoupangCheckout = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const getEmbedCoupangUrl = (url: string) => {
        return url.replace('www.coupang.com/vp/products', 'm.coupang.com/vm/products');
    };

    return (
        <main id="page-mall" className="page-content active" style={{ backgroundColor: '#0b0e14', color: '#fff', position: 'relative', overflowX: 'hidden' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                #page-mall .reveal {
                    opacity: 1 !important;
                    transform: none !important;
                    visibility: visible !important;
                }
                @keyframes mallPawmiFloat {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(4deg); }
                }
                @keyframes pawmiGlowBounceMall {
                    0% { transform: translateY(-4px) scale(1.1) rotate(4deg); filter: drop-shadow(0 0 15px #00ff88) drop-shadow(0 0 25px rgba(43, 138, 62, 0.9)); }
                    100% { transform: translateY(-14px) scale(1.18) rotate(-4deg); filter: drop-shadow(0 0 22px #00ffcc) drop-shadow(0 0 35px rgba(0, 255, 136, 0.9)); }
                }
                @keyframes coupangModalIn {
                    0% { opacity: 0; transform: translateY(30px) scale(0.96); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                .mall-ambient-glow {
                    position: absolute;
                    top: -100px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 1000px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(43, 138, 62, 0.18) 0%, rgba(0, 255, 136, 0.05) 35%, transparent 70%);
                    pointer-events: none;
                    z-index: 1;
                }
                .mall-pawmi-mascot {
                    width: 120px;
                    height: 120px;
                    object-fit: contain;
                    filter: drop-shadow(0 10px 25px rgba(0,0,0,0.6));
                    animation: mallPawmiFloat 3.8s ease-in-out infinite;
                    cursor: pointer;
                    transition: filter 0.3s ease;
                }
                .mall-pawmi-mascot:hover {
                    animation: pawmiGlowBounceMall 0.5s ease-in-out infinite alternate !important;
                }
                .coupang-badge-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(230, 30, 43, 0.12);
                    border: 1px solid rgba(230, 30, 43, 0.35);
                    color: #ff5252;
                    padding: 6px 16px;
                    border-radius: 20px;
                    font-size: 12.5px;
                    font-weight: 700;
                    margin-bottom: 18px;
                    letter-spacing: -0.2px;
                }
                .speech-bubble-pawmi {
                    background: rgba(18, 24, 35, 0.95);
                    border: 1px solid rgba(0, 255, 136, 0.3);
                    box-shadow: 0 12px 35px rgba(0,0,0,0.6), 0 0 15px rgba(0, 255, 136, 0.15);
                    border-radius: 16px;
                    padding: 12px 18px;
                    color: #e2e8f0;
                    font-size: 13.5px;
                    font-weight: 600;
                    position: relative;
                    margin-bottom: 12px;
                    display: inline-block;
                }
                .speech-bubble-pawmi::after {
                    content: '';
                    position: absolute;
                    bottom: -8px;
                    right: 30px;
                    border-width: 8px 8px 0;
                    border-style: solid;
                    border-color: rgba(18, 24, 35, 0.95) transparent;
                    display: block;
                    width: 0;
                }
                .product-card-showroom {
                    background: #131924;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 22px;
                    overflow: hidden;
                    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
                }
                .product-card-showroom:hover {
                    transform: translateY(-8px);
                    border-color: rgba(0, 255, 136, 0.35);
                    box-shadow: 0 25px 50px rgba(0,0,0,0.6), 0 0 25px rgba(43, 138, 62, 0.25);
                }
                .btn-coupang-buy {
                    background: linear-gradient(135deg, #e61e2b 0%, #c0111d 100%) !important;
                    color: #ffffff !important;
                    border: none !important;
                    padding: 14px 18px !important;
                    border-radius: 12px !important;
                    font-size: 14px !important;
                    font-weight: 800 !important;
                    cursor: pointer !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 6px !important;
                    transition: all 0.2s ease !important;
                    width: 100% !important;
                    box-shadow: 0 6px 20px rgba(230, 30, 43, 0.35) !important;
                }
                .btn-coupang-buy:hover {
                    background: linear-gradient(135deg, #f02431 0%, #d01723 100%) !important;
                    transform: translateY(-2px) !important;
                    box-shadow: 0 10px 25px rgba(230, 30, 43, 0.5) !important;
                }
                @media (max-width: 768px) {
                    .hero-mascot-wrapper {
                        position: static !important;
                        text-align: center !important;
                        margin-bottom: 25px !important;
                    }
                    .speech-bubble-pawmi::after {
                        left: 50% !important;
                        transform: translateX(-50%) !important;
                    }
                }
            `}} />

            {/* 배경 은은한 오로라 글루 현상 */}
            <div className="mall-ambient-glow" />

            {/* 홈페이지 내부 쿠팡 웹뷰 미니 창 모달 */}
            {activeCoupangProduct && (
                <div 
                    onClick={() => setActiveCoupangProduct(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px'
                    }}
                >
                    <div 
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: '100%',
                            maxWidth: '960px',
                            height: '88vh',
                            backgroundColor: '#121620',
                            border: '1px solid rgba(230, 30, 43, 0.4)',
                            borderRadius: '24px',
                            boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 45px rgba(230, 30, 43, 0.3)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            animation: 'coupangModalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            position: 'relative'
                        }}
                    >
                        {/* 모달 상단 컨트롤 헤더 바 */}
                        <div style={{ 
                            padding: '16px 24px', 
                            backgroundColor: '#161c28', 
                            borderBottom: '1px solid rgba(255,255,255,0.08)',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            zIndex: 10
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ background: '#e61e2b', color: '#fff', fontSize: '11px', fontWeight: 900, padding: '4px 10px', borderRadius: '4px', letterSpacing: '0.5px' }}>
                                    COUPANG
                                </span>
                                <span style={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}>
                                    {activeCoupangProduct.name} - 쿠팡 공식 스토어 미니 뷰어
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <button 
                                    onClick={() => goToCoupangCheckout(activeCoupangProduct.coupangUrl)}
                                    style={{ 
                                        background: 'rgba(230, 30, 43, 0.12)',
                                        color: '#ff5252', 
                                        border: '1px solid rgba(230, 30, 43, 0.35)',
                                        padding: '6px 14px',
                                        borderRadius: '8px',
                                        fontSize: '12.5px', 
                                        fontWeight: 700, 
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        gap: '4px', 
                                        cursor: 'pointer'
                                    }}
                                >
                                    외부 창으로 크게보기 <ExternalLink size={13} />
                                </button>
                                <button 
                                    onClick={() => setActiveCoupangProduct(null)}
                                    style={{ 
                                        background: 'rgba(255,255,255,0.1)', 
                                        border: 'none', 
                                        color: '#fff', 
                                        cursor: 'pointer', 
                                        width: '32px', 
                                        height: '32px', 
                                        borderRadius: '50%',
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center'
                                    }}
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* 모달 본문: 쿠팡 모바일 전용 웹뷰 (m.coupang.com - 데스크톱 스크립트 에러 팝업 원천 방지) */}
                        <div style={{ flexGrow: 1, position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
                            <iframe 
                                src={getEmbedCoupangUrl(activeCoupangProduct.coupangUrl)}
                                title={`${activeCoupangProduct.name} 쿠팡 제품 상세`}
                                style={{ width: '100%', height: '100%', border: 'none' }}
                            />
                        </div>

                        {/* 모달 하단 액션 바: 정돈된 장바구니/바로구매 버튼 */}
                        <div style={{
                            padding: '16px 24px',
                            backgroundColor: '#121620',
                            borderTop: '1px solid rgba(230, 30, 43, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxShadow: '0 -10px 30px rgba(0,0,0,0.7)',
                            zIndex: 20
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <img 
                                    src={activeCoupangProduct.img} 
                                    alt={activeCoupangProduct.name}
                                    style={{ width: '48px', height: '48px', objectFit: 'contain', background: '#1c2230', padding: '4px', borderRadius: '10px' }} 
                                />
                                <div>
                                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#fff' }}>
                                        {activeCoupangProduct.name}
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#ff5252', fontWeight: 700 }}>
                                        🚀 {activeCoupangProduct.price}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <button 
                                    onClick={() => goToCoupangCheckout(activeCoupangProduct.coupangUrl)}
                                    style={{ 
                                        background: '#1d2433', 
                                        color: '#e2e8f0', 
                                        border: '1px solid rgba(255,255,255,0.12)', 
                                        padding: '12px 20px', 
                                        borderRadius: '12px', 
                                        fontSize: '14.5px', 
                                        fontWeight: 700, 
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    <ShoppingCart size={17} /> 장바구니 담기
                                </button>
                                <button 
                                    onClick={() => goToCoupangCheckout(activeCoupangProduct.coupangUrl)}
                                    style={{ 
                                        background: 'linear-gradient(135deg, #e61e2b 0%, #c0111d 100%)', 
                                        color: '#fff', 
                                        border: 'none',
                                        padding: '12px 28px', 
                                        borderRadius: '12px', 
                                        fontSize: '15px', 
                                        fontWeight: 900, 
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        boxShadow: '0 6px 20px rgba(230, 30, 43, 0.45)'
                                    }}
                                >
                                    <Truck size={18} /> 쿠팡 결제 창으로 이동 <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 히어로 헤더 섹션 */}
            <section className="hero-brand hero-brand-sub reveal" style={{ backgroundColor: '#0e121b', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '120px 0 80px 0', position: 'relative', zIndex: 2 }}>
                <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column' }}>
                    <div className="hero-mascot-wrapper" style={{ textAlign: 'right', alignSelf: 'flex-end', marginBottom: '10px' }}>
                        <div className="speech-bubble-pawmi">
                            🚀 쿠팡 로켓배송으로 빠르게 받아보세요!
                        </div>
                        <div>
                            <img 
                                src="/images/pawmi/pawmi_theragun.png" 
                                alt="몰 파우미" 
                                title="클릭하면 튀어오릅니다!"
                                className="mall-pawmi-mascot"
                                onClick={() => openInternalCoupangModal(PRODUCTS[0])}
                            />
                        </div>
                    </div>

                    <div>
                        <span className="coupang-badge-pill">
                            <Truck size={15} /> COUPANG ROCKET SHIPPING OFFICIAL
                        </span>
                        <h1 className="hero-el hero-el-2 reveal soft-reveal" style={{ fontSize: '38px', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.5px' }}>
                            검증된 제품, <span style={{ background: 'linear-gradient(135deg, #00ff88 0%, #059669 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>피지컬케어 mall</span>
                        </h1>
                        <p className="hero-el hero-el-3 reveal soft-reveal" style={{ color: '#94a3b8', fontSize: '16.5px', lineHeight: '1.7', maxWidth: '650px' }}>
                            <strong style={{ color: '#f8fafc' }}>전문가가 직접 선별한 웰니스 건강 굿즈</strong><br />
                            쿠팡 로켓배송으로 가장 빠르고 안전하게 파우 제품을 만나보세요.<br />
                            기업 임직원 대량 구매 및 복지 포인트 차감 견적 상담도 지원합니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* 쇼룸 상품 갤러리 섹션 */}
            <section className="floating-gallery reveal" style={{ padding: '80px 0 100px', background: '#0b0e14' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '55px' }}>
                        <h2 className="section-title reveal" style={{ color: '#fff', fontSize: '32px', fontWeight: 900, marginTop: '8px' }}>
                            FaWW <span style={{ background: 'linear-gradient(135deg, #00ff88 0%, #059669 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>공식 베스트 제품</span>
                        </h2>
                        <p style={{ color: '#64748b', fontSize: '15px', marginTop: '10px' }}>
                            원하시는 결제 방식을 선택하여 편하게 구매하실 수 있습니다.
                        </p>
                    </div>

                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                        gap: '35px', 
                        maxWidth: '780px', 
                        margin: '0 auto' 
                    }}>
                        {PRODUCTS.map((prod) => (
                            <div key={prod.id} className="product-card-showroom reveal" style={{ opacity: 1, visibility: 'visible' }}>
                                <div style={{ position: 'relative', height: '250px', background: '#161c28', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ 
                                        position: 'absolute', 
                                        top: '15px', 
                                        left: '15px', 
                                        background: prod.tag === 'BEST' ? 'linear-gradient(135deg, #2b8a3e, #059669)' : 'linear-gradient(135deg, #e61e2b, #d01723)', 
                                        color: '#fff', 
                                        fontSize: '11px', 
                                        fontWeight: 900, 
                                        padding: '4px 12px', 
                                        borderRadius: '6px',
                                        letterSpacing: '1px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                                    }}>
                                        {prod.tag}
                                    </span>
                                    <img 
                                        src={prod.img} 
                                        alt={prod.name} 
                                        style={{ width: '80%', height: '80%', objectFit: 'contain', transition: 'transform 0.3s ease', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }} 
                                    />
                                </div>
                                <div style={{ padding: '28px 25px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                                    <div>
                                        <h3 style={{ fontSize: '21px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>{prod.name}</h3>
                                        <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: '1.5', marginBottom: '18px' }}>{prod.desc}</p>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#ff5252', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <ShoppingBag size={15} /> {prod.price}
                                        </div>
                                        <button 
                                            className="btn-coupang-buy"
                                            onClick={() => openInternalCoupangModal(prod)}
                                        >
                                            <ShoppingBag size={16} /> 제품 상세 소개 & 구매 <ExternalLink size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA 하단 배너 */}
            <section className="cta-footer reveal" style={{ backgroundColor: '#131924', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="container text-center" style={{ padding: '65px 20px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#fff', marginBottom: '14px', letterSpacing: '-0.5px' }}>
                        기업 복지 포인트 연동 및 대량 제품 구매 문의
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: '15.5px', marginBottom: '32px', maxWidth: '700px', margin: '0 auto 32px auto', lineHeight: '1.6' }}>
                        임직원 건강 증진을 위한 세금 감면 혜택, 기업 포인트 일괄 결제 및 견적서를 무상으로 빠르게 제공해 드립니다.
                    </p>
                    <button 
                        className="cta-btn-white" 
                        onClick={() => openModal('modal-proposal')}
                        style={{ background: '#2b8a3e', color: '#fff', padding: '16px 42px', borderRadius: '30px', fontSize: '16px', fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px rgba(43, 138, 62, 0.4)', transition: 'all 0.2s ease' }}
                    >
                        기업 전용 견적 및 제안서 신청하기
                    </button>
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default MallPage;
