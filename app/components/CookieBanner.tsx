'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, Cookie, Shield, BarChart2 } from 'lucide-react'
import type { Lang } from '../translations'

const copy = {
  tr: {
    title: 'Çerez Tercihleri',
    desc: 'Deneyiminizi kişiselleştirmek, analiz yapmak ve hizmetlerimizi iyileştirmek için çerezler kullanıyoruz. KVKK kapsamında tercihlerinizi yönetebilirsiniz.',
    necessary: 'Zorunlu', necessaryDesc: 'Site çalışması için gerekli, devre dışı bırakılamaz.',
    analytics: 'Analiz', analyticsDesc: 'Anonim ziyaret istatistikleri (Google Analytics).',
    marketing: 'Pazarlama', marketingDesc: 'Davranışsal reklamcılık çerezleri.',
    acceptAll: 'Tümünü Kabul Et', acceptSelected: 'Seçilenleri Kabul Et', reject: 'Reddet',
    policy: 'Gizlilik Politikası',
  },
  en: {
    title: 'Cookie Preferences',
    desc: 'We use cookies to personalize your experience, analyze traffic, and improve our services. Manage your preferences below.',
    necessary: 'Necessary', necessaryDesc: 'Required for site operation, cannot be disabled.',
    analytics: 'Analytics', analyticsDesc: 'Anonymous visit statistics (Google Analytics).',
    marketing: 'Marketing', marketingDesc: 'Behavioral advertising cookies.',
    acceptAll: 'Accept All', acceptSelected: 'Accept Selected', reject: 'Reject All',
    policy: 'Privacy Policy',
  },
}

export default function CookieBanner({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const [visible, setVisible]     = useState(false)
  const [expanded, setExpanded]   = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('kinetic-cookie-consent')
    if (!consent) setTimeout(() => setVisible(true), 2500)
  }, [])

  const save = (type: 'all' | 'selected' | 'none') => {
    const val = type === 'all'
      ? 'all'
      : type === 'none'
      ? 'none'
      : JSON.stringify({ analytics, marketing })
    localStorage.setItem('kinetic-cookie-consent', val)
    // Analytics aktifse GA'yı etkinleştir
    if (type === 'all' || (type === 'selected' && analytics)) {
      ;(window as any).gtag?.('consent', 'update', { analytics_storage: 'granted' })
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Arka plan overlay (expanded modda) */}
          {expanded && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[490]"
              onClick={() => setExpanded(false)}
            />
          )}

          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[500] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] border overflow-hidden"
            style={{ background: 'var(--page-surface,#fff)', borderColor: 'var(--page-border,rgba(0,0,0,0.08))' }}
            role="dialog"
            aria-label={t.title}
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <div className="flex items-center gap-2">
                <Cookie className="w-5 h-5" style={{ color: 'var(--page-text,#0a0a0a)' }} aria-hidden="true" />
                <h2 className="font-black text-base" style={{ color: 'var(--page-text,#0a0a0a)' }}>{t.title}</h2>
              </div>
              <button
                onClick={() => setVisible(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-60 transition-opacity touch-manipulation"
                style={{ color: 'var(--page-text-muted,#6b7280)' }}
                aria-label="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-5 pb-2">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--page-text-muted,#6b7280)' }}>{t.desc}</p>
            </div>

            {/* Expanded: detay toggle'lar */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pt-2 pb-1 space-y-3 border-t mt-2" style={{ borderColor: 'var(--page-border,rgba(0,0,0,0.08))' }}>
                    {/* Zorunlu */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--page-text-muted,#6b7280)' }} />
                        <div>
                          <p className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--page-text,#0a0a0a)' }}>{t.necessary}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--page-text-muted,#6b7280)' }}>{t.necessaryDesc}</p>
                        </div>
                      </div>
                      <div className="w-9 h-5 rounded-full bg-black flex-shrink-0 flex items-center justify-end px-1" aria-label="Aktif (zorunlu)">
                        <div className="w-3 h-3 rounded-full bg-white" />
                      </div>
                    </div>

                    {/* Analiz */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <BarChart2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--page-text-muted,#6b7280)' }} />
                        <div>
                          <p className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--page-text,#0a0a0a)' }}>{t.analytics}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--page-text-muted,#6b7280)' }}>{t.analyticsDesc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setAnalytics(v => !v)}
                        className="w-9 h-5 rounded-full flex items-center px-1 transition-colors flex-shrink-0 touch-manipulation"
                        style={{ background: analytics ? 'var(--page-text,#0a0a0a)' : 'var(--page-border,#d1d5db)', justifyContent: analytics ? 'flex-end' : 'flex-start' }}
                        role="switch"
                        aria-checked={analytics}
                        aria-label={t.analytics}
                      >
                        <div className="w-3 h-3 rounded-full bg-white transition-all" />
                      </button>
                    </div>

                    {/* Pazarlama */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <BarChart2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--page-text-muted,#6b7280)' }} />
                        <div>
                          <p className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--page-text,#0a0a0a)' }}>{t.marketing}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--page-text-muted,#6b7280)' }}>{t.marketingDesc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setMarketing(v => !v)}
                        className="w-9 h-5 rounded-full flex items-center px-1 transition-colors flex-shrink-0 touch-manipulation"
                        style={{ background: marketing ? 'var(--page-text,#0a0a0a)' : 'var(--page-border,#d1d5db)', justifyContent: marketing ? 'flex-end' : 'flex-start' }}
                        role="switch"
                        aria-checked={marketing}
                        aria-label={t.marketing}
                      >
                        <div className="w-3 h-3 rounded-full bg-white transition-all" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Butonlar */}
            <div className="p-4 space-y-2">
              <button
                onClick={() => save('all')}
                className="w-full py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-opacity hover:opacity-80 touch-manipulation"
                style={{ background: 'var(--page-text,#0a0a0a)', color: 'var(--page-bg,#f9f9f9)' }}
              >
                {t.acceptAll}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setExpanded(v => !v)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold border transition-opacity hover:opacity-70 touch-manipulation"
                  style={{ borderColor: 'var(--page-border,rgba(0,0,0,0.12))', color: 'var(--page-text,#0a0a0a)' }}
                >
                  {expanded ? '▴ ' : '▾ '}{lang === 'tr' ? 'Detaylar' : 'Details'}
                </button>
                {expanded && (
                  <button
                    onClick={() => save('selected')}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold border transition-opacity hover:opacity-70 touch-manipulation"
                    style={{ borderColor: 'var(--page-border,rgba(0,0,0,0.12))', color: 'var(--page-text,#0a0a0a)' }}
                  >
                    {t.acceptSelected}
                  </button>
                )}
                <button
                  onClick={() => save('none')}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold border transition-opacity hover:opacity-70 touch-manipulation"
                  style={{ borderColor: 'var(--page-border,rgba(0,0,0,0.12))', color: 'var(--page-text-muted,#6b7280)' }}
                >
                  {t.reject}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
