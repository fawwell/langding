'use client'

import { useModal } from './ModalContext'

export default function ChatModal() {
  const { activeModal, closeModal, openModal } = useModal()

  if (activeModal !== 'chat') return null

  return (
    <div className="main3-modal active" onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}>
      <div className="modal-content chat-modal-content">
        <div className="chat-top-bar">
          <button className="chat-close-btn" onClick={closeModal}>&times;</button>
        </div>
        <div className="chat-profile-sec">
          <div className="chat-profile-img">FW</div>
          <div className="chat-profile-info">
            <h3>FaWW</h3>
            <p>⚡ 24시간 운영해요</p>
          </div>
        </div>
        <div className="chat-body-sec">
          <div className="chat-main-card">
            <div className="chat-main-card-header">
              <span className="sm-logo">FW</span>
              <span>FaWW</span>
            </div>
            <h4>압도적 건강복지의 시작! 💚</h4>
            <p>No.1 피지컬케어 솔루션 FaWW와 함께하면<br />임직원과 학생이 건강해지고, 조직이 성장합니다.</p>
            <button
              className="chat-inquire-btn"
              onClick={() => { closeModal(); openModal('proposal') }}
            >
              문의하기 ▼
            </button>
            <div style={{ fontSize: 13, color: '#888', textAlign: 'center' }}>
              <span>👩‍💻</span> 몇 분 내 답변 받으실 수 있어요
            </div>
          </div>
          <div className="chat-alt-card">
            <span>다른 방법으로 문의</span>
            <div className="chat-alt-icons">
              <button className="chat-icon-btn chat-icon-kakao" title="카카오톡 문의">💬</button>
              <button className="chat-icon-btn chat-icon-phone" title="전화 문의">📞</button>
            </div>
          </div>
        </div>
        <div className="chat-bottom-nav">
          <div className="chat-nav-item active">
            <span className="chat-nav-icon">🏠</span>
            <span>홈</span>
          </div>
          <div className="chat-nav-item">
            <span className="chat-nav-icon">💬</span>
            <span>대화</span>
          </div>
        </div>
      </div>
    </div>
  )
}
