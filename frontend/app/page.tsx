'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, MouseEvent, FormEvent } from 'react';
import './v2_style.css';
import { supabase } from '@/lib/supabase';

const B2B_QUESTIONS = [
    "우리 팀원들은 무거운 물건을 나르거나, 똑같은 동작을 계속 반복하는 육체 노동 비중이 높다.",
    "일하다 보면 '어깨 아프다', '허리 아프다', '손목 시큰거린다'고 호소하는 직원들이 꽤 많다.",
    "현장에서 크고 작은 신체 부상이나 안전사고가 일어날 위험이 있어서 늘 조심해야 하는 환경이다.",
    "우리 직원들은 하루 일과의 80% 이상을 모니터 앞 의자에 꼼짝 않고 앉아서 보낸다.",
    "사무실을 둘러보면 거북목이나 라운드숄더처럼 자세가 구부정한 직원들이 흔하게 보인다.",
    "일하다가 중간에 자리에서 일어나 가볍게 스트레칭을 하거나 몸을 풀 만한 분위기나 여유가 부족하다.",
    "최근 부서 분위기가 전체적으로 좀 가라앉아 있고, 다들 피곤하고 지쳐 보일 때가 많다.",
    "업무 스트레스나 감정 노동, 혹은 교대 근무 때문에 번아웃을 호소하는 직원들이 종종 있다.",
    "다 같이 모여서 머리를 식히고, 몸을 움직이면서 스트레스도 풀고 팀워크를 다질 수 있는 활동이 절실하다.",
    "조직 내 중장년층 비율이 높거나, 건강검진에서 혈압·혈당 수치가 높게 나오는 직원들이 꽤 있다.",
    "부서 회식이 잦거나, 야근하며 야식을 자주 먹는 등 직원들의 평소 식습관이나 음주 패턴이 불규칙하다.",
    "최근 들어 유독 뱃살(복부 비만)이 나오거나 체력이 급격히 떨어져서 힘들어하는 직원들이 눈에 띈다."
];

const B2C_QUESTIONS = [
    "몸 어딘가가 뻐근하고 아프면, 신경이 쓰여서 하던 일에 집중하기가 힘들다.",
    "평소와 다르게 몸이 불편한 느낌이 들면, 원인을 찾거나 신경 쓰느라 다른 일을 제때 못 한 적이 있다.",
    "내 몸의 아픈 곳이 갑자기 더 안 좋아질까 봐 자주 불안하거나 걱정된다.",
    "하루를 돌아보면, 잠자는 시간 외에는 대부분 의자에 앉아 있거나 누워서 보낸다.",
    "최근 일주일 동안 땀이 날 정도의 운동이나 근력 운동을 한 날이 하루 이하(0~1일)다.",
    "평소에 목이나 어깨, 허리가 자주 뻣뻣하게 굳는 느낌이 들고, 자세가 구부정해진다.",
    "유튜브 쇼츠, 인스타그램 릴스 같은 짧은 영상을 한 번 보면 시간 가는 줄 모르고 계속 보게 된다.",
    "예전보다 일상이나 업무에서 재미를 느끼기 어렵고, 자주 피곤하거나 만사가 귀찮아진다.",
    "스트레스를 받거나 헛헛할 때, 무심코 스마트폰을 들여다보거나 맵고 짠 음식, 단것(야식)을 찾게 된다.",
    "나 혹은 직계 가족 중에 혈압이나 혈당이 높거나, 심혈관 질환을 겪은 분이 있다.",
    "현재 담배를 피우고 있거나, 일주일에 2~3회 이상 술자리를 갖는 편이다.",
    "20대 시절과 비교했을 때 체중이 10kg 이상 늘었거나, 최근 뱃살(복부 비만)이 부쩍 고민이다."
];

