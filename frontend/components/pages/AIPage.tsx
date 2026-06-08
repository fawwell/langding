'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useUI } from '@/context/UIContext';

const AIPage = () => {
    const router = useRouter();
    const { openModal } = useUI();

    return (
        <main id="page-ai" className="page-content active">
            <section className="hero-brand hero-brand-sub reveal">
                <video className="hero-video-bg" autoPlay loop muted playsInline>
                    <source src="background.mp4" type="video/mp4" />
                </video>
                <div className="hero-overlay"></div>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="hero-subtitle hero-el hero-el-1">AI Scanning</div>
                    <h1 className="hero-el hero-el-2">데이터로 증명하는 <span>스마트 AI 체형분석</span></h1>
                    <p className="hero-el hero-el-3">
                        <strong>기업, 학교를 위한 정확한 진단</strong><br />
                        기업의 건강과 안전부터 학생들의 바른 성장까지,<br />가장 정확한 진단 및 솔루션을 제공합니다
                    </p>
                </div>
            </section>

            <section className="category-section reveal" style={{ padding: '20px 0 80px 0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="gateway-panels-container" style={{ marginTop: '20px' }}>
                        {/* 기업용 패널 */}
                        <div className="gateway-panel" onClick={() => router.push('/eap')}>
                            <div className="panel-bg" style={{ backgroundImage: 'url("/images/gateway/corporate_dx.png")' }}></div>
                            <div className="panel-overlay"></div>
                            <div className="panel-content">
                                 <span className="panel-icon-text">CORP</span>
                                 <h3 className="panel-title">기업용 DX</h3>
                                 <p className="panel-desc">임직원 근골격계 질환 예방 및 업무 효율 증대를 위한 솔루션입니다.</p>
                                 <span className="panel-btn">자세히 보기</span>
                            </div>
                        </div>

                        {/* 학교용 패널 */}
                        <div className="gateway-panel" onClick={() => router.push('/school')}>
                            <div className="panel-bg" style={{ backgroundImage: 'url("/images/gateway/school_dx.png")' }}></div>
                            <div className="panel-overlay"></div>
                            <div className="panel-content">
                                <span className="panel-icon-text">EDU</span>
                                <h3 className="panel-title">학교용 DX</h3>
                                <p className="panel-desc">성장기 학생들의 체형 검진과 맞춤형 리포트를 제공합니다.</p>
                                <span className="panel-btn">자세히 보기</span>
                            </div>
                        </div>

                        {/* 개인용 패널 */}
                        <div className="gateway-panel" onClick={() => router.push('/physical?sub=center')}>
                            <div className="panel-bg" style={{ backgroundImage: 'url("/images/gateway/individual_dx.png")' }}></div>
                            <div className="panel-overlay"></div>
                            <div className="panel-content">
                                <span className="panel-icon-text">USER</span>
                                <h3 className="panel-title">개인용 DX</h3>
                                <p className="panel-desc">1:1 정밀 분석과 맞춤형 피지컬케어 솔루션을 경험하세요.</p>
                                <span className="panel-btn">자세히 보기</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="cta-footer reveal">
                <div className="container">
                    <h2>FaWW와 함께 피지컬 케어의 미래를 경험하세요</h2>
                    <p style={{ marginBottom: '30px' }}>개인 및 기업을 위한 맞춤형 솔루션 가이드 및 브랜드 소개서를 무상으로 제공해 드립니다.</p>
                    <button className="cta-btn-white" onClick={() => openModal('modal-proposal')}>통합 가이드 신청하기</button>
                </div>
            </section>
        </main>
    );
};

export default AIPage;
