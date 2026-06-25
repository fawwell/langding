'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MentalCounselingPage from './MentalCounselingPage';
import MentalPlannerPage from './MentalPlannerPage';

function MentalPageContent() {
  const searchParams = useSearchParams();
  const sub = searchParams.get('sub');

  if (sub === 'planner') {
    return <MentalPlannerPage />;
  }

  return <MentalCounselingPage />;
}

export default function MentalCoachingPage() {
  return (
    <Suspense fallback={<div className="loading-fallback" style={{ padding: '80px 0', textRendering: 'optimizeLegibility', textAlign: 'center', color: '#64748b' }}>로딩 중...</div>}>
      <MentalPageContent />
    </Suspense>
  );
}
