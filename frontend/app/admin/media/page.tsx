'use client';

import React, { useState, useEffect, FormEvent } from 'react';

interface MediaReport {
  id: string;
  title: string;
  url: string;
  thumbnail_url: string;
  content: string;
  published_at: string;
  created_at: string;
}

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    title: '', 
    url: '', 
    thumbnail_url: '', 
    content: '',
    published_at: new Date().toISOString().split('T')[0]
  });

  const fetchMedia = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/media/`);
      const json = await res.json();
      if (json.success) setMediaList(json.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const resetForm = () => {
    setFormData({ 
      title: '', 
      url: '', 
      thumbnail_url: '', 
      content: '',
      published_at: new Date().toISOString().split('T')[0]
    });
    setEditId(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const url = editId 
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/media/${editId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/media/`;
    
    const method = editId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert(editId ? '수정되었습니다!' : '업로드 되었습니다!');
        resetForm();
        fetchMedia();
      } else {
        alert('처리 실패');
      }
    } catch (e) {
      alert('오류 발생');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (media: MediaReport) => {
    setFormData({
      title: media.title,
      url: media.url || '',
      thumbnail_url: media.thumbnail_url || '',
      content: media.content || '',
      published_at: media.published_at ? media.published_at.split('T')[0] : new Date().toISOString().split('T')[0]
    });
    setEditId(media.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/media/${id}`, { method: 'DELETE' });
      if (res.ok) fetchMedia();
      else alert('삭제 실패');
    } catch (e) {
      alert('오류 발생');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <a href="/admin" style={{ color: '#2b8a3e', textDecoration: 'none', fontWeight: 'bold' }}>← 관리자 홈으로 돌아가기</a>
      </div>
      <h1>FaWW 미디어 보도 관리자</h1>
      
      <div style={{ background: editId ? '#eef6f0' : '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '40px', border: editId ? '2px solid #2b8a3e' : '1px solid #ddd' }}>
        <h2>{editId ? '기사 수정하기' : '새 기사 업로드'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>기사 제목</label>
              <input 
                type="text" 
                required 
                style={{ width: '100%', padding: '8px' }} 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>기사 날짜</label>
              <input 
                type="date" 
                required 
                style={{ width: '100%', padding: '8px' }} 
                value={formData.published_at}
                onChange={(e) => setFormData({...formData, published_at: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>본문 내용 (선택)</label>
            <textarea 
              rows={5}
              style={{ width: '100%', padding: '8px', resize: 'vertical' }} 
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="직접 기사 내용을 작성하실 경우 여기에 적어주세요."
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>외부 기사 링크(URL, 선택)</label>
            <input 
              type="url" 
              style={{ width: '100%', padding: '8px' }} 
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>썸네일 이미지(사진) 주소(URL)</label>
            <input 
              type="url" 
              style={{ width: '100%', padding: '8px' }} 
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({...formData, thumbnail_url: e.target.value})}
              placeholder="예: https://example.com/image.jpg"
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" disabled={loading} style={{ flex: 1, padding: '12px 20px', background: '#2b8a3e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              {loading ? '처리 중...' : (editId ? '기사 수정 완료' : '기사 등록하기')}
            </button>
            {editId && (
              <button type="button" onClick={resetForm} style={{ padding: '12px 20px', background: '#999', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                취소
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2>등록된 기사 목록</h2>
        {mediaList.length === 0 ? <p>등록된 기사가 없습니다.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {mediaList.map(media => (
              <li key={media.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderBottom: '1px solid #ddd', background: editId === media.id ? '#f0fff0' : 'transparent' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  {media.thumbnail_url && (
                    <img src={media.thumbnail_url} alt={media.title} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                  )}
                  <div>
                    <div style={{ fontSize: '12px', color: '#2b8a3e', fontWeight: 'bold', marginBottom: '3px' }}>{media.published_at ? media.published_at.split('T')[0] : '날짜 없음'}</div>
                    <strong>{media.title}</strong>
                    {media.content && <p style={{ fontSize: '13px', color: '#555', margin: '5px 0' }}>{media.content.substring(0, 50)}{media.content.length > 50 ? '...' : ''}</p>}
                    {media.url && <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}><a href={media.url} target="_blank" rel="noreferrer">{media.url}</a></div>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleEdit(media)} style={{ padding: '5px 10px', background: '#1976d2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>수정</button>
                  <button onClick={() => handleDelete(media.id)} style={{ padding: '5px 10px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>삭제</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
