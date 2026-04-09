'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface RevealWrapperProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function RevealWrapper({ children, className = '', style }: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </div>
  )
}
