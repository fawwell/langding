'use client';

import React from 'react';

const AgendaSection = () => {
    return (
        <section className="agenda-section reveal">
            <div className="container">
                <div className="agenda-header">
                    <span className="section-kicker reveal soft-reveal">CORE AGENDA</span>
                    <h2 className="section-title reveal soft-reveal">조직의 가장 큰 고민,<br /><span>'피지컬케어(Physical Care)'</span>에서 해답을 찾다</h2>
                    <p className="section-desc reveal soft-reveal">단순한 복지를 넘어 산업재해, 저출산, 멘탈케어까지. 국가와 기업의 핵심 과제를 해결합니다.</p>
                </div>
                <div className="agenda-grid">
                    <div className="agenda-card reveal reveal-left">
                        <div className="agenda-icon">🚨</div>
                        <h3 style={{ fontSize: '28px', lineHeight: '1.3' }}>건강한 몸이 곧<br />산재의 예방입니다</h3>
                        <p style={{ fontSize: '18px' }}>눈에 보이지 않는 신체의 피로와 통증은 예고 없이 찾아오는 산재의 씨앗입니다. 근골격계 질환을 선제적으로 예방하여 <br />법적 리스크를 낮추고 조직의 생산성을 극대화하십시오.</p>
                    </div>
                    <div className="agenda-card reveal reveal-scale delay-2">
                        <div className="agenda-icon">👶</div>
                        <h3 style={{ fontSize: '28px', lineHeight: '1.3' }}>산모의 건강이<br />성공적 복직의 키 입니다 </h3>
                        <p style={{ fontSize: '18px' }}>출산 친화적 조직문화, 이제는 신체의 근본적인 건강에서 출발해야 합니다. 전문가의 섬세한 피지컬케어로 출산 전후의 신체 회복을 돕고, 일과 가정이 양립하는 건강한 환경을 완성합니다.</p>
                    </div>
                    <div className="agenda-card reveal reveal-right delay-3">
                        <div className="agenda-icon">🧠</div>
                        <h3 style={{ fontSize: '28px', lineHeight: '1.3' }}>신체가 건강해야<br />마음도 건강해집니다</h3>
                        <p style={{ fontSize: '18px' }}>굳어있는 몸의 긴장은 곧 우울감과 번아웃으로 이어집니다. 전문가의 직접적인 피지컬케어로 신체의 활력을 되찾아주고, 마음의 병과 극단적인 선택을 예방하는 새로운 EAP를 제시합니다.</p>
                    </div>
                </div>

                <div className="expert-banner reveal">
                    <h4>⚠️ 자격증 없는 무자격 플랫폼 업체를 주의하십시오.</h4>
                    <p>단순 외부 강사들을 매칭해주는 타 플랫폼과 비교를 거부합니다.<br />
                        FaWW는 12년 이상의 독보적 임상 노하우를 바탕으로 '피지컬케어관리사' 자격증을 창시한<br />
                        대한민국 <strong>'원조(Original)'</strong> 그룹입니다.<br /><br />
                        검증되지 않은 1회성 휴식이 아닌, 뼈와 근막을 완벽히 이해하는<br />
                        진짜 전문가의 개입만이 실질적인 지표 변화를 만듭니다.</p>
                </div>

                <div className="expert-features">
                    <div style={{ textAlign: 'center', marginBottom: '40px' }} className="reveal">
                        <span className="section-kicker reveal soft-reveal">EAP SYSTEM</span>
                        <h2 className="section-title reveal soft-reveal" style={{ marginBottom: 0 }}>FaWW만의 독보적 EAP 운영 시스템</h2>
                    </div>
                    <div className="expert-grid">
                        <div className="agenda-card reveal" style={{ border: '2px solid #2b8a3e', boxShadow: '0 10px 30px rgba(43, 138, 62, 0.08)' }}>
                            <div className="agenda-icon">📊</div>
                            <h3>담당자의 성과를 증명하는 '사후 리포트'</h3>
                            <p>현장 케어 후 단순 만족도 조사가 아닌, <strong>AI 스캐닝 기반의 <br />신체 개선 수치를 시각화한 리포트</strong>를 제공합니다. 인사평가, ESG 및 <br />산업안전보건 증빙 자료로 즉시 활용 가능한 결과물을 책임집니다.</p>
                            <div className="mini-chart">
                                <div className="mini-bar mini-bar-1" style={{ backgroundColor: '#2b8a3e' }}></div>
                                <div className="mini-bar mini-bar-2" style={{ backgroundColor: '#40c057' }}></div>
                                <div className="mini-bar mini-bar-3" style={{ backgroundColor: '#8ce99a' }}></div>
                            </div>
                        </div>
                        <div className="agenda-card reveal delay-1" style={{ border: '2px solid #111', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                            <div className="agenda-icon">🏅</div>
                            <h3>'원조' 피지컬케어 전문가 100% 검증 파견</h3>
                            <p>외부 강사를 대충 고용하여 단순 파견하지 않습니다. <br />12년 노하우가 담긴 자체 아카데미의 <strong>피지컬케어 자격 인증(PCM, PTS)을 완벽히 통과한 최상위 전문가</strong>만을 육성 및 파견합니다. </p>
                            <div className="badge-row" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                                <div className="mini-badge" style={{ fontSize: '12px', background: '#f8f9fa', padding: '5px 12px', borderRadius: '20px', border: '1px solid #eee', color: '#666', fontWeight: 'bold' }}>✓ 100% 검증</div>
                                <div className="mini-badge" style={{ fontSize: '12px', background: '#f8f9fa', padding: '5px 12px', borderRadius: '20px', border: '1px solid #eee', color: '#666', fontWeight: 'bold' }}>✓ PCM 자격</div>
                                <div className="mini-badge" style={{ fontSize: '12px', background: '#f8f9fa', padding: '5px 12px', borderRadius: '20px', border: '1px solid #eee', color: '#666', fontWeight: 'bold' }}>✓ PTS 자격</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AgendaSection;
