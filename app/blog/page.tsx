import { blogPosts } from './data'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog & Bilgi Bankası',
  description: 'Atletizm bilimi, sprint mekaniği, BESYO/POMEM hazırlık stratejileri ve performans koçluğu üzerine uzman içerikler.',
  openGraph: {
    title: 'Blog & Bilgi Bankası | KINETIC Performans',
    description: 'Atletizm bilimi ve performans koçluğu üzerine uzman içerikler.',
    type: 'website',
  },
}

export default function BlogListPage() {
  const featured = blogPosts[0]
  const rest     = blogPosts.slice(1)

  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden"
      style={{ backgroundColor: 'var(--page-bg,#f9f9f9)', color: 'var(--page-text,#0a0a0a)' }}
    >
      {/* ── NAVBAR ── */}
      <header role="banner">
        <nav
          className="fixed top-0 w-full z-50 py-4 px-4 lg:px-12 flex justify-between items-center backdrop-blur-xl shadow-sm border-b"
          style={{ backgroundColor: 'var(--page-surface,rgba(255,255,255,0.92))', borderColor: 'var(--page-border,rgba(0,0,0,0.08))' }}
          aria-label="Blog Navigasyon"
        >
          <Link href="/" aria-label="KINETIC Ana Sayfa"
            className="text-xl font-display font-black tracking-tight hover:opacity-70 transition-opacity py-2 touch-manipulation"
            style={{ color: 'var(--page-text,#0a0a0a)' }}>
            K I N E T I C <span style={{ color: 'var(--page-text-muted,#6b7280)' }}>.</span>
          </Link>
          <Link href="/"
            className="group flex items-center px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-all shadow-lg touch-manipulation"
            style={{ background: 'var(--page-text,#0a0a0a)', color: 'var(--page-bg,#f9f9f9)', minHeight: 44 }}>
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Ana Sayfa
          </Link>
        </nav>
      </header>

      <main className="pt-28 pb-24 px-4 lg:px-12 max-w-screen-2xl mx-auto">

        {/* Page header */}
        <div className="mb-16 md:mb-24 border-b pb-12" style={{ borderColor: 'var(--page-border,rgba(0,0,0,0.08))' }}>
          <span className="text-xs font-bold tracking-[0.4em] uppercase mb-4 block" style={{ color: 'var(--page-text-muted,#6b7280)' }}>
            Bilgi Bankası
          </span>
          <h1 className="text-4xl md:text-7xl font-display font-black tracking-tighter mb-6" style={{ color: 'var(--page-text,#0a0a0a)' }}>
            Her Antrenman Bir Dersi<br />Barındırır<span style={{ color: 'var(--page-text-muted,#6b7280)' }}>.</span>
          </h1>
          <p className="text-lg md:text-xl font-medium max-w-2xl leading-relaxed" style={{ color: 'var(--page-text-muted,#6b7280)' }}>
            Atletizm bilimi, sprint mekaniği, BESYO/POMEM hazırlık stratejileri ve performans koçluğu üzerine derinlemesine yazılar.
          </p>
        </div>

        {/* Featured post */}
        <Link href={`/blog/${featured.id}`} className="group block mb-16 md:mb-24">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border hover:shadow-2xl transition-all duration-500"
            style={{ borderColor: 'var(--page-border,rgba(0,0,0,0.08))', background: 'var(--page-surface,#fff)' }}
          >
            <div className="h-64 md:h-80 lg:h-full overflow-hidden relative">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                loading="eager"
                decoding="async"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                  style={{ background: 'var(--page-text,#0a0a0a)', color: 'var(--page-bg,#f9f9f9)' }}>
                  Öne Çıkan
                </span>
              </div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted,#6b7280)' }}>{featured.category}</span>
                  <span style={{ color: 'var(--page-border,rgba(0,0,0,0.2))' }}>·</span>
                  <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--page-text-muted,#6b7280)' }}>
                    <Calendar className="w-3 h-3" aria-hidden="true" /> {featured.date}
                  </span>
                </div>
                <h2 className="text-2xl md:text-4xl font-display font-black leading-tight mb-6 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--page-text,#0a0a0a)' }}>
                  {featured.title}
                </h2>
                <p className="text-base md:text-lg leading-relaxed line-clamp-3" style={{ color: 'var(--page-text-muted,#6b7280)' }}>
                  {featured.content.trim().split('\n')[0].trim()}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-8 font-black uppercase tracking-widest text-sm group-hover:gap-5 transition-all" style={{ color: 'var(--page-text,#0a0a0a)' }}>
                Devamını Oku <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div className="mb-12 border-b pb-6" style={{ borderColor: 'var(--page-border,rgba(0,0,0,0.08))' }}>
          <h2 className="text-2xl md:text-3xl font-display font-black tracking-tight" style={{ color: 'var(--page-text,#0a0a0a)' }}>
            Diğer Yazılar
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {rest.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group block">
              <div
                className="rounded-2xl overflow-hidden border hover:shadow-xl transition-all duration-500 h-full flex flex-col"
                style={{ borderColor: 'var(--page-border,rgba(0,0,0,0.08))', background: 'var(--page-surface,#fff)' }}
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted,#6b7280)' }}>{post.category}</span>
                    <span style={{ color: 'var(--page-border,rgba(0,0,0,0.2))' }}>·</span>
                    <time className="text-[10px] font-medium" style={{ color: 'var(--page-text-muted,#6b7280)' }} dateTime={post.date}>{post.date}</time>
                  </div>
                  <h3 className="text-xl font-display font-black leading-snug mb-4 group-hover:opacity-70 transition-opacity flex-1" style={{ color: 'var(--page-text,#0a0a0a)' }}>
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all" style={{ color: 'var(--page-text,#0a0a0a)' }}>
                    Oku <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Marquee */}
      <div className="bg-[#0a0a0a] text-white py-8 overflow-hidden flex whitespace-nowrap border-t border-white/5" aria-hidden="true">
        <div className="animate-marquee text-3xl md:text-5xl font-display font-black tracking-tighter uppercase opacity-30">
          KINETIC . BİLİM . GÜÇ . HIZ . KINETIC . BİLİM . GÜÇ . HIZ . KINETIC . BİLİM . GÜÇ . HIZ .{' '}
        </div>
      </div>

      <footer className="bg-black py-10 text-center border-t border-white/5" role="contentinfo">
        <p className="text-gray-500 text-sm font-medium">&copy; 2026 KINETIC Performans Yönetimi. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  )
}
