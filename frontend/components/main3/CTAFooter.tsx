'use client'

import { useModal } from './ModalContext'

export default function CTAFooter() {
  const { openModal } = useModal()

  return (
    <section className="cta-footer">
      <div className="container">
        <h2>FaWW와 함께 건강한 조직을 구축하세요</h2>
        <p>우리 학교 및 기업 환경에 알맞는 건강 복지 프로그램을 맞춤 설계해 드립니다.</p>
        <button className="cta-btn-white" onClick={() => openModal('proposal')}>
          맞춤 제안서 및 견적 받기
        </button>
      </div>
    </section>
  )
}
