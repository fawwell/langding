'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { 
    Sparkles, HeartPulse, Brain, ShoppingBag, Building2, Bot, 
    GraduationCap, Hospital, ShieldCheck, ThumbsUp, Users, 
    Scale, ArrowRight, MapPin, TrendingUp, Lightbulb, 
    Activity, Play, Zap, CheckCircle2, Navigation, Flame
} from 'lucide-react';

const GlobalMascotSprite = () => {
    const pathname = usePathname();
    const [state, setState] = useState<'default' | 'hover' | 'click' | 'double_click' | 'sleep' | 'roam'>('default');
    const [isVisible, setIsVisible] = useState(false);
    const [currentSectionObj, setCurrentSectionObj] = useState<{ text: string; icon: React.ReactNode }>({
        text: '파우(FaWW)에 오신 것을 환영합니다',
        icon: <Sparkles size={15} />
    });
    const [isChasingState, setIsChasingState] = useState(false);
    const [isArrived, setIsArrived] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const spriteRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const vel = useRef({ vx: -2, vy: -1.5 });
    const isRoaming = useRef(false);
    const isChasing = useRef(false);
    const isArrivedRef = useRef(false);
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
        let defaultObj = { text: '파우(FaWW)에 오신 것을 환영합니다', icon: <Sparkles size={15} /> };
        if (pathname?.includes('/physical')) defaultObj = { text: 'AI 체형분석기 · 근골격계 건강 관리', icon: <HeartPulse size={15} /> };
        else if (pathname?.includes('/mental')) defaultObj = { text: '임직원 심리 및 마음 건강 케어', icon: <Brain size={15} /> };
        else if (pathname?.includes('/mall')) defaultObj = { text: '엄선된 최저가 기업 복지몰', icon: <ShoppingBag size={15} /> };
        else if (pathname?.includes('/eap')) defaultObj = { text: '맞춤형 기업복지 EAP 솔루션', icon: <Building2 size={15} /> };
        else if (pathname?.includes('/ai')) defaultObj = { text: '단 10초 완료 · 놀라운 AI 정밀 분석', icon: <Bot size={15} /> };
        else if (pathname?.includes('/school')) defaultObj = { text: '바른 자세와 성장을 위한 맞춤 솔루션', icon: <GraduationCap size={15} /> };
        else if (pathname?.includes('/center')) defaultObj = { text: '전국 제휴 센터 · 전문적인 관리', icon: <Hospital size={15} /> };
        else if (pathname?.includes('/admin')) defaultObj = { text: '관리자 모드 · 효율적인 운영 관리', icon: <ShieldCheck size={15} /> };

        setCurrentSectionObj(defaultObj);

        const observer = new IntersectionObserver((entries) => {
            let maxVisible = 0;
            let bestObj = defaultObj;

            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > maxVisible) {
                    maxVisible = entry.intersectionRatio;
                    const id = entry.target.id.toLowerCase();
                    const className = entry.target.className.toLowerCase();
                    const combined = id + ' ' + className;

                    if (combined.includes('hero')) bestObj = { text: '파우(FaWW)에 오신 것을 환영합니다', icon: <Sparkles size={15} /> };
                    else if (combined.includes('teaser')) bestObj = { text: '기업 근골격계 복지의 새로운 기준 · 파우', icon: <ShieldCheck size={15} /> };
                    else if (combined.includes('magnify')) bestObj = { text: '숨은 통증과 원인을 정밀하게 진단합니다', icon: <Activity size={15} /> };
                    else if (combined.includes('jelly') || combined.includes('chart')) bestObj = { text: '데이터로 증명되는 명확한 개선 지표', icon: <TrendingUp size={15} /> };
                    else if (combined.includes('agenda')) bestObj = { text: '임직원 건강을 위한 핵심 솔루션 제안', icon: <Lightbulb size={15} /> };
                    else if (combined.includes('comparison')) bestObj = { text: '기존 복지와 차원이 다른 맞춤형 관리', icon: <Scale size={15} /> };
                    else if (combined.includes('gateway')) bestObj = { text: '우리 회사에 꼭 맞는 서비스를 시작해 보세요', icon: <ArrowRight size={15} /> };
                    else if (combined.includes('review')) bestObj = { text: '도입 기업 임직원분들의 생생한 만족 후기', icon: <ThumbsUp size={15} /> };
                    else if (combined.includes('map') || combined.includes('contact')) bestObj = { text: '전국 어디든 직접 찾아가는 맞춤형 출장 케어', icon: <MapPin size={15} /> };
                    else if (combined.includes('partner')) bestObj = { text: '수많은 리딩 기업들이 파우와 함께합니다', icon: <Users size={15} /> };
                    else if (combined.includes('media')) bestObj = { text: '언론과 미디어가 주목하는 파우의 혁신', icon: <Play size={15} /> };
                }
            });
            
            if (maxVisible > 0) {
                setCurrentSectionObj(prev => (prev.text === bestObj.text ? prev : bestObj));
            }
        }, { threshold: [0.2, 0.5, 0.8] });

        const sections = document.querySelectorAll('section, [class*="section" i], [class*="Section"]');
        sections.forEach(s => observer.observe(s));
        return () => observer.disconnect();
    }, [pathname]);

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
                isArrivedRef.current = false;
                setIsArrived(false);
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
    const lastScaleRef = useRef('1 1');
    const lastPosRef = useRef({ x: -9999, y: -9999 });

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
                    const containerOriginX = window.innerWidth - 250;
                    const containerOriginY = window.innerHeight - 290;
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

                if (isChasing.current && dist < 45) {
                    if (!isArrivedRef.current) {
                        isArrivedRef.current = true;
                        setIsArrived(true);
                    }
                } else {
                    if (isArrivedRef.current) {
                        isArrivedRef.current = false;
                        setIsArrived(false);
                    }
                }

                const targetVx = (dx / (dist || 1)) * (isChasing.current ? 7.0 : 2.5);
                const targetVy = (dy / (dist || 1)) * (isChasing.current ? 7.0 : 2.5);

                const noise = isChasing.current ? 0.5 : 0.3;
                vel.current.vx += (targetVx - vel.current.vx) * 0.04 + (Math.random() - 0.5) * noise;
                vel.current.vy += (targetVy - vel.current.vy) * 0.04 + (Math.random() - 0.5) * noise;

                const maxSpeed = isChasing.current ? 8.0 : 4.0;
                const speed = Math.sqrt(vel.current.vx * vel.current.vx + vel.current.vy * vel.current.vy);
                if (speed > maxSpeed) {
                    vel.current.vx = (vel.current.vx / speed) * maxSpeed;
                    vel.current.vy = (vel.current.vy / speed) * maxSpeed;
                }

                pos.current.x += vel.current.vx;
                pos.current.y += vel.current.vy;

                if (!isChasing.current) {
                    if (pos.current.x < minX - 50) vel.current.vx += 1;
                    if (pos.current.x > maxX + 50) vel.current.vx -= 1;
                    if (pos.current.y < minY - 50) vel.current.vy += 1;
                    if (pos.current.y > maxY + 50) vel.current.vy -= 1;
                }

                if (Math.abs(lastPosRef.current.x - pos.current.x) > 0.1 || Math.abs(lastPosRef.current.y - pos.current.y) > 0.1) {
                    lastPosRef.current = { x: pos.current.x, y: pos.current.y };
                    containerRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
                }

                if (spriteRef.current) {
                    const isRun = isChasing.current;
                    let nextScale = lastScaleRef.current;
                    if (vel.current.vx < -0.05) {
                         nextScale = isRun ? '-1 1' : '1 1';
                    } else if (vel.current.vx > 0.05) {
                         nextScale = isRun ? '1 1' : '-1 1';
                    }
                    if (nextScale !== lastScaleRef.current) {
                         lastScaleRef.current = nextScale;
                         spriteRef.current.style.scale = nextScale;
                    }
                }
            }
            animationFrameId = requestAnimationFrame(roamLoop);
        };
        roamLoop();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    let spriteImage = '/images/pawmi/ai_mascot_idle_clean_strip_transparent.png';
    let tooltipObj = currentSectionObj;
    let extraAnimation = 'floatSmooth 3s ease-in-out infinite';
    
    const isHeroSection = currentSectionObj.text.includes('환영합니다') || currentSectionObj.text.includes('파우미야');

    if (isArrived) {
        spriteImage = '/images/pawmi/ai_mascot_dancing_clean_strip_transparent.png';
        tooltipObj = { text: '헤헤 도착! 2만 건의 데이터 기반 1:1 맞춤 피지컬 복지, 파우미가 곁에서 지켜드릴게요 💕', icon: <HeartPulse size={15} /> };
        extraAnimation = 'pawmiArriveWiggle 0.6s ease-in-out infinite';
    } else if (isChasingState) {
        spriteImage = '/images/pawmi/ai_mascot_running_clean_strip_transparent.png';
        tooltipObj = isHeroSection ? { text: '잡았다 요놈!! 다다다다', icon: <Flame size={15} /> } : currentSectionObj;
        extraAnimation = 'runSmooth 0.3s ease-in-out infinite';
    } else if (state === 'hover') {
        spriteImage = '/images/pawmi/ai_mascot_waving_strip_transparent.png';
        tooltipObj = isHeroSection ? { text: '더블클릭 하거나 Shift 키를 꾹 눌러보세요', icon: <Sparkles size={15} /> } : currentSectionObj;
        extraAnimation = 'none';
    } else if (state === 'click') {
        spriteImage = '/images/pawmi/ai_mascot_jumping_clean_strip_transparent.png';
        tooltipObj = isHeroSection ? { text: '얍!!', icon: <CheckCircle2 size={15} /> } : currentSectionObj;
        extraAnimation = 'jumpSmooth 0.5s ease-out';
    } else if (state === 'double_click') {
        spriteImage = '/images/pawmi/ai_mascot_dancing_clean_strip_transparent.png';
        tooltipObj = isHeroSection ? { text: '신난다!! 춤추자', icon: <Sparkles size={15} /> } : currentSectionObj;
        extraAnimation = 'danceSmooth 1s ease-in-out infinite';
    } else if (state === 'sleep') {
        spriteImage = '/images/pawmi/ai_mascot_sleeping_clean_strip_transparent.png';
        tooltipObj = isHeroSection ? { text: '쿨쿨... Zzz...', icon: <Activity size={15} /> } : currentSectionObj;
        extraAnimation = 'sleepSmooth 4s ease-in-out infinite';
    } else if (state === 'roam') {
        spriteImage = '/images/pawmi/ai_mascot_flying_clean_strip_transparent.png';
        tooltipObj = isHeroSection ? { text: '슈우웅~!', icon: <Navigation size={15} /> } : currentSectionObj;
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
                right: '120px',
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
                {isArrived && (
                    <div className="pawmi-arrived-particles" style={{
                        position: 'absolute',
                        top: '-25px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        pointerEvents: 'none',
                        zIndex: 200,
                        width: '100px',
                        height: '60px'
                    }}>
                        <span style={{ position: 'absolute', left: '15%', bottom: '0', fontSize: '20px', animation: 'floatParticleUp 1.2s ease-out infinite' }}>💕</span>
                        <span style={{ position: 'absolute', left: '75%', bottom: '5px', fontSize: '16px', animation: 'floatParticleUp 1.4s ease-out infinite 0.3s' }}>✨</span>
                        <span style={{ position: 'absolute', left: '45%', bottom: '0px', fontSize: '18px', animation: 'floatParticleUp 1.1s ease-out infinite 0.6s' }}>💖</span>
                    </div>
                )}
                <div className="mascot-tooltip" style={{
                    position: 'absolute',
                    top: 'auto',
                    bottom: (isArrived || isChasingState || state === 'hover' || state === 'click' || state === 'double_click' || state === 'sleep' || state === 'roam') ? 'calc(100% - 10px)' : 'calc(100% - 20px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'max-content',
                    maxWidth: '350px',
                    background: 'rgba(255, 255, 255, 0.98)',
                    padding: '9px 16px',
                    borderRadius: '16px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.9)',
                    fontSize: '13.5px',
                    fontWeight: '700',
                    color: '#1e293b',
                    willChange: 'opacity, transform',
                    opacity: (isArrived || isChasingState || state === 'hover' || state === 'click' || state === 'double_click' || state === 'sleep' || state === 'roam') ? 1 : 0,
                    transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.4px',
                    zIndex: 10
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', whiteSpace: 'nowrap' }}>
                        <span style={{ color: '#10b981', display: 'flex', alignItems: 'center' }}>{tooltipObj.icon}</span>
                        <span style={{ whiteSpace: 'nowrap' }}>{tooltipObj.text}</span>
                    </div>
                    <div className="tooltip-tail" style={{
                        position: 'absolute',
                        bottom: '-5px',
                        left: '50%',
                        transform: 'translateX(-50%) rotate(45deg)',
                        width: '10px',
                        height: '10px',
                        background: 'rgba(255, 255, 255, 0.96)',
                        borderRight: '1px solid rgba(255, 255, 255, 0.9)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.9)',
                        zIndex: -1
                    }} />
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
                    @keyframes pawmiArriveWiggle {
                        0% { transform: rotate(0deg) scale(1.15); }
                        25% { transform: rotate(-12deg) scale(1.2) translateY(-6px); }
                        50% { transform: rotate(0deg) scale(1.15); }
                        75% { transform: rotate(12deg) scale(1.2) translateY(-6px); }
                        100% { transform: rotate(0deg) scale(1.15); }
                    }
                    @keyframes floatParticleUp {
                        0% { opacity: 0; transform: translateY(10px) scale(0.6); }
                        30% { opacity: 1; transform: translateY(-5px) scale(1.1); }
                        80% { opacity: 0.8; transform: translateY(-25px) scale(1); }
                        100% { opacity: 0; transform: translateY(-40px) scale(0.8); }
                    }
                `}} />
            </div>
        </div>
    );
};

export default GlobalMascotSprite;
