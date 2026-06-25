'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import './mental_style.css';

// 30일 루틴 챌린지 미션 규격
interface Mission {
  day: number;
  title: string;
  desc: string;
}

export default function MentalPlannerPage() {
  // 1. 시뮬레이터 탭 전환 제어
  const [activeSimTab, setActiveSimTab] = useState<'stress-map' | 'challenge' | 'daily-log'>('stress-map');

  // 2. 내 마음 진단 (Stress Map & NRS Slider) 상태
  const [selectedPart, setSelectedPart] = useState<'head' | 'neck' | 'chest' | 'stomach' | 'hands'>('head');
  const [nrsValue, setNrsValue] = useState<number>(6);
  const [stressMemo, setStressMemo] = useState<string>('');

  const partData = {
    head: {
      title: '머리 (Head / Brain)',
      desc: '두통, 편두통, 머리의 무거움, 생각의 과부하, 브레인 포그',
      presc: '두 눈을 감고 모니터에서 멀어지세요. 플래너 키트의 파우미 힐링 키링을 한 손에 쥐고, 차가운 산소가 정수리로 흘러들어가 뇌의 열을 식힌다고 5회 상상하며 호흡하세요.',
      defaultNrs: 6,
      placeholder: '어떤 잡념이 나를 괴롭히고 있는지 여기에 한 줄 적어보세요.'
    },
    neck: {
      title: '목 & 어깨 (Neck & Shoulders)',
      desc: '뒷목 뻐근함, 어깨 근육의 뭉침, 긴장성 수축 피로',
      presc: '양 어깨를 귀 쪽으로 최대한 끌어올렸다가 3초간 참고 툭 떨어뜨리는 행동을 3회 반복합니다. 턱을 가볍게 당기고 목 뒤쪽 리마인더 스티커를 확인하여 자세를 리프레시하세요.',
      defaultNrs: 4,
      placeholder: '장시간 컴퓨터 작업이나 긴장으로 인해 목 어깨가 얼마나 무거운가요?'
    },
    chest: {
      title: '가슴 (Chest / Anxiety)',
      desc: '불안함, 가슴의 답답함, 심장 두근거림, 얕은 호흡',
      presc: '가슴 한가운데 손을 가볍게 대고, 들이쉬는 숨보다 내쉬는 숨을 두 배 길게 뱉으세요 (들이쉬고 3초, 내쉬고 6초). "나는 지금 편안하고 온전히 안전하다"고 소리 내어 말해봅니다.',
      defaultNrs: 5,
      placeholder: '답답하거나 마음이 조급한 구체적인 원인이 있다면 편안하게 적어보세요.'
    },
    stomach: {
      title: '위장 (Stomach / Digestion)',
      desc: '소화불량, 명치 끝 답답함, 스트레스성 속 쓰림',
      presc: '따뜻한 힐링 아로마 허브티를 한 모금 천천히 입에 머금었다 삼키세요. 복부를 시계 방향으로 원을 그리며 따뜻하게 쓸어내리고 자율신경계를 안정시킵니다.',
      defaultNrs: 3,
      placeholder: '스트레스를 받으면 체하거나 속이 더부룩해지는 패턴이 있나요?'
    },
    hands: {
      title: '손 & 전신 긴장 (Hands / Tension)',
      desc: '손가락 관절 뻐근함, 손끝 저림, 긴장으로 인한 손바닥 땀',
      presc: '서랍에서 말랑말랑한 안티-스트레스 힐링 볼을 꺼냅니다. 손가락 전체를 사용해 공을 5초 동안 꽉 쥐었다가 힘을 완전히 빼는 릴렉세이션을 양손 교대로 10회 실시하세요.',
      defaultNrs: 5,
      placeholder: '손을 쥐거나 마우스를 잡았을 때 느껴지는 뻣뻣함을 메모해보세요.'
    }
  };

  // 핫스팟 클릭 핸들러
  const handlePartClick = (partKey: 'head' | 'neck' | 'chest' | 'stomach' | 'hands') => {
    setSelectedPart(partKey);
    setNrsValue(partData[partKey].defaultNrs);
    setStressMemo('');
  };

  // 3. 30일 루틴 챌린지 미션 데이터 & 상태
  const [activeDay, setActiveDay] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  const missions: Mission[] = [
    { day: 1, title: '나에게 긍정 확언 들려주기', desc: '거울을 보며 "나는 오늘 하루 내 페이스를 지키며 마음 편히 잘 보낼 것이다"라고 조용히 말해봅니다. 스스로에게 긍정적인 힘을 부여하는 강력한 연습입니다.' },
    { day: 2, title: '어깨와 턱 힘 3초 빼기', desc: '의식적으로 턱에 들어간 힘을 풀고, 어깨를 가볍게 뒤로 돌려 아래로 툭 늘어뜨립니다. 3초간 내면에 머물며 신체의 경직을 이완하세요.' },
    { day: 3, title: '따뜻한 물 한 모금 머금기', desc: '따뜻한 물이나 허브티를 입안 가득 머금고, 그 온도를 5초 동안 천천히 느끼며 삼킵니다. 식도가 따뜻해지며 자율신경계가 차분해집니다.' },
    { day: 4, title: '모니터 밖 먼 곳 30초 바라보기', desc: '컴퓨터 모니터에서 눈을 떼고 창밖의 하늘이나 녹색 나무 등 먼 풍경을 30초 동안 초점 없이 멍하니 응시해 봅니다. 시각적 뇌 자극을 일시 중지합니다.' },
    { day: 5, title: '오늘 감사한 일 3개 적기', desc: '사소한 일이라도 괜찮습니다. 오늘 기분 좋았던 대화, 날씨, 따뜻한 음료 등 감사한 일 3가지를 데일리 마인드 로그에 적어봅니다.' },
    { day: 6, title: '안티-스트레스 힐링 볼 주무르기', desc: '오피스 웰니스 볼을 꺼내 손가락으로 꾹꾹 쥐고 펴기를 10회 반복합니다. 뇌에 말랑말랑한 촉각 자극을 주어 긴장을 누그러뜨립니다.' },
    { day: 7, title: '숨 깊게 3회만 들이쉬기', desc: '4초 동안 깊게 들이쉬고, 4초 동안 숨을 참으며 안정을 도모한 뒤, 4초 동안 가늘게 입으로 내뱉는 심호흡을 정확히 3회 해봅니다.' },
    { day: 8, title: '가벼운 목 스트레칭', desc: '목을 시계 방향으로 아주 천천히 한 바퀴, 반대 방향으로 한 바퀴 돌려줍니다. 뭉쳤던 정서적 긴장이 목과 어깨선에서부터 풀려나갑니다.' },
    { day: 9, title: '눈 감고 내 맥박 느껴보기', desc: '손목에 검지와 중지를 얹고 나의 맥박이 뛰는 주기를 지긋이 관찰합니다. 외부로 뻗쳐있던 내 의식의 안테나를 즉각 나 자신으로 가져옵니다.' },
    { day: 10, title: '스스로에게 건네는 수고의 토닥임', desc: '두 팔을 교차해 양어깨를 감싸 안으며 가볍게 토닥여줍니다. "오늘도 정말 수고 많았다, 충분히 애썼다"고 자신을 꼭 다독여주세요.' },
    { day: 11, title: '따뜻한 아로마 차 마시기', desc: '스트레스가 가득 찰 때 허브티의 아로마 향을 먼저 깊게 들이마시고 맛을 음미합니다. 후각과 미각의 결합이 극도의 리프레시를 가져다줍니다.' },
    { day: 12, title: '5분간 부정적 알림 끄기', desc: '잠시 스마트폰을 비행기 모드로 바꾸거나 PC 메신저 알림을 끈 채 5분 동안 완전히 나만의 고요함 속에 머무는 시간을 갖습니다.' },
    { day: 13, title: '나를 위한 건강한 점심 식사', desc: '오늘 점심은 입안에 들어온 음식을 평소보다 두 배 천천히 씹어봅니다. 식사의 온전한 맛과 감각에 집중해 스트레스를 이완해 봅니다.' },
    { day: 14, title: '좋아하는 릴랙싱 음악 1곡 감상', desc: '가사 없는 잔잔한 연주곡이나 좋아하는 릴랙스 음악을 눈을 감은 채로 헤드폰을 통해 온전히 끝까지 감상해 봅니다.' },
    { day: 15, title: '일하기 전 책상 깔끔하게 정리하기', desc: '지저분한 서류와 모니터 주변 메모 포스트잇을 정리합니다. 시각적 자극이 줄어들면 뇌의 인지 부하가 즉각 가라앉고 집중도가 올라갑니다.' },
    { day: 16, title: '1분 동안 온전히 침묵하기', desc: '말을 멈추고 입을 다문 채로 오직 코를 통해 오가는 산소의 흐름만을 지켜봅니다. 짧은 쉼표가 정신적 과부하를 비워냅니다.' },
    { day: 17, title: '건강한 심리 경계선 정하기', desc: '타인의 감정이나 무리한 요구는 내 영역 밖의 일임을 명심하세요. 마음속으로 "여기까지가 내가 할 수 있는 최선이다"라고 단호하게 경계를 그어봅니다.' },
    { day: 18, title: '내 감정을 단어 하나로 이름 붙이기', desc: '지금 내 기분을 단어로 명명해 봅니다 (예: 피로, 조급, 평온, 설렘). 감정에 이름을 붙이는 것만으로도 그 감정의 조절력이 획득됩니다.' },
    { day: 19, title: '가볍게 10분 주변 산책하기', desc: '의자에서 일어나 밖으로 나가 가볍게 걸어봅니다. 다리 대근육의 사용은 코티솔 스트레스 호르몬을 소모시켜 뇌를 초기화합니다.' },
    { day: 20, title: '고마운 사람에게 마음 표현하기', desc: '동료나 친구 등 내게 힘을 주는 존재에게 "오늘도 응원해줘서 고맙다"고 사소하지만 진심 어린 텍스트 한 통을 보내봅니다.' },
    { day: 21, title: '따뜻한 물로 세수나 손 씻기', desc: '따뜻한 물이 손등이나 얼굴 피부에 닿는 기분 좋은 촉각에 완전히 주의를 집중하여 나를 감각 속에 머무르게 만듭니다.' },
    { day: 22, title: '내가 가진 작은 강점 기록하기', desc: '"나는 남들의 이야기를 잘 경청한다"나 "나는 맡은 업무에 성실하다" 같은 스스로의 강점 하나를 플래너에 적어 자랑스럽게 인정합니다.' },
    { day: 23, title: '어깨 으쓱 으쓱 5회 릴랙스', desc: '숨을 들이마시며 어깨를 귀 근처까지 콱 올렸다가 3초 대기 후 날숨과 함께 툭 떨굽니다. 상체의 물리적 경직을 순간 방출합니다.' },
    { day: 24, title: '스트레스 원인 종이에 쓰고 찢기', desc: '현재 나를 괴롭히는 걱정거리를 이면지나 포스트잇에 적은 뒤, 양손으로 잘게 찢어 휴지통에 던져버립니다. 감정을 외부화하여 해소하는 인지행동 기법입니다.' },
    { day: 25, title: '모니터 밖 멍하니 응시하기', desc: '초점을 흐린 채로 먼 산이나 창문 밖, 빌딩 모퉁이 등을 아무 생각 없이 1분간 멍하게 바라봅니다. 뇌의 연산 영역을 잠시 꺼둡니다.' },
    { day: 26, title: '아로마 힐링 티백 음미하기', desc: '따뜻하게 우린 차가 코끝으로 전하는 향을 5초간 천천히 마시고 삼킵니다. 식도가 따뜻하게 뎁혀지며 미온적 안도감이 온몸에 퍼집니다.' },
    { day: 27, title: '내면의 비난 목소리 끄기', desc: '오늘 하루만큼은 스스로에 대한 평가와 지적을 차단하세요. "그럴 수도 있지, 괜찮아"라고 스스로에게 안전한 포용의 한 마디를 건넵니다.' },
    { day: 28, title: '내일의 나에게 건네는 응원 메모', desc: '퇴근 직전 플래너 여백에 "내일의 나야, 긴장하지 말고 한 걸음씩만 나아가자. 화이팅!"이라고 다정한 메신저를 써 둡니다.' },
    { day: 29, title: '스마트폰과 분리되어 눕기', desc: '잠자리에 들기 30분 전 스마트폰 화면을 끄고 멀리 둔 채 누워 침대의 안온함과 이불의 포근함만을 피부로 느끼며 잠을 청합니다.' },
    { day: 30, title: '나를 위한 보상과 자축', desc: '30일 동안 내 마음을 돌보는 스몰 스텝을 실천한 자신을 크게 칭찬하며, 먹고 싶었던 특별한 차나 작은 기분 전환용 셀프 선물을 줍니다.' }
  ];

  // 미션 완료 스탬프 핸들러
  const handleCompleteMission = () => {
    if (!completedDays.includes(activeDay)) {
      setCompletedDays([...completedDays, activeDay]);
    } else {
      setCompletedDays(completedDays.filter(d => d !== activeDay));
    }
  };

  // 4. 데일리 마인드 로그 상태
  const [selectedMood, setSelectedMood] = useState<'good' | 'normal' | 'tired' | 'exhausted' | 'hard'>('normal');
  const [breathingCompleted, setBreathingCompleted] = useState<boolean>(true);
  const [waterCups, setWaterCups] = useState<number>(4);
  const [mindMinutes, setMindMinutes] = useState<number>(10);
  const [gratitude1, setGratitude1] = useState<string>('오전에 동료가 건네준 따뜻한 차 한 잔 덕분에 기분 좋게 시작했습니다.');
  const [gratitude2, setGratitude2] = useState<string>('바쁜 업무 중에도 점심 식사 후 5분 동안 온전히 하늘을 보며 휴식했습니다.');
  const [gratitude3, setGratitude3] = useState<string>('오늘 하루도 지치지 않고 건강하게 맡은 업무를 완수한 나에게 감사합니다.');

  const getMoodHue = (mood: string) => {
    switch (mood) {
      case 'good': return 'none';
      case 'normal': return 'hue-rotate(40deg)';
      case 'tired': return 'hue-rotate(90deg)';
      case 'exhausted': return 'hue-rotate(180deg)';
      case 'hard': return 'hue-rotate(280deg)';
      default: return 'none';
    }
  };

  // 5. 1분 마인드풀니스 호흡 가이드 및 ASMR 오디오 상태
  const [breathState, setBreathState] = useState<'ready' | 'inhale' | 'hold' | 'exhale'>('ready');
  const [breathSeconds, setBreathSeconds] = useState<number>(4);
  const [isBreathActive, setIsBreathActive] = useState<boolean>(false);
  const [soundType, setSoundType] = useState<'none' | 'rain' | 'sea' | 'birds'>('none');
  const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(null);
  const [timerTotal, setTimerTotal] = useState<number>(60);

  // 호흡 타이머 로직
  useEffect(() => {
    let interval: any;
    if (isBreathActive) {
      interval = setInterval(() => {
        // 전체 타이머 1초 감소
        setTimerTotal((prevTotal) => {
          if (prevTotal <= 1) {
            setIsBreathActive(false);
            return 60;
          }
          return prevTotal - 1;
        });

        // 4-4-4 호흡 위상 타이머
        setBreathSeconds((prevSec) => {
          if (prevSec <= 1) {
            setBreathState((currentState) => {
              if (currentState === 'ready' || currentState === 'exhale') {
                return 'inhale';
              } else if (currentState === 'inhale') {
                return 'hold';
              } else {
                return 'exhale';
              }
            });
            return 4;
          }
          return prevSec - 1;
        });
      }, 1000);
    } else {
      setBreathState('ready');
      setBreathSeconds(4);
      setTimerTotal(60);
    }
    return () => clearInterval(interval);
  }, [isBreathActive]);

  // ASMR 오디오 제어 로직
  useEffect(() => {
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
    audio.play().catch((err) => {
      console.warn('ASMR audio autoplay blocked:', err);
    });

    setAudioInstance(audio);

    return () => {
      audio.pause();
    };
  }, [soundType]);

  // 6. 도입 제안 신청서 폼 상태
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
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // 스티커 메시지 팝업 상태
  const [activeStickerMsg, setActiveStickerMsg] = useState<string | null>(null);

  const handleApplySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.agreePrivacy) {
      alert('개인정보 수집 및 이용약관 동의가 필요합니다.');
      return;
    }

    const submitData = {
      company: formData.companyName,
      manager: formData.managerName,
      phone: formData.phone,
      email: formData.email,
      scale: formData.empCount,
      inquiry: `[주요 근무 형태: ${formData.jobType}] (플래너 샘플 신청) ${formData.memo}`.trim(),
      parts: {
        physical: { selected: false, sub_modules: [] },
        mental: { selected: true, sub_modules: ['planner'] }
      }
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await fetch(`${apiUrl}/api/v1/proposals/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });

      if (!res.ok) {
        const err = await res.json();
        alert('❌ 신청 접수 중 오류가 발생했습니다: ' + (err.detail || '알 수 없는 오류'));
        return;
      }

      setShowSuccessModal(true);
    } catch (err) {
      alert('❌ 네트워크 오류로 인해 제안서 신청에 실패했습니다.');
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
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

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mental-page-wrapper planner-page-wrapper" data-breath-state={isBreathActive ? breathState : 'ready'}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-glow"></div>
        <div className="container">
          <div className="hero-container">
            <div className="hero-content">
              <span className="badge">NEW 멘탈 리셋 플래너 출시</span>
              <h1>대면 상담 없이,<br />책상 위에서 시작하는<br /><span className="highlight">스스로 마음 회복</span></h1>
              <p className="hero-subtitle">
                EAP의 새로운 패러다임. 하루 1분 기록, 감사 일기, 인지행동치료(CBT) 기반 챌린지로 우리 임직원의 번아웃과 직무 스트레스를 근본적으로 지탱해주는 사내 셀프 멘탈케어 키트입니다.
              </p>
              <div className="hero-cta-buttons">
                <a href="#simulator" className="btn-primary">
                  1분 플래너 체험하기 ➔
                </a>
                <a href="#apply" className="btn-secondary">제안서 신청하기</a>
              </div>
            </div>

            {/* 3D Book Mockup Visual */}
            <div className="hero-visual">
              <div className="planner-mockup-wrapper">
                <div className="planner-book">
                  <div className="planner-cover">
                    <div className="planner-cover-header">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="cover-leaves">
                        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z"/>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="cover-leaves">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                      </svg>
                    </div>
                    <div className="planner-cover-body">
                      <h2 className="planner-title-kr">멘탈 리셋<br />플래너</h2>
                      <span className="planner-title-en">MENTAL RESET PLANNER</span>
                    </div>
                    <div className="planner-cover-footer">
                      <div className="cover-brand-info">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/파우 로고.png" alt="FaWW Logo" className="cover-brand-logo" />
                        <span className="cover-brand-text">멘탈케어</span>
                      </div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/파우미.png" alt="파우미 마스코트" className="cover-mascot-sticker" />
                    </div>
                  </div>
                </div>

                {/* Floating Character Card */}
                <div className="glass-card floating-mascot-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/파우미.png" alt="파우미 마스코트" />
                  <div>
                    <h4>"오늘 마음 날씨는 어떤가요?"</h4>
                    <p>스스로 마음의 상태를 귀여운 스티커로 기록해보세요.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Paradigm Shift (Why Planner) */}
      <section id="why-planner" className="paradigm-section">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">EAP PARADIGM INNOVATION</span>
            <h2>왜 <span>멘탈 리셋 플래너</span>인가요?</h2>
            <p className="section-desc">기존 대면 심리상담의 부담감과 예약의 번거로움을 해결하고, 책상 위에서 언제나 상시적으로 마음 상태를 살필 수 있도록 설계되었습니다.</p>
          </div>

          <div className="paradigm-grid">
            <div className="paradigm-card">
              <h3>
                <span className="monochrome-symbol" style={{ marginRight: '8px' }}>👣</span> 1. 스몰 스텝 (Small Step)
              </h3>
              <p>
                대면 심리상담 신청이나 상담사에게 속마음을 털어놓는 것이 다소 무겁거나 조심스러웠던 임직원들을 위해, 본인 책상 위에 가볍게 놓아두고 혼자서 편안하게 감정과 스트레스를 트래킹할 수 있는 초저장벽 셀프 케어 솔루션입니다.
              </p>
            </div>
            <div className="paradigm-card">
              <h3>
                <span className="monochrome-symbol" style={{ marginRight: '8px' }}>🛡</span> 2. 심리 번아웃의 근본 예방
              </h3>
              <p>
                업무 스트레스와 피로가 쌓여 번아웃으로 발전하기 전, 30일 루틴 챌린지와 매일의 마인드 로그 및 인지행동치료(CBT) 요소를 통해 매일 감정을 환기합니다. 임직원의 정서적 불안을 빠르게 해소하여 사내 웰니스를 정착시킵니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Lineup Section */}
      <section id="lineup" className="lineup-section">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">MENTAL RESET KIT LINEUP</span>
            <h2>멘탈 리셋 키트 <span>전체 라인업</span></h2>
            <p className="section-desc">오피스 라이프 밸런스와 정서 안정의 습관화를 돕는 3가지 핵심 치유 도구 구성입니다.</p>
          </div>

          <div className="lineup-grid">
            <div className="lineup-card glass-card">
              <div className="lineup-icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="monochrome-svg">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <h3>마인드 리셋 플래너</h3>
              <p>NRS 기반의 스트레스 자가진단, 30일 습관 다이어리, 매일의 감정과 감사 메모를 작성하며 마음 면역을 쌓는 핵심 가이드북입니다.</p>
            </div>

            <div className="lineup-card glass-card">
              <div className="lineup-icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="monochrome-svg">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
              </div>
              <h3>감정 매핑 & 리마인더 스티커</h3>
              <p>오늘의 스트레스 부위와 기분을 표시하는 다채로운 컬러 스티커와 함께 모니터 가장자리에 붙여 무의식을 환기하는 리무버블 스티커입니다.</p>
            </div>

            <div className="lineup-card glass-card">
              <div className="lineup-icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="monochrome-svg">
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  <path d="M2 12h20"/>
                </svg>
              </div>
              <h3>멘탈 웰니스 테라피 굿즈</h3>
              <p>손안의 긴장과 분노를 풀어주는 말랑한 &apos;스트레스 볼&apos;, 마음을 차분히 이완시키는 &apos;마인드풀 아로마 힐링 티백&apos;, 그리고 파우의 귀여운 힐링 키링입니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Planner Simulator Section */}
      <section id="simulator" className="simulator-section">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">INTERACTIVE EXPERIENCE</span>
            <h2>플래너 핵심 콘텐츠 <span>직접 체험하기</span></h2>
            <p className="section-desc">실물 멘탈 리셋 플래너에 담긴 핵심 자가 치유 페이지들을 웹에서 직접 조작하며 느껴보세요.</p>
          </div>

          {/* Tab Navigation */}
          <div className="tab-nav-wrapper">
            <div className="sim-tab-nav">
              <button
                className={`btn-sim-tab ${activeSimTab === 'stress-map' ? 'active' : ''}`}
                onClick={() => setActiveSimTab('stress-map')}
              >
                🧠 내 마음 진단 (Stress Map)
              </button>
              <button
                className={`btn-sim-tab ${activeSimTab === 'challenge' ? 'active' : ''}`}
                onClick={() => setActiveSimTab('challenge')}
              >
                📅 30일 루틴 챌린지
              </button>
              <button
                className={`btn-sim-tab ${activeSimTab === 'daily-log' ? 'active' : ''}`}
                onClick={() => setActiveSimTab('daily-log')}
              >
                ✍ 데일리 마인드 로그
              </button>
            </div>
          </div>

          {/* Simulator Content Frame */}
          <div className="sim-content-container">
            <div className="planner-paper-frame planner-grid-bg">

              {/* Tab Panel 1: 내 마음 진단 (Stress NRS Map) */}
              {activeSimTab === 'stress-map' && (
                <div className="sim-panel active" id="panel-stress-map">
                  <div className="stress-diag-layout">
                    <div className="stress-map-visual">
                      {/* SVG Human outline for stress mapping */}
                      <svg className="body-silhouette-svg" viewBox="0 0 200 500" xmlns="http://www.w3.org/2000/svg">
                        {/* Head */}
                        <g className={`hotspot ${selectedPart === 'head' ? 'active' : ''}`} onClick={() => handlePartClick('head')} data-part="head">
                          <circle cx="100" cy="65" r="30" />
                        </g>
                        {/* Neck & Shoulders */}
                        <g className={`hotspot ${selectedPart === 'neck' ? 'active' : ''}`} onClick={() => handlePartClick('neck')} data-part="neck">
                          <path d="M70,95 L130,95 L145,120 L55,120 Z" />
                        </g>
                        {/* Chest (Heart/Anxiety) */}
                        <g className={`hotspot ${selectedPart === 'chest' ? 'active' : ''}`} onClick={() => handlePartClick('chest')} data-part="chest">
                          <path d="M60,130 L140,130 L135,200 L65,200 Z" />
                        </g>
                        {/* Stomach (Digestion/Stress) */}
                        <g className={`hotspot ${selectedPart === 'stomach' ? 'active' : ''}`} onClick={() => handlePartClick('stomach')} data-part="stomach">
                          <path d="M65,210 L135,210 L125,270 L75,270 Z" />
                        </g>
                        {/* Hands/Arms (Tension) */}
                        <g className={`hotspot ${selectedPart === 'hands' ? 'active' : ''}`} onClick={() => handlePartClick('hands')} data-part="hands">
                          <path d="M45,130 L55,130 L45,260 L35,260 Z M155,130 L145,130 L155,260 L165,260 Z" />
                        </g>
                        {/* Legs/General Body */}
                        <path d="M75,280 L125,280 L120,440 L105,440 L100,340 L95,440 L80,440 Z" fill="#cbd5e1" stroke="#94a3b8" />
                      </svg>
                      <div className="diag-body-label">아픈 곳/스트레스 긴장 부위를 클릭하세요</div>
                    </div>

                    <div className="stress-control-box">
                      <div className="selected-part-info">
                        <h3>{partData[selectedPart].title}</h3>
                        <p>{partData[selectedPart].desc}</p>
                      </div>

                      <div className="nrs-slider-container">
                        <div className="nrs-header-row">
                          <span className="nrs-label-text">스트레스 통증 척도 (NRS)</span>
                          <span className="nrs-score-display" style={{ color: nrsValue >= 8 ? 'var(--color-danger)' : nrsValue >= 4 ? 'var(--color-primary)' : 'var(--color-secondary)' }}>
                            {nrsValue}
                          </span>
                        </div>
                        <input
                          type="range"
                          className="nrs-slider"
                          min="0"
                          max="10"
                          value={nrsValue}
                          onChange={(e) => setNrsValue(Number(e.target.value))}
                        />
                        <div className="nrs-scale-ticks">
                          <span>0 (차분함)</span>
                          <span>5 (스트레스)</span>
                          <span>10 (최대 스트레스)</span>
                        </div>
                      </div>

                      <div className="stress-memo-box">
                        <label htmlFor="stress-memo-textarea">상태 기록 & 메모</label>
                        <textarea
                          id="stress-memo-textarea"
                          rows={2}
                          value={stressMemo}
                          onChange={(e) => setStressMemo(e.target.value)}
                          placeholder={partData[selectedPart].placeholder}
                        ></textarea>
                      </div>

                      <div className="self-prescription-result">
                        <div className="presc-icon">✦</div>
                        <div className="presc-text">
                          <h5>마인드 셀프 처방</h5>
                          <p>{partData[selectedPart].presc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Panel 2: 30일 루틴 챌린지 */}
              {activeSimTab === 'challenge' && (
                <div className="sim-panel active" id="panel-challenge">
                  <div className="challenge-title-row">
                    <h3>30일 루틴 챌린지 <span>(마음 근육 단련 코스)</span></h3>
                    <span className="challenge-progress-badge">완료 개수: <span>{completedDays.length}</span> / 30</span>
                  </div>

                  <div className="challenge-grid-layout">
                    {/* Calendar grid of 30 days */}
                    <div className="challenge-calendar-grid">
                      {missions.map((m) => (
                        <button
                          key={m.day}
                          className={`challenge-day-btn ${activeDay === m.day ? 'active' : ''} ${completedDays.includes(m.day) ? 'completed' : ''}`}
                          onClick={() => setActiveDay(m.day)}
                        >
                          <span className="day-num">{m.day}</span>
                          {completedDays.includes(m.day) && <span className="stamp-mark">✓</span>}
                        </button>
                      ))}
                    </div>

                    {/* Selected Day details & QR Meditation preview */}
                    <div className="challenge-info-card">
                      <div className="routine-mission-header">
                        <div className="routine-day-tag">DAY {activeDay}</div>
                        <h4>{missions[activeDay - 1].title}</h4>
                      </div>
                      <div className="routine-mission-body">
                        <p className="routine-mission-desc">
                          {missions[activeDay - 1].desc}
                        </p>

                        <div className="routine-qr-guide">
                          <div className="dummy-qr-box">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'currentColor' }}>
                              <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h4v2h-4v-2zm2 2h2v4h-2v-4zm-2 2h2v2h-2v-2zm-2-2h2v2h-2v-2zm0 2h-2v2h2v-2zm2 2h2v2h-2v-2zm-6-6h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2z" />
                            </svg>
                          </div>
                          <div className="dummy-qr-text">
                            <h5>1분 힐링 사운드 연동</h5>
                            <p>스마트폰 카메라로 실물 QR을 비추면 바로 1분 명상/백색소음 음원이 연결됩니다.</p>
                          </div>
                        </div>
                      </div>
                      <button className={`btn-complete-mission ${completedDays.includes(activeDay) ? 'completed' : ''}`} onClick={handleCompleteMission}>
                        {completedDays.includes(activeDay) ? '미션 완료 스탬프 해제' : '오늘 미션 완료 스탬프 찍기'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Panel 3: 데일리 마인드 로그 */}
              {activeSimTab === 'daily-log' && (
                <div className="sim-panel active" id="panel-daily-log">
                  <div className="mind-log-layout">
                    <div className="log-date-row">
                      <span className="log-date-label">DAILY MIND LOG</span>
                      <input type="text" className="log-date-input" defaultValue="2026 . 06 . 25" readOnly />
                    </div>

                    {/* Mood log row */}
                    <div className="log-row-card">
                      <div className="log-row-header">
                        <span className="log-row-badge">MOOD</span>
                        <span className="log-row-title">오늘 하루 나의 마음 기후</span>
                        <span className="log-row-desc">가장 가까운 내면의 얼굴을 선택해주세요.</span>
                      </div>
                      <div className="mood-selector-grid">
                        {(['good', 'normal', 'tired', 'exhausted', 'hard'] as const).map((mood) => (
                          <button
                            key={mood}
                            className={`btn-mood-item ${selectedMood === mood ? 'selected' : ''}`}
                            onClick={() => setSelectedMood(mood)}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/images/파우미.png"
                              alt={mood}
                              style={{ filter: getMoodHue(mood) }}
                            />
                            <span>
                              {mood === 'good' && '좋아요'}
                              {mood === 'normal' && '보통이에요'}
                              {mood === 'tired' && '피곤해요'}
                              {mood === 'exhausted' && '지쳐요'}
                              {mood === 'hard' && '힘들어요'}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-row">
                      {/* Breathing toggle check */}
                      <div className="log-row-card">
                        <div className="log-row-header">
                          <span className="log-row-badge">BREATHE</span>
                          <span className="log-row-title">마음챙김 호흡을 완료했나요?</span>
                        </div>
                        <div className="toggle-ox-row">
                          <button
                            className={`btn-ox-item ${breathingCompleted ? 'selected' : ''}`}
                            onClick={() => setBreathingCompleted(true)}
                          >
                            O
                          </button>
                          <button
                            className={`btn-ox-item ${!breathingCompleted ? 'selected' : ''}`}
                            onClick={() => setBreathingCompleted(false)}
                          >
                            X
                          </button>
                        </div>
                      </div>

                      {/* Water intake log */}
                      <div className="log-row-card">
                        <div className="log-row-header">
                          <span className="log-row-badge">WATER</span>
                          <span className="log-row-title">수분 섭취량</span>
                          <span className="log-row-desc">클릭하여 물을 마신 양을 채우세요.</span>
                        </div>
                        <div className="water-cups-row">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <button
                              key={i}
                              className={`btn-cup-item ${i < waterCups ? 'filled' : ''}`}
                              onClick={() => setWaterCups(i + 1)}
                            >
                              💧
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Mindful/Posture Time */}
                    <div className="log-row-card">
                      <div className="log-row-header">
                        <span className="log-row-badge">MINUTES</span>
                        <span className="log-row-title">마음 평온 유지 시간</span>
                        <span className="log-row-desc">스트레스 볼 조작이나 명상에 완전히 집중한 시간</span>
                      </div>
                      <div className="posture-input-box">
                        <input
                          type="number"
                          value={mindMinutes}
                          onChange={(e) => setMindMinutes(Number(e.target.value))}
                          min="0"
                        />
                        <span>분 동안 내면의 평화를 집중하여 돌보았습니다.</span>
                      </div>
                    </div>

                    {/* Three Gratitudes ruled area */}
                    <div className="log-row-card">
                      <div className="log-row-header">
                        <span className="log-row-badge">GRATITUDE</span>
                        <span className="log-row-title">오늘 감사했던 일 3가지 작성</span>
                        <span className="log-row-desc">사소한 감사함이 긍정 감정을 깨워줍니다.</span>
                      </div>
                      <div className="gratitude-textarea-grid">
                        <div className="gratitude-note-row">
                          <span className="gratitude-note-num">1.</span>
                          <input
                            type="text"
                            className="gratitude-note-input"
                            value={gratitude1}
                            onChange={(e) => setGratitude1(e.target.value)}
                            placeholder="오늘 감사했던 사람이나 기분 좋았던 소소한 순간 적기"
                          />
                        </div>
                        <div className="gratitude-note-row">
                          <span className="gratitude-note-num">2.</span>
                          <input
                            type="text"
                            className="gratitude-note-input"
                            value={gratitude2}
                            onChange={(e) => setGratitude2(e.target.value)}
                            placeholder="스스로에게 칭찬하거나 뿌듯했던 일 적기"
                          />
                        </div>
                        <div className="gratitude-note-row">
                          <span className="gratitude-note-num">3.</span>
                          <input
                            type="text"
                            className="gratitude-note-input"
                            value={gratitude3}
                            onChange={(e) => setGratitude3(e.target.value)}
                            placeholder="미래의 나를 격려하거나 감사한 환경 적기"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="log-submit-area">
                      <button className="btn-primary" onClick={() => alert('오늘의 로그가 시뮬레이터에 가상 저장되었습니다! 실물 플래너 다이어리에서도 매일 기록해 보세요.')}>
                        오늘 로그 완료 저장하기
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Sticker System PC Reminders Section */}
      <section id="sticker" className="sticker-section">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">VISUAL REMINDER SYSTEM</span>
            <h2>의식하지 않아도 쌓이는 <span>마음 습관</span></h2>
            <p className="section-desc">키트에 포함된 리무버블 스티커를 PC 모니터 주변에 붙여주세요. 시야에 항상 노출되는 긍정 메시지가 뇌의 무의식적 이완을 상시 유도합니다.</p>
          </div>

          <div className="sticker-layout">
            <div className="sticker-showcase-visual">
              {/* PC Monitor mockup with reminders attached */}
              <div className="pc-screen-mockup">
                <div className="pc-screen-content">
                  <h5>오피스 집중 근무 중...</h5>
                  <p>바쁜 직장 생활 속에서도 시야 끝에 걸치는 힐링 스티커가 마음을 차분히 지탱해줍니다.</p>
                  {activeStickerMsg && (
                    <div className="sticker-bubble-tooltip">
                      <p>{activeStickerMsg}</p>
                      <button onClick={() => setActiveStickerMsg(null)}>닫기</button>
                    </div>
                  )}
                </div>
                {/* Interactive reminders */}
                <button
                  className="removable-sticker top-left"
                  onClick={() => setActiveStickerMsg('가장 기본적이면서 가장 강력한 이완법입니다. 들이마쉬고(4초)-참고(4초)-내쉬어보세요(4초).')}
                >
                  숨 깊게 세 번 쉬기
                </button>
                <button
                  className="removable-sticker top-right"
                  onClick={() => setActiveStickerMsg('남들의 기준이 아닌 나 자신의 속도를 격려하세요. 당신은 이미 훌륭히 해내고 있습니다.')}
                >
                  오늘도 충분히 잘했어!
                </button>
                <button
                  className="removable-sticker left-middle"
                  onClick={() => setActiveStickerMsg('스트레스는 근육 긴장으로 직결됩니다. 턱의 힘을 빼고 어깨를 가볍게 뒤로 돌려 아래로 떨구세요.')}
                >
                  턱 풀고 어깨 내리기
                </button>
                <button
                  className="removable-sticker right-bottom"
                  onClick={() => setActiveStickerMsg('피로를 식히고 마음을 환기하기 위해 맑은 물 한 모금으로 뇌를 깨워주세요.')}
                >
                  따뜻한 물 한 모금
                </button>
              </div>
            </div>

            <div className="sticker-info-list">
              <div className="sticker-info-item">
                <div className="sticker-info-num">04</div>
                <div className="sticker-info-text">
                  <h4>감정 표시 매핑 스티커</h4>
                  <p>매일 플래너 속 인체 드로잉 또는 감정 맵에 스티커(불안/화남-빨강, 평온-노랑, 무기력-파랑 등)를 시각적으로 기록해 내 정서 통계를 관찰합니다.</p>
                </div>
              </div>

              <div className="sticker-info-item">
                <div className="sticker-info-num">05</div>
                <div className="sticker-info-text">
                  <h4>모니터 리무버블 리마인더</h4>
                  <p>어지러운 사무 책상 위, PC 모니터 가장자리에 접착 흔적이 남지 않게 항시 붙여두고 시각 무의식을 정화하는 긍정 확언 스티커 팩입니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1-Minute Mindfulness Breathing Section */}
      <section className="therapy-section">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">1-MIN THERAPY</span>
            <h2>언제 어디서나, <span>1분 마인드풀니스 호흡</span></h2>
            <p className="section-desc">바쁜 오피스 일과 중 단 1분만이라도 마음 호흡에 집중하세요. 백색소음(ASMR)과 함께 호흡 가이드를 따라 뇌를 초기화해보세요.</p>
          </div>

          <div className="therapy-container glass-card">
            <div className="breathing-space">
              <div className="breathing-circle" id="therapy-breath-circle">
                <div className="breath-ripple"></div>
                <div className="breathing-circle-inner">
                  <span className="breath-status">
                    {breathState === 'ready' && '호흡 대기'}
                    {breathState === 'inhale' && '숨 들이마시기'}
                    {breathState === 'hold' && '숨 멈추기'}
                    {breathState === 'exhale' && '숨 내쉬기'}
                  </span>
                  <span className="breath-timer">{formatTimer(timerTotal)}</span>
                </div>
              </div>
            </div>

            <div className="therapy-controls">
              <div className="sound-selector-box">
                <h4>🎧 배경 사운드 (ASMR) 선택</h4>
                <div className="sound-buttons">
                  <button className={`btn-sound ${soundType === 'none' ? 'active' : ''}`} onClick={() => setSoundType('none')}>🔇 소리 없음</button>
                  <button className={`btn-sound ${soundType === 'rain' ? 'active' : ''}`} onClick={() => setSoundType('rain')}>🌧️ 포근한 빗소리</button>
                  <button className={`btn-sound ${soundType === 'sea' ? 'active' : ''}`} onClick={() => setSoundType('sea')}>🌊 잔잔한 파도소리</button>
                  <button className={`btn-sound ${soundType === 'birds' ? 'active' : ''}`} onClick={() => setSoundType('birds')}>🐦 숲속 아침 새소리</button>
                </div>
              </div>

              <div className="breathing-action-box">
                <button className={`btn-breath-trigger ${isBreathActive ? 'active' : ''}`} onClick={() => setIsBreathActive(!isBreathActive)}>
                  {isBreathActive ? '■ 명상 중지하기' : '▶ 1분 마음챙김 호흡 시작'}
                </button>
                <p className="breath-instruction">
                  ✦ 편안하게 의자에 등을 기대고 눈을 감은 채, 동그라미가 커지고 작아지는 4-4-4 호흡 주기(들이마시고 4초 - 참고 4초 - 내쉬고 4초)에 맞추어 호흡해봅니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desk Therapy Special Goods Section */}
      <section id="desk-therapy" className="goods-section">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">DESK THERAPY TOOLS</span>
            <h2>책상 위의 <span>멘탈 테라피 툴</span></h2>
            <p className="section-desc">오피스 서랍에 두고 원할 때 언제든 감각을 일깨워 불안을 해소하고 긴장을 안정시키는 테라피 굿즈입니다.</p>
          </div>

          <div className="goods-grid">
            <div className="goods-card glass-card">
              <div className="goods-img-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/파우미.png" alt="스트레스 볼" style={{ width: '100px', height: 'auto' }} />
              </div>
              <h3>06. 안티-스트레스 힐링 볼</h3>
              <p>마우스와 키보드로 지친 손을 쥐어짜며 손 근육을 이완시키고 뇌의 긴장 반응을 즉각적으로 완화하여 분노나 불안을 누그러뜨립니다.</p>
            </div>

            <div className="goods-card glass-card">
              <div className="goods-img-box">
                <span style={{ fontSize: '48px' }}>☕</span>
              </div>
              <h3>07. 마인드풀 힐링 허브티</h3>
              <p>지친 오후, 따뜻한 물에 티백을 우려내며 은은한 향과 따뜻한 물로 부교감신경을 자극하여 지친 오피스 생활에 향긋한 휴식을 안겨줍니다.</p>
            </div>

            <div className="goods-card glass-card">
              <div className="goods-img-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/파우미.png" alt="파우미 키링" style={{ width: '90px', height: 'auto', filter: 'saturate(1.2)' }} />
              </div>
              <h3>08. 파우미 캐릭터 힐링 키링</h3>
              <p>사무 공간이나 에어팟, 사내 가방에 소장하며 바라보는 것만으로 미소를 자아내는 주식회사 파우의 귀여운 힐링 마스코트 봉제 키링입니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proven Effects Section */}
      <section id="effects" className="effects-section">
        <div className="container">
          <div className="effects-layout">
            <div className="effects-stat-box">
              <div className="stat-number">-38%</div>
              <div className="stat-label">임직원 번아웃 & 스트레스 지수 감소</div>
              <div className="stat-desc">30일간의 지속적인 플래너 및 마인드 트래킹을 수행한 직원의 평균 통계 결과</div>
            </div>

            <div className="effects-text-box">
              <h3>자가 트래킹과 습관화가 만드는<br />조직 정신 건강의 위력</h3>
              <p>
                대면 심리상담의 부담감을 해소하여 EAP 참여도를 대폭 끌어올렸으며, 일상적인 자가 케어를 통하여 업무 스트레스로 인한 조기 번아웃을 사전 차단하는 성과를 이룩했습니다.
              </p>
              <p>
                <span className="effects-bullet-green">✓</span> 사내 웰니스 시스템을 구축하는 최적의 비용 대비 생산성 향상 비율!<br />
                <span className="effects-bullet-green">✓</span> 대면 상담의 한계를 돌파하는 self-care 중심 하이브리드 복지 솔루션.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HR Dashboard Report section */}
      <section id="report" className="report-section">
        <div className="container">
          <div className="report-wrapper">
            <div className="report-info">
              <span className="sub-title">HR EXECUTIVE EXCLUSIVE</span>
              <h2>개인 정보는 철저하게,<br />조직 현황은 투명하게.</h2>
              <p className="report-desc">
                임직원 개개인의 상세 기록이나 상담 여부는 철저하게 익명(100% 비공개)으로 보장되며, 인사팀에는 조직 전체의 스트레스 트렌드와 번아웃 취약 부서 통계 데이터 리포트 대시보드만을 집계하여 제공합니다.
              </p>
              <ul className="report-features">
                <li>
                  <div className="feature-icon">🔒</div>
                  <div>
                    <h4>개인 플래너 익명 보장</h4>
                    <p>누가 플래너를 쓰고 어떤 자가 진단을 했는지 인사담당자는 절대로 식별할 수 없습니다.</p>
                  </div>
                </li>
                <li>
                  <div className="feature-icon">📈</div>
                  <div>
                    <h4>조직 멘탈 건강도 지표화</h4>
                    <p>부서별 스트레스 지표와 번아웃 누적 수준을 실시간 통계로 집계하여 선제적 부서 조치를 돕습니다.</p>
                  </div>
                </li>
                <li>
                  <div className="feature-icon">👥</div>
                  <div>
                    <h4>웰니스 개선 제언 리포트</h4>
                    <p>전문 마인드 코치진이 집계된 리포트를 분석하여 스트레스 해소에 적합한 사내 교육 프로그램을 제안합니다.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Live Dashboard visual */}
            <div className="report-preview-visual">
              <div className="glass-card dashboard-card">
                <div className="db-header">
                  <div className="db-title-area">
                    <span style={{ fontSize: '20px', marginRight: '8px' }}>📊</span>
                    <div>
                      <h4>FaWW EAP 조직 멘탈 분석 대시보드</h4>
                      <p>2026년 2분기 임직원 마음 건강 현황</p>
                    </div>
                  </div>
                  <span className="db-tag">HR LIVE</span>
                </div>

                <div className="db-metrics">
                  <div className="db-metric-box">
                    <span className="db-val text-violet">74.2%</span>
                    <span className="db-label">종합 조직 심리적 안전감</span>
                  </div>
                  <div className="db-metric-box">
                    <span className="db-val text-green">-15%</span>
                    <span className="db-label">전분기 대비 임직원 불안감 지수</span>
                  </div>
                </div>

                <div className="db-chart-section">
                  <h5>부서별 번아웃 주의도 (경고 비율)</h5>
                  <div className="db-bar-chart">
                    <div className="chart-row">
                      <span className="row-label">개발팀</span>
                      <div className="bar-wrapper">
                        <div className="bar-fill bg-violet" style={{ width: '78%' }}></div>
                      </div>
                      <span className="row-val">78%</span>
                    </div>
                    <div className="chart-row">
                      <span className="row-label">고객상담팀</span>
                      <div className="bar-wrapper">
                        <div className="bar-fill bg-cyan" style={{ width: '62%' }}></div>
                      </div>
                      <span className="row-val">62%</span>
                    </div>
                    <div className="chart-row">
                      <span className="row-label">영업관리팀</span>
                      <div className="bar-wrapper">
                        <div className="bar-fill bg-orange" style={{ width: '45%' }}></div>
                      </div>
                      <span className="row-val">45%</span>
                    </div>
                  </div>
                </div>

                <div className="db-insight-box">
                  <span style={{ marginRight: '8px' }}>ℹ</span>
                  <p>개발팀의 자가진단 <strong>스트레스 지수</strong>가 높은 상태입니다. 멘탈 리셋 키트 내의 &apos;안티-스트레스 힐링 볼&apos; 및 &apos;1분 마인드풀 호흡 챌린지&apos; 오피스 리마인더 활성화를 강력히 제안합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application / Inquiry Form */}
      <section id="apply" className="apply-section">
        <div className="container">
          <div className="apply-container glass-card">
            <div className="apply-header">
              <h2>우리 기업을 위한 멘탈 리셋 키트 설계</h2>
              <p>간단한 기업명과 담당자 정보를 남겨주시면, 24시간 내에 제안서와 플래너 실물 샘플 제공 상담을 도와드립니다.</p>
            </div>

            <form className="apply-form" id="planner-inquiry-form" onSubmit={handleApplySubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company-name">기업명 <span className="required">*</span></label>
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
                  <label htmlFor="manager-name">담당자 이름 <span className="required">*</span></label>
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
                  <label htmlFor="manager-email">이메일 주소 <span className="required">*</span></label>
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
                  <label htmlFor="manager-phone">연락처 <span className="required">*</span></label>
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
                  <label htmlFor="main-job-type">임직원 주요 업무 형태</label>
                  <select
                    id="main-job-type"
                    value={formData.jobType}
                    onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                  >
                    <option value="office-main">사무직 위주 (IT, 디자인, 기획 등)</option>
                    <option value="field-main">현장직 위주 (생산, 교대, 감정노동 등)</option>
                    <option value="mixed">반반 혼합 형태</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inquiry-memo">문의 사항 및 실물 플래너 샘플 요청 의견</label>
                <textarea
                  id="inquiry-memo"
                  rows={4}
                  value={formData.memo}
                  onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                  placeholder="예: 플래너 실물 샘플을 미리 받아보고 부서원 도입을 검토하고 싶습니다. 200부 기준 견적과 기업 전용 맞춤 로고 인쇄 지원이 되는지 궁금합니다."
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
                무료 도입 제안서 & 실물 샘플 상담 신청하기 ➔
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/파우 로고.png" alt="FaWW Logo" className="faww-footer-logo" />
              <h3>주식회사 파우 (FaWW)</h3>
              <p>임직원의 신체와 정신을 통합 케어하는 혁신적인 기업 웰니스 EAP 파트너</p>
            </div>
            <div className="footer-links">
              <h4>바로가기</h4>
              <ul>
                <li><a href="#why-planner">플래너 소개</a></li>
                <li><a href="#lineup">전체 구성품</a></li>
                <li><a href="#simulator">플래너 체험</a></li>
                <li><a href="#sticker">자가 관리 스티커</a></li>
                <li><a href="#effects">도입 효과</a></li>
                <li><a href="#report">HR 데이터 리포트</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 주식회사 파우 (FaWW). All rights reserved. 본 자가진단 및 플래너 시스템은 전문 임상심리코칭 팀의 감수를 거쳐 개발되었습니다.</p>
          </div>
        </div>
      </footer>

      {/* Submission Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" id="success-modal">
          <div className="glass-card success-modal-content">
            <div className="success-icon">✓</div>
            <h2>샘플 및 도입 신청 완료!</h2>
            <p>작성해주신 정보가 안전하게 전송되었습니다.<br />웰니스 코디네이터가 기재해주신 연락처로 24시간 내에 연락드려 상세한 플래너 소개 및 실물 샘플 배송을 지원해드리겠습니다.</p>
            <button className="btn-primary" id="btn-close-modal" style={{ width: '100%', justifyContent: 'center' }} onClick={handleCloseModal}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
