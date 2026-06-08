import React from 'react';
import type { Metadata } from 'next';
import MallPageClient from './MallPageClient';

export const metadata: Metadata = {
  title: '피지컬케어 mall - FaWW',
  description: '피지컬케어 전문가들이 직접 엄증하고 엄선한 프리미엄 교구를 소개합니다. 온열 마사지 블랙테라, 피지컬 밴드, 피지컬볼 등 기업 복지 포인트 연동 및 대량 구매 문의를 지원합니다.',
  keywords: ['피지컬케어 몰', '블랙테라', '마사지기', '스트레칭 밴드', '폼롤러 마사지볼', '기업 복지 포인트', 'FaWW 몰'],
};

export default function MallPageRoute() {
  return <MallPageClient />;
}
