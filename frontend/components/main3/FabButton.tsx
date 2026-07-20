'use client'

import { useModal } from './ModalContext'
import { MessageSquare } from 'lucide-react'

export default function FabButton() {
  const { openModal } = useModal()

  return (
    <div className="main3-fab">
      <div className="chatbot-badge" onClick={() => openModal('chat')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <MessageSquare size={16} /> 실시간 챗봇 문의
      </div>
    </div>
  )
}
