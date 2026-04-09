'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useModal } from './ModalContext'

const navItems = [
  { href: '/main3', label: '파우 소개' },
  { href: '/main3/ai', label: '스마트 AI 체형분석' },
  { href: '/main3/physical', label: '피지컬케어' },
  { href: '/main3/mall', label: '피지컬케어 mall' },
]

export default function Header() {
  const pathname = usePathname()
  const { openModal } = useModal()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/main3') return pathname === '/main3'
    return pathname.startsWith(href)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="main3-header">
        <Link href="/main3" className="logo" onClick={closeMenu}>FaWW</Link>

        {/* 데스크톱 nav */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={isActive(item.href) ? 'active-nav' : ''}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="consult-btn" onClick={() => openModal('proposal')}>
            도입 및 제휴 문의
          </button>
          {/* 햄버거 버튼 */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="메뉴 열기"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* 모바일 드로어 */}
      <nav className={`main3-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? 'active-nav' : ''}
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        ))}
        <button
          className="mobile-consult-btn"
          onClick={() => { closeMenu(); openModal('proposal') }}
        >
          도입 및 제휴 문의
        </button>
      </nav>

      {/* 메뉴 열릴 때 배경 딤처리 */}
      {menuOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: 'fixed', inset: 0,
            zIndex: 998,
            background: 'rgba(0,0,0,0.25)',
          }}
        />
      )}
    </>
  )
}
