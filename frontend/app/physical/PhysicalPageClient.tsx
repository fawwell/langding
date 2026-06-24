'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUI } from '@/context/UIContext';
import PhysicalPage from '@/components/pages/PhysicalPage';

function PhysicalPageInner() {
  const searchParams = useSearchParams();
  const { setActivePhysicalSub } = useUI();
  
  useEffect(() => {
    const sub = searchParams.get('sub');
    if (sub === 'center') {
      setActivePhysicalSub('sub-center');
    } else if (sub === 'academy') {
      setActivePhysicalSub('sub-academy');
    } else {
      setActivePhysicalSub(null);
    }
  }, [searchParams, setActivePhysicalSub]);

  return <PhysicalPage />;
}

export default function PhysicalPageClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PhysicalPageInner />
    </Suspense>
  );
}
