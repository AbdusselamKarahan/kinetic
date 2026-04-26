'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Viewport'a girince sayıyı 0'dan hedef değere kadar animate eder.
 * Sayısal kısmı parse eder, harf/sembol prefix/suffix'i korur.
 *   "120+"  → 0..120 + "+"
 *   "%94"   → "%" + 0..94
 *   "3.2s"  → 0..3.2 (1 ondalık) + "s"
 *   "10+"   → 0..10 + "+"
 */
export default function CountUp({
  value,
  duration = 1500,
  className = '',
}: {
  value: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)
  const startedRef = useRef(false)

  // Sayıyı parse et: prefix + number + suffix
  const match = value.match(/^([^\d.-]*)([\d.]+)(.*)$/)
  const prefix = match?.[1] ?? ''
  const numStr = match?.[2] ?? '0'
  const suffix = match?.[3] ?? ''
  const target = parseFloat(numStr)
  const decimals = numStr.includes('.') ? (numStr.split('.')[1]?.length ?? 0) : 0

  useEffect(() => {
    const el = ref.current
    if (!el || isNaN(target)) return

    if (typeof IntersectionObserver === 'undefined') {
      setDisplay(value)
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }

    // Initial: 0'dan başla
    setDisplay(`${prefix}${(0).toFixed(decimals)}${suffix}`)

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (!e.isIntersecting || startedRef.current) return
          startedRef.current = true

          const start = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1)
            // ease-out cubic
            const eased = 1 - Math.pow(1 - p, 3)
            const current = target * eased
            setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`)
            if (p < 1) requestAnimationFrame(tick)
            else setDisplay(value)
          }
          requestAnimationFrame(tick)
          obs.disconnect()
        })
      },
      { threshold: 0.3 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [target, prefix, suffix, decimals, duration, value])

  return <span ref={ref} className={`tabular-nums ${className}`}>{display}</span>
}
