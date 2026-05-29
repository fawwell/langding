'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 🛡️ 상세 에러는 서버 로그나 콘솔에만 남기고 사용자에게는 노출하지 않음
    console.error('System Error Captured:', error);
  }, [error]);

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>⚠️</h1>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        서버와 연결 중 잠시 문제가 발생했습니다.
      </h2>
      <div style={{ 
        background: '#fff0f0', 
        padding: '15px', 
        borderRadius: '8px', 
        color: '#d32f2f', 
        fontSize: '14px', 
        marginBottom: '20px',
        textAlign: 'left',
        maxWidth: '600px',
        overflow: 'auto'
      }}>
        <strong>[ERROR INFO]</strong><br />
        {error.message} <br />
        {error.stack?.substring(0, 300)}...
      </div>
      <div style={{ display: 'flex', gap: '15px' }}>
        <button
          onClick={() => reset()}
          style={{
            padding: '12px 25px',
            background: '#2b8a3e',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          다시 시도하기
        </button>
        <Link 
          href="/"
          style={{
            padding: '12px 25px',
            background: '#eee',
            color: '#333',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
