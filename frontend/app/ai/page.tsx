import React from 'react';
import type { Metadata } from 'next';
import AIPageClient from './AIPageClient';

export const metadata: Metadata = {
  title: 'AI 체형분석 솔루션 | FaWW(파우)',
  description: '정밀 3D 스캐닝과 스마트 AI 솔루션을 활용하여 임직원 근골격계 위험도 진단 및 학생 자세 불균형을 과학적으로 분석합니다. 맞춤형 데이터 리포트를 즉시 받아보세요.',
  keywords: ['AI 체형분석', '3D 신체스캔', '자세 분석', '근골격계 질환 예방', '자세 불균형', '체형 교정', 'FaWW'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://faww.co.kr/ai',
    siteName: 'FaWW(파우)',
    title: 'AI 체형분석 솔루션 | FaWW(파우)',
    description: '정밀 3D 스캐닝과 스마트 AI로 임직원 근골격계 위험도 및 학생 자세 불균형을 과학적으로 분석.',
    images: [{ url: 'https://faww.co.kr/images/%ED%8C%8C%EC%9A%B0%EB%AF%B8.png', width: 1200, height: 630, alt: 'FaWW AI 체형분석 솔루션' }],
  },
  alternates: {
    canonical: 'https://faww.co.kr/ai',
  },
};

export default function AIPageRoute() {
  return <AIPageClient />;
}
