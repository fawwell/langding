'use client';

import React from 'react';
import { ShieldAlert, HeartHandshake, Brain, AlertTriangle, BarChart3, Award } from 'lucide-react';

const AgendaSection = () => {
    return (
        <>
            <section className="agenda-section reveal">
                <div className="container">
                    <div className="agenda-header">
                        <span className="section-kicker reveal soft-reveal">CORE AGENDA</span>
                        <h2 className="section-title reveal soft-reveal">조직의 가장 큰 고민,<br /><span>&apos;피지컬케어(Physical Care)&apos;</span>에서 해답을 찾다</h2>
                        <p className="section-desc reveal soft-reveal">단순한 복지를 넘어 산업재해, 저출산, 멘탈케어까지. 국가와 기업의 핵심 과제를 해결합니다.</p>
                    </div>
                    <div className="agenda-grid">
                        <div className="agenda-card reveal reveal-left">
                            <div className="agenda-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ShieldAlert size={40} strokeWidth={1.8} />
                            </div>
                            <h3>
                                <span className="type-heavy">건강한 몸이 곧</span><br />
                                <span className="type-light">산재의 예방입니다</span>
                            </h3>
                            <p><strong className="p-head">신체의 피로와 통증은 산재의 씨앗입니다.</strong> 근골격계 유해요인조사 사후관리를 실행하여 법적 리스크를 해소하고 관리 효율을 극대화하십시오.</p>
                        </div>
                        <div className="agenda-card reveal reveal-scale delay-2">
                            <div className="agenda-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <HeartHandshake size={40} strokeWidth={1.8} />
                            </div>
                            <h3>
                                <span className="type-heavy">산모의 건강이</span><br />
                                <span className="type-light">성공적 복직의 키</span>
                            </h3>
                            <p><strong className="p-head">출산 친화적 조직문화의 핵심은 신체 회복입니다.</strong> 섬세한 1:1 피지컬케어로 출산 전후 회복을 돕고일과 가정의 양립을 완벽 지원합니다.</p>
                        </div>
                        <div className="agenda-card reveal reveal-right delay-3">
                            <div className="agenda-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Brain size={40} strokeWidth={1.8} />
                            </div>
                            <h3>
                                <span className="type-heavy">신체가 건강해야</span><br />
                                <span className="type-light">마음도 건강해집니다</span>
                            </h3>
                            <p><strong className="p-head">굳어있는 몸의 긴장은 번아웃으로 이어집니다.</strong> 전문가의 개입으로 신체 활력을 되찾아주고 마음의 병을 예방하는 프리미엄 EAP를 제시합니다.</p>
                        </div>
                    </div>

                    <div className="expert-banner reveal">
                        <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <AlertTriangle size={24} strokeWidth={2.5} style={{ color: '#dc2626' }} />
                            자격증 없는 무자격 플랫폼 업체를 주의하십시오.
                        </h4>
                        <p>단순 외부 강사들을 매칭해주는 타 플랫폼과 비교를 거부합니다.<br />
                            FaWW는 12년 이상의 독보적 임상 노하우를 바탕으로 &apos;피지컬케어관리사&apos; 자격증을 창시한<br />
                            대한민국 <strong>&apos;원조(Original)&apos;</strong> 그룹입니다.<br /><br />
                            검증되지 않은 1회성 휴식이 아닌, 뼈와 근막을 완벽히 이해하는<br />
                            진짜 전문가의 개입만이 실질적인 지표 변화를 만듭니다.</p>
                    </div>
                </div>
            </section>

            <section className="eap-system-section reveal">
                <div className="container">
                    <div className="expert-features" style={{ width: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }} className="reveal">
                            <span className="section-kicker reveal soft-reveal">EAP SYSTEM</span>
                            <h2 className="section-title reveal soft-reveal" style={{ marginBottom: 0 }}>FaWW만의 독보적 EAP 운영 시스템</h2>
                        </div>
                        <div className="expert-grid">
                            <div className="agenda-card reveal" style={{ border: '2px solid #2b8a3e', boxShadow: '0 10px 30px rgba(43, 138, 62, 0.08)' }}>
                                <div className="agenda-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <BarChart3 size={40} strokeWidth={1.8} />
                                </div>
                                <h3>담당자의 성과를 증명하는 &apos;사후 리포트&apos;</h3>
                                <p>현장 케어 후 단순 만족도 조사가 아닌, <strong>AI 체형분석 기반의 신체 개선 수치를 시각화한 리포트</strong>를 제공합니다. 임직원 근골격계 관리 성과, ESG 및 근골격계 유해요인조사 사후관리 증빙 자료로 즉시 활용 가능한 결과물을 책임집니다.</p>
                                <div className="mini-chart">
                                    <div className="mini-bar mini-bar-1" style={{ backgroundColor: '#2b8a3e' }}></div>
                                    <div className="mini-bar mini-bar-2" style={{ backgroundColor: '#40c057' }}></div>
                                    <div className="mini-bar mini-bar-3" style={{ backgroundColor: '#8ce99a' }}></div>
                                </div>
                            </div>
                            <div className="agenda-card reveal delay-1" style={{ border: '2px solid #111', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                                <div className="agenda-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Award size={40} strokeWidth={1.8} />
                                </div>
                                <h3>&apos;원조&apos; 피지컬케어 전문가 100% 검증 파견</h3>
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
        </>
    );
};

export default React.memo(AgendaSection);
