import { ImageResponse } from 'next/og'
import { blogPosts } from '../data'

export const alt = 'KINETIC Blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  return blogPosts.map(p => ({ id: p.id }))
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = blogPosts.find(p => p.id === id)
  const title = post?.title ?? 'KINETIC Blog'
  const category = post?.category ?? 'Bilgi Bankası'
  const date = post?.date ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background:
            'radial-gradient(circle at 80% 20%, #1c1c1c 0%, #0a0a0a 60%, #000000 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top: brand + category */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: '#fff' }}>KINETIC<span style={{ color: '#666' }}>.</span></span>
          <span
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              background: '#ffffff',
              color: '#0a0a0a',
              letterSpacing: 4,
            }}
          >
            {category}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? 64 : 80,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 1056,
            display: 'flex',
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          <span>{date}</span>
          <span>kineticperformans.com/blog</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
