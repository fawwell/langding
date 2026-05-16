'use client';

import React from 'react';

interface ProposalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    phoneValue: string;
    onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    emailError: string;
    onEmailValidate: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inquiryText: string;
    setInquiryText: (text: string) => void;
    toggleSubModules: (e: React.MouseEvent<HTMLElement>) => void;
}

const ProposalModal = ({
    isOpen,
    onClose,
    onSubmit,
    phoneValue,
    onPhoneChange,
    emailError,
    onEmailValidate,
    inquiryText,
    setInquiryText,
    toggleSubModules
}: ProposalModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="modal active">
            <div className="modal-content modal-form-content">
                <button className="modal-close" onClick={onClose}>&times;</button>
                <div className="modal-header">
                    <h2>기업/학교 맞춤형 제안서 요청</h2>
                    <p>조직 환경에 알맞은 솔루션 제안서를 보내드립니다.</p>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="field-label">소속 <span>*</span></label>
                        <input type="text" name="company" className="form-control" required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div className="form-group">
                            <label className="field-label">담당자 <span>*</span></label>
                            <input type="text" name="manager" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label className="field-label">연락처 <span>*</span></label>
                            <input type="tel" name="phone" className="form-control" value={phoneValue} onChange={onPhoneChange} placeholder="010-0000-0000" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="field-label">이메일 <span>*</span></label>
                        <input type="email" name="email" className="form-control" onChange={onEmailValidate} placeholder="example@company.com" required />
                        {emailError && <div style={{ color: '#d32f2f', fontSize: '12px', marginTop: '5px', fontWeight: 'bold' }}>{emailError}</div>}
                    </div>
                    <div className="form-group">
                        <label className="field-label">임직원(또는 학생) 규모 <span>*</span></label>
                        <select className="form-control" name="scale" required>
                            <option value="">선택해주세요</option>
                            <option>50인 미만</option>
                            <option>50인 ~ 100인</option>
                            <option>100인 ~ 300인</option>
                            <option>300인 이상</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="field-label">희망 도입 파트 및 세부 항목 선택 (대분류 클릭 후 세부 선택)</label>
                        <div className="proposal-module-group" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                            <div className="proposal-block">
                                <div className="proposal-block-header" onClick={toggleSubModules}><span>▪ PART 1. 진단 (스마트 AI 체형분석)</span> <span className="toggle-icon">▼</span></div>
                                <div className="sub-modules" style={{ display: 'none', padding: '15px', borderTop: '1px solid #eaeaea', background: '#fafafa', flexDirection: 'column', gap: '10px' }}>
                                    <label className="checkbox-label"><input type="checkbox" name="sub_module" value="3D AI 스캐닝" /> 3D AI 스캐닝</label>
                                    <label className="checkbox-label"><input type="checkbox" name="sub_module" value="개별 리포트 전송 및 상담" /> 개별 리포트 전송 및 상담</label>
                                </div>
                            </div>
                            <div className="proposal-block">
                                <div className="proposal-block-header" onClick={toggleSubModules}><span>▪ PART 2. 케어 (1:1 피지컬 케어)</span> <span className="toggle-icon">▼</span></div>
                                <div className="sub-modules" style={{ display: 'none', padding: '15px', borderTop: '1px solid #eaeaea', background: '#fafafa', flexDirection: 'column', gap: '10px' }}>
                                    <label className="checkbox-label"><input type="checkbox" name="sub_module" value="1:1 맞춤형 피지컬 케어 파견" /> 1:1 맞춤형 피지컬 케어 파견</label>
                                </div>
                            </div>
                            <div className="proposal-block">
                                <div className="proposal-block-header" onClick={toggleSubModules}><span>▪ PART 3. 실습 (단체 운동 프로그램)</span> <span className="toggle-icon">▼</span></div>
                                <div className="sub-modules" style={{ display: 'none', padding: '15px', borderTop: '1px solid #eaeaea', background: '#fafafa', flexDirection: 'column', gap: '10px' }}>
                                    <label className="checkbox-label"><input type="checkbox" name="sub_module" value="오피스 단체 스트레칭" /> 오피스 단체 스트레칭</label>
                                    <label className="checkbox-label"><input type="checkbox" name="sub_module" value="기능성 운동 처방" /> 기능성 운동 처방</label>
                                </div>
                            </div>
                            <div className="proposal-block">
                                <div className="proposal-block-header" onClick={toggleSubModules}><span>▪ PART 4. 교육 (강의 프로그램)</span> <span className="toggle-icon">▼</span></div>
                                <div className="sub-modules" style={{ display: 'none', padding: '15px', borderTop: '1px solid #eaeaea', background: '#fafafa', flexDirection: 'column', gap: '10px' }}>
                                    <label className="checkbox-label"><input type="checkbox" name="sub_module" value="주요 질환 예방 특강" /> 주요 질환 예방 특강 (거북목 등)</label>
                                    <label className="checkbox-label"><input type="checkbox" name="sub_module" value="생활습관 개선 솔루션" /> 생활습관 개선 솔루션</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="field-label">주요 문의사항</label>
                        <textarea className="form-control" name="inquiry" value={inquiryText} onChange={(e) => setInquiryText(e.target.value)} placeholder="도입 목적이나 불편사항을 남겨주시면 더욱 정확한 제안이 가능합니다." style={{ minHeight: '100px' }} />
                    </div>
                    <button type="submit" className="form-submit-btn">선택한 파트로 제안서 요청하기</button>
                </form>
            </div>
        </div>
    );
};

export default ProposalModal;
