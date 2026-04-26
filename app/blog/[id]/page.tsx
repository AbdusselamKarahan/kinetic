import { blogPosts } from '../data'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const post = blogPosts.find(p => p.id === id)
  if (!post) return { title: 'Yazı Bulunamadı' }
  const siteUrl = 'https://kineticperformans.com'
  const desc = post.content.replace(/\s+/g, ' ').trim().slice(0, 160)
  return {
    title: post.title,
    description: desc,
    authors: [{ name: 'Abdusselam Karahan' }],
    openGraph: { type: 'article', url: `${siteUrl}/blog/${post.id}`, title: post.title, description: desc,
      publishedTime: post.date, authors: ['Abdusselam Karahan'],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }] },
    twitter: { card: 'summary_large_image', title: post.title, description: desc, images: [post.image] },
    alternates: { canonical: `${siteUrl}/blog/${post.id}` },
  }
}

export async function generateStaticParams() {
  return blogPosts.map(post => ({ id: post.id }))
}

function BlogPostingSchema({ post }: { post: (typeof blogPosts)[0] }) {
  const siteUrl = 'https://kineticperformans.com'
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'BlogPosting',
      headline: post.title,
      description: post.content.replace(/\s+/g, ' ').trim().slice(0, 160),
      image: `${siteUrl}${post.image}`, datePublished: post.date,
      author: { '@type': 'Person', name: 'Abdusselam Karahan', jobTitle: 'Baş Antrenör' },
      publisher: { '@type': 'Organization', name: 'KINETIC Performans Yönetimi', url: siteUrl },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${post.id}` },
      articleSection: post.category, inLanguage: 'tr-TR',
    }) }} />
  )
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = blogPosts.find(p => p.id === id)
  if (!post) return notFound()
  const paragraphs = post.content.split('\n').map(p => p.trim()).filter(Boolean)

  return (
    <div className="min-h-screen font-sans selection:bg-black selection:text-white overflow-x-hidden"
      style={{ backgroundColor: 'var(--page-bg, #f9f9f9)', color: 'var(--page-text, #0a0a0a)' }}>
      <BlogPostingSchema post={post} />

      {/* NAVBAR */}
      <header role="banner">
        <nav aria-label="Blog Navigasyon"
          className="fixed top-0 w-full z-50 py-4 px-4 lg:px-12 flex justify-between items-center backdrop-blur-xl shadow-sm border-b"
          style={{ backgroundColor: 'var(--page-surface, rgba(255,255,255,0.92))', borderColor: 'var(--page-border, rgba(0,0,0,0.08))' }}>
          <Link href="/" aria-label="KINETIC Ana Sayfa"
            className="text-xl font-display font-black tracking-tight hover:opacity-70 transition-opacity touch-manipulation py-2"
            style={{ color: 'var(--page-text, #0a0a0a)' }}>
            K I N E T I C <span style={{ color: 'var(--page-text-muted, #6b7280)' }}>.</span>
          </Link>
          <Link href="/"
            className="group flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-all shadow-lg touch-manipulation"
            style={{ background: 'var(--page-text, #0a0a0a)', color: 'var(--page-bg, #f9f9f9)', minHeight: 44 }}>
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            {id.startsWith('en-') ? 'Home' : 'Ana Sayfa'}
          </Link>
        </nav>
      </header>

      <main className="pt-28 md:pt-36 pb-20 md:pb-24 px-4 lg:px-12">
        <article className="max-w-2xl mx-auto" itemScope itemType="https://schema.org/BlogPosting">
          <header className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black leading-[1.1] tracking-tight mb-6 text-balance" itemProp="headline">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs md:text-sm font-bold py-3 px-4 md:px-6 rounded-2xl shadow-sm w-fit mx-auto border"
              style={{ background: 'var(--page-surface,#fff)', borderColor: 'var(--page-border,rgba(0,0,0,0.08))', color: 'var(--page-text-muted,#6b7280)' }}>
              <span className="px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest shadow-md"
                style={{ background: 'var(--page-text,#0a0a0a)', color: 'var(--page-bg,#f9f9f9)' }}>
                {post.category}
              </span>
              <div className="hidden md:block w-px h-4" style={{ background: 'var(--page-border,rgba(0,0,0,0.08))' }} aria-hidden="true" />
              <div className="flex items-center gap-2">
                <User className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" />
                <span className="text-[10px] md:text-xs uppercase tracking-wider" itemProp="author">Antrenör</span>
              </div>
              <div className="hidden md:block w-px h-4" style={{ background: 'var(--page-border,rgba(0,0,0,0.08))' }} aria-hidden="true" />
              <time className="flex items-center gap-2" dateTime={post.date} itemProp="datePublished">
                <Calendar className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" />
                <span>{post.date}</span>
              </time>
            </div>
          </header>

          <figure className="w-full h-[220px] md:h-[380px] rounded-2xl overflow-hidden mb-12 md:mb-16 shadow-lg" itemProp="image"
            style={{ outline: '1px solid var(--page-border,rgba(0,0,0,0.05))' }}>
            <img src={post.image} alt={`${post.title} – kapak görseli`}
              className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
          </figure>

          <div className="prose prose-lg max-w-none mb-16 md:mb-24" itemProp="articleBody"
            style={{ color: 'var(--page-text,#0a0a0a)' }}>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className={`mb-6 md:mb-8 leading-[1.85] text-base md:text-lg ${
                index === 0 ? 'first-letter:text-4xl md:first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:leading-none' : ''
              }`} style={{ color: index === 0 ? 'var(--page-text,#0a0a0a)' : 'var(--page-text-muted,#374151)' }}>
                {paragraph}
              </p>
            ))}
          </div>

          <aside aria-label="CTA" className="bg-black text-white p-8 md:p-12 rounded-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-display font-black mb-4">
              {id.startsWith('en-') ? 'Ready to Analyze Your Performance?' : 'Kendi Performansını Analiz Etmeye Hazır mısın?'}
            </h2>
            <p className="text-gray-300 mb-8 text-base md:text-lg leading-relaxed">
              {id.startsWith('en-')
                ? 'Inspired by what you read? Discover your potential with expert guidance.'
                : 'Okudukların seni ilham verdi mi? Şimdi uzman gözüyle kendi potansiyelini keşfet.'}
            </p>
            <Link href="/#iletisim"
              className="inline-flex items-center bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors shadow-xl touch-manipulation"
              style={{ minHeight: 52 }}>
              {id.startsWith('en-') ? 'Book Free Analysis' : 'Ücretsiz Analiz Randevusu Al'}
              <ArrowLeft className="w-5 h-5 ml-3 rotate-180" aria-hidden="true" />
            </Link>
          </aside>

          {/* ── DİĞER YAZILAR ── */}
          <nav aria-label="Diğer blog yazıları" className="mt-20 md:mt-28 pt-12 border-t" style={{ borderColor: 'var(--page-border,rgba(0,0,0,0.08))' }}>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl md:text-3xl font-display font-black" style={{ color: 'var(--page-text,#0a0a0a)' }}>
                {id.startsWith('en-') ? 'Other Posts' : 'Diğer Yazılar'}
              </h2>
              <Link
                href="/blog"
                className="text-xs font-bold uppercase tracking-widest border-b pb-0.5 hover:opacity-60 transition-opacity touch-manipulation"
                style={{ color: 'var(--page-text,#0a0a0a)', borderColor: 'var(--page-text,#0a0a0a)' }}
              >
                {id.startsWith('en-') ? 'All Posts →' : 'Tüm Yazılar →'}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {blogPosts
                .filter(p => p.id !== id)
                .slice(0, 2)
                .map(other => (
                  <Link href={`/blog/${other.id}`} key={other.id} className="group flex gap-4 items-start p-4 rounded-2xl border hover:shadow-lg transition-all duration-300 touch-manipulation"
                    style={{ background: 'var(--page-surface,#fff)', borderColor: 'var(--page-border,rgba(0,0,0,0.08))' }}>
                    <div className="w-24 h-20 md:w-28 md:h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={other.image}
                        alt={other.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold tracking-widest uppercase block mb-1.5" style={{ color: 'var(--page-text-muted,#6b7280)' }}>{other.category}</span>
                      <h3 className="text-sm md:text-base font-bold leading-snug line-clamp-3 group-hover:opacity-60 transition-opacity" style={{ color: 'var(--page-text,#0a0a0a)' }}>{other.title}</h3>
                    </div>
                  </Link>
                ))}
            </div>

            {/* Tüm Yazılar butonu */}
            <div className="mt-8 flex justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:opacity-80 transition-opacity shadow-lg touch-manipulation"
                style={{ background: 'var(--page-text,#0a0a0a)', color: 'var(--page-bg,#f9f9f9)', minHeight: 52 }}
              >
                {id.startsWith('en-') ? 'See All Posts' : 'Tüm Yazıları Gör'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </nav>
        </article>
      </main>

      {/* MARQUEE */}
      <div className="bg-[#0a0a0a] text-white py-8 border-t border-white/5 overflow-hidden flex whitespace-nowrap" aria-hidden="true">
        <div className="animate-marquee text-3xl md:text-5xl font-display font-black tracking-tighter uppercase opacity-30">
          KINETIC . SCIENCE . POWER . SPEED . KINETIC . SCIENCE . POWER . SPEED . KINETIC . SCIENCE . POWER . SPEED .{' '}
        </div>
      </div>

      <footer className="bg-black py-14 text-center border-t border-white/5" role="contentinfo">
        <p className="text-gray-600 text-sm font-medium">&copy; 2026 KINETIC Performans Yönetimi.</p>
      </footer>
    </div>
  )
}
