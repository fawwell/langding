'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // 세션 체크
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const json = await res.json();
      
      if (json.success) {
        localStorage.setItem('admin_token', json.data.access_token);
        localStorage.setItem('admin_user', JSON.stringify(json.data.user));
        setIsAuthenticated(true);
      } else {
        setError('이메일 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      setError('서버 연결에 실패했습니다. 백엔드가 켜져 있는지 확인해 주세요.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setIsAuthenticated(false);
  };

  if (isLoading) return <div style={{ color: '#fff', background: '#0b0c10', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>인증 확인 중...</div>;

  // 🛡️ 비인증 시 로그인 화면
  if (!isAuthenticated) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#0b0c10', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: 'sans-serif'
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '400px', 
          padding: '40px', 
          background: 'rgba(255,255,255,0.03)', 
          borderRadius: '24px', 
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '20px' }}>🔐</div>
          <h2 style={{ color: '#fff', marginBottom: '10px', fontSize: '24px', fontWeight: '800' }}>Admin Login</h2>
          <p style={{ color: '#888', marginBottom: '30px', fontSize: '14px' }}>관리자 계정으로 로그인이 필요합니다.</p>
          
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ color: '#aaa', fontSize: '12px', display: 'block', marginBottom: '8px' }}>ID</label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin"
                style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #333', background: '#1a1a1a', color: '#fff', outline: 'none' }} 
                required
              />
            </div>
            <div style={{ marginBottom: '30px', textAlign: 'left' }}>
              <label style={{ color: '#aaa', fontSize: '12px', display: 'block', marginBottom: '8px' }}>PASSWORD</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #333', background: '#1a1a1a', color: '#fff', outline: 'none' }} 
                required
              />
            </div>
            {error && <p style={{ color: '#ff4d4f', fontSize: '13px', marginBottom: '20px' }}>{error}</p>}
            <button type="submit" style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: '#2b8a3e', color: '#fff', fontWeight: '800', cursor: 'pointer', fontSize: '16px' }}>로그인</button>
          </form>
          
          <div style={{ marginTop: '20px' }}>
            <Link href="/" style={{ color: '#666', fontSize: '13px', textDecoration: 'none' }}>메인 페이지로 이동</Link>
          </div>
        </div>
      </div>
    );
  }

  // 🏛️ 인증 성공 시 관리자 대시보드
  return (
    <div style={{ padding: '60px 40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#111' }}>FaWW 통합 관리자 센터</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: '13px', color: '#666' }}>로그아웃</button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
        <Link href="/admin/media" style={{ textDecoration: 'none' }}>
          <div style={{ 
            padding: '40px 20px', 
            background: '#fff', 
            border: '1px solid #eee', 
            borderRadius: '24px', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.03)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#2b8a3e'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#eee'; }}
          >
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>📰</div>
            <h3 style={{ margin: '0 0 10px 0', color: '#111' }}>미디어 보도 관리</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>기사 제목, 내용, 사진 등록 및 삭제</p>
          </div>
        </Link>

        <Link href="/admin/proposals" style={{ textDecoration: 'none' }}>
          <div style={{ 
            padding: '40px 20px', 
            background: '#fff', 
            border: '1px solid #eee', 
            borderRadius: '24px', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.03)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#2b8a3e'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#eee'; }}
          >
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>📩</div>
            <h3 style={{ margin: '0 0 10px 0', color: '#111' }}>문의 내역 확인</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>고객들의 맞춤형 제안서 요청 관리</p>
          </div>
        </Link>

        <Link href="/admin/reviews" style={{ textDecoration: 'none' }}>
          <div style={{ 
            padding: '40px 20px', 
            background: '#fff', 
            border: '1px solid #eee', 
            borderRadius: '24px', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.03)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#2b8a3e'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#eee'; }}
          >
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>⭐</div>
            <h3 style={{ margin: '0 0 10px 0', color: '#111' }}>고객 후기 관리</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>메인 화면 만족도 카드 내용 관리</p>
          </div>
        </Link>

        <Link href="/admin/centers" style={{ textDecoration: 'none' }}>
          <div style={{ 
            padding: '40px 20px', 
            background: '#fff', 
            border: '1px solid #eee', 
            borderRadius: '24px', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.03)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#2b8a3e'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#eee'; }}
          >
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>🏢</div>
            <h3 style={{ margin: '0 0 10px 0', color: '#111' }}>피지컬 센터 관리</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>각 지점별 정보, 철학, 전문가 목록 관리</p>
          </div>
        </Link>
      </div>

      <div style={{ marginTop: '50px' }}>
        <Link href="/" style={{ color: '#2b8a3e', fontWeight: 'bold', textDecoration: 'none' }}>
          ← 메인 페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}
