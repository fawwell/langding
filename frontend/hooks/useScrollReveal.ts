'use client';

import { useEffect } from 'react';

export const useScrollReveal = (isMounted: boolean, activePage: string, activePhysicalSub?: string | null) => {
    useEffect(() => {
        if (!isMounted) return;

        // 1. [만족도 차트 전용] 360도 회전 + 채우기
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    const countEl = entry.target.querySelector('.count-up') as HTMLElement;
                    const svgs = entry.target.querySelectorAll('.jelly-layer svg');
                    const circles = entry.target.querySelectorAll('.j-fg');
                    
                    if (countEl) {
                        countEl.innerText = "0";
                        svgs.forEach(svg => (svg as HTMLElement).style.transform = `rotate(-90deg)`);
                        circles.forEach(circle => (circle as HTMLElement).style.strokeDashoffset = "100");

                        const target = 99;
                        const duration = 2800; 
                        const startTime = performance.now();
                        const animate = (currentTime: number) => {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            const ease = progress < 0.5 
                                ? 2 * progress * progress 
                                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                            countEl.innerText = Math.floor(ease * target).toString();
                            const rotation = (ease * 360) - 90;
                            svgs.forEach(svg => { (svg as HTMLElement).style.transform = `rotate(${rotation}deg)`; });
                            const offset = 100 - (ease * 99);
                            circles.forEach(circle => { (circle as HTMLElement).style.strokeDashoffset = offset.toString(); });

                            if (progress < 1) requestAnimationFrame(animate);
                        };
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
                        if (counter.parentElement?.classList.contains('jelly-text-float')) return;
                        if (counter.classList.contains('counted')) return;
                        
                        const target = +(counter.getAttribute('data-target') || 0);
                        const isFormat = counter.getAttribute('data-format') === 'true';
                        let current = 0;
                        const duration = 1200;
                        const startTime = performance.now();

                        const update = (currentTime: number) => {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                            current = target * easeProgress;
                            counter.textContent = Math.ceil(current).toLocaleString(isFormat ? 'en-US' : undefined);
                            if (progress < 1) requestAnimationFrame(update);
                            else {
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

        // 4. 타이핑 애니메이션 (HTML 태그 보존형)
        const initTyping = () => {
            const targets = document.querySelectorAll('.section-kicker, .section-title, .section-desc, .hero-brand h1, .hero-brand p, .teaser-text');
            targets.forEach(el => {
                if (el.querySelector('.char') || el.classList.contains('typing-ready')) return;
                let charIndex = 0;
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
                        if ((node as Element).tagName !== 'BR') {
                            Array.from(node.childNodes).forEach(child => processNode(child));
                        }
                    }
                };
                processNode(el);
                el.classList.add('typing-ready');
            });
        };

        // 초기화 실행
        initTyping();

        const satisfactionChart = document.getElementById('satisfaction-chart');
        if (satisfactionChart) {
            const countEl = satisfactionChart.querySelector('.count-up') as HTMLElement;
            if (countEl) countEl.innerText = "0";
            chartObserver.observe(satisfactionChart);
        }

        const timer = setTimeout(() => {
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
            document.querySelectorAll('.hero-stats, .school-stats').forEach(el => countObserver.observe(el));
        }, 300);

        return () => {
            clearTimeout(timer);
            chartObserver.disconnect();
            revealObserver.disconnect();
            countObserver.disconnect();
        };
    }, [isMounted, activePage, activePhysicalSub]);
};
