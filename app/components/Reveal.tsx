'use client'

import { useEffect, useRef, useState, type ReactNode, type CSSProperties, type ElementType, type Ref } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade' | 'pop'

/**
 * Yeniden kullanılabilir scroll-triggered reveal wrapper.
 * IntersectionObserver tabanlı — framer-motion whileInView'dan daha güvenilir.
 *
 * Kullanım:
 *   <Reveal direction="up" delay={0.1}> ... </Reveal>
 */
export default function Reveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 50,
  amount = 0.15,
  rootMargin = '0px 0px -8% 0px',
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  direction?: Direction
  delay?: number
  duration?: number
  distance?: number
  amount?: number
  rootMargin?: string
  as?: ElementType
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setShown(true)
            obs.disconnect()
          }
        })
      },
      { threshold: amount, rootMargin },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [amount, rootMargin])

  // Initial transform: yön bazlı
  const off = (() => {
    switch (direction) {
      case 'up':    return `translate3d(0, ${distance}px, 0)`
      case 'down':  return `translate3d(0, -${distance}px, 0)`
      case 'left':  return `translate3d(${distance}px, 0, 0)`
      case 'right': return `translate3d(-${distance}px, 0, 0)`
      case 'pop':   return `translate3d(0, ${distance / 2}px, 0) scale(0.94)`
      case 'fade':
      default:      return 'translate3d(0, 0, 0)'
    }
  })()

  const style: CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? 'translate3d(0,0,0) scale(1)' : off,
    transition: `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
    willChange: 'opacity, transform',
  }

  // as prop ile dinamik tag — ref forwarding için generic cast
  const Component = Tag as 'div'
  return (
    <Component ref={ref as React.Ref<HTMLDivElement>} className={className} style={style}>
      {children}
    </Component>
  )
}
