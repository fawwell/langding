import React from 'react';
import type { Metadata } from 'next';
import EAPPageClient from './EAPPageClient';

export const metadata: Metadata = {
  title: '기업 임직원 EAP 피지컬케어 솔루션 | FaWW(파우)',
  description: '산업안전보건법 제39조 근골격계 유해요인조사 대응부터 임직원 1:1 방문 케어까지. 대기업·공공기관이 선택한 기업 맞춤형 EAP 피지컬케어 프로그램.',
  keywords: ['기업 복지 프로그램', 'EAP', '임직원 건강관리', '근골격계 부담작업', '산업안전보건법 제39조', '유해요인조사', '직장인 스트레칭', '사내 운동', '찾아가는 케어', 'FaWW'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://faww.co.kr/eap',
    siteName: 'FaWW(파우)',
    title: '기업 임직원 EAP 피지컬케어 솔루션 | FaWW(파우)',
    description: '산업안전보건법 제39조 근골격계 유해요인조사 대응부터 임직원 1:1 방문 케어까지. 대기업·공공기관이 선택한 기업 맞춤형 EAP 피지컬케어 프로그램.',
    images: [{ url: 'https://faww.co.kr/images/%ED%8C%8C%EC%9A%B0%EB%AF%B8.png', width: 1200, height: 630, alt: 'FaWW 기업 임직원 EAP 피지컬케어' }],
  },
  alternates: {
    canonical: 'https://faww.co.kr/eap',
  },
};

export default function EAPPageRoute() {
  return <EAPPageClient />;
}
