'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  target: number
  format?: boolean
}

export default function CountUp({ target, format = false }: CountUpProps) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const duration = 2000
            const increment = target / (duration / 16)
            let current = 0

            const update = () => {
              current += increment
              if (current < target) {
                setValue(Math.ceil(current))
                requestAnimationFrame(update)
              } else {
                setValue(target)
              }
            }
            update()
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {format ? value.toLocaleString() : value}
    </span>
  )
}
