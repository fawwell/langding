import React from 'react';
import type { Metadata } from 'next';
import SchoolPageClient from './SchoolPageClient';

export const metadata: Metadata = {
  title: '학교용 AI 학생 체형분석 솔루션 | FaWW(파우)',
  description: '성장기 학생들의 올바른 자세를 지원하는 스마트 AI 단체 체형검진 프로그램. 척추측만증, 거북목, 평발 검사와 데이터 기반 맞춤형 운동/자세 보건 수업 제안.',
  keywords: ['학생 체형분석', '학교 체형검사', '척추측만증 검사', '거북목 교정', '보건 예산', '초중고 자세 진단', 'FaWW'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://faww.co.kr/school',
    siteName: 'FaWW(파우)',
    title: '학교용 AI 학생 체형분석 솔루션 | FaWW(파우)',
    description: '성장기 학생들의 올바른 자세를 지원하는 스마트 AI 단체 체형검진 프로그램.',
    images: [{ url: 'https://faww.co.kr/images/%ED%8C%8C%EC%9A%B0%EB%AF%B8.png', width: 1200, height: 630, alt: 'FaWW 학교용 학생 체형분석' }],
  },
  alternates: {
    canonical: 'https://faww.co.kr/school',
  },
};

const schoolServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'FaWW 학교용 AI 학생 체형분석 솔루션',
  provider: {
    '@type': 'Organization',
    name: 'FaWW (파우)',
    url: 'https://faww.co.kr',
  },
  serviceType: '초중고 단체 학생 체형검진 및 자세 진단 교육 서비스',
  areaServed: 'KR',
  description: '성장기 학생들의 올바른 자세를 지원하는 스마트 AI 단체 체형검진 프로그램. 척추측만증, 거북목, 평발 검사와 데이터 기반 맞춤형 운동/자세 보건 수업 제안.',
};

export default function SchoolPageRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolServiceJsonLd) }}
      />
      <SchoolPageClient />
    </>
  );
}
