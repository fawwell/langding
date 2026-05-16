'use client';

import React from 'react';

interface CenterDetailModalProps {
    center: any;
    onClose: () => void;
}

const CenterDetailModal = ({ center, onClose }: CenterDetailModalProps) => {
    if (!center) return null;

    return (
        <div className="center-modal-overlay active" onClick={onClose}>
            <div className="center-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="center-modal-close" onClick={onClose}>&times;</button>
                
                {/* 좌측 비주얼 */}
                <div className="center-modal-visual" style={{ 
                    backgroundImage: `url('${center.image_url || '/images/physical-care/001.jpg'}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                </div>

                {/* 우측 정보 */}
                <div className="center-modal-info">
                    <div className="center-modal-header">
                        <span className="center-modal-tag">{center.tagline}</span>
                        <h2 className="center-modal-title">{center.name}</h2>
                        <p className="center-modal-address" style={{ color: '#0ff', fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ fontSize: '16px' }}>📍</span> {center.address}
                        </p>
                        <p className="center-modal-philosophy">{center.philosophy}</p>
                    </div>

                    <div className="center-expert-section">
                        <h4 style={{ color: '#fff', marginBottom: '15px' }}>상주 전문가</h4>
                        <div className="expert-list-mini">
                            {center.experts && center.experts.map((exp: string, idx: number) => (
                                <div key={idx} className="expert-item-mini">
                                    <div className="expert-avatar-sm">{exp.charAt(0)}</div>
                                    <span style={{ color: '#ccc', fontSize: '14px' }}>{exp}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="center-modal-actions">
                        <a href={center.map_url} target="_blank" rel="noopener noreferrer" className="action-btn-naver btn-map">네이버 지도보기</a>
                        <a href={center.reserve_url} target="_blank" rel="noopener noreferrer" className="action-btn-naver btn-reserve">실시간 예약하기</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CenterDetailModal;
