'use client';

import React, { useEffect, useRef, useState } from 'react';

const CinematicScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !videoRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // 전체 섹션 길이 대비 현재 스크롤 위치 계산 (0 ~ 1)
            const totalScroll = containerRef.current.offsetHeight - windowHeight;
            const currentScroll = -rect.top;
            
            let currentProgress = Math.max(0, Math.min(1, currentScroll / totalScroll));
            setProgress(currentProgress);

            // 비디오 프레임 제어
            if (videoRef.current.duration) {
                videoRef.current.currentTime = videoRef.current.duration * currentProgress;
            }
        };

        window.addEventListener('scroll', handleScroll);
        // 초기 로딩 시 비디오 메타데이터 대기
        if (videoRef.current) {
            videoRef.current.addEventListener('loadedmetadata', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section ref={containerRef} style={{ height: '400vh', position: 'relative', backgroundColor: '#000' }}>
            <div style={{ position: 'sticky', top: 0, left: 0, width: '100%', height: '100vh', overflow: 'hidden' }}>
                {/* 배경 비디오 */}
                <video
                    ref={videoRef}
                    src="/background.mp4"
                    muted
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.6
                    }}
                />
                
                {/* 중앙 텍스트 레이어 */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    width: '100%',
                    color: '#fff',
                    zIndex: 10
                }}>
                    <div style={{ opacity: progress < 0.3 ? progress * 3.3 : (0.6 - progress) * 3.3, display: progress < 0.6 ? 'block' : 'none', transition: 'opacity 0.1s ease' }}>
                        <h2 style={{ fontSize: '64px', fontWeight: 900, marginBottom: '20px', letterSpacing: '-2px' }}>정밀하게 <span style={{ color: '#2b8a3e' }}>스캔</span>하고</h2>
                        <p style={{ fontSize: '24px', opacity: 0.8 }}>FaWW의 AI 솔루션이 당신의 신체를 분석합니다</p>
                    </div>
                    
                    <div style={{ opacity: (progress > 0.4 && progress < 0.7) ? (progress - 0.4) * 3.3 : (0.9 - progress) * 3.3, display: (progress > 0.4 && progress < 0.9) ? 'block' : 'none', transition: 'opacity 0.1s ease' }}>
                        <h2 style={{ fontSize: '64px', fontWeight: 900, marginBottom: '20px', letterSpacing: '-2px' }}>과학적으로 <span style={{ color: '#2b8a3e' }}>진단</span>하며</h2>
                        <p style={{ fontSize: '24px', opacity: 0.8 }}>축적된 빅데이터로 최적의 개선 방향을 찾습니다</p>
                    </div>

                    <div style={{ opacity: progress > 0.7 ? (progress - 0.7) * 3.3 : 0, display: progress > 0.7 ? 'block' : 'none', transition: 'opacity 0.1s ease' }}>
                        <h2 style={{ fontSize: '64px', fontWeight: 900, marginBottom: '20px', letterSpacing: '-2px' }}>확실하게 <span style={{ color: '#2b8a3e' }}>케어</span>합니다</h2>
                        <p style={{ fontSize: '24px', opacity: 0.8 }}>대한민국 원조 피지컬케어의 놀라운 결과</p>
                    </div>
                </div>

                {/* 하단 진행도 바 */}
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '200px',
                    height: '2px',
                    background: 'rgba(255,255,255,0.2)'
                }}>
                    <div style={{
                        width: `${progress * 100}%`,
                        height: '100%',
                        background: '#2b8a3e',
                        boxShadow: '0 0 10px #2b8a3e'
                    }} />
                </div>
            </div>
        </section>
    );
};

export default CinematicScroll;
