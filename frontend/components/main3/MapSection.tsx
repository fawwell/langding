'use client'

import { useState } from 'react'
import RevealWrapper from './RevealWrapper'

const markers = [
  {
    cx: 165, cy: 155,
    label: '서울/경기 230곳',
    items: ['삼성 계열사', '현대 계열사', '네이버/카카오'],
    color: '#1a56db',
    region: '수도권',
  },
  {
    cx: 230, cy: 245,
    label: '충청권 85곳',
    items: ['SK하이닉스', '주요 공공기관'],
    color: '#7c3aed',
    region: '충청',
  },
  {
    cx: 160, cy: 330,
    label: '전라권 65곳',
    items: ['LG화학', '주요 협력업체'],
    color: '#059669',
    region: '전라',
  },
  {
    cx: 285, cy: 345,
    label: '부산/경남 110곳',
    items: ['현대자동차', '주요 초중고교'],
    color: '#dc2626',
    region: '경상',
  },
]

interface MapSectionProps {
  style?: React.CSSProperties
  showDetail?: boolean
}

export default function MapSection({ style, showDetail = true }: MapSectionProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="map-section" style={style}>
      <div className="container">
        <h2 className="section-title">전국 어디든, FaWW가 찾아갑니다</h2>
        <p className="section-desc">전국 주요 기업 및 학교 500곳 이상 누적 방문 달성</p>
        <RevealWrapper>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 48, flexWrap: 'wrap', maxWidth: 960, margin: '0 auto' }}>

            {/* SVG 한국 지도 */}
            <div style={{ position: 'relative', flex: '0 0 auto' }}>
              <svg
                viewBox="0 0 400 500"
                width="380"
                height="475"
                style={{ display: 'block', filter: 'drop-shadow(0 12px 32px rgba(26,86,219,0.13))' }}
                aria-label="대한민국 지도"
              >
                {/* 바다 배경 */}
                <rect width="400" height="500" fill="#e8f0fe" rx="20" />

                {/* 바다 이름 */}
                <text x="38" y="260" fill="#a5b4d6" fontSize="13" fontWeight="700" letterSpacing="1">서해</text>
                <text x="348" y="280" fill="#a5b4d6" fontSize="13" fontWeight="700" letterSpacing="1">동해</text>
                <text x="175" y="470" fill="#a5b4d6" fontSize="13" fontWeight="700" letterSpacing="1">남해</text>

                {/* 한반도 본토 */}
                <path
                  d="
                    M 88,78
                    C 100,65 125,58 155,55
                    C 185,52 215,52 245,56
                    C 268,59 288,68 305,82
                    C 318,94 326,110 330,128
                    C 334,146 334,165 330,183
                    C 326,198 318,210 320,225
                    C 323,242 332,257 334,274
                    C 336,290 330,306 322,320
                    C 314,334 305,346 308,360
                    C 311,372 318,382 312,392
                    C 305,403 290,408 274,412
                    C 258,416 240,416 224,412
                    C 208,408 196,400 184,395
                    C 172,390 160,388 148,382
                    C 135,376 122,366 112,354
                    C 102,342 96,328 92,313
                    C 88,298 88,282 90,267
                    C 92,252 96,238 94,222
                    C 92,206 86,192 84,176
                    C 82,160 84,142 88,128
                    C 91,116 88,94 88,78
                    Z
                  "
                  fill="#dbeafe"
                  stroke="#93c5fd"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {/* 도 경계선 */}
                {/* 경기/강원 ~ 충청 경계 */}
                <path d="M 90,195 C 150,192 220,195 334,198" fill="none" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="5,4" />
                {/* 충청 ~ 전라/경상 경계 */}
                <path d="M 92,298 C 150,295 230,296 322,302" fill="none" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="5,4" />
                {/* 동서 분기 (태백산맥 방향) */}
                <path d="M 245,56 C 260,120 270,200 270,290" fill="none" stroke="#93c5fd" strokeWidth="1" strokeDasharray="4,4" />

                {/* 지역명 */}
                <text x="155" y="138" fill="#6b7280" fontSize="12" fontWeight="700" textAnchor="middle">경기</text>
                <text x="278" y="155" fill="#6b7280" fontSize="11" fontWeight="700" textAnchor="middle">강원</text>
                <text x="150" y="248" fill="#6b7280" fontSize="11" fontWeight="700" textAnchor="middle">충남</text>
                <text x="262" y="248" fill="#6b7280" fontSize="11" fontWeight="700" textAnchor="middle">충북</text>
                <text x="130" y="345" fill="#6b7280" fontSize="11" fontWeight="700" textAnchor="middle">전라</text>
                <text x="270" y="348" fill="#6b7280" fontSize="11" fontWeight="700" textAnchor="middle">경상</text>

                {/* 마커들 */}
                {markers.map((marker, i) => {
                  const isHovered = hovered === i
                  // 라벨을 마커 위쪽에 표시
                  const labelX = marker.cx
                  const labelY = marker.cy - 28
                  const labelW = 110
                  const labelH = 22

                  return (
                    <g
                      key={i}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {/* 파동 링 */}
                      <circle cx={marker.cx} cy={marker.cy} r={isHovered ? 24 : 18}
                        fill={marker.color} opacity={0.12}
                        style={{ transition: 'r 0.3s ease' }}
                      />
                      <circle cx={marker.cx} cy={marker.cy} r={isHovered ? 14 : 10}
                        fill={marker.color} opacity={0.2}
                        style={{ transition: 'r 0.3s ease' }}
                      />
                      {/* 핀 원 */}
                      <circle cx={marker.cx} cy={marker.cy} r={isHovered ? 9 : 7}
                        fill={marker.color}
                        stroke="#fff" strokeWidth="2.5"
                        style={{ transition: 'all 0.2s ease' }}
                      />

                      {/* 연결선 */}
                      <line
                        x1={marker.cx} y1={marker.cy - 9}
                        x2={labelX} y2={labelY + labelH}
                        stroke={marker.color} strokeWidth="1.5" opacity={0.5}
                      />

                      {/* 라벨 (항상 표시) */}
                      <rect
                        x={labelX - labelW / 2} y={labelY - labelH / 2}
                        width={labelW} height={labelH}
                        rx="10"
                        fill={isHovered ? marker.color : '#fff'}
                        stroke={marker.color} strokeWidth="1.5"
                        style={{ transition: 'fill 0.2s', filter: isHovered ? `drop-shadow(0 3px 8px ${marker.color}55)` : 'none' }}
                      />
                      <text
                        x={labelX} y={labelY + 4}
                        fill={isHovered ? '#fff' : marker.color}
                        fontSize="10.5"
                        fontWeight="800"
                        textAnchor="middle"
                        style={{ transition: 'fill 0.2s' }}
                      >
                        {marker.label}
                      </text>
                    </g>
                  )
                })}

                {/* 제주도 */}
                <ellipse cx="175" cy="452" rx="36" ry="17"
                  fill="#dbeafe" stroke="#93c5fd" strokeWidth="2"
                />
                <text x="175" y="456" fill="#6b7280" fontSize="11" fontWeight="700" textAnchor="middle">제주</text>

                {/* 울릉도 */}
                <ellipse cx="360" cy="155" rx="12" ry="9"
                  fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"
                />
                <text x="360" y="158" fill="#9ca3af" fontSize="8.5" fontWeight="700" textAnchor="middle">울릉</text>
              </svg>
            </div>

            {/* 우측 범례 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: '1 1 240px', maxWidth: 300 }}>
              {markers.map((marker, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    padding: '16px 20px',
                    borderRadius: 14,
                    border: `2px solid ${hovered === i ? marker.color : '#e5e7eb'}`,
                    background: hovered === i ? `${marker.color}09` : '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.22s ease',
                    boxShadow: hovered === i ? `0 6px 20px ${marker.color}25` : '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{
                    width: 11, height: 11, borderRadius: '50%', marginTop: 4,
                    background: marker.color, flexShrink: 0,
                    boxShadow: `0 0 0 3px ${marker.color}30`,
                  }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: '#111', marginBottom: 3 }}>{marker.label}</div>
                    {showDetail && (
                      <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6 }}>
                        {marker.items.map((item, j) => (
                          <span key={j} style={{ display: 'block' }}>· {item}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* 총계 카드 */}
              <div style={{
                marginTop: 6, padding: '18px 20px', borderRadius: 14,
                background: 'linear-gradient(135deg, #1a56db, #3b82f6)',
                color: '#fff', textAlign: 'center',
              }}>
                <div style={{ fontWeight: 900, fontSize: 32, letterSpacing: -1 }}>500+</div>
                <div style={{ fontSize: 13, opacity: 0.85, marginTop: 2, fontWeight: 600 }}>전국 누적 방문 달성</div>
              </div>
            </div>

          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
