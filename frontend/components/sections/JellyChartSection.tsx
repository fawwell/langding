'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useUI } from '@/context/UIContext';

const defaultPool = [
    { badge: 'CORPORATE', reviewer: 'LG 디스플레이 임직원', text: '“사내로 찾아오는 AI 체형분석 기업복지 덕분에 고질적인 거북목과 허리 통증을 해결했습니다. 전문가들의 체계적인 개입이 돋보입니다.”', stars: '★★★★★' },
    { badge: 'FIELD CARE', reviewer: '현대자동차 생산라인', text: '“근골격계 유해요인조사 사후관리의 일환으로 도입했습니다. 생산직 근로자의 특성을 반영한 1:1 케어 덕분에 실제 피로가 줄어들었습니다.”', stars: '★★★★★' },
    { badge: 'OFFICE CARE', reviewer: '네이버 인사팀장', text: '“사내 임직원 근골격계 관리 복지 프로그램으로 정기 케어를 선택했는데, 업무 몰입과 사내 활력이 눈에 띄게 좋아졌습니다.”', stars: '★★★★★' },
    { badge: 'CORPORATE', reviewer: '삼성전자 IT·R&D 파트', text: '“장시간 데스크 작업으로 인한 VDT 증후군 예방에 최고의 복지 프로그램입니다. 정기 AI 측정을 통해 변화를 숫자로 확인하니 임직원 만족도가 높습니다.”', stars: '★★★★★' },
    { badge: 'OFFICE CARE', reviewer: 'SK하이닉스 보건관리자', text: '“기존 마사지실 복지와 달리 데이터 기반으로 맞춤 스트레칭과 관리 방안을 제시해 주어 회사 차원의 안전보건 지표 개선에 큰 도움이 됩니다.”', stars: '★★★★★' },
    { badge: 'FIELD CARE', reviewer: '포스코 안전보건 센터', text: '“현장 근로자분들의 피로도 완화와 부상 방지를 위해 출장 케어를 진행하고 있습니다. 전국 어디나 방문해 주시는 파우 팀에 감사드립니다.”', stars: '★★★★★' },
    { badge: 'CORPORATE', reviewer: '카카오 복지담당 매니저', text: '“트렌디한 AI 기술과 전문 피지컬 큐레이터의 맞춤 상담이 결합되어 사내 만족도 조사에서 압도적인 1위를 차지한 프로그램입니다.”', stars: '★★★★★' },
    { badge: 'OFFICE CARE', reviewer: 'CJ제일제당 임직원', text: '“바른 자세 코칭과 오피스 인체공학 가이드까지 세심하게 케어해 주어 업무 효율이 늘고 만성 피로가 크게 사라졌습니다.”', stars: '★★★★★' },
    { badge: 'FIELD CARE', reviewer: '한화생명 기업문화팀', text: '“단 10초 만에 체형을 분석하고 즉각적으로 개선 솔루션을 주는 과정을 보고 임직원들 반응이 뜨거웠습니다. 연장 도입을 결정했습니다.”', stars: '★★★★★' }
];

const JellyChartSection = () => {
    const { reviewsData } = useUI();
    const [pageIndex, setPageIndex] = useState(0);

    const pool = useMemo(() => {
        const dbReviews = reviewsData
            .filter(r => r.type === 'b2b' && !r.reviewer.includes('PTS') && !r.text.includes('PTS'))
            .map(r => ({
                badge: 'CORPORATE',
                reviewer: r.reviewer,
                text: r.text.startsWith('“') || r.text.startsWith('"') ? r.text : `“${r.text}”`,
                stars: r.stars || '★★★★★'
            }));
        
        return dbReviews.length >= 6 ? dbReviews : [...dbReviews, ...defaultPool];
    }, [reviewsData]);

    useEffect(() => {
        const timer = setInterval(() => {
            setPageIndex(prev => {
                const totalPages = Math.ceil(pool.length / 3);
                return (prev + 1) % totalPages;
            });
        }, 5000);
        return () => clearInterval(timer);
    }, [pool.length]);

    const currentCards = useMemo(() => {
        const start = (pageIndex * 3) % pool.length;
        const cards = [];
        for (let i = 0; i < 3; i++) {
            cards.push(pool[(start + i) % pool.length]);
        }
        return cards;
    }, [pageIndex, pool]);

    return (
        <section className="jelly-chart-section reveal" style={{ padding: '40px 0 60px', backgroundColor: '#f8f9fa', borderTop: '1px solid #eee', overflow: 'visible', position: 'relative' }}>
            <style jsx global>{`
                @keyframes statContentFade {
                    0% { opacity: 0; transform: translateY(8px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            <div className="container text-center" style={{ overflow: 'visible' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <Image 
                        src="/images/pawmi/pawmi_massage.png" 
                        alt="만족도 99% 파우미" 
                        width={90}
                        height={90}
                        className="jelly-pawmi-mascot soft-reveal"
                    />
                </div>
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

                    {/* 💎 부유하는 만족도 카드들 (5초마다 자동 롤링 + 부드러운 전환 효과) */}
                    {currentCards.map((rev, idx) => (
                        <div key={`stat-card-${idx}`} className={`stat-floating-card card-${idx + 1}`}>
                            <div key={rev.reviewer + pageIndex} style={{ animation: 'statContentFade 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                                <div className="stat-card-badge">{rev.badge}</div>
                                <h4>{rev.reviewer}</h4>
                                <p className="rev-text">{rev.text}</p>
                                <div style={{ color: '#fab005', fontSize: '12px', marginTop: '8px' }}>{rev.stars}</div>
                            </div>
                        </div>
                    ))}
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

export default React.memo(JellyChartSection);
