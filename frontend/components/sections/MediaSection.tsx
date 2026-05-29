'use client';

import React from 'react';

interface MediaSectionProps {
    mediaReports: any[];
}

const MediaSection = ({ mediaReports }: MediaSectionProps) => {
    return (
        <section className="media reveal" style={{ background: '#f8f9fa' }}>
            <div className="container">
                <h2 className="section-title reveal soft-reveal">FaWW 미디어 보도</h2>
                <div className="media-grid reveal delay-2">
                    {mediaReports.length > 0 ? (
                        mediaReports.map((media) => (
                            <a key={media.id} href={media.url} target="_blank" rel="noopener noreferrer" className="media-item" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                <div className="media-thumb" style={{ backgroundImage: media.thumbnail_url ? `url(${media.thumbnail_url})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    {!media.thumbnail_url && "기사 썸네일 이미지"}
                                </div>
                                <div className="media-title">
                                    <div style={{ fontSize: '11px', color: '#2b8a3e', fontWeight: 'bold', marginBottom: '5px', opacity: 0.8 }}>{media.published_at ? media.published_at.split('T')[0] : ''}</div>
                                    {media.title}
                                </div>
                            </a>
                        ))
                    ) : (
                        <>
                            <div className="media-item"><div className="media-thumb">기사 썸네일 이미지</div><div className="media-title">기업 복지 트렌드, 이제는 맞춤형 피지컬케어 시대</div></div>
                            <div className="media-item"><div className="media-thumb">기사 썸네일 이미지</div><div className="media-title">FaWW, AI 체형분석 도입으로 업계 혁신 선도</div></div>
                            <div className="media-item"><div className="media-thumb">기사 썸네일 이미지</div><div className="media-title">직장인 거북목 완화 프로젝트 성공 사례 조명</div></div>
                            <div className="media-item"><div className="media-thumb">기사 썸네일 이미지</div><div className="media-title">건강한 조직문화를 위한 필수 선택, EAP 솔루션</div></div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MediaSection;
