'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, MouseEvent, FormEvent } from 'react';
import './v2_style.css';
import { supabase } from '@/lib/supabase';
import HeroSection from '@/components/sections/HeroSection';
import TeaserSection from '@/components/sections/TeaserSection';
import MagnifySection from '@/components/sections/MagnifySection';
import JellyChartSection from '@/components/sections/JellyChartSection';
import AgendaSection from '@/components/sections/AgendaSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import GatewaySection from '@/components/sections/GatewaySection';
import ReviewSection from '@/components/sections/ReviewSection';
import MapSection from '@/components/sections/MapSection';
import PartnerSection from '@/components/sections/PartnerSection';
import MediaSection from '@/components/sections/MediaSection';
import ProposalModal from '@/components/modals/ProposalModal';
import QuizModal from '@/components/modals/QuizModal';
import InfoModals from '@/components/modals/InfoModals';
import CenterDetailModal from '@/components/modals/CenterDetailModal';
import AIPage from '@/components/pages/AIPage';
import EAPPage from '@/components/pages/EAPPage';
import SchoolPage from '@/components/pages/SchoolPage';
import PhysicalPage from '@/components/pages/PhysicalPage';
import MallPage from '@/components/pages/MallPage';
import { B2B_QUESTIONS, B2C_QUESTIONS, DEFAULT_CENTERS } from '@/lib/constants';
import dynamic_import from 'next/dynamic';




