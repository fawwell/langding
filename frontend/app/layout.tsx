import type { Metadata } from 'next';
import './globals.css';
import './v2_style.css'; // 💡 핵심: 재진님의 디자인을 최상위 권력으로 격상시킵니다!

export const metadata: Metadata = {
  title: 'FaWW - 토탈 피지컬케어 솔루션 그룹',
  description: '조직의 가장 큰 고민, 피지컬케어에서 해답을 찾다',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}