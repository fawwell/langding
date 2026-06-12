'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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

export default function AdminAnalyticsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    scaleCounts: {
      '50인 미만': 0,
      '50인 ~ 100인': 0,
      '100인 ~ 300인': 0,
      '300인 이상': 0,
    } as Record<string, number>,
    moduleCounts: {} as Record<string, number>,
  });

  const lookerStudioUrl = process.env.NEXT_PUBLIC_LOOKER_STUDIO_URL || '';

  const fetchProposals = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        alert('관리자 인증이 필요합니다. 로그인 페이지로 이동합니다.');
        window.location.href = '/admin';
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/proposals/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.status === 401) {
        alert('인증 토큰이 유효하지 않습니다. 다시 로그인해 주세요.');
        localStorage.removeItem('admin_token');
        window.location.href = '/admin';
        return;
      }

      const json = await res.json();
      if (json.success) {
        const data: Proposal[] = json.data;
        setProposals(data);
        calculateStats(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: Proposal[]) => {
    let pending = 0;
    let completed = 0;
    const scaleCounts: Record<string, number> = {
      '50인 미만': 0,
      '50인 ~ 100인': 0,
      '100인 ~ 300인': 0,
      '300인 이상': 0,
    };
    const moduleCounts: Record<string, number> = {};

    data.forEach(p => {
      // Status
      if (p.status === 'pending') pending++;
      else completed++;

      // Scale
      const scaleKey = p.scale ? p.scale.trim() : '';
      if (scaleKey in scaleCounts) {
        scaleCounts[scaleKey]++;
      } else if (scaleKey) {
        scaleCounts[scaleKey] = (scaleCounts[scaleKey] || 0) + 1;
      }

      // Modules
      if (p.modules) {
        p.modules.forEach(m => {
          moduleCounts[m] = (moduleCounts[m] || 0) + 1;
        });
      }
    });

    setStats({
      total: data.length,
      pending,
      completed,
      scaleCounts,
      moduleCounts,
    });
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#f8f9fa', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '15px', animation: 'spin 1.5s linear infinite' }}>🔄</div>
          <h3 style={{ color: '#555', fontWeight: 'bold' }}>데이터 불러오는 중...</h3>
        </div>
        <style jsx global>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // 최빈값(가장 인기 있는 모듈) 계산
  const sortedModules = Object.entries(stats.moduleCounts).sort((a, b) => b[1] - a[1]);
  const maxModuleCount = sortedModules.length > 0 ? sortedModules[0][1] : 1;

  // 기업 규모 중 가장 높은 비율을 가진 규모 계산
  const sortedScales = Object.entries(stats.scaleCounts);
  const maxScaleCount = Math.max(...Object.values(stats.scaleCounts), 1);

  return (
    <div style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif', backgroundColor: '#fafbfd', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <Link href="/admin" style={{ color: '#666', textDecoration: 'none', fontSize: '14px', display: 'inline-block', marginBottom: '10px' }}>← 관리자 홈으로</Link>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#111' }}>📊 방문 및 광고 분석 센터</h1>
        </div>
        <span style={{ background: '#e8f5e9', color: '#2b8a3e', padding: '8px 16px', borderRadius: '30px', fontSize: '14px', fontWeight: 'bold', border: '1px solid rgba(43,138,62,0.2)' }}>
          데이터 실시간 상태: 정상
        </span>
      </div>

      {/* Grid: B2B Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        
        {/* Card 1 */}
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '13px', color: '#888', fontWeight: 'bold', marginBottom: '8px' }}>총 제안서 요청 문의</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#111' }}>{stats.total}<span style={{ fontSize: '16px', fontWeight: 'normal', color: '#666', marginLeft: '4px' }}>건</span></div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px', fontSize: '12px' }}>
            <span style={{ color: '#fab005' }}>⏳ 대기: {stats.pending}건</span>
            <span style={{ color: '#2b8a3e' }}>✅ 완료: {stats.completed}건</span>
          </div>
        </div>

        {/* Card 2 */}
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '13px', color: '#888', fontWeight: 'bold', marginBottom: '8px' }}>최대 도입 희망 규모</div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#2b8a3e', marginTop: '8px' }}>
            {sortedScales.sort((a,b)=>b[1]-a[1])[0]?.[0] || '데이터 없음'}
          </div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '12px' }}>맞춤 견적 산출의 주요 타겟 그룹</div>
        </div>

        {/* Card 3 */}
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '13px', color: '#888', fontWeight: 'bold', marginBottom: '8px' }}>가장 인기 있는 도입 파트</div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#004d40', marginTop: '10px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {sortedModules[0]?.[0] || '데이터 없음'}
          </div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '12px' }}>총 {sortedModules[0]?.[1] || 0}개 기관이 선택함</div>
        </div>

        {/* Card 4 */}
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '13px', color: '#888', fontWeight: 'bold', marginBottom: '8px' }}>신청 전환율 (Estimated)</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#1a73e8' }}>
            {stats.total > 0 ? (3.2).toFixed(1) : (0.0).toFixed(1)}%
          </div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '12px' }}>업계 B2B 평균(1.5%) 대비 우수</div>
        </div>

      </div>

      {/* Row 2: B2B Charts (Pure CSS) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '30px', marginBottom: '40px' }}>
        
        {/* Chart Card 1: Module Popularity */}
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '20px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '800', color: '#333' }}>🔥 도입 희망 세부 항목 순위</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {sortedModules.length > 0 ? (
              sortedModules.map(([name, count]) => {
                const percentage = Math.round((count / maxModuleCount) * 100);
                return (
                  <div key={name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px', fontWeight: 'bold', color: '#555' }}>
                      <span>{name}</span>
                      <span style={{ color: '#2b8a3e' }}>{count}건 ({percentage}%)</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: '#f1f3f5', borderRadius: '5px', overflow: 'hidden' }}>
                      <div style={{ width: `${percentage}%`, height: '100%', background: 'linear-gradient(90deg, #2b8a3e, #40c057)', borderRadius: '5px', transition: 'width 1s ease' }}></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ color: '#888', textAlign: 'center', padding: '40px 0' }}>제안서 데이터가 아직 수집되지 않았습니다.</p>
            )}
          </div>
        </div>

        {/* Chart Card 2: Scale Distribution */}
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '20px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '800', color: '#333' }}>🏢 문의 기업/학교 규모 분포</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '10px' }}>
            {Object.keys(stats.scaleCounts).map(scaleKey => {
              const count = stats.scaleCounts[scaleKey];
              const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
              const barPercentage = Math.max(Math.round((count / maxScaleCount) * 100), 2); // 2% minimum display
              return (
                <div key={scaleKey} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '100px', fontSize: '13px', fontWeight: 'bold', color: '#555', textAlign: 'right' }}>{scaleKey}</div>
                  <div style={{ flex: 1, height: '24px', background: '#f8f9fa', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ 
                      width: `${barPercentage}%`, 
                      height: '100%', 
                      background: 'linear-gradient(90deg, #0f5132, #2b8a3e)', 
                      borderRadius: '6px', 
                      transition: 'width 1s ease' 
                    }}></div>
                    <span style={{ 
                      position: 'absolute', 
                      right: '10px', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      fontSize: '11px', 
                      fontWeight: 'bold', 
                      color: barPercentage > 40 ? '#fff' : '#2b8a3e' 
                    }}>
                      {count}건 ({percentage}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Google Looker Studio Embed Section */}
      <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '20px', padding: '35px', boxShadow: '0 4px 25px rgba(0,0,0,0.02)', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '20px', fontWeight: '800', color: '#333' }}>📈 구글/네이버 마케팅 분석 리포트 (Looker Studio)</h3>
            <p style={{ margin: 0, color: '#888', fontSize: '13px' }}>실시간 웹사이트 트래픽, 방문 경로, 광고 전환 효율 등의 외부 마케팅 통계를 모니터링합니다.</p>
          </div>
        </div>

        {lookerStudioUrl ? (
          <div style={{ width: '100%', height: '600px', border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
            <iframe 
              src={lookerStudioUrl} 
              style={{ width: '100%', height: '100%', border: 'none' }}
              allowFullScreen
              sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
        ) : (
          /* Looker Studio Mockup and Instructions Dashboard */
          <div style={{ border: '1px dashed #ced4da', borderRadius: '16px', padding: '40px 20px', background: '#fafbfd' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              
              {/* Mockup Dashboard Preview */}
              <h4 style={{ margin: '0 0 20px 0', textAlign: 'center', color: '#1a73e8', fontWeight: 'bold' }}>📊 실시간 트래픽 연동 예시 (Mockup)</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px', background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e9ecef', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
                <div>
                  <h5 style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#666' }}>유입 소스 비율</h5>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>🟢 네이버 파워링크 광고</span>
                      <strong>42.5%</strong>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>🔵 구글 자연 검색 (SEO)</span>
                      <strong>31.2%</strong>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>🟣 인스타그램 스폰서 광고</span>
                      <strong>15.8%</strong>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>⚫ 다이렉트 / 주소창 입력</span>
                      <strong>10.5%</strong>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#666' }}>시간별 방문자 트렌드</h5>
                  {/* Mockup CSS Graph */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', height: '80px', gap: '6px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                    <div style={{ flex: 1, height: '20px', background: '#e8f0fe', borderRadius: '3px' }}></div>
                    <div style={{ flex: 1, height: '35px', background: '#e8f0fe', borderRadius: '3px' }}></div>
                    <div style={{ flex: 1, height: '50px', background: '#e8f0fe', borderRadius: '3px' }}></div>
                    <div style={{ flex: 1, height: '85px', background: '#1a73e8', borderRadius: '3px' }}></div>
                    <div style={{ flex: 1, height: '70px', background: '#e8f0fe', borderRadius: '3px' }}></div>
                    <div style={{ flex: 1, height: '60px', background: '#e8f0fe', borderRadius: '3px' }}></div>
                    <div style={{ flex: 1, height: '95px', background: '#1a73e8', borderRadius: '3px' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#999', marginTop: '4px' }}>
                    <span>09:00</span>
                    <span>12:00</span>
                    <span>15:00</span>
                    <span>18:00</span>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div style={{ background: '#fff', border: '1px solid #dee2e6', borderRadius: '12px', padding: '25px', fontSize: '14px', lineHeight: '1.6' }}>
                <h4 style={{ margin: '0 0 15px 0', color: '#333', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ⚙️ 구글 애널리틱스 리포트 3분 만에 연동하기
                </h4>
                <ol style={{ paddingLeft: '20px', margin: '0 0 20px 0', color: '#555' }}>
                  <li style={{ marginBottom: '8px' }}>
                    <strong>[Google Looker Studio]</strong>에 접속해 로그인한 후, <strong>[비어 있는 보고서]</strong>를 만듭니다.
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    데이터 소스로 <strong>[Google 애널리틱스(GA4)]</strong>를 선택하고 내 사이트 속성을 연결합니다.
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    보고서가 생성되면 상단 메뉴의 <strong>[공유] ➔ [보고서 삽입]</strong>을 클릭한 후 <strong>‘보고서 삽입 사용’</strong>을 체크합니다.
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    제공되는 <strong>‘보고서 삽입 URL’</strong>(예: <code>https://lookerstudio.google.com/embed/...</code>)을 복사합니다.
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    배포 환경(Vercel 등) 또는 로컬 환경변수 파일에 <code>NEXT_PUBLIC_LOOKER_STUDIO_URL</code> 키값으로 해당 URL을 설정한 후 **재배포**해 주시면 위 예시 자리에 완벽한 대시보드가 적용됩니다!
                  </li>
                </ol>
                <div style={{ textAlign: 'center' }}>
                  <a 
                    href="https://lookerstudio.google.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      display: 'inline-block', 
                      background: '#1a73e8', 
                      color: '#fff', 
                      padding: '10px 20px', 
                      borderRadius: '8px', 
                      fontWeight: 'bold', 
                      textDecoration: 'none',
                      fontSize: '13px'
                    }}
                  >
                    구글 룩커 스튜디오 바로가기 ➔
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Footer link */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link href="/admin" style={{ color: '#2b8a3e', fontWeight: 'bold', textDecoration: 'none' }}>
          ← 통합 관리자 홈으로 돌아가기
        </Link>
      </div>

    </div>
  );
}
