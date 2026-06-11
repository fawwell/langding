import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import './v2_style.css'; // 💡 핵심: 재진님의 디자인을 최상위 권력으로 격상시킵니다!
import { UIProvider } from '@/context/UIContext';
import AppLayout from '@/components/layout/AppLayout';

export const metadata: Metadata = {
  metadataBase: new URL('https://faww.co.kr'),
  title: 'FaWW(파우) | 임직원 근골격계 관리 & AI 체형분석 기업복지 EAP',
  description: '근골격계 유해요인조사 사후관리 및 임직원 근골격계 관리 전문. 대기업·스타트업이 선택한 AI 체형분석 기업복지 EAP No.1 파우.',
  keywords: ['임직원 근골격계 관리', '근골격계 유해요인조사 사후관리', 'AI 체형분석 기업복지', '임직원 건강관리', 'EAP', '근골격계 케어', '사내 피지컬케어', '기업 복지 프로그램', 'FaWW', '파우'],
  verification: {
    google: '1CKTUnV7zTqw0YWxzXDFNN0TBw_ZG6CVQo5xci6DOK8',
    other: {
      'naver-site-verification': '6f25d8b13385d8c7e9828b6302a4caf9378ac6b9',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://faww.co.kr',
    siteName: 'FaWW(파우)',
    title: 'FaWW(파우) | 임직원 근골격계 관리 & AI 체형분석 기업복지 EAP',
    description: '근골격계 유해요인조사 사후관리 및 임직원 근골격계 관리 전문. 대기업·스타트업이 선택한 AI 체형분석 기업복지 EAP No.1 파우.',
    images: [
      {
        url: 'https://faww.co.kr/images/%ED%8C%8C%EC%9A%B0%EB%AF%B8.png',
        width: 1200,
        height: 630,
        alt: 'FaWW 파우 - AI 체형분석 기반 임직원 피지컬케어',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FaWW(파우) | 임직원 근골격계 관리 & AI 체형분석 기업복지 EAP',
    description: '근골격계 유해요인조사 사후관리 및 임직원 근골격계 관리 전문. 대기업·스타트업이 선택한 AI 체형분석 기업복지 EAP No.1 파우.',
    images: ['https://faww.co.kr/images/%ED%8C%8C%EC%9A%B0%EB%AF%B8.png'],
  },
  alternates: {
    canonical: 'https://faww.co.kr',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FaWW (파우)',
  url: 'https://faww.co.kr',
  logo: 'https://faww.co.kr/images/%ED%8C%8C%EC%9A%B0%EB%AF%B8.png',
  description: '임직원 근골격계 관리, 근골격계 유해요인조사 사후관리, AI 체형분석 기업복지 전문 기업',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+82-2-6482-9003',
    contactType: 'customer service',
    availableLanguage: 'Korean',
  },
  sameAs: [
    'https://www.instagram.com/physicalcare_ydp',
  ],
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'FaWW 파우',
  url: 'https://faww.co.kr',
  logo: 'https://faww.co.kr/images/%ED%8C%8C%EC%9A%B0%EB%AF%B8.png',
  image: 'https://faww.co.kr/images/%ED%8C%8C%EC%9A%B0%EB%AF%B8.png',
  description: '임직원 근골격계 관리, 근골격계 유해요인조사 사후관리, AI 체형분석 기업복지 전문 기업',
  telephone: '02-6482-9003',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '도신로 143, 대원빌딩 301호',
    addressLocality: '영등포구',
    addressRegion: '서울특별시',
    addressCountry: 'KR',
  },
  priceRange: '$$',
  areaServed: '대한민국',
  serviceType: ['임직원 근골격계 관리', '근골격계 유해요인조사 사후관리', 'AI 체형분석 기업복지', 'EAP 임직원 건강관리', '찾아가는 피지컬케어'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="local-business-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body>
        <UIProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </UIProvider>
      </body>
    </html>
  );
}