'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useUI } from '@/context/UIContext';
import Footer from '@/components/layout/Footer';

// FAQ 데이터 외부 분리
const FAQ_DATA = [
    { q: "우리 회사는 인원이 많은데, 하루에 몇 명이나 케어를 받을 수 있나요?", a: "투입되는 전문가 인원에 따라 유연하게 운영됩니다. 보통 전문가 1인당 하루(8시간 기준) 약 6~10명의 1:1 집중 케어가 가능하며, 단체 운동이나 강의 프로그램과 병행할 경우 하루 수백 명까지 참여 인원을 확대할 수 있습니다." },
    { q: "사내에 별도의 공간이 필요한가요? 공간이 협소해도 진행이 가능한지 궁금합니다.", a: "네, 회의실이나 휴게실 정도의 유휴 공간만 있으면 충분합니다. 1:1 케어에 필요한 이동식 베드와 AI 체형 분석 장비는 저희가 직접 지참하며, 공간 크기에 맞춰 최적화된 동선으로 세팅해 드립니다." },
    { q: "서비스 이용 예약은 어떤 방식으로 이루어지나요? 인사팀에서 일일이 명단을 취합해야 하나요?", a: "담당자님의 업무 부담을 줄이기 위해 자체 온라인 예약 시스템을 제공합니다. 임직원이 직접 원하는 시간에 접속해 예약하고 알림톡을 받을 수 있어, 별도의 명단 관리 없이 최종 확정 리스트만 확인하시면 됩니다." },
    { q: "'스마트 AI 체형분석' 결과 리포트는 개인에게 별도로 제공되나요?", a: "네, 분석 즉시 모바일 리포트가 개별 전송됩니다. 현재 나의 불균형 상태, 위험도 점수, 그리고 일상에서 실천할 수 있는 맞춤형 운동 처방이 포함되어 있어 구성원들의 만족도가 매우 높습니다." },
    { q: "1:1 케어에서 진행되는 'MCT'나 '근막이완'이 통증 완화에 즉각적인 효과가 있나요?", a: "단순 마사지가 아닌 근막 이완(MCT)과 기능적 가동술을 결합한 전문 테라피입니다. 업무 중 발생하는 목, 어깨, 허리의 급성 통증과 근육 긴장을 즉각적으로 해소하여 업무 효율을 높이는 데 중점을 둡니다." },
    { q: "우리 직무 특성(예: 장시간 서 있는 업무)에 맞춘 커스터마이징이 가능한가요?", a: "물론입니다. 사전 상담을 통해 해당 기업의 주된 업무 환경(데스크 워크, 현장직 등)을 분석하고, 그에 가장 빈번하게 발생하는 근골격계 질환 위주로 강의와 케어 루틴을 재구성하여 진행합니다." },
    { q: "4가지 파트를 반드시 패키지로 도입해야 하나요? 필요한 파트만 선택할 수 있나요?", a: "전 사원 대상인 '강의'와 '진단'만 선택하시거나, 고위험군을 위한 '1:1 케어'만 집중 운영하는 등 기업의 예산과 필요에 따라 자유롭게 조합하여 설계할 수 있습니다." },
    { q: "서비스 도입 후 임직원 만족도 조사나 결과 보고서를 제공해 주시나요?", a: "네, 프로그램 종료 후 참여도, 만족도 조사 결과, AI 분석 데이터 통계(익명 처리)를 포함한 성과 결과 보고서를 제공합니다. 이는 인사팀의 KPI 달성 증빙 및 차기 복지 예산 확보 자료로 활용하실 수 있습니다." },
    { q: "AI 체형 분석 시 수집되는 개인정보나 신체 데이터는 어떻게 관리되나요?", a: "수집된 모든 데이터는 암호화되어 안전하게 관리되며, 개인정보보호법을 준수합니다. 기업 측에는 개인의 세부 정보가 아닌 조직 전체의 건강 통계 지표만 제공되므로 안심하셔도 됩니다." }
];

