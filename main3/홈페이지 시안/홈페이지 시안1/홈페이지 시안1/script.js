/* =========================================
   FaWW 통합 스크립트 (script.js) - 전체 코드
   ========================================= */

/* 모바일 햄버거 메뉴 동작 */
function toggleMobileMenu() {
    document.querySelector('.nav-links').classList.toggle('show');
    document.querySelector('.nav-actions').classList.toggle('show');
}

/* 페이지 라우팅 스크립트 */
function switchPage(pageId, element) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active-nav'));
    if(element) element.classList.add('active-nav');
    
    // 모바일 메뉴 클릭 시 자동으로 메뉴 닫기
    document.querySelector('.nav-links').classList.remove('show');
    document.querySelector('.nav-actions').classList.remove('show');

    if(pageId === 'page-physical') {
        showPhysicalGateway();
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/* 피지컬케어 서브페이지 핸들링 */
function openPhysicalSub(subId) {
    document.getElementById('physical-gateway').style.display = 'none';
    const subPages = document.querySelectorAll('.sub-page-content');
    subPages.forEach(page => page.classList.remove('active'));
    document.getElementById(subId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showPhysicalGateway() {
    const subPages = document.querySelectorAll('.sub-page-content');
    subPages.forEach(page => page.classList.remove('active'));
    document.getElementById('physical-gateway').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* 담당자 고민 아코디언 동작 */
function toggleFaq(element) {
    const content = element.querySelector('.faq-content');
    element.classList.toggle('active');
    if (content.style.display === 'block') {
        content.style.display = 'none';
    } else {
        content.style.display = 'block';
    }
}

/* 제안서 폼 세부 모듈 열기/닫기 로직 */
function toggleSubModulesList(headerEl) {
    const content = headerEl.nextElementSibling;
    const icon = headerEl.querySelector('.toggle-icon');
    if (content && icon) {
        if (content.style.display === 'flex') {
            content.style.display = 'none';
            icon.innerText = '▼';
        } else {
            content.style.display = 'flex';
            icon.innerText = '▲';
        }
    }
}

/* 모달 스크립트 */
function openModal(modalId) { 
    if(modalId === 'modal-quiz' && typeof resetQuiz === 'function') resetQuiz();
    document.getElementById(modalId).classList.add('active'); 
    document.body.style.overflow = 'hidden'; 
}

function closeModal(modalId) { 
    document.getElementById(modalId).classList.remove('active'); 
    document.body.style.overflow = 'auto'; 
}

window.onclick = function(event) { 
    if (event.target.classList.contains('modal')) { 
        event.target.classList.remove('active'); 
        document.body.style.overflow = 'auto'; 
    } 
}

/* ================= 🚀 모바일 전용 자동 슬라이더 엔진 ================= */
function initMobileSliders() {
    const gridSelectors = '.agenda-grid, .gateway-grid, .card-grid, .service-grid, .school-process-grid, .school-feature-grid, .product-grid, .expert-grid, .grid-vertical, .grid-2x2';
    const grids = document.querySelectorAll(gridSelectors);

    grids.forEach(grid => {
        if (grid.parentElement.classList.contains('mobile-slider-wrapper')) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'mobile-slider-wrapper';
        grid.parentNode.insertBefore(wrapper, grid);
        wrapper.appendChild(grid);

        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '&#10094;';
        prevBtn.className = 'mobile-nav-btn prev-btn';

        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '&#10095;';
        nextBtn.className = 'mobile-nav-btn next-btn';

        wrapper.appendChild(prevBtn);
        wrapper.appendChild(nextBtn);

        let autoPlayTimer;

        const slideNext = () => {
            if(window.innerWidth > 768) return; 
            const cardWidth = grid.children[0].offsetWidth + 15;
            if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 10) {
                grid.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                grid.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        };

        const slidePrev = () => {
            if(window.innerWidth > 768) return;
            const cardWidth = grid.children[0].offsetWidth + 15;
            if (grid.scrollLeft <= 0) {
                grid.scrollTo({ left: grid.scrollWidth, behavior: 'smooth' });
            } else {
                grid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            }
        };

        nextBtn.addEventListener('click', () => {
            slideNext();
            resetTimer();
        });

        prevBtn.addEventListener('click', () => {
            slidePrev();
            resetTimer();
        });

        const startTimer = () => {
            autoPlayTimer = setInterval(slideNext, 3500); 
        };

        const resetTimer = () => {
            clearInterval(autoPlayTimer);
            startTimer();
        };

        startTimer();

        grid.addEventListener('touchstart', () => clearInterval(autoPlayTimer), {passive: true});
        grid.addEventListener('touchend', () => resetTimer(), {passive: true});
    });
}

/* ================= 뷰포트 애니메이션 & 화면 초기화 구동 ================= */
document.addEventListener("DOMContentLoaded", function() {
    
    // 모바일 슬라이더 세팅
    initMobileSliders();

    // 스크롤 시 스르륵 나타나는 reveal 효과
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });
    
    // 원그래프 및 카운트업 숫자 애니메이션
    const countUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.count-up');
                counters.forEach(counter => {
                    const circle = document.querySelector('.count-up-circle');
                    if(circle) {
                        const pieScene = document.querySelector('.jelly-pie-scene');
                        if(pieScene) pieScene.classList.add('animate');
                    }

                    const target = +counter.getAttribute('data-target');
                    const isFormat = counter.getAttribute('data-format') === 'true';
                    const duration = 2000;
                    const increment = target / (duration / 16); 
                    
                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = isFormat ? Math.ceil(current).toLocaleString() : Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = isFormat ? target.toLocaleString() : target;
                        }
                    };
                    updateCounter();
                });
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 }); 
    
    document.querySelectorAll('.hero-stats, .school-stats, .jelly-chart-section').forEach(el => {
        countUpObserver.observe(el);
    });

    // Swiper 슬라이드 초기화 (만족도 리뷰 및 파트너사 로고)
    if(typeof Swiper !== 'undefined') {
        window.reviewSwiperInstance = new Swiper(".reviewSwiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            observer: true,
            observeParents: true,
            pagination: { el: ".swiper-pagination", clickable: true },
            breakpoints: {
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
            }
        });

        var partnerSwiper = new Swiper(".partnerSwiper", {
            slidesPerView: 2,
            spaceBetween: 15,
            loop: true,
            autoplay: { delay: 2000, disableOnInteraction: false },
            breakpoints: {
                640: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 5, spaceBetween: 30 },
            }
        });
    }
});

