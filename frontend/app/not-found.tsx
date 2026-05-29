import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '100px', fontWeight: '800', margin: '0', color: '#eee' }}>404</h1>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', marginTop: '-20px' }}>
        찾으시는 페이지가 존재하지 않습니다.
      </h2>
      <p style={{ color: '#666', marginBottom: '30px', maxWidth: '400px', lineHeight: '1.6' }}>
        입력하신 주소가 정확한지 확인해 주세요. <br />
        보안을 위해 요청하신 경로는 기록되지 않았습니다.
      </p>
      <Link 
        href="/"
        style={{
          padding: '12px 30px',
          background: '#2b8a3e',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(43, 138, 62, 0.3)'
        }}
      >
        FaWW 홈으로 가기
      </Link>
    </div>
  );
}
