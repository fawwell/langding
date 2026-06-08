import type { Metadata } from 'next';
import './globals.css';
import './v2_style.css'; // 💡 핵심: 재진님의 디자인을 최상위 권력으로 격상시킵니다!
import { UIProvider } from '@/context/UIContext';
import AppLayout from '@/components/layout/AppLayout';

export const metadata: Metadata = {
  title: 'FaWW(파우) | AI 체형분석 기반 임직원 근골격계 피지컬케어 EAP',
  description: '거북목, 허리 통증 솔루션! 대기업·스타트업이 선택한 찾아가는 사내 임직원 건강 복지 프로그램, 데이터 기반 피지컬케어 No.1 파우.',
  verification: {
    google: '1CKTUnV7zTqw0YWxzXDFNN0TBw_ZG6CVQo5xci6DOK8',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
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