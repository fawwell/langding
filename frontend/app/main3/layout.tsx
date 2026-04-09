import './main3.css'
import { ModalProvider } from '@/components/main3/ModalContext'
import Header from '@/components/main3/Header'
import ProposalModal from '@/components/main3/ProposalModal'
import ChatModal from '@/components/main3/ChatModal'
import FabButton from '@/components/main3/FabButton'
import { ReactNode } from 'react'

export const metadata = {
  title: 'FaWW - 토탈 피지컬케어 솔루션 그룹',
  description: '신체적, 정신적, 사회적 건강의 조화를 추구하는 피지컬케어 전문 그룹',
}

export default function Main3Layout({ children }: { children: ReactNode }) {
  return (
    <div className="main3">
      <ModalProvider>
        <Header />
        {children}
        <ProposalModal />
        <ChatModal />
        <FabButton />
      </ModalProvider>
    </div>
  )
}
