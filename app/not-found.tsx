import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 – Sayfa Bulunamadı',
  description: 'Aradığınız sayfa mevcut değil.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center font-sans selection:bg-white selection:text-black overflow-hidden">
      {/* Dekor arka plan */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span className="text-[20rem] md:text-[30rem] font-display font-black text-white/[0.03] leading-none">404</span>
      </div>

      <div className="relative z-10 max-w-lg">
        <p className="text-xs font-bold tracking-[0.4em] uppercase text-white/30 mb-6">KINETIC Performans</p>

        <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter mb-4">
          Kayıp<span className="text-white/20">.</span>
        </h1>

        <p className="text-gray-400 font-medium text-lg md:text-xl leading-relaxed mb-10">
          Aradığınız sayfa bulunamadı. Antrenman sahasına dönme vakti.
        </p>

        <Link
          href="/"
          className="inline-flex items-center bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors shadow-2xl"
          style={{ minHeight: 52 }}
        >
          ← Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  )
}
