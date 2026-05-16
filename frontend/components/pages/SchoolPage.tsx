'use client';

import React from 'react';

interface SchoolPageProps {
    activePage: string;
    switchPage: (page: string) => void;
    openModal: (id: string) => void;
}

const SchoolPage = ({ activePage, switchPage, openModal }: SchoolPageProps) => {
    return (
        <main id="page-school" className={`page-content ${activePage === 'page-school' ? 'active' : ''}`}>
            <section className="hero-premium reveal" style={{ background: "linear-gradient(rgba(0, 30, 20, 0.75), rgba(0, 30, 20, 0.9)), url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop') no-repeat center/cover fixed" }}>
                <div className="container">
                    <div style={{ textAlign: 'left' }}><span className="back-btn" onClick={() => switchPage('page-ai')}>← 타겟 선택으로 돌아가기</span></div>
                    <h1>바른 성장의 시작,<br />FaWW 학생 체형분석 솔루션</h1>
                    <p>학교 현장에 최적화된 프로세스로 우리 아이들의 효율적인 건강관리를 지원합니다.</p>
                    <button className="btn-primary" onClick={() => openModal('modal-proposal')} style={{ fontSize: '18px', padding: '16px 36px', backgroundColor: '#004d40', border: '1px solid #004d40' }}>학교 맞춤 제안서 받기</button>
                </div>
            </section>

            <section className="category-section reveal" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <div className="school-header-wrap" style={{ textAlign: 'center' }}>
                        <span className="section-tag">SCHOOL SOLUTION</span>
                        <h2 className="section-title reveal">우리 아이 바른 성장,<br /><span>FaWW 학생 체형분석</span></h2>
                        <p className="section-desc reveal">성장기 학생들의 체형 데이터를 과학적으로 분석하고, 맞춤형 운동 프로그램을 제공합니다. 학교 현장에 최적화된 프로세스로 효율적인 건강관리를 지원합니다.</p>
                    </div>

                    <div className="school-process-grid">
                        <div className="school-process-card reveal">
                            <span className="school-process-num">01</span>
                            <h3 className="school-process-title">사전 협의</h3>
                            <p className="school-process-desc">학교 환경 분석 및<br />맞춤 프로그램 설계</p>
                        </div>
                        <div className="school-process-card reveal delay-1">
                            <span className="school-process-num">02</span>
                            <h3 className="school-process-title">체형 측정</h3>
                            <p className="school-process-desc">전문 장비를 활용한<br />정밀 체형분석 실시</p>
                        </div>
                        <div className="school-process-card reveal delay-2">
                            <span className="school-process-num">03</span>
                            <h3 className="school-process-title">데이터 분석</h3>
                            <p className="school-process-desc">개인별·학급별<br />건강 데이터 리포트</p>
                        </div>
                        <div className="school-process-card reveal delay-3">
                            <span className="school-process-num">04</span>
                            <h3 className="school-process-title">사후 관리</h3>
                            <p className="school-process-desc">맞춤 운동 처방 및<br />추적 관리 시스템</p>
                        </div>
                    </div>

                    <div className="school-stats reveal">
                        <div className="school-stat-item">
                            <h3>200+</h3>
                            <p>도입 학교 수</p>
                        </div>
                        <div className="school-stat-item">
                            <h3>30만+</h3>
                            <p>학생 분석 데이터</p>
                        </div>
                        <div className="school-stat-item">
                            <h3>97%</h3>
                            <p>학교 재도입률</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="services reveal" style={{ backgroundColor: '#fff', paddingTop: '80px' }}>
                <div className="container">
                    <div className="school-header-wrap" style={{ textAlign: 'center' }}>
                        <span className="section-tag">PROGRAM CATEGORY</span>
                        <h2 className="section-title reveal">학교 맞춤형 <span>핵심 프로그램</span></h2>
                        <p className="section-desc reveal">단순한 검진을 넘어 체계적인 교육과 관리를 동반합니다.</p>
                    </div>
                    <div className="service-grid">
                        <div className="smart-card reveal" onClick={() => openModal('modal1')}>
                            <div className="smart-card-top">
                                <div className="smart-card-img" style={{ 
                                    backgroundImage: "linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.2)), url('/images/gateway/school_dx.png')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}></div>
                                <div className="smart-card-body">
                                    <span className="gateway-badge" style={{ background: '#e0f2f1', color: '#004d40' }}>진단</span>
                                    <h3>스마트 AI 체형분석</h3>
                                    <p>정밀 카메라와 AI 솔루션을 활용해 학생들의 근골격계 상태와 성장 밸런스를 측정하고 평가합니다.</p>
                                </div>
                            </div>
                        </div>
                        <div className="smart-card reveal delay-1" onClick={() => openModal('modal4')}>
                            <div className="smart-card-top">
                                <div className="smart-card-img" style={{ 
                                    backgroundImage: "linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.2)), url('/images/eap/group_exercise.jpg')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}></div>
                                <div className="smart-card-body">
                                    <span className="gateway-badge" style={{ background: '#e8f5e9', color: '#2b8a3e' }}>실습</span>
                                    <h3>그룹 맞춤 운동</h3>
                                    <p>스트레칭 및 자세교정을 위한 기능성 트레이닝. 성장기 학생들에게 꼭 필요한 맞춤형 운동 처방을 제공합니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-footer reveal">
                <div className="container">
                    <h2>FaWW와 함께 스마트한 교육 환경을 구축하세요</h2>
                    <p style={{ marginBottom: '30px' }}>학교 보건 담당자를 위한 학생 체형 데이터 분석 샘플 및 학교 보건 예산 활용 가이드를 무상으로 제공해 드립니다.</p>
                    <button className="cta-btn-white" onClick={() => openModal('modal-proposal')}>학교 맞춤 상담 및 가이드 신청</button>
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

export default SchoolPage;
