'use client'

import { useModal } from './ModalContext'

export default function FabButton() {
  const { openModal } = useModal()

  return (
    <div className="main3-fab">
      <div className="chatbot-badge" onClick={() => openModal('chat')}>
        💬 실시간 챗봇 문의
      </div>
    </div>
  )
}
