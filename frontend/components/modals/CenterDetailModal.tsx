'use client';

import React from 'react';
import { MapPin } from 'lucide-react';

interface CenterDetailModalProps {
    center: any;
    onClose: () => void;
}

const CenterDetailModal = ({ center, onClose }: CenterDetailModalProps) => {
    if (!center) return null;

    return (
        <div className="modal active" onClick={onClose}>
            <div className="modal-content center-detail-modal-content" onClick={(e) => e.stopPropagation()} style={{ width: '92%', maxWidth: '1050px', maxHeight: '88vh', display: 'flex', gap: '0', padding: '0', overflow: 'hidden', borderRadius: '32px', background: '#0e1015', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 30px 90px rgba(0,0,0,0.6)' }}>
                <button className="modal-close" onClick={onClose} style={{ zIndex: 10, color: '#fff', top: '20px', right: '20px', fontSize: '32px' }}>&times;</button>
                
                {/* 좌측 이미지 */}
                <div className="center-modal-img-wrapper" style={{
                    flex: '1.1',
                    minHeight: '450px',
                    backgroundImage: `url('${center.image_url || '/images/physical-care/001.webp'}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                </div>

                {/* 우측 정보 */}
                <div className="center-modal-info" style={{ flex: '1.2', padding: '45px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowY: 'auto', background: '#111318' }}>
                    <div>
                        <div className="center-modal-header" style={{ marginBottom: '25px' }}>
                            <span className="center-modal-tag" style={{ background: 'rgba(0,255,100,0.1)', color: '#00ff66', border: '1px solid rgba(0,255,100,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', display: 'inline-block', marginBottom: '12px' }}>{center.tagline || '공식 인증 피지컬 케어 센터'}</span>
                            <h2 className="center-modal-title" style={{ fontSize: '32px', color: '#fff', fontWeight: 900, marginBottom: '10px', letterSpacing: '-0.5px' }}>{center.name}</h2>
                            <p className="center-modal-address" style={{ color: '#00e5ff', fontSize: '15px', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <MapPin size={18} /> {center.address}
                            </p>
                            <p className="center-modal-philosophy" style={{ color: '#ccc', fontSize: '15px', lineHeight: '1.7', whiteSpace: 'pre-line' }}>{center.philosophy}</p>
                        </div>

                        <div className="center-expert-section" style={{ marginBottom: '30px' }}>
                            <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: 800, marginBottom: '14px' }}>상주 전문가</h4>
                            <div className="expert-list-mini" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {center.experts && center.experts.map((exp: string, idx: number) => (
                                    <div key={idx} className="expert-chip" style={{ background: 'rgba(255,255,255,0.08)', color: '#ddd', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', border: '1px solid rgba(255,255,255,0.1)' }}>{exp}</div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="center-modal-actions" style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                        <a href={center.map_url} target="_blank" rel="noopener noreferrer" className="action-btn-naver btn-map" style={{ flex: 1, textAlign: 'center', padding: '16px', borderRadius: '12px', background: '#22252d', color: '#fff', fontWeight: 'bold', textDecoration: 'none', fontSize: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>네이버 지도보기</a>
                        <a href={center.reserve_url} target="_blank" rel="noopener noreferrer" className="action-btn-naver btn-reserve" style={{ flex: 1, textAlign: 'center', padding: '16px', borderRadius: '12px', background: '#2b8a3e', color: '#fff', fontWeight: 'bold', textDecoration: 'none', fontSize: '15px' }}>실시간 예약하기</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CenterDetailModal;
