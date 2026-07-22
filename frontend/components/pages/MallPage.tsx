'use client';

import React from 'react';
import { useUI } from '@/context/UIContext';
import Footer from '@/components/layout/Footer';
import { ShoppingBag, Truck, Building2, ExternalLink, X, ShoppingCart, ArrowRight, CheckCircle2, ShieldCheck, Star } from 'lucide-react';

const PRODUCTS = [
    {
        id: 'blackterra',
        name: '블랙테라',
        tag: 'BEST',
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
    },
    {
        id: 'strap3d',
        name: '3D 스트랩',
        tag: 'HOT',
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

    return (
        <main id="page-mall" className="page-content active" style={{ backgroundColor: '#0b0c10', color: '#fff', position: 'relative' }}>
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
                .mall-pawmi-mascot {
                    width: 125px;
                    height: 125px;
                    object-fit: contain;
                    filter: drop-shadow(0 8px 20px rgba(0,0,0,0.5));
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
                    background: rgba(230, 30, 43, 0.15);
                    border: 1px solid rgba(230, 30, 43, 0.4);
                    color: #ff4d4d;
                    padding: 6px 16px;
                    border-radius: 20px;
                    font-size: 13px;
                    font-weight: 700;
                    margin-bottom: 15px;
                    letter-spacing: -0.3px;
                }
                .speech-bubble-pawmi {
                    background: rgba(20, 26, 36, 0.9);
                    border: 1px solid rgba(43, 138, 62, 0.4);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    border-radius: 16px;
                    padding: 12px 18px;
                    color: #e2e8f0;
                    font-size: 14px;
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
                    border-color: rgba(20, 26, 36, 0.9) transparent;
                    display: block;
                    width: 0;
                }
                .product-card-showroom {
                    background: #141822;
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 20px;
                    overflow: hidden;
                    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.3);
                }
                .product-card-showroom:hover {
                    transform: translateY(-8px);
                    border-color: rgba(43, 138, 62, 0.4);
                    box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 20px rgba(43, 138, 62, 0.2);
                }
                .btn-coupang-buy {
                    background: #e61e2b !important;
                    color: #ffffff !important;
                    border: none !important;
                    padding: 14px 18px !important;
                    border-radius: 12px !important;
                    font-size: 14px !important;
                    font-weight: 700 !important;
                    cursor: pointer !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 6px !important;
                    transition: all 0.2s ease !important;
                    width: 100% !important;
                    box-shadow: 0 4px 15px rgba(230, 30, 43, 0.35) !important;
                }
                .btn-coupang-buy:hover {
                    background: #d01723 !important;
                    transform: translateY(-2px) !important;
                    box-shadow: 0 8px 20px rgba(230, 30, 43, 0.5) !important;
                }
                .btn-b2b-inquiry {
                    background: rgba(43, 138, 62, 0.2) !important;
                    color: #00ff88 !important;
                    border: 1px solid rgba(0, 255, 136, 0.4) !important;
                    padding: 13px 18px !important;
                    border-radius: 12px !important;
                    font-size: 13.5px !important;
                    font-weight: 600 !important;
                    cursor: pointer !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 6px !important;
                    transition: all 0.2s ease !important;
                    width: 100% !important;
                    margin-top: 10px !important;
                }
                .btn-b2b-inquiry:hover {
                    background: rgba(43, 138, 62, 0.35) !important;
                    border-color: #00ff88 !important;
                    transform: translateY(-2px) !important;
                }
            `}} />

            {/* 홈페이지 내부 교구 제품 소개 + 하단 고정 장바구니/바로구매 모달 (화면 하얗게 뜨는 문제 100% 해결) */}
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
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
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
                            maxWidth: '720px',
                            maxHeight: '90vh',
                            backgroundColor: '#121620',
                            border: '1px solid rgba(230, 30, 43, 0.5)',
                            borderRadius: '24px',
                            boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 45px rgba(230, 30, 43, 0.35)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            animation: 'coupangModalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            position: 'relative'
                        }}
                    >
                        {/* 모달 상단 컨트롤 헤더 바 */}
                        <div style={{ 
                            padding: '18px 24px', 
                            backgroundColor: '#181d29', 
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
                                    {activeCoupangProduct.name} - 교구 상세 안내
                                </span>
                            </div>
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

                        {/* 모달 본문: 고화질 교구 이미지 & 스펙 소개 (화면 하얗게 뜸 방지) */}
                        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '30px 28px', backgroundColor: '#0e121a', textAlign: 'center' }}>
                            <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 20px auto', background: '#1c2230', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                                <img 
                                    src={activeCoupangProduct.img} 
                                    alt={activeCoupangProduct.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 12px 25px rgba(0,0,0,0.55))' }} 
                                />
                                <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#2b8a3e', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '3px 9px', borderRadius: '6px' }}>
                                    {activeCoupangProduct.tag}
                                </span>
                            </div>

                            <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>
                                {activeCoupangProduct.name}
                            </h3>
                            <p style={{ color: '#aaa', fontSize: '15px', marginBottom: '24px', lineHeight: '1.6', wordBreak: 'keep-all' }}>
                                {activeCoupangProduct.desc}
                            </p>

                            {/* 별점 & 리뷰 평점 */}
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,193,7,0.12)', border: '1px solid rgba(255,193,7,0.3)', padding: '6px 14px', borderRadius: '20px', color: '#ffc107', fontSize: '13px', fontWeight: 700, marginBottom: '25px' }}>
                                <Star size={15} fill="#ffc107" /> 4.9 / 5.0 (쿠팡 만족도 극찬 구매 후기 보증)
                            </div>

                            {/* 주요 특징 및 혜택 체크리스트 */}
                            <div style={{ background: '#181d29', borderRadius: '18px', padding: '20px 24px', textAlign: 'left', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <ShieldCheck size={17} color="#00ff88" /> 교구 특징 & 쿠팡 혜택
                                </div>
                                {activeCoupangProduct.details.map((detail, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1', fontSize: '14px', fontWeight: 500, marginBottom: idx === activeCoupangProduct.details.length - 1 ? 0 : '10px' }}>
                                        <CheckCircle2 size={16} color="#00ff88" />
                                        <span>{detail}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 모달 하단 고정 장바구니 & 바로구매 액션 바 */}
                        <div style={{
                            padding: '16px 24px',
                            backgroundColor: '#121620',
                            borderTop: '1px solid rgba(230, 30, 43, 0.5)',
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
                                    <div style={{ fontSize: '13px', color: '#ff4d4d', fontWeight: 700 }}>
                                        🚀 {activeCoupangProduct.price}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <button 
                                    onClick={() => goToCoupangCheckout(activeCoupangProduct.coupangUrl)}
                                    style={{ 
                                        background: '#282e3d', 
                                        color: '#e2e8f0', 
                                        border: '1px solid rgba(255,255,255,0.15)', 
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
                                        background: '#e61e2b', 
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
                                    <Truck size={18} /> 바로 구매하기 <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 히어로 헤더 섹션 */}
            <section className="hero-brand hero-brand-sub reveal" style={{ backgroundColor: '#0f1219', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '120px 0 80px 0' }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ textAlign: 'right', position: 'absolute', right: '20px', top: '-10px' }}>
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

                    <span className="coupang-badge-pill">
                        <Truck size={15} /> COUPANG ROCKET SHIPPING OFFICIAL
                    </span>
                    <h1 className="hero-el hero-el-2 reveal soft-reveal" style={{ fontSize: '38px', fontWeight: 900, marginBottom: '16px' }}>
                        검증된 교구, <span>피지컬케어 mall</span>
                    </h1>
                    <p className="hero-el hero-el-3 reveal soft-reveal" style={{ color: '#aaa', fontSize: '16.5px', lineHeight: '1.7', maxWidth: '650px' }}>
                        <strong>전문가가 직접 선별한 웰니스 건강 굿즈</strong><br />
                        쿠팡 로켓배송으로 가장 빠르고 안전하게 파우 교구를 만나보세요.<br />
                        기업 임직원 대량 구매 및 복지 포인트 차감 견적 상담도 지원합니다.
                    </p>
                </div>
            </section>

            {/* 쇼룸 상품 갤러리 섹션 */}
            <section className="floating-gallery reveal" style={{ padding: '80px 0 100px', background: '#0b0c10' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span className="section-tag" style={{ color: '#00ff88' }}>PREMIUM SELECTION</span>
                        <h2 className="section-title reveal" style={{ color: '#fff', fontSize: '30px' }}>
                            FaWW <span>공식 베스트 교구</span>
                        </h2>
                        <p style={{ color: '#888', fontSize: '15px', marginTop: '10px' }}>
                            원하시는 결제 방식을 선택하여 편하게 구매하실 수 있습니다.
                        </p>
                    </div>

                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                        gap: '35px', 
                        maxWidth: '780px', 
                        margin: '0 auto' 
                    }}>
                        {PRODUCTS.map((prod) => (
                            <div key={prod.id} className="product-card-showroom reveal" style={{ opacity: 1, visibility: 'visible' }}>
                                <div style={{ position: 'relative', height: '240px', background: '#1c2230', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ 
                                        position: 'absolute', 
                                        top: '15px', 
                                        left: '15px', 
                                        background: '#2b8a3e', 
                                        color: '#fff', 
                                        fontSize: '11px', 
                                        fontWeight: 800, 
                                        padding: '4px 10px', 
                                        borderRadius: '6px',
                                        letterSpacing: '1px'
                                    }}>
                                        {prod.tag}
                                    </span>
                                    <img 
                                        src={prod.img} 
                                        alt={prod.name} 
                                        style={{ width: '80%', height: '80%', objectFit: 'contain', transition: 'transform 0.3s ease' }} 
                                    />
                                </div>
                                <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                                    <div>
                                        <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>{prod.name}</h3>
                                        <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', marginBottom: '16px' }}>{prod.desc}</p>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#ff4d4d', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <ShoppingBag size={15} /> {prod.price}
                                        </div>
                                        <button 
                                            className="btn-coupang-buy"
                                            onClick={() => openInternalCoupangModal(prod)}
                                        >
                                            <ShoppingBag size={16} /> 교구 상세 소개 & 구매 <ExternalLink size={14} />
                                        </button>
                                        <button 
                                            className="btn-b2b-inquiry"
                                            onClick={() => openModal('modal-proposal')}
                                        >
                                            <Building2 size={15} /> 기업 대량 / 복지포인트 문의
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA 하단 배너 */}
            <section className="cta-footer reveal" style={{ backgroundColor: '#141822', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="container text-center" style={{ padding: '60px 20px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>
                        기업 복지 포인트 연동 및 대량 교구 구매 문의
                    </h2>
                    <p style={{ color: '#aaa', fontSize: '15.5px', marginBottom: '30px', maxWidth: '700px', margin: '0 auto 30px auto', lineHeight: '1.6' }}>
                        임직원 건강 증진을 위한 세금 감면 혜택, 기업 포인트 일괄 결제 및 견적서를 무상으로 빠르게 제공해 드립니다.
                    </p>
                    <button 
                        className="cta-btn-white" 
                        onClick={() => openModal('modal-proposal')}
                        style={{ background: '#2b8a3e', color: '#fff', padding: '16px 40px', borderRadius: '30px', fontSize: '16px', fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px rgba(43, 138, 62, 0.4)' }}
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
