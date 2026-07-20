'use client';

import React from 'react';

interface HeroSectionProps {
    openModal: (modalId: string) => void;
}

const HeroSection = ({ openModal }: HeroSectionProps) => {
    return (
        <section className="hero-brand reveal">
            {/* 반응형 & 뷰포트 완벽 피팅 디자인 오버라이드 */}
            <style dangerouslySetInnerHTML={{ __html: `
                .mobile-br {
                    display: none;
                }
                #page-home section.hero-brand,
                .hero-brand {
                    height: 100vh !important;
                    min-height: 650px !important;
                    padding-top: 80px !important;
                    padding-bottom: 40px !important;
                    display: flex !important;
                    flex-direction: column !important;
                    justify-content: center !important;
                    align-items: center !important;
                }
                .hero-stats-wrapper {
                    position: relative !important;
                    bottom: auto !important;
                    top: auto !important;
                    margin-top: 35px !important;
                    width: 100% !important;
                    z-index: 40 !important;
                }
                .hero-stats {
                    padding: 16px 28px !important;
                    margin: 0 auto !important;
                }
                @media (max-width: 1024px) {
                    #page-home section.hero-brand,
                    .hero-brand {
                        height: auto !important;
                        min-height: auto !important;
                        padding-top: 100px !important;
                        padding-bottom: 60px !important;
                    }
                    .hero-subtitle {
                        margin-top: 5px !important;
                        margin-bottom: 20px !important;
                        font-size: 12px !important;
                        padding: 8px 16px !important;
                    }
                    .hero-brand h1 {
                        font-size: 26px !important;
                        line-height: 1.4 !important;
                        word-break: keep-all !important;
                    }
                    .hero-brand p {
                        font-size: 14px !important;
                        line-height: 1.6 !important;
                        word-break: keep-all !important;
                        margin-top: 15px !important;
                    }
                    .hero-buttons {
                        margin-top: 20px !important;
                    }
                    .hero-stats-wrapper {
                        margin-top: 25px !important;
                    }
                }
            `}} />

            <video className="hero-video-bg" autoPlay loop muted playsInline preload="metadata">
                <source src="/background3.mp4" type="video/mp4" />
            </video>
            <div className="hero-overlay"></div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="hero-subtitle hero-el hero-el-1 soft-reveal" style={{ marginBottom: '12px' }}>FaWW : Family Wholesome Wellness</div>
                <h1 className="hero-el hero-el-2 soft-reveal" style={{ marginBottom: '16px' }}>
                    <span className="text-highlight">건강</span>이 함께하는 <span className="text-highlight">회사</span>,<br />
                    <span className="text-highlight">기업복지</span>의 원조는 <span className="text-highlight">FaWW</span>
                </h1>
                <p className="hero-el hero-el-3 soft-reveal" style={{ marginBottom: '25px' }}>
                    <strong style={{ marginBottom: '8px' }}>스마트 AI 체형분석을 활용한 임직원 근골격계 관리</strong>
                    근골격계 유해요인조사 사후관리부터 1:1 케어까지,<br />
                    업계 최초로 산재 예방 시스템을 도입한 <br />
                    피지컬케어 전문가가 함께합니다
                </p>
                <div className="hero-buttons hero-el hero-el-4" style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
                    <button className="btn-primary" onClick={() => openModal('modal-proposal')}>맞춤 솔루션 문의하기</button>
                    <button className="btn-outline" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.5)', padding: '14px 32px', borderRadius: '30px', fontWeight: 'bold' }} onClick={() => openModal('modal-quiz')}>내게 맞는 솔루션 찾기 (퀴즈)</button>
                </div>
            </div>

            <div className="hero-stats-wrapper">
                <div className="hero-stats">
                    <div className="stat-item">
                        <div className="stat-num"><span className="count-up" data-target="12">0</span>년+</div>
                        <div className="stat-label">피지컬케어 도입</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-num"><span className="count-up" data-target="120">0</span>+</div>
                        <div className="stat-label">파트너 기업 및 학교</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-num"><span className="count-up" data-target="99">0</span>%</div>
                        <div className="stat-label">고객 만족도</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-num"><span className="count-up" data-target="20000" data-format="true">0</span>+</div>
                        <div className="stat-label">관리 임직원 수</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
