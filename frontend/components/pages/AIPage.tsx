'use client';

import React from 'react';

interface AIPageProps {
    activePage: string;
    switchPage: (page: string) => void;
    openPhysicalSub: (sub: string) => void;
    openModal: (id: string) => void;
}

const AIPage = ({ activePage, switchPage, openPhysicalSub, openModal }: AIPageProps) => {
    return (
        <main id="page-ai" className={`page-content ${activePage === 'page-ai' ? 'active' : ''}`}>
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
                        <div className="gateway-panel" onClick={() => switchPage('page-eap')}>
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
                        <div className="gateway-panel" onClick={() => switchPage('page-school')}>
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
                        <div className="gateway-panel" onClick={() => { switchPage('page-physical'); openPhysicalSub('sub-center'); }}>
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

export default AIPage;
