'use client';

import React from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div style={{ padding: '60px 40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '40px', fontSize: '32px', fontWeight: '800', color: '#111' }}>FaWW 통합 관리자 센터</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
        <Link href="/admin/media" style={{ textDecoration: 'none' }}>
          <div style={{ 
            padding: '40px 20px', 
            background: '#fff', 
            border: '1px solid #eee', 
            borderRadius: '16px', 
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
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
            borderRadius: '16px', 
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
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
            borderRadius: '16px', 
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
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
            borderRadius: '16px', 
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
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
