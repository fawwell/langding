'use client';

import React from 'react';

interface PhysicalPageProps {
    activePage: string;
    activePhysicalSub: string;
    switchPage: (page: string) => void;
    openPhysicalSub: (sub: string) => void;
    showPhysicalGateway: () => void;
    centerData: any[];
    hoveredCenterId: string | null;
    setHoveredCenterId: (id: string | null) => void;
    openCenterModal: (id: string) => void;
    openModal: (id: string) => void;
    openKakaoChat: () => void;
}

const PhysicalPage = ({
    activePage,
    activePhysicalSub,
    switchPage,
    openPhysicalSub,
    showPhysicalGateway,
    centerData,
    hoveredCenterId,
    setHoveredCenterId,
    openCenterModal,
    openModal,
    openKakaoChat
}: PhysicalPageProps) => {
    return (
        <main id="page-physical" className={`page-content ${activePage === 'page-physical' ? 'active' : ''}`}>
            <section className="hero-brand hero-brand-sub reveal">
                <video className="hero-video-bg" autoPlay loop muted playsInline>
                    <source src="background2.mp4" type="video/mp4" />
                </video>
                <div className="hero-overlay"></div>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ textAlign: 'left', marginBottom: '20px' }}><span className="back-btn" style={{ color: '#aaa', cursor: 'pointer', fontSize: '14px', border: '1px solid #555', padding: '8px 16px', borderRadius: '20px' }} onClick={() => switchPage('page-ai')}>← 타겟 선택으로 돌아가기</span></div>
                    <div className="hero-subtitle hero-el hero-el-1">FaWW Physical Care</div>
                    <h1 className="hero-el hero-el-2">현장과 실무를 잇는<br /><span>FaWW 피지컬케어</span></h1>
                    <p className="hero-el hero-el-3">
                        <strong>대한민국 최고 전문가 양성 및 파견</strong><br />
                        기업의 생산성 향상부터 개인의 삶의 질 회복까지,<br />근골격계 전문 관리로 완벽하게 아우릅니다
                    </p>
                </div>
            </section>

            <div id="physical-gateway" className={`container-fluid reveal ${!activePhysicalSub ? 'active' : ''}`} style={{ padding: '10px 0 100px', display: !activePhysicalSub ? 'block' : 'none', backgroundColor: '#f9f9f9' }}>
                <div className="container">
                    <div className="premium-gateway-grid">
                        <div className="gateway-card reveal" onClick={() => switchPage('page-eap')}>
                            <div className="gateway-bg-text">PC</div>
                            <div className="gateway-icon-box" style={{ fontSize: '14px', fontWeight: 'bold' }}>PC</div>
                            <h3>피지컬케어</h3>
                            <p>기업 임직원을 위한 맞춤형 방문 솔루션. 인간공학적 분석과 1:1 케어를 결합한 독보적 프로그램입니다.</p>
                            <div className="gateway-arrow">→</div>
                        </div>

                        <div className="gateway-card reveal delay-1" onClick={() => openPhysicalSub('sub-academy')}>
                            <div className="gateway-bg-text">CL</div>
                            <div className="gateway-icon-box" style={{ fontSize: '14px', fontWeight: 'bold' }}>CL</div>
                            <h3>자격증</h3>
                            <p>FaWW 오리지널 피지컬케어 전문가 양성 과정. 이론부터 실무까지 이어지는 고도화된 교육 커리큘럼.</p>
                            <div className="gateway-arrow">→</div>
                        </div>

                        <div className="gateway-card reveal delay-2" onClick={() => openPhysicalSub('sub-center')}>
                            <div className="gateway-bg-text">CT</div>
                            <div className="gateway-icon-box" style={{ fontSize: '14px', fontWeight: 'bold' }}>CT</div>
                            <h3>센터</h3>
                            <p>가까운 직영 센터에서 만나는 1:1 맞춤형 피지컬케어. 최첨단 장비와 베테랑 전문가의 정밀한 솔루션.</p>
                            <div className="gateway-arrow">→</div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="sub-academy" className={`sub-page-content ${activePhysicalSub === 'sub-academy' ? 'active' : ''}`}>
                <section className="category-section reveal" style={{ backgroundColor: '#f8f9fa', paddingTop: '40px' }}>
                    <div className="container">
                        <div style={{ textAlign: 'left' }}><span className="back-btn-light" onClick={showPhysicalGateway}>← 카테고리 선택으로 돌아가기</span></div>
                        <h2 className="section-title">자격증 교육 (아카데미)</h2>
                        <div className="academy-wrap">
                            <div className="academy-category reveal">
                                <h3 className="academy-cat-title"><span>01</span> 퍼스널 트레이닝 분야</h3>
                                <div className="academy-grid">
                                    <div className="academy-card"><div className="ac-badge">PTS 1, 2급</div><h4>Personal Training Specialist</h4><p>이론과 실기 능력을 갖춘 전문 퍼스널 트레이너 양성 과정입니다. 운동, 재활, 영양, 세일즈를 종합적으로 다룹니다.</p></div>
                                    <div className="academy-card"><div className="ac-badge">PYTS 전문가 과정</div><h4>Personal Yoga Training Specialist</h4><p>정통 요가의 본질을 과학적으로 풀어내고 통증 분석 및 체형 교정을 결합한 전문가 과정입니다.</p></div>
                                </div>
                            </div>
                            <div className="academy-category reveal">
                                <h3 className="academy-cat-title"><span>02</span> 교정 및 재활 분야</h3>
                                <div className="academy-grid">
                                    <div className="academy-card"><div className="ac-badge">CWT 1, 2급</div><h4>Corrective Weight Training</h4><p>신체적 문제를 운동을 통해 해결하는 교정운동 전문가 과정입니다. 기능해부학과 생리학을 기반으로 체형 및 동작을 분석합니다.</p></div>
                                    <div className="academy-card"><div className="ac-badge">KSTS 1, 2급</div><h4>Korea Sports Taping Specialist</h4><p>스포츠 및 생활 체육 현장에서 경기력 향상과 부상 예방을 위해 테이핑 업무를 수행하는 전문가 과정입니다.</p></div>
                                    <div className="academy-card"><div className="ac-badge">선수트레이너 1, 2급</div><h4>Athletic Trainer</h4><p>과학적 근거를 바탕으로 운동선수들의 경기력 향상과 최상의 컨디셔닝을 돕는 프로그램 구성 및 트레이닝 수료 과정입니다.</p></div>
                                </div>
                            </div>
                            <div className="academy-category reveal">
                                <h3 className="academy-cat-title"><span>03</span> 필라테스 및 골프 전문 분야</h3>
                                <div className="academy-grid">
                                    <div className="academy-card"><div className="ac-badge">KSMP 1, 2, 3급</div><h4>Pilates Instructor</h4><p>기구 및 매트 운동을 활용하여 바른 체형을 위한 운동 평가, 상담 및 강사 양성 업무를 수행합니다.</p></div>
                                    <div className="academy-card"><div className="ac-badge">골프 컨디셔닝 1, 2, 3급</div><h4>MAXQ GOLF PHYSICAL TRAINING INSTITUTE</h4><p>골퍼의 경기력 향상과 컨디셔닝을 위한 운동 프로그램을 개발하고 운동역학적 스윙 분석 등을 제공합니다.</p></div>
                                </div>
                            </div>
                            <div className="academy-category reveal">
                                <h3 className="academy-cat-title"><span>04</span> 웰니스 및 맞춤형 관리 분야</h3>
                                <div className="academy-grid">
                                    <div className="academy-card"><div className="ac-badge">웰니스 코치 1, 2급</div><h4>Wellness Coach</h4><p>데이터 기반 분석을 통해 개인 맞춤형 처방 시스템을 운용하는 신체 건강 전문가 과정입니다.</p></div>
                                    <div className="academy-card"><div className="ac-badge">PCP 1, 2급</div><h4>Physical Care Professionals (피지컬케어관리사)</h4><p>직장인의 직무능력 향상을 위해 근무 형태 연구 및 체력/신체 능력 평가 후 맞춤형 솔루션을 제공합니다.</p></div>
                                    <div className="academy-card"><div className="ac-badge">SEP 1, 2급</div><h4>Senior Exercise Professionals (노인운동사)</h4><p>노인의 신체적 특징에 맞춰 낙상 예방 및 심혈관계 질환 예방을 돕는 안전한 운동 프로그램을 구성합니다.</p></div>
                                    <div className="academy-card"><div className="ac-badge">마인드 코칭 1, 2급</div><h4>Mind Coaching</h4><p>뇌파측정기 등을 활용해 스포츠 선수 및 일반인의 심리 상담과 멘탈 강화를 지도하는 과정입니다.</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div id="sub-center" className={`sub-page-content ${activePhysicalSub === 'sub-center' ? 'active' : ''}`}>
                <section className="category-section reveal" style={{ backgroundColor: '#fff', paddingTop: '40px' }}>
                    <div className="container" style={{ maxWidth: '1400px' }}>
                        <div style={{ textAlign: 'left' }}><span className="back-btn-light" onClick={showPhysicalGateway}>← 카테고리 선택으로 돌아가기</span></div>
                        <h2 className="section-title">센터 (로컬) 소개</h2>
                        
                        <div className="center-split-view">
                            <div className="center-list-column grid-vertical">
                                {centerData.length > 0 ? centerData.map((center, idx) => (
                                    <div 
                                        key={center.id} 
                                        className={`center-row-card reveal active ${hoveredCenterId === center.id ? 'highlighted' : ''}`} 
                                        onClick={() => openCenterModal(center.id)}
                                        onMouseEnter={() => setHoveredCenterId(center.id)}
                                        onMouseLeave={() => setHoveredCenterId(null)}
                                    >
                                        <div>
                                            <span className="center-num-badge">CENTER 0{idx + 1}</span>
                                            <h3>{center.name}</h3>
                                        </div>
                                        <div className="card-arrow" style={{ color: '#2b8a3e', fontSize: '24px', opacity: 0.5 }}>→</div>
                                    </div>
                                )) : (
                                    <p style={{ color: '#888', textAlign: 'center' }}>센터 정보를 불러오는 중입니다...</p>
                                )}
                            </div>

                            <div className="center-map-column reveal active">
                                <div className="center-dashboard-wrapper">
                                    {(() => {
                                        const currentCenter = centerData.find(c => c.id === hoveredCenterId) || centerData[0];
                                        if (!currentCenter) return null;
                                        return (
                                            <div className="dashboard-content" key={currentCenter.id}>
                                                <div className="dashboard-header">
                                                    <span className="live-badge">SYSTEM STATUS: OPERATIONAL</span>
                                                    <h2>{currentCenter.name}</h2>
                                                    <p className="dashboard-addr">{currentCenter.address}</p>
                                                </div>
                                                <div style={{ marginBottom: '20px' }}></div>
                                                <div className="programs-section">
                                                    <h4 className="sub-title">CORE PROGRAMS</h4>
                                                    <ul className="program-list">
                                                        {(currentCenter.programs && currentCenter.programs.length > 0) ? (
                                                            currentCenter.programs.map((prog: string, i: number) => (
                                                                <li key={i}>• {prog.trim()}</li>
                                                            ))
                                                        ) : (
                                                            <>
                                                                <li>• 개인별 맞춤형 정밀 체형 분석</li>
                                                                <li>• 근골격계 통증 완화 케어</li>
                                                                <li>• 올바른 자세 회복 및 기능 강화</li>
                                                            </>
                                                        )}
                                                    </ul>
                                                </div>
                                                <div className="equipment-section">
                                                    <h4 className="sub-title">TECHNOLOGY & EQUIPMENT</h4>
                                                    <div className="equipment-tags">
                                                        {(currentCenter.equipments || ['3D AI 스캐너', '정밀 체형 분석기']).map((eq, i) => (
                                                            <span key={i} className="eq-tag">{eq}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="dashboard-footer">
                                                    <button className="dashboard-btn" onClick={() => openCenterModal(currentCenter.id)}>지점 상세 솔루션 보기</button>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="cta-footer reveal">
                <div className="container">
                    <h2>FaWW와 함께 통증 없는 일상을 시작하세요</h2>
                    <p style={{ marginBottom: '30px' }}>내 몸에 딱 맞는 프리미엄 케어 프로그램 상담 및 첫 방문 혜택 가이드를 무상으로 제공해 드립니다.</p>
                    <button className="cta-btn-white" onClick={openKakaoChat}>실시간 프로그램 상담하기</button>
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

export default PhysicalPage;
