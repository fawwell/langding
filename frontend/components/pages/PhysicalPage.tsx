'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useUI } from '@/context/UIContext';
import Footer from '@/components/layout/Footer';

interface AcademyCourse {
  badge: string;
  title: string;
  desc: string;
}

interface AcademyCategory {
  num: string;
  title: string;
  courses: AcademyCourse[];
}

const ACADEMY_CATEGORIES: AcademyCategory[] = [
  {
    num: '01',
    title: '퍼스널 트레이닝 분야',
    courses: [
      { badge: 'PTS 1, 2급', title: 'Personal Training Specialist', desc: '이론과 실기 능력을 갖춘 전문 퍼스널 트레이너 양성 과정입니다. 운동, 재활, 영양, 세일즈를 종합적으로 다룹니다.' },
      { badge: 'PYTS 전문가 과정', title: 'Personal Yoga Training Specialist', desc: '정통 요가의 본질을 과학적으로 풀어내고 통증 분석 및 체형 교정을 결합한 전문가 과정입니다.' }
    ]
  },
  {
    num: '02',
    title: '교정 및 재활 분야',
    courses: [
      { badge: 'CWT 1, 2급', title: 'Corrective Weight Training', desc: '신체적 문제를 운동을 통해 해결하는 교정운동 전문가 과정입니다. 기능해부학과 생리학을 기반으로 체형 및 동작을 분석합니다.' },
      { badge: 'KSTS 1, 2급', title: 'Korea Sports Taping Specialist', desc: '스포츠 및 생활 체육 현장에서 경기력 향상과 부상 예방을 위해 테이핑 업무를 수행하는 전문가 과정입니다.' },
      { badge: '선수트레이너 1, 2급', title: 'Athletic Trainer', desc: '과학적 근거를 바탕으로 운동선수들의 경기력 향상과 최상의 컨디셔닝을 돕는 프로그램 구성 및 트레이닝 수료 과정입니다.' }
    ]
  },
  {
    num: '03',
    title: '필라테스 및 골프 전문 분야',
    courses: [
      { badge: 'KSMP 1, 2, 3급', title: 'Pilates Instructor', desc: '기구 및 매트 운동을 활용하여 바른 체형을 위한 운동 평가, 상담 및 강사 양성 업무를 수행합니다.' },
      { badge: '골프 컨디셔닝 1, 2, 3급', title: 'MAXQ GOLF PHYSICAL TRAINING INSTITUTE', desc: '골퍼의 경기력 향상과 컨디셔닝을 위한 운동 프로그램을 개발하고 운동역학적 스윙 분석 등을 제공합니다.' }
    ]
  },
  {
    num: '04',
    title: '웰니스 및 맞춤형 관리 분야',
    courses: [
      { badge: '웰니스 코치 1, 2급', title: 'Wellness Coach', desc: '데이터 기반 분석을 통해 개인 맞춤형 처방 시스템을 운용하는 신체 건강 전문가 과정입니다.' },
      { badge: 'PCP 1, 2급', title: 'Physical Care Professionals (피지컬케어관리사)', desc: '직장인의 직무능력 향상을 위해 근무 형태 연구 및 체력/신체 능력 평가 후 맞춤형 솔루션을 제공합니다.' },
      { badge: 'SEP 1, 2급', title: 'Senior Exercise Professionals (노인운동사)', desc: '노인의 신체적 특징에 맞춰 낙상 예방 및 심혈관계 질환 예방을 돕는 안전한 운동 프로그램을 구성합니다.' },
      { badge: '마인드 코칭 1, 2급', title: 'Mind Coaching', desc: '뇌파측정기 등을 활용해 스포츠 선수 및 일반인의 심리 상담과 멘탈 강화를 지도하는 과정입니다.' }
    ]
  }
];

const PhysicalPage = () => {
    const router = useRouter();
    const {
        activePhysicalSub,
        setActivePhysicalSub,
        centerData,
        hoveredCenterId,
        setHoveredCenterId,
        openCenterModal,
        openModal
    } = useUI();

    const openKakaoChat = () => {
        const kakaoChannelId = "_HwxiXn"; 
        window.open(`https://pf.kakao.com/${kakaoChannelId}/chat`, '_blank');
    };

    const showPhysicalGateway = () => {
        setActivePhysicalSub(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <main id="page-physical" className="page-content active">
            <section className="hero-brand hero-brand-sub reveal">
                <video className="hero-video-bg" autoPlay loop muted playsInline>
                    <source src="background2.mp4" type="video/mp4" />
                </video>
                <div className="hero-overlay"></div>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ textAlign: 'left', marginBottom: '20px' }}><span className="back-btn" style={{ color: '#aaa', cursor: 'pointer', fontSize: '14px', border: '1px solid #555', padding: '8px 16px', borderRadius: '20px' }} onClick={() => router.push('/ai')}>← 타겟 선택으로 돌아가기</span></div>
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
                        <div className="gateway-card reveal" onClick={() => router.push('/eap')}>
                            <div className="gateway-bg-text">PC</div>
                            <div className="gateway-icon-box" style={{ fontSize: '14px', fontWeight: 'bold' }}>PC</div>
                            <h3>피지컬케어</h3>
                            <p>기업 임직원을 위한 맞춤형 방문 솔루션. 인간공학적 분석과 1:1 케어를 결합한 독보적 프로그램입니다.</p>
                            <div className="gateway-arrow">→</div>
                        </div>

                        <div className="gateway-card reveal delay-1" onClick={() => setActivePhysicalSub('sub-academy')}>
                            <div className="gateway-bg-text">CL</div>
                            <div className="gateway-icon-box" style={{ fontSize: '14px', fontWeight: 'bold' }}>CL</div>
                            <h3>자격증</h3>
                            <p>FaWW 오리지널 피지컬케어 전문가 양성 과정. 이론부터 실무까지 이어지는 고도화된 교육 커리큘럼.</p>
                            <div className="gateway-arrow">→</div>
                        </div>

                        <div className="gateway-card reveal delay-2" onClick={() => setActivePhysicalSub('sub-center')}>
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
                            {ACADEMY_CATEGORIES.map((cat, idx) => (
                                <div key={idx} className="academy-category reveal">
                                    <h3 className="academy-cat-title"><span>{cat.num}</span> {cat.title}</h3>
                                    <div className="academy-grid">
                                        {cat.courses.map((course, cIdx) => (
                                            <div key={cIdx} className="academy-card">
                                                <div className="ac-badge">{course.badge}</div>
                                                <h4>{course.title}</h4>
                                                <p>{course.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
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
            <Footer />
        </main>
    );
};

export default PhysicalPage;
