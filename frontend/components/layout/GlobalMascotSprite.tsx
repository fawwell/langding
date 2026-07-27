'use client';

import React, { useState, useEffect, useRef } from 'react';

const GlobalMascotSprite = () => {
    const [state, setState] = useState<'default' | 'hover' | 'click' | 'double_click' | 'sleep' | 'roam'>('default');
    const [isVisible, setIsVisible] = useState(false);
    const [currentSectionText, setCurrentSectionText] = useState('안녕? 난 파우미야!');
    const [isChasingState, setIsChasingState] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const spriteRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const vel = useRef({ vx: -2, vy: -1.5 });
    const isRoaming = useRef(false);
    const isChasing = useRef(false);
    const mousePos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });

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

    // Section Scroll Observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            let maxVisible = 0;
            let bestText = '안녕? 난 파우미야!';

            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > maxVisible) {
                    maxVisible = entry.intersectionRatio;
                    const id = entry.target.id.toLowerCase();
                    const className = entry.target.className.toLowerCase();
                    const combined = id + ' ' + className;

                    if (combined.includes('review')) bestText = '다들 너무 만족하신대요! 👍';
                    else if (combined.includes('hero') || combined.includes('teaser')) bestText = '여기가 메인이에요! ✨';
                    else if (combined.includes('partner') || combined.includes('media')) bestText = '저희와 함께하는 든든한 파트너들이에요! 🤝';
                    else if (combined.includes('comparison')) bestText = '비교해 보면 확실히 다르죠? 😎';
                    else if (combined.includes('map') || combined.includes('contact')) bestText = '저희 위치가 궁금하신가요? 🗺️';
                    else if (combined.includes('jelly') || combined.includes('chart')) bestText = '쑥쑥 성장하는 지표를 보세요! 📈';
                    else if (combined.includes('agenda')) bestText = '핵심 아젠다를 확인해 보세요! 💡';
                }
            });
            
            if (maxVisible > 0) {
                setCurrentSectionText(bestText);
            }
        }, { threshold: [0.2, 0.5, 0.8] });

        const sections = document.querySelectorAll('section, [class*="section" i], [class*="Section"]');
        sections.forEach(s => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    // Mouse & Chase Event Listeners
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            if (e.key === 'Shift' && !isChasing.current) {
                isChasing.current = true;
                setIsChasingState(true);
                if (!isRoaming.current) {
                    isRoaming.current = true;
                    setState('roam');
                }
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Shift' && isChasing.current) {
                isChasing.current = false;
                setIsChasingState(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // High performance Organic Roaming Engine (Boids/Steering)
    const targetPos = useRef({ x: -200, y: -200 });

    useEffect(() => {
        let animationFrameId: number;
        
        const roamLoop = () => {
            if (isRoaming.current && containerRef.current) {
                // Safe bounds for targeting and soft collisions
                const calcMinX = -window.innerWidth + 200;
                const calcMaxX = -20;
                const calcMinY = -window.innerHeight + 320;
                const calcMaxY = 80;

                const minX = Math.min(calcMinX, calcMaxX - 10);
                const maxX = Math.max(calcMaxX, calcMinX + 10);
                const minY = Math.min(calcMinY, calcMaxY - 10);
                const maxY = Math.max(calcMaxY, calcMinY + 10);

                let currentTarget = targetPos.current;

                if (isChasing.current) {
                    // Translate mouse coordinates to sprite's local translation space
                    // container is fixed at bottom:160, right:30 (width:130, height:130)
                    // We want the CENTER of the sprite (offset 65) to match the mouse
                    const containerOriginX = window.innerWidth - 160;
                    const containerOriginY = window.innerHeight - 290; // 160 (bottom) + 130 (height)
                    
                    currentTarget = {
                        x: mousePos.current.x - containerOriginX - 65,
                        y: mousePos.current.y - containerOriginY - 65
                    };
                } else {
                    const dxTarget = targetPos.current.x - pos.current.x;
                    const dyTarget = targetPos.current.y - pos.current.y;
                    if (Math.sqrt(dxTarget * dxTarget + dyTarget * dyTarget) < 100) {
                        targetPos.current = {
                            x: minX + Math.random() * (maxX - minX),
                            y: minY + Math.random() * (maxY - minY)
                        };
                    }
                    currentTarget = targetPos.current;
                }

                const dx = currentTarget.x - pos.current.x;
                const dy = currentTarget.y - pos.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Steer towards target smoothly (slower when roaming for floating feel)
                const targetVx = (dx / (dist || 1)) * (isChasing.current ? 7.0 : 2.5);
                const targetVy = (dy / (dist || 1)) * (isChasing.current ? 7.0 : 2.5);

                // Add erratic zigzag noise (much gentler noise for floating feel)
                const noise = isChasing.current ? 0.5 : 0.3;
                vel.current.vx += (targetVx - vel.current.vx) * 0.04 + (Math.random() - 0.5) * noise;
                vel.current.vy += (targetVy - vel.current.vy) * 0.04 + (Math.random() - 0.5) * noise;

                // Cap max velocity to avoid insane speeds (slower for gentle floating)
                const maxSpeed = isChasing.current ? 8.0 : 4.0;
                const speed = Math.sqrt(vel.current.vx * vel.current.vx + vel.current.vy * vel.current.vy);
                if (speed > maxSpeed) {
                    vel.current.vx = (vel.current.vx / speed) * maxSpeed;
                    vel.current.vy = (vel.current.vy / speed) * maxSpeed;
                }

                pos.current.x += vel.current.vx;
                pos.current.y += vel.current.vy;

                // Soft boundaries (only apply if not chasing)
                if (!isChasing.current) {
                    if (pos.current.x < minX - 50) vel.current.vx += 1;
                    if (pos.current.x > maxX + 50) vel.current.vx -= 1;
                    if (pos.current.y < minY - 50) vel.current.vy += 1;
                    if (pos.current.y > maxY + 50) vel.current.vy -= 1;
                }

                containerRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
                // Flip mascot horizontally if moving left vs right (apply to sprite only)
                if (spriteRef.current) {
                    const isRun = isChasing.current;
                    if (vel.current.vx < -0.05) {
                         spriteRef.current.style.scale = isRun ? '-1 1' : '1 1';
                    } else if (vel.current.vx > 0.05) {
                         spriteRef.current.style.scale = isRun ? '1 1' : '-1 1';
                    }
                }
            }
            animationFrameId = requestAnimationFrame(roamLoop);
        };
        roamLoop();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    let spriteImage = '/images/pawmi/ai_mascot_idle_clean_strip_transparent.png';
    let tooltipText = currentSectionText;
    let extraAnimation = 'floatSmooth 3s ease-in-out infinite';
    
    const isHeroSection = currentSectionText === '안녕? 난 파우미야!' || currentSectionText === '여기가 메인이에요! ✨';

    if (isChasingState) {
        spriteImage = '/images/pawmi/ai_mascot_running_clean_strip_transparent.png';
        tooltipText = isHeroSection ? '잡았다 요놈!! 다다다다!' : currentSectionText;
        extraAnimation = 'runSmooth 0.3s ease-in-out infinite';
    } else if (state === 'hover') {
        spriteImage = '/images/pawmi/ai_mascot_waving_strip_transparent.png';
        tooltipText = isHeroSection ? '더블클릭 하거나 Shift 키를 꾹 눌러보세요! ✨' : currentSectionText;
        extraAnimation = 'none';
    } else if (state === 'click') {
        spriteImage = '/images/pawmi/ai_mascot_jumping_clean_strip_transparent.png';
        tooltipText = isHeroSection ? '얍!!' : currentSectionText;
        extraAnimation = 'jumpSmooth 0.5s ease-out';
    } else if (state === 'double_click') {
        spriteImage = '/images/pawmi/ai_mascot_dancing_clean_strip_transparent.png';
        tooltipText = isHeroSection ? '신난다!! 춤추자!!' : currentSectionText;
        extraAnimation = 'danceSmooth 1s ease-in-out infinite';
    } else if (state === 'sleep') {
        spriteImage = '/images/pawmi/ai_mascot_sleeping_clean_strip_transparent.png';
        tooltipText = isHeroSection ? '쿨쿨... Zzz...' : currentSectionText;
        extraAnimation = 'sleepSmooth 4s ease-in-out infinite';
    } else if (state === 'roam') {
        spriteImage = '/images/pawmi/ai_mascot_flying_clean_strip_transparent.png';
        tooltipText = isHeroSection ? '슈우웅~!' : currentSectionText;
        extraAnimation = 'floatSmooth 1s ease-in-out infinite';
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
        setTimeout(() => {
            if (isRoaming.current) return;
            setState('hover');
        }, 2000);
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
                bottom: '160px', 
                right: '30px',
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
                    transform: 'translateX(-50%)',
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
                
                <div ref={spriteRef} className="pawmi-sprite" style={{
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
                    @keyframes runSmooth {
                        0% { transform: translateY(0px) scale(0.78); }
                        50% { transform: translateY(-3px) scale(0.82); }
                        100% { transform: translateY(0px) scale(0.78); }
                    }
                `}} />
            </div>
        </div>
    );
};

export default GlobalMascotSprite;
