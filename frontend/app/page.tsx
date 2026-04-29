'use client';

import React, { useState, useEffect, MouseEvent, FormEvent } from 'react';
import '../v2_style.css';

export default function Home() {
    const [activePage, setActivePage] = useState('page-home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [activePhysicalSub, setActivePhysicalSub] = useState<string | null>(null);
    
    // 퀴즈 관련 State
    const [quizStep, setQuizStep] = useState(1);
    const [quizTarget, setQuizTarget] = useState('');
    const [quizResultTitle, setQuizResultTitle] = useState('');
    const [quizResultDesc, setQuizResultDesc] = useState('');

    // 리뷰 필터 State
    const [reviewFilter, setReviewFilter] = useState('all');

    // 리뷰 필터 시 Swiper 인스턴스 강제 업데이트 (원본 1:1 완벽 이식)
    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).reviewSwiperInstance) {
            (window as any).reviewSwiperInstance.update();
            (window as any).reviewSwiperInstance.slideTo(0);
        }
    }, [reviewFilter]);

    // 스크롤 감지 및 숫자가운트 다운 로직
    useEffect(() => {
        // [안전장치] 페이지 로드 시 0.5초 후 Reveal 무조건 강제 실행 (원본 HTML 하단 script.js 안전장치 이식)
        const safetyTimer = setTimeout(() => {
            document.querySelectorAll('.reveal').forEach((el) => {
                const htmlEl = el as HTMLElement;
                if (window.getComputedStyle(htmlEl).opacity === '0') {
                    htmlEl.style.opacity = '1';
                    htmlEl.style.transform = 'translateY(0)';
                    htmlEl.style.transition = 'opacity 0.5s ease';
                }
            });
        }, 500);

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.15 });
        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

        const countObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.count-up');
                    counters.forEach(counter => {
                        const target = +(counter.getAttribute('data-target') || 0);
                        const isFormat = counter.getAttribute('data-format') === 'true';
                        const increment = target / (2000 / 16);
                        let current = 0;
                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                counter.textContent = isFormat ? Math.ceil(current).toLocaleString() : Math.ceil(current).toString();
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = isFormat ? target.toLocaleString() : target.toString();
                            }
                        };
                        updateCounter();
                    });

                    if (entry.target.classList.contains('jelly-chart-section')) {
                        const pieScene = entry.target.querySelector('.jelly-pie-scene');
                        if (pieScene) pieScene.classList.add('animate');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.hero-stats, .school-stats, .jelly-chart-section').forEach(el => countObserver.observe(el));

        return () => {
            clearTimeout(safetyTimer);
            revealObserver.disconnect();
            countObserver.disconnect();
        };
    }, [activePage, activePhysicalSub]);

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
                if(!firstChild) return;
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
                if(!firstChild) return;
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

    // Swiper 마운트
    useEffect(() => {
        const initSwipers = () => {
            if (typeof (window as any).Swiper !== 'undefined') {
                (window as any).reviewSwiperInstance = new (window as any).Swiper(".reviewSwiper", {
                    slidesPerView: 1, spaceBetween: 20, observer: true, observeParents: true,
                    pagination: { el: ".swiper-pagination", clickable: true },
                    breakpoints: { 768: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 30 } }
                });
                new (window as any).Swiper(".partnerSwiper", {
                    slidesPerView: 2, spaceBetween: 15, loop: true, autoplay: { delay: 2000, disableOnInteraction: false },
                    breakpoints: { 640: { slidesPerView: 3, spaceBetween: 20 }, 1024: { slidesPerView: 5, spaceBetween: 30 } }
                });
            }
        };

        if (!document.getElementById('swiper-script')) {
            const script = document.createElement('script');
            script.id = 'swiper-script';
            script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
            script.onload = initSwipers;
            document.body.appendChild(script);
        } else {
            initSwipers();
        }
    }, [activePage]);

    // 기능 함수 모음
    const switchPage = (pageId: string) => {
        setActivePage(pageId);
        setActivePhysicalSub(null);
        setIsMobileMenuOpen(false);
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
        e.currentTarget.classList.toggle('active');
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

    const submitProposalForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = {
            company: (form.elements.namedItem('company') as HTMLInputElement).value,
            manager: (form.elements.namedItem('manager') as HTMLInputElement).value,
            phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            modules: Array.from(form.querySelectorAll('input[name="sub_module"]:checked')).map((cb: any) => cb.value),
            date: new Date().toLocaleString()
        };
        let requests = JSON.parse(localStorage.getItem('faww_requests') || '[]');
        requests.unshift(data);
        localStorage.setItem('faww_requests', JSON.stringify(requests));
        showToast('✅ 제안서 요청이 성공적으로 접수되었습니다.<br><span style="font-size:13px; color:#aaa; font-weight:normal; margin-top:5px; display:inline-block;">(admin.html 파일에서 접수 내역을 확인해 보세요!)</span>');
        closeModal();
        form.reset();
    };

    const nextQuizStep = (step: number, target?: string) => {
        if (target) setQuizTarget(target);
        setQuizStep(step);
    };

    const showQuizResult = (type: string) => {
        if (type === 'eap1') { setQuizResultTitle("스마트 AI 스캐닝 + 1:1 수기 케어"); setQuizResultDesc("근골격계 질환의 원인을 정확히 찾고, 원조 전문가가 현장에서 직접 케어하여 즉각적인 업무 효율을 높입니다."); }
        else if (type === 'eap2') { setQuizResultTitle("1:1 프리미엄 릴렉싱 케어"); setQuizResultDesc("신체의 굳은 긴장을 이완시켜 교감신경을 안정화하고 정신적 번아웃을 예방하는 최적의 솔루션입니다."); }
        else if (type === 'eap3') { setQuizResultTitle("오피스 단체 스트레칭 + 특강"); setQuizResultDesc("사무실 의자를 활용한 실습과 거북목 교정 특강을 통해 다함께 참여하는 건강 문화를 만듭니다."); }
        else if (type === 'sch1') { setQuizResultTitle("학교 전용 3D AI 체형 검진 시스템"); setQuizResultDesc("모아레 및 척추 분석 기능을 통해 학생들의 성장 밸런스를 측정하고 학부모용 상세 리포트를 제공합니다."); }
        else if (type === 'sch2') { setQuizResultTitle("학생 기능성 그룹 트레이닝"); setQuizResultDesc("체형 분석을 기반으로 성장기 학생들에게 꼭 필요한 맞춤형 교정 운동과 스트레칭을 지도합니다."); }
        setQuizStep(3);
    };

    const resetQuiz = () => {
        setQuizTarget('');
        setQuizStep(1);
    };

    // 리뷰 데이터 - 필터용
    const reviewsData = [
        { type: 'b2b', stars: '★★★★★', text: '"수업 끝나고 사무실로 복귀할 때 벌써 변화를 체감합니다. 발바닥, 종아리, 허벅지 움직임부터가 다르네요. 최고입니다!"', reviewer: 'S사 운영팀' },
        { type: 'b2b', stars: '★★★★★', text: '"늘어나는 산재 발생이 큰 고민이었는데 업무 시작 전 사고를 예방하는 프로그램을 진행하면서 눈에 띄게 줄었어요."', reviewer: 'H사 안전환경팀' },
        { type: 'school', stars: '★★★★☆', text: '"모든 학생이 형평성 있게 검진을 이용할 수 있다는 점이 좋았어요. 체계적인 데이터 리포트 덕분에 학부모님들 만족도도 높습니다."', reviewer: 'OO고등학교 보건교사' },
        { type: 'b2b', stars: '★★★★★', text: '"직원들의 거북목이 확실히 좋아지는게 보입니다. 정기적으로 계속 도입할 예정입니다."', reviewer: 'N사 복지담당자' },
        { type: 'school', stars: '★★★★★', text: '"아이들이 바른 자세에 대해 스스로 인지하게 된 것이 가장 큰 성과입니다. 정기적으로 계속 도입할 예정입니다."', reviewer: 'XX중학교 체육교사' }
    ];

    return (
        <>
            <header>
                <div className="logo" onClick={() => switchPage('page-home')}>FaWW</div>
                <button className="hamburger-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>☰</button>
                <ul className={`nav-links ${isMobileMenuOpen ? 'show' : ''}`}>
                    <li><a href="#" className={activePage === 'page-home' ? 'active-nav' : ''} onClick={(e) => { e.preventDefault(); switchPage('page-home'); }}>파우 소개</a></li>
                    <li><a href="#" className={activePage === 'page-ai' ? 'active-nav' : ''} onClick={(e) => { e.preventDefault(); switchPage('page-ai'); }}>스마트 AI 체형분석</a></li>
                    <li><a href="#" className={activePage === 'page-physical' ? 'active-nav' : ''} onClick={(e) => { e.preventDefault(); switchPage('page-physical'); }}>피지컬케어</a></li>
                    <li><a href="#" className={activePage === 'page-mall' ? 'active-nav' : ''} onClick={(e) => { e.preventDefault(); switchPage('page-mall'); }}>피지컬케어 mall</a></li>
                </ul>
                <div className={`nav-actions ${isMobileMenuOpen ? 'show' : ''}`}>
                    <button className="btn-outline" style={{ padding: '8px 16px', marginRight: '10px', fontSize: '13px', borderColor: '#eee', color: '#555', background: '#fff' }} onClick={() => openModal('modal-download')}>📥 소개서 다운로드</button>
                    <button className="consult-btn" style={{ backgroundColor: '#2b8a3e' }} onClick={() => openModal('modal-proposal')}>도입 및 제휴 문의</button>
                </div>
            </header>

            <div className="fab-container">
                <div className="chatbot-badge" onClick={() => openModal('modal-chat')}>💬 실시간 챗봇 문의</div>
            </div>

            <main id="page-home" className={`page-content ${activePage === 'page-home' ? 'active' : ''}`}>
                <section className="hero-brand reveal">
                    <video className="hero-video-bg" autoPlay loop muted playsInline>
                        <source src="background3.mp4" type="video/mp4" />
                    </video>
                    <div className="hero-overlay"></div>
                    
                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <div className="hero-subtitle hero-el hero-el-1">FaWW : Family Wholesome Wellness</div>
                        <h1 className="hero-el hero-el-2"><span>산재 예방</span>은 근로자의 <span>건강</span>으로부터 나옵니다</h1>
                        <p className="hero-el hero-el-3">
                            <strong>스마트 AI를 활용한 맞춤형 케어프로그램</strong>
                            근골격계 질환, 1:1 케어 프로그램을 통한 산재 예방 시스템을<br />업계 최초로 도입한 피지컬케어 전문가가 함께합니다
                        </p>
                        <div className="hero-buttons hero-el hero-el-4">
                            <button className="btn-primary" onClick={() => openModal('modal-proposal')}>맞춤 솔루션 문의하기</button>
                        </div>
                    </div>
                    <div className="hero-stats-wrapper">
                        <div className="hero-stats reveal reveal-scale">
                            <div className="stat-item"><h3><span className="count-up" data-target="12">0</span>년+</h3><p>피지컬케어 도입</p></div>
                            <div className="stat-item"><h3><span className="count-up" data-target="120">0</span>+</h3><p>파트너 기업 및 학교</p></div>
                            <div className="stat-item"><h3><span className="count-up" data-target="99">0</span>%</h3><p>고객 만족도</p></div>
                            <div className="stat-item"><h3><span className="count-up" data-target="20000" data-format="true">0</span>+</h3><p>관리 임직원 수</p></div>
                        </div>
                    </div>
                </section>

                <section className="teaser-section reveal">
                    <div className="container text-center">
                        <div className="teaser-text step-1">담당자님,</div>
                        <div className="teaser-text step-2"> <span style={{ color: '#2b8a3e' }}>사고 없는 현장</span>과 <span style={{ color: '#2b8a3e' }}>건강한 사무환경</span>을 만드는<br />산업안전보건의 파트너를 찾으시나요?</div>
                        <div className="teaser-text step-3"> 파우(FaWW)가 함께 하겠습니다.</div>
                        <div className="teaser-text step-4">&quot;피지컬케어 원조&quot;로서 증명해온 결과를 보여드리겠습니다.</div>
                        <div className="teaser-text step-5">지금부터 파우(FaWW)를 소개합니다. ▼</div>
                    </div>
                </section>
               
                <section className="jelly-chart-section reveal" style={{ padding: '80px 0', backgroundColor: '#f8f9fa', borderTop: '1px solid #eee' }}>
                    <div className="container text-center" style={{ overflow: 'visible' }}>
                        <h2 className="section-title">FaWW 피지컬케어 종합 만족도</h2>
                        <p className="section-desc" style={{ marginBottom: '60px' }}>2만 건 이상의 데이터가 증명하는 트렌디한 결과</p>
                        
                        <div className="jelly-pie-wrapper">
                            <div className="jelly-pie-scene">
                                <div className="jelly-shadow"></div>
                                <div className="jelly-layer bottom"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" className="j-bg"/><circle cx="16" cy="16" r="8" className="j-fg" pathLength="100"/></svg></div>
                                <div className="jelly-layer mid1"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" className="j-bg"/><circle cx="16" cy="16" r="8" className="j-fg" pathLength="100"/></svg></div>
                                <div className="jelly-layer mid2"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" className="j-bg"/><circle cx="16" cy="16" r="8" className="j-fg" pathLength="100"/></svg></div>
                                <div className="jelly-layer top">
                                    <svg viewBox="0 0 32 32">
                                        <circle cx="16" cy="16" r="8" className="j-bg" pathLength="100"/>
                                        <circle cx="16" cy="16" r="8" className="j-fg count-up-circle" pathLength="100"/>
                                    </svg>
                                    <div className="jelly-gloss"></div>
                                </div>
                            </div>
                            
                            <div className="jelly-text-float">
                                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                                    <span className="jelly-percent count-up" data-target="99">0</span>
                                    <span className="jelly-sign">%</span>
                                </div>
                                <span className="jelly-label">매우 만족</span>
                            </div>
                        </div>

                        <div className="pie-legend">
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
                            <span className="section-kicker">CORE AGENDA</span>
                            <h2>조직의 가장 큰 고민,<br /><span>&apos;피지컬케어(Physical Care)&apos;</span>에서 해답을 찾다</h2>
                            <p>단순한 복지를 넘어 산업재해, 저출산, 멘탈케어까지. 국가와 기업의 핵심 과제를 해결합니다.</p>
                        </div>
                        <div className="agenda-grid">
                            <div className="agenda-card reveal">
                                <div className="agenda-icon">🚨</div>
                                <h3>건강한 몸이 곧<br />산재의 예방입니다</h3>
                                <p>눈에 보이지 않는 신체의 피로와 통증은 예고 없이 찾아오는 산재의 씨앗입니다. 근골격계 질환을 선제적으로 예방하여 <br />법적 리스크를 낮추고 조직의 생산성을 극대화하십시오.</p>
                            </div>
                            <div className="agenda-card reveal delay-1">
                                <div className="agenda-icon">👶</div>
                                <h3>산모의 건강이<br />성공적 복직의 시작입니다 </h3>
                                <p>출산 친화적 조직문화, 이제는 신체의 근본적인 건강에서 출발해야 합니다. 전문가의 섬세한 피지컬케어로 출산 전후의 신체 회복을 돕고, 일과 가정이 양립하는 건강한 환경을 완성합니다.</p>
                            </div>
                            <div className="agenda-card reveal delay-2">
                                <div className="agenda-icon">🧠</div>
                                <h3>신체가 건강해야<br />마음도 건강해집니다</h3>
                                <p>굳어있는 몸의 긴장은 곧 우울감과 번아웃으로 이어집니다. 전문가의 직접적인 피지컬케어로 신체의 활력을 되찾아주고, 마음의 병과 극단적인 선택을 예방하는 새로운 EAP를 제시합니다.</p>
                            </div>
                        </div>

                        <div className="expert-banner reveal">
                            <h4>⚠️ 자격증 없는 무자격 플랫폼 업체를 주의하십시오.</h4>
                            <p>단순 외부 강사들을 매칭해주는 타 플랫폼과 비교를 거부합니다. FaWW는 <strong>12년 이상의 독보적 임상 노하우</strong>를 바탕으로 &apos;피지컬케어관리사&apos; 자격증을 창시한 <strong>대한민국 &apos;원조(Original)&apos;</strong> 그룹입니다.<br />검증되지 않은 1회성 휴식이 아닌, 뼈와 근막을 완벽히 이해하는 진짜 전문가의 개입만이 실질적인 지표 변화를 만듭니다.</p>
                        </div>

                        <div className="expert-features">
                            <div style={{ textAlign: 'center', marginBottom: '40px' }} className="reveal">
                                <span className="section-kicker">EAP SYSTEM</span>
                                <h2 className="section-title" style={{ marginBottom: 0 }}>FaWW만의 독보적 EAP 운영 시스템</h2>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="comparison-section reveal" style={{ padding: '60px 0', background: '#fff', borderTop: '1px solid #eee' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <span className="section-kicker">DIFFERENCE</span>
                        <h2 className="section-title">품의서가 통과되는 압도적 차이</h2>
                        <p className="section-desc">단순 매칭 플랫폼과 피지컬케어 원조 그룹의 본질적인 차이를 확인하세요.</p>
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
                            <span className="section-kicker">OUR BUSINESS</span>
                            <h2 className="section-title">지속가능한 웰니스 솔루션</h2>
                            <p className="section-desc">FaWW의 3가지 비즈니스로 여러분의 조직과 일상에 건강을 선물하세요.</p>
                        </div>
                        <div className="gateway-grid">
                            <div className="gateway-card reveal" onClick={() => switchPage('page-ai')}>
                                <div className="gateway-img scan-wrapper" style={{ backgroundColor: '#e8f5e9', color: '#2b8a3e' }}>
                                    <div className="scan-line"></div>
                                    B2B / 학교 솔루션 화면
                                </div>
                                <div className="gateway-content">
                                    <div className="tags-wrap"><span className="hash-tag">#임직원_통증관리</span><span className="hash-tag">#학생_체형검진</span></div>
                                    <h2>스마트 AI 체형분석 솔루션</h2>
                                    <p>기업의 업무 효율을 높이는 EAP 복지 <br />프로그램부터 학교 단체 검진까지, 데이터 <br />기반의 정확한 리포트를 제공합니다.</p>
                                    <div className="gateway-btn">조직 맞춤 솔루션 보기</div>
                                </div>
                            </div>
                            <div className="gateway-card reveal delay-1" onClick={() => switchPage('page-physical')}>
                                <div className="gateway-img">피지컬케어 센터/아카데미 화면</div>
                                <div className="gateway-content">
                                    <div className="tags-wrap"><span className="hash-tag">#로컬센터</span><span className="hash-tag">#전문가양성</span></div>
                                    <h2>FaWW 피지컬케어</h2>
                                    <p>전국 주요 오프라인 거점 센터를 통한 <br />개인 맞춤 관리와, 압도적인 전문가를 양성하는 아카데미 교육 과정을 운영합니다.</p>
                                    <div className="gateway-btn">피지컬케어 자세히 보기</div>
                                </div>
                            </div>
                            <div className="gateway-card reveal delay-2" onClick={() => switchPage('page-mall')}>
                                <div className="gateway-img">교구몰 쇼핑 화면</div>
                                <div className="gateway-content">
                                    <div className="tags-wrap"><span className="hash-tag">#홈케어교구</span><span className="hash-tag">#복지포인트</span></div>
                                    <h2>피지컬케어 Mall</h2>
                                    <p>전문가가 직접 검증한 릴렉싱 및 트레이닝 교구. 기업 복지 포인트 차감 및 안전한 <br />셀프 홈케어를 완벽 지원합니다.</p>
                                    <div className="gateway-btn">검증 교구 쇼핑하기</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="testimonials reveal">
                    <div className="container">
                        <h2 className="section-title">담당자가 99%만족한 FaWW의 솔루션</h2>
                        <div className="review-filter-wrapper" style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <button className={`review-filter-btn ${reviewFilter === 'all' ? 'active' : ''}`} onClick={() => setReviewFilter('all')}>전체 보기</button>
                            <button className={`review-filter-btn ${reviewFilter === 'b2b' ? 'active' : ''}`} onClick={() => setReviewFilter('b2b')}>🏢 기업/HR 담당자</button>
                            <button className={`review-filter-btn ${reviewFilter === 'school' ? 'active' : ''}`} onClick={() => setReviewFilter('school')}>🏫 학교/보건교사</button>
                        </div>

                        {/* 💡 리뷰 Swiper 필터 로직 완벽 복구 (swiper-slide 클래스 토글링) */}
                        <div className="swiper reviewSwiper" style={{ marginTop: '40px', padding: '20px 0' }}>
                            <div className="swiper-wrapper" id="review-wrapper">
                                {reviewsData.map((rev, index) => {
                                    const isVisible = reviewFilter === 'all' || reviewFilter === rev.type;
                                    return (
                                        <div key={index} className={isVisible ? "swiper-slide" : ""} style={{ display: isVisible ? 'block' : 'none' }}>
                                            <div className="testimonial-card">
                                                <div className="stars">{rev.stars}</div>
                                                <p className="review-text">{rev.text}</p>
                                                <div className="reviewer-info"><div className="reviewer-avatar"></div><span>{rev.reviewer}</span></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                </section>

                <section className="map-section reveal">
                    <div className="container">
                        <h2 className="section-title">전국 어디든, FaWW가 찾아갑니다</h2>
                        <p className="section-desc" style={{ marginBottom: '50px' }}>전국 주요 기업 및 학교 500곳 이상 누적 방문 달성</p>
                        <div className="map-wrapper">
                            <div className="map-marker" style={{ top: '25%', left: '35%' }}>
                                <div className="marker-btn">서울/경기 230곳</div>
                                <div className="marker-detail"><ul><li>삼성 계열사</li><li>현대 계열사</li><li>네이버/카카오</li></ul></div>
                            </div>
                            <div className="map-marker" style={{ top: '40%', left: '60%' }}>
                                <div className="marker-btn">충청권 85곳</div>
                                <div className="marker-detail"><ul><li>SK하이닉스</li><li>주요 공공기관</li></ul></div>
                            </div>
                            <div className="map-marker" style={{ top: '75%', left: '75%' }}>
                                <div className="marker-btn">부산/경남 110곳</div>
                                <div className="marker-detail"><ul><li>현대자동차</li><li>주요 초중고교</li></ul></div>
                            </div>
                            <div className="map-marker" style={{ top: '60%', left: '40%' }}>
                                <div className="marker-btn">전라권 65곳</div>
                                <div className="marker-detail"><ul><li>LG화학</li><li>주요 협력업체</li></ul></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="partners reveal">
                    <div className="container">
                        <h2 className="section-title">대한민국 일류 기업과 학교들이 FaWW와 함께합니다</h2>
                        <div className="swiper partnerSwiper" style={{ marginTop: '40px', padding: '10px 0' }}>
                            <div className="swiper-wrapper">
                                <div className="swiper-slide"><div className="partner-logo">삼성 계열사</div></div>
                                <div className="swiper-slide"><div className="partner-logo">현대 계열사</div></div>
                                <div className="swiper-slide"><div className="partner-logo">네이버/카카오</div></div>
                                <div className="swiper-slide"><div className="partner-logo">주요 금융권</div></div>
                                <div className="swiper-slide"><div className="partner-logo">전국 주요 초중고</div></div>
                                <div className="swiper-slide"><div className="partner-logo">공공기관</div></div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="media reveal" style={{ background: '#f8f9fa' }}>
                    <div className="container">
                        <h2 className="section-title">FaWW 미디어 보도</h2>
                        <div className="media-grid">
                            <div className="media-item"><div className="media-thumb">기사 썸네일 이미지</div><div className="media-title">기업 복지 트렌드, 이제는 맞춤형 피지컬케어 시대</div></div>
                            <div className="media-item"><div className="media-thumb">기사 썸네일 이미지</div><div className="media-title">FaWW, AI 체형분석 도입으로 업계 혁신 선도</div></div>
                            <div className="media-item"><div className="media-thumb">기사 썸네일 이미지</div><div className="media-title">직장인 거북목 완화 프로젝트 성공 사례 조명</div></div>
                            <div className="media-item"><div className="media-thumb">기사 썸네일 이미지</div><div className="media-title">건강한 조직문화를 위한 필수 선택, EAP 솔루션</div></div>
                        </div>
                    </div>
                </section>
            </main>

            {/* MAIN 2: AI 체형분석 */}
            <main id="page-ai" className={`page-content ${activePage === 'page-ai' ? 'active' : ''}`}>
                <section className="hero reveal" style={{ padding: '120px 20px' }}>
                    <video className="hero-video-bg" autoPlay loop muted playsInline>
                        <source src="background.mp4" type="video/mp4" />
                    </video>
                    <div className="hero-overlay"></div>
                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <h1>데이터로 증명하는 <span>스마트 AI 체형분석</span></h1>
                        <p>기업의 건강과 안전부터 학생들의 바른 성장까지, 정확한 진단 및 솔루션을 제공합니다.</p>
                    </div>
                </section>
                
                <section className="category-section reveal">
                    <div className="container" style={{ textAlign: 'center' }}>
                        <h2 className="section-title">해당되는 카테고리를 골라주세요</h2>
                        <div className="card-grid">
                            <div className="info-card reveal" onClick={() => switchPage('page-eap')} style={{ borderColor: '#2b8a3e', boxShadow: '0 10px 30px rgba(43, 138, 62, 0.1)' }}>
                                <div className="card-icon" style={{ background: '#2b8a3e', color: 'white' }}>01</div>
                                <h3>기업</h3>
                                <p>임직원의 근골격계 질환을 예방하고 <br />업무 효율을 높이는 B2B 전용 <br />체형분석 솔루션입니다.</p>
                                <div className="view-details-btn">기업 EAP 상세 보기</div>
                            </div>
                            <div className="info-card reveal delay-1" onClick={() => switchPage('page-school')} style={{ borderColor: '#004d40', boxShadow: '0 10px 30px rgba(0,77,64,0.1)' }}>
                                <div className="card-icon" style={{ background: '#004d40', color: 'white' }}>02</div>
                                <h3>학교</h3>
                                <p>성장기 학생들의 체형 검진과 더불어 스트레칭, 그룹운동 및 상세 통계 리포트를 제공합니다.</p>
                                <div className="view-details-btn" style={{ color: '#004d40' }}>학교 프로그램 상세 보기</div>
                            </div>
                            <div className="info-card reveal delay-2" onClick={() => { switchPage('page-physical'); openPhysicalSub('sub-center'); }}>
                                <div className="card-icon" style={{ color: '#111' }}>03</div>
                                <h3>개인</h3>
                                <p>개인 맞춤형 체형 분석 및 근본적인 신체 개선을 원하신다면 가까운 피지컬케어 센터를 방문해 보세요.</p>
                                <div className="view-details-btn" style={{ color: '#111' }}>가까운 센터 찾기</div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* MAIN 3: 기업 EAP */}
            <main id="page-eap" className={`page-content ${activePage === 'page-eap' ? 'active' : ''}`}>
                <section className="hero-premium reveal">
                    <div className="container">
                        <div style={{ textAlign: 'left' }}><span className="back-btn" onClick={() => switchPage('page-ai')}>← 타겟 선택으로 돌아가기</span></div>
                        <h1>건강이 함께하는 회사,<br />기업복지의 원조는 FaWW</h1>
                        <p>AI 빅데이터 기반의 피지컬케어 솔루션을 제안합니다.</p>
                        <button className="btn-primary" onClick={() => openModal('modal-proposal')} style={{ fontSize: '18px', padding: '16px 36px' }}>우리 회사 맞춤 제안서 받기</button>
                    </div>
                </section>

                <section className="services reveal" style={{ backgroundColor: '#fff' }}>
                    <div className="container">
                        <h2 className="section-title">기업 맞춤형 EAP 솔루션</h2>
                        <p className="section-desc">조직에 맞게 설계된 AI 기반 프로세스</p>
                        <div className="service-grid">
                            <div className="smart-card reveal" onClick={() => openModal('modal1')}>
                                <div className="smart-card-top">
                                    <div className="smart-card-img">AI 스캐닝 이미지</div>
                                    <div className="smart-card-body">
                                        <span className="gateway-badge">PART 1. 진단</span>
                                        <h3>스마트 Ai 체형분석</h3>
                                        <p>통증의 원인을 파악하고, 신체 불균형을 구조적으로 분석하여 정확하게 관리합니다.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="smart-card reveal delay-1" onClick={() => openModal('modal2')}>
                                <div className="smart-card-top">
                                    <div className="smart-card-img">전문가 케어 이미지</div>
                                    <div className="smart-card-body">
                                        <span className="gateway-badge">PART 2. 케어</span>
                                        <h3>1:1 피지컬 케어</h3>
                                        <p>통증 개선과 부상 예방을 위한 전문가 수기치료와 테이핑, MCT 등을 현장에서 진행합니다.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="smart-card reveal delay-2" onClick={() => openModal('modal4')}>
                                <div className="smart-card-top">
                                    <div className="smart-card-img">단체 운동 이미지</div>
                                    <div className="smart-card-body">
                                        <span className="gateway-badge">PART 3. 실습</span>
                                        <h3>단체 운동 프로그램</h3>
                                        <p>의자나 소도구를 활용하여 업무 중에도 실천 가능한 코어 강화 및 근육 이완 루틴.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="smart-card reveal delay-3" onClick={() => openModal('modal3')}>
                                <div className="smart-card-top">
                                    <div className="smart-card-img">강의 진행 이미지</div>
                                    <div className="smart-card-body">
                                        <span className="gateway-badge">PART 4. 교육</span>
                                        <h3>강의 프로그램</h3>
                                        <p>거북목 교정, 대사증후군 예방, 식습관 개선 등 맞춤형 건강 특강을 제공합니다.</p>
                                    </div>
                                </div>
                            </div>
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
                            <div className="faq-item" onClick={toggleFaq}>
                                <div className="faq-title-wrap"><div className="faq-title"><span className="q-mark">Q.</span> 우리 회사는 인원이 많은데, 하루에 몇 명이나 케어를 받을 수 있나요?</div><div className="faq-icon">+</div></div>
                                <div className="faq-content"><span className="a-mark">A.</span> 투입되는 전문가 인원에 따라 유연하게 운영됩니다. 보통 전문가 1인당 하루(8시간 기준) 약 6~10명의 1:1 집중 케어가 가능하며, 단체 운동이나 강의 프로그램과 병행할 경우 하루 수백 명까지 참여 인원을 확대할 수 있습니다.</div>
                            </div>
                            <div className="faq-item" onClick={toggleFaq}>
                                <div className="faq-title-wrap"><div className="faq-title"><span className="q-mark">Q.</span> 사내에 별도의 공간이 필요한가요? 공간이 협소해도 진행이 가능한지 궁금합니다.</div><div className="faq-icon">+</div></div>
                                <div className="faq-content"><span className="a-mark">A.</span> 네, 회의실이나 휴게실 정도의 유휴 공간만 있으면 충분합니다. 1:1 케어에 필요한 이동식 베드와 AI 체형 분석 장비는 저희가 직접 지참하며, 공간 크기에 맞춰 최적화된 동선으로 세팅해 드립니다.</div>
                            </div>
                            <div className="faq-item" onClick={toggleFaq}>
                                <div className="faq-title-wrap"><div className="faq-title"><span className="q-mark">Q.</span> 서비스 이용 예약은 어떤 방식으로 이루어지나요? 인사팀에서 일일이 명단을 취합해야 하나요?</div><div className="faq-icon">+</div></div>
                                <div className="faq-content"><span className="a-mark">A.</span> 담당자님의 업무 부담을 줄이기 위해 자체 온라인 예약 시스템을 제공합니다. 임직원이 직접 원하는 시간에 접속해 예약하고 알림톡을 받을 수 있어, 별도의 명단 관리 없이 최종 확정 리스트만 확인하시면 됩니다.</div>
                            </div>
                            <div className="faq-item" onClick={toggleFaq}>
                                <div className="faq-title-wrap"><div className="faq-title"><span className="q-mark">Q.</span> &apos;스마트 AI 체형분석&apos; 결과 리포트는 개인에게 별도로 제공되나요?</div><div className="faq-icon">+</div></div>
                                <div className="faq-content"><span className="a-mark">A.</span> 네, 분석 즉시 모바일 리포트가 개별 전송됩니다. 현재 나의 불균형 상태, 위험도 점수, 그리고 일상에서 실천할 수 있는 맞춤형 운동 처방이 포함되어 있어 구성원들의 만족도가 매우 높습니다.</div>
                            </div>
                            <div className="faq-item" onClick={toggleFaq}>
                                <div className="faq-title-wrap"><div className="faq-title"><span className="q-mark">Q.</span> 1:1 케어에서 진행되는 &apos;MCT&apos;나 &apos;수기치료&apos;가 통증 완화에 즉각적인 효과가 있나요?</div><div className="faq-icon">+</div></div>
                                <div className="faq-content"><span className="a-mark">A.</span> 단순 마사지가 아닌 근막 이완(MCT)과 기능적 가동술을 결합한 전문 테라피입니다. 업무 중 발생하는 목, 어깨, 허리의 급성 통증과 근육 긴장을 즉각적으로 해소하여 업무 효율을 높이는 데 중점을 둡니다.</div>
                            </div>
                            <div className="faq-item" onClick={toggleFaq}>
                                <div className="faq-title-wrap"><div className="faq-title"><span className="q-mark">Q.</span> 우리 직무 특성(예: 장시간 서 있는 업무)에 맞춘 커스터마이징이 가능한가요?</div><div className="faq-icon">+</div></div>
                                <div className="faq-content"><span className="a-mark">A.</span> 물론입니다. 사전 상담을 통해 해당 기업의 주된 업무 환경(데스크 워크, 현장직 등)을 분석하고, 그에 가장 빈번하게 발생하는 근골격계 질환 위주로 강의와 케어 루틴을 재구성하여 진행합니다.</div>
                            </div>
                            <div className="faq-item" onClick={toggleFaq}>
                                <div className="faq-title-wrap"><div className="faq-title"><span className="q-mark">Q.</span> 4가지 파트를 반드시 패키지로 도입해야 하나요? 필요한 파트만 선택할 수 있나요?</div><div className="faq-icon">+</div></div>
                                <div className="faq-content"><span className="a-mark">A.</span> 전 사원 대상인 &apos;강의&apos;와 &apos;진단&apos;만 선택하시거나, 고위험군을 위한 &apos;1:1 케어&apos;만 집중 운영하는 등 기업의 예산과 필요에 따라 자유롭게 조합하여 설계할 수 있습니다.</div>
                            </div>
                            <div className="faq-item" onClick={toggleFaq}>
                                <div className="faq-title-wrap"><div className="faq-title"><span className="q-mark">Q.</span> 서비스 도입 후 임직원 만족도 조사나 결과 보고서를 제공해 주시나요?</div><div className="faq-icon">+</div></div>
                                <div className="faq-content"><span className="a-mark">A.</span> 네, 프로그램 종료 후 참여도, 만족도 조사 결과, AI 분석 데이터 통계(익명 처리)를 포함한 성과 결과 보고서를 제공합니다. 이는 인사팀의 KPI 달성 증빙 및 차기 복지 예산 확보 자료로 활용하실 수 있습니다.</div>
                            </div>
                            <div className="faq-item" onClick={toggleFaq}>
                                <div className="faq-title-wrap"><div className="faq-title"><span className="q-mark">Q.</span> AI 체형 분석 시 수집되는 개인정보나 신체 데이터는 어떻게 관리되나요?</div><div className="faq-icon">+</div></div>
                                <div className="faq-content"><span className="a-mark">A.</span> 수집된 모든 데이터는 암호화되어 안전하게 관리되며, 개인정보보호법을 준수합니다. 기업 측에는 개인의 세부 정보가 아닌 조직 전체의 건강 통계 지표만 제공되므로 안심하셔도 됩니다.</div>
                            </div>
                        </div>
                    </div>
                </section>
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
                        <div className="school-header-wrap">
                            <span className="school-tag">SCHOOL PROGRAM</span>
                            <h2>학교사업 ㅡ 학생 체형분석 솔루션</h2>
                            <p>성장기 학생들의 체형 데이터를 과학적으로 분석하고, 맞춤형 운동 프로그램을 제공합니다. 학교 현장에 최적화된 프로세스로 효율적인 건강관리를 지원합니다.</p>
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
                        <h2 className="section-title">주요 프로그램 종류</h2>
                        <p className="section-desc">단순한 검진을 넘어 체계적인 교육과 관리를 동반합니다.</p>
                        <div className="service-grid">
                            <div className="smart-card">
                                <div className="smart-card-top" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <div className="smart-card-img" style={{ width: '100%', height: '160px', background: '#e0f2f1', color: '#004d40' }}>스캐닝 진행 화면</div>
                                    <div className="smart-card-body" style={{ textAlign: 'center', marginTop: '20px' }}>
                                        <span className="gateway-badge" style={{ background: '#e0f2f1', color: '#004d40' }}>PROGRAM 1</span>
                                        <h3>스마트 AI 체형 분석 프로그램</h3>
                                        <p>정밀 카메라와 AI 솔루션을 활용해 학생들의 근골격계 상태와 성장 밸런스를 측정하고 평가합니다.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="smart-card">
                                <div className="smart-card-top" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <div className="smart-card-img" style={{ width: '100%', height: '160px', background: '#e0f2f1', color: '#004d40' }}>그룹 운동 진행 화면</div>
                                    <div className="smart-card-body" style={{ textAlign: 'center', marginTop: '20px' }}>
                                        <span className="gateway-badge" style={{ background: '#e0f2f1', color: '#004d40' }}>PROGRAM 2</span>
                                        <h3>그룹 운동</h3>
                                        <p>스트레칭 및 자세교정을 위한 기능성 트레이닝. 성장기 학생들에게 꼭 필요한 맞춤형 운동 처방을 제공합니다.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* MAIN 5: 피지컬케어 */}
            <main id="page-physical" className={`page-content ${activePage === 'page-physical' ? 'active' : ''}`}>
                <section className="hero reveal" style={{ padding: '120px 20px' }}>
                    <video className="hero-video-bg" autoPlay loop muted playsInline>
                        <source src="background2.mp4" type="video/mp4" />
                    </video>
                    <div className="hero-overlay"></div>
                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <h1>현장과 실무를 잇는 <span>FaWW 피지컬케어</span></h1>
                        <p>기업의 생산성부터 개인의 삶의 질 향상, 그리고 대한민국 최고 전문가 양성까지 아우릅니다.</p>
                    </div>
                </section>

                <div id="physical-gateway" className={`container reveal ${!activePhysicalSub ? 'active' : ''}`} style={{ padding: '60px 20px', display: !activePhysicalSub ? 'block' : 'none' }}>
                    <div className="card-grid" style={{ gap: '30px' }}>
                        <div className="info-card reveal" onClick={() => switchPage('page-eap')}>
                            <div className="card-icon" style={{ background: '#2b8a3e', color: 'white' }}>EAP</div>
                            <h3>피지컬케어</h3>
                            <p>기업 임직원을 위한 맞춤형 방문 솔루션</p>
                        </div>
                        <div className="info-card reveal delay-1" onClick={() => openPhysicalSub('sub-academy')}>
                            <div className="card-icon" style={{ color: '#111' }}>EDU</div>
                            <h3>자격증</h3>
                            <p>오리지널 피지컬케어 전문가 양성 과정</p>
                        </div>
                        <div className="info-card reveal delay-2" onClick={() => openPhysicalSub('sub-center')}>
                            <div className="card-icon" style={{ color: '#111' }}>CTR</div>
                            <h3>센터</h3>
                            <p>가까운 직영 센터 1:1 맞춤형 피지컬케어</p>
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
                        <div className="container">
                            <div style={{ textAlign: 'left' }}><span className="back-btn-light" onClick={showPhysicalGateway}>← 카테고리 선택으로 돌아가기</span></div>
                            <h2 className="section-title">센터 (로컬) 소개</h2>
                            <div className="grid-vertical">
                                <div className="center-row-card reveal"><div><span className="gateway-badge">Center 01</span><h3>영등포점 (본점)</h3></div><div style={{ color: '#2b8a3e', fontSize: '24px' }}>→</div></div>
                                <div className="center-row-card reveal delay-1"><div><span className="gateway-badge">Center 02</span><h3>동탄점 (2호점)</h3></div><div style={{ color: '#2b8a3e', fontSize: '24px' }}>→</div></div>
                                <div className="center-row-card reveal delay-2"><div><span className="gateway-badge">Center 03</span><h3>강남점 (3호점)</h3></div><div style={{ color: '#2b8a3e', fontSize: '24px' }}>→</div></div>
                                <div className="center-row-card reveal delay-3"><div><span className="gateway-badge">Center 04</span><h3>여의도점 (4호점)</h3></div><div style={{ color: '#2b8a3e', fontSize: '24px' }}>→</div></div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* MAIN 6: MALL */}
            <main id="page-mall" className={`page-content ${activePage === 'page-mall' ? 'active' : ''}`}>
                <section className="hero reveal" style={{ backgroundColor: '#212529' }}>
                    <div className="container">
                        <h1>검증된 교구, <span>피지컬케어 mall</span></h1>
                        <p>임직원 복지 포인트 차감을 지원하는 전용 교구몰입니다.</p>
                    </div>
                </section>
                <section className="category-section reveal" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="container">
                        <div className="product-grid">
                            <div className="product-card reveal"><div className="product-img">블랙테라</div><div className="product-info"><div className="product-title">블랙테라</div><button className="buy-btn">도입 문의</button></div></div>
                            <div className="product-card reveal delay-1"><div className="product-img">마사지스틱</div><div className="product-info"><div className="product-title">마사지스틱</div><button className="buy-btn">도입 문의</button></div></div>
                            <div className="product-card reveal delay-2"><div className="product-img">스포츠밴드</div><div className="product-info"><div className="product-title">스포츠밴드</div><button className="buy-btn">도입 문의</button></div></div>
                            <div className="product-card reveal delay-3"><div className="product-img">스트랩</div><div className="product-info"><div className="product-title">스트랩</div><button className="buy-btn">도입 문의</button></div></div>
                        </div>
                    </div>
                </section>
            </main>

            <section className="cta-footer reveal">
                <div className="container">
                    <h2>FaWW와 함께 건강한 조직을 구축하세요</h2>
                    <p style={{ marginBottom: '30px' }}>우리 학교 및 기업 환경에 알맞는 건강 복지 프로그램을 맞춤 설계해 드립니다.</p>
                    <button className="cta-btn-white" onClick={() => openModal('modal-proposal')}>맞춤 제안서 및 견적 받기</button>
                </div>
            </section>

            {/* 💡 모달 모음 - 원본 이모지 레이아웃 완벽 이식 */}
            {activeModal === 'modal-chat' && (
                <div className="modal active">
                    <div className="modal-content chat-modal-content">
                        <div className="chat-header-bg">
                            <div className="chat-top-bar"><button className="chat-close-btn" onClick={closeModal}>&times;</button></div>
                            <div className="chat-profile-sec">
                                <div className="chat-profile-img">FW</div>
                                <div className="chat-profile-info"><h3>FaWW</h3><p>⚡ 24시간 빠른 답변 대기중</p></div>
                            </div>
                        </div>
                        <div className="chat-body-sec">
                            <div className="chat-main-card">
                                <div className="chat-main-card-header"><span className="sm-logo">FW</span><span>FaWW</span></div>
                                <h4>압도적 건강복지의 시작! 💚</h4>
                                <p>No.1 피지컬케어 솔루션 FaWW와 함께하면<br />임직원과 학생이 건강해지고, 조직이 성장합니다.</p>
                                <button className="chat-inquire-btn" onClick={() => { showToast('📝 제안서 요청 폼으로 연결됩니다.'); closeModal(); openModal('modal-proposal'); }}>문의하기 ▼</button>
                                <div className="chat-reply-time"><span>👩‍💻</span> 몇 분 내 답변 받으실 수 있어요</div>
                            </div>
                            <div className="chat-alt-card">
                                <span>다른 방법으로 문의</span>
                                <div className="chat-alt-icons">
                                    <button className="chat-icon-btn chat-icon-kakao" title="카카오톡 문의" onClick={() => showToast('💬 카카오톡 채널로 이동합니다.')}>💬</button>
                                    <button className="chat-icon-btn chat-icon-phone" title="전화 문의" onClick={() => showToast('📞 고객센터: 1588-0000')}>📞</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
            
            {activeModal === 'modal-download' && (
                <div className="modal active">
                    <div className="modal-content" style={{ maxWidth: '550px' }}>
                        <button className="modal-close" onClick={closeModal}>&times;</button>
                        <div className="modal-header"><h2>소개서 다운로드</h2><p>필요한 분야의 소개서를 선택하여 다운로드하세요.</p></div>
                        <div className="hero-buttons" style={{ flexDirection: 'column', gap: '15px', marginBottom: 0 }}>
                            <a href="기업용_소개서.pdf" download className="btn-primary" style={{ width: '100%', textAlign: 'center', boxSizing: 'border-box' }} onClick={() => { showToast('📥 기업용 소개서가 다운로드됩니다.'); closeModal(); }}>🏢 기업용 소개서</a>
                            <a href="학교용_소개서.pdf" download className="btn-primary" style={{ width: '100%', backgroundColor: '#004d40', textAlign: 'center', boxSizing: 'border-box' }} onClick={() => { showToast('📥 학교용 소개서가 다운로드됩니다.'); closeModal(); }}>🏫 학교용 소개서</a>
                            <a href="AI체형분석_소개서.pdf" download className="btn-primary" style={{ width: '100%', backgroundColor: '#111', textAlign: 'center', boxSizing: 'border-box' }} onClick={() => { showToast('📥 AI 체형분석 소개서가 다운로드됩니다.'); closeModal(); }}>🤖 AI 체형분석 소개서</a>
                        </div>
                    </div>
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
                                <div className="form-group"><label className="field-label">연락처 <span>*</span></label><input type="tel" name="phone" className="form-control" required /></div>
                            </div>
                            <div className="form-group"><label className="field-label">이메일 <span>*</span></label><input type="email" name="email" className="form-control" required /></div>
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
                                <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '15px 0' }}>어떤 조직의 담당자이신가요?</h2>
                                <div className="quiz-options" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '30px' }}>
                                    <button className="quiz-btn" onClick={() => nextQuizStep(2, 'b2b')}>🏢 일반 기업 (HR/복지 담당)</button>
                                    <button className="quiz-btn" onClick={() => nextQuizStep(2, 'school')}>🏫 학교 (보건/체육교사)</button>
                                </div>
                            </div>
                        )}
                        {quizStep === 2 && (
                            <div id="quiz-step-2" className="quiz-step active">
                                <span className="gateway-badge" style={{ background: '#e8f5e9', color: '#2b8a3e', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px' }}>STEP 2</span>
                                <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '15px 0' }}>가장 큰 고민(목적)은 무엇인가요?</h2>
                                <div className="quiz-options" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '30px' }}>
                                    {quizTarget === 'b2b' ? (
                                        <>
                                            <button className="quiz-btn" onClick={() => showQuizResult('eap1')}>🤕 임직원 거북목 등 통증/산재 예방</button>
                                            <button className="quiz-btn" onClick={() => showQuizResult('eap2')}>🤯 직무 스트레스 및 번아웃 케어</button>
                                            <button className="quiz-btn" onClick={() => showQuizResult('eap3')}>🧘‍♀️ 사내 웰니스(운동) 문화 조성</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="quiz-btn" onClick={() => showQuizResult('sch1')}>📊 전교생 스마트 체형 검진 (데이터화)</button>
                                            <button className="quiz-btn" onClick={() => showQuizResult('sch2')}>🏃 성장기 체형 교정 그룹 운동</button>
                                        </>
                                    )}
                                </div>
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
        </>
    );
}