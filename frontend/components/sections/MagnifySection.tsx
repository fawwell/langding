'use client';

import React from 'react';

const MagnifySection = () => {
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
                    }}>스마트 AI 기술</span>은 신체 불균형을 정밀하게 측정하여<br />눈에 보이지 않는 통증의 원인을 찾아냅니다.
                </p>
                <div className="magnify-container reveal delay-4">
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

export default MagnifySection;
