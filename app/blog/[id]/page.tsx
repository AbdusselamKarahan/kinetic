import { blogPosts } from '../data'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

// ── Dinamik Metadata (SEO) ──────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const post = blogPosts.find((p) => p.id === id)

  if (!post) {
    return {
      title: 'Yazı Bulunamadı',
      description: 'Aradığınız blog yazısı mevcut değil.',
    }
  }

  const siteUrl = 'https://kineticperformans.com'
  const postUrl = `${siteUrl}/blog/${post.id}`
  const description = post.content.replace(/\s+/g, ' ').trim().slice(0, 160)

  return {
    title: post.title,
    description,
    authors: [{ name: 'Abdusselam Karahan' }],
    openGraph: {
      type: 'article',
      url: postUrl,
      title: post.title,
      description,
      publishedTime: post.date,
      authors: ['Abdusselam Karahan'],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [post.image],
    },
    alternates: {
      canonical: postUrl,
    },
  }
}

// ── Statik Parametreler (SSG) ───────────────────────────────────────
export async function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.id }))
}

// ── JSON-LD: BlogPosting Schema ─────────────────────────────────────
function BlogPostingSchema({ post }: { post: (typeof blogPosts)[0] }) {
  const siteUrl = 'https://kineticperformans.com'
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.content.replace(/\s+/g, ' ').trim().slice(0, 160),
    image: `${siteUrl}${post.image}`,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Abdusselam Karahan',
      jobTitle: 'Baş Antrenör',
    },
    publisher: {
      '@type': 'Organization',
      name: 'KINETIC Performans Yönetimi',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.id}`,
    },
    articleSection: post.category,
    inLanguage: 'tr-TR',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── Sayfa Bileşeni ──────────────────────────────────────────────────
export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = blogPosts.find((p) => p.id === id)

  if (!post) return notFound()

  const paragraphs = post.content
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className="bg-[#f9f9f9] min-h-screen text-[#0a0a0a] font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <BlogPostingSchema post={post} />

      {/* ── NAVBAR ── */}
      <header role="banner">
        <nav
          aria-label="Blog Navigasyon"
          className="fixed top-0 w-full z-50 py-4 px-4 lg:px-12 flex justify-between items-center bg-white/90 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-black/5"
        >
          <Link
            href="/"
            aria-label="KINETIC Ana Sayfa"
            className="text-xl font-display font-black tracking-tight hover:opacity-70 transition-opacity touch-manipulation py-2"
          >
            K I N E T I C <span className="text-gray-400">.</span>
          </Link>

          <Link
            href="/"
            className="group flex items-center justify-center bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg touch-manipulation"
            style={{ minHeight: 44 }}
          >
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Ana Sayfa
          </Link>
        </nav>
      </header>

      {/* ── MAKALENİN İÇERİĞİ ── */}
      <main className="pt-28 md:pt-36 pb-20 md:pb-24 px-4 lg:px-12">
        <article className="max-w-2xl mx-auto" itemScope itemType="https://schema.org/BlogPosting">

          {/* Makale Başlığı */}
          <header className="text-center mb-12 md:mb-16">
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-display font-black leading-[1.1] tracking-tight text-black mb-6 text-balance"
              itemProp="headline"
            >
              {post.title}
            </h1>

            {/* Meta şerit */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs md:text-sm font-bold text-gray-500 py-3 px-4 md:px-6 bg-white border border-black/5 rounded-2xl shadow-sm w-fit mx-auto">
              <span className="bg-black text-white px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest shadow-md">
                {post.category}
              </span>

              <div className="hidden md:block w-px h-4 bg-gray-200" aria-hidden="true" />

              <div className="flex items-center gap-2">
                <User className="w-3 h-3 md:w-4 md:h-4 text-black" aria-hidden="true" />
                <span className="text-black text-[10px] md:text-xs uppercase tracking-wider" itemProp="author">
                  Antrenör
                </span>
              </div>

              <div className="hidden md:block w-px h-4 bg-gray-200" aria-hidden="true" />

              <time
                className="flex items-center gap-2"
                dateTime={post.date}
                itemProp="datePublished"
              >
                <Calendar className="w-3 h-3 md:w-4 md:h-4 text-gray-400" aria-hidden="true" />
                <span className="font-medium text-gray-600">{post.date}</span>
              </time>
            </div>
          </header>

          {/* Kapak Görseli */}
          <figure
            className="w-full h-[220px] md:h-[380px] rounded-2xl overflow-hidden mb-12 md:mb-16 shadow-lg ring-1 ring-black/5"
            itemProp="image"
          >
            <img
              src={post.image}
              alt={`${post.title} – kapak görseli`}
              className="w-full h-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
          </figure>

          {/* Makale Metni */}
          <div
            className="prose prose-lg max-w-none text-gray-800 mb-16 md:mb-24"
            itemProp="articleBody"
          >
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`mb-6 md:mb-8 leading-[1.85] text-base md:text-lg ${
                  index === 0
                    ? 'first-letter:text-4xl md:first-letter:text-5xl first-letter:font-black first-letter:text-black first-letter:mr-3 first-letter:float-left first-letter:leading-none'
                    : ''
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Makale Altı CTA */}
          <aside
            aria-label="Performans koçluğu randevusu"
            className="bg-black text-white p-8 md:p-12 rounded-3xl text-center"
          >
            <h2 className="text-2xl md:text-3xl font-display font-black mb-4">
              Kendi Performansını Analiz Etmeye Hazır mısın?
            </h2>
            <p className="text-gray-300 mb-8 text-base md:text-lg leading-relaxed">
              Okudukların seni ilham verdi mi? Şimdi uzman gözüyle kendi potansiyelini keşfet.
            </p>
            <Link
              href="/#iletisim"
              className="inline-flex items-center bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors shadow-xl touch-manipulation"
              style={{ minHeight: 52 }}
            >
              Ücretsiz Analiz Randevusu Al <ArrowLeft className="w-5 h-5 ml-3 rotate-180" aria-hidden="true" />
            </Link>
          </aside>
        </article>
      </main>

      {/* ── MARQUEE ── */}
      <div className="bg-[#0a0a0a] text-white py-8 md:py-10 border-t border-white/5 overflow-hidden flex whitespace-nowrap" aria-hidden="true">
        <div className="animate-marquee text-3xl md:text-5xl font-display font-black tracking-tighter uppercase opacity-30">
          KINETIC . BİLİM . GÜÇ . HIZ . KINETIC . BİLİM . GÜÇ . HIZ . KINETIC . BİLİM . GÜÇ . HIZ .{' '}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-black py-14 md:py-16 text-center border-t border-white/5" role="contentinfo">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-6 tracking-tighter uppercase">
            KINETIC<span className="text-gray-600"> .</span>
          </h2>
          <p className="text-gray-600 text-sm font-medium">
            &copy; 2026 KINETIC Performans Yönetimi. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  )
}
