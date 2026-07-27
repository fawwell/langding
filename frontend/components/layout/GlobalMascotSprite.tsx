'use client';

import React, { useState, useEffect } from 'react';

const GlobalMascotSprite = () => {
    const [state, setState] = useState<'default' | 'hover' | 'click'>('default');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    let spriteImage = '/images/pawmi/ai_mascot_strip_transparent.png';
    let tooltipText = '안녕? 난 파우미야!';
    
    if (state === 'hover') {
        spriteImage = '/images/pawmi/ai_mascot_waving_strip_transparent.png';
        tooltipText = '반가워요!';
    } else if (state === 'click') {
        spriteImage = '/images/pawmi/ai_mascot_jumping_strip_transparent.png';
        tooltipText = '맨 위로 가자!';
    }

    if (!isVisible) return null;

    return (
        <div 
            className="global-pawmi-sprite-container"
            onMouseEnter={() => state !== 'click' && setState('hover')}
            onMouseLeave={() => state !== 'click' && setState('default')}
            onClick={() => {
                setState('click');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => setState('hover'), 2000);
            }}
            style={{
                position: 'relative',
                zIndex: 9999,
                cursor: 'pointer',
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: state === 'hover' || state === 'click' ? 'scale(1.15) translateY(-10px)' : 'scale(1) translateY(0)',
                willChange: 'transform'
            }}
        >
            <div className="mascot-tooltip" style={{
                position: 'absolute',
                top: state === 'hover' || state === 'click' ? '-35px' : '-25px',
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
                opacity: state === 'hover' || state === 'click' ? 1 : 0,
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
                animation: 'playSprite 1s steps(4) infinite',
                willChange: 'background-position'
            }} />

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes playSprite {
                    100% { background-position: -520px 0; }
                }
            `}} />
        </div>
    );
};

export default GlobalMascotSprite;
