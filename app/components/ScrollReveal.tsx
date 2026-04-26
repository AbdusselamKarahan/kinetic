'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Görseli/içeriği viewport'a girince soluk-renkten tam-renge yumuşakça çevirir.
 * IntersectionObserver tabanlı — framer-motion filter animasyonundan daha güvenilir.
 * fill={true} kullanıldığında parent'ın `relative` olması gerekir.
 */
export default function ScrollReveal({
  children,
  className = '',
  fill = false,
  amount = 0.2,
  duration = 1.6,
  startGray = 100,
  startBrightness = 0.92,
  startOpacity = 0.8,
}: {
  children: ReactNode
  className?: string
  fill?: boolean
  amount?: number
  duration?: number
  startGray?: number
  startBrightness?: number
  startOpacity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // SSR'da window yok; client'a düşene kadar bekle
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setRevealed(true)
      return
    }

    // Reduced motion: doğrudan tam renk göster
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true)
      return
    }

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setRevealed(true)
            obs.disconnect()
          }
        })
      },
      { threshold: amount, rootMargin: '0px 0px -10% 0px' },
    )

    obs.observe(el)

    // Element zaten viewport'tayken (above-the-fold) küçük bir gecikmeyle aç
    // ki kullanıcı geçişi fark etsin
    const visibleNow = el.getBoundingClientRect().top < window.innerHeight
    if (visibleNow) {
      const t = setTimeout(() => setRevealed(true), 120)
      return () => { obs.disconnect(); clearTimeout(t) }
    }

    return () => obs.disconnect()
  }, [amount])

  return (
    <div
      ref={ref}
      className={`${fill ? 'absolute inset-0' : ''} ${className}`}
      style={{
        filter: revealed
          ? 'grayscale(0%) brightness(1)'
          : `grayscale(${startGray}%) brightness(${startBrightness})`,
        opacity: revealed ? 1 : startOpacity,
        transition: `filter ${duration}s cubic-bezier(0.22, 1, 0.36, 1), opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1)`,
        willChange: 'filter, opacity',
      }}
    >
      {children}
    </div>
  )
}
