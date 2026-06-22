'use client';

import React, { useState } from 'react';

interface CertificatesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CertificatesModal = ({ isOpen, onClose }: CertificatesModalProps) => {
    const [activeTab, setActiveTab] = useState<'female' | 'sme'>('female');

    if (!isOpen) return null;

    return (
        <div className="modal active" onClick={onClose}>
            <div className="modal-content cert-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                
                <div className="modal-header">
                    <h2>🏆 파우(FaWW) 공식 인증서</h2>
                    <p>공인 인증 기관에서 인증받은 신뢰할 수 있는 헬스케어 파트너입니다.</p>
                </div>

                {/* 탭 네비게이션 */}
                <div className="cert-tabs">
                    <button 
                        className={`cert-tab-btn ${activeTab === 'female' ? 'active' : ''}`}
                        onClick={() => setActiveTab('female')}
                    >
                        🙋‍♀️ 여성기업 확인서
                    </button>
                    <button 
                        className={`cert-tab-btn ${activeTab === 'sme' ? 'active' : ''}`}
                        onClick={() => setActiveTab('sme')}
                    >
                        🏢 중소기업 확인서
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
                                >
                                    🔍 원본 크게보기
                                </a>
                            </div>
                        </div>
                    )}

                    {activeTab === 'sme' && (
                        <div className="cert-viewer-container fade-in">
                            <div className="cert-image-wrapper pending">
                                <img 
                                    src="/images/sme_cert.png" 
                                    alt="중소기업 확인서" 
                                    className="cert-img blurred"
                                />
                                {/* 중소기업확인서 갱신중 오버레이 */}
                                <div className="cert-pending-overlay">
                                    <div className="pending-badge">
                                        <span className="pulse-dot"></span>
                                        갱신 심사 진행 중
                                    </div>
                                    <h3>중소기업확인서 재발급 대기 중</h3>
                                    <p>현재 기관 갱신 심사가 진행 중인 서류입니다.<br />완료되는 대로 새로운 인증서가 즉시 업데이트됩니다.</p>
                                </div>
                            </div>
                            <div className="cert-info-footer">
                                <span className="cert-badge-tag">발급처: 중소벤처기업부</span>
                                <button className="cert-download-btn disabled" disabled>
                                    🔒 심사 완료 후 조회 가능
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CertificatesModal;
