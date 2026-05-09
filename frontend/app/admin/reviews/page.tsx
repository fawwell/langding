'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Review {
  id?: number;
  type: string;
  stars: string;
  text: string;
  reviewer: string;
  created_at?: string;
}

export default function ReviewAdmin() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Review>({
    type: 'b2b',
    stars: '★★★★★',
    text: '',
    reviewer: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    if (!supabase || !supabase.from) {
      setMessage('오류: Supabase 설정(환경 변수)이 누락되었습니다. 레일웨이 설정을 확인해 주세요.');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('client_reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === 'PGRST116' || error.message.includes('relation "client_reviews" does not exist')) {
          setMessage('테이블이 존재하지 않습니다. SQL을 실행해 주세요.');
          return;
        }
        throw error;
      }

      if (data && data.length === 0) {
        // Optional: Auto-seed with initial data if empty
        // await seedInitialData();
      }

      setReviews(data || []);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase || !supabase.from) {
      alert('데이터베이스 연결 설정이 되어 있지 않습니다.');
      return;
    }
    try {
      if (editingId) {
        const { error } = await supabase
          .from('client_reviews')
          .update({
            type: formData.type,
            stars: formData.stars,
            text: formData.text,
            reviewer: formData.reviewer
          })
          .eq('id', editingId);
        if (error) throw error;
        setMessage('후기가 수정되었습니다.');
      } else {
        const { error } = await supabase
          .from('client_reviews')
          .insert([formData]);
        if (error) throw error;
        setMessage('새 후기가 등록되었습니다.');
      }
      
      setFormData({ type: 'b2b', stars: '★★★★★', text: '', reviewer: '' });
      setEditingId(null);
      fetchReviews();
    } catch (err) {
      console.error('Error saving review:', err);
      setMessage('저장 중 오류가 발생했습니다.');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const { error } = await supabase
        .from('client_reviews')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchReviews();
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  }

  function handleEdit(review: Review) {
    setEditingId(review.id || null);
    setFormData({
      type: review.type,
      stars: review.stars,
      text: review.text,
      reviewer: review.reviewer
    });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>로딩 중...</div>;

  return (
    <div style={{ padding: '60px 40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <Link href="/admin" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>← 관리자 홈으로</Link>
      <h1 style={{ marginTop: '20px', marginBottom: '40px', fontSize: '28px', fontWeight: '800' }}>⭐ 고객 만족도 후기 관리</h1>
      
      {/* 🛠️ 최종 진단 도구 (배포 후 삭제) */}
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '20px', padding: '15px', background: '#fff5f5', border: '1px solid #ffc9c9', borderRadius: '8px' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>🚀 시스템 진단 모드</div>
        • URL 감지: {process.env.NEXT_PUBLIC_SUPABASE_URL ? `YES (${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 10)}...)` : '❌ NO (완전 비어있음)'} <br />
        • KEY 감지: {process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ? 'YES (데이터 존재)' : '❌ NO (완전 비어있음)'} <br />
        • 현재 환경: {process.env.NODE_ENV}
      </div>

      {/* 입력 폼 */}
      <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', marginBottom: '50px' }}>
        <h3 style={{ marginBottom: '20px' }}>{editingId ? '후기 수정하기' : '새 후기 등록하기'}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>카테고리</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              >
                <option value="b2b">🏢 기업/HR 담당자</option>
                <option value="school">🏫 학교/보건교사</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>별점</label>
              <select 
                value={formData.stars}
                onChange={(e) => setFormData({...formData, stars: e.target.value})}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              >
                <option value="★★★★★">★★★★★ (5점)</option>
                <option value="★★★★☆">★★★★☆ (4점)</option>
                <option value="★★★☆☆">★★★☆☆ (3점)</option>
                <option value="★★☆☆☆">★★☆☆☆ (2점)</option>
                <option value="★☆☆☆☆">★☆☆☆☆ (1점)</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>작성자 (기관명/직함)</label>
            <input 
              type="text" 
              placeholder="예: S사 운영팀, OO고등학교 보건교사"
              value={formData.reviewer}
              onChange={(e) => setFormData({...formData, reviewer: e.target.value})}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>후기 내용</label>
            <textarea 
              rows={4}
              placeholder="고객의 후기 내용을 입력하세요."
              value={formData.text}
              onChange={(e) => setFormData({...formData, text: e.target.value})}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="submit"
              style={{ 
                flex: 2,
                padding: '16px', 
                background: '#2b8a3e', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '8px', 
                fontWeight: 'bold', 
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              {editingId ? '수정 완료' : '후기 등록하기'}
            </button>
            {editingId && (
              <button 
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ type: 'b2b', stars: '★★★★★', text: '', reviewer: '' });
                }}
                style={{ 
                  flex: 1,
                  padding: '16px', 
                  background: '#f1f3f5', 
                  color: '#495057', 
                  border: 'none', 
                  borderRadius: '8px', 
                  fontWeight: 'bold', 
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                취소
              </button>
            )}
          </div>
        </form>
        {message && <p style={{ marginTop: '20px', textAlign: 'center', color: '#2b8a3e', fontWeight: 'bold' }}>{message}</p>}
      </div>

      {/* 목록 */}
      <h3 style={{ marginBottom: '20px' }}>등록된 후기 목록 ({reviews.length})</h3>
      <div style={{ display: 'grid', gap: '15px' }}>
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev.id} style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '4px', background: rev.type === 'b2b' ? '#e8f5e9' : '#fff9db', color: rev.type === 'b2b' ? '#2b8a3e' : '#f08c00', fontWeight: 'bold' }}>
                    {rev.type === 'b2b' ? '기업' : '학교'}
                  </span>
                  <span style={{ color: '#fab005' }}>{rev.stars}</span>
                  <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{rev.reviewer}</span>
                </div>
                <p style={{ margin: 0, color: '#555', fontSize: '14px', lineHeight: '1.5' }}>{rev.text}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginLeft: '20px' }}>
                <button onClick={() => handleEdit(rev)} style={{ padding: '8px 12px', background: '#f1f3f5', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>수정</button>
                <button onClick={() => handleDelete(rev.id!)} style={{ padding: '8px 12px', background: '#fff5f5', color: '#e03131', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>삭제</button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', background: '#f8f9fa', borderRadius: '12px', color: '#999' }}>
            등록된 후기가 없습니다. 첫 후기를 등록해 보세요!
          </div>
        )}
      </div>
    </div>
  );
}
