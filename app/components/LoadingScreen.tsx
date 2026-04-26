'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { Lang } from '../translations'

/* ══════════════════════════════════════════════════════════
   SİNEMATİK LOADING SCREEN
   Perde açılır tarzı: harfler düşer → perde yukarı kalkıyor
   - prefers-reduced-motion → animasyonsuz fade
══════════════════════════════════════════════════════════ */
export default function LoadingScreen({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion()
  const letters = ['K', 'I', 'N', 'E', 'T', 'I', 'C']

  // Reduced motion: tek karelik fade overlay
  if (reduce) {
    return (
      <motion.div
        key="loader"
        className="fixed inset-0 z-[300] bg-black flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        role="status"
        aria-label={lang === 'tr' ? 'Sayfa yükleniyor' : 'Loading page'}
      >
        <span className="text-3xl md:text-5xl font-display font-black text-white tracking-tight">
          KINETIC<span className="text-white/30">.</span>
        </span>
      </motion.div>
    )
  }

  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center overflow-hidden select-none"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
      role="status"
      aria-label={lang === 'tr' ? 'Sayfa yükleniyor' : 'Loading page'}
    >
      {/* Köşe decor */}
      <motion.div
        className="absolute top-8 right-8 md:top-12 md:right-12 text-white/20 text-xs font-bold tracking-[0.3em] uppercase"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
      >
        {lang === 'tr' ? 'Performans' : 'Performance'}
      </motion.div>

      {/* KINETIC harfleri */}
      <div className="flex items-end gap-1 md:gap-3 mb-4 overflow-hidden" aria-hidden="true">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-display font-black text-white leading-none tracking-tight"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.07, duration: 0.65, ease: [0.33, 1, 0.68, 1] }}
          >
            {letter}
          </motion.span>
        ))}
        <motion.span
          className="text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-display font-black text-white/20 leading-none ml-1"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.56, duration: 0.65, ease: [0.33, 1, 0.68, 1] }}
        >.</motion.span>
      </div>

      <motion.p
        className="text-white/40 text-[10px] sm:text-xs font-bold tracking-[0.5em] uppercase"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5 }}
      >
        {lang === 'tr' ? 'Spor & Performans Yönetimi' : 'Sport & Performance Management'}
      </motion.p>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10">
        <motion.div
          className="h-full bg-white"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.3, ease: [0.25, 1, 0.5, 1] }}
        />
      </div>

      <motion.div
        className="absolute bottom-6 right-8 md:bottom-8 md:right-12 text-white/30 text-xs font-bold font-display tabular-nums"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
      >
        <CountUp />
      </motion.div>
    </motion.div>
  )
}

function CountUp() {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const dur = 2300
    const raf = () => {
      const p = Math.min((Date.now() - start) / dur, 1)
      setVal(Math.round(p * 100))
      if (p < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])
  return <span>{val}%</span>
}
