'use client';

import React, { useState, useEffect } from 'react';

const GlobalMascotSprite = () => {
    const [state, setState] = useState<'default' | 'hover'>('default');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div 
            className="global-pawmi-sprite-container"
            onMouseEnter={() => setState('hover')}
            onMouseLeave={() => setState('default')}
            onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
                position: 'relative',
                zIndex: 9999,
                cursor: 'pointer',
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: state === 'hover' ? 'scale(1.15) translateY(-10px)' : 'scale(1) translateY(0)',
                willChange: 'transform'
            }}
        >
            <div className="mascot-tooltip" style={{
                position: 'absolute',
                top: state === 'hover' ? '-35px' : '-25px',
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
                opacity: state === 'hover' ? 1 : 0,
                transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.5px',
                zIndex: 2
            }}>
                안녕? 난 파우미야!
            </div>
            
            {/* 스프라이트 시트 애니메이션 레이어 */}
            <div className="pawmi-sprite" style={{
                width: '130px', /* Frame Width 260의 절반 (레티나 디스플레이 대비) */
                height: '130px',
                backgroundImage: 'url(/images/pawmi/pawmi_floating_sprite.png)',
                backgroundSize: '1560px 130px', /* 12 프레임 * 130px = 1560px */
                animation: 'playSprite 1.5s steps(12) infinite',
                filter: 'drop-shadow(0 8px 15px rgba(0,0,0,0.2))',
                willChange: 'background-position'
            }} />

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes playSprite {
                    100% { background-position: -1560px 0; }
                }
            `}} />
        </div>
    );
};

export default GlobalMascotSprite;
