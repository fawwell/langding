import React from 'react';
import type { Metadata } from 'next';
import MallPageClient from './MallPageClient';

export const metadata: Metadata = {
  title: '피지컬케어 쇼핑몰 | FaWW(파우)',
  description: '피지컬케어 전문가들이 엄선한 프리미엄 교구를 소개합니다. 블랙테라 온열 마사지, 피지컬케어 밴드, 피지컬볼 등 기업 복지 포인트 연동 및 대량 구매 문의 지원.',
  keywords: ['피지컬케어 몰', '블랙테라', '마사지기', '스트레칭 밴드', '폼롤러 마사지볼', '기업 복지 포인트', 'FaWW 몰'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://faww.co.kr/mall',
    siteName: 'FaWW(파우)',
    title: '피지컬케어 쇼핑몰 | FaWW(파우)',
    description: '피지컬케어 전문가들이 엄선한 프리미엄 교구를 소개합니다. 기업 복지 포인트 연동 및 대량 구매 문의 지원.',
    images: [{ url: 'https://faww.co.kr/images/%ED%8C%8C%EC%9A%B0%EB%AF%B8.png', width: 1200, height: 630, alt: 'FaWW 피지컬케어 쇼핑몰' }],
  },
  alternates: {
    canonical: 'https://faww.co.kr/mall',
  },
};

export default function MallPageRoute() {
  return <MallPageClient />;
}
