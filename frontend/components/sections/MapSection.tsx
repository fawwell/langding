'use client';

import React from 'react';

const MapSection = () => {
    return (
        <section className="map-section reveal">
            <div className="container">
                <h2 className="section-title reveal delay-1">전국 어디든, FaWW가 찾아갑니다</h2>
                <p className="section-desc reveal delay-2" style={{ marginBottom: '50px' }}>전국 주요 기업 및 학교 500곳 이상 누적 방문 달성</p>
                <div className="map-wrapper reveal delay-3">
                    <div className="map-marker" style={{ top: '25%', left: '35%' }}>
                        <div className="marker-btn">서울/경기 230곳</div>
                        <div className="marker-detail"><ul><li>대법원</li><li>국민건강보험공단</li><li>서울중부발전</li></ul></div>
                    </div>
                    <div className="map-marker" style={{ top: '40%', left: '60%' }}>
                        <div className="marker-btn">충청권 85곳</div>
                        <div className="marker-detail"><ul><li>히타치코리아</li><li>보령 한전kdn</li></ul></div>
                    </div>
                    <div className="map-marker" style={{ top: '75%', left: '75%' }}>
                        <div className="marker-btn">부산/경남 110곳</div>
                        <div className="marker-detail"><ul><li>창원지방법원</li><li>한국청소년활동진흥원</li><li>한울원자력발전소</li></ul></div>
                    </div>
                    <div className="map-marker" style={{ top: '60%', left: '40%' }}>
                        <div className="marker-btn">전라권 65곳</div>
                        <div className="marker-detail"><ul><li>나주 한전 kps</li><li>국가독성과학연구소</li></ul></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
