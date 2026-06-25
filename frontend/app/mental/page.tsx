'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import './mental_style.css';

// 퀴즈/진단 결과 패키지 목록 인터페이스
interface RecommendProgram {
  title: string;
  icon: string;
  desc: string;
}

export default function MentalCoachingPage() {
  // 1. 자가진단 상태 관리
  const [diagStep, setDiagStep] = useState<number>(1); // 1: 직무군 선택, 2: 상세 질문, 3: 결과
  const [jobType, setJobType] = useState<'office' | 'field' | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [stressValue, setStressValue] = useState<number>(0);
  const [recommendedList, setRecommendedList] = useState<RecommendProgram[]>([]);

  // 2. 상담 프로그램 탭 상태 관리
  const [activeTab, setActiveTab] = useState<'job-counseling' | 'personal-counseling'>('job-counseling');

  // 3. 신청서 제출 성공 모달 상태 관리
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // 4. 신청서 입력 필드 상태 관리
  const [formData, setFormData] = useState({
    companyName: '',
    managerName: '',
    email: '',
    phone: '',
    empCount: '100-300',
    jobType: 'office-main',
    memo: '',
    agreePrivacy: false,
  });

  // 직무군 선택 핸들러
  const handleJobSelect = (type: 'office' | 'field') => {
    setJobType(type);
    setSelectedSymptoms([]);
    setDiagStep(2);
  };

  // 체크박스 클릭 핸들러
  const handleSymptomChange = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  // 진단 제출 핸들러 (결과 계산 및 가중치 반영)
  const handleSubmitDiagnosis = () => {
    const symptomCount = selectedSymptoms.length;
    let baseStress = 30; // 기본 스트레스
    let calculatedStress = baseStress + (symptomCount * 15) + Math.floor(Math.random() * 10);
    if (calculatedStress > 100) calculatedStress = 100;
    setStressValue(calculatedStress);

    // 맞춤형 솔루션 동적 카드 구성
    const recommendations: RecommendProgram[] = [];
    if (jobType === 'office') {
      if (selectedSymptoms.includes('burnout')) {
        recommendations.push({
          title: '마인드풀니스 & 번아웃 릴랙스',
          icon: 'fa-brain',
          desc: '반복되는 고강도 모니터 근무로 고갈된 마인드를 1대1 심리 상담과 이완 명상으로 정화하는 프로그램',
        });
      }
      if (selectedSymptoms.includes('vdt')) {
        recommendations.push({
          title: '피지컬 & 멘탈 더블케어 패키지',
          icon: 'fa-dumbbell',
          desc: '목·어깨 물리치료 테라피(피지컬)와 직무 스트레스 완화 코칭(멘탈)을 동시에 제공해 효율을 2배로 극대화',
        });
      }
      if (recommendations.length === 0) {
        recommendations.push({
          title: '오피스 멘탈 가드닝 코칭',
          icon: 'fa-seedling',
          desc: '사무실에서 실천할 수 있는 가벼운 스트레칭과 정서 안정 멘탈 피드백 제공 솔루션',
        });
      }
    } else if (jobType === 'field') {
      if (selectedSymptoms.includes('sleep') || selectedSymptoms.includes('physical')) {
        recommendations.push({
          title: '수면 및 만성피로 리셋 프로그램',
          icon: 'fa-bed',
          desc: '교대근무 및 육체 반복 운동 스트레스에 지친 몸과 뇌에 깊은 휴식을 주는 수면 코칭',
        });
      }
      if (selectedSymptoms.includes('safety') || selectedSymptoms.includes('emotion')) {
        recommendations.push({
          title: '감정 보호 및 안전 안심 솔루션',
          icon: 'fa-shield-halved',
          desc: '사고 압박으로 인한 정서불안을 극복하고, 감정 소모를 해소해주는 멘탈 강화 심리 트레이닝',
        });
      }
      if (recommendations.length === 0) {
        recommendations.push({
          title: '현장직 활력 웰니스 케어',
          icon: 'fa-heart-pulse',
          desc: '관절 피로 케어와 임상 전문가의 회복 탄력성 강의가 결합된 종합 현장 EAP 코스',
        });
      }
    }

    // 항상 최소 2개의 카드가 보이도록 디폴트 솔루션 추가
    if (recommendations.length < 2) {
      recommendations.push({
        title: '조직 문화 활력 진단 리포트',
        icon: 'fa-chart-pie',
        desc: '임직원들의 전체 스트레스 통계를 추출하고 조직 스트레스 유발 요인을 진단해주는 HR 솔루션',
      });
    }

    setRecommendedList(recommendations);
    setDiagStep(3);
  };

  // 다시 진단하기
  const handleRestart = () => {
    setDiagStep(1);
    setJobType(null);
    setSelectedSymptoms([]);
    setStressValue(0);
    setRecommendedList([]);
  };

  // 도입 문의 신청서 제출 핸들러
  const handleApplySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.agreePrivacy) {
      alert('개인정보 수집 및 이용약관 동의가 필요합니다.');
      return;
    }
    // 여기에 실제 백엔드 연동(fetch) 추가 가능
    // 현재는 성공 모달을 노출하는 목적으로 Mock 처리
    setShowSuccessModal(true);
  };

  // 성공 모달 닫기
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // 폼 초기화
    setFormData({
      companyName: '',
      managerName: '',
      email: '',
      phone: '',
      empCount: '100-300',
      jobType: 'office-main',
      memo: '',
      agreePrivacy: false,
    });
  };

  return (
    <div className="mental-page-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-glow"></div>
        <div className="container">
          <div className="hero-container">
            <div className="hero-content">
              <span className="badge">NEW 멘탈코칭 EAP 출시</span>
              <h1>
                몸과 마음의
                <br />
                <span className="highlight">완전한 균형</span>이 만드는
                <br />
                건강한 몰입
              </h1>
              <p className="hero-subtitle">
                업계 최초 피지컬 케어와 멘탈 코칭의 토탈 시너지 EAP.
                <br />
                우리 임직원에게 딱 맞는 진단과 맞춤 케어로 이직률은 낮추고 업무 효율은 높이세요.
              </p>
              <div className="hero-cta-buttons">
                <a href="#diagnosis" className="btn-primary">
                  1분 맞춤 진단 체험
                </a>
                <a href="#apply" className="btn-secondary">
                  소개서 다운로드
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="visual-card-wrapper">
                <div className="glass-card main-visual-card">
                  <div className="card-header">
                    <span className="status-indicator">ON AIR</span>
                    <span className="user-count">
                      <i className="fa-solid fa-users"></i> 4,200+ 임직원 케어 중
                    </span>
                  </div>
                  <div className="mascot-area">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/faww_mascot.png"
                      alt="파우미 마스코트"
                      className="mascot-img animate-bounce"
                      onError={(e) => {
                        // 파우미 마스코트 이미지가 누락되었을 때의 대체 처리
                        (e.target as HTMLImageElement).src = '/images/%ED%8C%8C%EC%9A%B0%EB%AF%B8.png';
                      }}
                    />
                    <div className="speech-bubble">"오늘 하루 마음의 날씨는 어떤가요?"</div>
                  </div>
                  <div className="metric-grid">
                    <div className="metric-item">
                      <span className="metric-num">94.8%</span>
                      <span className="metric-label">서비스 만족도</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-num">-32.4%</span>
                      <span className="metric-label">스트레스 지수 감소</span>
                    </div>
                  </div>
                </div>
                <div className="glass-card floating-card card-left">
                  <i className="fa-solid fa-brain-circuit brain-icon"></i>
                  <div>
                    <h4>실시간 스트레스 케어</h4>
                    <p>업무 피로도 즉시 완화</p>
                  </div>
                </div>
                <div className="glass-card floating-card card-right">
                  <i className="fa-solid fa-hand-holding-heart heart-icon"></i>
                  <div>
                    <h4>1:1 심리상담 매칭</h4>
                    <p>전문 코치 상시 대기</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Vision Section */}
      <section id="vision" className="vision-section">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">TOTAL WELLNESS EAP</span>
            <h2>왜 파우(FaWW) 멘탈코칭일까요?</h2>
            <p className="section-desc">
              몸과 마음은 하나로 연결되어 있습니다. 신체 통증 케어와 마음 치유를 동시에 해결하는 파우만의 2-Way EAP 솔루션입니다.
            </p>
          </div>

          <div className="vision-grid">
            <div className="vision-card glass-card">
              <div className="card-icon-box">
                <i className="fa-solid fa-dumbbell"></i>
              </div>
              <h3>FaWW Physical Care</h3>
              <p className="brand-link">기존 근골격계 테라피 서비스</p>
              <ul className="vision-list">
                <li>
                  <i className="fa-solid fa-circle-check"></i> 장시간 좌식 근무에 따른 목/허리 케어
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i> 현장직 맞춤 관절 및 피로 회복 케어
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i> 1대1 맞춤형 수기 마사지 및 체형 교정
                </li>
              </ul>
            </div>
            <div className="vision-connector">
              <div className="arrow-container">
                <span className="plus-sign">
                  <i className="fa-solid fa-plus"></i>
                </span>
                <p>신체와 정신의 결합</p>
              </div>
            </div>
            <div className="vision-card glass-card highlighted-vision">
              <div className="card-icon-box">
                <i className="fa-solid fa-brain"></i>
              </div>
              <h3>FaWW Mental Coaching</h3>
              <p className="brand-link">NEW 심리 멘탈코칭 서비스</p>
              <ul className="vision-list">
                <li>
                  <i className="fa-solid fa-circle-check"></i> 직무 스트레스 및 번아웃 예방 코칭
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i> 심리 불안, 대인관계, 정서 치유 상담
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i> 조직 진단 및 리포트 제공
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnosis Section */}
      <section id="diagnosis" className="diagnosis-section">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">INTERACTIVE TEST</span>
            <h2>우리 기업 유형에 맞는 EAP 진단</h2>
            <p className="section-desc">
              임직원의 직무 환경에 따라 스트레스의 요인은 전혀 다릅니다. 우리 회사 직무 유형을 선택하고 1분 진단을 체험해보세요.
            </p>
          </div>

          <div className="diagnosis-box glass-card">
            {/* Step 1: 직무군 선택 */}
            {diagStep === 1 && (
              <div className="diag-step" id="diag-step-1">
                <h3>Q1. 귀사 임직원들의 주요 근무 형태를 선택해주세요.</h3>
                <div class="job-type-selection">
                  <div className="job-card" onClick={() => handleJobSelect('office')}>
                    <div className="job-icon">
                      <i className="fa-solid fa-laptop-code"></i>
                    </div>
                    <h4>사무직군</h4>
                    <p>주로 본사, IT, 디자인, 관리 등 실내 모니터 작업 및 좌식 업무 중심</p>
                  </div>
                  <div className="job-card" onClick={() => handleJobSelect('field')}>
                    <div className="job-icon">
                      <i className="fa-solid fa-helmet-safety"></i>
                    </div>
                    <h4>현장직군</h4>
                    <p>제조, 물류, 건설, 고객응대, 교대근무 및 육체 활동 중심</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: 사무직용 질문 */}
            {diagStep === 2 && jobType === 'office' && (
              <div className="diag-step" id="diag-step-office">
                <h3>사무직 임직원들이 최근 가장 많이 호소하는 증상은 무엇인가요?</h3>
                <p className="diag-instruction">해당되는 요소를 모두 선택해주세요.</p>
                <div className="symptom-grid">
                  {[
                    { id: 'burnout', label: '만성 무기력함 및 번아웃(업무 의욕 급감)' },
                    { id: 'relation', label: '팀원/부서 간 커뮤니케이션 단절 및 갈등' },
                    { id: 'vdt', label: 'VDT 증후군(목, 허리 통증)과 동반되는 스트레스' },
                    { id: 'role', label: '역할 모호성 및 커리어 진로 불안' },
                  ].map((s) => (
                    <label className="symptom-item" key={s.id}>
                      <input
                        type="checkbox"
                        checked={selectedSymptoms.includes(s.id)}
                        onChange={() => handleSymptomChange(s.id)}
                      />
                      <span className="checkbox-custom"></span>
                      <span className="symptom-text">{s.label}</span>
                    </label>
                  ))}
                </div>
                <div className="diag-buttons">
                  <button className="btn-back btn-secondary" onClick={() => setDiagStep(1)}>
                    <i className="fa-solid fa-arrow-left"></i> 이전으로
                  </button>
                  <button
                    className="btn-next btn-primary"
                    id="btn-submit-office"
                    onClick={handleSubmitDiagnosis}
                  >
                    진단 결과 보기 <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: 현장직용 질문 */}
            {diagStep === 2 && jobType === 'field' && (
              <div className="diag-step" id="diag-step-field">
                <h3>현장직 임직원들이 최근 가장 많이 겪는 어려움은 무엇인가요?</h3>
                <p className="diag-instruction">해당되는 요소를 모두 선택해주세요.</p>
                <div className="symptom-grid">
                  {[
                    { id: 'sleep', label: '교대근무로 인한 만성 피로 및 수면 장애' },
                    { id: 'safety', label: '사고 및 작업 안전에 대한 심리적 압박·불안' },
                    { id: 'emotion', label: '고객 응대 및 현장 마찰로 인한 심각한 감정 소모' },
                    { id: 'physical', label: '반복 동작에 의한 육체적 스트레스와 무기력' },
                  ].map((s) => (
                    <label className="symptom-item" key={s.id}>
                      <input
                        type="checkbox"
                        checked={selectedSymptoms.includes(s.id)}
                        onChange={() => handleSymptomChange(s.id)}
                      />
                      <span className="checkbox-custom"></span>
                      <span className="symptom-text">{s.label}</span>
                    </label>
                  ))}
                </div>
                <div className="diag-buttons">
                  <button className="btn-back btn-secondary" onClick={() => setDiagStep(1)}>
                    <i className="fa-solid fa-arrow-left"></i> 이전으로
                  </button>
                  <button
                    className="btn-next btn-primary"
                    id="btn-submit-field"
                    onClick={handleSubmitDiagnosis}
                  >
                    진단 결과 보기 <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: 결과 페이지 */}
            {diagStep === 3 && (
              <div className="diag-step" id="diag-result">
                <div className="result-header">
                  <div className="result-badge">진단 분석 완료</div>
                  <h3 id="result-title">귀사 맞춤형 EAP 추천 솔루션</h3>
                </div>

                <div className="result-content-box">
                  <div className="result-analysis">
                    <h4>임직원 상태 예측</h4>
                    <p id="result-desc">
                      {jobType === 'office'
                        ? '사무직의 경우 반복되는 집중 모니터 근무로 감정 억제와 신체 통증이 중첩된 "심리 피로 경보" 상태에 접어들기 쉽습니다.'
                        : '현장직의 경우 반복되는 신체 노동 및 긴장되는 근무 주기로 인해 수면 및 근육 피로를 동반한 "신체/감정 스트레스 주의" 단계입니다.'}
                    </p>

                    <div className="gauge-container">
                      <span className="gauge-label">예상 스트레스 지수</span>
                      <div className="gauge-bar-bg">
                        <div className="gauge-bar-fill" style={{ width: `${stressValue}%` }}></div>
                      </div>
                      <span className="gauge-val" id="stress-val">
                        {stressValue}%
                      </span>
                    </div>
                  </div>

                  <div className="recommended-programs">
                    <h4>추천 FaWW EAP 패키지</h4>
                    <div className="recommend-cards" id="recommend-cards-container">
                      {recommendedList.map((rec, index) => (
                        <div className="recommend-item" key={index}>
                          <h5>
                            <i className={`fa-solid ${rec.icon}`}></i> {rec.title}
                          </h5>
                          <p>{rec.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="diag-buttons">
                  <button className="btn-restart btn-secondary" onClick={handleRestart}>
                    <i className="fa-solid fa-rotate-left"></i> 다시 진단하기
                  </button>
                  <a href="#apply" className="btn-primary">
                    이 솔루션으로 상세 견적 문의하기 <i className="fa-solid fa-paper-plane"></i>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Program Details Section */}
      <section id="programs" className="programs-section">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">OUR PROGRAMS</span>
            <h2>직무와 개인을 관통하는 2-Way 프로그램</h2>
            <p className="section-desc">
              회사 내에서의 성장을 도모하는 직무 상담과, 온전한 일상의 회복을 돕는 개인 상담을 균형 있게 운영합니다.
            </p>
          </div>

          {/* 탭 내비게이션 */}
          <div className="tab-nav">
            <button
              className={`btn-tab ${activeTab === 'job-counseling' ? 'active' : ''}`}
              onClick={() => setActiveTab('job-counseling')}
            >
              <i className="fa-solid fa-briefcase"></i> 직무 상담 (Work-focused)
            </button>
            <button
              className={`btn-tab ${activeTab === 'personal-counseling' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal-counseling')}
            >
              <i className="fa-solid fa-user-shield"></i> 개인 상담 (Personal)
            </button>
          </div>

          {/* 탭 컨텐츠 */}
          <div className="tab-content-container">
            {/* 직무 상담 탭 */}
            <div className={`tab-panel-item ${activeTab === 'job-counseling' ? 'active' : ''}`}>
              <div className="program-grid">
                <div className="program-card glass-card">
                  <div
                    className="card-img-placeholder"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                  >
                    <i className="fa-solid fa-fire-extinguisher"></i>
                  </div>
                  <div className="card-body">
                    <h3>직무 스트레스 & 번아웃 케어</h3>
                    <p>
                      업무 과부하로 열정을 상실한 임직원에게 에너지를 충전하고 업무 몰입도를 회복하도록 지원합니다.
                    </p>
                    <div className="tag-group">
                      <span>#번아웃예방</span>
                      <span>#마인드풀니스</span>
                      <span>#스트레스완화</span>
                    </div>
                  </div>
                </div>
                <div className="program-card glass-card">
                  <div
                    className="card-img-placeholder"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}
                  >
                    <i className="fa-solid fa-comments"></i>
                  </div>
                  <div className="card-body">
                    <h3>직장 내 커뮤니케이션 갈등 해결</h3>
                    <p>
                      동료 또는 상사와의 소통 부재, 의견 갈등을 긍정적인 방향으로 해소하도록 돕는 대화법 코칭입니다.
                    </p>
                    <div className="tag-group">
                      <span>#대인관계</span>
                      <span>#소통스킬</span>
                      <span>#갈등조정</span>
                    </div>
                  </div>
                </div>
                <div className="program-card glass-card">
                  <div
                    className="card-img-placeholder"
                    style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}
                  >
                    <i className="fa-solid fa-compass"></i>
                  </div>
                  <div className="card-body">
                    <h3>커리어 성장 & 역할 코칭</h3>
                    <p>
                      불명확한 역할 지정을 조율하고, 향후 커리어 설계 및 진로 불안감을 해소해 직무 애착을 높입니다.
                    </p>
                    <div className="tag-group">
                      <span>#리더십개발</span>
                      <span>#역할명확화</span>
                      <span>#커리어로드맵</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 개인 상담 탭 */}
            <div className={`tab-panel-item ${activeTab === 'personal-counseling' ? 'active' : ''}`}>
              <div className="program-grid">
                <div className="program-card glass-card">
                  <div
                    className="card-img-placeholder"
                    style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)' }}
                  >
                    <i className="fa-solid fa-heart-pulse"></i>
                  </div>
                  <div className="card-body">
                    <h3>정서적 안정을 위한 심리 상담</h3>
                    <p>
                      우울, 불안, 공황 등 겉으로 드러내기 힘든 심리적 통증에 대해 전문 임상심리사가 1:1 맞춤 치유를 진행합니다.
                    </p>
                    <div className="tag-group">
                      <span>#우울불안케어</span>
                      <span>#감정정화</span>
                      <span>#마음건강검진</span>
                    </div>
                  </div>
                </div>
                <div className="program-card glass-card">
                  <div
                    className="card-img-placeholder"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}
                  >
                    <i className="fa-solid fa-people-roof"></i>
                  </div>
                  <div className="card-body">
                    <h3>대인 및 가족 갈등 솔루션</h3>
                    <p>
                      부부, 자녀, 연인 등 사적인 인간관계에서 오는 감정적 균열을 다독여 임직원의 일상 안정성을 지켜줍니다.
                    </p>
                    <div className="tag-group">
                      <span>#가족상담</span>
                      <span>#자녀양육코칭</span>
                      <span>#관계회복</span>
                    </div>
                  </div>
                </div>
                <div className="program-card glass-card">
                  <div
                    className="card-img-placeholder"
                    style={{ background: 'linear-gradient(135deg, #14b8a6, #f59e0b)' }}
                  >
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <div className="card-body">
                    <h3>자존감 및 회복탄력성(Resilience)</h3>
                    <p>
                      좌절을 겪었을 때 딛고 일어설 수 있는 내면의 힘을 기르고, 삶의 균형(WLB)을 바로잡는 내적 훈련입니다.
                    </p>
                    <div className="tag-group">
                      <span>#회복탄력성</span>
                      <span>#자아성찰</span>
                      <span>#긍정심리학</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HR Dashboard Section */}
      <section id="report" class="report-section">
        <div className="container">
          <div className="report-wrapper">
            <div className="report-info">
              <span className="sub-title">HR EXCLUSIVE</span>
              <h2>
                개인 정보는 철저하게,
                <br />
                조직 현황은 투명하게.
              </h2>
              <p className="report-desc">
                상담 내용의 익명성은 철저히 보장하되, 회사 차원의 조직 건강 상태를 모니터링할 수 있는 **'부서별/직무 유형별 통계 대시보드 리포트'**를 제공합니다.
              </p>
              <ul className="report-features">
                <li>
                  <div className="feature-icon">
                    <i className="fa-solid fa-lock"></i>
                  </div>
                  <div>
                    <h4>상담 임직원 익명성 100% 보장</h4>
                    <p>상담 대상자의 고유 식별 정보는 절대로 HR에 공개되지 않아 안전합니다.</p>
                  </div>
                </li>
                <li>
                  <div className="feature-icon">
                    <i className="fa-solid fa-chart-pie"></i>
                  </div>
                  <div>
                    <h4>조직 스트레스 요인 데이터화</h4>
                    <p>어느 부서가 번아웃 수준이 높은지, 어떤 유형의 스트레스가 높은지 월별 분석 리포트를 제공합니다.</p>
                  </div>
                </li>
                <li>
                  <div className="feature-icon">
                    <i className="fa-solid fa-lightbulb"></i>
                  </div>
                  <div>
                    <h4>조직 개선 방향 피드백 제언</h4>
                    <p>임상심리전문가의 종합 분석과 조직 문화 개선을 위한 맞춤 교육 솔루션을 제안합니다.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="report-preview-visual">
              <div className="glass-card dashboard-card">
                <div className="db-header">
                  <div className="db-title-area">
                    <i className="fa-solid fa-chart-line text-violet"></i>
                    <div>
                      <h4>FaWW EAP 조직 분석 대시보드</h4>
                      <p>2026년 2분기 조직 건강 리포트</p>
                    </div>
                  </div>
                  <span className="db-tag">HR LIVE</span>
                </div>

                <div className="db-metrics">
                  <div className="db-metric-box">
                    <span className="db-val text-violet">72.4%</span>
                    <span className="db-label">종합 조직 건강 지수</span>
                  </div>
                  <div className="db-metric-box">
                    <span className="db-val text-green">-18%</span>
                    <span className="db-label">전분기 대비 스트레스 지수</span>
                  </div>
                </div>

                <div className="db-chart-section">
                  <h5>부서별 스트레스 취약도 (위험 지표)</h5>
                  <div className="db-bar-chart">
                    <div className="chart-row">
                      <span className="row-label">개발팀</span>
                      <div className="bar-wrapper">
                        <div className="bar-fill bg-violet animate-width" style={{ width: '82%' }}></div>
                      </div>
                      <span className="row-val">82%</span>
                    </div>
                    <div className="chart-row">
                      <span className="row-label">영업팀</span>
                      <div className="bar-wrapper">
                        <div className="bar-fill bg-cyan animate-width" style={{ width: '65%' }}></div>
                      </div>
                      <span className="row-val">65%</span>
                    </div>
                    <div className="chart-row">
                      <span className="row-label">생산지원팀</span>
                      <div className="bar-wrapper">
                        <div className="bar-fill bg-orange animate-width" style={{ width: '48%' }}></div>
                      </div>
                      <span className="row-val">48%</span>
                    </div>
                  </div>
                </div>

                <div className="db-insight-box">
                  <i className="fa-solid fa-circle-exclamation text-orange"></i>
                  <p>
                    개발팀의 <strong>업무 번아웃 요인</strong>이 80%를 초과했습니다. 집중 근골격계 테라피(피지컬) 및 릴랙세이션 마음챙김 명상(멘탈) 병행 패키지를 제안합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" class="apply-section">
        <div className="container">
          <div className="apply-container glass-card">
            <div className="apply-header">
              <h2>우리 기업을 위한 토탈 EAP 솔루션 설계</h2>
              <p>간단한 정보만 남겨주시면, 전문 웰니스 컨설턴트가 24시간 이내에 맞춤 제안서와 견적을 보내드립니다.</p>
            </div>

            <form id="eap-apply-form" className="apply-form" onSubmit={handleApplySubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company-name">
                    기업명 <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="company-name"
                    placeholder="예: (주)파우"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="manager-name">
                    담당자 이름 <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="manager-name"
                    placeholder="예: 홍길동"
                    value={formData.managerName}
                    onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="manager-email">
                    이메일 주소 <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="manager-email"
                    placeholder="example@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="manager-phone">
                    연락처 <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="manager-phone"
                    placeholder="010-0000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="emp-count">임직원 수 (예상 대상 인원)</label>
                  <select
                    id="emp-count"
                    value={formData.empCount}
                    onChange={(e) => setFormData({ ...formData, empCount: e.target.value })}
                  >
                    <option value="under-50">50인 미만</option>
                    <option value="50-100">50인 이상 ~ 100인 미만</option>
                    <option value="100-300">100인 이상 ~ 300인 미만</option>
                    <option value="over-300">300인 이상</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="main-job-type">주요 근무 형태</label>
                  <select
                    id="main-job-type"
                    value={formData.jobType}
                    onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                  >
                    <option value="office-main">사무직 중심 (IT, 본사 등)</option>
                    <option value="field-main">현장직 중심 (생산, 교대, 물류 등)</option>
                    <option value="mixed">반반 혼합 형태</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="apply-memo">추가 문의 사항 및 관심 프로그램</label>
                <textarea
                  id="apply-memo"
                  rows={4}
                  placeholder="예: 피지컬케어와 멘탈코칭 결합 상품의 견적이 궁금합니다. 구체적으로 사무직 번아웃 진단 도구 도입 절차를 설명해주세요."
                  value={formData.memo}
                  onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                ></textarea>
              </div>

              <div className="form-agree">
                <label className="symptom-item">
                  <input
                    type="checkbox"
                    id="agree-privacy"
                    checked={formData.agreePrivacy}
                    onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                    required
                  />
                  <span className="checkbox-custom"></span>
                  <span className="symptom-text">개인정보 수집 및 이용약관에 동의합니다. (필수)</span>
                </label>
              </div>

              <button type="submit" className="btn-submit">
                무료 맞춤 컨설팅 제안서 신청하기 <i className="fa-solid fa-circle-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/%ED%8C%8C%EC%9A%B0%EB%AF%B8.png"
                alt="FaWW Logo"
                className="faww-footer-logo"
              />
              <h3>주식회사 파우 (FaWW)</h3>
              <p>임직원의 신체와 정신을 통합 케어하는 혁신적인 기업 EAP 파트너</p>
            </div>
            <div className="footer-links">
              <h4>바로가기</h4>
              <ul>
                <li>
                  <a href="#vision">서비스 소개</a>
                </li>
                <li>
                  <a href="#diagnosis">직무별 진단</a>
                </li>
                <li>
                  <a href="#programs">상담 프로그램</a>
                </li>
                <li>
                  <a href="#report">HR 데이터 리포트</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; 2026 주식회사 파우 (FaWW). All rights reserved. 본 서비스는 전문 임상심리코칭 팀과 물리치료 케어
              팀에 의해 안전하게 제공됩니다.
            </p>
          </div>
        </div>
      </footer>

      {/* Submission Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" id="success-modal">
          <div className="glass-card success-modal-content">
            <div className="success-icon">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h2>제안서 신청 완료!</h2>
            <p>
              작성해주신 정보가 정상적으로 전송되었습니다.
              <br />
              파우 EAP 웰니스 컨설턴트가 신속하게 맞춤 제안서를 준비하여 연락드리겠습니다.
            </p>
            <button className="btn-primary" id="btn-close-modal" onClick={handleCloseModal}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
