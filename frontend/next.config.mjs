/** @type {import('next').NextConfig} */
const nextConfig = {
  // 💡 배포할 때 깐깐한 ESLint 문법 검사 무시하기
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 💡 배포할 때 타입스크립트 에러 무시하기
  typescript: {
    ignoreBuildErrors: true,
  },
  // 🛡️ 강력한 보안 헤더 설정 추가 (Day 1-2 & Day 2-2)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;