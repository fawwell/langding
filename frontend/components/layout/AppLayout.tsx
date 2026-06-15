'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUI } from '@/context/UIContext';
import ProposalModal from '@/components/modals/ProposalModal';
import QuizModal from '@/components/modals/QuizModal';
import CenterDetailModal from '@/components/modals/CenterDetailModal';
import InfoModals from '@/components/modals/InfoModals';
import { B2B_QUESTIONS, B2C_QUESTIONS } from '@/lib/constants';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const {
        activeModal,
        closeModal,
        openModal,
        activeCenter,
        closeCenterModal,
        quizStep,
        quizTarget,
        quizResultTitle,
        quizResultDesc,
        quizAnswers,
        nextQuizStep,
        handleQuizAnswer,
        submitQuiz,
        resetQuiz,
        phoneValue,
        handlePhoneChange,
        emailError,
        validateEmail,
        submitProposalForm,
        inquiryText,
        setInquiryText
    } = useUI();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'instant' as any });
    }, [pathname]);



    // Intersection Observer for scroll animations (Re-run on route change)
    useEffect(() => {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Cinematic Soft Reveal Text animation
                    const revealElements = entry.target.querySelectorAll('.soft-reveal');
                    const splitText = (node: Node, charIndex: { value: number }) => {
                        if (node.nodeType === 3) {
                            const text = node.textContent || '';
                            const fragment = document.createDocumentFragment();
                            text.split('').forEach((char) => {
                                const span = document.createElement('span');
                                span.textContent = char === ' ' ? '\u00A0' : char;
                                span.className = 'char';
                                span.style.transitionDelay = `${charIndex.value * 30}ms`;
                                fragment.appendChild(span);
                                charIndex.value++;
                            });
                            node.parentNode?.replaceChild(fragment, node);
                        } else if (node.nodeType === 1) {
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

                    // Count-up animation
                    const countElements = entry.target.querySelectorAll('.count-up');
                    countElements.forEach(el => {
                        if (el.classList.contains('counting-done')) return;
                        el.classList.add('counting-done');

                        const target = parseInt(el.getAttribute('data-target') || '0');
                        const isFormat = el.getAttribute('data-format') === 'true';
                        const duration = 2000;
                        let startTime: number | null = null;

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

                    // Circular gauges
                    const circleGauges = entry.target.querySelectorAll('.count-up-circle');
                    circleGauges.forEach(circle => {
                        const target = 1;
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

        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => revealObserver.observe(el));

        // Trigger reveal for top section immediately
        const topSection = document.querySelector('main > section');
        if (topSection) {
            topSection.classList.add('active');
            topSection.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
        }

        return () => revealObserver.disconnect();
    }, [pathname]);

    const openKakaoChat = () => {
        const kakaoChannelId = "_HwxiXn"; 
        window.open(`https://pf.kakao.com/${kakaoChannelId}/chat`, '_blank');
    };

    const toggleSubModulesList = (e: React.MouseEvent<HTMLDivElement>) => {
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

    // JSON-LD structured data for GEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "주식회사 파우 (FaWW)",
        "url": "https://faww.co.kr",
        "logo": "https://faww.co.kr/logo.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+82-2-6482-9003",
            "contactType": "customer service",
            "email": "contact@faww.co.kr",
            "areaServed": "KR",
            "availableLanguage": "Korean"
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "도신로 143, 대원빌딩 301호",
            "addressLocality": "영등포구",
            "addressRegion": "서울특별시",
            "postalCode": "07386",
            "addressCountry": "KR"
        },
        "sameAs": [
            "https://blog.naver.com/fawwceo",
            "https://www.instagram.com/physicalcare_ydp/",
            "https://cafe.naver.com/physicalcare"
        ]
    };

    return (
        <>
            <Script
                id="swiper-script"
                src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
                strategy="afterInteractive"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            
            <header>
                <Link href="/" className="logo">FaWW</Link>
                <button className="hamburger-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>☰</button>
                <ul className={`nav-links ${isMobileMenuOpen ? 'show' : ''}`}>
                    <li>
                        <Link href="/" className={pathname === '/' ? 'active-nav' : ''}>
                            파우 소개
                        </Link>
                    </li>
                    <li className="nav-dropdown-item">
                        <Link href="/ai" className={pathname === '/ai' ? 'active-nav' : ''}>
                            스마트 AI 체형분석
                        </Link>
                        <ul className="sns-dropdown">
                            <li><Link href="/eap">기업용 DX</Link></li>
                            <li><Link href="/school">학교용 DX</Link></li>
                            <li><Link href="/physical?sub=center">개인용 DX</Link></li>
                        </ul>
                    </li>
                    <li className="nav-dropdown-item">
                        <Link href="/physical" className={pathname === '/physical' ? 'active-nav' : ''}>
                            피지컬케어
                        </Link>
                        <ul className="sns-dropdown">
                            <li><Link href="/eap">피지컬케어 (기업용DX)</Link></li>
                            <li><Link href="/physical?sub=academy">자격증</Link></li>
                            <li><Link href="/physical?sub=center">센터</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link href="/mall" className={pathname === '/mall' ? 'active-nav' : ''}>
                            피지컬케어 mall
                        </Link>
                    </li>
                    <li className="nav-sns">
                        <a href="#">SNS</a>
                        <ul className="sns-dropdown">
                            <li><a href="https://blog.naver.com/fawwceo" target="_blank" rel="noopener noreferrer">블로그 (Blog)</a></li>
                            <li><a href="https://www.instagram.com/physicalcare_ydp/" target="_blank" rel="noopener noreferrer">인스타그램 (Insta)</a></li>
                            <li><a href="https://cafe.naver.com/physicalcare" target="_blank" rel="noopener noreferrer">네이버 카페 (Cafe)</a></li>
                        </ul>
                    </li>
                    <li className="mobile-only-action" style={{ display: 'none', padding: '15px 0 0 0', width: '100%' }}>
                        <button className="consult-btn" style={{ width: '100%', margin: 0 }} onClick={() => openModal('modal-proposal')}>도입 및 제휴 문의</button>
                    </li>
                </ul>
                <div className={`nav-actions ${isMobileMenuOpen ? 'show' : ''}`}>
                    <button className="consult-btn" onClick={() => openModal('modal-proposal')}>도입 및 제휴 문의</button>
                </div>
            </header>

            <div className="fab-container">
                <div className="chatbot-badge" onClick={openKakaoChat}>💬 실시간 챗봇 문의</div>
            </div>

            {children}

            <InfoModals activeModal={activeModal || ''} onClose={closeModal} />
            
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
