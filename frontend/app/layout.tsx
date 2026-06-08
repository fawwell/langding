import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import './v2_style.css'; // 💡 핵심: 재진님의 디자인을 최상위 권력으로 격상시킵니다!
import { UIProvider } from '@/context/UIContext';
import AppLayout from '@/components/layout/AppLayout';

export const metadata: Metadata = {
  title: 'FaWW(파우) | AI 체형분석 기반 임직원 근골격계 피지컬케어 EAP',
  description: '거북목, 허리 통증 솔루션! 대기업·스타트업이 선택한 찾아가는 사내 임직원 건강 복지 프로그램, 데이터 기반 피지컬케어 No.1 파우.',
  keywords: ['임직원 건강관리', 'EAP', '근골격계 케어', '사내 피지컬케어', '기업 복지 프로그램', '찾아가는 운동', 'FaWW', '파우'],
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
    title: 'FaWW(파우) | AI 체형분석 기반 임직원 근골격계 피지컬케어 EAP',
    description: '거북목, 허리 통증 솔루션! 대기업·스타트업이 선택한 찾아가는 사내 임직원 건강 복지 프로그램, 데이터 기반 피지컬케어 No.1 파우.',
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
    title: 'FaWW(파우) | AI 체형분석 기반 임직원 근골격계 피지컬케어 EAP',
    description: '거북목, 허리 통증 솔루션! 대기업·스타트업이 선택한 찾아가는 사내 임직원 건강 복지 프로그램.',
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
  logo: 'https://faww.co.kr/images/logo.png',
  description: 'AI 체형분석 기반 임직원 근골격계 피지컬케어 EAP 전문 기업',
  contactPoint: {
    '@type': 'ContactPoint',
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
  description: '임직원 근골격계 케어, 사내 EAP 피지컬케어 전문 기업',
  priceRange: '$$',
  areaServed: '대한민국',
  serviceType: ['기업 복지 프로그램', 'EAP 임직원 건강관리', 'AI 체형분석', '찾아가는 피지컬케어'],
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