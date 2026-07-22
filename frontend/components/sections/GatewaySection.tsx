'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const GatewaySection = () => {
    const router = useRouter();
    
    return (
        <section className="gateway-section reveal" style={{ padding: '100px 0', background: '#fff' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <span className="section-kicker reveal soft-reveal">OUR BUSINESS</span>
                    <h2 className="section-title reveal soft-reveal">지속가능한 웰니스 솔루션</h2>
                    <p className="section-desc reveal soft-reveal">FaWW의 3가지 비즈니스로 여러분의 조직과 일상에 건강을 선물하세요.</p>
                </div>
                <div className="gateway-grid">
                    <div className="gateway-card reveal" onClick={() => router.push('/ai')} style={{ padding: 0, overflow: 'hidden' }}>
                        <div className="gateway-img" style={{ height: '200px', position: 'relative', overflow: 'hidden', background: '#f0f0f0' }}>
                            <Image src="/images/gateway/ai_scanning.png" alt="FaWW 스마트 AI 신체스캔 및 체형분석 솔루션" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                            <div className="scan-line"></div>
                        </div>
                        <div className="gateway-content" style={{ padding: '30px' }}>
                            <div className="tags-wrap"><span className="hash-tag">#임직원_근골격계_관리</span><span className="hash-tag">#유해요인조사_사후관리</span></div>
                            <h3>스마트 AI 체형분석 <br /> 솔루션</h3>
                            <p>기업의 업무 효율을 높이는 <br />
                                EAP 복지 프로그램부터 학교 <br />
                                단체 검진까지, 데이터 기반의 <br />
                                정확한 리포트를 제공합니다.</p>
                            <div className="gateway-btn">조직 맞춤 솔루션 보기</div>
                        </div>
                    </div>
                    <div className="gateway-card reveal delay-1" onClick={() => router.push('/physical')} style={{ padding: 0, overflow: 'hidden' }}>
                        <div className="gateway-img" style={{ height: '200px', position: 'relative', overflow: 'hidden', background: '#f0f0f0' }}>
                            <Image src="/images/gateway/physical_care.jpg" alt="FaWW 1:1 맞춤형 피지컬케어 아카데미 및 센터 서비스" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                        </div>
                        <div className="gateway-content" style={{ padding: '30px' }}>
                            <div className="tags-wrap"><span className="hash-tag">#로컬센터</span><span className="hash-tag">#전문가양성</span></div>
                            <h3>FaWW <br /> 피지컬케어</h3>
                            <p>전국 주요 오프라인 거점 센터를 통한 <br />
                                개인 맞춤 관리와, 압도적인 전문가를 <br />
                                양성하는 아카데미 교육 과정을 <br />
                                운영합니다.</p>
                            <div className="gateway-btn">피지컬케어 자세히 보기</div>
                        </div>
                    </div>
                    <div className="gateway-card reveal delay-2" onClick={() => router.push('/mall')} style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
                        <img 
                            src="/images/pawmi/pawmi_theragun.png" 
                            alt="테라건 파우미" 
                            style={{ 
                                position: 'absolute', 
                                top: '10px', 
                                right: '10px', 
                                width: '70px', 
                                height: '70px', 
                                objectFit: 'contain', 
                                zIndex: 10,
                                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                            }} 
                        />
                        <div className="gateway-img" style={{ height: '200px', position: 'relative', overflow: 'hidden', background: '#f0f0f0' }}>
                            <Image src="/images/gateway/mall.webp" alt="FaWW 피지컬케어 몰 - 홈케어 운동 교구 및 릴렉싱 용품 쇼핑몰" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                        </div>
                        <div className="gateway-content" style={{ padding: '30px' }}>
                            <div className="tags-wrap"><span className="hash-tag">#홈케어교구</span><span className="hash-tag">#복지포인트</span></div>
                            <h3>피지컬케어 <br /> Mall</h3>
                            <p>전문가가 직접 검증한 릴렉싱 및 <br />
                                트레이닝 교구. 기업 복지 포인트 <br />
                                차감 및 안전한 셀프 홈케어를 <br />
                                완벽 지원합니다.</p>
                            <div className="gateway-btn">검증 교구 쇼핑하기</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GatewaySection;
