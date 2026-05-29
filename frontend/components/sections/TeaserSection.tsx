'use client';

import React from 'react';

const TeaserSection = () => {
    return (
        <section className="teaser-section reveal">
            <div className="container text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                
                {/* Step 1: 담당자님 (Grey) */}
                <div className="teaser-text step-1 soft-reveal" 
                     style={{ color: '#888', marginBottom: '20px' }}>
                    담당자님,
                </div>
                
                {/* Step 2: 메인 슬로건 (Green & Black 강조) */}
                <div className="teaser-text step-2 soft-reveal" style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <span style={{ color: '#2b8a3e', fontWeight: 900 }}>사고 없는 현장</span>
                        <span style={{ color: '#111', fontWeight: 900 }}>과 </span>
                        <span style={{ color: '#2b8a3e', fontWeight: 900 }}>건강한 사무환경</span>
                        <span style={{ color: '#111', fontWeight: 900 }}>을 만드는</span>
                    </div>
                    <div>
                        <span style={{ color: '#111', fontWeight: 900 }}>산업안전보건의 파트너를 찾으시나요?</span>
                    </div>
                </div>

                {/* Step 3: 파우가 함께 하겠습니다 (Black) */}
                <div className="teaser-text step-3 soft-reveal" 
                     style={{ color: '#222', fontWeight: 800, marginBottom: '40px' }}>
                    파우(FaWW)가 함께 하겠습니다.
                </div>

                {/* Step 4: 알약 박스 (Pill Style) */}
                <div className="teaser-text step-4 soft-reveal" style={{ marginBottom: '60px' }}>
                    "피지컬케어 원조"로서 증명해온 결과를 보여드리겠습니다.
                </div>

                {/* Step 5: 소개합니다 (Light Grey) */}
                <div className="teaser-text step-5 soft-reveal" 
                     style={{ color: '#aaa', fontSize: '15px' }}>
                    지금부터 파우(FaWW)를 소개합니다. ▼
                </div>
            </div>
        </section>
    );
};

export default TeaserSection;
