'use client'

import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Plus, ChevronDown, Quote, Instagram, Play, Target, Menu, X, Sun, Moon, ChevronUp } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { blogPosts } from './blog/data'
import CookieBanner from './components/CookieBanner'
import LoadingScreen from './components/LoadingScreen'
import ScrollReveal from './components/ScrollReveal'
import Reveal from './components/Reveal'
import CountUp from './components/CountUp'
import { translations, statsData, type Lang } from './translations'

/* ══════════════════════════════════════════════════════════
   ANA SAYFA
══════════════════════════════════════════════════════════ */
export default function Home() {
  const [isLoading, setIsLoading]         = useState(true)
  const [lang, setLang]                   = useState<Lang>('tr')
  const [isDark, setIsDark]               = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState('')
  const [scrolled, setScrolled]           = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq]             = useState<number | null>(null)
  const [pageReady, setPageReady]         = useState(false)
  const reduceMotion = useReducedMotion()

  // Hero parallax: scroll'a göre görsel hafif yukarı kayar
  const { scrollY } = useScroll()
  const heroParallaxY = useTransform(scrollY, [0, 800], ['0%', '15%'])

  const t = translations[lang]

  /* ── Yükleme: readyState-based + min süre + reduced motion fast-path ── */
  useEffect(() => {
    if (reduceMotion) {
      const t = setTimeout(() => setIsLoading(false), 350)
      return () => clearTimeout(t)
    }
    const MIN_MS = 2400
    const MAX_MS = 3600
    const start = Date.now()
    let done = false

    const finish = () => {
      if (done) return
      done = true
      const elapsed = Date.now() - start
      const remaining = Math.max(0, MIN_MS - elapsed)
      setTimeout(() => setIsLoading(false), remaining)
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish, { once: true })
    }
    const fallback = setTimeout(finish, MAX_MS)

    return () => {
      window.removeEventListener('load', finish)
      clearTimeout(fallback)
    }
  }, [reduceMotion])

  /* ── Loading bittikten sonra perde animasyonunun sonunu bekle ── */
  useEffect(() => {
    if (isLoading) { setPageReady(false); return }
    const delay = reduceMotion ? 50 : 700 // perde yukarı kalkma süresi (~0.9s'den biraz önce reveal başlasın)
    const t = setTimeout(() => setPageReady(true), delay)
    return () => clearTimeout(t)
  }, [isLoading, reduceMotion])

  /* ── Tema: localStorage'dan oku ── */
  useEffect(() => {
    const saved = localStorage.getItem('kinetic-theme')
    if (saved === 'dark') { setIsDark(true); document.documentElement.setAttribute('data-theme', 'dark') }
  }, [])

  /* ── Tema değiştir ── */
  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const next = !prev
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
      localStorage.setItem('kinetic-theme', next ? 'dark' : 'light')
      return next
    })
  }, [])

  /* ── Dil değiştir ── */
  const toggleLang = useCallback((l: Lang) => {
    setLang(l)
    setSelectedProgram('')
  }, [])

  /* ── Scroll ── */
  const handleScroll = useCallback(() => {
    const y = window.scrollY
    setScrolled(y > 50)
    setShowScrollTop(y > 500)
  }, [])
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  /* ── Mobil menü body lock ── */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  /* ── Tema renk helpers ── */
  const bg   = isDark ? '#0a0a0a' : '#f9f9f9'
  const surf  = isDark ? '#111111' : '#ffffff'
  const surf2 = isDark ? 'rgba(26,26,26,0.8)' : 'rgba(229,229,229,0.5)'
  const clr   = isDark ? '#f0f0f0' : '#0a0a0a'
  const muted = isDark ? '#9ca3af' : '#6b7280'
  const bord  = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'

  const navLinks = [
    { href: '#programlar', label: t.nav.programs },
    { href: '#hikayeler',  label: t.nav.stories  },
    { href: '#koc',        label: t.nav.trainer  },
    { href: '#blog',       label: t.nav.blog     },
  ]

  /* ─────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── SİNEMATİK LOADING ── */}
      <AnimatePresence>
        {isLoading && <LoadingScreen lang={lang} />}
      </AnimatePresence>

      {/* ── SCROLL TO TOP ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={t.scrollTop}
            className="fixed bottom-24 right-4 md:bottom-28 md:right-10 z-[100] w-12 h-12 rounded-full shadow-xl flex items-center justify-center border touch-manipulation"
            style={{ background: surf, color: clr, borderColor: bord }}
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── COOKIE BANNER ── */}
      <CookieBanner lang={lang} />

      {/* ── SABİT WHATSAPP ── */}
      <motion.a
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        href="https://wa.me/905337013723?text=Merhaba"
        target="_blank" rel="noreferrer noopener"
        aria-label={t.nav.reachMe}
        className="fixed bottom-6 right-4 md:bottom-10 md:right-10 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] flex items-center justify-center group hover:bg-[#20bd5a] transition-colors touch-manipulation"
        style={{ minWidth: 56, minHeight: 56 }}
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.885-.653-1.482-1.459-1.656-1.756-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
        <span className="absolute right-16 md:right-20 bg-black text-white text-sm font-bold py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
          {t.nav.reachMe}
        </span>
      </motion.a>

      {/* ══════════════════════════════════════
          WRAPPER — CSS variable bağlı renkler
      ══════════════════════════════════════ */}
      <div
        className="min-h-screen font-sans relative overflow-x-hidden"
        style={{ backgroundColor: bg, color: clr }}
      >
        {/* ── NAVBAR ── */}
        <header role="banner">
          <motion.nav
            aria-label={lang === 'tr' ? 'Ana Navigasyon' : 'Main Navigation'}
            className="fixed w-full z-50 flex justify-center"
            initial={{ opacity: 0, y: -32 }}
            animate={{
              opacity: pageReady ? 1 : 0,
              y: pageReady ? 0 : -32,
              top: scrolled ? 16 : 0,
              paddingLeft: scrolled ? 16 : 16,
              paddingRight: scrolled ? 16 : 16,
              paddingTop: scrolled ? 0 : 20,
              paddingBottom: scrolled ? 0 : 20,
            }}
            transition={{
              opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              y:       { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              default: { type: 'spring', stiffness: 260, damping: 28, mass: 0.9 },
            }}
          >
            <motion.div
              layout
              initial={false}
              animate={{
                scale: scrolled ? 1 : 1,
                y: scrolled ? 0 : 0,
                maxWidth: scrolled ? 1024 : 1536,
                paddingLeft: scrolled ? 16 : 0,
                paddingRight: scrolled ? 16 : 0,
                paddingTop: scrolled ? 10 : 0,
                paddingBottom: scrolled ? 10 : 0,
                borderRadius: scrolled ? 9999 : 0,
                backgroundColor: scrolled
                  ? (isDark ? 'rgba(15,15,15,0.78)' : 'rgba(255,255,255,0.78)')
                  : 'rgba(255,255,255,0)',
                borderColor: scrolled
                  ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)')
                  : 'rgba(0,0,0,0)',
                boxShadow: scrolled
                  ? '0 10px 40px -10px rgba(0,0,0,0.18), 0 4px 12px -4px rgba(0,0,0,0.08)'
                  : '0 0 0 0 rgba(0,0,0,0)',
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 26,
                mass: 0.8,
                layout: { type: 'spring', stiffness: 280, damping: 26, mass: 0.8 },
              }}
              className={`w-full flex justify-between items-center gap-3 border ${scrolled ? 'backdrop-blur-2xl' : ''}`}
              style={{ willChange: 'transform, max-width, padding' }}
            >
              {/* Logo */}
              <motion.a
                href="#"
                aria-label="KINETIC Ana Sayfa"
                className="font-display font-black tracking-tight touch-manipulation py-2 flex-shrink-0 overflow-hidden whitespace-nowrap"
                style={{ color: clr }}
                animate={{ fontSize: scrolled ? '1.2rem' : '1.65rem', letterSpacing: scrolled ? '0.05em' : '0.13em' }}
                transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              >
                K I N E T I C <span style={{ color: muted }}>.</span>
              </motion.a>

              {/* Desktop nav links */}
              <motion.ul
                className="hidden md:flex space-x-7 text-base font-semibold tracking-wide"
                role="list"
                initial="hidden"
                animate={pageReady ? 'show' : 'hidden'}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
                }}
              >
                {navLinks.map(link => (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <a href={link.href} className="hover:opacity-60 transition-opacity py-2 block" style={{ color: clr }}>{link.label}</a>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Desktop controls: Lang + Theme + CTA */}
              <motion.div
                className="hidden md:flex items-center gap-3 flex-shrink-0"
                initial={{ opacity: 0, y: -10 }}
                animate={pageReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Dil toggle */}
                <div className="flex items-center rounded-full border overflow-hidden" style={{ borderColor: bord }}>
                  {(['tr', 'en'] as Lang[]).map(l => (
                    <button
                      key={l}
                      onClick={() => toggleLang(l)}
                      className="px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-colors touch-manipulation"
                      style={{
                        background: lang === l ? clr : 'transparent',
                        color: lang === l ? bg : muted,
                      }}
                      aria-pressed={lang === l}
                      aria-label={`Switch to ${l === 'tr' ? 'Turkish' : 'English'}`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Tema toggle */}
                <button
                  onClick={toggleTheme}
                  className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors touch-manipulation overflow-hidden relative"
                  style={{ borderColor: bord, color: clr, background: 'transparent' }}
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isDark ? (
                      <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <Sun className="w-4 h-4" />
                      </motion.span>
                    ) : (
                      <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <Moon className="w-4 h-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                {/* CTA */}
                <motion.a
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  href="#iletisim"
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-bold shadow-xl"
                  style={{ background: clr, color: bg }}
                >
                  {t.nav.cta}
                </motion.a>
              </motion.div>

              {/* Mobil hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-11 h-11 rounded-full touch-manipulation"
                style={{ background: clr, color: bg }}
                aria-label={mobileMenuOpen ? t.nav.menuClose : t.nav.menuOpen}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </motion.div>
          </motion.nav>

          {/* ── MOBİL MENÜ OVERLAY ── */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-40 flex flex-col px-6 pt-28 pb-10"
                style={{ background: surf }}
              >
                <nav aria-label={lang === 'tr' ? 'Mobil Navigasyon' : 'Mobile Navigation'}>
                  <ul className="space-y-1" role="list">
                    {navLinks.map((link, i) => (
                      <motion.li key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                        <a href={link.href} onClick={() => setMobileMenuOpen(false)}
                          className="flex items-baseline justify-between py-3 border-b hover:opacity-60 transition-opacity group"
                          style={{ color: clr, borderColor: bord }}>
                          <span className="flex items-baseline gap-3">
                            <span className="text-xs font-bold tabular-nums tracking-widest" style={{ color: muted }}>0{i + 1}</span>
                            <span className="text-3xl sm:text-4xl font-display font-black">{link.label}</span>
                          </span>
                          <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" aria-hidden="true" />
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Mobil: Dil + Tema kontrollerı */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex items-center rounded-full border overflow-hidden" style={{ borderColor: bord }}>
                    {(['tr', 'en'] as Lang[]).map(l => (
                      <button key={l} onClick={() => { toggleLang(l); }}
                        className="px-4 py-2 text-sm font-black uppercase tracking-wider transition-colors touch-manipulation"
                        style={{ background: lang === l ? clr : 'transparent', color: lang === l ? bg : muted }}
                      >{l.toUpperCase()}</button>
                    ))}
                  </div>
                  <button onClick={toggleTheme}
                    className="w-11 h-11 rounded-full flex items-center justify-center border touch-manipulation"
                    style={{ borderColor: bord, color: clr }}
                    aria-label={isDark ? 'Light mode' : 'Dark mode'}
                  >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                </div>

                <a href="#iletisim" onClick={() => setMobileMenuOpen(false)}
                  className="mt-6 w-full py-5 rounded-full text-center text-lg font-black uppercase tracking-widest touch-manipulation"
                  style={{ background: clr, color: bg }}>
                  {t.nav.cta}
                </a>
                <a href="https://wa.me/905337013723" target="_blank" rel="noreferrer noopener"
                  className="mt-4 w-full bg-[#25D366] text-white py-5 rounded-full text-center text-lg font-black touch-manipulation">
                  {t.nav.whatsapp}
                </a>

                {/* Sosyal ikonlar */}
                <div className="mt-auto pt-8 flex items-center justify-center gap-3 border-t" style={{ borderColor: bord }}>
                  <a href="https://instagram.com/kineticperformans" target="_blank" rel="noreferrer noopener"
                    aria-label="Instagram"
                    className="w-12 h-12 rounded-full flex items-center justify-center border hover:opacity-70 transition-opacity touch-manipulation"
                    style={{ borderColor: bord, color: clr }}>
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="mailto:info@kineticperformans.com"
                    aria-label="Email"
                    className="w-12 h-12 rounded-full flex items-center justify-center border hover:opacity-70 transition-opacity touch-manipulation"
                    style={{ borderColor: bord, color: clr }}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth={2}>
                      <path d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a href="tel:+905337013723"
                    aria-label="Telefon"
                    className="w-12 h-12 rounded-full flex items-center justify-center border hover:opacity-70 transition-opacity touch-manipulation"
                    style={{ borderColor: bord, color: clr }}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth={2}>
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main>
          {/* ── HERO ── */}
          <section aria-label={lang === 'tr' ? 'Hero Bölümü' : 'Hero Section'} className="pt-28 pb-10 px-3 lg:px-8 max-w-[100rem] mx-auto">
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.98 }}
              animate={pageReady ? { y: 0, opacity: 1, scale: 1 } : { y: 60, opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="relative w-full min-h-[620px] h-[82vh] max-h-[920px] md:h-[85vh] md:max-h-none rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-black flex items-end p-6 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] group"
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                  style={{ position: 'absolute', top: '-7%', left: '-7%', width: '114%', height: '114%', y: heroParallaxY }}
                >
                  <ScrollReveal fill duration={1.8} amount={0.2}>
                    <Image src="/atletizm.jpg" alt={t.hero.imgAlt}
                      fill priority
                      sizes="(min-width: 1600px) 1536px, 100vw"
                      style={{ objectPosition: '23% center' }}
                      className="object-cover" />
                  </ScrollReveal>
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" aria-hidden="true" />
              </div>
              <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10">
                <div className="max-w-4xl">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="flex flex-wrap gap-3 mb-4 md:mb-6">
                    <span className="flex items-center px-4 py-1.5 rounded-full border border-white/30 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md bg-white/10">
                      <Target className="w-3 h-3 mr-2" aria-hidden="true" /> {t.hero.tag}
                    </span>
                  </motion.div>
                  <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-5xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-display font-black text-white leading-[0.95] tracking-tighter uppercase mb-2">
                    {t.hero.line1}
                  </motion.h1>
                  <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-5xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-display font-black text-white leading-[0.95] tracking-tighter uppercase">
                    {t.hero.line2}
                  </motion.p>
                </div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
                  className="md:w-1/3 flex flex-col items-start md:items-end text-left md:text-right">
                  <p className="text-gray-300 text-base md:text-xl font-medium leading-relaxed mb-6 md:mb-8">{t.hero.desc}</p>
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#iletisim"
                    className="bg-white text-black px-7 py-4 rounded-full text-sm font-black uppercase tracking-widest flex items-center hover:bg-gray-200 transition-colors shadow-2xl touch-manipulation"
                    style={{ minHeight: 52 }}>
                    {t.hero.cta} <ArrowRight className="w-5 h-5 ml-3" aria-hidden="true" />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* ── VIDEO ── */}
          <section aria-label={lang === 'tr' ? 'Aksiyon Videosu' : 'Action Video'}
            className="relative h-[50vh] md:h-[60vh] overflow-hidden flex items-center justify-center group border-y border-white/10 bg-black">
            <div className="absolute inset-0 z-0" aria-hidden="true">
              <ScrollReveal fill duration={1.6} amount={0.2} startBrightness={0.7} startOpacity={0.4}>
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src="/aksiyon.mp4" type="video/mp4" />
                </video>
              </ScrollReveal>
            </div>
            <div className="relative z-10 text-center px-6">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm mb-6 cursor-pointer hover:bg-white/10 transition-colors touch-manipulation">
                <Play className="w-7 h-7 md:w-8 md:h-8 text-white ml-1" aria-hidden="true" />
              </motion.div>
              <h2 className="text-3xl md:text-6xl font-display font-black text-white tracking-tighter uppercase mb-4">{t.video.title}</h2>
              <p className="text-gray-400 text-base md:text-lg font-medium max-w-2xl mx-auto">{t.video.desc}</p>
            </div>
          </section>

          {/* ── PROGRAMLAR ── */}
          <section id="programlar" aria-label={lang === 'tr' ? 'Programlar' : 'Programs'} className="py-16 md:py-24 bg-black text-white px-4 lg:px-12 overflow-hidden">
            <div className="max-w-screen-2xl mx-auto relative">
              <div className="absolute top-0 right-0 text-[10rem] md:text-[15rem] font-display font-black text-white/5 pointer-events-none select-none -translate-y-20 translate-x-10" aria-hidden="true">PRO</div>
              <div className="mb-12 md:mb-24 md:flex justify-between items-end border-b border-white/20 pb-8 relative z-10">
                <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight">{t.programs.title}</h2>
                <p className="text-gray-400 max-w-md mt-4 md:mt-0 font-medium text-lg md:text-xl leading-relaxed">{t.programs.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
                {t.programs.items.map((card, i) => (
                  <Reveal key={i} as="article" direction="up" delay={i * 0.12} duration={0.8} distance={60}
                    className={`relative border rounded-2xl p-8 md:p-12 hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] group min-h-[380px] md:min-h-[450px] flex flex-col justify-between overflow-hidden cursor-pointer ${
                      card.featured ? 'border-white/30 bg-gradient-to-br from-[#1a1a1a] to-[#101010] ring-1 ring-white/10 hover:border-white/50 md:-translate-y-8' : 'border-white/10 bg-[#0f0f0f] hover:border-white/30'
                    }`}>
                    {card.featured && (
                      <span className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-white text-black text-[10px] font-black tracking-[0.2em] uppercase shadow-lg">
                        {lang === 'tr' ? '★ Önerilen' : '★ Recommended'}
                      </span>
                    )}
                    <span className="absolute -bottom-10 -right-4 text-[9rem] md:text-[12rem] font-display font-black text-white/5 pointer-events-none" aria-hidden="true">{card.num}</span>
                    <div className="relative z-10">
                      <span className={`text-xs font-bold tracking-widest uppercase mb-6 md:mb-8 block border-b pb-4 ${card.featured ? 'text-white border-white/20' : 'text-gray-500 border-white/10'}`}>{card.tag}</span>
                      <h3 className="text-2xl md:text-4xl font-display font-black mb-4 md:mb-6 group-hover:text-gray-200 transition-colors duration-300 whitespace-pre-line">{card.title}</h3>
                      <p className={`font-medium text-base md:text-lg leading-relaxed group-hover:text-gray-300 transition-colors ${card.featured ? 'text-gray-300' : 'text-gray-400'}`}>{card.desc}</p>
                    </div>
                    <a href="#iletisim" className="text-white text-sm md:text-base font-bold uppercase tracking-wider flex items-center mt-8 md:mt-10 w-fit relative z-10 touch-manipulation" style={{ minHeight: 44 }}>
                      {card.cta} <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true" />
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── BAŞARI HİKAYELERİ ── */}
          <section id="hikayeler" aria-label={t.reviews.title} className="py-20 md:py-32 bg-[#050505] text-white px-4 lg:px-12 border-t border-white/10">
            <div className="max-w-screen-2xl mx-auto">
              <header className="text-center mb-16 md:mb-24">
                <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-6">{t.reviews.title}</h2>
                <p className="text-gray-400 font-medium text-lg md:text-xl max-w-2xl mx-auto">{t.reviews.subtitle}</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {t.reviews.items.map((review, i) => (
                  <Reveal key={i} as="blockquote" direction="up" delay={i * 0.12} duration={0.7} distance={50}
                    className={`bg-[#111] p-8 md:p-10 rounded-3xl relative border border-white/5 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)] cursor-default group ${review.offset}`}>
                    <Quote className="w-10 h-10 md:w-12 md:h-12 text-white/5 absolute top-6 right-6 md:top-8 md:right-8 group-hover:text-white/20 group-hover:rotate-12 transition-all duration-500" aria-hidden="true" />
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 md:mb-10 font-light italic relative z-10 group-hover:text-white transition-colors duration-300">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <footer className="flex items-center">
                      <div className="w-11 h-11 bg-white/10 rounded-full mr-4 flex items-center justify-center font-bold text-lg group-hover:bg-white group-hover:text-black transition-colors duration-300 flex-shrink-0" aria-hidden="true">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <cite className="font-bold text-base md:text-lg not-italic">{review.author}</cite>
                        <span className="text-xs md:text-sm text-gray-500 uppercase tracking-widest block mt-1">{review.title}</span>
                      </div>
                    </footer>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── SÜREÇ ── */}
          <section id="surec" aria-label={lang === 'tr' ? 'Antrenman Süreci' : 'Training Process'} className="py-20 md:py-32 px-4 lg:px-12 max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight mb-6 md:mb-8 leading-tight" style={{ color: clr }}>{t.process.title}</h2>
                <p className="text-xl md:text-2xl font-medium mb-10 md:mb-12 leading-relaxed" style={{ color: muted }}>{t.process.subtitle}</p>
                <ol className="space-y-10 md:space-y-12">
                  {t.process.steps.map((step, i) => (
                    <Reveal key={step.n} as="li" direction="right" delay={i * 0.15} duration={0.7} distance={40} className="flex">
                      <div className="flex-shrink-0 mr-6 md:mr-8">
                        <span className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-display font-black text-lg md:text-xl" aria-hidden="true"
                          style={{ border: `2px solid ${clr}`, background: step.filled ? clr : 'transparent', color: step.filled ? bg : clr }}>
                          {step.n}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3" style={{ color: clr }}>{step.title}</h3>
                        <p className="font-medium text-base md:text-lg leading-relaxed" style={{ color: muted }}>{step.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </ol>
              </div>
              <div className="h-[450px] md:h-[750px] rounded-3xl overflow-hidden relative shadow-xl" style={{ background: isDark ? '#1a1a1a' : '#e5e5e5' }}>
                <ScrollReveal fill duration={1.7}>
                  <Image src="/performance.jpg" alt={t.process.imgAlt}
                    fill sizes="(min-width: 1024px) 50vw, 100vw"
                    style={{ objectPosition: 'center 35%' }}
                    className="object-cover" />
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ── ANTRENÖR ── */}
          <section id="koc" aria-label={lang === 'tr' ? 'Baş Antrenör' : 'Head Coach'} className="py-20 md:py-32 px-4 lg:px-12" style={{ background: surf2 }}>
            <div className="max-w-screen-2xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                  className="w-full aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden relative shadow-xl" style={{ background: isDark ? '#1a1a1a' : '#d1d1d1' }}>
                  <ScrollReveal fill duration={1.7}>
                    <Image src="/antrenör.jpg" alt={t.trainer.imgAlt}
                      fill sizes="(min-width: 1024px) 50vw, 100vw"
                      style={{ objectPosition: 'center 25%' }}
                      className="object-cover" />
                  </ScrollReveal>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="pl-0 lg:pl-12">
                  <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: muted }}>{t.trainer.role}</span>
                  <h2 className="text-4xl md:text-7xl font-display font-black mb-8 md:mb-10 leading-none tracking-tighter whitespace-pre-line" style={{ color: clr }}>{t.trainer.name}</h2>
                  <div className="space-y-5 font-medium text-lg md:text-xl leading-relaxed mb-10 md:mb-12" style={{ color: isDark ? 'rgba(240,240,240,0.8)' : 'rgba(10,10,10,0.8)' }}>
                    <p>{t.trainer.bio1}</p>
                    <p>{t.trainer.bio2}</p>
                  </div>
                  <ul className="flex flex-wrap gap-3 md:gap-4" role="list">
                    {t.trainer.badges.map((badge, i) => (
                      <Reveal key={badge} as="li" direction="pop" delay={0.2 + i * 0.1} duration={0.55} distance={20}>
                        <span className="px-5 py-3 rounded-full text-sm font-bold uppercase tracking-wider block border" style={{ background: surf, color: clr, borderColor: bord }}>
                          {badge}
                        </span>
                      </Reveal>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── BLOG ── */}
          <section id="blog" aria-label={t.blog.title} className="py-16 md:py-24 px-4 lg:px-12 border-t" style={{ background: bg, borderColor: bord }}>
            <div className="max-w-screen-2xl mx-auto">
              <div className="mb-12 md:mb-16 md:flex justify-between items-end border-b pb-8" style={{ borderColor: bord }}>
                <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight" style={{ color: clr }}>{t.blog.title}</h2>
                <Link href="/blog" className="font-bold uppercase tracking-widest border-b pb-1 hover:opacity-60 transition-opacity hidden md:block touch-manipulation"
                  style={{ color: clr, borderColor: clr }}>
                  {t.blog.seeAll}
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
                {blogPosts.map((post, i) => (
                  <Reveal key={i} direction="up" delay={i * 0.12} duration={0.75} distance={50}>
                  <Link href={`/blog/${post.id}`} className="group cursor-pointer block">
                    <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 md:mb-6 relative" style={{ background: isDark ? '#1a1a1a' : '#e5e5e5' }}>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-500 z-10" aria-hidden="true" />
                      <ScrollReveal fill duration={1.5}>
                        <Image src={post.image} alt={`${post.title} – blog görseli`}
                          fill sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover" />
                      </ScrollReveal>
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase mb-2 md:mb-3 block" style={{ color: muted }}>{post.category}</span>
                    <h3 className="text-xl md:text-2xl font-bold leading-snug group-hover:opacity-60 transition-opacity" style={{ color: clr }}>{post.title}</h3>
                  </Link>
                  </Reveal>
                ))}
              </div>
              <div className="mt-10 flex justify-center md:hidden">
                <Link href="/blog" className="px-8 py-4 font-bold uppercase tracking-widest rounded-full touch-manipulation" style={{ background: clr, color: bg, minHeight: 52, display:'inline-flex', alignItems:'center' }}>
                  {t.blog.seeAll}
                </Link>
              </div>
            </div>
          </section>

          {/* ── SSS ── */}
          <section id="sss" aria-label={t.faq.title} className="py-16 md:py-24 px-4 lg:px-12 max-w-screen-md mx-auto">
            <header className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight mb-4" style={{ color: clr }}>{t.faq.title}</h2>
              <p className="font-medium text-base md:text-lg" style={{ color: muted }}>{t.faq.subtitle}</p>
            </header>
            <div className="space-y-3 md:space-y-4">
              {t.faq.items.map((faq, i) => (
                <Reveal key={i} direction="up" delay={i * 0.1} duration={0.6} distance={30}
                  className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-5 md:p-6 flex justify-between items-center touch-manipulation hover:opacity-80 transition-opacity"
                    aria-expanded={openFaq === i} style={{ background: surf, minHeight: 64, color: clr }}>
                    <h3 className="text-lg md:text-xl font-bold pr-6">{faq.q}</h3>
                    <Plus className={`w-5 h-5 md:w-6 md:h-6 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`} aria-hidden="true" />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div key="content" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="p-5 md:p-6 pt-0" style={{ background: surf }}>
                          <p className="font-medium text-base md:text-lg leading-relaxed border-t pt-4" style={{ color: muted, borderColor: bord }}>{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              ))}
            </div>
          </section>


          {/* ── PERFORMANS İSTATİSTİKLERİ ── */}
          <section aria-label={lang === 'tr' ? 'Performans İstatistikleri' : 'Performance Stats'} className="py-20 md:py-28 border-t" style={{ borderColor: bord, background: bg }}>
            <div className="max-w-screen-2xl mx-auto px-4 lg:px-12">
              <div className="text-center mb-16 md:mb-20">
                <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-4" style={{ color: clr }}>
                  {statsData[lang].heading}
                </h2>
                <p className="text-lg md:text-xl font-medium" style={{ color: muted }}>{statsData[lang].sub}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                {statsData[lang].items.map((stat, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="rounded-2xl p-6 md:p-8 border text-center group hover:shadow-xl transition-all duration-500"
                    style={{ background: surf, borderColor: bord }}
                  >
                    <div className="text-4xl md:text-6xl font-display font-black mb-2 tracking-tighter group-hover:scale-110 transition-transform duration-300 inline-block" style={{ color: clr }}>
                      <CountUp value={stat.value} duration={1600} />
                    </div>
                    <div className="text-sm md:text-base font-black uppercase tracking-widest mb-2" style={{ color: clr }}>{stat.label}</div>
                    <div className="text-xs md:text-sm font-medium leading-relaxed" style={{ color: muted }}>{stat.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── INSTAGRAM ── */}
          <section aria-label={t.instagram.title} className="bg-black pt-16 md:pt-20 pb-16 md:pb-20 border-t border-white/10">
            <div className="max-w-screen-2xl mx-auto px-4 lg:px-12 mb-10 md:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-3 md:mb-4">{t.instagram.title}</h2>
                <p className="text-gray-400 font-medium text-base md:text-lg">{t.instagram.subtitle}</p>
              </div>
              <a href="https://instagram.com/kineticperformans" target="_blank" rel="noreferrer noopener" aria-label={t.instagram.followLabel}
                className="flex items-center text-white/50 hover:text-white transition-colors font-bold uppercase tracking-widest text-sm border border-white/20 px-6 py-3 rounded-full hover:bg-white/10 touch-manipulation" style={{ minHeight: 48 }}>
                <Instagram className="w-4 h-4 md:w-5 md:h-5 mr-3" aria-hidden="true" /> {t.instagram.follow}
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {[1, 1, 1, 1].map((item, idx) => (
                <div key={idx} className="aspect-square bg-gray-900 relative group overflow-hidden cursor-pointer">
                  <ScrollReveal fill duration={1.4} startOpacity={0.5}>
                    <Image src={`/insta${item}.jpg`} alt={`KINETIC Instagram ${idx + 1}`}
                      fill sizes="(min-width: 768px) 25vw, 50vw"
                      style={{ objectPosition: idx % 2 === 0 ? 'center 30%' : 'center 60%' }}
                      className="object-cover" />
                  </ScrollReveal>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 bg-black/40 backdrop-blur-sm z-10" aria-hidden="true">
                    <Instagram className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── İLETİŞİM ── */}
          <section id="iletisim" aria-label={lang === 'tr' ? 'İletişim Formu' : 'Contact Form'} className="py-24 md:py-32 bg-[#050505] text-white px-4 lg:px-12 border-t border-white/5">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
              <div>
                <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter mb-6 md:mb-8 leading-[1.1] whitespace-pre-line">{t.contact.title}</h2>
                <p className="text-gray-300 font-medium text-lg md:text-xl mb-10 md:mb-12 leading-relaxed">{t.contact.subtitle}</p>
                <address className="not-italic space-y-5 font-medium text-base md:text-lg">
                  <p className="border-b border-white/10 pb-4"><span aria-hidden="true">📍</span> {t.contact.location}</p>
                  <p className="border-b border-white/10 pb-4">
                    <span aria-hidden="true">📞</span>{' '}
                    <a href="tel:+905337013723" className="hover:text-gray-300 transition-colors touch-manipulation" aria-label="+90 533 701 37 23">+90 (533) 701 37 23</a>
                  </p>
                </address>
              </div>
              <div className="bg-[#0f0f0f] p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
                <form action="https://formspree.io/f/xlgwbjdy" method="POST" className="space-y-8 md:space-y-10" aria-label={lang === 'tr' ? 'İletişim formu' : 'Contact form'}>
                  <div>
                    <label htmlFor="isim" className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3 block">{t.contact.nameLabel}</label>
                    <input id="isim" type="text" name="isim" required autoComplete="name"
                      className="w-full bg-transparent border-b-2 border-white/10 py-3 text-base md:text-lg focus:outline-none focus:border-white/50 transition-colors text-white placeholder-gray-700"
                      placeholder={t.contact.namePlaceholder} style={{ fontSize: 16 }} />
                  </div>
                  <div className="relative">
                    <label id="program-label" className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3 block">{t.contact.programLabel}</label>
                    <input type="hidden" name="program" value={selectedProgram} />
                    <div role="button" tabIndex={0} aria-labelledby="program-label" aria-haspopup="listbox" aria-expanded={isDropdownOpen}
                      className="w-full bg-transparent border-b-2 border-white/10 py-3 text-base md:text-lg cursor-pointer flex justify-between items-center transition-colors hover:border-white/50 touch-manipulation"
                      style={{ minHeight: 48 }}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      onKeyDown={e => e.key === 'Enter' && setIsDropdownOpen(!isDropdownOpen)}>
                      <span className={selectedProgram === '' ? 'text-gray-600' : 'text-white'}>{selectedProgram || t.contact.programDefault}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </div>
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.ul role="listbox" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                          className="absolute z-20 w-full mt-3 bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden divide-y divide-white/5">
                          {t.contact.programs.map((prog, idx) => (
                            <li key={idx} role="option" aria-selected={selectedProgram === prog}
                              className="px-6 py-4 hover:bg-[#222] cursor-pointer text-gray-400 hover:text-white transition-all text-base font-medium touch-manipulation"
                              style={{ minHeight: 52 }}
                              onClick={() => { setSelectedProgram(prog); setIsDropdownOpen(false) }}>
                              {prog}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label htmlFor="mesaj" className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3 block">{t.contact.messageLabel}</label>
                    <textarea id="mesaj" name="mesaj" rows={4}
                      className="w-full bg-transparent border-b-2 border-white/10 py-3 text-base md:text-lg focus:outline-none focus:border-white/50 transition-colors text-white resize-none placeholder-gray-700"
                      placeholder={t.contact.messagePlaceholder} style={{ fontSize: 16 }} />
                  </div>
                  <button type="submit"
                    className="w-full bg-white text-black font-black uppercase tracking-widest text-base md:text-lg py-5 rounded-full hover:bg-gray-300 hover:scale-[1.02] transition-all duration-300 shadow-xl touch-manipulation"
                    style={{ minHeight: 60 }}>
                    {t.contact.submit}
                  </button>
                </form>
              </div>
            </div>
          </section>

        </main>

        {/* ── FOOTER ── */}
        <footer className="bg-black pt-16 pb-10 border-t border-white/5" role="contentinfo">
          <div className="max-w-screen-xl mx-auto px-4 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-12">
              {/* Brand */}
              <div className="md:col-span-2">
                <h3 className="text-3xl md:text-4xl font-display font-black tracking-tight text-white mb-4">
                  K I N E T I C <span className="text-white/30">.</span>
                </h3>
                <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed max-w-md">
                  {lang === 'tr'
                    ? "Atletizm temelli bilimsel metotlarla performans yönetimi. BESYO, POMEM ve elite sporcular için bireysel koçluk."
                    : "Athletics-based scientific performance management. Personalized coaching for BESYO, POMEM and elite athletes."}
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <a href="https://instagram.com/kineticperformans" target="_blank" rel="noreferrer noopener"
                    aria-label="Instagram"
                    className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors touch-manipulation">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://wa.me/905337013723" target="_blank" rel="noreferrer noopener"
                    aria-label="WhatsApp"
                    className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors touch-manipulation">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.885-.653-1.482-1.459-1.656-1.756-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </a>
                  <a href="mailto:info@kineticperformans.com"
                    aria-label="Email"
                    className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors touch-manipulation">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth={2}>
                      <path d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* İletişim */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white/50 mb-5">
                  {lang === 'tr' ? 'İletişim' : 'Contact'}
                </h4>
                <ul className="space-y-3 text-sm font-medium">
                  <li className="text-gray-400">{lang === 'tr' ? 'Türkiye' : 'Turkey'}</li>
                  <li>
                    <a href="tel:+905337013723" className="text-gray-400 hover:text-white transition-colors">+90 533 701 37 23</a>
                  </li>
                  <li>
                    <a href="mailto:info@kineticperformans.com" className="text-gray-400 hover:text-white transition-colors break-all">info@kineticperformans.com</a>
                  </li>
                </ul>
              </div>

              {/* Çalışma Saatleri */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white/50 mb-5">
                  {lang === 'tr' ? 'Çalışma Saatleri' : 'Working Hours'}
                </h4>
                <ul className="space-y-3 text-sm font-medium text-gray-400">
                  <li className="flex justify-between gap-4">
                    <span>{lang === 'tr' ? 'Pzt — Cuma' : 'Mon — Fri'}</span>
                    <span className="tabular-nums text-white/80">08:00 — 20:00</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>{lang === 'tr' ? 'Cumartesi' : 'Saturday'}</span>
                    <span className="tabular-nums text-white/80">09:00 — 18:00</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>{lang === 'tr' ? 'Pazar' : 'Sunday'}</span>
                    <span className="tabular-nums text-white/40">{lang === 'tr' ? 'Kapalı' : 'Closed'}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center text-xs text-gray-500">
              <p className="font-medium">{t.footer}</p>
              <p className="font-medium">{lang === 'tr' ? 'Tasarım & geliştirme: KINETIC' : 'Designed & built: KINETIC'}</p>
            </div>
          </div>
        </footer>

        {/* ── MARQUEE (sayfanın en altı) ── */}
        <div className="bg-black text-white py-6 md:py-8 border-t border-white/5 overflow-hidden flex whitespace-nowrap" aria-hidden="true">
          <div className="animate-marquee text-3xl md:text-5xl font-display font-black tracking-tighter uppercase opacity-30">{t.marquee}</div>
        </div>
      </div>
    </>
  )
}
