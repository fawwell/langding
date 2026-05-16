'use client';

import React from 'react';

interface ReviewSectionProps {
    reviewFilter: string;
    setReviewFilter: (filter: string) => void;
    reviewsData: any[];
}

const ReviewSection = ({ reviewFilter, setReviewFilter, reviewsData }: ReviewSectionProps) => {
    return (
        <section className="testimonials reveal">
            <div className="container">
                <h2 className="section-title reveal soft-reveal">담당자가 99%만족한 FaWW의 솔루션</h2>
                <div className="review-filter-wrapper reveal delay-2" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <button className={`review-filter-btn ${reviewFilter === 'all' ? 'active' : ''}`} onClick={() => setReviewFilter('all')}>전체 보기</button>
                    <button className={`review-filter-btn ${reviewFilter === 'b2b' ? 'active' : ''}`} onClick={() => setReviewFilter('b2b')}>🏢 기업/HR 담당자</button>
                    <button className={`review-filter-btn ${reviewFilter === 'school' ? 'active' : ''}`} onClick={() => setReviewFilter('school')}>🏫 학교/보건교사</button>
                </div>

                <div className="swiper reviewSwiper" key={`${reviewsData.length}-${reviewFilter}`} style={{ marginTop: '40px', padding: '20px 0' }}>
                    <div className="swiper-wrapper" id="review-wrapper">
                        {reviewsData.length > 0 ? (
                            reviewsData
                                .filter(rev => reviewFilter === 'all' || reviewFilter === rev.type)
                                .map((rev, index) => (
                                    <div key={index} className="swiper-slide">
                                        <div className="testimonial-card">
                                            <div className="stars">{rev.stars}</div>
                                            <p className="review-text">{rev.text}</p>
                                            <div className="reviewer-info">
                                                <div className="reviewer-avatar"></div>
                                                <span>{rev.reviewer}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px', color: '#999', width: '100%' }}>
                                등록된 고객 후기가 없습니다. 관리자 페이지에서 등록해 주세요.
                            </div>
                        )}
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;
