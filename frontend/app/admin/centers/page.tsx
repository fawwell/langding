'use client';

import React, { useState, useEffect, FormEvent } from 'react';

interface Center {
  id: string;
  name: string;
  tagline: string;
  philosophy: string;
  image_url: string;
  experts: string[];
  map_url: string;
  reserve_url: string;
  created_at: string;
}

export default function AdminCentersPage() {
  const [centerList, setCenterList] = useState<Center[]>([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    tagline: '', 
    philosophy: '', 
    image_url: '',
    experts_str: '',
    map_url: '',
    reserve_url: ''
  });

  const fetchCenters = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/centers/`);
      const json = await res.json();
      if (json.success) setCenterList(json.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, []);

  const resetForm = () => {
    setFormData({ 
      name: '', 
      tagline: '', 
      philosophy: '', 
      image_url: '',
      experts_str: '',
      map_url: '',
      reserve_url: ''
    });
    setEditId(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const url = editId 
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/centers/${editId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/centers/`;
    
    const method = editId ? 'PUT' : 'POST';

    const experts = formData.experts_str.split(',').map(s => s.trim()).filter(s => s !== '');

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: formData.name,
            tagline: formData.tagline,
            philosophy: formData.philosophy,
            image_url: formData.image_url,
            experts: experts,
            map_url: formData.map_url,
            reserve_url: formData.reserve_url
        }),
      });
      if (res.ok) {
        alert(editId ? '수정되었습니다!' : '등록되었습니다!');
        resetForm();
        fetchCenters();
      } else {
        const errorData = await res.json();
        alert(`처리 실패: ${errorData.detail || '알 수 없는 오류'}`);
      }
    } catch (e: any) {
      alert(`오류 발생: ${e.message || '네트워크 연결을 확인해 주세요.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (center: Center) => {
    setFormData({
      name: center.name,
      tagline: center.tagline || '',
      philosophy: center.philosophy || '',
      image_url: center.image_url || '',
      experts_str: center.experts ? center.experts.join(', ') : '',
      map_url: center.map_url || '',
      reserve_url: center.reserve_url || ''
    });
    setEditId(center.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/centers/${id}`, { method: 'DELETE' });
      if (res.ok) fetchCenters();
      else alert('삭제 실패');
    } catch (e) {
      alert('오류 발생');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <a href="/admin" style={{ color: '#2b8a3e', textDecoration: 'none', fontWeight: 'bold' }}>← 관리자 홈으로 돌아가기</a>
      </div>
      <h1 style={{ fontWeight: 900, letterSpacing: '-1px' }}>🏢 FaWW 피지컬 센터 관리</h1>
      
      <div style={{ background: editId ? '#eef6f0' : '#f9f9f9', padding: '30px', borderRadius: '20px', marginBottom: '40px', border: editId ? '2px solid #2b8a3e' : '1px solid #eee' }}>
        <h2 style={{ marginTop: 0 }}>{editId ? '센터 정보 수정' : '새 지점 등록'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>지점명</label>
              <input 
                type="text" 
                required 
                placeholder="예: 영등포점 (본점)"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>태그라인</label>
              <input 
                type="text" 
                placeholder="예: THE ORIGINAL CLINIC"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} 
                value={formData.tagline}
                onChange={(e) => setFormData({...formData, tagline: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>센터 철학/소개</label>
            <textarea 
              rows={4}
              required
              placeholder="센터의 특징과 철학을 상세히 적어주세요."
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical' }} 
              value={formData.philosophy}
              onChange={(e) => setFormData({...formData, philosophy: e.target.value})}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>대표 이미지 URL</label>
              <input 
                type="text" 
                placeholder="/images/physical-care/001.jpg"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} 
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>전문가 목록 (쉼표 구분)</label>
              <input 
                type="text" 
                placeholder="김파우 원장, 이교정 팀장"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} 
                value={formData.experts_str}
                onChange={(e) => setFormData({...formData, experts_str: e.target.value})}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>네이버 지도 URL</label>
              <input 
                type="url" 
                placeholder="https://map.naver.com/..."
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} 
                value={formData.map_url}
                onChange={(e) => setFormData({...formData, map_url: e.target.value})}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>네이버 예약 URL</label>
              <input 
                type="url" 
                placeholder="https://booking.naver.com/..."
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} 
                value={formData.reserve_url}
                onChange={(e) => setFormData({...formData, reserve_url: e.target.value})}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <button type="submit" disabled={loading} style={{ flex: 1, padding: '15px', background: '#2b8a3e', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
              {loading ? '처리 중...' : (editId ? '지점 정보 수정 완료' : '신규 지점 등록하기')}
            </button>
            {editId && (
              <button type="button" onClick={resetForm} style={{ padding: '15px 30px', background: '#999', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                취소
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>현재 등록된 센터 목록 ({centerList.length})</h2>
        {centerList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#888', background: '#f5f5f5', borderRadius: '20px' }}>
             등록된 센터가 없습니다.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {centerList.map(center => (
              <div key={center.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '25px', borderRadius: '20px', border: '1px solid #eee', background: editId === center.id ? '#f0fff0' : '#fff', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{ width: '120px', height: '90px', background: '#eee', borderRadius: '12px', overflow: 'hidden' }}>
                    {center.image_url && (
                      <img src={center.image_url} alt={center.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: '#2b8a3e', fontWeight: '800', marginBottom: '5px' }}>{center.tagline}</div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>{center.name}</h3>
                    <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.4', maxWidth: '500px' }}>{center.philosophy}</div>
                    <div style={{ marginTop: '10px', display: 'flex', gap: '5px' }}>
                        {center.experts && center.experts.map((exp, i) => (
                            <span key={i} style={{ fontSize: '11px', background: '#f0f0f0', padding: '2px 8px', borderRadius: '4px' }}>{exp}</span>
                        ))}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleEdit(center)} style={{ padding: '8px 15px', background: '#1976d2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>수정</button>
                  <button onClick={() => handleDelete(center.id)} style={{ padding: '8px 15px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>삭제</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
