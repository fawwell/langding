'use client';

import React from 'react';
import { useUI } from '@/context/UIContext';
import Footer from '@/components/layout/Footer';
import { ShoppingBag, Truck, Building2, ExternalLink, X, ShieldCheck, CheckCircle2 } from 'lucide-react';

const PRODUCTS = [
    {
        id: 'blackterra',
        name: '블랙테라',
        tag: 'BEST',
        desc: '전문가용 프리미엄 온열 마사지 케어 툴',
        price: '쿠팡 로켓배송 특가',
        img: '/images/mall/blackterra.png',
        coupangUrl: 'https://www.coupang.com/vp/products/7281228718?itemId=18590265091&searchId=5ce4eabb056e45e6a10388d231097659&sourceType=brandstore_sdp_atf-baseline_list&storeId=111499&subSourceType=brandstore_sdp_atf-baseline_list&vendorId=A00920407&vendorItemId=85726579068',
    },
    {
        id: 'strap3d',
        name: '3D 스트랩',
        tag: 'HOT',
        desc: '정밀 측정이 가능한 IT 융합 스트랩',
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

            {/* 홈페이지 내부 쿠팡 뷰어 모달 */}
            {activeCoupangProduct && (
                <div 
                    onClick={() => setActiveCoupangProduct(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.82)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                >
                    <div 
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: '100%',
                            maxWidth: '600px',
                            backgroundColor: '#121620',
                            border: '1px solid rgba(230, 30, 43, 0.5)',
                            borderRadius: '28px',
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
                                    {activeCoupangProduct.name} 로켓배송
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
                                    justifyContent: 'center',
                                    transition: 'background 0.2s ease'
                                }}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* 내장 상세 카드 콘텐츠 (Access Denied 방지용 보안 프리뷰) */}
                        <div style={{ padding: '35px 30px', textAlign: 'center', backgroundColor: '#0e121a' }}>
                            <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 24px auto', background: '#1c2230', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px' }}>
                                <img 
                                    src={activeCoupangProduct.img} 
                                    alt={activeCoupangProduct.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }} 
                                />
                                <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#2b8a3e', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                                    {activeCoupangProduct.tag}
                                </span>
                            </div>

                            <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>
                                {activeCoupangProduct.name}
                            </h3>
                            <p style={{ color: '#aaa', fontSize: '14.5px', marginBottom: '24px', lineHeight: '1.6', wordBreak: 'keep-all' }}>
                                {activeCoupangProduct.desc}
                            </p>

                            <div style={{ background: '#181d29', borderRadius: '16px', padding: '16px 20px', marginBottom: '30px', textAlign: 'left', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00ff88', fontSize: '13.5px', fontWeight: 700, marginBottom: '8px' }}>
                                    <CheckCircle2 size={16} /> 쿠팡 로켓배송 혜택 그대로 적용
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '13.5px', fontWeight: 500, marginBottom: '8px' }}>
                                    <ShieldCheck size={16} /> FaWW 100% 공식 정품 보증
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '13.5px', fontWeight: 500 }}>
                                    <Truck size={16} /> 와우 회원 무료 배송 및 빠른 익일 수령
                                </div>
                            </div>
                            
                            <a 
                                href={activeCoupangProduct.coupangUrl} 
                                target="_blank" 
                                rel="noreferrer"
                                onClick={() => setActiveCoupangProduct(null)}
                                style={{ 
                                    background: '#e61e2b', 
                                    color: '#fff', 
                                    padding: '18px 36px', 
                                    borderRadius: '16px', 
                                    fontSize: '16.5px', 
                                    fontWeight: 900, 
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    boxShadow: '0 10px 30px rgba(230, 30, 43, 0.45)',
                                    width: '100%'
                                }}
                            >
                                <Truck size={20} /> 쿠팡 결제 페이지로 이동하기 <ExternalLink size={17} />
                            </a>
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
                                            <Truck size={16} /> 쿠팡 로켓배송 구매 <ExternalLink size={14} />
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