// EAP 전용 스타일 외부 분리
const EAP_PAGE_STYLES = `
    .keyword-badge-pill {
        font-size: 13px;
        padding: 6px 14px;
        border-radius: 30px;
        background: rgba(255, 255, 255, 0.05);
        color: #bbb;
        border: 1px solid rgba(255, 255, 255, 0.1);
        font-weight: 500;
        letter-spacing: -0.3px;
        display: inline-block;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: default;
    }
    .keyword-badge-pill:hover {
        background: rgba(43, 138, 62, 0.15) !important;
        border-color: #2b8a3e !important;
        color: #2b8a3e !important;
        transform: translateY(-2px);
    }
    .stat-card-premium {
        background: #ffffff;
        padding: 40px 30px;
        border-radius: 16px;
        border: 1px solid #f1f3f5;
        box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        text-align: center;
    }
    .stat-card-premium:hover {
        transform: translateY(-6px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        border-color: rgba(43, 138, 62, 0.2);
    }
    .partner-card-premium {
        background: #ffffff;
        padding: 30px 25px;
        border-radius: 12px;
        border: 1px solid #eef0f2;
        box-shadow: 0 4px 15px rgba(0,0,0,0.01);
        transition: all 0.3s ease;
    }
    .partner-card-premium:hover {
        box-shadow: 0 10px 25px rgba(0,0,0,0.04);
        border-color: rgba(43, 138, 62, 0.3);
    }
    .partner-text-bullet {
        color: #444;
        font-size: 14px;
        line-height: 2.1;
        margin: 0;
        padding: 0;
        list-style: none;
        text-align: left;
        display: inline-block;
    }
    .partner-text-bullet li {
        position: relative;
        padding-left: 18px;
        margin-bottom: 8px;
        font-weight: 500;
        color: #495057;
    }
    .partner-text-bullet li::before {
        content: "•";
        color: #2b8a3e;
        font-weight: bold;
        position: absolute;
        left: 2px;
        top: 0;
        font-size: 16px;
    }
    #page-eap section {
        padding: 180px 0 !important;
    }
    @media (max-width: 1024px) {
        #page-eap section {
            padding: 80px 0 !important;
        }
    }
    @media (max-width: 768px) {
        #page-eap section {
            padding: 50px 0 !important;
        }
    }
`;