export default function Home() {
    const [isMounted, setIsMounted] = useState(false); // 🛡️ 하이드레이션 가드 추가
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

    // 👁️ 스크롤 감지 및 애니메이션 통합 시스템
    useEffect(() => {
        if (!isMounted) return;

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // 1. 시네마틱 Soft Reveal 애니메이션 실행
                    const revealElements = entry.target.querySelectorAll('.soft-reveal');
                    
                    const splitText = (node: Node, charIndex: { value: number }) => {
                        if (node.nodeType === 3) { // Text node
                            const text = node.textContent || '';
                            const fragment = document.createDocumentFragment();
                            [...text].forEach((char) => {
                                const span = document.createElement('span');
                                span.textContent = char === ' ' ? '\u00A0' : char;
                                span.className = 'char';
                                span.style.transitionDelay = `${charIndex.value * 30}ms`;
                                fragment.appendChild(span);
                                charIndex.value++;
                            });
                            node.parentNode?.replaceChild(fragment, node);
                        } else if (node.nodeType === 1) { // Element node
                            const children = Array.from(node.childNodes);
                            children.forEach(child => splitText(child, charIndex));
                        }
                    };

                    revealElements.forEach(el => {
                        if (!el.classList.contains('reveal-done')) {
                            const charIndex = { value: 0 };
                            splitText(el, charIndex);
                            el.classList.add('reveal-done');
                        }
                    });

                    // 2. 프리미엄 카운트업 (숫자) 애니메이션 실행
                    const countElements = entry.target.querySelectorAll('.count-up');
                    countElements.forEach(el => {
                        if (el.classList.contains('counting-done')) return;
                        el.classList.add('counting-done');

                        const target = parseInt(el.getAttribute('data-target') || '0');
                        const isFormat = el.getAttribute('data-format') === 'true';
                        const duration = 2000;
                        let startTime: number | null = null;

                        // EaseOutExpo: 처음엔 빠르고 끝엔 아주 부드럽게 감속
                        const easeOutExpo = (t: number): number => {
                            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
                        };

                        const animate = (timestamp: number) => {
                            if (!startTime) startTime = timestamp;
                            const progress = Math.min((timestamp - startTime) / duration, 1);
                            const easedProgress = easeOutExpo(progress);
                            const current = Math.floor(easedProgress * target);

                            el.textContent = isFormat ? current.toLocaleString() : current.toString();

                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            } else {
                                el.textContent = isFormat ? target.toLocaleString() : target.toString();
                            }
                        };
                        requestAnimationFrame(animate);
                    });

                    // 3. 파이차트 게이지 (SVG Circle) 애니메이션 실행
                    const circleGauges = entry.target.querySelectorAll('.count-up-circle');
                    circleGauges.forEach(circle => {
                        const target = 1; // 100% -> 1% (stroke-dashoffset)
                        let current = 100;
                        const duration = 2000;
                        const stepTime = 20;
                        const decrement = (100 - target) / (duration / stepTime);

                        const timer = setInterval(() => {
                            current -= decrement;
                            if (current <= target) {
                                (circle as HTMLElement).style.strokeDashoffset = target.toString();
                                clearInterval(timer);
                            } else {
                                (circle as HTMLElement).style.strokeDashoffset = current.toString();
                            }
                        }, stepTime);
                    });
                }
            });
        }, { threshold: 0.1 });

        // 모든 reveal 요소 관찰
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => revealObserver.observe(el));

        // 메인 히어로는 즉시 활성화
        const activePageContainer = document.getElementById(activePage);
        if (activePageContainer) {
            const hero = activePageContainer.querySelector('.hero-brand, .hero-premium');
            if (hero) {
                hero.classList.add('active');
                // 히어로 내부에 reveal 요소가 있다면 함께 처리
                hero.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
            }
        }

        return () => revealObserver.disconnect();
    }, [isMounted, activePage, activePhysicalSub, mediaReports, centerData, clientReviews]); // 의존성 강화



    useEffect(() => {
        setIsMounted(true);
    }, []);

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
    }, [isMounted, clientReviews]); // 💡 isMounted 추가

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
    }, [isMounted, activePage, activePhysicalSub]); // 💡 isMounted 추가

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
                // 🚨 모바일 스크롤 고정의 핵심 로직
                if (e.cancelable) e.preventDefault(); 
                const touch = e.touches[0];
                updatePosition(touch.clientX, touch.clientY);
            }
        };

        const handleEnter = () => container.classList.add('magnify-hover');
        const handleLeave = () => {
            container.classList.remove('magnify-hover');
            container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            if (glass) glass.style.display = 'none';
            document.body.style.overflow = ''; // 스크롤 잠금 해제
        };

        const handleTouchStart = (e: globalThis.TouchEvent) => {
            document.body.style.overflow = 'hidden'; // 돋보기 조작 시 화면 고정
            handleEnter();
            handleTouchMove(e);
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleEnter);
        container.addEventListener('mouseleave', handleLeave);
        
        // passive: false 설정으로 preventDefault 작동 보장
        container.addEventListener('touchstart', handleTouchStart as any, { passive: false });
        container.addEventListener('touchmove', handleTouchMove as any, { passive: false });
        container.addEventListener('touchend', handleLeave);
        container.addEventListener('touchcancel', handleLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseenter', handleEnter);
            container.removeEventListener('mouseleave', handleLeave);
            container.removeEventListener('touchstart', handleTouchStart as any);
            container.removeEventListener('touchmove', handleTouchMove as any);
            container.removeEventListener('touchend', handleLeave);
            container.removeEventListener('touchcancel', handleLeave);
            document.body.style.overflow = '';
        };
    }, [isMounted, activePage]); // 💡 isMounted 추가



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

    if (!isMounted) return null;

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
                <HeroSection openModal={openModal} />
                <TeaserSection />

                <MagnifySection />
                <JellyChartSection reviewsData={reviewsData} />

                <AgendaSection />
                <ComparisonSection />
                <GatewaySection switchPage={switchPage} setActivePage={setActivePage} setActivePhysicalSub={setActivePhysicalSub} />
                <ReviewSection reviewFilter={reviewFilter} setReviewFilter={setReviewFilter} reviewsData={reviewsData} />
                <MapSection />
                <PartnerSection />
                <MediaSection mediaReports={mediaReports} />
            </main>

            <AIPage 
                activePage={activePage} 
                switchPage={switchPage} 
                openPhysicalSub={openPhysicalSub} 
                openModal={openModal} 
            />
            <EAPPage 
                activePage={activePage} 
                switchPage={switchPage} 
                openModal={openModal} 
                toggleFaq={toggleFaq} 
            />
            <SchoolPage 
                activePage={activePage} 
                switchPage={switchPage} 
                openModal={openModal} 
            />
            <PhysicalPage 
                activePage={activePage}
                activePhysicalSub={activePhysicalSub}
                switchPage={switchPage}
                openPhysicalSub={openPhysicalSub}
                showPhysicalGateway={showPhysicalGateway}
                centerData={centerData}
                hoveredCenterId={hoveredCenterId}
                setHoveredCenterId={setHoveredCenterId}
                openCenterModal={openCenterModal}
                openModal={openModal}
                openKakaoChat={openKakaoChat}
            />
            <MallPage 
                activePage={activePage} 
                openModal={openModal} 
            />

            <InfoModals activeModal={activeModal} onClose={closeModal} />
            <ProposalModal 
                isOpen={activeModal === 'modal-proposal'} 
                onClose={closeModal} 
                onSubmit={submitProposalForm}
                phoneValue={phoneValue}
                onPhoneChange={handlePhoneChange}
                emailError={emailError}
                onEmailValidate={validateEmail}
                inquiryText={inquiryText}
                setInquiryText={setInquiryText}
                toggleSubModules={toggleSubModulesList}
            />
            <QuizModal 
                isOpen={activeModal === 'modal-quiz'}
                onClose={closeModal}
                step={quizStep}
                target={quizTarget}
                answers={quizAnswers}
                onNextStep={nextQuizStep}
                onAnswer={handleQuizAnswer}
                onSubmit={submitQuiz}
                onReset={resetQuiz}
                onOpenProposal={() => { closeModal(); openModal('modal-proposal'); }}
                resultTitle={quizResultTitle}
                resultDesc={quizResultDesc}
                b2bQuestions={B2B_QUESTIONS}
                b2cQuestions={B2C_QUESTIONS}
            />
            <CenterDetailModal 
                center={activeCenter} 
                onClose={closeCenterModal} 
            />

        </>
    );
}