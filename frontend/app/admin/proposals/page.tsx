'use client';

import React, { useState, useEffect } from 'react';

interface ProposalPart {
  selected: boolean;
  sub_modules: string[];
}

interface Proposal {
  id: string;
  company: string;
  manager: string;
  phone: string;
  email: string;
  scale: string;
  inquiry: string;
  modules: string[];
  status: string;
  created_at: string;
}

export default function AdminProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProposals = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/proposals/`);
      const json = await res.json();
      if (json.success) setProposals(json.data);
    } catch (e) {
      console.error(e);
      alert('데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>FaWW 맞춤 솔루션 문의(제안서) 관리자</h1>
      
      {loading ? (
        <p>로딩 중...</p>
      ) : proposals.length === 0 ? (
        <p>등록된 문의 내역이 없습니다.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {proposals.map(proposal => (
            <div key={proposal.id} style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
                <div>
                  <h2 style={{ margin: '0 0 10px 0', color: '#111' }}>{proposal.company} <span style={{ fontSize: '16px', color: '#666', fontWeight: 'normal' }}>({proposal.scale})</span></h2>
                  <div style={{ fontSize: '14px', color: '#555' }}>
                    <strong>담당자:</strong> {proposal.manager} | <strong>연락처:</strong> {proposal.phone} | <strong>이메일:</strong> {proposal.email}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', color: '#888', marginBottom: '5px' }}>{new Date(proposal.created_at).toLocaleString()}</div>
                  <span style={{ background: proposal.status === 'pending' ? '#fff3cd' : '#d4edda', color: proposal.status === 'pending' ? '#856404' : '#155724', padding: '5px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                    {proposal.status === 'pending' ? '대기 중' : '처리 완료'}
                  </span>
                </div>
              </div>

              <div>
                <h4 style={{ margin: '0 0 10px 0', color: '#2b8a3e' }}>선택한 모듈</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {proposal.modules && proposal.modules.length > 0 ? (
                    proposal.modules.map((mod, idx) => (
                      <span key={idx} style={{ background: '#e8f5e9', color: '#2b8a3e', padding: '5px 12px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold' }}>{mod}</span>
                    ))
                  ) : (
                    <span style={{ fontSize: '13px', color: '#999' }}>선택된 모듈 없음</span>
                  )}
                </div>

                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>추가 문의사항</h4>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '4px', fontSize: '14px', color: '#444', minHeight: '60px', whiteSpace: 'pre-wrap' }}>
                  {proposal.inquiry || '내용 없음'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
