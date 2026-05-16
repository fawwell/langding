'use client';

import React from 'react';

interface InfoModalsProps {
    activeModal: string;
    onClose: () => void;
}

const InfoModals = ({ activeModal, onClose }: InfoModalsProps) => {
    if (!['modal1', 'modal2', 'modal3', 'modal4'].includes(activeModal)) return null;

    return (
        <div className="modal active">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>&times;</button>
                
                {activeModal === 'modal1' && (
                    <>
                        <div className="modal-header">
                            <h2>PART 1. 진단 파트</h2>
                            <p>조직 파악을 위한 데이터 진단 파트</p>
                        </div>
                        <div className="info-sub-block-grid">
                            <div className="info-sub-block">
                                <span className="info-sub-block-num">파트 1-1</span>
                                <div className="info-sub-block-title">3D AI 스캐닝</div>
                                <p className="info-sub-block-desc">근골격계 관절의 정렬 상태 및 신체 불균형을 즉각적으로 수치화하여 객관적인 데이터를 확보합니다.</p>
                            </div>
                            <div className="info-sub-block">
                                <span className="info-sub-block-num">파트 1-2</span>
                                <div className="info-sub-block-title">개별 리포트 전송 및 상담</div>
                                <p className="info-sub-block-desc">거북목, 골반 틀어짐 등 분석된 결과지를 모바일로 전송하고, 전문가의 1:1 약식 상담을 진행합니다.</p>
                            </div>
                        </div>
                    </>
                )}

                {activeModal === 'modal2' && (
                    <>
                        <div className="modal-header">
                            <h2>PART 2. 메인 케어 파트</h2>
                        </div>
                        <div className="info-sub-block signature-card">
                            <span className="info-sub-block-num">시그니처 프로그램</span>
                            <div className="info-sub-block-title">1:1 맞춤형 피지컬 케어</div>
                            <p className="info-sub-block-desc">국내 최고 수준의 피지컬케어 전문가가 기업 현장에 직접 파견됩니다.</p>
                        </div>
                    </>
                )}

                {activeModal === 'modal4' && (
                    <>
                        <div className="modal-header">
                            <h2>PART 3. 단체 운동 파트</h2>
                        </div>
                        <div className="info-sub-block-grid">
                            <div className="info-sub-block">
                                <span className="info-sub-block-num">파트 3-1</span>
                                <div className="info-sub-block-title">오피스 단체 스트레칭</div>
                            </div>
                            <div className="info-sub-block">
                                <span className="info-sub-block-num">파트 3-2</span>
                                <div className="info-sub-block-title">기능성 운동 처방</div>
                            </div>
                        </div>
                    </>
                )}

                {activeModal === 'modal3' && (
                    <>
                        <div className="modal-header">
                            <h2>PART 4. 강의 파트</h2>
                        </div>
                        <div className="info-sub-block-grid">
                            <div className="info-sub-block">
                                <span className="info-sub-block-num">파트 4-1</span>
                                <div className="info-sub-block-title">주요 질환 예방 특강</div>
                            </div>
                            <div className="info-sub-block">
                                <span className="info-sub-block-num">파트 4-2</span>
                                <div className="info-sub-block-title">생활습관 개선 솔루션</div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InfoModals;
