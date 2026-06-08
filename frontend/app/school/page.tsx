import React from 'react';
import type { Metadata } from 'next';
import SchoolPageClient from './SchoolPageClient';

export const metadata: Metadata = {
  title: '학교용 DX 학생 체형분석 솔루션 - FaWW',
  description: '성장기 학생들의 올바른 성장을 지원하는 스마트 AI 단체 체형검진 프로그램. 정밀 분석 리포트, 데이터 사후 처방 및 학교 보건 예산 맞춤 솔루션을 무상 가이드와 함께 제안합니다.',
  keywords: ['학생 체형분석', '학교 체형검사', '척추측만증 검사', '거북목 교정', '보건 예산', '초중고 자세 진단', 'FaWW'],
};

export default function SchoolPageRoute() {
  return <SchoolPageClient />;
}
