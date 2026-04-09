'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useModal } from './ModalContext'

export default function Header() {
  const pathname = usePathname()
  const { openModal } = useModal()

  const navItems = [
    { href: '/main3', label: '파우 소개' },
    { href: '/main3/ai', label: '스마트 AI 체형분석' },
    { href: '/main3/physical', label: '피지컬케어' },
    { href: '/main3/mall', label: '피지컬케어 mall' },
  ]

  const isActive = (href: string) => {
    if (href === '/main3') return pathname === '/main3'
    return pathname.startsWith(href)
  }

  return (
    <header className="main3-header">
      <Link href="/main3" className="logo">FaWW</Link>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={isActive(item.href) ? 'active-nav' : ''}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <button className="consult-btn" onClick={() => openModal('proposal')}>
          도입 및 제휴 문의
        </button>
      </div>
    </header>
  )
}
