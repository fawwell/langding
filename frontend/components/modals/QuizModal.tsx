'use client';

import React from 'react';

interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    step: number;
    target: string;
    answers: Record<number, number>;
    onNextStep: (step: number, target: string) => void;
    onAnswer: (idx: number, val: number) => void;
    onSubmit: () => void;
    onReset: () => void;
    onOpenProposal: () => void;
    resultTitle: string;
    resultDesc: string;
    b2bQuestions: string[];
    b2cQuestions: string[];
}

const QuizModal = ({
    isOpen,
    onClose,
    step,
    target,
    answers,
    onNextStep,
    onAnswer,
    onSubmit,
    onReset,
    onOpenProposal,
    resultTitle,
    resultDesc,
    b2bQuestions,
    b2cQuestions
}: QuizModalProps) => {
    if (!isOpen) return null;

    const questions = target === 'b2b' ? b2bQuestions : b2cQuestions;

    return (
        <div className="modal active">
            <div className="modal-content quiz-modal-content" style={{ maxWidth: '500px', textAlign: 'center' }}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                
                {step === 1 && (
                    <div className="quiz-step active">
                        <span className="gateway-badge" style={{ background: '#e8f5e9', color: '#2b8a3e', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px' }}>STEP 1</span>
                        <div className="quiz-options" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '30px' }}>
                            <button className="quiz-btn" onClick={() => onNextStep(2, 'b2b')}>🏢 조직을 이끄는 HR/관리자 (조직 진단)</button>
                            <button className="quiz-btn" onClick={() => onNextStep(2, 'b2c')}>👤 내 몸 상태가 궁금한 직장인 (개인 자가진단)</button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="quiz-step active" style={{ textAlign: 'left' }}>
                        <span className="gateway-badge" style={{ background: '#e8f5e9', color: '#2b8a3e', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px' }}>STEP 2</span>
                        <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '15px 0' }}>{target === 'b2b' ? "우리 조직 진단 (12문항)" : "내 몸 상태 자가진단 (12문항)"}</h2>
                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>각 문항을 읽고 직관적으로 예/아니오를 선택해 주세요.</p>
                        <div className="quiz-questions-wrap" style={{ maxHeight: '50vh', overflowY: 'auto', paddingRight: '10px', marginBottom: '20px' }}>
                            {questions.map((q, idx) => (
                                <div key={idx} className="quiz-question-box" style={{ background: '#f8f9fa', padding: '15px', borderRadius: '10px', marginBottom: '10px', border: '1px solid #eee' }}>
                                    <div style={{ fontWeight: 'bold', color: '#2b8a3e', marginBottom: '8px' }}>Q{idx + 1}.</div>
                                    <div style={{ fontSize: '15px', color: '#333', marginBottom: '12px', lineHeight: '1.4' }}>{q}</div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button onClick={() => onAnswer(idx, 1)} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: answers[idx] === 1 ? '1px solid #2b8a3e' : '1px solid #ddd', background: answers[idx] === 1 ? '#e8f5e9' : '#fff', color: answers[idx] === 1 ? '#2b8a3e' : '#555', fontWeight: answers[idx] === 1 ? 'bold' : 'normal', cursor: 'pointer', transition: 'all 0.2s' }}>예</button>
                                        <button onClick={() => onAnswer(idx, 0)} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: answers[idx] === 0 ? '1px solid #d32f2f' : '1px solid #ddd', background: answers[idx] === 0 ? '#fce4e4' : '#fff', color: answers[idx] === 0 ? '#d32f2f' : '#555', fontWeight: answers[idx] === 0 ? 'bold' : 'normal', cursor: 'pointer', transition: 'all 0.2s' }}>아니오</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="form-submit-btn" style={{ width: '100%', padding: '18px', backgroundColor: '#2b8a3e', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 800, cursor: 'pointer' }} onClick={onSubmit}>결과 보기</button>
                    </div>
                )}

                {step === 3 && (
                    <div className="quiz-step active">
                        <div className="quiz-result-header" style={{ background: '#e8f5e9', padding: '30px', borderRadius: '16px', marginBottom: '20px' }}>
                            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎯</div>
                            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#2b8a3e' }}>담당자님을 위한 최적의 조합!</h3>
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '15px' }}>{resultTitle}</h2>
                        <p style={{ color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>{resultDesc}</p>
                        <button className="form-submit-btn" style={{ width: '100%', padding: '18px', backgroundColor: '#111', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 800, cursor: 'pointer' }} onClick={onOpenProposal}>이 구성으로 제안서 요청하기</button>
                        <button className="btn-outline" style={{ width: '100%', marginTop: '10px', padding: '14px 28px', borderRadius: '8px', fontWeight: 'bold', background: '#fff', color: '#2b8a3e', border: '1px solid #2b8a3e', cursor: 'pointer' }} onClick={onReset}>다시 하기</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizModal;
