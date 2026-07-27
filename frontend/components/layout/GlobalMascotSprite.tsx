'use client';

import React, { useState, useEffect } from 'react';

const GlobalMascotSprite = () => {
    const [state, setState] = useState<'default' | 'hover' | 'click' | 'double_click' | 'sleep'>('default');
    const [isVisible, setIsVisible] = useState(false);

    // Initial appearance
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    // Idle timer for sleeping
    useEffect(() => {
        if (state !== 'default') return;
        const timer = setTimeout(() => {
            setState('sleep');
        }, 15000); 
        return () => clearTimeout(timer);
    }, [state]);

    let spriteImage = '/images/pawmi/ai_mascot_idle_clean_strip_transparent.png';
    let tooltipText = '안녕? 난 파우미야!';
    let extraAnimation = 'floatSmooth 3s ease-in-out infinite';
    
    if (state === 'hover') {
        spriteImage = '/images/pawmi/ai_mascot_waving_strip_transparent.png';
        tooltipText = '반가워요!';
        extraAnimation = 'none';
    } else if (state === 'click') {
        spriteImage = '/images/pawmi/ai_mascot_jumping_clean_strip_transparent.png';
        tooltipText = '위로 점프!';
        extraAnimation = 'jumpSmooth 0.5s ease-out';
    } else if (state === 'double_click') {
        spriteImage = '/images/pawmi/ai_mascot_dancing_clean_strip_transparent.png';
        tooltipText = '신난다!! 춤추자!!';
        extraAnimation = 'danceSmooth 1s ease-in-out infinite';
    } else if (state === 'sleep') {
        spriteImage = '/images/pawmi/ai_mascot_sleeping_clean_strip_transparent.png';
        tooltipText = '쿨쿨... Zzz...';
        extraAnimation = 'sleepSmooth 4s ease-in-out infinite';
    }

    if (!isVisible) return null;

    const handleMouseEnter = () => {
        if (state !== 'click' && state !== 'double_click') setState('hover');
    };

    const handleMouseLeave = () => {
        if (state !== 'click' && state !== 'double_click') setState('default');
    };

    const handleClick = () => {
        if (state === 'double_click') return;
        setState('click');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setState('hover'), 2000);
    };

    const handleDoubleClick = () => {
        setState('double_click');
        setTimeout(() => setState('hover'), 3000);
    };

    return (
        <div 
            className="global-pawmi-sprite-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            style={{
                position: 'relative',
                zIndex: 9999,
                cursor: 'pointer',
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: (state === 'hover' || state === 'click' || state === 'double_click') ? 'scale(1.15) translateY(-10px)' : 'scale(1) translateY(0)',
                willChange: 'transform'
            }}
        >
            <div className="mascot-tooltip" style={{
                position: 'absolute',
                top: (state === 'hover' || state === 'click' || state === 'double_click' || state === 'sleep') ? '-35px' : '-25px',
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
                opacity: (state === 'hover' || state === 'click' || state === 'double_click' || state === 'sleep') ? 1 : 0,
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
    );
};

export default GlobalMascotSprite;
