'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useUI } from '@/context/UIContext';
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
import Footer from '@/components/layout/Footer';

export default function Home() {
    const [reviewFilter, setReviewFilter] = useState('all');
    
    const {
        openModal,
        reviewsData,
        mediaReports
    } = useUI();

    // 리뷰 필터 시 Swiper 인스턴스 강제 업데이트 (원래 로직 유지)
    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).reviewSwiperInstance) {
            (window as any).reviewSwiperInstance.update();
            (window as any).reviewSwiperInstance.slideTo(0);
        }
    }, [reviewFilter]);

    // 돋보기 X-ray 효과 (모바일 터치 지원 포함) - 60fps 최적화 (RAF ticking lock & 캐싱)
    useEffect(() => {
        const container = document.querySelector('.magnify-container') as HTMLElement;
        if (!container) return;

        const glass = container.querySelector('.magnify-glass') as HTMLElement;
        const human = container.querySelector('.magnify-human') as HTMLElement;
        const skeleton = container.querySelector('.magnify-skeleton') as HTMLElement;
        const shine = container.querySelector('.magnify-shine') as HTMLElement;

        let ticking = false;
        let lastX = 0;
        let lastY = 0;

        const updatePosition = () => {
            const rect = container.getBoundingClientRect();
            const x = lastX - rect.left;
            const y = lastY - rect.top;

            const tiltX = ((y / rect.height) - 0.5) * -12;
            const tiltY = ((x / rect.width) - 0.5) * 12;

            container.style.setProperty('--x', `${x}px`);
            container.style.setProperty('--y', `${y}px`);
            
            container.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            container.style.boxShadow = `${-tiltY * 3}px ${tiltX * 3}px 50px rgba(0,0,0,0.6), 0 0 20px rgba(0, 255, 255, 0.1)`;
            
            if (human) human.style.transform = `translate3d(${-tiltY * 0.5}px, ${tiltX * 0.5}px, 20px)`;
            if (skeleton) skeleton.style.transform = `translate3d(${tiltY * 0.3}px, ${-tiltX * 0.3}px, -30px) scale(1.05)`;

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

            ticking = false;
        };

        const scheduleUpdate = (clientX: number, clientY: number) => {
            lastX = clientX;
            lastY = clientY;
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updatePosition);
            }
        };

        const handleMouseMove = (e: globalThis.MouseEvent) => scheduleUpdate(e.clientX, e.clientY);
        const handleTouchMove = (e: globalThis.TouchEvent) => {
            if (e.touches.length > 0) {
                if (e.cancelable) e.preventDefault(); 
                const touch = e.touches[0];
                scheduleUpdate(touch.clientX, touch.clientY);
            }
        };

        const handleEnter = () => container.classList.add('magnify-hover');
        const handleLeave = () => {
            container.classList.remove('magnify-hover');
            container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            if (glass) glass.style.display = 'none';
            document.body.style.overflow = '';
        };

        const handleTouchStart = (e: globalThis.TouchEvent) => {
            document.body.style.overflow = 'hidden';
            handleEnter();
            handleTouchMove(e);
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleEnter);
        container.addEventListener('mouseleave', handleLeave);
        
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
    }, []);

    // Swiper 마운트
    useEffect(() => {
        const initSwipers = () => {
            if (typeof (window as any).Swiper !== 'undefined') {
                if ((window as any).reviewSwiperInstance) {
                    (window as any).reviewSwiperInstance.destroy(true, true);
                }

                (window as any).reviewSwiperInstance = new (window as any).Swiper(".reviewSwiper", {
                    slidesPerView: 1, 
                    spaceBetween: 20, 
                    observer: true, 
                    observeParents: true,
                    navigation: {
                        nextEl: ".review-swiper-button-next",
                        prevEl: ".review-swiper-button-prev"
                    },
                    breakpoints: { 
                        768: { slidesPerView: 2, spaceBetween: 20 }, 
                        1024: { slidesPerView: 3, spaceBetween: 30 } 
                    }
                });

                if (!(window as any).partnerSwiperInstance) {
                    (window as any).partnerSwiperInstance = new (window as any).Swiper(".partnerSwiper", {
                        slidesPerView: 2, spaceBetween: 15, loop: true, autoplay: { delay: 2000, disableOnInteraction: false },
                        breakpoints: { 640: { slidesPerView: 3, spaceBetween: 20 }, 1024: { slidesPerView: 5, spaceBetween: 30 } }
                    });
                }

                if ((window as any).mediaSwiperInstance) {
                    (window as any).mediaSwiperInstance.destroy(true, true);
                }

                (window as any).mediaSwiperInstance = new (window as any).Swiper(".mediaSwiper", {
                    slidesPerView: 1, 
                    spaceBetween: 30, 
                    observer: true, 
                    observeParents: true,
                    pagination: {
                        el: ".media-swiper-pagination",
                        clickable: true
                    },
                    navigation: {
                        nextEl: ".media-swiper-button-next",
                        prevEl: ".media-swiper-button-prev"
                    }
                });
            }
        };

        if (!(window as any).Swiper) {
            const timer = setTimeout(initSwipers, 200);
            return () => clearTimeout(timer);
        } else {
            initSwipers();
        }
    }, [reviewsData, reviewFilter, mediaReports]);

    return (
        <main id="page-home" className="page-content active">
            <HeroSection openModal={openModal} />
            <TeaserSection />
            <MagnifySection />
            <JellyChartSection reviewsData={reviewsData} />
            <AgendaSection />
            <ComparisonSection />
            <GatewaySection />
            <ReviewSection reviewFilter={reviewFilter} setReviewFilter={setReviewFilter} reviewsData={reviewsData} />
            <MapSection />
            <PartnerSection />
            <MediaSection mediaReports={mediaReports} />
            <Footer style={{ scrollSnapAlign: 'end' }} />
        </main>
    );
}