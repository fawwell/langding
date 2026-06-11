'use client';

import React, { createContext, useContext, useState, useEffect, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { DEFAULT_CENTERS } from '@/lib/constants';

interface UIContextType {
    activeModal: string | null;
    openModal: (id: string) => void;
    closeModal: () => void;
    activeCenter: any | null;
    openCenterModal: (centerId: string) => void;
    closeCenterModal: () => void;
    hoveredCenterId: string | null;
    setHoveredCenterId: (id: string | null) => void;
    activePhysicalSub: string | null;
    setActivePhysicalSub: (sub: string | null) => void;
    
    // Quiz State
    quizStep: number;
    setQuizStep: (step: number) => void;
    quizTarget: string;
    setQuizTarget: (target: string) => void;
    quizResultTitle: string;
    quizResultDesc: string;
    quizAnswers: number[];
    setQuizAnswers: React.Dispatch<React.SetStateAction<number[]>>;
    nextQuizStep: (step: number, target?: string) => void;
    handleQuizAnswer: (index: number, answer: number) => void;
    submitQuiz: () => void;
    resetQuiz: () => void;

    // Form State
    inquiryText: string;
    setInquiryText: (text: string) => void;
    phoneValue: string;
    handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    emailError: string;
    validateEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    submitProposalForm: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    
    // Global Fetched Data
    mediaReports: any[];
    centerData: any[];
    clientReviews: any[];
    reviewsData: any[];
    
    showToast: (message: string) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [activeCenter, setActiveCenter] = useState<any | null>(null);
    const [hoveredCenterId, setHoveredCenterId] = useState<string | null>(null);
    const [activePhysicalSub, setActivePhysicalSub] = useState<string | null>(null);

    // Quiz State
    const [quizStep, setQuizStep] = useState(1);
    const [quizTarget, setQuizTarget] = useState('');
    const [quizResultTitle, setQuizResultTitle] = useState('');
    const [quizResultDesc, setQuizResultDesc] = useState('');
    const [quizAnswers, setQuizAnswers] = useState<number[]>(Array(12).fill(-1));

    // Form State
    const [inquiryText, setInquiryText] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [emailError, setEmailError] = useState('');
    const [lastSubmitTime, setLastSubmitTime] = useState(0);

    // Global Fetched Data
    const [mediaReports, setMediaReports] = useState<any[]>([]);
    const [centerData, setCenterData] = useState<any[]>([]);
    const [clientReviews, setClientReviews] = useState<any[]>([]);
    const [reviewsData, setReviewsData] = useState<any[]>([]);

    const openModal = (modalId: string) => {
        if (modalId === 'modal-quiz') resetQuiz();
        setActiveModal(modalId);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setActiveModal(null);
        document.body.style.overflow = 'auto';
    };

    const openCenterModal = (centerId: string) => {
        const center = centerData.find(c => c.id === centerId);
        setActiveCenter(center);
    };

    const closeCenterModal = () => setActiveCenter(null);

    const showToast = (message: string) => {
        if (typeof window === 'undefined') return;
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

    // Form handlers
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

    const sanitize = (text: string) => {
        if (!text) return '';
        const noTag = text.replace(/<[^>]*>?/gm, ''); // HTML 태그 제거
        return noTag.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#039;')
                    .trim();
    };

    const submitProposalForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const now = Date.now();
        if (now - lastSubmitTime < 60000) {
            showToast(`⚠️ 너무 자주 요청하셨습니다. ${Math.ceil((60000 - (now - lastSubmitTime)) / 1000)}초 후 다시 시도해 주세요.`);
            return;
        }

        const form = e.currentTarget;
        
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

        parts.part1.selected = true;
        parts.part1.sub_modules = Array.from(allChecked).map(cb => (cb as HTMLInputElement).value);

        if (emailError) {
            showToast('⚠️ 올바른 이메일 주소를 입력해 주세요.');
            return;
        }

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
            setLastSubmitTime(Date.now());
            closeModal();
            form.reset();
            setPhoneValue('');
        } catch (err) {
            showToast('❌ 저장 중 오류가 발생했습니다.<br>네트워크 오류');
        }
    };

    // Quiz logic
    const nextQuizStep = (step: number, target?: string) => {
        if (target) setQuizTarget(target);
        setQuizStep(step);
    };

    const handleQuizAnswer = (index: number, answer: number) => {
        setQuizAnswers(prev => {
            const next = [...prev];
            next[index] = answer;
            return next;
        });
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

    // Load data on mount
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
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                if (!apiUrl || apiUrl === 'undefined') {
                    const processedDefault = DEFAULT_CENTERS.map((c: any) => ({
                        ...c,
                        experts: c.experts.map((exp: string) => exp.replace(/교육이사/g, '원장'))
                    }));
                    setCenterData(processedDefault);
                } else {
                    const res = await fetch(`${apiUrl}/api/v1/centers/`);
                    if (res.ok) {
                        const json = await res.json();
                        const rawList = json.data || (Array.isArray(json) ? json : []);
                        if (rawList.length > 0) {
                            const normalizedData = rawList.map((c: any) => ({
                                ...c,
                                id: c.id?.toString() || Math.random().toString(),
                                name: c.name || c.title || 'FaWW 센터',
                                tagline: c.tagline || '공식 인증 피지컬 케어 센터',
                                address: c.address || c.location || '주소 정보가 등록되지 않았습니다.',
                                philosophy: c.philosophy || c.description || '전문적인 맞춤형 피지컬케어 솔루션을 제공합니다.',
                                image_url: c.image_url || '',
                                map_url: c.map_url || '#',
                                reserve_url: c.reserve_url || '#',
                                experts: (Array.isArray(c.experts) ? c.experts : (typeof c.experts === 'string' ? c.experts.split(',').map((s:string)=>s.trim()) : [])).map((exp: string) => exp.replace(/교육이사/g, '원장')),
                                programs: Array.isArray(c.programs) ? c.programs : (typeof c.programs === 'string' ? c.programs.split(',').map((s:string)=>s.trim()) : [])
                            }));
                            setCenterData(normalizedData);
                        } else {
                            const processedDefault = DEFAULT_CENTERS.map((c: any) => ({
                                ...c,
                                experts: c.experts.map((exp: string) => exp.replace(/교육이사/g, '원장'))
                            }));
                            setCenterData(processedDefault);
                        }
                    } else {
                        const processedDefault = DEFAULT_CENTERS.map((c: any) => ({
                            ...c,
                            experts: c.experts.map((exp: string) => exp.replace(/교육이사/g, '원장'))
                        }));
                        setCenterData(processedDefault);
                    }
                }
            } catch (e) {
                console.error("❌ Centers fetch error (Server might be down):", e);
                const processedDefault = DEFAULT_CENTERS.map((c: any) => ({
                    ...c,
                    experts: c.experts.map((exp: string) => exp.replace(/교육이사/g, '원장'))
                }));
                setCenterData(processedDefault);
            }
        };

        const fetchReviews = async () => {
            try {
                const { data, error } = await supabase
                    .from('client_reviews')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (data && !error && data.length >= 3) {
                    setReviewsData(data);
                } else {
                    const baseData = data || [];
                    setReviewsData([
                        ...baseData,
                        { type: 'b2b', stars: '★★★★★', text: "임직원 근골격계 관리 프로그램 도입 후 사무실 복귀할 때 벌써 변화를 체감합니다. 발바닥, 종아리, 허벅지 움직임부터가 다르네요. AI 체형분석 결과도 개인별로 바로 받아볼 수 있어 만족스럽습니다.", reviewer: 'S사 운영팀' },
                        { type: 'b2b', stars: '★★★★★', text: "근골격계 유해요인조사 사후관리를 FaWW와 함께 진행한 후 산재 발생이 눈에 띄게 줄었어요. 법적 의무 이행과 실질적 케어를 동시에 해결한 최고의 기업복지 선택이었습니다.", reviewer: 'H사 안전환경팀' },
                        { type: 'school', stars: '★★★★☆', text: "모든 학생이 형평성 있게 검진을 이용할 수 있다는 점이 좋았어요. 체계적인 AI 체형분석 데이터 리포트 덕분에 학부모님들 만족도도 높습니다.", reviewer: 'OO고등학교 보건교사' }
                    ]);
                }
            } catch (err) {
                console.error('Reviews fetch error:', err);
            }
        };

        fetchData();
        fetchReviews();
    }, []);

    return (
        <UIContext.Provider value={{
            activeModal,
            openModal,
            closeModal,
            activeCenter,
            openCenterModal,
            closeCenterModal,
            hoveredCenterId,
            setHoveredCenterId,
            activePhysicalSub,
            setActivePhysicalSub,
            
            // Quiz State
            quizStep,
            setQuizStep,
            quizTarget,
            setQuizTarget,
            quizResultTitle,
            quizResultDesc,
            quizAnswers,
            setQuizAnswers,
            nextQuizStep,
            handleQuizAnswer,
            submitQuiz,
            resetQuiz,

            // Form State
            inquiryText,
            setInquiryText,
            phoneValue,
            handlePhoneChange,
            emailError,
            validateEmail,
            submitProposalForm,
            
            // Global Fetched Data
            mediaReports,
            centerData,
            clientReviews,
            reviewsData,
            
            showToast
        }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
