import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'KINETIC Performans Yönetimi'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
            'radial-gradient(circle at 20% 20%, #1a1a1a 0%, #050505 60%, #000000 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              padding: '10px 22px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.25)',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            Performans · 2026
          </div>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 132,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: -4,
              display: 'flex',
            }}
          >
            KINETIC<span style={{ color: '#666' }}>.</span>
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 600,
              marginTop: 24,
              maxWidth: 900,
              lineHeight: 1.25,
              color: 'rgba(255,255,255,0.78)',
            }}
          >
            Atletizm temelli bilimsel performans koçluğu — BESYO, POMEM ve elite sporcular için.
          </div>
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
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          <span>Spor & Performans Yönetimi</span>
          <span>kineticperformans.com</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
