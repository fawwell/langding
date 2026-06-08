import React from 'react';
import type { Metadata } from 'next';
import PhysicalPageClient from './PhysicalPageClient';

export const metadata: Metadata = {
  title: '자격증 교육 및 지점 소개 - FaWW 피지컬케어',
  description: '스포츠 테이핑, 퍼스널 트레이닝, 체형 교정 등 FaWW 오리지널 피지컬케어 자격증 양성 교육 정보 및 전국 공식 지점(센터)의 1:1 맞춤형 피지컬케어 솔루션을 확인해보세요.',
  keywords: ['피지컬케어', '스포츠 자격증', '체형교정 교육', '테이핑 지도사', '필라테스 강사 교육', '피지컬케어 센터', 'FaWW 아카데미'],
};

export default function PhysicalPageRoute() {
  return <PhysicalPageClient />;
}
