'use client';

import React, { useState, useEffect, useRef } from 'react';

const GlobalMascotSprite = () => {
    const [state, setState] = useState<'default' | 'hover' | 'click' | 'double_click' | 'sleep' | 'roam'>('default');
    const [isVisible, setIsVisible] = useState(false);

    // X, Y positions (relative to bottom-right fixed container)
    const containerRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const vel = useRef({ vx: -2, vy: -1.5 });
    const isRoaming = useRef(false);

    // Initial appearance
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    // Idle timer for sleeping (only when default)
    useEffect(() => {
        if (state !== 'default') return;
        const timer = setTimeout(() => {
            if (!isRoaming.current) {
                setState('sleep');
            }
        }, 5000); 
        return () => clearTimeout(timer);
    }, [state]);

    // High performance Roaming Engine (No React re-renders)
    useEffect(() => {
        let animationFrameId: number;
        
        const roamLoop = () => {
            if (isRoaming.current && containerRef.current) {
                pos.current.x += vel.current.vx;
                pos.current.y += vel.current.vy;
                
                // Boundaries (assuming it starts at bottom right)
                const maxX = 50;
                const minX = -window.innerWidth + 100;
                const maxY = 50;
                const minY = -window.innerHeight + 100;

                if (pos.current.x < minX || pos.current.x > maxX) vel.current.vx *= -1;
                if (pos.current.y < minY || pos.current.y > maxY) vel.current.vy *= -1;

                containerRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
                // Flip mascot horizontally if moving left vs right
                if (vel.current.vx < 0) {
                     containerRef.current.style.scale = '1 1';
                } else {
                     containerRef.current.style.scale = '-1 1'; // look right
                }
            }
            animationFrameId = requestAnimationFrame(roamLoop);
        };
        roamLoop();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    let spriteImage = '/images/pawmi/ai_mascot_idle_clean_strip_transparent.png';
    let tooltipText = '안녕? 난 파우미야!';
    let extraAnimation = 'floatSmooth 3s ease-in-out infinite';
    let flipTooltip = false;
    
    if (state === 'hover') {
        spriteImage = '/images/pawmi/ai_mascot_waving_strip_transparent.png';
        tooltipText = '반가워요! 더블클릭 해볼래요?';
        extraAnimation = 'none';
    } else if (state === 'click') {
        spriteImage = '/images/pawmi/ai_mascot_jumping_clean_strip_transparent.png';
        tooltipText = '얍!!';
        extraAnimation = 'jumpSmooth 0.5s ease-out';
    } else if (state === 'double_click') {
        spriteImage = '/images/pawmi/ai_mascot_dancing_clean_strip_transparent.png';
        tooltipText = '신난다!! 춤추자!!';
        extraAnimation = 'danceSmooth 1s ease-in-out infinite';
    } else if (state === 'sleep') {
        spriteImage = '/images/pawmi/ai_mascot_sleeping_clean_strip_transparent.png';
        tooltipText = '쿨쿨... Zzz...';
        extraAnimation = 'sleepSmooth 4s ease-in-out infinite';
    } else if (state === 'roam') {
        spriteImage = '/images/pawmi/ai_mascot_flying_clean_strip_transparent.png';
        tooltipText = '슈우웅~!';
        extraAnimation = 'floatSmooth 1s ease-in-out infinite';
        if (containerRef.current && containerRef.current.style.scale === '-1 1') {
            flipTooltip = true;
        }
    }

    if (!isVisible) return null;

    const handleMouseEnter = () => {
        if (isRoaming.current) return;
        if (state !== 'click' && state !== 'double_click') setState('hover');
    };

    const handleMouseLeave = () => {
        if (isRoaming.current) return;
        if (state !== 'click' && state !== 'double_click') setState('default');
    };

    const handleClick = () => {
        if (isRoaming.current) {
            isRoaming.current = false;
            pos.current = { x: 0, y: 0 };
            if (containerRef.current) {
                containerRef.current.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                containerRef.current.style.transform = `translate3d(0, 0, 0)`;
                containerRef.current.style.scale = '1 1';
            }
            setState('default');
            return;
        }

        if (state === 'double_click') return;
        setState('click');
        setTimeout(() => setState('hover'), 2000);
    };

    const handleDoubleClick = () => {
        if (isRoaming.current) return;
        
        isRoaming.current = true;
        setState('roam');
    };

    return (
        <div 
            ref={containerRef}
            className="global-pawmi-roam-layer"
            style={{
                position: 'fixed',
                bottom: typeof window !== 'undefined' && window.innerWidth <= 768 ? '140px' : '20px', 
                right: '20px',
                zIndex: 99999,
                touchAction: 'none'
            }}
        >
            <div 
                className="global-pawmi-sprite-container"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                onDoubleClick={handleDoubleClick}
                style={{
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    transform: (state === 'hover' || state === 'click' || state === 'double_click' || state === 'roam') ? 'scale(1.15) translateY(-10px)' : 'scale(1) translateY(0)',
                    willChange: 'transform'
                }}
            >
                <div className="mascot-tooltip" style={{
                    position: 'absolute',
                    top: (state === 'hover' || state === 'click' || state === 'double_click' || state === 'sleep' || state === 'roam') ? '-35px' : '-25px',
                    left: '50%',
                    transform: `translateX(-50%) ${flipTooltip ? 'scaleX(-1)' : 'scaleX(1)'}`,
                    background: '#fff',
                    padding: '8px 14px',
                    borderRadius: '20px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    border: '1px solid #eaeaea',
                    fontSize: '13px',
                    fontWeight: '900',
                    color: '#2b8a3e',
                    opacity: (state === 'hover' || state === 'click' || state === 'double_click' || state === 'sleep' || state === 'roam') ? 1 : 0,
                    transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.5px',
                    zIndex: 2
                }}>
                    {tooltipText}
                </div>
                
                <div className="pawmi-sprite" style={{
                    width: '130px',
                    height: '130px',
                    backgroundImage: `url(${spriteImage})`,
                    backgroundSize: '520px 130px',
                    animation: `playSprite 1s steps(4) infinite, ${extraAnimation}`,
                    willChange: 'background-position, transform'
                }} />

                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes playSprite {
                        100% { background-position: -520px 0; }
                    }
                    @keyframes floatSmooth {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-8px); }
                        100% { transform: translateY(0px); }
                    }
                    @keyframes sleepSmooth {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05) translateY(-2px); }
                        100% { transform: scale(1); }
                    }
                    @keyframes danceSmooth {
                        0% { transform: rotate(0deg) scale(1); }
                        25% { transform: rotate(-10deg) scale(1.1); }
                        50% { transform: rotate(0deg) scale(1); }
                        75% { transform: rotate(10deg) scale(1.1); }
                        100% { transform: rotate(0deg) scale(1); }
                    }
                    @keyframes jumpSmooth {
                        0% { transform: translateY(0px) scale(1, 1); }
                        40% { transform: translateY(-25px) scale(0.9, 1.1); }
                        100% { transform: translateY(0px) scale(1, 1); }
                    }
                `}} />
            </div>
        </div>
    );
};

export default GlobalMascotSprite;
