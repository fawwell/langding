'use client';

import React, { useEffect, useRef } from 'react';

const MagnifySection = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const glass = container.querySelector('.magnify-glass') as HTMLElement;
        const human = container.querySelector('.magnify-human') as HTMLElement;
        const skeleton = container.querySelector('.magnify-skeleton') as HTMLElement;
        const shine = container.querySelector('.magnify-shine') as HTMLElement;

        let ticking = false;
        let lastX = 0;
        let lastY = 0;

        const updatePosition = () => {
            const rect = container.getBoundingClientRect();
            const x = lastX - rect.left;
            const y = lastY - rect.top;

            const tiltX = ((y / rect.height) - 0.5) * -12;
            const tiltY = ((x / rect.width) - 0.5) * 12;

            container.style.setProperty('--x', `${x}px`);
            container.style.setProperty('--y', `${y}px`);
            
            container.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            container.style.boxShadow = `${-tiltY * 3}px ${tiltX * 3}px 50px rgba(0,0,0,0.6), 0 0 20px rgba(0, 255, 255, 0.1)`;
            
            if (human) human.style.transform = `translate3d(${-tiltY * 0.5}px, ${tiltX * 0.5}px, 20px)`;
            if (skeleton) skeleton.style.transform = `translate3d(${tiltY * 0.3}px, ${-tiltX * 0.3}px, -30px) scale(1.05)`;

            if (shine) {
                shine.style.backgroundPosition = `${50 + tiltY * 2}% ${50 + tiltX * 2}%`;
            }

            if (glass) {
                glass.style.left = `${x}px`;
                glass.style.top = `${y}px`;
                glass.style.display = 'block';
                
                const angle = Math.abs(Math.floor(tiltY * 2 + 15));
                const score = 90 + Math.floor(Math.random() * 10);
                glass.setAttribute('data-info', `ANGLE: ${angle}°\nSCORE: ${score}%`);
            }

            ticking = false;
        };

        const scheduleUpdate = (clientX: number, clientY: number) => {
            lastX = clientX;
            lastY = clientY;
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updatePosition);
            }
        };

        const handleMouseMove = (e: MouseEvent) => scheduleUpdate(e.clientX, e.clientY);
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                if (e.cancelable) e.preventDefault(); 
                const touch = e.touches[0];
                scheduleUpdate(touch.clientX, touch.clientY);
            }
        };

        const handleEnter = () => container.classList.add('magnify-hover');
        const handleLeave = () => {
            container.classList.remove('magnify-hover');
            container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            if (glass) glass.style.display = 'none';
            document.body.style.overflow = '';
        };

        const handleTouchStart = (e: TouchEvent) => {
            document.body.style.overflow = 'hidden';
            handleEnter();
            handleTouchMove(e);
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleEnter);
        container.addEventListener('mouseleave', handleLeave);
        
        container.addEventListener('touchstart', handleTouchStart as any, { passive: false });
        container.addEventListener('touchmove', handleTouchMove as any, { passive: false });
        container.addEventListener('touchend', handleLeave);
        container.addEventListener('touchcancel', handleLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseenter', handleEnter);
            container.removeEventListener('mouseleave', handleLeave);
            container.removeEventListener('touchstart', handleTouchStart as any);
            container.removeEventListener('touchmove', handleTouchMove as any);
            container.removeEventListener('touchend', handleLeave);
            container.removeEventListener('touchcancel', handleLeave);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <section className="magnify-section reveal">
            <div className="container text-center">
                <span className="section-kicker reveal soft-reveal">AI-POWERED ANALYSIS</span>
                <h2 className="section-title reveal soft-reveal" style={{ 
                    color: '#fff', 
                    textShadow: '0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(125,185,255,0.2)',
                    fontSize: '46px',
                    fontWeight: '700',
                    marginBottom: '20px'
                }}>커서를 올려 AI 분석을 체험해보세요</h2>
                <p className="section-desc reveal soft-reveal" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', lineHeight: '1.6' }}>
                    FaWW의 <span style={{ 
                        color: '#00ff88', 
                        fontWeight: 'bold', 
                        textShadow: '0 0 8px rgba(0,255,136,0.6), 0 0 20px rgba(0,255,136,0.3)' 
                    }}>스마트 AI 체형분석</span> 기술은 신체 불균형을 정밀하게 측정하여<br />임직원 근골격계 관리와 근골격계 유해요인조사 사후관리의 과학적 근거를 제시합니다.
                </p>
                <div className="magnify-container reveal delay-4" ref={containerRef}>
                    <div className="magnify-shine"></div>
                    <div className="magnify-skeleton" style={{ backgroundImage: "url('/images/skeleton.png')" }}></div>
                    <div className="magnify-human" style={{ backgroundImage: "url('/images/human.png')" }}></div>
                    <div className="magnify-glass"></div>
                </div>
                <p className="reveal delay-5" style={{ marginTop: '20px', fontSize: '14px', color: '#888' }}>* 위 이미지는 이해를 돕기 위한 연출이며, 실제 분석은 전문 장비로 진행됩니다.</p>
            </div>
        </section>
    );
};

export default React.memo(MagnifySection);