/* ================= 리뷰 필터링 로직 ================= */
function filterReviews(type, btnElement) {
    const buttons = document.querySelectorAll('.review-filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    const wrapper = document.getElementById('review-wrapper');
    if(!wrapper) return;
    const slides = Array.from(wrapper.children);

    slides.forEach(slide => {
        if (type === 'all' || slide.getAttribute('data-type') === type) {
            slide.style.display = ''; 
            slide.classList.add('swiper-slide');
        } else {
            slide.style.display = 'none'; 
            slide.classList.remove('swiper-slide');
        }
    });

    if(window.reviewSwiperInstance) {
        window.reviewSwiperInstance.update();
        window.reviewSwiperInstance.slideTo(0);
    }
}

/* ================= 퀴즈 모달 로직 ================= */
let quizTarget = '';
function nextQuizStep(step, target) {
    if(target) quizTarget = target;

    document.querySelectorAll('.quiz-step').forEach(el => el.style.display = 'none');
    
    if (step === 2) {
        const step2El = document.getElementById('quiz-step-2');
        if(step2El) step2El.style.display = 'block';
        const optionsDiv = document.getElementById('quiz-options-2');
        if(!optionsDiv) return;
        optionsDiv.innerHTML = ''; 
        
        if (quizTarget === 'b2b') {
            optionsDiv.innerHTML = `
                <button class="quiz-btn" onclick="showQuizResult('eap1')">🤕 임직원 거북목 등 통증/산재 예방</button>
                <button class="quiz-btn" onclick="showQuizResult('eap2')">🤯 직무 스트레스 및 번아웃 케어</button>
                <button class="quiz-btn" onclick="showQuizResult('eap3')">🧘‍♀️ 사내 웰니스(운동) 문화 조성</button>
            `;
        } else if (quizTarget === 'school') {
            optionsDiv.innerHTML = `
                <button class="quiz-btn" onclick="showQuizResult('sch1')">📊 전교생 스마트 체형 검진 (데이터화)</button>
                <button class="quiz-btn" onclick="showQuizResult('sch2')">🏃 성장기 체형 교정 그룹 운동</button>
            `;
        }
    }
}

function showQuizResult(type) {
    document.querySelectorAll('.quiz-step').forEach(el => el.style.display = 'none');
    const resultStep = document.getElementById('quiz-step-result');
    if(resultStep) resultStep.style.display = 'block';
    
    const titleEl = document.getElementById('quiz-result-title');
    const descEl = document.getElementById('quiz-result-desc');
    if(!titleEl || !descEl) return;

    if (type === 'eap1') {
        titleEl.innerText = "스마트 AI 스캐닝 + 1:1 수기 케어";
        descEl.innerText = "근골격계 질환의 원인을 정확히 찾고, 원조 전문가가 현장에서 직접 케어하여 즉각적인 업무 효율을 높입니다.";
    } else if (type === 'eap2') {
        titleEl.innerText = "1:1 프리미엄 릴렉싱 케어";
        descEl.innerText = "신체의 굳은 긴장을 이완시켜 교감신경을 안정화하고 정신적 번아웃을 예방하는 최적의 솔루션입니다.";
    } else if (type === 'eap3') {
        titleEl.innerText = "오피스 단체 스트레칭 + 특강";
        descEl.innerText = "사무실 의자를 활용한 실습과 거북목 교정 특강을 통해 다함께 참여하는 건강 문화를 만듭니다.";
    } else if (type === 'sch1') {
        titleEl.innerText = "학교 전용 3D AI 체형 검진 시스템";
        descEl.innerText = "모아레 및 척추 분석 기능을 통해 학생들의 성장 밸런스를 측정하고 학부모용 상세 리포트를 제공합니다.";
    } else if (type === 'sch2') {
        titleEl.innerText = "학생 기능성 그룹 트레이닝";
        descEl.innerText = "체형 분석을 기반으로 성장기 학생들에게 꼭 필요한 맞춤형 교정 운동과 스트레칭을 지도합니다.";
    }
}

function resetQuiz() {
    quizTarget = '';
    document.querySelectorAll('.quiz-step').forEach(el => el.style.display = 'none');
    const step1 = document.getElementById('quiz-step-1');
    if(step1) step1.style.display = 'block';
}
