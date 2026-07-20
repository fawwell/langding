'use client';

import React, { useState } from 'react';
import { Award, UserCheck, Building2, Search } from 'lucide-react';

interface CertificatesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CertificatesModal({ isOpen, onClose }: CertificatesModalProps) {
    const [activeTab, setActiveTab] = useState<'female' | 'sme'>('female');

    if (!isOpen) return null;

    return (
        <div className="modal active" onClick={onClose}>
            <div className="modal-content cert-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                
                <div className="modal-header">
                    <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <Award size={26} className="text-emerald-600" />
                        파우(FaWW) 공식 인증서
                    </h2>
                    <p>공인 인증 기관에서 인증받은 신뢰할 수 있는 헬스케어 파트너입니다.</p>
                </div>

                {/* 탭 네비게이션 */}
                <div className="cert-tabs">
                    <button 
                        className={`cert-tab-btn ${activeTab === 'female' ? 'active' : ''}`}
                        onClick={() => setActiveTab('female')}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                        <UserCheck size={16} /> 여성기업 확인서
                    </button>
                    <button 
                        className={`cert-tab-btn ${activeTab === 'sme' ? 'active' : ''}`}
                        onClick={() => setActiveTab('sme')}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                        <Building2 size={16} /> 중소기업 확인서
                    </button>
                </div>

                {/* 탭 콘텐츠 */}
                <div className="cert-content-body">
                    {activeTab === 'female' && (
                        <div className="cert-viewer-container fade-in">
                            <div className="cert-image-wrapper">
                                <img 
                                    src="/images/female_business_cert.png" 
                                    alt="여성기업 확인서" 
                                    className="cert-img"
                                />
                            </div>
                            <div className="cert-info-footer">
                                <span className="cert-badge-tag">발급처: 중소벤처기업부</span>
                                <a 
                                    href="/images/female_business_cert.png" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="cert-download-btn"
                                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                                >
                                    <Search size={14} /> 원본 크게보기
                                </a>
                            </div>
                        </div>
                    )}

                    {activeTab === 'sme' && (
                        <div className="cert-viewer-container fade-in">
                            <div className="cert-image-wrapper">
                                <img 
                                    src="/images/sme_cert.png" 
                                    alt="중소기업 확인서" 
                                    className="cert-img"
                                />
                            </div>
                            <div className="cert-info-footer">
                                <span className="cert-badge-tag">발급처: 중소벤처기업부</span>
                                <a 
                                    href="/images/sme_cert.pdf" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="cert-download-btn"
                                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                                >
                                    <Search size={14} /> 원본 크게보기
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
