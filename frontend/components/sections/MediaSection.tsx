'use client';

import React, { useEffect } from 'react';
import { useUI } from '@/context/UIContext';

const MediaSection = () => {
    const { mediaReports } = useUI();

    useEffect(() => {
        let swiperInstance: any = null;

        const initSwiper = () => {
            if (typeof (window as any).Swiper !== 'undefined') {
                swiperInstance = new (window as any).Swiper(".mediaSwiper", {
                    slidesPerView: 1, 
                    spaceBetween: 30, 
                    observer: true, 
                    observeParents: true,
                    pagination: {
                        el: ".media-swiper-pagination",
                        clickable: true
                    },
                    navigation: {
                        nextEl: ".media-swiper-button-next",
                        prevEl: ".media-swiper-button-prev"
                    }
                });
            } else {
                setTimeout(initSwiper, 200);
            }
        };

        initSwiper();

        return () => {
            if (swiperInstance && swiperInstance.destroy) {
                swiperInstance.destroy(true, true);
            }
        };
    }, [mediaReports]);

    const chunkArray = (arr: any[], size: number) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    };

    const defaultReports = [
        { id: 'def-1', url: '#', thumbnail_url: '', title: '기업 복지 트렌드, 이제는 맞춤형 피지컬케어 시대', published_at: '' },
        { id: 'def-2', url: '#', thumbnail_url: '', title: 'FaWW, AI 체형분석 도입으로 업계 혁신 선도', published_at: '' },
        { id: 'def-3', url: '#', thumbnail_url: '', title: '직장인 거북목 완화 프로젝트 성공 사례 조명', published_at: '' },
        { id: 'def-4', url: '#', thumbnail_url: '', title: '건강한 조직문화를 위한 필수 선택, EAP 솔루션', published_at: '' }
    ];

    const reportsToUse = mediaReports.length > 0 ? mediaReports : defaultReports;
    const chunks = chunkArray(reportsToUse, 8);

    return (
        <section className="media reveal" style={{ background: '#f8f9fa' }}>
            <div className="container" style={{ position: 'relative' }}>
                <h2 className="section-title reveal soft-reveal" style={{ marginBottom: '40px' }}>FaWW 미디어 보도</h2>
                
                <div className="swiper mediaSwiper" style={{ width: '100%', padding: '20px 50px 60px 50px', position: 'relative' }}>
                    <div className="swiper-wrapper">
                        {chunks.map((chunk, slideIndex) => (
                            <div key={slideIndex} className="swiper-slide">
                                <div className="media-grid">
                                    {chunk.map((media) => (
                                        <a key={media.id} href={media.url} target="_blank" rel="noopener noreferrer" className="media-item" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                            <div className="media-thumb" style={{ backgroundImage: media.thumbnail_url ? `url(${media.thumbnail_url})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                                {!media.thumbnail_url && "기사 썸네일 이미지"}
                                            </div>
                                            <div className="media-title">
                                                <div style={{ fontSize: '11px', color: '#2b8a3e', fontWeight: 'bold', marginBottom: '5px', opacity: 0.8 }}>{media.published_at ? media.published_at.split('T')[0] : ''}</div>
                                                {media.title}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pagination & Navigation */}
                    <div className="swiper-pagination media-swiper-pagination" style={{ bottom: '15px' }}></div>
                    <div className="swiper-button-prev media-swiper-button-prev" style={{ color: '#2b8a3e', left: '10px', top: 'calc(50% - 20px)' }}></div>
                    <div className="swiper-button-next media-swiper-button-next" style={{ color: '#2b8a3e', right: '10px', top: 'calc(50% - 20px)' }}></div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(MediaSection);
