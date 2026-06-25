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

  // 5. 호흡 가이드 및 ASMR 상태 관리
  const [breathState, setBreathState] = useState<'ready' | 'inhale' | 'hold' | 'exhale'>('ready');
  const [breathSeconds, setBreathSeconds] = useState<number>(4);
  const [isBreathActive, setIsBreathActive] = useState<boolean>(false);
  const [soundType, setSoundType] = useState<'none' | 'rain' | 'sea' | 'birds'>('none');
  const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(null);

  // 6. AI 마인드 리셋 플래너 상태 관리
  const [plannerInput, setPlannerInput] = useState<string>('');
  const [isGeneratingReset, setIsGeneratingReset] = useState<boolean>(false);
  const [generatedResetPlan, setGeneratedResetPlan] = useState<{
    type: string;
    summary: string;
    step1: string;
    step2: string;
    step3: string;
    quote: string;
  } | null>(null);

  // 7. B2B 대시보드 탭 상태 관리
  const [dashboardTab, setDashboardTab] = useState<'department' | 'stress-factor' | 'monthly-trend'>('department');

  // 8. 마인드 스파클 파티클 상태
  interface Sparkle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    delay: number;
  }
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const triggerSparkles = () => {
    const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#e05349'];
    const newSparkles: Sparkle[] = Array.from({ length: 16 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 220, // -110px ~ 110px
      y: (Math.random() - 0.5) * 220, // -110px ~ 110px
      size: Math.random() * 12 + 10,  // 10px ~ 22px
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.25,
    }));
    setSparkles(newSparkles);

    // 1.5초 후 정리
    setTimeout(() => {
      setSparkles([]);
    }, 1500);
  };

  // 호흡 타이머 로직
  React.useEffect(() => {
    let timer: any;
    if (isBreathActive) {
      timer = setInterval(() => {
        setBreathSeconds((prev) => {
          if (prev <= 1) {
            // 상태 전환
            setBreathState((currentState) => {
              if (currentState === 'ready' || currentState === 'exhale') {
                return 'inhale';
              } else if (currentState === 'inhale') {
                return 'hold';
              } else {
                return 'exhale';
              }
            });
            return 4; // 다음 4초 타이밍
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathState('ready');
      setBreathSeconds(4);
    }
    return () => clearInterval(timer);
  }, [isBreathActive]);

  // 오디오 제어 로직
  React.useEffect(() => {
    // 기존 오디오 중지
    if (audioInstance) {
      audioInstance.pause();
    }

    if (soundType === 'none') {
      setAudioInstance(null);
      return;
    }

    let url = '';
    if (soundType === 'rain') {
      url = 'https://actions.google.com/sounds/v1/water/rain_heavy_loud.ogg';
    } else if (soundType === 'sea') {
      url = 'https://actions.google.com/sounds/v1/water/sea_waves.ogg';
    } else if (soundType === 'birds') {
      url = 'https://actions.google.com/sounds/v1/ambient/morning_birds.ogg';
    }

    const audio = new Audio(url);
    audio.loop = true;
    
    // 오디오 재생 오류 방지를 위한 플레이 로직
    audio.play().catch((err) => {
      console.warn("Audio play blocked by browser policy. Interaction required.", err);
    });

    setAudioInstance(audio);

    return () => {
      audio.pause();
    };
  }, [soundType]);

  // 마인드 리셋 플래너 처방전 생성기
  const handleGenerateResetPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plannerInput.trim()) {
      alert('오늘의 마음을 한 줄이라도 적어주세요.');
      return;
    }

    setIsGeneratingReset(true);
    setGeneratedResetPlan(null);

    // 1.5초 딜레이 후 생성 시뮬레이션
    setTimeout(() => {
      const input = plannerInput.toLowerCase();
      let type = '일상 정서 밸런스';
      let summary = '과도한 자극 없이 잔잔한 몰입을 통해 기분을 안정시키는 마음 챙김입니다.';
      let step1 = '차분히 앉아 따뜻한 물 한 모금 마시기';
      let step2 = '자신의 들숨과 날숨에만 집중하며 크게 3회 호흡하기';
      let step3 = '나에게 어울리는 긍정적인 다짐 한 문장을 일기장에 쓰기';
      let quote = '“충분히 괜찮은 하루였습니다. 나 자신을 다그치지 말고, 포근히 안아주세요.”';

      if (input.includes('야근') || input.includes('일') || input.includes('피로') || input.includes('피곤') || input.includes('번아웃') || input.includes('퇴사')) {
        type = '직무 번아웃 회복';
        summary = '소진된 뇌의 인지 리소스를 복구하고 극도의 뇌 이완을 유도하는 리프레시 처방입니다.';
        step1 = '손가락과 머리를 쓰는 모든 기기(스마트폰, 모니터) 멀리 치우기';
        step2 = '목과 승모근 주위를 양손으로 잡고 부드럽게 지압하며 5회 서서히 둥글려주기';
        step3 = '오늘은 평소보다 30분 일찍 취침을 시도하며 뇌에 완전한 수면 휴식 주기';
        quote = '“오늘도 조직과 일을 위해 최선을 다했습니다. 이제 스위치를 끄고 내 영혼을 충전할 시간입니다.”';
      } else if (input.includes('팀장') || input.includes('상사') || input.includes('동료') || input.includes('사람') || input.includes('관계') || input.includes('갈등') || input.includes('회의')) {
        type = '관계 피로 솔루션';
        summary = '타인과의 갈등으로 인한 정서 소모와 분노를 안전하게 가라앉히는 감정 경계선 찾기입니다.';
        step1 = '가벼운 걷기나 시선 돌리기를 통해 갈등 상황의 주 원인과 물리적 거리 두기';
        step2 = '코로 깊게 들이쉬고 입을 살짝 벌려 한숨 쉬듯 길게 내쉬는 호흡 5회 반복하기';
        step3 = '타인의 감정은 그들의 몫이며, 내 마음의 주인은 온전히 나임을 인지하기';
        quote = '“그 누구도 내 마음의 정원을 짓밟을 수 없습니다. 나만의 안전한 경계선을 세우세요.”';
      } else if (input.includes('불안') || input.includes('걱정') || input.includes('우울') || input.includes('공황') || input.includes('초조') || input.includes('무서')) {
        type = '안심 웰니스 그라운딩';
        summary = '막연히 떠도는 두려움과 불안을 걷어내고, 내 몸이 있는 현재에 정신을 연결하는 정서 지지법입니다.';
        step1 = '내 주변에 눈에 보이는 3가지 물건의 이름과 색상을 마음속으로 조용히 불러보기';
        step2 = '차가운 물로 세수를 하거나 손을 씻어 감각을 깨워주기';
        step3 = '지금의 신체 통증이나 긴장 부위(예: 움츠러든 어깨)를 천천히 이완하고 바로잡기';
        quote = '“불안은 지나가는 바람일 뿐입니다. 지금 이 순간, 당신은 안전하고 단단히 서 있습니다.”';
      }

      setGeneratedResetPlan({ type, summary, step1, step2, step3, quote });
      setIsGeneratingReset(false);
      triggerSparkles();
    }, 1500);
  };

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
    <div className="mental-page-wrapper" data-breath-state={isBreathActive ? breathState : 'ready'}>
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
                      <span className="monochrome-symbol">👥</span> 4,200+ 임직원 케어 중
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="monochrome-svg-icon brain-icon">
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z"/>
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z"/>
                  </svg>
                  <div>
                    <h4>실시간 스트레스 케어</h4>
                    <p>업무 피로도 즉시 완화</p>
                  </div>
                </div>
                <div className="glass-card floating-card card-right">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="monochrome-svg-icon heart-icon">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="monochrome-svg-icon">
                  <path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2" />
                  <path d="M6 8H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
                  <rect x="8" y="10" width="8" height="4" rx="1" />
                  <path d="M6 5v14" />
                  <path d="M18 5v14" />
                </svg>
              </div>
              <h3>FaWW Physical Care</h3>
              <p className="brand-link">기존 근골격계 테라피 서비스</p>
              <ul className="vision-list">
                <li>장시간 좌식 근무에 따른 목/허리 케어</li>
                <li>현장직 맞춤 관절 및 피로 회복 케어</li>
                <li>1대1 맞춤형 수기 마사지 및 체형 교정</li>
              </ul>
            </div>
            <div className="vision-connector">
              <div className="arrow-container">
                <span className="plus-sign">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="plus-icon-symbol" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </span>
                <p>신체와 정신의 결합</p>
              </div>
            </div>
            <div className="vision-card glass-card highlighted-vision">
              <div className="card-icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="monochrome-svg-icon">
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z"/>
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z"/>
                </svg>
              </div>
              <h3>FaWW Mental Coaching</h3>
              <p className="brand-link">NEW 심리 멘탈코칭 서비스</p>
              <ul className="vision-list">
                <li>직무 스트레스 및 번아웃 예방 코칭</li>
                <li>심리 불안, 대인관계, 정서 치유 상담</li>
                <li>조직 진단 및 리포트 제공</li>
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
                <div className="job-type-selection">
                  <div className="job-card" onClick={() => handleJobSelect('office')}>
                    <div className="job-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="monochrome-svg-icon">
                        <rect width="20" height="14" x="2" y="3" rx="2" />
                        <line x1="8" x2="16" y1="21" y2="21" />
                        <line x1="12" x2="12" y1="17" y2="21" />
                      </svg>
                    </div>
                    <h4>사무직군</h4>
                    <p>주로 본사, IT, 디자인, 관리 등 실내 모니터 작업 및 좌식 업무 중심</p>
                  </div>
                  <div className="job-card" onClick={() => handleJobSelect('field')}>
                    <div className="job-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="monochrome-svg-icon">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                      </svg>
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
                    ← 이전으로
                  </button>
                  <button
                    className="btn-next btn-primary"
                    id="btn-submit-office"
                    onClick={handleSubmitDiagnosis}
                  >
                    진단 결과 보기 →
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
                    ← 이전으로
                  </button>
                  <button
                    className="btn-next btn-primary"
                    id="btn-submit-field"
                    onClick={handleSubmitDiagnosis}
                  >
                    진단 결과 보기 →
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
                            <span className="rec-icon-symbol">
                              {rec.icon === 'fa-brain' && '🧠'}
                              {rec.icon === 'fa-dumbbell' && '🏋'}
                              {rec.icon === 'fa-seedling' && '🌱'}
                              {rec.icon === 'fa-bed' && '🛏'}
                              {rec.icon === 'fa-shield-halved' && '🛡'}
                              {rec.icon === 'fa-heart-pulse' && '♥'}
                              {rec.icon === 'fa-chart-pie' && '📊'}
                            </span>{' '}
                            {rec.title}
                          </h5>
                          <p>{rec.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 6. AI 마인드 리셋 플래너 위젯 추가 */}
                <div className="reset-planner-widget">
                  <div className="planner-header">
                    <h4><span className="text-violet">✦</span> 임직원 전용: 오늘의 AI 마인드 리셋 처방전</h4>
                    <p>오늘 업무나 일상에서 느낀 스트레스 요인이나 현재 기분을 적어보세요. 맞춤 마음 챙김 처방을 즉석 발행해 드립니다.</p>
                  </div>
                  <form onSubmit={handleGenerateResetPlan} className="planner-input-form">
                    <input
                      type="text"
                      placeholder="예시: 연이은 프로젝트 야근 때문에 너무 지치고 번아웃이 와요."
                      value={plannerInput}
                      onChange={(e) => setPlannerInput(e.target.value)}
                      disabled={isGeneratingReset}
                      className="planner-input"
                    />
                    <button type="submit" className="btn-generate-planner btn-primary" disabled={isGeneratingReset}>
                      {isGeneratingReset ? (
                        <>
                          ⌛ 분석 중...
                        </>
                      ) : (
                        <>
                          처방 받기 →
                        </>
                      )}
                    </button>
                  </form>

                  {/* 스파클 파티클 효과 렌더링 */}
                  <div className="sparkles-container">
                    {sparkles.map((sp) => (
                      <span
                        key={sp.id}
                        className="sparkle-element"
                        style={{
                          left: '50%',
                          top: '50%',
                          fontSize: `${sp.size}px`,
                          color: sp.color,
                          animationDelay: `${sp.delay}s`,
                          // CSS 커스텀 속성을 활용해 개별 파티클의 도달 위치를 전달
                          ['--tx' as any]: `${sp.x}px`,
                          ['--ty' as any]: `${sp.y}px`,
                        }}
                      >
                        ✦
                      </span>
                    ))}
                  </div>

                  {/* 처방전 출력창 */}
                  {generatedResetPlan && (
                    <div className="reset-diary-card">
                      <div className="diary-pin">📌</div>
                      <div className="diary-content">
                        <div className="diary-tag"># {generatedResetPlan.type}</div>
                        <h3>오늘의 마인드 리셋 처방전</h3>
                        <p className="diary-summary">{generatedResetPlan.summary}</p>
                        <div className="diary-steps">
                          <div className="diary-step">
                            <span className="step-num">1</span>
                            <span className="step-text">{generatedResetPlan.step1}</span>
                          </div>
                          <div className="diary-step">
                            <span className="step-num">2</span>
                            <span className="step-text">{generatedResetPlan.step2}</span>
                          </div>
                          <div className="diary-step">
                            <span className="step-num">3</span>
                            <span className="step-text">{generatedResetPlan.step3}</span>
                          </div>
                        </div>
                        <div className="diary-quote">{generatedResetPlan.quote}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="diag-buttons">
                  <button className="btn-restart btn-secondary" onClick={handleRestart}>
                    ↺ 다시 진단하기
                  </button>
                  <a href="#apply" className="btn-primary">
                    이 솔루션으로 상세 견적 문의하기 ✉
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
              <span className="tab-icon-symbol">⚙</span> 직무 상담 (Work-focused)
            </button>
            <button
              className={`btn-tab ${activeTab === 'personal-counseling' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal-counseling')}
            >
              <span className="tab-icon-symbol">♥</span> 개인 상담 (Personal)
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
                    <span className="placeholder-icon-symbol">🗲</span>
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
                    <span className="placeholder-icon-symbol">✉</span>
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
                    <span className="placeholder-icon-symbol">⚙</span>
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
                    <span className="placeholder-icon-symbol">♥</span>
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
                    <span className="placeholder-icon-symbol">☖</span>
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
                    <span className="placeholder-icon-symbol">⛨</span>
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

      {/* Mindfulness Therapy Session */}
      <section id="therapy" className="therapy-section">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">1-MIN THERAPY</span>
            <h2>언제 어디서나, 1분 마인드풀니스 호흡 세션</h2>
            <p className="section-desc">
              바쁜 하루 중 단 1분만이라도 호흡에만 온전히 머물러보세요. 백색소음(ASMR)과 함께 호흡 박자에 맞춰 몸의 긴장을 이완시킬 수 있습니다.
            </p>
          </div>

          <div className="therapy-container glass-card">
            {/* 호흡 비주얼 서클 */}
            <div className="breathing-space">
              <div className={`breathing-circle ${isBreathActive ? breathState : 'ready'}`}>
                <div className="breath-ripple ripple-1"></div>
                <div className="breath-ripple ripple-2"></div>
                <div className="breathing-circle-inner">
                  <span className="breath-status">
                    {breathState === 'ready' && '호흡 대기'}
                    {breathState === 'inhale' && '숨 들이마시기'}
                    {breathState === 'hold' && '숨 멈추기'}
                    {breathState === 'exhale' && '숨 내쉬기'}
                  </span>
                  <span className="breath-timer">
                    {isBreathActive ? `${breathSeconds}초` : '준비'}
                  </span>
                </div>
              </div>
            </div>

            {/* 컨트롤러 보드 */}
            <div className="therapy-controls">
              {/* ASMR 플레이어 */}
              <div className="sound-selector-box">
                <h4><span className="sound-icon-symbol">🎧</span> 배경 사운드 (ASMR) 선택</h4>
                <div className="sound-buttons">
                  <button 
                    className={`btn-sound ${soundType === 'none' ? 'active' : ''}`}
                    onClick={() => setSoundType('none')}
                  >
                    🔇 소리 없음
                  </button>
                  <button 
                    className={`btn-sound ${soundType === 'rain' ? 'active' : ''}`}
                    onClick={() => setSoundType('rain')}
                  >
                    🌧️ 포근한 빗소리
                  </button>
                  <button 
                    className={`btn-sound ${soundType === 'sea' ? 'active' : ''}`}
                    onClick={() => setSoundType('sea')}
                  >
                    🌊 잔잔한 파도소리
                  </button>
                  <button 
                    className={`btn-sound ${soundType === 'birds' ? 'active' : ''}`}
                    onClick={() => setSoundType('birds')}
                  >
                    🐦 숲속 아침 새소리
                  </button>
                </div>
              </div>

              {/* 가이드 실행 버튼 */}
              <div className="breathing-action-box">
                <button 
                  className={`btn-breath-trigger ${isBreathActive ? 'active' : ''}`}
                  onClick={() => setIsBreathActive(!isBreathActive)}
                >
                  {isBreathActive ? (
                    <>
                      ■ 명상 중지하기
                    </>
                  ) : (
                    <>
                      ▶ 1분 마음챙김 호흡 시작
                    </>
                  )}
                </button>
                <p className="breath-instruction">
                  * 편안하게 의자에 등을 기대고 어깨의 긴장을 푼 채, 동그라미가 팽창/수축하는 4-4-4 주기에 맞춰 호흡해보세요. (들이쉬고 4초 - 참고 4초 - 내쉬고 4초)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HR Dashboard Section */}
      <section id="report" className="report-section">
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
                    <span className="feature-icon-symbol">🔑</span>
                  </div>
                  <div>
                    <h4>상담 임직원 익명성 100% 보장</h4>
                    <p>상담 대상자의 고유 식별 정보는 절대로 HR에 공개되지 않아 안전합니다.</p>
                  </div>
                </li>
                <li>
                  <div className="feature-icon">
                    <span className="feature-icon-symbol">📊</span>
                  </div>
                  <div>
                    <h4>조직 스트레스 요인 데이터화</h4>
                    <p>어느 부서가 번아웃 수준이 높은지, 어떤 유형의 스트레스가 높은지 월별 분석 리포트를 제공합니다.</p>
                  </div>
                </li>
                <li>
                  <div className="feature-icon">
                    <span className="feature-icon-symbol">💡</span>
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
                    <span className="db-title-icon-symbol">📈</span>
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
                    <span className="db-val text-green">
                      {dashboardTab === 'department' && '-18%'}
                      {dashboardTab === 'stress-factor' && '4개 요인'}
                      {dashboardTab === 'monthly-trend' && '+24%p'}
                    </span>
                    <span className="db-label">
                      {dashboardTab === 'department' && '전분기 대비 스트레스 지수'}
                      {dashboardTab === 'stress-factor' && '주요 관리 대상 스트레스'}
                      {dashboardTab === 'monthly-trend' && '3개월 차 스트레스 경감률'}
                    </span>
                  </div>
                </div>

                {/* 대시보드 인터랙션 탭 */}
                <div className="db-tabs">
                  <button 
                    className={`db-tab-btn ${dashboardTab === 'department' ? 'active' : ''}`}
                    onClick={() => setDashboardTab('department')}
                  >
                    🏢 부서별 지표
                  </button>
                  <button 
                    className={`db-tab-btn ${dashboardTab === 'stress-factor' ? 'active' : ''}`}
                    onClick={() => setDashboardTab('stress-factor')}
                  >
                    🔥 스트레스 요인
                  </button>
                  <button 
                    className={`db-tab-btn ${dashboardTab === 'monthly-trend' ? 'active' : ''}`}
                    onClick={() => setDashboardTab('monthly-trend')}
                  >
                    📈 개선 트렌드
                  </button>
                </div>

                <div className="db-chart-section">
                  {dashboardTab === 'department' && (
                    <>
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
                    </>
                  )}

                  {dashboardTab === 'stress-factor' && (
                    <div className="donut-chart-container">
                      <h5>임직원 스트레스 주 원인 통계</h5>
                      <div className="donut-chart-box">
                        <svg width="140" height="140" viewBox="0 0 42 42" className="donut-chart">
                          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f1f2f6" strokeWidth="4.5" />
                          
                          {/* 직무 과부하 42% (violet): strokeDasharray="42 58" strokeDashoffset="25" */}
                          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--color-violet)" strokeWidth="4.8" 
                                  strokeDasharray="42 58" strokeDashoffset="25" className="donut-segment" />
                          
                          {/* 대인 갈등 28% (cyan): strokeDasharray="28 72" strokeDashoffset="83" */}
                          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--color-cyan)" strokeWidth="4.8" 
                                  strokeDasharray="28 72" strokeDashoffset="83" className="donut-segment" />
                          
                          {/* 미래 불안 18% (orange): strokeDasharray="18 82" strokeDashoffset="55" */}
                          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--color-orange)" strokeWidth="4.8" 
                                  strokeDasharray="18 82" strokeDashoffset="55" className="donut-segment" />

                          {/* 기타 12% (green): strokeDasharray="12 88" strokeDashoffset="37" */}
                          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--color-green)" strokeWidth="4.8" 
                                  strokeDasharray="12 88" strokeDashoffset="37" className="donut-segment" />
                        </svg>
                        <div className="donut-legend">
                          <div className="legend-row"><span className="legend-dot bg-violet"></span> 직무 과부하 (42%)</div>
                          <div className="legend-row"><span className="legend-dot bg-cyan"></span> 대인 갈등 (28%)</div>
                          <div className="legend-row"><span className="legend-dot bg-orange"></span> 커리어 미래불안 (18%)</div>
                          <div className="legend-row"><span className="legend-dot bg-green"></span> 기타 개인고민 (12%)</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {dashboardTab === 'monthly-trend' && (
                    <div className="line-chart-container">
                      <h5>EAP 프로그램 도입 전후 스트레스 변화 지표</h5>
                      <svg viewBox="0 0 300 100" className="line-chart" width="100%" height="110">
                        {/* 가이드 격자선 */}
                        <line x1="10" y1="20" x2="290" y2="20" stroke="#f1f2f6" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="10" y1="50" x2="290" y2="50" stroke="#f1f2f6" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="10" y1="80" x2="290" y2="80" stroke="#f1f2f6" strokeWidth="1" strokeDasharray="3 3" />
                        
                        {/* X축 레이블 (월) */}
                        <text x="10" y="95" fill="#a4b0be" fontSize="7" textAnchor="middle">도입 전</text>
                        <text x="80" y="95" fill="#a4b0be" fontSize="7" textAnchor="middle">1개월 차</text>
                        <text x="150" y="95" fill="#a4b0be" fontSize="7" textAnchor="middle">2개월 차</text>
                        <text x="220" y="95" fill="#a4b0be" fontSize="7" textAnchor="middle">3개월 차</text>
                        <text x="290" y="95" fill="#a4b0be" fontSize="7" textAnchor="middle">4개월 차</text>

                        {/* 도입 전 스트레스 예상 유지 곡선 (Red/Orange 라인) */}
                        <path d="M 10 75 Q 80 70, 150 78 T 290 82" fill="none" stroke="var(--color-orange)" strokeWidth="1.5" strokeDasharray="2 2" />
                        
                        {/* 도입 후 스트레스 하강 곡선 (Violet 라인) */}
                        <path d="M 10 70 Q 80 50, 150 35 T 290 18" fill="none" stroke="var(--color-violet)" strokeWidth="2.5" className="line-path" />
                        
                        {/* 데이터 포인트 */}
                        <circle cx="10" cy="70" r="3" fill="var(--color-violet)" />
                        <circle cx="150" cy="35" r="3" fill="var(--color-violet)" />
                        <circle cx="290" cy="18" r="3" fill="var(--color-violet)" />
                      </svg>
                      <div className="line-legend">
                        <span><span className="legend-line line-orange-dash"></span> 미도입(유지예상)</span>
                        <span><span className="legend-line line-violet-solid"></span> FaWW EAP 도입 후</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="db-insight-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange" style={{ marginRight: '8px', flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p>
                    {dashboardTab === 'department' && (
                      <>개발팀의 <strong>업무 번아웃 요인</strong>이 80%를 초과했습니다. 집중 근골격계 테라피(피지컬) 및 릴랙세이션 마음챙김 명상(멘탈) 병행 패키지를 제안합니다.</>
                    )}
                    {dashboardTab === 'stress-factor' && (
                      <>임직원 과반수가 <strong>직무 과부하 및 소통 차단</strong>으로 인한 우울감을 겪고 있습니다. 부서별 워크숍과 심리 안심 상담 증설을 적극 추천합니다.</>
                    )}
                    {dashboardTab === 'monthly-trend' && (
                      <>EAP 도입 후 <strong>3개월 내 평균 스트레스 감소율 24%p</strong>를 달성하여 생산성 개선이 입증되었습니다. 지속적인 모니터링을 권장합니다.</>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="apply-section">
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
                무료 맞춤 컨설팅 제안서 신청하기 →
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
              ✓
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