const EAPPage = () => {
    const router = useRouter();
    const { openModal } = useUI();
    const [flippedCardIdx, setFlippedCardIdx] = React.useState<number | null>(null);

    const toggleFaq = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.classList.toggle('open');
    };

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQ_DATA.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };

    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "FaWW EAP 임직원 근골격계 관리 솔루션",
        "description": "AI 체형분석 기업복지 및 근골격계 유해요인조사 사후관리 통합 서비스. 임직원 근골격계 관리를 위한 전문 피지컬케어 프로그램을 제공합니다.",
        "serviceType": ["임직원 근골격계 관리", "근골격계 유해요인조사 사후관리", "AI 체형분석 기업복지"],
        "provider": {
            "@type": "Organization",
            "name": "FaWW",
            "url": "https://www.faww.co.kr"
        }
    };

    return (
        <main id="page-eap" className="page-content active">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />

            <style dangerouslySetInnerHTML={{ __html: EAP_PAGE_STYLES }} />

            <section className="hero-brand hero-brand-sub hero-premium reveal">
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ textAlign: 'left', marginBottom: '20px' }}><span className="back-btn" style={{ color: '#aaa', cursor: 'pointer', fontSize: '14px', border: '1px solid #555', padding: '8px 16px', borderRadius: '20px' }} onClick={() => router.push('/ai')}>← 타겟 선택으로 돌아가기</span></div>

                    <div className="hero-subtitle hero-el hero-el-1">FaWW EAP Solution</div>
                    <h1 className="hero-el hero-el-2"><span>건강이 함께하는 회사</span>,<br />기업복지의 원조는 <span>FaWW</span></h1>
                    
                    <p className="hero-el hero-el-3" style={{ maxWidth: '750px', lineHeight: '1.7', margin: '0 auto 20px auto' }}>
                        <strong>AI 빅데이터 기반의 피지컬케어 솔루션</strong><br />
                        임직원의 신체 불균형과 근골격계 위험도를 데이터로 정밀 측정하여<br />
                        생산성을 향상하고 활력을 증진시키는 맞춤형 기업 복지 프로그램을 제공합니다.
                    </p>

                    <div className="hero-el hero-el-4" style={{ 
                        display: 'flex', 
                        gap: '8px 10px', 
                        flexWrap: 'wrap', 
                        justifyContent: 'center',
                        marginTop: '15px', 
                        marginBottom: '35px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        maxWidth: '850px'
                    }}>
                        {[
                            '#기업건강복지', '#임직원EAP', '#근골격계유해요인조사', '#사내출장통증관리',
                            '#오피스스트레칭', '#거북목교정복지', '#직원번아웃케어', '#ESG경영복지지표'
                        ].map((tag, idx) => (
                            <span key={idx} className="keyword-badge-pill">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="hero-buttons hero-el hero-el-5" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', margin: '0 auto' }}>
                        <button className="btn-primary" onClick={() => openModal('modal-proposal')}>우리 회사 맞춤 제안서 받기</button>
                    </div>
                </div>
            </section>

            <section className="b2b-stats-section reveal" style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #eef0f2', borderBottom: '1px solid #eef0f2' }}>
                <div className="container text-center">
                    <div className="school-header-wrap" style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span className="section-tag" style={{ color: '#2b8a3e' }}>PERFORMANCE METRICS</span>
                        <h2 className="section-title reveal" style={{ color: '#111' }}>숫자로 증명하는 <span>압도적 신뢰</span></h2>
                        <p className="section-desc" style={{ color: '#666' }}>수많은 대기업과 공공기관이 FaWW를 선택한 이유입니다.</p>
                    </div>
                    
                    <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '35px', maxWidth: '1000px', margin: '0 auto' }}>
                        <div className="stat-card-premium reveal">
                            <h3 style={{ fontSize: '16px', color: '#495057', marginBottom: '15px', fontWeight: '600', letterSpacing: '-0.3px' }}>임직원 프로그램 만족도</h3>
                            <div style={{ fontSize: '56px', fontWeight: '900', color: '#2b8a3e', display: 'flex', alignItems: 'baseline', justifyContent: 'center', fontFamily: 'Outfit, sans-serif' }}>
                                <span className="count-up" data-target="99">0</span>
                                <span style={{ fontSize: '28px', marginLeft: '2px', fontWeight: '700' }}>%</span>
                            </div>
                            <p style={{ fontSize: '14px', color: '#868e96', marginTop: '15px', fontWeight: '500' }}>도입 기업 임직원 만족도 99% 달성</p>
                        </div>
                        <div className="stat-card-premium reveal delay-1">
                            <h3 style={{ fontSize: '16px', color: '#495057', marginBottom: '15px', fontWeight: '600', letterSpacing: '-0.3px' }}>누적 관리 임직원</h3>
                            <div style={{ fontSize: '56px', fontWeight: '900', color: '#2b8a3e', display: 'flex', alignItems: 'baseline', justifyContent: 'center', fontFamily: 'Outfit, sans-serif' }}>
                                <span className="count-up" data-target="20000" data-format="true">0</span>
                                <span style={{ fontSize: '28px', marginLeft: '2px', fontWeight: '700' }}>명+</span>
                            </div>
                            <p style={{ fontSize: '14px', color: '#868e96', marginTop: '15px', fontWeight: '500' }}>누적 관리 임직원 20,000명 이상</p>
                        </div>
                        <div className="stat-card-premium reveal delay-2">
                            <h3 style={{ fontSize: '16px', color: '#495057', marginBottom: '15px', fontWeight: '600', letterSpacing: '-0.3px' }}>증빙 및 리포트</h3>
                            <div style={{ fontSize: '20px', fontWeight: '800', color: '#2b8a3e', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px', lineHeight: '1.5', letterSpacing: '-0.5px' }}>
                                케어 후 통증 개선 및<br />업무 집중도 향상 지표 리포트 제공
                            </div>
                            <p style={{ fontSize: '14px', color: '#868e96', marginTop: '15px', fontWeight: '500' }}>인사평가 및 산업안전보건 증빙 가능</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="compliance-wrap reveal">
                <div className="container">
                    <div className="school-header-wrap" style={{ textAlign: 'center' }}>
                        <span className="section-tag">LEGAL COMPLIANCE</span>
                        <h2 className="section-title reveal">산업안전보건법 제39조,<br /><span>선택이 아닌 필수</span>입니다</h2>
                        <p className="section-desc reveal">
                            의무 사항인 <strong>#근골격계유해요인조사</strong> 미실시 시 발생하는 리스크, <strong>#임직원EAP</strong> 전문 기업 FaWW가 완벽히 해결해 드립니다.
                        </p>
                    </div>

                    <div className="risk-info-grid">
                        <div className="risk-info-card reveal">
                            <span className="law">산업안전보건법 제168조</span>
                            <h4>유해요인조사 미실시</h4>
                            <p className="penalty"><span>NOTICE</span> 5년 이하의 징역 또는 5,000만 원 이하의 벌금</p>
                        </div>
                        <div className="risk-info-card reveal delay-1">
                            <span className="law">산업안전보건법 제39조</span>
                            <h4>보건조치 미이행</h4>
                            <p className="penalty"><span>NOTICE</span> 위반 시 벌칙 상동<br />(산재 발생 시 중대재해처벌법 연계 리스크)</p>
                        </div>
                    </div>

                    <div className="school-header-wrap" style={{ textAlign: 'center', marginTop: '100px' }}>
                        <span className="section-tag">RISK FACTORS</span>
                        <h2 className="section-title reveal">근골격계 부담작업 <span>11가지 유형</span></h2>
                        <p className="section-desc reveal">하나라도 해당된다면, 법적 의무 조사 대상입니다.</p>
                    </div>

                    <div className="risk-grid-11">
                        {[
                            { num: '01', title: '하루 4시간 이상 키보드·마우스 조작', desc: '손목터널증후군 및 VDT 증후군 위험, 손목·손가락 만성 통증' },
                            { num: '02', title: '하루 2시간 이상 반복적 팔/손목 동작', desc: '테니스 엘보 및 건초염 유발, 팔꿈치 주변 인대 손상' },
                            { num: '03', title: '하루 2시간 이상 어깨 위 작업', desc: '회전근개 파열 및 석회성 건염 위험, 어깨 가동 범위 제한' },
                            { num: '04', title: '하루 2시간 이상 목·허리 굴곡/트위스트', desc: '디스크 탈출증 및 거북목 가속화, 척추 신경 압박' },
                            { num: '05', title: '하루 2시간 이상 쪼그려 앉기/무릎 굽히기', desc: '퇴행성 관절염 및 반월상 연골판 파열, 무릎 관절 변형' },
                            { num: '06', title: '하루 2시간 이상 1kg 이상 물체 쥐기', desc: '방아쇠 수지 및 손가락 관절염, 악력 저하 및 신경 손상' },
                            { num: '07', title: '하루 10회 이상 25kg 이상 물체 들기', desc: '급성 요추 염좌 및 척추 압박 골절, 탈장 위험성 증가' },
                            { num: '08', title: '하루 25회 이상 10kg 이상 반복 들기', desc: '만성 요통 및 근막통증증후군, 허리 근육 피로 누적' },
                            { num: '09', title: '하루 2시간 이상 신체 특정 부위 충격', desc: '미세 골절 및 연부조직 손상, 만성 염증 및 신경 마비' },
                            { num: '10', title: '하루 2시간 이상 진동 공구 사용', desc: '진동 증후군(백색 수지), 말초 혈관 및 신경 장애' },
                            { num: '11', title: '그 외 인체에 과도한 부담을 주는 작업', desc: '전신 근골격계 피로 누적, 원인 불명의 만성 통증 체계' }
                        ].map((item, idx) => (
                            <div 
                                key={idx} 
                                className={`risk-reveal-wrapper reveal delay-${idx % 4 + 1} has-reveal ${flippedCardIdx === idx ? 'flipped' : ''}`}
                                onClick={() => setFlippedCardIdx(flippedCardIdx === idx ? null : idx)}
                            >
                                <div className="risk-type-card">
                                    <div className="card-front">
                                        <span className="risk-type-num">TYPE {item.num}</span>
                                        <h4 className="risk-type-title">{item.title}</h4>
                                    </div>
                                    <div className="card-back">
                                        <span className="impact-label">HEALTH IMPACT</span>
                                        <p className="impact-desc">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="category-section reveal" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <div className="school-header-wrap" style={{ textAlign: 'center' }}>
                        <span className="section-tag reveal delay-1">CORE PROGRAMS</span>
                        <h2 className="section-title reveal delay-2">우리 기업 맞춤형 <span>FaWW 프로그램</span></h2>
                        <p className="section-desc reveal delay-3">
                            체형 정밀 분석부터 <strong>#사내출장통증관리</strong>, <strong>#오피스스트레칭</strong>, <strong>#거북목교정복지</strong> 및 <strong>#직원번아웃케어</strong>까지 인사담당자와 임직원을 모두 만족시키는 프로그램입니다.
                        </p>
                    </div>
                    
                    <div className="service-grid grid-2x2">
                        {[
                            { id: 'modal1', tag: '진단', title: '스마트 AI 체형분석', desc: '3D 스캐닝을 통해 임직원의 신체 불균형과 근골격계 위험도를 정밀 측정합니다.', img: '/images/eap/ai_scanning.webp', color: '#e3f2fd', text: '#1565c0', hashtags: ['#3D스캔', '#불균형측정', '#근골격계케어'] },
                            { id: 'modal2', tag: '케어', title: '1:1 맞춤 피지컬케어', desc: '전문가가 직접 파견되어 통증 부위를 즉각적으로 관리하고 이완하는 시그니처 프로그램입니다.', img: '/images/eap/manual_care.webp', color: '#e8f5e9', text: '#2b8a3e', hashtags: ['#통증완화', '#직접파견', '#1:1시그니처'] },
                            { id: 'modal4', tag: '실습', title: '단체 운동 프로그램', desc: '오피스 스트레칭, 소도구 운동 등 현장에서 바로 실천 가능한 기능성 트레이닝을 진행합니다.', img: '/images/eap/group_exercise.webp', color: '#fff3e0', text: '#e65100', hashtags: ['#오피스스트레칭', '#기능성트레이닝', '#활력증진'] },
                            { id: 'modal3', tag: '강의', title: '건강 복지 특강', desc: '직무별 맞춤 질환 예방 교육 및 올바른 생활 습관 가이드를 전문가의 강연으로 제공합니다.', img: '/images/eap/lecture.webp', color: '#e3f2fd', text: '#1565c0', hashtags: ['#직무별예방교육', '#전문가강연', '#올바른습관'] }
                        ].map((s, i) => (
                            <div key={i} className={`smart-card reveal delay-${i + 4}`} onClick={() => openModal(s.id)}>
                                <div className="smart-card-top">
                                    <div className="smart-card-img" style={{ 
                                        backgroundImage: `linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.2)), url('${s.img}')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}></div>
                                    <div className="smart-card-body">
                                        <span className="gateway-badge" style={{ background: s.color, color: s.text }}>{s.tag}</span>
                                        <h3>{s.title}</h3>
                                        <p>{s.desc}</p>
                                        <div className="smart-card-hashtags" style={{ marginTop: '15px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            {s.hashtags.map((tag, ti) => (
                                                <span key={ti} style={{ fontSize: '13px', color: '#868e96', fontWeight: '500', opacity: 0.8 }}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="services reveal" style={{ backgroundColor: '#fff' }}>
                <div className="container">
                    <div className="school-header-wrap" style={{ textAlign: 'center' }}>
                        <span className="section-tag">DIFFERENTIATION</span>
                        <h2 className="section-title reveal">왜 <span>FaWW</span>여야만 하는가?</h2>
                        <p className="section-desc reveal">단순 서류 대행을 넘어 실질적인 사후 관리 솔루션을 제공합니다.</p>
                    </div>

                    <div className="comparison-container">
                        <div className="comp-box others reveal">
                            <h3>일반 안전보건 기관</h3>
                            <ul className="comp-list">
                                <li><span className="comp-icon">—</span> 단순 서류 작업 및 제본 위주</li>
                                <li><span className="comp-icon">—</span> 일회성 조사 및 결과 통보</li>
                                <li><span className="comp-icon">—</span> 아날로그식 수기 조사 (시간 소요)</li>
                                <li><span className="comp-icon">—</span> 개선 대책의 실효성 부족</li>
                            </ul>
                        </div>
                        <div className="comp-box faww reveal delay-1">
                            <h3>FaWW Professional</h3>
                            <ul className="comp-list">
                                <li><span className="comp-icon">✓</span> 인간공학적 분석 + 실질적 개선 대책</li>
                                <li><span className="comp-icon">✓</span> 즉각적인 1:1 피지컬케어 사후 관리</li>
                                <li><span className="comp-icon">✓</span> 웹/모바일 기반 신속한 증상 조사</li>
                                <li><span className="comp-icon">✓</span> AI 빅데이터 기반의 정밀 분석 리포트</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="budget-section reveal">
                <div className="container">
                    <div className="school-header-wrap" style={{ textAlign: 'center' }}>
                        <span className="section-tag reveal delay-1">BUDGET STRATEGY</span>
                        <h2 className="section-title reveal delay-2" style={{ color: '#fff' }}>기업 예산 집행, <span>스마트하게 해결</span>하세요</h2>
                        <p className="section-desc reveal delay-3" style={{ color: 'rgba(255,255,255,0.6)' }}>행정 편의와 지역 상생, 두 마리 토끼를 동시에 잡는 FaWW만의 결제 솔루션</p>
                    </div>

                    <div className="pay-logo-group reveal delay-4">
                        <div className="pay-logo-item reveal delay-5">
                            <span className="pay-name">서울페이 (Seoul Pay)</span>
                        </div>
                        <div className="pay-logo-item reveal delay-6">
                            <span className="pay-name">경기페이 (Gyeonggi Pay)</span>
                        </div>
                    </div>

                    <div className="esg-score-box">
                        💡 시설관리공단 등 공공기관의 실제 집행 모델 도입!<br />
                        지역 상권 상생 기여를 통한 ESG 경영 평가 점수 확보에 절대적으로 유리합니다.
                    </div>
                </div>
            </section>

            <section className="b2b-partners-section reveal" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #eef0f2' }}>
                <div className="container">
                    <div className="school-header-wrap" style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span className="section-tag">TRUSTED BY PARTNERS</span>
                        <h2 className="section-title reveal"><span>120개 이상의 기관/기업</span>이 검증한 솔루션</h2>
                        <p className="section-desc" style={{ color: '#666' }}>공공기관부터 대기업, 스타트업까지 수많은 파트너사들이 파우(FaWW)와 함께하고 있습니다.</p>
                    </div>

                    <div className="partner-text-grid" style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                        gap: '30px', 
                        maxWidth: '1000px', 
                        margin: '0 auto',
                        justifyContent: 'center'
                    }}>
                        <div className="partner-card-premium">
                            <h4 style={{ color: '#2b8a3e', fontSize: '16px', marginBottom: '20px', fontWeight: '700', letterSpacing: '-0.3px', borderBottom: '2px solid rgba(43, 138, 62, 0.1)', paddingBottom: '10px' }}>
                                🏛️ 공공기관 / 국가 공기업
                            </h4>
                            <ul className="partner-text-bullet">
                                <li>한국환경산업기술원</li>
                                <li>한국치산기술협회</li>
                                <li>한국재정정보원</li>
                                <li>국민건강보험공단 / 근로복지공단</li>
                                <li>우체국금융개발원 / 우편사업진흥원</li>
                                <li>부산가정법원 / 수원지방법원 안산지원</li>
                            </ul>
                        </div>
                        <div className="partner-card-premium">
                            <h4 style={{ color: '#2b8a3e', fontSize: '16px', marginBottom: '20px', fontWeight: '700', letterSpacing: '-0.3px', borderBottom: '2px solid rgba(43, 138, 62, 0.1)', paddingBottom: '10px' }}>
                                🏢 지방 공사 / 지방자치단체
                            </h4>
                            <ul className="partner-text-bullet">
                                <li>서울시설공단</li>
                                <li>경기주택도시공사 (GH)</li>
                                <li>서울물재생시설공단 / 서울에너지공사</li>
                                <li>용인도시공사 / 화성도시공사</li>
                                <li>동해시청 / 계룡시청 / 고흥군청</li>
                                <li>관악청소년센터 / 시립마포청소년센터</li>
                            </ul>
                        </div>
                        <div className="partner-card-premium">
                            <h4 style={{ color: '#2b8a3e', fontSize: '16px', marginBottom: '20px', fontWeight: '700', letterSpacing: '-0.3px', borderBottom: '2px solid rgba(43, 138, 62, 0.1)', paddingBottom: '10px' }}>
                                ⚡ 발전사 / 대기업·테크
                            </h4>
                            <ul className="partner-text-bullet">
                                <li>한국중부발전 (인천발전본부 등)</li>
                                <li>한국서부발전 (태안발전본부 등)</li>
                                <li>한국도로공사</li>
                                <li>강원랜드 (주)</li>
                                <li>kt is (케이티아이에스)</li>
                                <li>제니엘 / 윌앤비전 / 제이앤비컨설팅</li>
                            </ul>
                        </div>
                    </div>
                    
                    <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginTop: '40px', fontWeight: '500', lineHeight: '1.6', letterSpacing: '-0.3px' }}>
                        "한국환경산업기술원, 한국치산기술협회, 한국중부발전 등 <strong>120+ 파트너가 직접 경험하고 검증한</strong><br />사내 임직원 근골격계 피지컬케어 웰니스 프로그램입니다."
                    </p>
                </div>
            </section>

            <section className="faq-section reveal">
                <div className="container text-center">
                    <div className="faq-header-wrap">
                        <h2>기업 복지 담당자님, <span>어떤 고민이 있으세요?</span></h2>
                        <p>운동부터 강연, 콘텐츠까지 맞춤 프로그램으로 해결해 드립니다.</p>
                    </div>
                    <div className="faq-list grid-2x2" style={{ alignItems: 'flex-start' }}>
                        {FAQ_DATA.map((item, idx) => (
                            <div key={idx} className={`faq-item reveal delay-${idx % 4 + 1}`} onClick={toggleFaq}>
                                <div className="faq-title-wrap">
                                    <div className="faq-title"><span className="q-mark">Q.</span> <span>{item.q}</span></div>
                                    <div className="faq-icon">+</div>
                                </div>
                                <div className="faq-content-wrapper">
                                    <div className="faq-content">
                                        <span className="a-mark">A.</span>
                                        <span>{item.a}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="cta-footer reveal">
                <div className="container">
                    <h2>FaWW와 함께 건강한 조직을 구축하세요</h2>
                    <p style={{ marginBottom: '30px' }}>기업 담당자를 위한 예산 활용 가이드 및 법적 의무 이행 리포트를 무상으로 제공해 드립니다.</p>
                    <button className="cta-btn-white" onClick={() => openModal('modal-proposal')}>무료 상담 및 가이드 신청</button>
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default EAPPage;
