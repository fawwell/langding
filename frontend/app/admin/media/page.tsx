'use client';

import React, { useState, useEffect, FormEvent } from 'react';

interface MediaReport {
  id: string;
  title: string;
  url: string;
  thumbnail_url: string;
  created_at: string;
}

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', url: '', thumbnail_url: '' });

  const fetchMedia = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/media/');
      const json = await res.json();
      if (json.success) setMediaList(json.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/media/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert('업로드 되었습니다!');
        setFormData({ title: '', url: '', thumbnail_url: '' });
        fetchMedia();
      } else {
        alert('업로드 실패');
      }
    } catch (e) {
      alert('오류 발생');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`http://localhost:8000/api/v1/media/${id}`, { method: 'DELETE' });
      if (res.ok) fetchMedia();
      else alert('삭제 실패');
    } catch (e) {
      alert('오류 발생');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>FaWW 미디어 보도 관리자</h1>
      
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
        <h2>새 기사 업로드</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
            <label style={{ display: 'block', marginBottom: '5px' }}>기사 링크(URL)</label>
            <input 
              type="url" 
              required 
              style={{ width: '100%', padding: '8px' }} 
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>썸네일 이미지 주소(URL)</label>
            <input 
              type="url" 
              required 
              style={{ width: '100%', padding: '8px' }} 
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({...formData, thumbnail_url: e.target.value})}
              placeholder="예: https://example.com/image.jpg"
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '10px 20px', background: '#2b8a3e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? '업로드 중...' : '기사 등록하기'}
          </button>
        </form>
      </div>

      <div>
        <h2>등록된 기사 목록</h2>
        {mediaList.length === 0 ? <p>등록된 기사가 없습니다.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {mediaList.map(media => (
              <li key={media.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderBottom: '1px solid #ddd' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <img src={media.thumbnail_url} alt={media.title} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div>
                    <strong>{media.title}</strong>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}><a href={media.url} target="_blank" rel="noreferrer">{media.url}</a></div>
                  </div>
                </div>
                <button onClick={() => handleDelete(media.id)} style={{ padding: '5px 10px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>삭제</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
