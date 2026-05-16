'use client';

import React from 'react';

const ComparisonSection = () => {
    return (
        <section className="comparison-section reveal" style={{ padding: '60px 0', background: '#fff', borderTop: '1px solid #eee' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <span className="section-kicker reveal soft-reveal">DIFFERENCE</span>
                <h2 className="section-title reveal soft-reveal">품의서가 통과되는 압도적 차이</h2>
                <p className="section-desc reveal soft-reveal">단순 매칭 플랫폼과 피지컬케어 원조 그룹의 본질적인 차이를 확인하세요.</p>
                <div className="compare-table-wrapper" style={{ maxWidth: '900px', margin: '30px auto 0', border: '1px solid #eaeaea', borderRadius: '12px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                        <thead>
                            <tr style={{ background: '#f8f9fa' }}>
                                <th style={{ padding: '20px', borderBottom: '1px solid #eaeaea' }}>비교 항목</th>
                                <th style={{ padding: '20px', borderBottom: '1px solid #eaeaea', color: '#666' }}>타사 일반 플랫폼</th>
                                <th style={{ padding: '20px', borderBottom: '1px solid #eaeaea', background: '#2b8a3e', color: '#fff', fontSize: '18px' }}>FaWW 피지컬케어 (원조)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '20px', fontWeight: 'bold', borderBottom: '1px solid #eaeaea', textAlign: 'left', background: '#fdfdfd' }}>전문가 파견 기준</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #eaeaea', color: '#555' }}>단기 프리랜서 매칭</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #eaeaea', fontWeight: 'bold', color: '#2b8a3e', background: '#e8f5e9' }}>100% 정규 과정 수료 마스터</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '20px', fontWeight: 'bold', borderBottom: '1px solid #eaeaea', textAlign: 'left', background: '#fdfdfd' }}>효과 측정/증빙</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #eaeaea', color: '#555' }}>단순 만족도 설문</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #eaeaea', fontWeight: 'bold', color: '#2b8a3e', background: '#e8f5e9' }}>스마트 AI 수치화 리포트</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '20px', fontWeight: 'bold', textAlign: 'left', background: '#fdfdfd' }}>케어의 본질</td>
                                <td style={{ padding: '20px', color: '#555' }}>일시적인 근육 이완</td>
                                <td style={{ padding: '20px', fontWeight: 'bold', color: '#2b8a3e', background: '#e8f5e9' }}>근육/관절 기반 통증 개선</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ComparisonSection;
