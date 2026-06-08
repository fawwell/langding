import React from 'react';
import type { Metadata } from 'next';
import EAPPageClient from './EAPPageClient';

export const metadata: Metadata = {
  title: '기업용 DX 피지컬케어 솔루션 (EAP) - FaWW',
  description: '산업안전보건법 제39조에 따른 보건조치 및 근골격계 유해요인조사 대응부터 임직원 1:1 방문 케어, 활력 증진 단체 운동까지 기업 맞춤형 EAP 피지컬케어를 제공합니다.',
  keywords: ['기업 복지', 'EAP', '근골격계 부담작업', '산업안전보건법 제39조', '유해요인조사', '직장인 스트레칭', '1:1 방문 케어', 'FaWW'],
};

export default function EAPPageRoute() {
  return <EAPPageClient />;
}
