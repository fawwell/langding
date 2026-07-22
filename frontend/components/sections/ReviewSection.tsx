'use client';

import React from 'react';
import { Building2, GraduationCap } from 'lucide-react';

interface ReviewSectionProps {
    reviewFilter: string;
    setReviewFilter: (filter: string) => void;
    reviewsData: any[];
}

const ReviewSection = ({ reviewFilter, setReviewFilter, reviewsData }: ReviewSectionProps) => {
    return (
        <section className="testimonials reveal" style={{ position: 'relative' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes reviewPawmiFloat {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-7px) rotate(-3deg); }
                }
                .review-pawmi-mascot {
                    width: 80px;
                    height: 80px;
                    object-fit: contain;
                    margin: 0 auto 10px auto;
                    display: block;
                    filter: drop-shadow(0 6px 12px rgba(0,0,0,0.15));
                    animation: reviewPawmiFloat 3.4s ease-in-out infinite;
                }
            `}} />
            <div className="container" style={{ textAlign: 'center' }}>
                <img 
                    src="/images/pawmi/pawmi_sleepy.png" 
                    alt="후기 파우미" 
                    className="review-pawmi-mascot soft-reveal"
                />
                <h2 className="section-title reveal soft-reveal">담당자가 99%만족한 FaWW의 솔루션</h2>
                <div className="review-filter-wrapper reveal delay-2" style={{ textAlign: 'center', marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button className={`review-filter-btn ${reviewFilter === 'all' ? 'active' : ''}`} onClick={() => setReviewFilter('all')}>전체 보기</button>
                    <button className={`review-filter-btn ${reviewFilter === 'b2b' ? 'active' : ''}`} onClick={() => setReviewFilter('b2b')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Building2 size={16} /> 기업/HR 담당자
                    </button>
                    <button className={`review-filter-btn ${reviewFilter === 'school' ? 'active' : ''}`} onClick={() => setReviewFilter('school')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <GraduationCap size={16} /> 학교/보건교사
                    </button>
                </div>

                <div className="swiper reviewSwiper" key={`${reviewsData.length}-${reviewFilter}`} style={{ marginTop: '40px', padding: '20px 50px', position: 'relative' }}>
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
                    {/* 좌우 네비게이션 화살표 단추 */}
                    <div className="swiper-button-prev review-swiper-button-prev" style={{ color: '#2b8a3e', left: '10px' }}></div>
                    <div className="swiper-button-next review-swiper-button-next" style={{ color: '#2b8a3e', right: '10px' }}></div>
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;
