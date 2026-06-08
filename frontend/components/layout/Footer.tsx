import React from 'react';

interface FooterProps {
    style?: React.CSSProperties;
}

export default function Footer({ style }: FooterProps) {
    return (
        <footer style={{ backgroundColor: '#111', color: '#888', padding: '60px 20px', fontSize: '14px', lineHeight: '1.6', ...style }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
                    <div style={{ fontSize: '24px', fontWeight: '900', color: '#fff', letterSpacing: '-1px' }}>FaWW</div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>이용약관</a>
                        <a href="#" style={{ color: '#ccc', textDecoration: 'none', fontWeight: 'bold' }}>개인정보처리방침</a>
                    </div>
                </div>
                <div>
                    <p style={{ margin: '0 0 5px 0' }}>주식회사 파우(FaWW) | 대표이사: 김은주 | 사업자등록번호: 107-88-12047 | 통신판매업신고번호: 제 2014-서울영등포-1105호</p>
                    <p style={{ margin: '0 0 5px 0' }}>주소: 서울특별시 영등포구 도신로 143, 대원빌딩 301호 | 고객센터: 02-6482-9003</p>
                    <p style={{ margin: '0' }}>이메일: contact@faww.co.kr</p>
                </div>
                <div style={{ marginTop: '10px', color: '#555' }}>
                    © {new Date().getFullYear()} FaWW Korea. All rights reserved.<br />
                    <span style={{ fontSize: '12px', opacity: 0.7 }}>파우(FaWW)는 기업의 안전보건 컴플라이언스 파트너로서 법령 준수를 지원합니다.</span>
                </div>
            </div>
        </footer>
    );
}
