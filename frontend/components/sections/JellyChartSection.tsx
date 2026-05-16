'use client';

import React from 'react';

interface JellyChartSectionProps {
    reviewsData: any[];
}

const JellyChartSection = ({ reviewsData }: JellyChartSectionProps) => {
    return (
        <section className="jelly-chart-section reveal" style={{ padding: '40px 0 60px', backgroundColor: '#f8f9fa', borderTop: '1px solid #eee', overflow: 'visible' }}>
            <div className="container text-center" style={{ overflow: 'visible' }}>
                <h2 className="section-title reveal soft-reveal" style={{ marginBottom: '10px' }}>FaWW <span className="text-highlight">피지컬케어 종합 만족도</span></h2>
                <p className="section-desc reveal soft-reveal" style={{ marginBottom: '40px' }}>2만 건 이상의 데이터가 증명하는 압도적인 결과</p>

                <div className="jelly-chart-container reveal delay-3" id="satisfaction-chart">
                    <div className="jelly-pie-wrapper">
                        <div className="jelly-pie-scene">
                            {/* 차트 그림자 */}
                            <div className="jelly-shadow"></div>
                            
                            {/* 3D 실린더 두께 레이어 (여러 겹으로 부피감 형성) */}
                            <div className="jelly-extrusion"></div>
                            <div className="jelly-layer bottom"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" className="j-bg" /><circle cx="16" cy="16" r="8" className="j-fg" pathLength="100" /></svg></div>
                            <div className="jelly-layer mid"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" className="j-bg" /><circle cx="16" cy="16" r="8" className="j-fg" pathLength="100" /></svg></div>
                            
                            {/* 최상단 면 (광택 및 수치) */}
                            <div className="jelly-layer top">
                                <svg viewBox="0 0 32 32">
                                    <circle cx="16" cy="16" r="8" className="j-bg" pathLength="100" />
                                    <circle cx="16" cy="16" r="8" className="j-fg count-up-circle" pathLength="100" />
                                </svg>
                                <div className="jelly-gloss"></div>
                            </div>

                            {/* 공중에 뜬 수치 데이터 */}
                            <div className="jelly-text-float">
                                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                                    <span className="jelly-percent count-up neon-text" data-target="99">0</span>
                                    <span className="jelly-sign">%</span>
                                </div>
                                <span className="jelly-label">종합 만족도</span>
                            </div>
                        </div>
                    </div>

                    {/* 💎 부유하는 만족도 카드들 (실제 DB 연동 + PTS 제외 필터) */}
                    {reviewsData.filter(r => r.type === 'b2b' && !r.reviewer.includes('PTS') && !r.text.includes('PTS')).length > 0 ? (
                        reviewsData.filter(r => r.type === 'b2b' && !r.reviewer.includes('PTS') && !r.text.includes('PTS')).slice(0, 3).map((rev, idx) => (
                            <div key={idx} className={`stat-floating-card card-${idx + 1} reveal delay-${idx + 4}`}>
                                <div className="stat-card-badge">CORPORATE</div>
                                <h4>{rev.reviewer}</h4>
                                <p className="rev-text">{rev.text}</p>
                                <div style={{ color: '#fab005', fontSize: '12px', marginTop: '8px' }}>{rev.stars}</div>
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="stat-floating-card card-1 reveal delay-4">
                                <div className="stat-card-badge">CORPORATE</div>
                                <h4>LG 디스플레이 임직원</h4>
                                <p className="rev-text">"사내로 직접 찾아오시는 출장 케어 덕분에 업무 중 짬을 내어 고질적인 거북목 통증을 해결할 수 있었습니다. 전문가의 손길이 확실히 다르네요."</p>
                                <div style={{ color: '#fab005', fontSize: '12px', marginTop: '8px' }}>★★★★★</div>
                            </div>
                            <div className="stat-floating-card card-2 reveal delay-5">
                                <div className="stat-card-badge">FIELD CARE</div>
                                <h4>현대자동차 생산라인</h4>
                                <p className="rev-text">"현장 근로자들의 신체적 특성을 정확히 이해하고 계십니다. 1:1 맞춤형 체형 분석과 스트레칭 교육이 실제 피로도 감소에 큰 도움이 되었습니다."</p>
                                <div style={{ color: '#fab005', fontSize: '12px', marginTop: '8px' }}>★★★★★</div>
                            </div>
                            <div className="stat-floating-card card-3 reveal delay-6">
                                <div className="stat-card-badge">OFFICE CARE</div>
                                <h4>네이버 인사팀장</h4>
                                <p className="rev-text">"임직원 복지 차원에서 도입했는데 만족도가 기대 이상입니다. 정기적인 방문 케어 이후 사내 분위기가 훨씬 밝아지고 업무 집중도가 높아졌습니다."</p>
                                <div style={{ color: '#fab005', fontSize: '12px', marginTop: '8px' }}>★★★★★</div>
                            </div>
                        </>
                    )}
                </div>

                <div className="pie-legend reveal delay-4">
                    <span className="legend-item"><span className="legend-color" style={{ background: 'rgba(43, 138, 62, 0.8)' }}></span>매우 만족 99%</span>
                    <span className="legend-item"><span className="legend-color" style={{ background: 'rgba(232, 245, 233, 0.8)' }}></span>만족 1%</span>
                    <span className="legend-item"><span className="legend-color" style={{ background: '#888' }}></span>보통 0%</span>
                    <span className="legend-item"><span className="legend-color" style={{ background: '#333' }}></span>불만족 0%</span>
                </div>
            </div>
        </section>
    );
};

export default JellyChartSection;