export default function Home() {
    const [mediaReports, setMediaReports] = useState<any[]>([]);
    const [centerData, setCenterData] = useState<any[]>([]);
    const [clientReviews, setClientReviews] = useState<any[]>([]);
    const [activePage, setActivePage] = useState('page-home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [activeCenter, setActiveCenter] = useState<any | null>(null);
    const [hoveredCenterId, setHoveredCenterId] = useState<string | null>(null);
    const [activePhysicalSub, setActivePhysicalSub] = useState<string | null>(null);
    const [quizStep, setQuizStep] = useState(1);
    const [quizTarget, setQuizTarget] = useState('');
    const [quizResultTitle, setQuizResultTitle] = useState('');
    const [quizResultDesc, setQuizResultDesc] = useState('');
    const [quizAnswers, setQuizAnswers] = useState<number[]>(Array(12).fill(-1));
    const [reviewFilter, setReviewFilter] = useState('all');
    const [inquiryText, setInquiryText] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [emailError, setEmailError] = useState('');
    const [lastSubmitTime, setLastSubmitTime] = useState(0);
    const [reviewsData, setReviewsData] = useState<any[]>([]);

    const DEFAULT_CENTERS = [
        { 
            id: 'center-ydp', name: '피지컬케어 영등포 센터', tagline: '영등포 정밀 체형분석 센터', philosophy: '최첨단 장비를 활용한 정밀 분석', image_url: '', experts: ['전문의 A', '전문가 B'], map_url: '', reserve_url: '', address: '서울특별시 영등포구 도신로 232',
            stats: { visits: '3,284', scans: '1,492', satisfaction: '94.2%' },
            equipments: ['3D AI Body Scanner', 'Infrared Thermography', 'EMS Physical Care System']
        },
        { 
            id: 'center-yyd', name: '피지컬케어 여의도 센터', tagline: '여의도 오피스 케어 지점', philosophy: '직장인 맞춤형 솔루션', image_url: '', experts: ['전문가 C'], map_url: '', reserve_url: '', address: '서울특별시 영등포구 국제금융로 10',
            stats: { visits: '2,150', scans: '842', satisfaction: '92.8%' },
            equipments: ['AI Mobility Analysis', 'Posture Correction Bed', 'Stress Relief Therapy']
        },
        { 
            id: 'center-gn', name: '피지컬케어 강남 센터', tagline: '강남 프리미엄 프라이빗 센터', philosophy: '1:1 VIP 케어', image_url: '', experts: ['전문의 D', '전문가 E'], map_url: '', reserve_url: '', address: '서울특별시 강남구 강남대로 364',
            stats: { visits: '4,582', scans: '2,104', satisfaction: '96.5%' },
            equipments: ['Premium 3D Scan V2', 'Private Care Suite', 'Neuro-Muscular Reactivator']
        },
        { 
            id: 'center-dt', name: '피지컬케어 동탄 센터', tagline: '동탄 에듀-케어 센터', philosophy: '성장기 학생 맞춤 프로그램', image_url: '', experts: ['전문가 F'], map_url: '', reserve_url: '', address: '경기도 화성시 동탄대로 537',
            stats: { visits: '1,840', scans: '742', satisfaction: '91.5%' },
            equipments: ['Growth Growth Analysis', 'Balance Training Gear', 'Pediatric Correction Tool']
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            // 1. Fetch Media Reports
            try {
                const { data } = await supabase
                    .from('media_reports')
                    .select('*')
                    .order('published_at', { ascending: false });
                if (data && data.length > 0) setMediaReports(data);
            } catch (e) { console.error("Media fetch error", e); }

            // 2. Fetch Client Reviews
            try {
                const { data: revData } = await supabase
                    .from('client_reviews')
                    .select('*')
                    .eq('type', 'b2b')
                    .order('created_at', { ascending: false })
                    .limit(3);
                if (revData && revData.length > 0) setClientReviews(revData);
            } catch (e) { console.error("Reviews fetch error", e); }

            // 3. Fetch Centers
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/centers/`);
                if (res.ok) {
                    const json = await res.json();
                    console.log("✅ Centers API connected. Data:", json);
                    
                    const rawList = json.data || (Array.isArray(json) ? json : []);
                    
                    if (rawList.length > 0) {
                        const normalizedData = rawList.map((c: any) => ({
                            ...c,
                            id: c.id?.toString() || Math.random().toString(),
                            name: c.name || c.title || 'FaWW 센터',
                            tagline: c.tagline || '공식 인증 피지컬 케어 센터',
                            address: c.address || c.location || '주소 정보가 등록되지 않았습니다.',
                            philosophy: c.philosophy || c.description || '전문적인 맞춤형 피지컬 케어 솔루션을 제공합니다.',
                            image_url: c.image_url || '',
                            map_url: c.map_url || '#',
                            reserve_url: c.reserve_url || '#',
                            experts: Array.isArray(c.experts) ? c.experts : (typeof c.experts === 'string' ? c.experts.split(',').map((s:string)=>s.trim()) : []),
                            programs: Array.isArray(c.programs) ? c.programs : (typeof c.programs === 'string' ? c.programs.split(',').map((s:string)=>s.trim()) : [])
                        }));
                        setCenterData(normalizedData);
                    } else {
                        setCenterData(DEFAULT_CENTERS);
                    }
                } else {
                    console.warn("⚠️ Centers API response not ok. Falling back to default.");
                    setCenterData(DEFAULT_CENTERS);
                }
            } catch (e) {
                console.error("❌ Centers fetch error (Server might be down):", e);
                setCenterData(DEFAULT_CENTERS);
            }
        };
        fetchData();
    }, []);

    const openCenterModal = (centerId: string) => {
        const center = centerData.find(c => c.id === centerId);
        setActiveCenter(center);
    };

    const closeCenterModal = () => setActiveCenter(null);

    const sanitize = (text: string) => {
        return text.replace(/<[^>]*>?/gm, '').trim(); // HTML 태그 제거
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/[^0-9]/g, '');
        if (val.length > 3 && val.length <= 7) {
            val = val.replace(/(\d{3})(\d+)/, '$1-$2');
        } else if (val.length > 7) {
            val = val.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
        }
        setPhoneValue(val.substring(0, 13));
    };

    const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !re.test(email)) {
            setEmailError('올바른 이메일 형식을 입력해 주세요.');
        } else {
            setEmailError('');
        }
    };

    // 리뷰 필터 시 Swiper 인스턴스 강제 업데이트 (원본 1:1 완벽 이식)
    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).reviewSwiperInstance) {
            (window as any).reviewSwiperInstance.update();
            (window as any).reviewSwiperInstance.slideTo(0);
        }
    }, [reviewFilter]);

    // 텍스트를 글자 단위로 쪼개는 로직 (HTML 태그 보존형 V3)
    useEffect(() => {
        const targets = document.querySelectorAll('.section-kicker, .section-title, .section-desc, .hero-brand h1, .hero-brand p, .teaser-text');
        
        targets.forEach(el => {
            if (el.querySelector('.char') || el.classList.contains('typing-ready')) return;
            
            let charIndex = 0;
            const originalHTML = el.innerHTML;
            
            // 재귀적으로 텍스트 노드만 찾아 쪼개는 함수
            const processNode = (node: Node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.textContent || '';
                    const fragment = document.createDocumentFragment();
                    [...text].forEach(char => {
                        const span = document.createElement('span');
                        span.textContent = char === ' ' ? '\u00A0' : char;
                        span.className = 'char';
                        span.style.setProperty('--char-index', charIndex.toString());
                        fragment.appendChild(span);
                        charIndex++;
                    });
                    node.parentNode?.replaceChild(fragment, node);
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    // <br> 태그는 건너뛰고 다른 요소는 내부 탐색
                    if ((node as Element).tagName !== 'BR') {
                        Array.from(node.childNodes).forEach(child => processNode(child));
                    }
                }
            };

            processNode(el);
            el.classList.add('typing-ready');
        });
    }, [activePage]);

    // 👁️ 스크롤 감지 및 애니메이션 통합 시스템 (최적화 버전 V3)
    useEffect(() => {
        // 1. [만족도 차트 전용] 360도 회전 + 채우기
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    const countEl = entry.target.querySelector('.count-up') as HTMLElement;
                    const svgs = entry.target.querySelectorAll('.jelly-layer svg');
                    const circles = entry.target.querySelectorAll('.j-fg');
                    
                    if (countEl) {
                        // 0점 강제 세팅 (확실하게 비워둠)
                        countEl.innerText = "0";
                        svgs.forEach(svg => (svg as HTMLElement).style.transform = `rotate(-90deg)`);
                        circles.forEach(circle => (circle as HTMLElement).style.strokeDashoffset = "100");

                        const target = 99;
                        const duration = 2800; 
                        const startTime = performance.now();
                        const animate = (currentTime: number) => {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            
                            // 💡 슬로우 스타트 Easing (Ease-In-Out) - 시작이 천천히 보여야 0부터 오르는 게 보임
                            const ease = progress < 0.5 
                                ? 2 * progress * progress 
                                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                            countEl.innerText = Math.floor(ease * target).toString();
                            
                            // 🔄 360도 한 바퀴 회전
                            const rotation = (ease * 360) - 90;
                            svgs.forEach(svg => { (svg as HTMLElement).style.transform = `rotate(${rotation}deg)`; });
                            
                            // 🌊 시계 방향으로 색 채우기
                            const offset = 100 - (ease * 99);
                            circles.forEach(circle => { (circle as HTMLElement).style.strokeDashoffset = offset.toString(); });

                            if (progress < 1) requestAnimationFrame(animate);
                        };
                        // 0.2초 대기 후 시작하여 사용자가 눈을 맞출 시간을 줌
                        setTimeout(() => requestAnimationFrame(animate), 200);
                    }
                    chartObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.7 }); 

        // 2. [일반 섹션] 페이드인 효과
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // 3. [기타 통계 수치] 일반 카운트업
        const countObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.count-up');
                    counters.forEach(counter => {
                        if (counter.parentElement?.classList.contains('jelly-text-float')) return; // 차트 수치는 제외
                        if (counter.classList.contains('counted')) return; // 중복 실행 방지
                        
                        const target = +(counter.getAttribute('data-target') || 0);
                        const isFormat = counter.getAttribute('data-format') === 'true';
                        let current = 0;
                        const duration = 1200; // 1.2초간 실행 (속도 향상)
                        const startTime = performance.now();

                        const update = (currentTime: number) => {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            
                            // EaseOutExpo 효과
                            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                            current = target * easeProgress;

                            counter.textContent = Math.ceil(current).toLocaleString(isFormat ? 'en-US' : undefined);
                            
                            if (progress < 1) {
                                requestAnimationFrame(update);
                            } else {
                                counter.textContent = target.toLocaleString(isFormat ? 'en-US' : undefined);
                                counter.classList.add('counted');
                            }
                        };
                        requestAnimationFrame(update);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // 초기화 및 실행
        const satisfactionChart = document.getElementById('satisfaction-chart');
        if (satisfactionChart) {
            const countEl = satisfactionChart.querySelector('.count-up') as HTMLElement;
            if (countEl) countEl.innerText = "0";
            chartObserver.observe(satisfactionChart);
        }

        const timer = setTimeout(() => {
            // 현재 활성화된 페이지 컨테이너 내의 히어로 섹션만 정밀 타겟팅
            const activePageContainer = document.querySelector(`.page-content.active`);
            if (activePageContainer) {
                const hero = activePageContainer.querySelector('.hero-brand, .hero-premium');
                if (hero) hero.classList.add('active');
            }

            document.querySelectorAll('.reveal').forEach(el => {
                if (el.id !== 'satisfaction-chart' && !el.classList.contains('hero-brand') && !el.classList.contains('hero-premium')) {
                    revealObserver.observe(el);
                }
            });
            // 통계 카드 관찰 시작
            document.querySelectorAll('.hero-stats, .school-stats').forEach(el => countObserver.observe(el));
        }, 300);

        return () => {
            clearTimeout(timer);
            chartObserver.disconnect();
            revealObserver.disconnect();
            countObserver.disconnect();
        };
    }, [activePage, activePhysicalSub]);

    // 💎 만족도 카드 등장 애니메이션 관찰
    useEffect(() => {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        const cards = document.querySelectorAll('.stat-floating-card');
        cards.forEach(card => revealObserver.observe(card));

        return () => revealObserver.disconnect();
    }, [clientReviews]);

    // 모바일 슬라이더 (원본 script.js)
    useEffect(() => {
        if (typeof window === 'undefined' || window.innerWidth > 768) return;
        const gridSelectors = '.agenda-grid, .gateway-grid, .card-grid, .service-grid, .school-process-grid, .school-feature-grid, .product-grid, .expert-grid, .grid-vertical, .grid-2x2';
        const grids = document.querySelectorAll(gridSelectors);

        grids.forEach(grid => {
            if (grid.parentElement?.classList.contains('mobile-slider-wrapper')) return;
            const wrapper = document.createElement('div');
            wrapper.className = 'mobile-slider-wrapper';
            grid.parentNode?.insertBefore(wrapper, grid);
            wrapper.appendChild(grid);

            const prevBtn = document.createElement('button');
            prevBtn.innerHTML = '&#10094;';
            prevBtn.className = 'mobile-nav-btn prev-btn';
            const nextBtn = document.createElement('button');
            nextBtn.innerHTML = '&#10095;';
            nextBtn.className = 'mobile-nav-btn next-btn';

            wrapper.appendChild(prevBtn);
            wrapper.appendChild(nextBtn);

            let autoPlayTimer: NodeJS.Timeout;
            const slideNext = () => {
                if (window.innerWidth > 768) return;
                const firstChild = grid.children[0] as HTMLElement;
                if (!firstChild) return;
                const cardWidth = firstChild.offsetWidth + 15;
                if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 10) {
                    grid.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    grid.scrollBy({ left: cardWidth, behavior: 'smooth' });
                }
            };
            const slidePrev = () => {
                if (window.innerWidth > 768) return;
                const firstChild = grid.children[0] as HTMLElement;
                if (!firstChild) return;
                const cardWidth = firstChild.offsetWidth + 15;
                if (grid.scrollLeft <= 0) {
                    grid.scrollTo({ left: grid.scrollWidth, behavior: 'smooth' });
                } else {
                    grid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
                }
            };

            const resetTimer = () => { clearInterval(autoPlayTimer); autoPlayTimer = setInterval(slideNext, 3500); };
            nextBtn.addEventListener('click', () => { slideNext(); resetTimer(); });
            prevBtn.addEventListener('click', () => { slidePrev(); resetTimer(); });
            autoPlayTimer = setInterval(slideNext, 3500);
            grid.addEventListener('touchstart', () => clearInterval(autoPlayTimer), { passive: true });
            grid.addEventListener('touchend', () => resetTimer(), { passive: true });
        });
    }, [activePage, activePhysicalSub]);

    // 돋보기 X-ray 효과 (모바일 터치 지원 추가)
    useEffect(() => {
        if (activePage !== 'page-home') return;

        const container = document.querySelector('.magnify-container') as HTMLElement;
        if (!container) return;

        const glass = container.querySelector('.magnify-glass') as HTMLElement;

        const updatePosition = (clientX: number, clientY: number) => {
            const rect = container.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;

            const tiltX = ((y / rect.height) - 0.5) * -12;
            const tiltY = ((x / rect.width) - 0.5) * 12;

            requestAnimationFrame(() => {
                container.style.setProperty('--x', `${x}px`);
                container.style.setProperty('--y', `${y}px`);
                
                // 1. 컨테이너 전체 기울기 및 그림자 (Shadow)
                container.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                container.style.boxShadow = `${-tiltY * 3}px ${tiltX * 3}px 50px rgba(0,0,0,0.6), 0 0 20px rgba(0, 255, 255, 0.1)`;
                
                // 2. 레이어별 파라락스 (입체감)
                const human = container.querySelector('.magnify-human') as HTMLElement;
                const skeleton = container.querySelector('.magnify-skeleton') as HTMLElement;
                const shine = container.querySelector('.magnify-shine') as HTMLElement;

                if (human) human.style.transform = `translate3d(${-tiltY * 0.5}px, ${tiltX * 0.5}px, 20px)`;
                if (skeleton) skeleton.style.transform = `translate3d(${tiltY * 0.3}px, ${-tiltX * 0.3}px, -30px) scale(1.05)`;

                // 3. 광택 (Shine) 위치 조정
                if (shine) {
                    shine.style.backgroundPosition = `${50 + tiltY * 2}% ${50 + tiltX * 2}%`;
                }

                if (glass) {
                    glass.style.left = `${x}px`;
                    glass.style.top = `${y}px`;
                    glass.style.display = 'block';
                    
                    const angle = Math.abs(Math.floor(tiltY * 2 + 15));
                    const score = 90 + Math.floor(Math.random() * 10);
                    glass.setAttribute('data-info', `ANGLE: ${angle}°\nSCORE: ${score}%`);
                }
            });
        };

        const handleMouseMove = (e: globalThis.MouseEvent) => updatePosition(e.clientX, e.clientY);
        const handleTouchMove = (e: globalThis.TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                updatePosition(touch.clientX, touch.clientY);
            }
        };

        const handleEnter = () => container.classList.add('magnify-hover');
        const handleLeave = () => {
            container.classList.remove('magnify-hover');
            container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            if (glass) glass.style.display = 'none';
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleEnter);
        container.addEventListener('mouseleave', handleLeave);
        container.addEventListener('touchstart', (e) => { handleEnter(); handleTouchMove(e); }, { passive: true });
        container.addEventListener('touchmove', (e) => { handleTouchMove(e); }, { passive: true });
        container.addEventListener('touchend', handleLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseenter', handleEnter);
            container.removeEventListener('mouseleave', handleLeave);
            container.removeEventListener('touchstart', handleTouchMove);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleLeave);
        };
    }, [activePage]);



    // Swiper 마운트 (데이터나 필터가 바뀔 때마다 재시동)
    useEffect(() => {
        const initSwipers = () => {
            if (typeof (window as any).Swiper !== 'undefined') {
                // 기존 인스턴스가 있다면 파괴하고 새로 생성 (중복 방지)
                if ((window as any).reviewSwiperInstance) {
                    (window as any).reviewSwiperInstance.destroy(true, true);
                }

                (window as any).reviewSwiperInstance = new (window as any).Swiper(".reviewSwiper", {
                    slidesPerView: 1, 
                    spaceBetween: 20, 
                    observer: true, 
                    observeParents: true,
                    pagination: { el: ".swiper-pagination", clickable: true },
                    breakpoints: { 
                        768: { slidesPerView: 2, spaceBetween: 20 }, 
                        1024: { slidesPerView: 3, spaceBetween: 30 } 
                    }
                });

                // 파트너 슬라이더는 한 번만 실행
                if (!(window as any).partnerSwiperInstance) {
                    (window as any).partnerSwiperInstance = new (window as any).Swiper(".partnerSwiper", {
                        slidesPerView: 2, spaceBetween: 15, loop: true, autoplay: { delay: 2000, disableOnInteraction: false },
                        breakpoints: { 640: { slidesPerView: 3, spaceBetween: 20 }, 1024: { slidesPerView: 5, spaceBetween: 30 } }
                    });
                }
            }
        };

        if (!document.getElementById('swiper-script')) {
            const script = document.createElement('script');
            script.id = 'swiper-script';
            script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
            script.onload = initSwipers;
            document.body.appendChild(script);
        } else {
            // 이미 스크립트가 있다면 데이터 로딩 후 약간의 지연시간을 주고 초기화
            const timer = setTimeout(initSwipers, 100);
            return () => clearTimeout(timer);
        }
    }, [activePage, reviewsData, reviewFilter]); // 💡 감지 대상에 데이터와 필터 추가!

    // 브라우저 뒤로가기 대응을 위한 History API 연동
    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (event.state && event.state.page) {
                setActivePage(event.state.page);
                setActivePhysicalSub(null);
            } else {
                setActivePage('page-home');
            }
        };

        window.addEventListener('popstate', handlePopState);
        // 초기 상태 설정
        if (!window.history.state) {
            window.history.replaceState({ page: 'page-home' }, '', '');
        }

        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // 기능 함수 모음
    const switchPage = (pageId: string) => {
        setActivePage(pageId);
        setActivePhysicalSub(null);
        setIsMobileMenuOpen(false);

        // 브라우저 히스토리에 상태 추가
        window.history.pushState({ page: pageId }, '', '');

        if (pageId !== 'page-physical') window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const openPhysicalSub = (subId: string) => {
        setActivePhysicalSub(subId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const showPhysicalGateway = () => {
        setActivePhysicalSub(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const openModal = (modalId: string) => {
        if (modalId === 'modal-quiz') resetQuiz();
        setActiveModal(modalId);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setActiveModal(null);
        document.body.style.overflow = 'auto';
    };

    const openKakaoChat = () => {
        const kakaoChannelId = "_HwxiXn"; 
        window.open(`https://pf.kakao.com/${kakaoChannelId}/chat`, '_blank');
    };

    const showToast = (message: string) => {
        const existingToast = document.querySelector('.custom-toast');
        if (existingToast) existingToast.remove();
        const toast = document.createElement('div');
        toast.className = 'custom-toast';
        toast.innerHTML = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    };

    const toggleFaq = (e: MouseEvent<HTMLDivElement>) => {
        e.currentTarget.classList.toggle('open');
    };

    const toggleSubModulesList = (e: MouseEvent<HTMLDivElement>) => {
        const content = e.currentTarget.nextElementSibling as HTMLElement;
        const icon = e.currentTarget.querySelector('.toggle-icon') as HTMLElement;
        if (content && icon) {
            if (content.style.display === 'flex') {
                content.style.display = 'none';
                icon.innerText = '▼';
            } else {
                content.style.display = 'flex';
                icon.innerText = '▲';
            }
        }
    };


    const submitProposalForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 1. 속도 제한 체크
        const now = Date.now();
        if (now - lastSubmitTime < 60000) {
            showToast(`⚠️ 너무 자주 요청하셨습니다. ${Math.ceil((60000 - (now - lastSubmitTime)) / 1000)}초 후 다시 시도해 주세요.`);
            return;
        }

        const form = e.currentTarget;
        
        // 2. 체크박스 데이터 수집 로직 복구
        const parts: Record<string, { selected: boolean; sub_modules: string[] }> = {
            part1: { selected: false, sub_modules: [] },
            part2: { selected: false, sub_modules: [] },
            part3: { selected: false, sub_modules: [] },
            part4: { selected: false, sub_modules: [] },
        };

        const allChecked = form.querySelectorAll('input[name="sub_module"]:checked');
        if (allChecked.length === 0) {
            showToast('⚠️ 희망 도입 파트(세부 항목)를 최소 1개 이상 체크해 주세요.');
            return;
        }

        // 체크된 항목들 분류 (예시로 part1에 모두 담거나 로직에 맞춰 배분)
        parts.part1.selected = true;
        parts.part1.sub_modules = Array.from(allChecked).map(cb => (cb as HTMLInputElement).value);

        if (emailError) {
            showToast('⚠️ 올바른 이메일 주소를 입력해 주세요.');
            return;
        }

        // 3. 입력값 정화 및 검증
        const data = {
            company: sanitize((form.elements.namedItem('company') as HTMLInputElement).value),
            manager: sanitize((form.elements.namedItem('manager') as HTMLInputElement).value),
            phone: sanitize((form.elements.namedItem('phone') as HTMLInputElement).value),
            email: sanitize((form.elements.namedItem('email') as HTMLInputElement).value),
            scale: (form.elements.namedItem('scale') as HTMLSelectElement).value,
            inquiry: sanitize((form.elements.namedItem('inquiry') as HTMLTextAreaElement)?.value || ''),
            parts: parts
        };

        if (!data.company || !data.manager || !data.phone || !data.email) {
            showToast('⚠️ 모든 필수 항목을 정확히 입력해 주세요.');
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/proposals/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                const err = await res.json();
                showToast('❌ 저장 중 오류가 발생했습니다.<br>' + (err.detail || '알 수 없는 오류'));
                return;
            }

            showToast('✅ 제안서 요청이 성공적으로 접수되었습니다. <br /> 전문가가 확인 후 빠르게 연락드리겠습니다.');
            setLastSubmitTime(Date.now()); // 🛡️ 성공 시 쿨타임 시작
            closeModal();
            form.reset();
        } catch (err) {
            showToast('❌ 저장 중 오류가 발생했습니다.<br>네트워크 오류');
        }
    };

    const nextQuizStep = (step: number, target?: string) => {
        if (target) setQuizTarget(target);
        setQuizStep(step);
    };

    const handleQuizAnswer = (index: number, answer: number) => {
        const newAnswers = [...quizAnswers];
        newAnswers[index] = answer;
        setQuizAnswers(newAnswers);
    };

    const submitQuiz = () => {
        if (quizAnswers.includes(-1)) {
            showToast("모든 문항에 응답해주세요.");
            return;
        }

        let A=0, B=0, C=0, D=0;
        if (quizTarget === 'b2b') {
            A = quizAnswers[0] + quizAnswers[1] + quizAnswers[2];
            B = quizAnswers[3] + quizAnswers[4] + quizAnswers[5] + quizAnswers[6];
            C = quizAnswers[7] + quizAnswers[8];
            D = quizAnswers[9] + quizAnswers[10] + quizAnswers[11];
        } else {
            A = quizAnswers[0] + quizAnswers[1] + quizAnswers[2];
            B = quizAnswers[3] + quizAnswers[4] + quizAnswers[5];
            C = quizAnswers[6] + quizAnswers[7] + quizAnswers[8];
            D = quizAnswers[9] + quizAnswers[10] + quizAnswers[11];
        }

        const scores = [
            { type: 'D', score: D },
            { type: 'A', score: A },
            { type: 'C', score: C },
            { type: 'B', score: B }
        ];

        scores.sort((a, b) => b.score - a.score);
        const topType = scores[0].type;

        let title = '';
        let desc = '';
        if (quizTarget === 'b2b') {
            if (topType === 'A') { title = "근골격 및 산재 위험형"; desc = "AI 체형평가 및 현장 1:1 케어 등 통증/안전사고 예방 프로그램이 우선 권장됩니다."; }
            else if (topType === 'B') { title = "VDT 및 거북목 집중형"; desc = "오피스 요가, 필라테스 및 바른 자세 만들기 등 사무실 맞춤 프로그램이 필요합니다."; }
            else if (topType === 'C') { title = "활력 저하 및 번아웃형"; desc = "팀워크 강화를 위한 그룹 플로우 필라테스, 멘탈 회복 프로그램이 가장 시급합니다."; }
            else if (topType === 'D') { title = "대사증후군 및 생활습관형"; desc = "돌연사를 막는 심혈관 질환 예방 전문 강의 및 식습관 코칭이 추천됩니다."; }
        } else {
            if (topType === 'A') { title = "직무 몰입을 방해하는 통증 스트레스형"; desc = "근골격계 통증을 즉각적으로 해소하는 1:1 피지컬케어와 셀프 테이핑 관리가 필요합니다."; }
            else if (topType === 'B') { title = "체형 불균형을 부르는 운동 부족형"; desc = "굳은 몸을 풀고 올바른 정렬을 회복하는 바른 자세 만들기와 기초 체력 증진이 필요합니다."; }
            else if (topType === 'C') { title = "의욕 저하 및 디지털/야식 의존형"; desc = "전사 다이어트 프로그램이나 활력 부스팅 그룹 필라테스로 멘탈 리프레시가 필요합니다."; }
            else if (topType === 'D') { title = "생활습관 개선이 필요한 건강 적신호형"; desc = "대사증후군 예방을 위한 심혈관 전문 강의와 건강한 식습관 및 수면 관리가 최우선입니다."; }
        }

        setQuizResultTitle(title);
        setQuizResultDesc(desc);
        setInquiryText(`[맞춤 솔루션 진단 결과]\n진단 유형: ${title}\n추천 솔루션: ${desc}\n\n`);
        setQuizStep(3);
    };

    const resetQuiz = () => {
        setQuizTarget('');
        setQuizStep(1);
        setQuizAnswers(Array(12).fill(-1));
    };


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data, error } = await supabase
                    .from('client_reviews')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (data && !error && data.length >= 3) {
                    setReviewsData(data);
                } else {
                    // 데이터가 부족하거나 없을 경우 기본 풍성한 샘플 데이터 세팅
                    const baseData = data || [];
                    setReviewsData([
                        ...baseData,
                        { type: 'b2b', stars: '★★★★★', text: '"수업 끝나고 사무실로 복귀할 때 벌써 변화를 체감합니다. 발바닥, 종아리, 허벅지 움직임부터가 다르네요. 최고입니다!"', reviewer: 'S사 운영팀' },
                        { type: 'b2b', stars: '★★★★★', text: '"늘어나는 산재 발생이 큰 고민이었는데 업무 시작 전 사고를 예방하는 프로그램을 진행하면서 눈에 띄게 줄었어요."', reviewer: 'H사 안전환경팀' },
                        { type: 'school', stars: '★★★★☆', text: '"모든 학생이 형평성 있게 검진을 이용할 수 있다는 점이 좋았어요. 체계적인 데이터 리포트 덕분에 학부모님들 만족도도 높습니다."', reviewer: 'OO고등학교 보건교사' }
                    ]);
                }
            } catch (err) {
                console.error('Reviews fetch error:', err);
            }
        };
        fetchReviews();
    }, []);

    return (
        <>
            <header>
                <div className="logo" onClick={() => switchPage('page-home')}>FaWW</div>
                <button className="hamburger-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>☰</button>
                <ul className={`nav-links ${isMobileMenuOpen ? 'show' : ''}`}>
                    <li><a href="#" className={activePage === 'page-home' ? 'active-nav' : ''} onClick={(e) => { e.preventDefault(); switchPage('page-home'); }}>파우 소개</a></li>
                    <li className="nav-dropdown-item">
                        <a href="#" className={activePage === 'page-ai' ? 'active-nav' : ''} onClick={(e) => { e.preventDefault(); switchPage('page-ai'); }}>스마트 AI 체형분석</a>
                        <ul className="sns-dropdown">
                            <li><a href="#" onClick={(e) => { e.preventDefault(); switchPage('page-eap'); }}>기업용 DX</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); switchPage('page-school'); }}>학교용 DX</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('page-physical'); setActivePhysicalSub('sub-center'); window.scrollTo(0, 0); }}>개인용 DX</a></li>
                        </ul>
                    </li>
                    <li className="nav-dropdown-item">
                        <a href="#" className={activePage === 'page-physical' ? 'active-nav' : ''} onClick={(e) => { e.preventDefault(); switchPage('page-physical'); }}>피지컬케어</a>
                        <ul className="sns-dropdown">
                            <li><a href="#" onClick={(e) => { e.preventDefault(); switchPage('page-eap'); }}>피지컬케어 (기업용DX)</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('page-physical'); setActivePhysicalSub('sub-academy'); window.scrollTo(0, 0); }}>자격증</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('page-physical'); setActivePhysicalSub('sub-center'); window.scrollTo(0, 0); }}>센터</a></li>
                        </ul>
                    </li>
                    <li><a href="#" className={activePage === 'page-mall' ? 'active-nav' : ''} onClick={(e) => { e.preventDefault(); switchPage('page-mall'); }}>피지컬케어 mall</a></li>
                    <li className="nav-sns">
                        <a href="#">SNS</a>
                        <ul className="sns-dropdown">
                            <li><a href="https://blog.naver.com/fawwceo" target="_blank" rel="noopener noreferrer">블로그 (Blog)</a></li>
                            <li><a href="https://www.instagram.com/physicalcare_ydp/" target="_blank" rel="noopener noreferrer">인스타그램 (Insta)</a></li>
                            <li><a href="https://cafe.naver.com/physicalcare" target="_blank" rel="noopener noreferrer">네이버 카페 (Cafe)</a></li>
                        </ul>
                    </li>
                </ul>
                <div className={`nav-actions ${isMobileMenuOpen ? 'show' : ''}`}>
                    <button className="consult-btn" onClick={() => openModal('modal-proposal')}>도입 및 제휴 문의</button>
                </div>
            </header>

            <div className="fab-container">
                <div className="chatbot-badge" onClick={openKakaoChat}>💬 실시간 챗봇 문의</div>
            </div>

            <main id="page-home" className={`page-content ${activePage === 'page-home' ? 'active' : ''}`}>
                <section className="hero-brand reveal">
                    <video className="hero-video-bg" autoPlay loop muted playsInline>
                        <source src="background3.mp4" type="video/mp4" />
                    </video>
                    <div className="hero-overlay"></div>

                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <div className="hero-subtitle hero-el hero-el-1">FaWW : Family Wholesome Wellness</div>
                        <h1 className="hero-el hero-el-2">
                            <span className="text-highlight">건강</span>이 함께하는 <span className="text-highlight">회사</span>,<br />
                            <span className="text-highlight">기업복지</span>의 원조는 <span className="text-highlight">FaWW</span>
                        </h1>
                        <p className="hero-el hero-el-3">
                            <strong>스마트 AI를 활용한 맞춤형 케어프로그램</strong><br />
                            근골격계 질환, 1:1 케어 프로그램을 통한 산재 예방 시스템을<br />업계 최초로 도입한 피지컬케어 전문가가 함께합니다
                        </p>
                        <div className="hero-buttons hero-el hero-el-4" style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '30px' }}>
                            <button className="btn-primary" onClick={() => openModal('modal-proposal')}>맞춤 솔루션 문의하기</button>
                            <button className="btn-outline" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.5)', padding: '16px 36px', borderRadius: '30px', fontWeight: 'bold' }} onClick={() => openModal('modal-quiz')}>내게 맞는 솔루션 찾기 (퀴즈)</button>
                        </div>
                    </div>

                    <div className="hero-stats-wrapper">
                        <div className="hero-stats">
                            <div className="stat-item">
                                <div className="stat-num"><span className="count-up" data-target="12">0</span>년+</div>
                                <div className="stat-label">피지컬케어 도입</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-num"><span className="count-up" data-target="120">0</span>+</div>
                                <div className="stat-label">파트너 기업 및 학교</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-num"><span className="count-up" data-target="99">0</span>%</div>
                                <div className="stat-label">고객 만족도</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-num"><span className="count-up" data-target="20000" data-format="true">0</span>+</div>
                                <div className="stat-label">관리 임직원 수</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="teaser-section reveal">
                    <div className="container text-center">
                        <div className="teaser-text step-1 reveal reveal-left">담당자님,</div>
                        <div className="teaser-text step-2 reveal reveal-left delay-2" style={{ fontSize: '52px' }}> <span style={{ color: '#2b8a3e' }}>사고 없는 현장</span>과 <span style={{ color: '#2b8a3e' }}>건강한 사무환경</span>을 만드는<br />산업안전보건의 파트너를 찾으시나요?</div>
                        <div className="teaser-text step-3 reveal reveal-scale delay-3" style={{ fontSize: '42px' }}> 파우(FaWW)가 함께 하겠습니다.</div>
                        <div className="teaser-text step-4 reveal reveal-scale delay-4" style={{ fontSize: '26px' }}>&quot;피지컬케어 원조&quot;로서 증명해온 결과를 보여드리겠습니다.</div>
                        <div className="teaser-text step-5 reveal reveal-scale delay-5">지금부터 파우(FaWW)를 소개합니다. ▼</div>
                    </div>
                </section>

                <section className="magnify-section reveal">
                    <div className="container text-center">
                        <span className="section-kicker reveal delay-1">AI-POWERED ANALYSIS</span>
                        <h2 className="section-title reveal delay-2" style={{ 
                            color: '#fff', 
                            textShadow: '0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(125,185,255,0.2)',
                            fontSize: '46px',
                            fontWeight: '700',
                            marginBottom: '20px'
                        }}>커서를 올려 AI 분석을 체험해보세요</h2>
                        <p className="section-desc reveal delay-3" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', lineHeight: '1.6' }}>
                            FaWW의 <span style={{ 
                                color: '#00ff88', 
                                fontWeight: 'bold', 
                                textShadow: '0 0 8px rgba(0,255,136,0.6), 0 0 20px rgba(0,255,136,0.3)' 
                            }}>스마트 AI 기술</span>은 신체 불균형을 정밀하게 측정하여<br />눈에 보이지 않는 통증의 원인을 찾아냅니다.
                        </p>
                        <div className="magnify-container reveal delay-4">
                            {/* 동적 광택 레이어 */}
                            <div className="magnify-shine"></div>

                            <div className="magnify-skeleton" style={{ backgroundImage: "url('/images/skeleton.png')" }}></div>
                            <div className="magnify-human" style={{ backgroundImage: "url('/images/human.png')" }}></div>
                            <div className="magnify-glass"></div>
                        </div>
                        <p className="reveal delay-5" style={{ marginTop: '20px', fontSize: '14px', color: '#888' }}>* 위 이미지는 이해를 돕기 위한 연출이며, 실제 분석은 전문 장비로 진행됩니다.</p>
                    </div>
                </section>

                <section className="jelly-chart-section reveal" style={{ padding: '40px 0 60px', backgroundColor: '#f8f9fa', borderTop: '1px solid #eee', overflow: 'visible' }}>
                    <div className="container text-center" style={{ overflow: 'visible' }}>
                        <h2 className="section-title reveal delay-1" style={{ marginBottom: '10px' }}>FaWW <span className="text-highlight">피지컬케어 종합 만족도</span></h2>
                        <p className="section-desc reveal delay-2" style={{ marginBottom: '40px' }}>2만 건 이상의 데이터가 증명하는 압도적인 결과</p>

                        <div className="jelly-chart-container reveal delay-3" id="satisfaction-chart">
                            <div className="jelly-pie-wrapper">
                                <div className="jelly-pie-scene">
                                    {/* 차트 그림자 */}
                                    <div className="jelly-shadow"></div>
                                    
                                    {/* 3D 실린더 두께 레이어 (여러 겹으로 부피감 형성) */}
                                    <div className="jelly-extrusion"></div>
                                    <div className="jelly-layer bottom"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" className="j-bg" /><circle cx="16" cy="16" r="8" className="j-fg" pathLength="100" /></svg></div>
                                    <div className="jelly-layer mid"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" className="j-bg" /><circle cx="16" cy="16" r="8" className="j-fg" pathLength="100" /></svg></div>
                                    
                                    {/* 최상단 면 (광택 및 수치) */}
                                    <div className="jelly-layer top">
                                        <svg viewBox="0 0 32 32">
                                            <circle cx="16" cy="16" r="8" className="j-bg" pathLength="100" />
                                            <circle cx="16" cy="16" r="8" className="j-fg count-up-circle" pathLength="100" />
                                        </svg>
                                        <div className="jelly-gloss"></div>
                                    </div>

                                    {/* 공중에 뜬 수치 데이터 */}
                                    <div className="jelly-text-float">
                                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                                            <span className="jelly-percent count-up neon-text" data-target="99">0</span>
                                            <span className="jelly-sign">%</span>
                                        </div>
                                        <span className="jelly-label">종합 만족도</span>
                                    </div>
                                </div>
                            </div>

                            {/* 💎 부유하는 만족도 카드들 (실제 DB 연동 + PTS 제외 필터) */}
                            {reviewsData.filter(r => r.type === 'b2b' && !r.reviewer.includes('PTS') && !r.text.includes('PTS')).length > 0 ? (
                                reviewsData.filter(r => r.type === 'b2b' && !r.reviewer.includes('PTS') && !r.text.includes('PTS')).slice(0, 3).map((rev, idx) => (
                                    <div key={idx} className={`stat-floating-card card-${idx + 1} reveal delay-${idx + 4}`}>
                                        <div className="stat-card-badge">CORPORATE</div>
                                        <h4>{rev.reviewer}</h4>
                                        <p className="rev-text">{rev.text}</p>
                                        <div style={{ color: '#fab005', fontSize: '12px', marginTop: '8px' }}>{rev.stars}</div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div className="stat-floating-card card-1 reveal delay-4">
                                        <div className="stat-card-badge">CORPORATE</div>
                                        <h4>LG 디스플레이 임직원</h4>
                                        <p className="rev-text">"사내로 직접 찾아오시는 출장 케어 덕분에 업무 중 짬을 내어 고질적인 거북목 통증을 해결할 수 있었습니다. 전문가의 손길이 확실히 다르네요."</p>
                                        <div style={{ color: '#fab005', fontSize: '12px', marginTop: '8px' }}>★★★★★</div>
                                    </div>
                                    <div className="stat-floating-card card-2 reveal delay-5">
                                        <div className="stat-card-badge">FIELD CARE</div>
                                        <h4>현대자동차 생산라인</h4>
                                        <p className="rev-text">"현장 근로자들의 신체적 특성을 정확히 이해하고 계십니다. 1:1 맞춤형 체형 분석과 스트레칭 교육이 실제 피로도 감소에 큰 도움이 되었습니다."</p>
                                        <div style={{ color: '#fab005', fontSize: '12px', marginTop: '8px' }}>★★★★★</div>
                                    </div>
                                    <div className="stat-floating-card card-3 reveal delay-6">
                                        <div className="stat-card-badge">OFFICE CARE</div>
                                        <h4>네이버 인사팀장</h4>
                                        <p className="rev-text">"임직원 복지 차원에서 도입했는데 만족도가 기대 이상입니다. 정기적인 방문 케어 이후 사내 분위기가 훨씬 밝아지고 업무 집중도가 높아졌습니다."</p>
                                        <div style={{ color: '#fab005', fontSize: '12px', marginTop: '8px' }}>★★★★★</div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="pie-legend reveal delay-4">
                            <span className="legend-item"><span className="legend-color" style={{ background: 'rgba(43, 138, 62, 0.8)' }}></span>매우 만족 99%</span>
                            <span className="legend-item"><span className="legend-color" style={{ background: 'rgba(232, 245, 233, 0.8)' }}></span>만족 1%</span>
                            <span className="legend-item"><span className="legend-color" style={{ background: '#888' }}></span>보통 0%</span>
                            <span className="legend-item"><span className="legend-color" style={{ background: '#333' }}></span>불만족 0%</span>
                        </div>
                    </div>
                </section>

                <section className="agenda-section reveal">
                    <div className="container">
                        <div className="agenda-header">
                            <span className="section-kicker reveal">CORE AGENDA</span>
                            <h2 className="section-title reveal">조직의 가장 큰 고민,<br /><span>&apos;피지컬케어(Physical Care)&apos;</span>에서 해답을 찾다</h2>
                            <p className="section-desc reveal delay-1">단순한 복지를 넘어 산업재해, 저출산, 멘탈케어까지. 국가와 기업의 핵심 과제를 해결합니다.</p>
                        </div>
                        <div className="agenda-grid">
                            <div className="agenda-card reveal reveal-left">
                                <div className="agenda-icon">🚨</div>
                                <h3 style={{ fontSize: '28px', lineHeight: '1.3' }}>건강한 몸이 곧<br />산재의 예방입니다</h3>
                                <p style={{ fontSize: '18px' }}>눈에 보이지 않는 신체의 피로와 통증은 예고 없이 찾아오는 산재의 씨앗입니다. 근골격계 질환을 선제적으로 예방하여 <br />법적 리스크를 낮추고 조직의 생산성을 극대화하십시오.</p>
                            </div>
                            <div className="agenda-card reveal reveal-scale delay-2">
                                <div className="agenda-icon">👶</div>
                                <h3 style={{ fontSize: '28px', lineHeight: '1.3' }}>산모의 건강이<br />성공적 복직의 키 입니다 </h3>
                                <p style={{ fontSize: '18px' }}>출산 친화적 조직문화, 이제는 신체의 근본적인 건강에서 출발해야 합니다. 전문가의 섬세한 피지컬케어로 출산 전후의 신체 회복을 돕고, 일과 가정이 양립하는 건강한 환경을 완성합니다.</p>
                            </div>
                            <div className="agenda-card reveal reveal-right delay-3">
                                <div className="agenda-icon">🧠</div>
                                <h3 style={{ fontSize: '28px', lineHeight: '1.3' }}>신체가 건강해야<br />마음도 건강해집니다</h3>
                                <p style={{ fontSize: '18px' }}>굳어있는 몸의 긴장은 곧 우울감과 번아웃으로 이어집니다. 전문가의 직접적인 피지컬케어로 신체의 활력을 되찾아주고, 마음의 병과 극단적인 선택을 예방하는 새로운 EAP를 제시합니다.</p>
                            </div>
                        </div>

                        <div className="expert-banner reveal">
                            <h4>⚠️ 자격증 없는 무자격 플랫폼 업체를 주의하십시오.</h4>
                            <p>단순 외부 강사들을 매칭해주는 타 플랫폼과 비교를 거부합니다.<br />
                                FaWW는 12년 이상의 독보적 임상 노하우를 바탕으로 &apos;피지컬케어관리사&apos; 자격증을 창시한<br />
                                대한민국 <strong>&apos;원조(Original)&apos;</strong> 그룹입니다.<br /><br />
                                검증되지 않은 1회성 휴식이 아닌, 뼈와 근막을 완벽히 이해하는<br />
                                진짜 전문가의 개입만이 실질적인 지표 변화를 만듭니다.</p>
                        </div>

                        <div className="expert-features">
                            <div style={{ textAlign: 'center', marginBottom: '40px' }} className="reveal">
                                <span className="section-kicker reveal">EAP SYSTEM</span>
                                <h2 className="section-title reveal" style={{ marginBottom: 0 }}>FaWW만의 독보적 EAP 운영 시스템</h2>
                            </div>
                            <div className="expert-grid">
                                <div className="agenda-card reveal" style={{ border: '2px solid #2b8a3e', boxShadow: '0 10px 30px rgba(43, 138, 62, 0.08)' }}>
                                    <div className="agenda-icon">📊</div>
                                    <h3>담당자의 성과를 증명하는 &apos;사후 리포트&apos;</h3>
                                    <p>현장 케어 후 단순 만족도 조사가 아닌, <strong>AI 스캐닝 기반의 <br />신체 개선 수치를 시각화한 리포트</strong>를 제공합니다. 인사평가, ESG 및 <br />산업안전보건 증빙 자료로 즉시 활용 가능한 결과물을 책임집니다.</p>
                                    <div className="mini-chart">
                                        <div className="mini-bar mini-bar-1" style={{ backgroundColor: '#2b8a3e' }}></div>
                                        <div className="mini-bar mini-bar-2" style={{ backgroundColor: '#40c057' }}></div>
                                        <div className="mini-bar mini-bar-3" style={{ backgroundColor: '#8ce99a' }}></div>
                                    </div>
                                </div>
                                <div className="agenda-card reveal delay-1" style={{ border: '2px solid #111', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                                    <div className="agenda-icon">🏅</div>
                                    <h3>&apos;원조&apos; 피지컬케어 전문가 100% 검증 파견</h3>
                                    <p>외부 강사를 대충 고용하여 단순 파견하지 않습니다. <br />12년 노하우가 담긴 자체 아카데미의 <strong>피지컬케어 자격 인증(PCM, PTS)을 완벽히 통과한 최상위 전문가</strong>만을 육성 및 파견합니다. </p>
                                    <div className="badge-row" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                                        <div className="mini-badge" style={{ fontSize: '12px', background: '#f8f9fa', padding: '5px 12px', borderRadius: '20px', border: '1px solid #eee', color: '#666', fontWeight: 'bold' }}>✓ 100% 검증</div>
                                        <div className="mini-badge" style={{ fontSize: '12px', background: '#f8f9fa', padding: '5px 12px', borderRadius: '20px', border: '1px solid #eee', color: '#666', fontWeight: 'bold' }}>✓ PCM 자격</div>
                                        <div className="mini-badge" style={{ fontSize: '12px', background: '#f8f9fa', padding: '5px 12px', borderRadius: '20px', border: '1px solid #eee', color: '#666', fontWeight: 'bold' }}>✓ PTS 자격</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="comparison-section reveal" style={{ padding: '60px 0', background: '#fff', borderTop: '1px solid #eee' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <span className="section-kicker reveal">DIFFERENCE</span>
                        <h2 className="section-title reveal">품의서가 통과되는 압도적 차이</h2>
                        <p className="section-desc reveal delay-1">단순 매칭 플랫폼과 피지컬케어 원조 그룹의 본질적인 차이를 확인하세요.</p>
                        <div className="compare-table-wrapper" style={{ maxWidth: '900px', margin: '30px auto 0', border: '1px solid #eaeaea', borderRadius: '12px', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                                <thead>
                                    <tr style={{ background: '#f8f9fa' }}>
                                        <th style={{ padding: '20px', borderBottom: '1px solid #eaeaea' }}>비교 항목</th>
                                        <th style={{ padding: '20px', borderBottom: '1px solid #eaeaea', color: '#666' }}>타사 일반 플랫폼</th>
                                        <th style={{ padding: '20px', borderBottom: '1px solid #eaeaea', background: '#2b8a3e', color: '#fff', fontSize: '18px' }}>FaWW 피지컬케어 (원조)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '20px', fontWeight: 'bold', borderBottom: '1px solid #eaeaea', textAlign: 'left', background: '#fdfdfd' }}>전문가 파견 기준</td>
                                        <td style={{ padding: '20px', borderBottom: '1px solid #eaeaea', color: '#555' }}>단기 프리랜서 매칭</td>
                                        <td style={{ padding: '20px', borderBottom: '1px solid #eaeaea', fontWeight: 'bold', color: '#2b8a3e', background: '#e8f5e9' }}>100% 정규 과정 수료 마스터</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '20px', fontWeight: 'bold', borderBottom: '1px solid #eaeaea', textAlign: 'left', background: '#fdfdfd' }}>효과 측정/증빙</td>
                                        <td style={{ padding: '20px', borderBottom: '1px solid #eaeaea', color: '#555' }}>단순 만족도 설문</td>
                                        <td style={{ padding: '20px', borderBottom: '1px solid #eaeaea', fontWeight: 'bold', color: '#2b8a3e', background: '#e8f5e9' }}>스마트 AI 수치화 리포트</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '20px', fontWeight: 'bold', textAlign: 'left', background: '#fdfdfd' }}>케어의 본질</td>
                                        <td style={{ padding: '20px', color: '#555' }}>일시적인 근육 이완</td>
                                        <td style={{ padding: '20px', fontWeight: 'bold', color: '#2b8a3e', background: '#e8f5e9' }}>근육/관절 기반 통증 개선</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section className="gateway-section reveal">
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <span className="section-kicker reveal">OUR BUSINESS</span>
                            <h2 className="section-title reveal">지속가능한 웰니스 솔루션</h2>
                            <p className="section-desc reveal delay-1">FaWW의 3가지 비즈니스로 여러분의 조직과 일상에 건강을 선물하세요.</p>
                        </div>
                        <div className="gateway-grid">
                            <div className="gateway-card reveal" onClick={() => switchPage('page-ai')} style={{ padding: 0, overflow: 'hidden' }}>
                                <div className="gateway-img" style={{ height: '200px', position: 'relative', overflow: 'hidden', background: '#f0f0f0' }}>
                                    <img src="/images/gateway/ai_scanning.png" alt="AI Scanning" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div className="scan-line"></div>
                                </div>
                                <div className="gateway-content" style={{ padding: '30px' }}>
                                    <div className="tags-wrap"><span className="hash-tag">#임직원_통증관리</span><span className="hash-tag">#학생_체형검진</span></div>
                                    <h2>스마트 AI 체형분석 <br /> 솔루션</h2>
                                    <p>기업의 업무 효율을 높이는 <br />
                                        EAP 복지 프로그램부터 학교 <br />
                                        단체 검진까지, 데이터 기반의 <br />
                                        정확한 리포트를 제공합니다.</p>
                                    <div className="gateway-btn">조직 맞춤 솔루션 보기</div>
                                </div>
                            </div>
                            <div className="gateway-card reveal delay-1" onClick={() => switchPage('page-physical')} style={{ padding: 0, overflow: 'hidden' }}>
                                <div className="gateway-img" style={{ height: '200px', background: '#f0f0f0' }}>
                                    <img src="/images/gateway/physical_care.jpg" alt="Physical Care" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="gateway-content" style={{ padding: '30px' }}>
                                    <div className="tags-wrap"><span className="hash-tag">#로컬센터</span><span className="hash-tag">#전문가양성</span></div>
                                    <h2>FaWW <br /> 피지컬케어</h2>
                                    <p>전국 주요 오프라인 거점 센터를 통한 <br />
                                        개인 맞춤 관리와, 압도적인 전문가를 <br />
                                        양성하는 아카데미 교육 과정을 <br />
                                        운영합니다.</p>
                                    <div className="gateway-btn">피지컬케어 자세히 보기</div>
                                </div>
                            </div>
                            <div className="gateway-card reveal delay-2" onClick={() => switchPage('page-mall')} style={{ padding: 0, overflow: 'hidden' }}>
                                <div className="gateway-img" style={{ height: '200px', background: '#f0f0f0' }}>
                                    <img src="/images/gateway/mall.jpg" alt="Wellness Mall" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="gateway-content" style={{ padding: '30px' }}>
                                    <div className="tags-wrap"><span className="hash-tag">#홈케어교구</span><span className="hash-tag">#복지포인트</span></div>
                                    <h2>피지컬케어 <br /> Mall</h2>
                                    <p>전문가가 직접 검증한 릴렉싱 및 <br />
                                        트레이닝 교구. 기업 복지 포인트 <br />
                                        차감 및 안전한 셀프 홈케어를 <br />
                                        완벽 지원합니다.</p>
                                    <div className="gateway-btn">검증 교구 쇼핑하기</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="testimonials reveal">
                    <div className="container">
                        <h2 className="section-title reveal delay-1">담당자가 99%만족한 FaWW의 솔루션</h2>
                        <div className="review-filter-wrapper reveal delay-2" style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <button className={`review-filter-btn ${reviewFilter === 'all' ? 'active' : ''}`} onClick={() => setReviewFilter('all')}>전체 보기</button>
                            <button className={`review-filter-btn ${reviewFilter === 'b2b' ? 'active' : ''}`} onClick={() => setReviewFilter('b2b')}>🏢 기업/HR 담당자</button>
                            <button className={`review-filter-btn ${reviewFilter === 'school' ? 'active' : ''}`} onClick={() => setReviewFilter('school')}>🏫 학교/보건교사</button>
                        </div>

                        <div className="swiper reviewSwiper" key={`${reviewsData.length}-${reviewFilter}`} style={{ marginTop: '40px', padding: '20px 0' }}>
                            <div className="swiper-wrapper" id="review-wrapper">
                                {reviewsData.length > 0 ? (
                                    reviewsData
                                        .filter(rev => reviewFilter === 'all' || reviewFilter === rev.type)
                                        .map((rev, index) => (
                                            <div key={index} className="swiper-slide">
                                                <div className="testimonial-card">
                                                    <div className="stars">{rev.stars}</div>
                                                    <p className="review-text">{rev.text}</p>
                                                    <div className="reviewer-info">
                                                        <div className="reviewer-avatar"></div>
                                                        <span>{rev.reviewer}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '40px', color: '#999', width: '100%' }}>
                                        등록된 고객 후기가 없습니다. 관리자 페이지에서 등록해 주세요.
                                    </div>
                                )}
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                </section>

                <section className="map-section reveal">
                    <div className="container">
                        <h2 className="section-title reveal delay-1">전국 어디든, FaWW가 찾아갑니다</h2>
                        <p className="section-desc reveal delay-2" style={{ marginBottom: '50px' }}>전국 주요 기업 및 학교 500곳 이상 누적 방문 달성</p>
                        <div className="map-wrapper reveal delay-3">
                            <div className="map-marker" style={{ top: '25%', left: '35%' }}>
                                <div className="marker-btn">서울/경기 230곳</div>
                                <div className="marker-detail"><ul><li>대법원</li><li>국민건강보험공단</li><li>서울중부발전</li></ul></div>
                            </div>
                            <div className="map-marker" style={{ top: '40%', left: '60%' }}>
                                <div className="marker-btn">충청권 85곳</div>
                                <div className="marker-detail"><ul><li>히타치코리아</li><li>보령 한전kdn</li></ul></div>
                            </div>
                            <div className="map-marker" style={{ top: '75%', left: '75%' }}>
                                <div className="marker-btn">부산/경남 110곳</div>
                                <div className="marker-detail"><ul><li>창원지방법원</li><li>한국청소년활동진흥원</li><li>한울원자력발전소</li></ul></div>
                            </div>
                            <div className="map-marker" style={{ top: '60%', left: '40%' }}>
                                <div className="marker-btn">전라권 65곳</div>
                                <div className="marker-detail"><ul><li>나주 한전 kps</li><li>국가독성과학연구소</li></ul></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="partners reveal">
                    <div className="container">
                        <h2 className="section-title reveal delay-1">대한민국 일류 기업과 학교들이 FaWW와 함께합니다</h2>
                        <div className="marquee-wrapper reveal delay-2" style={{ marginTop: '60px' }}>
                            <div className="marquee-container">
                                {[...Array(2)].map((_, i) => (
                                    <React.Fragment key={i}>
                                        {[
                                            'ㄴ.png', 'ㅇ.jpg', '그림10.jpg', '그림11.png', '그림12.jpg', '그림13.jpg',
                                            '그림14.png', '그림15.jpg', '그림16.jpg', '그림17.png', '그림18.png', '그림19.png',
                                            '그림2.png', '그림20.jpg', '그림21.jpg', '그림22.png', '그림23.jpg', '그림24.png',
                                            '그림25.jpg', '그림26.jpg', '그림27.png', '그림28.png', '그림29.png', '그림3.jpg',
                                            '그림30.png', '그림31.png', '그림32.png', '그림33.png', '그림34.png', '그림35.png',
                                            '그림36.png', '그림37.png', '그림38.png', '그림39.png', '그림4.png', '그림40.png',
                                            '그림41.png', '그림42.png', '그림43.png', '그림44.png', '그림45.png', '그림46.png',
                                            '그림47.png', '그림48.png', '그림49.png', '그림5.jpg', '그림50.png', '그림51.png',
                                            '그림52.png', '그림53.png', '그림54.png', '그림55.png', '그림56.png', '그림57.png',
                                            '그림58.png', '그림59.png', '그림6.png', '그림7.jpg', '그림8.png', '그림9.jpg'
                                        ].map((logo, idx) => (
                                            <div key={`${i}-${idx}`} className="partner-logo">
                                                <img src={`/images/partners/${logo}`} alt="Partner" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                            </div>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="media reveal" style={{ background: '#f8f9fa' }}>
                    <div className="container">
                        <h2 className="section-title reveal delay-1">FaWW 미디어 보도</h2>
                        <div className="media-grid reveal delay-2">
                            {mediaReports.length > 0 ? (
                                mediaReports.map((media) => (
                                    <a key={media.id} href={media.url} target="_blank" rel="noopener noreferrer" className="media-item" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                        <div className="media-thumb" style={{ backgroundImage: media.thumbnail_url ? `url(${media.thumbnail_url})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                            {!media.thumbnail_url && "기사 썸네일 이미지"}
                                        </div>
                                        <div className="media-title">
                                            <div style={{ fontSize: '11px', color: '#2b8a3e', fontWeight: 'bold', marginBottom: '5px', opacity: 0.8 }}>{media.published_at ? media.published_at.split('T')[0] : ''}</div>
                                            {media.title}
                                        </div>
                                    </a>
                                ))
                            ) : (
                                <>
                                    <div className="media-item"><div className="media-thumb">기사 썸네일 이미지</div><div className="media-title">기업 복지 트렌드, 이제는 맞춤형 피지컬케어 시대</div></div>
                                    <div className="media-item"><div className="media-thumb">기사 썸네일 이미지</div><div className="media-title">FaWW, AI 체형분석 도입으로 업계 혁신 선도</div></div>
                                    <div className="media-item"><div className="media-thumb">기사 썸네일 이미지</div><div className="media-title">직장인 거북목 완화 프로젝트 성공 사례 조명</div></div>
                                    <div className="media-item"><div className="media-thumb">기사 썸네일 이미지</div><div className="media-title">건강한 조직문화를 위한 필수 선택, EAP 솔루션</div></div>
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {/* MAIN 2: AI 체형분석 */}
            <main id="page-ai" className={`page-content ${activePage === 'page-ai' ? 'active' : ''}`}>
                <section className="hero-brand hero-brand-sub reveal">
                    <video className="hero-video-bg" autoPlay loop muted playsInline>
                        <source src="background.mp4" type="video/mp4" />
                    </video>
                    <div className="hero-overlay"></div>
                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <div className="hero-subtitle hero-el hero-el-1">AI Scanning</div>
                        <h1 className="hero-el hero-el-2">데이터로 증명하는 <span>스마트 AI 체형분석</span></h1>
                        <p className="hero-el hero-el-3">
                            <strong>기업, 학교를 위한 정확한 진단</strong>
                            기업의 건강과 안전부터 학생들의 바른 성장까지,<br />가장 정확한 진단 및 솔루션을 제공합니다
                        </p>
                    </div>
                </section>

                <section className="category-section reveal" style={{ padding: '20px 0 80px 0' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <h2 className="section-title">해당되는 카테고리를 골라주세요</h2>
                        <div className="gateway-panels-container" style={{ marginTop: '20px' }}>
                            {/* 기업용 패널 */}
                            <div className="gateway-panel" onClick={() => switchPage('page-eap')}>
                                <div className="panel-bg" style={{ backgroundImage: 'url("/images/gateway/corporate_dx.png")' }}></div>
                                <div className="panel-overlay"></div>
                                <div className="panel-content">
                                     <span className="panel-icon-text">CORP</span>
                                     <h3 className="panel-title">기업용 DX</h3>
                                     <p className="panel-desc">임직원 근골격계 질환 예방 및 업무 효율 증대를 위한 솔루션입니다.</p>
                                     <span className="panel-btn">자세히 보기</span>
                                </div>
                            </div>

                            {/* 학교용 패널 */}
                            <div className="gateway-panel" onClick={() => switchPage('page-school')}>
                                <div className="panel-bg" style={{ backgroundImage: 'url("/images/gateway/school_dx.png")' }}></div>
                                <div className="panel-overlay"></div>
                                <div className="panel-content">
                                    <span className="panel-icon-text">EDU</span>
                                    <h3 className="panel-title">학교용 DX</h3>
                                    <p className="panel-desc">성장기 학생들의 체형 검진과 맞춤형 리포트를 제공합니다.</p>
                                    <span className="panel-btn">자세히 보기</span>
                                </div>
                            </div>

                            {/* 개인용 패널 */}
                            <div className="gateway-panel" onClick={() => { switchPage('page-physical'); openPhysicalSub('sub-center'); }}>
                                <div className="panel-bg" style={{ backgroundImage: 'url("/images/gateway/individual_dx.png")' }}></div>
                                <div className="panel-overlay"></div>
                                <div className="panel-content">
                                    <span className="panel-icon-text">USER</span>
                                    <h3 className="panel-title">개인용 DX</h3>
                                    <p className="panel-desc">1:1 정밀 분석과 맞춤형 피지컬케어 솔루션을 경험하세요.</p>
                                    <span className="panel-btn">자세히 보기</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="cta-footer reveal">
                    <div className="container">
                        <h2>FaWW와 함께 피지컬 케어의 미래를 경험하세요</h2>
                        <p style={{ marginBottom: '30px' }}>개인 및 기업을 위한 맞춤형 솔루션 가이드 및 브랜드 소개서를 무상으로 제공해 드립니다.</p>
                        <button className="cta-btn-white" onClick={() => openModal('modal-proposal')}>통합 가이드 신청하기</button>
                    </div>
                </section>

                <footer style={{ backgroundColor: '#111', color: '#888', padding: '60px 20px', fontSize: '14px', lineHeight: '1.6' }}>
                    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
                            <div style={{ fontSize: '24px', fontWeight: '900', color: '#fff', letterSpacing: '-1px' }}>FaWW</div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>이용약관</a>
                                <a href="#" style={{ color: '#ccc', textDecoration: 'none', fontWeight: 'bold' }}>개인정보처리방침</a>
                            </div>
                        </div>
                        <div>
                            <p style={{ margin: '0 0 5px 0' }}>주식회사 파우(FaWW) | 대표이사: 김은주 | 사업자등록번호: 107-88-12047</p>
                            <p style={{ margin: '0 0 5px 0' }}>주소: 서울특별시 영등포구 도신로 143, 대원빌딩 301호 | 고객센터: 02-6482-9003</p>
                            <p style={{ margin: '0' }}>이메일: contact@faww.co.kr</p>
                        </div>
                        <div style={{ marginTop: '10px', color: '#555' }}>
                            © {new Date().getFullYear()} FaWW Korea. All rights reserved.<br />
                            <span style={{ fontSize: '12px', opacity: 0.7 }}>파우(FaWW)는 기업의 안전보건 컴플라이언스 파트너로서 법령 준수를 지원합니다.</span>
                        </div>
                    </div>
                </footer>
            </main>

            {/* MAIN 3: 기업 EAP */}
            <main id="page-eap" className={`page-content ${activePage === 'page-eap' ? 'active' : ''}`}>
                <section className="hero-brand hero-brand-sub hero-premium reveal">
                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <div style={{ textAlign: 'left', marginBottom: '20px' }}><span className="back-btn" style={{ color: '#aaa', cursor: 'pointer', fontSize: '14px', border: '1px solid #555', padding: '8px 16px', borderRadius: '20px' }} onClick={() => switchPage('page-ai')}>← 타겟 선택으로 돌아가기</span></div>

                        <div className="hero-subtitle hero-el hero-el-1">FaWW EAP Solution</div>
                        <h1 className="hero-el hero-el-2"><span>건강이 함께하는 회사</span>,<br />기업복지의 원조는 <span>FaWW</span></h1>
                        <p className="hero-el hero-el-3">
                            <strong>AI 빅데이터 기반의 피지컬케어 솔루션</strong>
                            임직원의 건강 증진과 생산성 향상을 위한<br />맞춤형 복지 프로그램을 제안합니다
                        </p>
                        <div className="hero-buttons hero-el hero-el-4" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <button className="btn-primary" onClick={() => openModal('modal-proposal')}>우리 회사 맞춤 제안서 받기</button>
                        </div>
                    </div>
                </section>

                {/* 🛡️ 섹션 1: Safety & Compliance (법적 의무와 리스크) */}
                <section className="compliance-wrap reveal">
                    <div className="container">
                        <div className="school-header-wrap" style={{ textAlign: 'center' }}>
                            <span className="section-tag">LEGAL COMPLIANCE</span>
                            <h2 className="section-title reveal">산업안전보건법 제39조,<br /><span>선택이 아닌 필수</span>입니다</h2>
                            <p className="section-desc reveal">유해요인조사 미실시 시 발생하는 리스크, FaWW가 전문적으로 해결해 드립니다.</p>
                        </div>

                        <div className="risk-info-grid">
                            <div className="risk-info-card reveal">
                                <span className="law">산업안전보건법 제168조</span>
                                <h4>유해요인조사 미실시</h4>
                                <p className="penalty"><span>NOTICE</span> 5년 이하의 징역 또는 5,000만 원 이하의 벌금</p>
                            </div>
                            <div className="risk-info-card reveal delay-1">
                                <span className="law">산업안전보건법 제39조</span>
                                <h4>보건조치 미이행</h4>
                                <p className="penalty"><span>NOTICE</span> 위반 시 벌칙 상동<br />(산재 발생 시 중대재해처벌법 연계 리스크)</p>
                            </div>
                        </div>

                        <div className="school-header-wrap" style={{ textAlign: 'center', marginTop: '100px' }}>
                            <span className="section-tag">RISK FACTORS</span>
                            <h2 className="section-title reveal">근골격계 부담작업 <span>11가지 유형</span></h2>
                            <p className="section-desc reveal">하나라도 해당된다면, 법적 의무 조사 대상입니다.</p>
                        </div>

                        <div className="risk-grid-11">
                            {[
                                { num: '01', title: '하루 4시간 이상 키보드·마우스 조작', desc: '손목터널증후군 및 VDT 증후군 위험, 손목·손가락 만성 통증' },
                                { num: '02', title: '하루 2시간 이상 반복적 팔/손목 동작', desc: '테니스 엘보 및 건초염 유발, 팔꿈치 주변 인대 손상' },
                                { num: '03', title: '하루 2시간 이상 어깨 위 작업', desc: '회전근개 파열 및 석회성 건염 위험, 어깨 가동 범위 제한' },
                                { num: '04', title: '하루 2시간 이상 목·허리 굴곡/트위스트', desc: '디스크 탈출증 및 거북목 가속화, 척추 신경 압박' },
                                { num: '05', title: '하루 2시간 이상 쪼그려 앉기/무릎 굽히기', desc: '퇴행성 관절염 및 반월상 연골판 파열, 무릎 관절 변형' },
                                { num: '06', title: '하루 2시간 이상 1kg 이상 물체 쥐기', desc: '방아쇠 수지 및 손가락 관절염, 악력 저하 및 신경 손상' },
                                { num: '07', title: '하루 10회 이상 25kg 이상 물체 들기', desc: '급성 요추 염좌 및 척추 압박 골절, 탈장 위험성 증가' },
                                { num: '08', title: '하루 25회 이상 10kg 이상 반복 들기', desc: '만성 요통 및 근막통증증후군, 허리 근육 피로 누적' },
                                { num: '09', title: '하루 2시간 이상 신체 특정 부위 충격', desc: '미세 골절 및 연부조직 손상, 만성 염증 및 신경 마비' },
                                { num: '10', title: '하루 2시간 이상 진동 공구 사용', desc: '진동 증후군(백색 수지), 말초 혈관 및 신경 장애' },
                                { num: '11', title: '그 외 인체에 과도한 부담을 주는 작업', desc: '전신 근골격계 피로 누적, 원인 불명의 만성 통증 체계' }
                            ].map((item, idx) => (
                                <div key={idx} className={`risk-reveal-wrapper reveal delay-${idx % 4 + 1} has-reveal`}>
                                    <div className="risk-type-card">
                                        <div className="card-front">
                                            <span className="risk-type-num">TYPE {item.num}</span>
                                            <h4 className="risk-type-title">{item.title}</h4>
                                        </div>
                                        <div className="card-back">
                                            <span className="impact-label">HEALTH IMPACT</span>
                                            <p className="impact-desc">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 📋 섹션 1.5: 우리 기업 맞춤형 FaWW 프로그램 */}
                <section className="category-section reveal" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="container">
                        <div className="school-header-wrap" style={{ textAlign: 'center' }}>
                            <span className="section-tag reveal delay-1">CORE PROGRAMS</span>
                            <h2 className="section-title reveal delay-2">우리 기업 맞춤형 <span>FaWW 프로그램</span></h2>
                            <p className="section-desc reveal delay-3">진단부터 사후 케어까지, 빈틈없는 4단계 프로세스로 운영됩니다.</p>
                        </div>
                        
                        <div className="service-grid grid-2x2">
                            {[
                                { id: 'modal1', tag: '진단', title: '스마트 AI 체형분석', desc: '3D 스캐닝을 통해 임직원의 신체 불균형과 근골격계 위험도를 정밀 측정합니다.', img: '/images/eap/ai_scanning.jpg', color: '#e3f2fd', text: '#1565c0', hashtags: ['#3D스캔', '#불균형측정', '#근골격계케어'] },
                                { id: 'modal2', tag: '케어', title: '1:1 맞춤 피지컬케어', desc: '전문가가 직접 파견되어 통증 부위를 즉각적으로 관리하고 이완하는 시그니처 프로그램입니다.', img: '/images/eap/manual_care.jpg', color: '#e8f5e9', text: '#2b8a3e', hashtags: ['#통증완화', '#직접파견', '#1:1시그니처'] },
                                { id: 'modal4', tag: '실습', title: '단체 운동 프로그램', desc: '오피스 스트레칭, 소도구 운동 등 현장에서 바로 실천 가능한 기능성 트레이닝을 진행합니다.', img: '/images/eap/group_exercise.jpg', color: '#fff3e0', text: '#e65100', hashtags: ['#오피스스트레칭', '#기능성트레이닝', '#활력증진'] },
                                { id: 'modal3', tag: '강의', title: '건강 복지 특강', desc: '직무별 맞춤 질환 예방 교육 및 올바른 생활 습관 가이드를 전문가의 강연으로 제공합니다.', img: '/images/eap/lecture.jpg', color: '#e3f2fd', text: '#1565c0', hashtags: ['#직무별예방교육', '#전문가강연', '#올바른습관'] }
                            ].map((s, i) => (
                                <div key={i} className={`smart-card reveal delay-${i + 4}`} onClick={() => openModal(s.id)}>
                                    <div className="smart-card-top">
                                        <div className="smart-card-img" style={{ 
                                            backgroundImage: `linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.2)), url('${s.img}')`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}></div>
                                        <div className="smart-card-body">
                                            <span className="gateway-badge" style={{ background: s.color, color: s.text }}>{s.tag}</span>
                                            <h3>{s.title}</h3>
                                            <p>{s.desc}</p>
                                            <div className="smart-card-hashtags" style={{ marginTop: '15px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                {s.hashtags.map((tag, ti) => (
                                                    <span key={ti} style={{ fontSize: '13px', color: '#868e96', fontWeight: '500', opacity: 0.8 }}>{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 💡 섹션 2: Solution & Differentiation (차별화 전략) */}
                <section className="services reveal" style={{ backgroundColor: '#fff' }}>
                    <div className="container">
                        <div className="school-header-wrap" style={{ textAlign: 'center' }}>
                            <span className="section-tag">DIFFERENTIATION</span>
                            <h2 className="section-title reveal">왜 <span>FaWW</span>여야만 하는가?</h2>
                            <p className="section-desc reveal">단순 서류 대행을 넘어 실질적인 사후 관리 솔루션을 제공합니다.</p>
                        </div>

                        <div className="comparison-container">
                            <div className="comp-box others reveal">
                                <h3>일반 안전보건 기관</h3>
                                <ul className="comp-list">
                                    <li><span className="comp-icon">—</span> 단순 서류 작업 및 제본 위주</li>
                                    <li><span className="comp-icon">—</span> 일회성 조사 및 결과 통보</li>
                                    <li><span className="comp-icon">—</span> 아날로그식 수기 조사 (시간 소요)</li>
                                    <li><span className="comp-icon">—</span> 개선 대책의 실효성 부족</li>
                                </ul>
                            </div>
                            <div className="comp-box faww reveal delay-1">
                                <h3>FaWW Professional</h3>
                                <ul className="comp-list">
                                    <li><span className="comp-icon">✓</span> 인간공학적 분석 + 실질적 개선 대책</li>
                                    <li><span className="comp-icon">✓</span> 즉각적인 1:1 피지컬케어 사후 관리</li>
                                    <li><span className="comp-icon">✓</span> 웹/모바일 기반 신속한 증상 조사</li>
                                    <li><span className="comp-icon">✓</span> AI 빅데이터 기반의 정밀 분석 리포트</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 💳 섹션 3: B2B 특화 결제 및 예산 (Local Pay & ESG) */}
                <section className="budget-section reveal">
                    <div className="container">
                        <div className="school-header-wrap" style={{ textAlign: 'center' }}>
                            <span className="section-tag reveal delay-1">BUDGET STRATEGY</span>
                            <h2 className="section-title reveal delay-2" style={{ color: '#fff' }}>기업 예산 집행, <span>스마트하게 해결</span>하세요</h2>
                            <p className="section-desc reveal delay-3" style={{ color: 'rgba(255,255,255,0.6)' }}>행정 편의와 지역 상생, 두 마리 토끼를 동시에 잡는 FaWW만의 결제 솔루션</p>
                        </div>

                        <div className="pay-logo-group reveal delay-4">
                            <div className="pay-logo-item reveal delay-5">
                                <span className="pay-name">서울페이 (Seoul Pay)</span>
                            </div>
                            <div className="pay-logo-item reveal delay-6">
                                <span className="pay-name">경기페이 (Gyeonggi Pay)</span>
                            </div>
                        </div>

                        <div className="esg-score-box">
                            💡 시설관리공단 등 공공기관의 실제 집행 모델 도입!<br />
                            지역 상권 상생 기여를 통한 ESG 경영 평가 점수 확보에 절대적으로 유리합니다.
                        </div>
                    </div>
                </section>

                <section className="faq-section reveal">
                    <div className="container text-center">
                        <div className="faq-header-wrap">
                            <h2>기업 복지 담당자님, <span>어떤 고민이 있으세요?</span></h2>
                            <p>운동부터 강연, 콘텐츠까지 맞춤 프로그램으로 해결해 드립니다.</p>
                        </div>
                        <div className="faq-list grid-2x2" style={{ alignItems: 'flex-start' }}>
                            {[
                                { q: "우리 회사는 인원이 많은데, 하루에 몇 명이나 케어를 받을 수 있나요?", a: "투입되는 전문가 인원에 따라 유연하게 운영됩니다. 보통 전문가 1인당 하루(8시간 기준) 약 6~10명의 1:1 집중 케어가 가능하며, 단체 운동이나 강의 프로그램과 병행할 경우 하루 수백 명까지 참여 인원을 확대할 수 있습니다." },
                                { q: "사내에 별도의 공간이 필요한가요? 공간이 협소해도 진행이 가능한지 궁금합니다.", a: "네, 회의실이나 휴게실 정도의 유휴 공간만 있으면 충분합니다. 1:1 케어에 필요한 이동식 베드와 AI 체형 분석 장비는 저희가 직접 지참하며, 공간 크기에 맞춰 최적화된 동선으로 세팅해 드립니다." },
                                { q: "서비스 이용 예약은 어떤 방식으로 이루어지나요? 인사팀에서 일일이 명단을 취합해야 하나요?", a: "담당자님의 업무 부담을 줄이기 위해 자체 온라인 예약 시스템을 제공합니다. 임직원이 직접 원하는 시간에 접속해 예약하고 알림톡을 받을 수 있어, 별도의 명단 관리 없이 최종 확정 리스트만 확인하시면 됩니다." },
                                { q: "&apos;스마트 AI 체형분석&apos; 결과 리포트는 개인에게 별도로 제공되나요?", a: "네, 분석 즉시 모바일 리포트가 개별 전송됩니다. 현재 나의 불균형 상태, 위험도 점수, 그리고 일상에서 실천할 수 있는 맞춤형 운동 처방이 포함되어 있어 구성원들의 만족도가 매우 높습니다." },
                                { q: "1:1 케어에서 진행되는 &apos;MCT&apos;나 &apos;수기치료&apos;가 통증 완화에 즉각적인 효과가 있나요?", a: "단순 마사지가 아닌 근막 이완(MCT)과 기능적 가동술을 결합한 전문 테라피입니다. 업무 중 발생하는 목, 어깨, 허리의 급성 통증과 근육 긴장을 즉각적으로 해소하여 업무 효율을 높이는 데 중점을 둡니다." },
                                { q: "우리 직무 특성(예: 장시간 서 있는 업무)에 맞춘 커스터마이징이 가능한가요?", a: "물론입니다. 사전 상담을 통해 해당 기업의 주된 업무 환경(데스크 워크, 현장직 등)을 분석하고, 그에 가장 빈번하게 발생하는 근골격계 질환 위주로 강의와 케어 루틴을 재구성하여 진행합니다." },
                                { q: "4가지 파트를 반드시 패키지로 도입해야 하나요? 필요한 파트만 선택할 수 있나요?", a: "전 사원 대상인 &apos;강의&apos;와 &apos;진단&apos;만 선택하시거나, 고위험군을 위한 &apos;1:1 케어&apos;만 집중 운영하는 등 기업의 예산과 필요에 따라 자유롭게 조합하여 설계할 수 있습니다." },
                                { q: "서비스 도입 후 임직원 만족도 조사나 결과 보고서를 제공해 주시나요?", a: "네, 프로그램 종료 후 참여도, 만족도 조사 결과, AI 분석 데이터 통계(익명 처리)를 포함한 성과 결과 보고서를 제공합니다. 이는 인사팀의 KPI 달성 증빙 및 차기 복지 예산 확보 자료로 활용하실 수 있습니다." },
                                { q: "AI 체형 분석 시 수집되는 개인정보나 신체 데이터는 어떻게 관리되나요?", a: "수집된 모든 데이터는 암호화되어 안전하게 관리되며, 개인정보보호법을 준수합니다. 기업 측에는 개인의 세부 정보가 아닌 조직 전체의 건강 통계 지표만 제공되므로 안심하셔도 됩니다." }
                            ].map((item, idx) => (
                                <div key={idx} className={`faq-item reveal delay-${idx % 4 + 1}`} onClick={toggleFaq}>
                                    <div className="faq-title-wrap">
                                        <div className="faq-title"><span className="q-mark">Q.</span> <span>{item.q}</span></div>
                                        <div className="faq-icon">+</div>
                                    </div>
                                    <div className="faq-content-wrapper">
                                        <div className="faq-content">
                                            <span className="a-mark">A.</span>
                                            <span>{item.a}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="cta-footer reveal">
                    <div className="container">
                        <h2>FaWW와 함께 건강한 조직을 구축하세요</h2>
                        <p style={{ marginBottom: '30px' }}>기업 담당자를 위한 예산 활용 가이드 및 법적 의무 이행 리포트를 무상으로 제공해 드립니다.</p>
                        <button className="cta-btn-white" onClick={() => openModal('modal-proposal')}>무료 상담 및 가이드 신청</button>
                    </div>
                </section>

                <footer style={{ backgroundColor: '#111', color: '#888', padding: '60px 20px', fontSize: '14px', lineHeight: '1.6' }}>
                    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
                            <div style={{ fontSize: '24px', fontWeight: '900', color: '#fff', letterSpacing: '-1px' }}>FaWW</div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>이용약관</a>
                                <a href="#" style={{ color: '#ccc', textDecoration: 'none', fontWeight: 'bold' }}>개인정보처리방침</a>
                            </div>
                        </div>
                        <div>
                            <p style={{ margin: '0 0 5px 0' }}>주식회사 파우(FaWW) | 대표이사: 김은주 | 사업자등록번호: 107-88-12047</p>
                            <p style={{ margin: '0 0 5px 0' }}>주소: 서울특별시 영등포구 도신로 143, 대원빌딩 301호 | 고객센터: 02-6482-9003</p>
                            <p style={{ margin: '0' }}>이메일: contact@faww.co.kr</p>
                        </div>
                        <div style={{ marginTop: '10px', color: '#555' }}>
                            © {new Date().getFullYear()} FaWW Korea. All rights reserved.<br />
                            <span style={{ fontSize: '12px', opacity: 0.7 }}>파우(FaWW)는 기업의 안전보건 컴플라이언스 파트너로서 법령 준수를 지원합니다.</span>
                        </div>
                    </div>
                </footer>
            </main>

            {/* MAIN 4: 학교 */}
            <main id="page-school" className={`page-content ${activePage === 'page-school' ? 'active' : ''}`}>
                <section className="hero-premium reveal" style={{ background: "linear-gradient(rgba(0, 30, 20, 0.75), rgba(0, 30, 20, 0.9)), url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop') no-repeat center/cover fixed" }}>
                    <div className="container">
                        <div style={{ textAlign: 'left' }}><span className="back-btn" onClick={() => switchPage('page-ai')}>← 타겟 선택으로 돌아가기</span></div>
                        <h1>바른 성장의 시작,<br />FaWW 학생 체형분석 솔루션</h1>
                        <p>학교 현장에 최적화된 프로세스로 우리 아이들의 효율적인 건강관리를 지원합니다.</p>
                        <button className="btn-primary" onClick={() => openModal('modal-proposal')} style={{ fontSize: '18px', padding: '16px 36px', backgroundColor: '#004d40', border: '1px solid #004d40' }}>학교 맞춤 제안서 받기</button>
                    </div>
                </section>

                <section className="category-section reveal" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="container">
                        <div className="school-header-wrap" style={{ textAlign: 'center' }}>
                            <span className="section-tag">SCHOOL SOLUTION</span>
                            <h2 className="section-title reveal">우리 아이 바른 성장,<br /><span>FaWW 학생 체형분석</span></h2>
                            <p className="section-desc reveal">성장기 학생들의 체형 데이터를 과학적으로 분석하고, 맞춤형 운동 프로그램을 제공합니다. 학교 현장에 최적화된 프로세스로 효율적인 건강관리를 지원합니다.</p>
                        </div>

                        <div className="school-process-grid">
                            <div className="school-process-card reveal">
                                <span className="school-process-num">01</span>
                                <h3 className="school-process-title">사전 협의</h3>
                                <p className="school-process-desc">학교 환경 분석 및<br />맞춤 프로그램 설계</p>
                            </div>
                            <div className="school-process-card reveal delay-1">
                                <span className="school-process-num">02</span>
                                <h3 className="school-process-title">체형 측정</h3>
                                <p className="school-process-desc">전문 장비를 활용한<br />정밀 체형분석 실시</p>
                            </div>
                            <div className="school-process-card reveal delay-2">
                                <span className="school-process-num">03</span>
                                <h3 className="school-process-title">데이터 분석</h3>
                                <p className="school-process-desc">개인별·학급별<br />건강 데이터 리포트</p>
                            </div>
                            <div className="school-process-card reveal delay-3">
                                <span className="school-process-num">04</span>
                                <h3 className="school-process-title">사후 관리</h3>
                                <p className="school-process-desc">맞춤 운동 처방 및<br />추적 관리 시스템</p>
                            </div>
                        </div>

                        <div className="school-stats reveal">
                            <div className="school-stat-item">
                                <h3><span className="count-up" data-target="200">0</span>+</h3>
                                <p>도입 학교 수</p>
                            </div>
                            <div className="school-stat-item">
                                <h3><span className="count-up" data-target="30" data-format="true">0</span>만+</h3>
                                <p>학생 분석 데이터</p>
                            </div>
                            <div className="school-stat-item">
                                <h3><span className="count-up" data-target="97">0</span>%</h3>
                                <p>학교 재도입률</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="services reveal" style={{ backgroundColor: '#fff', paddingTop: '80px' }}>
                    <div className="container">
                        <div className="school-header-wrap" style={{ textAlign: 'center' }}>
                            <span className="section-tag">PROGRAM CATEGORY</span>
                            <h2 className="section-title reveal">학교 맞춤형 <span>핵심 프로그램</span></h2>
                            <p className="section-desc reveal">단순한 검진을 넘어 체계적인 교육과 관리를 동반합니다.</p>
                        </div>
                        <div className="service-grid">
                            <div className="smart-card reveal" onClick={() => openModal('modal1')}>
                                <div className="smart-card-top">
                                    <div className="smart-card-img" style={{ 
                                        backgroundImage: "linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.2)), url('/images/gateway/school_dx.png')",
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}></div>
                                    <div className="smart-card-body">
                                        <span className="gateway-badge" style={{ background: '#e0f2f1', color: '#004d40' }}>진단</span>
                                        <h3>스마트 AI 체형분석</h3>
                                        <p>정밀 카메라와 AI 솔루션을 활용해 학생들의 근골격계 상태와 성장 밸런스를 측정하고 평가합니다.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="smart-card reveal delay-1" onClick={() => openModal('modal4')}>
                                <div className="smart-card-top">
                                    <div className="smart-card-img" style={{ 
                                        backgroundImage: "linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.2)), url('/images/eap/group_exercise.jpg')",
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}></div>
                                    <div className="smart-card-body">
                                        <span className="gateway-badge" style={{ background: '#e8f5e9', color: '#2b8a3e' }}>실습</span>
                                        <h3>그룹 맞춤 운동</h3>
                                        <p>스트레칭 및 자세교정을 위한 기능성 트레이닝. 성장기 학생들에게 꼭 필요한 맞춤형 운동 처방을 제공합니다.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-footer reveal">
                    <div className="container">
                        <h2>FaWW와 함께 스마트한 교육 환경을 구축하세요</h2>
                        <p style={{ marginBottom: '30px' }}>학교 보건 담당자를 위한 학생 체형 데이터 분석 샘플 및 학교 보건 예산 활용 가이드를 무상으로 제공해 드립니다.</p>
                        <button className="cta-btn-white" onClick={() => openModal('modal-proposal')}>학교 맞춤 상담 및 가이드 신청</button>
                    </div>
                </section>

                <footer style={{ backgroundColor: '#111', color: '#888', padding: '60px 20px', fontSize: '14px', lineHeight: '1.6' }}>
                    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
                            <div style={{ fontSize: '24px', fontWeight: '900', color: '#fff', letterSpacing: '-1px' }}>FaWW</div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>이용약관</a>
                                <a href="#" style={{ color: '#ccc', textDecoration: 'none', fontWeight: 'bold' }}>개인정보처리방침</a>
                            </div>
                        </div>
                        <div>
                            <p style={{ margin: '0 0 5px 0' }}>주식회사 파우(FaWW) | 대표이사: 김은주 | 사업자등록번호: 107-88-12047</p>
                            <p style={{ margin: '0 0 5px 0' }}>주소: 서울특별시 영등포구 도신로 143, 대원빌딩 301호 | 고객센터: 02-6482-9003</p>
                            <p style={{ margin: '0' }}>이메일: contact@faww.co.kr</p>
                        </div>
                        <div style={{ marginTop: '10px', color: '#555' }}>
                            © {new Date().getFullYear()} FaWW Korea. All rights reserved.<br />
                            <span style={{ fontSize: '12px', opacity: 0.7 }}>파우(FaWW)는 기업의 안전보건 컴플라이언스 파트너로서 법령 준수를 지원합니다.</span>
                        </div>
                    </div>
                </footer>
            </main>

            {/* MAIN 5: 피지컬케어 */}
            <main id="page-physical" className={`page-content ${activePage === 'page-physical' ? 'active' : ''}`}>
                <section className="hero-brand hero-brand-sub reveal">
                    <video className="hero-video-bg" autoPlay loop muted playsInline>
                        <source src="background2.mp4" type="video/mp4" />
                    </video>
                    <div className="hero-overlay"></div>
                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <div style={{ textAlign: 'left', marginBottom: '20px' }}><span className="back-btn" style={{ color: '#aaa', cursor: 'pointer', fontSize: '14px', border: '1px solid #555', padding: '8px 16px', borderRadius: '20px' }} onClick={() => switchPage('page-ai')}>← 타겟 선택으로 돌아가기</span></div>
                        <div className="hero-subtitle hero-el hero-el-1">FaWW Physical Care</div>
                        <h1 className="hero-el hero-el-2">현장과 실무를 잇는<br /><span>FaWW 피지컬케어</span></h1>
                        <p className="hero-el hero-el-3">
                            <strong>대한민국 최고 전문가 양성 및 파견</strong><br />
                            기업의 생산성 향상부터 개인의 삶의 질 회복까지,<br />근골격계 전문 관리로 완벽하게 아우릅니다
                        </p>
                    </div>
                </section>

                <div id="physical-gateway" className={`container-fluid reveal ${!activePhysicalSub ? 'active' : ''}`} style={{ padding: '10px 0 100px', display: !activePhysicalSub ? 'block' : 'none', backgroundColor: '#f9f9f9' }}>
                    <div className="container">
                        <div className="premium-gateway-grid">
                            <div className="gateway-card reveal" onClick={() => switchPage('page-eap')}>
                                <div className="gateway-bg-text">PC</div>
                                <div className="gateway-icon-box" style={{ fontSize: '14px', fontWeight: 'bold' }}>PC</div>
                                <h3>피지컬케어</h3>
                                <p>기업 임직원을 위한 맞춤형 방문 솔루션. 인간공학적 분석과 1:1 케어를 결합한 독보적 프로그램입니다.</p>
                                <div className="gateway-arrow">→</div>
                            </div>

                            <div className="gateway-card reveal delay-1" onClick={() => openPhysicalSub('sub-academy')}>
                                <div className="gateway-bg-text">CL</div>
                                <div className="gateway-icon-box" style={{ fontSize: '14px', fontWeight: 'bold' }}>CL</div>
                                <h3>자격증</h3>
                                <p>FaWW 오리지널 피지컬케어 전문가 양성 과정. 이론부터 실무까지 이어지는 고도화된 교육 커리큘럼.</p>
                                <div className="gateway-arrow">→</div>
                            </div>

                            <div className="gateway-card reveal delay-2" onClick={() => openPhysicalSub('sub-center')}>
                                <div className="gateway-bg-text">CT</div>
                                <div className="gateway-icon-box" style={{ fontSize: '14px', fontWeight: 'bold' }}>CT</div>
                                <h3>센터</h3>
                                <p>가까운 직영 센터에서 만나는 1:1 맞춤형 피지컬케어. 최첨단 장비와 베테랑 전문가의 정밀한 솔루션.</p>
                                <div className="gateway-arrow">→</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="sub-academy" className={`sub-page-content ${activePhysicalSub === 'sub-academy' ? 'active' : ''}`}>
                    <section className="category-section reveal" style={{ backgroundColor: '#f8f9fa', paddingTop: '40px' }}>
                        <div className="container">
                            <div style={{ textAlign: 'left' }}><span className="back-btn-light" onClick={showPhysicalGateway}>← 카테고리 선택으로 돌아가기</span></div>
                            <h2 className="section-title">자격증 교육 (아카데미)</h2>
                            <div className="academy-wrap">
                                <div className="academy-category reveal">
                                    <h3 className="academy-cat-title"><span>01</span> 퍼스널 트레이닝 분야</h3>
                                    <div className="academy-grid">
                                        <div className="academy-card"><div className="ac-badge">PTS 1, 2급</div><h4>Personal Training Specialist</h4><p>이론과 실기 능력을 갖춘 전문 퍼스널 트레이너 양성 과정입니다. 운동, 재활, 영양, 세일즈를 종합적으로 다룹니다.</p></div>
                                        <div className="academy-card"><div className="ac-badge">PYTS 전문가 과정</div><h4>Personal Yoga Training Specialist</h4><p>정통 요가의 본질을 과학적으로 풀어내고 통증 분석 및 체형 교정을 결합한 전문가 과정입니다.</p></div>
                                    </div>
                                </div>
                                <div className="academy-category reveal">
                                    <h3 className="academy-cat-title"><span>02</span> 교정 및 재활 분야</h3>
                                    <div className="academy-grid">
                                        <div className="academy-card"><div className="ac-badge">CWT 1, 2급</div><h4>Corrective Weight Training</h4><p>신체적 문제를 운동을 통해 해결하는 교정운동 전문가 과정입니다. 기능해부학과 생리학을 기반으로 체형 및 동작을 분석합니다.</p></div>
                                        <div className="academy-card"><div className="ac-badge">KSTS 1, 2급</div><h4>Korea Sports Taping Specialist</h4><p>스포츠 및 생활 체육 현장에서 경기력 향상과 부상 예방을 위해 테이핑 업무를 수행하는 전문가 과정입니다.</p></div>
                                        <div className="academy-card"><div className="ac-badge">선수트레이너 1, 2급</div><h4>Athletic Trainer</h4><p>과학적 근거를 바탕으로 운동선수들의 경기력 향상과 최상의 컨디셔닝을 돕는 프로그램 구성 및 트레이닝 수료 과정입니다.</p></div>
                                    </div>
                                </div>
                                <div className="academy-category reveal">
                                    <h3 className="academy-cat-title"><span>03</span> 필라테스 및 골프 전문 분야</h3>
                                    <div className="academy-grid">
                                        <div className="academy-card"><div className="ac-badge">KSMP 1, 2, 3급</div><h4>Pilates Instructor</h4><p>기구 및 매트 운동을 활용하여 바른 체형을 위한 운동 평가, 상담 및 강사 양성 업무를 수행합니다.</p></div>
                                        <div className="academy-card"><div className="ac-badge">골프 컨디셔닝 1, 2, 3급</div><h4>MAXQ GOLF PHYSICAL TRAINING INSTITUTE</h4><p>골퍼의 경기력 향상과 컨디셔닝을 위한 운동 프로그램을 개발하고 운동역학적 스윙 분석 등을 제공합니다.</p></div>
                                    </div>
                                </div>
                                <div className="academy-category reveal">
                                    <h3 className="academy-cat-title"><span>04</span> 웰니스 및 맞춤형 관리 분야</h3>
                                    <div className="academy-grid">
                                        <div className="academy-card"><div className="ac-badge">웰니스 코치 1, 2급</div><h4>Wellness Coach</h4><p>데이터 기반 분석을 통해 개인 맞춤형 처방 시스템을 운용하는 신체 건강 전문가 과정입니다.</p></div>
                                        <div className="academy-card"><div className="ac-badge">PCP 1, 2급</div><h4>Physical Care Professionals (피지컬케어관리사)</h4><p>직장인의 직무능력 향상을 위해 근무 형태 연구 및 체력/신체 능력 평가 후 맞춤형 솔루션을 제공합니다.</p></div>
                                        <div className="academy-card"><div className="ac-badge">SEP 1, 2급</div><h4>Senior Exercise Professionals (노인운동사)</h4><p>노인의 신체적 특징에 맞춰 낙상 예방 및 심혈관계 질환 예방을 돕는 안전한 운동 프로그램을 구성합니다.</p></div>
                                        <div className="academy-card"><div className="ac-badge">마인드 코칭 1, 2급</div><h4>Mind Coaching</h4><p>뇌파측정기 등을 활용해 스포츠 선수 및 일반인의 심리 상담과 멘탈 강화를 지도하는 과정입니다.</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div id="sub-center" className={`sub-page-content ${activePhysicalSub === 'sub-center' ? 'active' : ''}`}>
                    <section className="category-section reveal" style={{ backgroundColor: '#fff', paddingTop: '40px' }}>
                        <div className="container" style={{ maxWidth: '1200px' }}>
                            <div style={{ textAlign: 'left' }}><span className="back-btn-light" onClick={showPhysicalGateway}>← 카테고리 선택으로 돌아가기</span></div>
                            <h2 className="section-title">센터 (로컬) 소개</h2>
                            
                            <div className="center-split-view">
                                {/* 왼쪽: 센터 리스트 */}
                                <div className="center-list-column grid-vertical">
                                    {centerData.length > 0 ? centerData.map((center, idx) => (
                                        <div 
                                            key={center.id} 
                                            className={`center-row-card reveal active ${hoveredCenterId === center.id ? 'highlighted' : ''}`} 
                                            onClick={() => openCenterModal(center.id)}
                                            onMouseEnter={() => setHoveredCenterId(center.id)}
                                            onMouseLeave={() => setHoveredCenterId(null)}
                                        >
                                            <div>
                                                <span className="center-num-badge">CENTER 0{idx + 1}</span>
                                                <h3>{center.name}</h3>
                                            </div>
                                            <div className="card-arrow" style={{ color: '#2b8a3e', fontSize: '24px', opacity: 0.5 }}>→</div>
                                        </div>
                                    )) : (
                                        <p style={{ color: '#888', textAlign: 'center' }}>센터 정보를 불러오는 중입니다...</p>
                                    )}
                                </div>

                                {/* 오른쪽: 수도권 지도 인터랙션 */}
                                <div className="center-map-column reveal active">
                                    <div className="center-dashboard-wrapper">
                                        {(() => {
                                            const currentCenter = centerData.find(c => c.id === hoveredCenterId) || centerData[0];
                                            if (!currentCenter) return null;
                                            return (
                                                <div className="dashboard-content" key={currentCenter.id}>
                                                    <div className="dashboard-header">
                                                        <span className="live-badge">SYSTEM STATUS: OPERATIONAL</span>
                                                        <h2>{currentCenter.name}</h2>
                                                        <p className="dashboard-addr">{currentCenter.address}</p>
                                                    </div>
                                                    
                                                    {/* 지점 설명(Philosophy) 섹션 제거 - 사용자 요청 */}
                                                    <div style={{ marginBottom: '20px' }}></div>

                                                    <div className="programs-section">
                                                        <h4 className="sub-title">CORE PROGRAMS</h4>
                                                        <ul className="program-list">
                                                            {(currentCenter.programs && currentCenter.programs.length > 0) ? (
                                                                currentCenter.programs.map((prog: string, i: number) => (
                                                                    <li key={i}>• {prog.trim()}</li>
                                                                ))
                                                            ) : (
                                                                <>
                                                                    <li>• 개인별 맞춤형 정밀 체형 분석</li>
                                                                    <li>• 근골격계 통증 완화 케어</li>
                                                                    <li>• 올바른 자세 회복 및 기능 강화</li>
                                                                </>
                                                            )}
                                                        </ul>
                                                    </div>

                                                    <div className="equipment-section">
                                                        <h4 className="sub-title">TECHNOLOGY & EQUIPMENT</h4>
                                                        <div className="equipment-tags">
                                                            {(currentCenter.equipments || ['3D AI 스캐너', '정밀 체형 분석기']).map((eq, i) => (
                                                                <span key={i} className="eq-tag">{eq}</span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="dashboard-footer">
                                                        <button className="dashboard-btn" onClick={() => openCenterModal(currentCenter.id)}>지점 상세 솔루션 보기</button>
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <section className="cta-footer reveal">
                    <div className="container">
                        <h2>FaWW와 함께 통증 없는 일상을 시작하세요</h2>
                        <p style={{ marginBottom: '30px' }}>내 몸에 딱 맞는 프리미엄 케어 프로그램 상담 및 첫 방문 혜택 가이드를 무상으로 제공해 드립니다.</p>
                        <button className="cta-btn-white" onClick={openKakaoChat}>실시간 프로그램 상담하기</button>
                    </div>
                </section>

                <footer style={{ backgroundColor: '#111', color: '#888', padding: '60px 20px', fontSize: '14px', lineHeight: '1.6' }}>
                    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
                            <div style={{ fontSize: '24px', fontWeight: '900', color: '#fff', letterSpacing: '-1px' }}>FaWW</div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>이용약관</a>
                                <a href="#" style={{ color: '#ccc', textDecoration: 'none', fontWeight: 'bold' }}>개인정보처리방침</a>
                            </div>
                        </div>
                        <div>
                            <p style={{ margin: '0 0 5px 0' }}>주식회사 파우(FaWW) | 대표이사: 김은주 | 사업자등록번호: 107-88-12047</p>
                            <p style={{ margin: '0 0 5px 0' }}>주소: 서울특별시 영등포구 도신로 143, 대원빌딩 301호 | 고객센터: 02-6482-9003</p>
                            <p style={{ margin: '0' }}>이메일: contact@faww.co.kr</p>
                        </div>
                        <div style={{ marginTop: '10px', color: '#555' }}>
                            © {new Date().getFullYear()} FaWW Korea. All rights reserved.<br />
                            <span style={{ fontSize: '12px', opacity: 0.7 }}>파우(FaWW)는 기업의 안전보건 컴플라이언스 파트너로서 법령 준수를 지원합니다.</span>
                        </div>
                    </div>
                </footer>
            </main>

            {/* MAIN 6: MALL */}
            <main id="page-mall" className={`page-content ${activePage === 'page-mall' ? 'active' : ''}`}>
                <section className="hero-brand hero-brand-sub reveal" style={{ backgroundColor: '#212529' }}>
                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <div className="hero-subtitle hero-el hero-el-1">Physical Care Mall</div>
                        <h1 className="hero-el hero-el-2">검증된 교구, <span>피지컬케어 mall</span></h1>
                        <p className="hero-el hero-el-3">
                            <strong>전문가가 직접 선별한 건강 굿즈</strong>
                            임직원 복지 포인트 차감을 지원하는 전용 교구몰에서<br />일상을 변화시키는 건강 아이템을 만나보세요
                        </p>
                    </div>
                </section>
                <section className="floating-gallery reveal">
                    <div className="container">
                        <div className="product-grid-premium">
                            {/* 제품 1: 블랙테라 */}
                            <div className="product-card-premium">
                                <div className="product-tag-premium">BEST</div>
                                <div className="product-img-wrapper">
                                    <span style={{ fontSize: '100px' }}>📦</span>
                                </div>
                                <div className="product-info-premium">
                                    <h3 className="product-name-premium">블랙테라</h3>
                                    <p className="product-price-premium">도입가 별도문의</p>
                                    <button className="buy-btn-premium">제품 상세 보기</button>
                                </div>
                            </div>

                            {/* 제품 2: 마사지스틱 */}
                            <div className="product-card-premium">
                                <div className="product-tag-premium">NEW</div>
                                <div className="product-img-wrapper">
                                    <span style={{ fontSize: '100px' }}>🏒</span>
                                </div>
                                <div className="product-info-premium">
                                    <h3 className="product-name-premium">마사지스틱</h3>
                                    <p className="product-price-premium">도입가 별도문의</p>
                                    <button className="buy-btn-premium">제품 상세 보기</button>
                                </div>
                            </div>

                            {/* 제품 3: 스포츠밴드 */}
                            <div className="product-card-premium">
                                <div className="product-tag-premium">PREMIUM</div>
                                <div className="product-img-wrapper">
                                    <img src="/images/mall/sports_band.png" alt="스포츠밴드" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                                <div className="product-info-premium">
                                    <h3 className="product-name-premium">스포츠밴드</h3>
                                    <p className="product-price-premium">도입가 별도문의</p>
                                    <button className="buy-btn-premium">제품 상세 보기</button>
                                </div>
                            </div>

                            {/* 제품 4: 스마트 스트랩 */}
                            <div className="product-card-premium">
                                <div className="product-tag-premium">IOT</div>
                                <div className="product-img-wrapper">
                                    <span style={{ fontSize: '100px' }}>⌚</span>
                                </div>
                                <div className="product-info-premium">
                                    <h3 className="product-name-premium">스마트 스트랩</h3>
                                    <p className="product-price-premium">도입가 별도문의</p>
                                    <button className="buy-btn-premium">제품 상세 보기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="cta-footer reveal">
                    <div className="container">
                        <h2>FaWW가 엄선한 프리미엄 교구를 만나보세요</h2>
                        <p style={{ marginBottom: '30px' }}>기업 복지 포인트 도입을 위한 교구 대량 구매 견적 및 제품 상세 소개서를 제공해 드립니다.</p>
                        <button className="cta-btn-white" onClick={() => openModal('modal-proposal')}>도입 문의 및 견적 신청</button>
                    </div>
                </section>

                <footer style={{ backgroundColor: '#111', color: '#888', padding: '60px 20px', fontSize: '14px', lineHeight: '1.6', scrollSnapAlign: 'end' }}>
                    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
                            <div style={{ fontSize: '24px', fontWeight: '900', color: '#fff', letterSpacing: '-1px' }}>FaWW</div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>이용약관</a>
                                <a href="#" style={{ color: '#ccc', textDecoration: 'none', fontWeight: 'bold' }}>개인정보처리방침</a>
                            </div>
                        </div>
                        <div>
                            <p style={{ margin: '0 0 5px 0' }}>주식회사 파우(FaWW) | 대표이사: 김은주 | 사업자등록번호: 107-88-12047</p>
                            <p style={{ margin: '0 0 5px 0' }}>주소: 서울특별시 영등포구 도신로 143, 대원빌딩 301호 | 고객센터: 02-6482-9003</p>
                            <p style={{ margin: '0' }}>이메일: contact@faww.co.kr</p>
                        </div>
                        <div style={{ marginTop: '10px', color: '#555' }}>
                            © {new Date().getFullYear()} FaWW Korea. All rights reserved.<br />
                            <span style={{ fontSize: '12px', opacity: 0.7 }}>파우(FaWW)는 기업의 안전보건 컴플라이언스 파트너로서 법령 준수를 지원합니다.</span>
                        </div>
                    </div>
                </footer>
            </main>

            {/* 💡 모달 모음 - 원본 이모지 레이아웃 완벽 이식 */}

            {activeModal === 'modal1' && (
                <div className="modal active">
                    <div className="modal-content"><button className="modal-close" onClick={closeModal}>&times;</button><div className="modal-header"><h2>PART 1. 진단 파트</h2><p>조직 파악을 위한 데이터 진단 파트</p></div><div className="info-sub-block-grid"><div className="info-sub-block"><span className="info-sub-block-num">파트 1-1</span><div className="info-sub-block-title">3D AI 스캐닝</div><p className="info-sub-block-desc">근골격계 관절의 정렬 상태 및 신체 불균형을 즉각적으로 수치화하여 객관적인 데이터를 확보합니다.</p></div><div className="info-sub-block"><span className="info-sub-block-num">파트 1-2</span><div className="info-sub-block-title">개별 리포트 전송 및 상담</div><p className="info-sub-block-desc">거북목, 골반 틀어짐 등 분석된 결과지를 모바일로 전송하고, 전문가의 1:1 약식 상담을 진행합니다.</p></div></div></div>
                </div>
            )}
            {activeModal === 'modal2' && (
                <div className="modal active">
                    <div className="modal-content"><button className="modal-close" onClick={closeModal}>&times;</button><div className="modal-header"><h2>PART 2. 메인 케어 파트</h2></div><div className="info-sub-block signature-card"><span className="info-sub-block-num">시그니처 프로그램</span><div className="info-sub-block-title">1:1 맞춤형 피지컬 케어</div><p className="info-sub-block-desc">국내 최고 수준의 피지컬케어 전문가가 기업 현장에 직접 파견됩니다.</p></div></div>
                </div>
            )}
            {activeModal === 'modal4' && (
                <div className="modal active">
                    <div className="modal-content"><button className="modal-close" onClick={closeModal}>&times;</button><div className="modal-header"><h2>PART 3. 단체 운동 파트</h2></div><div className="info-sub-block-grid"><div className="info-sub-block"><span className="info-sub-block-num">파트 3-1</span><div className="info-sub-block-title">오피스 단체 스트레칭</div></div><div className="info-sub-block"><span className="info-sub-block-num">파트 3-2</span><div className="info-sub-block-title">기능성 운동 처방</div></div></div></div>
                </div>
            )}
            {activeModal === 'modal3' && (
                <div className="modal active">
                    <div className="modal-content"><button className="modal-close" onClick={closeModal}>&times;</button><div className="modal-header"><h2>PART 4. 강의 파트</h2></div><div className="info-sub-block-grid"><div className="info-sub-block"><span className="info-sub-block-num">파트 4-1</span><div className="info-sub-block-title">주요 질환 예방 특강</div></div><div className="info-sub-block"><span className="info-sub-block-num">파트 4-2</span><div className="info-sub-block-title">생활습관 개선 솔루션</div></div></div></div>
                </div>
            )}


            {activeModal === 'modal-proposal' && (
                <div className="modal active">
                    <div className="modal-content modal-form-content">
                        <button className="modal-close" onClick={closeModal}>&times;</button>
                        <div className="modal-header"><h2>기업/학교 맞춤형 제안서 요청</h2><p>조직 환경에 알맞은 솔루션 제안서를 보내드립니다.</p></div>
                        <form onSubmit={submitProposalForm}>
                            <div className="form-group"><label className="field-label">소속 <span>*</span></label><input type="text" name="company" className="form-control" required /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div className="form-group"><label className="field-label">담당자 <span>*</span></label><input type="text" name="manager" className="form-control" required /></div>
                                <div className="form-group"><label className="field-label">연락처 <span>*</span></label><input type="tel" name="phone" className="form-control" value={phoneValue} onChange={handlePhoneChange} placeholder="010-0000-0000" required /></div>
                            </div>
                            <div className="form-group">
                                <label className="field-label">이메일 <span>*</span></label>
                                <input type="email" name="email" className="form-control" onChange={validateEmail} placeholder="example@company.com" required />
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
                                        <div className="proposal-block-header" onClick={toggleSubModulesList}><span>▪ PART 1. 진단 (스마트 AI 체형분석)</span> <span className="toggle-icon">▼</span></div>
                                        <div className="sub-modules" style={{ display: 'none', padding: '15px', borderTop: '1px solid #eaeaea', background: '#fafafa', flexDirection: 'column', gap: '10px' }}>
                                            <label className="checkbox-label"><input type="checkbox" name="sub_module" value="3D AI 스캐닝" /> 3D AI 스캐닝</label>
                                            <label className="checkbox-label"><input type="checkbox" name="sub_module" value="개별 리포트 전송 및 상담" /> 개별 리포트 전송 및 상담</label>
                                        </div>
                                    </div>
                                    <div className="proposal-block">
                                        <div className="proposal-block-header" onClick={toggleSubModulesList}><span>▪ PART 2. 케어 (1:1 피지컬 케어)</span> <span className="toggle-icon">▼</span></div>
                                        <div className="sub-modules" style={{ display: 'none', padding: '15px', borderTop: '1px solid #eaeaea', background: '#fafafa', flexDirection: 'column', gap: '10px' }}>
                                            <label className="checkbox-label"><input type="checkbox" name="sub_module" value="1:1 맞춤형 피지컬 케어 파견" /> 1:1 맞춤형 피지컬 케어 파견</label>
                                        </div>
                                    </div>
                                    <div className="proposal-block">
                                        <div className="proposal-block-header" onClick={toggleSubModulesList}><span>▪ PART 3. 실습 (단체 운동 프로그램)</span> <span className="toggle-icon">▼</span></div>
                                        <div className="sub-modules" style={{ display: 'none', padding: '15px', borderTop: '1px solid #eaeaea', background: '#fafafa', flexDirection: 'column', gap: '10px' }}>
                                            <label className="checkbox-label"><input type="checkbox" name="sub_module" value="오피스 단체 스트레칭" /> 오피스 단체 스트레칭</label>
                                            <label className="checkbox-label"><input type="checkbox" name="sub_module" value="기능성 운동 처방" /> 기능성 운동 처방</label>
                                        </div>
                                    </div>
                                    <div className="proposal-block">
                                        <div className="proposal-block-header" onClick={toggleSubModulesList}><span>▪ PART 4. 교육 (강의 프로그램)</span> <span className="toggle-icon">▼</span></div>
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
            )}

            {activeModal === 'modal-quiz' && (
                <div className="modal active">
                    <div className="modal-content quiz-modal-content" style={{ maxWidth: '500px', textAlign: 'center' }}>
                        <button className="modal-close" onClick={closeModal}>&times;</button>
                        {quizStep === 1 && (
                            <div id="quiz-step-1" className="quiz-step active">
                                <span className="gateway-badge" style={{ background: '#e8f5e9', color: '#2b8a3e', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px' }}>STEP 1</span>
                                <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '15px 0' }}>어떤 분이신가요?</h2>
                                <div className="quiz-options" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '30px' }}>
                                    <button className="quiz-btn" onClick={() => nextQuizStep(2, 'b2b')}>🏢 조직을 이끄는 HR/관리자 (조직 진단)</button>
                                    <button className="quiz-btn" onClick={() => nextQuizStep(2, 'b2c')}>👤 내 몸 상태가 궁금한 직장인 (개인 자가진단)</button>
                                </div>
                            </div>
                        )}
                        {quizStep === 2 && (
                            <div id="quiz-step-2" className="quiz-step active" style={{ textAlign: 'left' }}>
                                <span className="gateway-badge" style={{ background: '#e8f5e9', color: '#2b8a3e', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px' }}>STEP 2</span>
                                <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '15px 0' }}>{quizTarget === 'b2b' ? "우리 조직 진단 (12문항)" : "내 몸 상태 자가진단 (12문항)"}</h2>
                                <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>각 문항을 읽고 직관적으로 예/아니오를 선택해 주세요.</p>
                                <div className="quiz-questions-wrap" style={{ maxHeight: '50vh', overflowY: 'auto', paddingRight: '10px', marginBottom: '20px' }}>
                                    {(quizTarget === 'b2b' ? B2B_QUESTIONS : B2C_QUESTIONS).map((q, idx) => (
                                        <div key={idx} className="quiz-question-box" style={{ background: '#f8f9fa', padding: '15px', borderRadius: '10px', marginBottom: '10px', border: '1px solid #eee' }}>
                                            <div style={{ fontWeight: 'bold', color: '#2b8a3e', marginBottom: '8px' }}>Q{idx + 1}.</div>
                                            <div style={{ fontSize: '15px', color: '#333', marginBottom: '12px', lineHeight: '1.4' }}>{q}</div>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button onClick={() => handleQuizAnswer(idx, 1)} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: quizAnswers[idx] === 1 ? '1px solid #2b8a3e' : '1px solid #ddd', background: quizAnswers[idx] === 1 ? '#e8f5e9' : '#fff', color: quizAnswers[idx] === 1 ? '#2b8a3e' : '#555', fontWeight: quizAnswers[idx] === 1 ? 'bold' : 'normal', cursor: 'pointer', transition: 'all 0.2s' }}>예</button>
                                                <button onClick={() => handleQuizAnswer(idx, 0)} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: quizAnswers[idx] === 0 ? '1px solid #d32f2f' : '1px solid #ddd', background: quizAnswers[idx] === 0 ? '#fce4e4' : '#fff', color: quizAnswers[idx] === 0 ? '#d32f2f' : '#555', fontWeight: quizAnswers[idx] === 0 ? 'bold' : 'normal', cursor: 'pointer', transition: 'all 0.2s' }}>아니오</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="form-submit-btn" style={{ width: '100%', padding: '18px', backgroundColor: '#2b8a3e', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 800, cursor: 'pointer' }} onClick={submitQuiz}>결과 보기</button>
                            </div>
                        )}
                        {quizStep === 3 && (
                            <div id="quiz-step-result" className="quiz-step active">
                                <div className="quiz-result-header" style={{ background: '#e8f5e9', padding: '30px', borderRadius: '16px', marginBottom: '20px' }}>
                                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎯</div>
                                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#2b8a3e' }}>담당자님을 위한 최적의 조합!</h3>
                                </div>
                                <h2 id="quiz-result-title" style={{ fontSize: '24px', fontWeight: 800, marginBottom: '15px' }}>{quizResultTitle}</h2>
                                <p id="quiz-result-desc" style={{ color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>{quizResultDesc}</p>
                                <button className="form-submit-btn" style={{ width: '100%', padding: '18px', backgroundColor: '#111', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 800, cursor: 'pointer' }} onClick={() => { closeModal(); openModal('modal-proposal'); }}>이 구성으로 제안서 요청하기</button>
                                <button className="btn-outline" style={{ width: '100%', marginTop: '10px', padding: '14px 28px', borderRadius: '8px', fontWeight: 'bold', background: '#fff', color: '#2b8a3e', border: '1px solid #2b8a3e', cursor: 'pointer' }} onClick={resetQuiz}>다시 하기</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 🏛️ 프리미엄 센터 상세 모달 */}
            {activeCenter && (
                <div className={`center-modal-overlay active`} onClick={closeCenterModal}>
                    <div className="center-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="center-modal-close" onClick={closeCenterModal}>&times;</button>
                        
                        {/* 좌측 비주얼 (DB에서 가져온 이미지 적용) */}
                        <div className="center-modal-visual" style={{ 
                            backgroundImage: `url('${activeCenter.image_url || '/images/physical-care/001.jpg'}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                        </div>

                        {/* 우측 정보 */}
                        <div className="center-modal-info">
                            <div className="center-modal-header">
                                <span className="center-modal-tag">{activeCenter.tagline}</span>
                                <h2 className="center-modal-title">{activeCenter.name}</h2>
                                <p className="center-modal-address" style={{ color: '#0ff', fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span style={{ fontSize: '16px' }}>📍</span> {activeCenter.address}
                                </p>
                                <p className="center-modal-philosophy">{activeCenter.philosophy}</p>
                            </div>

                            <div className="center-expert-section">
                                <h4 style={{ color: '#fff', marginBottom: '15px' }}>상주 전문가</h4>
                                <div className="expert-list-mini">
                                    {activeCenter.experts && activeCenter.experts.map((exp: string, idx: number) => (
                                        <div key={idx} className="expert-item-mini">
                                            <div className="expert-avatar-sm">{exp.charAt(0)}</div>
                                            <span style={{ color: '#ccc', fontSize: '14px' }}>{exp}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="center-modal-actions">
                                <a href={activeCenter.map_url} target="_blank" rel="noopener noreferrer" className="action-btn-naver btn-map">네이버 지도보기</a>
                                <a href={activeCenter.reserve_url} target="_blank" rel="noopener noreferrer" className="action-btn-naver btn-reserve">실시간 예약하기</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}