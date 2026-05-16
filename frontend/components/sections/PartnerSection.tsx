'use client';

import React from 'react';

const PartnerSection = () => {
    const partnerLogos = [
        'ㄴ.png', 'ㅇ.jpg', '그림10.jpg', '그림11.png', '그림12.jpg', '그림13.jpg',
        '그림14.png', '그림15.jpg', '그림16.jpg', '그림17.png', '그림18.png', '그림19.png',
        '그림2.png', '그림20.jpg', '그림21.jpg', '그림22.png', '그림23.jpg', '그림24.png',
        '그림25.jpg', '그림26.jpg', '그림27.png', '그림28.png', '그림29.png', '그림3.jpg',
        '그림30.png', '그림31.png', '그림32.png', '그림33.png', '그림34.png', '그림35.png',
        '그림36.png', '그림37.png', '그림38.png', '그림39.png', '그림4.png', '그림40.png',
        '그림41.png', '그림42.png', '그림43.png', '그림44.png', '그림45.png', '그림46.png',
        '그림47.png', '그림48.png', '그림49.png', '그림5.jpg', '그림50.png', '그림51.png',
        '그림52.png', '그림53.png', '그림54.png', '그림55.png', '그림56.png', '그림57.png',
        '그림58.png', '그림59.png', '그림6.png', '그림7.jpg', '그림8.png', '그림9.jpg'
    ];

    return (
        <section className="partners reveal">
            <div className="container partner-flex-container">
                <div className="partner-content-group">
                    <h2 className="section-title reveal soft-reveal">대한민국 일류 기업과 학교들이 FaWW와 함께합니다</h2>
                    <div className="marquee-wrapper reveal delay-2">
                        <div className="marquee-container">
                            {[...Array(2)].map((_, i) => (
                                <React.Fragment key={i}>
                                    {partnerLogos.map((logo, idx) => (
                                        <div key={`${i}-${idx}`} className="partner-logo">
                                            <img src={`/images/partners/${logo}`} alt="Partner" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnerSection;
