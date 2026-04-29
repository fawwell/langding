'use client';

import React, { useEffect, useState } from 'react';
import '../v2_style.css';

interface RequestData {
    date: string;
    company: string;
    manager: string;
    phone: string;
    email: string;
    modules: string[];
}

export default function AdminPage() {
    const [requests, setRequests] = useState<RequestData[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        if (typeof window !== 'undefined') {
            const storedRequests = JSON.parse(localStorage.getItem('faww_requests') || '[]');
            setRequests(storedRequests);
        }
        setIsLoaded(true);
    };

    const clearData = () => {
        if (typeof window !== 'undefined') {
            if (window.confirm('모든 접수 내역을 삭제하시겠습니까?')) {
                localStorage.removeItem('faww_requests');
                loadData();
            }
        }
    };

    // Next.js Hydration 에러 방지를 위해 클라이언트 마운트 후 렌더링
    if (!isLoaded) return null;

    return (
        <>
            <header className="admin-header">
                <div className="admin-logo">FaWW Admin</div>
                <div>최고관리자 님</div>
            </header>

            <div className="admin-container">
                <div className="admin-title-row">
                    <h2>
                        제안서 접수 내역{' '}
                        <span style={{ color: '#2b8a3e', fontSize: '18px' }}>
                            ({requests.length}건)
                        </span>
                    </h2>
                    <button className="btn-clear" onClick={clearData}>
                        데이터 초기화
                    </button>
                </div>

                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>접수일시</th>
                                <th>소속(기업/학교)</th>
                                <th>담당자</th>
                                <th>연락처</th>
                                <th>이메일</th>
                                <th>선택한 파트 (모듈)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="empty-state">
                                        접수된 제안서 요청이 없습니다. 메인 페이지에서 폼을 제출해 보세요.
                                    </td>
                                </tr>
                            ) : (
                                requests.map((req, index) => (
                                    <tr key={index}>
                                        <td style={{ color: '#888', fontSize: '13px' }}>{req.date}</td>
                                        <td style={{ fontWeight: 'bold' }}>{req.company}</td>
                                        <td>{req.manager}</td>
                                        <td>{req.phone}</td>
                                        <td>{req.email}</td>
                                        <td>
                                            {req.modules && req.modules.length > 0 ? (
                                                req.modules.map((m, mIdx) => (
                                                    <span key={mIdx} className="tag-badge">
                                                        {m}
                                                    </span>
                                                ))
                                            ) : (
                                                <span style={{ color: '#aaa' }}>-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}