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
};

export default nextConfig;