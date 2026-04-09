/* 페이지 라우팅 스크립트 */
function switchPage(pageId, element) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active-nav'));
    if(element) element.classList.add('active-nav');
    
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
        element.querySelector('.faq-icon').innerText = '+';
    } else {
        content.style.display = 'block';
        element.querySelector('.faq-icon').innerText = '+'; 
    }
}

/* 제안서 폼 아코디언 동작 */
function toggleProposalBlock(headerEl) {
    const content = headerEl.nextElementSibling;
    headerEl.classList.toggle('active');
    if (content.style.display === 'block') {
        content.style.display = 'none';
        headerEl.querySelector('.toggle-icon').innerText = '▼';
    } else {
        content.style.display = 'block';
        headerEl.querySelector('.toggle-icon').innerText = '▲';
    }
}

/* 모달 스크립트 */
function openModal(modalId) { 
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

/* 뷰포트 애니메이션 & 슬라이더 구동 */
document.addEventListener("DOMContentLoaded", function() {
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
    
    /* 💡 숫자 카운트업 로직 */
    const countUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.count-up');
                counters.forEach(counter => {
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
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.hero-stats, .school-stats').forEach(el => {
        countUpObserver.observe(el);
    });

    var reviewSwiper = new Swiper(".reviewSwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
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
});