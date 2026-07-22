'use client';

import React from 'react';

interface JellyChartSectionProps {
    reviewsData: any[];
}

const JellyChartSection = ({ reviewsData }: JellyChartSectionProps) => {
    React.useEffect(() => {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        const cards = document.querySelectorAll('.stat-floating-card');
        cards.forEach(card => revealObserver.observe(card));

        return () => revealObserver.disconnect();
    }, [reviewsData]);

    return (
        <section className="jelly-chart-section reveal" style={{ padding: '40px 0 60px', backgroundColor: '#f8f9fa', borderTop: '1px solid #eee', overflow: 'visible', position: 'relative' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes jellyPawmiFloat {
                    0%, 100% { transform: translateY(0px) rotate(-3deg); }
                    50% { transform: translateY(-8px) rotate(3deg); }
                }
                .jelly-pawmi-mascot {
                    width: 90px;
                    height: 90px;
                    object-fit: contain;
                    margin: 0 auto 10px auto;
                    filter: drop-shadow(0 6px 15px rgba(0,0,0,0.15));
                    animation: jellyPawmiFloat 3.6s ease-in-out infinite;
                }
            `}} />
            <div className="container text-center" style={{ overflow: 'visible' }}>
                <img 
                    src="/images/pawmi/pawmi_massage.png" 
                    alt="만족도 99% 파우미" 
                    className="jelly-pawmi-mascot soft-reveal"
                />
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
                                <p className="rev-text">&ldquo;사내로 찾아오는 AI 체형분석 기업복지 덕분에 고질적인 거북목과 허리 통증을 해결했습니다. 전문가들의 체계적인 개입이 돋보입니다.&rdquo;</p>
                                <div style={{ color: '#fab005', fontSize: '12px', marginTop: '8px' }}>★★★★★</div>
                            </div>
                            <div className="stat-floating-card card-2 reveal delay-5">
                                <div className="stat-card-badge">FIELD CARE</div>
                                <h4>현대자동차 생산라인</h4>
                                <p className="rev-text">&ldquo;근골격계 유해요인조사 사후관리의 일환으로 도입했습니다. 생산직 근로자의 특성을 반영한 1:1 케어 덕분에 실제 피로가 줄어들었습니다.&rdquo;</p>
                                <div style={{ color: '#fab005', fontSize: '12px', marginTop: '8px' }}>★★★★★</div>
                            </div>
                            <div className="stat-floating-card card-3 reveal delay-6">
                                <div className="stat-card-badge">OFFICE CARE</div>
                                <h4>네이버 인사팀장</h4>
                                <p className="rev-text">&ldquo;사내 임직원 근골격계 관리 복지 프로그램으로 정기 케어를 선택했는데, 업무 몰입과 사내 활력이 눈에 띄게 좋아졌습니다.&rdquo;</p>
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
