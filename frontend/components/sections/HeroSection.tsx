'use client';

import React from 'react';

interface HeroSectionProps {
    openModal: (modalId: string) => void;
}

const HeroSection = ({ openModal }: HeroSectionProps) => {
    return (
        <section className="hero-brand reveal">
            <video className="hero-video-bg" autoPlay loop muted playsInline>
                <source src="background3.mp4" type="video/mp4" />
            </video>
            <div className="hero-overlay"></div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="hero-subtitle hero-el hero-el-1 soft-reveal">FaWW : Family Wholesome Wellness</div>
                <h1 className="hero-el hero-el-2 soft-reveal">
                    <span className="text-highlight">건강</span>이 함께하는 <span className="text-highlight">회사</span>,<br />
                    <span className="text-highlight">기업복지</span>의 원조는 <span className="text-highlight">FaWW</span>
                </h1>
                <p className="hero-el hero-el-3 soft-reveal">
                    <strong>스마트 AI를 활용한 맞춤형 케어프로그램</strong><br />
                    근골격계 질환, 1:1 케어 프로그램을 통한 산재 예방 시스템을<br />업계 최초로 도입한 피지컬케어 전문가가 함께합니다
                </p>
                <div className="hero-buttons hero-el hero-el-4" style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '30px' }}>
                    <button className="btn-primary" onClick={() => openModal('modal-proposal')}>맞춤 솔루션 문의하기</button>
                    <button className="btn-outline" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.5)', padding: '16px 36px', borderRadius: '30px', fontWeight: 'bold' }} onClick={() => openModal('modal-quiz')}>내게 맞는 솔루션 찾기 (퀴즈)</button>
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
