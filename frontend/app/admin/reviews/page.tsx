'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import * as XLSX from 'xlsx';

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

  function maskReviewerName(name: string): string {
    if (!name) return '익명';
    const trimmed = name.trim();
    
    // 한국어 이름 정규표현식 (2~4자 한글)
    const koreanNameRegex = /^[가-힣]{2,4}$/;
    if (koreanNameRegex.test(trimmed)) {
      const doubleLastNames = ['남궁', '황보', '독고', '제갈', '사공', '선우'];
      const firstTwo = trimmed.substring(0, 2);
      if (doubleLastNames.includes(firstTwo) && trimmed.length > 2) {
        return firstTwo + 'O'.repeat(trimmed.length - 2);
      }
      return trimmed.charAt(0) + 'O'.repeat(trimmed.length - 1);
    }
    
    // 공백이 포함된 경우 (예: "김철수 과장", "이영희 (개발팀)") 첫 단어가 이름이면 마스킹
    const words = trimmed.split(/\s+/);
    if (words.length > 0) {
      const firstWord = words[0];
      if (koreanNameRegex.test(firstWord)) {
        const doubleLastNames = ['남궁', '황보', '독고', '제갈', '사공', '선우'];
        const firstTwo = firstWord.substring(0, 2);
        let maskedFirstWord = '';
        if (doubleLastNames.includes(firstTwo) && firstWord.length > 2) {
          maskedFirstWord = firstTwo + 'O'.repeat(firstWord.length - 2);
        } else {
          maskedFirstWord = firstWord.charAt(0) + 'O'.repeat(firstWord.length - 1);
        }
        words[0] = maskedFirstWord;
        return words.join(' ');
      }
    }

    return trimmed;
  }

  async function handleExcelUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const reader = new FileReader();
    
    setLoading(true);
    setMessage('엑셀 파일을 파싱하는 중...');
    
    reader.onload = async (event) => {
      try {
        const bstr = event.target?.result;
        if (!bstr) throw new Error('파일 읽기 실패');
        
        const workbook = XLSX.read(bstr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet) as any[];
        
        if (json.length === 0) {
          alert('엑셀 파일에 데이터가 없습니다.');
          setLoading(false);
          setMessage('');
          return;
        }

        const detectedColumns = Object.keys(json[0] || {});

        const parsedReviews: Review[] = json.map(row => {
          const findValue = (keys: string[]) => {
            // 1단계: 대소문자 제거 후 정확한 이름 매칭 검색
            let foundKey = Object.keys(row).find(k => 
              keys.some(key => k.toLowerCase().trim() === key.toLowerCase() || k.trim() === key)
            );
            
            // 2단계: 부분 일치 감지 (예: '직장(지역명+직장명)' 컬럼에서 '직장' 키워드 추출)
            if (!foundKey) {
              foundKey = Object.keys(row).find(k => 
                keys.some(key => k.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(k.toLowerCase()))
              );
            }
            
            return foundKey ? String(row[foundKey]).trim() : '';
          };

          // 1. 성함 추출 및 마스킹 (예: 김철수 -> 김OO)
          let nameVal = findValue(['성함', '이름', 'reviewer', '작성자', '고객', 'name']);
          nameVal = maskReviewerName(nameVal);

          // 2. 직장 추출 (단독 직장명 또는 직장 컬럼 매핑, 지역명 제외)
          const workplaceNameVal = findValue(['직장명', '회사명', '기관명', 'workplace_name', 'company_name']);
          
          let workplaceVal = '';
          if (workplaceNameVal) {
            workplaceVal = workplaceNameVal;
          } else {
            // '직장(지역명+직장명)' 및 기타 동의어 키워드로 직접 스캔
            workplaceVal = findValue(['직장(지역명+직장명)', '직장', '회사', '소속', '기관', 'workplace', 'company']);
          }

          // 3. 작성자 최종 포맷 조합: "성함 (직장)" 또는 "성함"만 있을 경우 "성함"
          const reviewerVal = workplaceVal ? `${nameVal} (${workplaceVal})` : nameVal;

          // 4. 구분(b2b, school) 자동 분류: 직장명에 학교 관련 단어가 있으면 school, 없으면 b2b
          let typeVal = 'b2b';
          if (workplaceVal) {
            const schoolKeywords = ['학교', '초등', '중학', '고등', '대학', '교육', '교사', '유치원', '보건'];
            const isSchool = schoolKeywords.some(keyword => workplaceVal.includes(keyword));
            if (isSchool) typeVal = 'school';
          }

          // 5. 만족도: 무조건 별 다섯개 (★★★★★)
          const starsVal = '★★★★★';

          // 6. 후기 내용 추출 (사용자의 긴 설문 문항 컬럼명 100% 대응 매핑)
          const textVal = findValue([
            '기프로그램 내용 및 과정 중 가장 인상 깊거나 유익했던 점은 무엇입니까?',
            'text', '내용', '후기', '리뷰', '의견', '피드백', '코멘트', 'content', 'review', 'feedback', 'comment', 'description'
          ]);

          return {
            type: typeVal,
            stars: starsVal,
            text: textVal,
            reviewer: reviewerVal
          };
        }).filter(rev => rev.text && rev.text.length >= 46); // 📍 46자 이상인 정성스러운 후기만 선별 수집

        if (parsedReviews.length === 0) {
          alert(`유효한 후기 데이터(내용 기재 및 46자 이상 필수)를 찾을 수 없습니다.\n\n[진단 정보]\n업로드하신 파일의 열(컬럼) 이름: [ ${detectedColumns.join(', ')} ]\n\n내용이 들어있는 열 이름을 '내용', '후기' 등으로 설정하고 내용이 46자 이상인지 확인해 주세요.`);
          setLoading(false);
          setMessage('');
          return;
        }

        if (!supabase || !supabase.from) {
          throw new Error('Supabase 클라이언트가 초기화되지 않았습니다.');
        }

        // Supabase bulk insert 실행
        const { error } = await supabase
          .from('client_reviews')
          .insert(parsedReviews);

        if (error) throw error;

        setMessage(`✅ 엑셀 일괄 등록 성공: 총 ${parsedReviews.length}개의 후기(46자 이상)가 자동 등록되었습니다.`);
        fetchReviews();
      } catch (err: any) {
        console.error('Error importing excel:', err);
        alert(`일괄 등록 중 오류 발생: ${err.message || '데이터 구조가 올바른지 확인해 주세요.'}`);
        setMessage('일괄 등록에 실패했습니다.');
      } finally {
        setLoading(false);
        e.target.value = '';
      }
    };

    reader.onerror = () => {
      alert('파일을 읽어들이는 중 오류가 발생했습니다.');
      setLoading(false);
      setMessage('');
    };

    reader.readAsBinaryString(file);
  }

  async function handleBulkDelete() {
    if (!confirm('정말 모든 후기를 일괄 삭제하시겠습니까?\n이 작업은 되돌릴 수 없으며 데이터베이스의 모든 후기가 영구 삭제됩니다.')) return;
    try {
      setLoading(true);
      if (!supabase || !supabase.from) {
        alert('데이터베이스 연결 설정이 되어 있지 않습니다.');
        return;
      }
      
      const { error } = await supabase
        .from('client_reviews')
        .delete()
        .gt('id', 0); // Serial 기본 키가 1 이상이므로 전체 삭제 실행

      if (error) throw error;
      
      alert('모든 후기가 성공적으로 일괄 삭제되었습니다.');
      fetchReviews();
    } catch (err: any) {
      console.error('Error during bulk delete:', err);
      alert(`일괄 삭제 실패: ${err.message || '오류가 발생했습니다.'}`);
    } finally {
      setLoading(false);
    }
  }

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

      {/* 엑셀 일괄 등록 패널 */}
      <div style={{ 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #eef1f6 100%)', 
        padding: '25px', 
        borderRadius: '16px', 
        border: '1px dashed #2b8a3e', 
        marginBottom: '30px',
        textAlign: 'center',
        fontFamily: 'sans-serif'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#2b8a3e', fontSize: '18px', fontWeight: '800' }}>📊 엑셀/CSV 후기 일괄 등록</h3>
        <p style={{ color: '#555', fontSize: '13px', lineHeight: '1.6', textAlign: 'left', maxWidth: '700px', margin: '0 auto 20px auto' }}>
          보유하고 계신 설문 결과 엑셀(.xlsx) 또는 CSV 파일을 선택하면 아래의 규칙에 따라 일괄 업로드됩니다.<br /><br />
          <strong>📋 엑셀 열(컬럼) 감지 규칙:</strong><br />
          1. <strong>성함</strong>: 이름 부분은 자동으로 &apos;OO&apos; 마스킹 처리됩니다. (예: 김철수 ➔ 김OO)<br />
          2. <strong>직장</strong>: <code>직장명</code> 또는 <code>직장</code> 컬럼에서 직장명을 자동 추출하여 반영하며 (지역명은 제외), 회사명에 &apos;학교&apos; 관련 단어가 있으면 <strong>[학교]</strong> 탭으로, 그 외는 <strong>[기업]</strong> 탭으로 자동 분류됩니다.<br />
          3. <strong>만족도</strong>: 고객 만족도 향상을 위해 <strong>무조건 별 다섯 개(★★★★★)</strong>로 자동 고정되어 입력됩니다.<br />
          4. <strong>후기 내용</strong>: <code>기프로그램 내용 및 과정 중 가장 인상 깊거나 유익했던 점은 무엇입니까?</code> 열의 텍스트를 후기 내용으로 자동 수집합니다.<br />
          5. <strong>글자수 필터</strong>: 신뢰도 향상을 위해 <strong>후기 본문이 46자 이상인 정성스러운 후기만 선별</strong>하여 자동 등록됩니다. (45자 이하는 자동 제외)
        </p>
        
        <div style={{ display: 'inline-block', position: 'relative' }}>
          <input 
            type="file" 
            accept=".xlsx, .xls, .csv" 
            onChange={handleExcelUpload}
            style={{ display: 'none' }}
            id="excel-upload-input"
          />
          <label 
            htmlFor="excel-upload-input"
            style={{ 
              display: 'inline-block',
              padding: '12px 25px', 
              background: '#2b8a3e', 
              color: '#fff', 
              borderRadius: '8px', 
              fontWeight: 'bold', 
              fontSize: '14px', 
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(43, 138, 62, 0.2)'
            }}
          >
            엑셀 파일 업로드하기
          </label>
        </div>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800' }}>등록된 후기 목록 ({reviews.length})</h3>
        {reviews.length > 0 && (
          <button 
            onClick={handleBulkDelete}
            style={{ 
              padding: '8px 16px', 
              background: '#e03131', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              fontSize: '13px',
              boxShadow: '0 4px 10px rgba(224, 49, 49, 0.2)'
            }}
          >
            🚨 전체 후기 일괄 삭제
          </button>
        )}
      </div>
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
