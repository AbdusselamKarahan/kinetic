import type { Metadata } from 'next'
import { Montserrat, Manrope } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const siteUrl = 'https://kineticperformans.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'KINETIC | Spor ve Performans Yönetimi – Isparta',
    template: '%s | KINETIC Performans',
  },
  description:
    "Isparta'da atletizm temelli bilimsel metotlarla birebir performans koçluğu, BESYO/POMEM sınav hazırlığı ve takım eğitimleri. Potansiyelini özgür bırak.",
  keywords: [
    'performans koçluğu Isparta',
    'atletizm antrenmanı',
    'BESYO hazırlık',
    'POMEM parkur antrenmanı',
    'sprint antrenmanı',
    'spor koçu Isparta',
    'KINETIC performans',
    'beden eğitimi antrenörü',
  ],
  authors: [{ name: 'Abdusselam Karahan' }],
  creator: 'KINETIC Performans Yönetimi',
  publisher: 'KINETIC Performans Yönetimi',
  category: 'Sports & Fitness',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: siteUrl,
    siteName: 'KINETIC Performans',
    title: 'KINETIC | Spor ve Performans Yönetimi – Isparta',
    description:
      "Isparta'da atletizm temelli bilimsel metotlarla birebir performans koçluğu, BESYO/POMEM sınav hazırlığı ve takım eğitimleri.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KINETIC Performans Yönetimi – Isparta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KINETIC | Spor ve Performans Yönetimi – Isparta',
    description:
      "Isparta'da atletizm temelli bilimsel metotlarla birebir performans koçluğu ve BESYO/POMEM sınav hazırlığı.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}/#organization`,
      name: 'KINETIC Performans Yönetimi',
      url: siteUrl,
      logo: `${siteUrl}/favicon.ico`,
      image: `${siteUrl}/og-image.jpg`,
      description:
        "Isparta'da atletizm temelli bilimsel metotlarla birebir performans koçluğu, BESYO/POMEM sınav hazırlığı ve takım antrenmanları.",
      telephone: '+905337013723',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Isparta',
        addressCountry: 'TR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '37.7648',
        longitude: '30.5566',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '20:00',
        },
      ],
      sameAs: ['https://instagram.com/kineticperformans'],
      priceRange: '₺₺',
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'KINETIC Performans',
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'tr-TR',
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#trainer`,
      name: 'Abdusselam Karahan',
      jobTitle: 'Baş Antrenör & Kurucu',
      worksFor: { '@id': `${siteUrl}/#organization` },
      alumniOf: 'Burdur Mehmet Akif Ersoy Üniversitesi',
      knowsAbout: ['Atletizm', 'Sprint Mekaniği', 'Performans Koçluğu', 'BESYO Hazırlık'],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${manrope.variable} ${montserrat.variable} font-sans bg-[#f9f9f9] text-[#0a0a0a] antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  )
}
