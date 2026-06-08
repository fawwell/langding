import React from 'react';
import type { Metadata } from 'next';
import SchoolPageClient from './SchoolPageClient';

export const metadata: Metadata = {
  title: '학교용 AI 학생 체형분석 솔루션 | FaWW(파우)',
  description: '성장기 학생들의 올바른 자세를 지원하는 스마트 AI 단체 체형검진 프로그램. 체측만증, 거북목, 핑븱 검사와 데이터 기반 맞춤형 수먼/운동 보건 수업 제안.',
  keywords: ['학생 체형분석', '학교 체형검사', '철추측만증 검사', '거북목 교정', '보건 예산', '초중고 자세 진단', 'FaWW'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://faww.co.kr/school',
    siteName: 'FaWW(파우)',
    title: '학교용 AI 학생 체형분석 솔루션 | FaWW(파우)',
    description: '성장기 학생들의 올바른 자세를 지원하는 스마트 AI 단체 체형검진 프로그램.',
    images: [{ url: 'https://faww.co.kr/images/og-image.png', width: 1200, height: 630, alt: 'FaWW 학교용 학생 체형분석' }],
  },
  alternates: {
    canonical: 'https://faww.co.kr/school',
  },
};

export default function SchoolPageRoute() {
  return <SchoolPageClient />;
}
