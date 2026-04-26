import type { Metadata } from 'next'
import { Montserrat, Manrope } from 'next/font/google'
import Script from 'next/script'
<<<<<<< HEAD
import PageTransition from './components/PageTransition'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' })
const manrope    = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })
=======
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
>>>>>>> af95c5e01727726729b8998b768eba18a609e6f0

const siteUrl = 'https://kineticperformans.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
<<<<<<< HEAD
  title: { default: 'KINETIC | Spor ve Performans Yönetimi – Isparta', template: '%s | KINETIC Performans' },
  description: "Isparta'da atletizm temelli bilimsel metotlarla birebir performans koçluğu, BESYO/POMEM sınav hazırlığı ve takım eğitimleri.",
  keywords: ['performans koçluğu Isparta','atletizm antrenmanı','BESYO hazırlık','POMEM parkur','sprint antrenmanı','spor koçu Isparta','KINETIC performans'],
  authors: [{ name: 'Abdusselam Karahan' }],
  creator: 'KINETIC Performans Yönetimi',
  openGraph: {
    type: 'website', locale: 'tr_TR', url: siteUrl, siteName: 'KINETIC Performans',
    title: 'KINETIC | Spor ve Performans Yönetimi – Isparta',
    description: "Isparta'da atletizm temelli bilimsel metotlarla birebir performans koçluğu.",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'KINETIC Performans Yönetimi' }],
  },
  twitter: { card: 'summary_large_image', title: 'KINETIC | Performans Yönetimi', description: "BESYO/POMEM ve elite performans koçluğu – Isparta.", images: ['/og-image.jpg'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: siteUrl },
  icons: { icon: '/favicon.ico', shortcut: '/favicon.ico' },
=======
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
>>>>>>> af95c5e01727726729b8998b768eba18a609e6f0
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
<<<<<<< HEAD
    { '@type': 'LocalBusiness', '@id': `${siteUrl}/#organization`, name: 'KINETIC Performans Yönetimi', url: siteUrl,
      description: "Isparta'da atletizm temelli bilimsel metotlarla birebir performans koçluğu.",
      telephone: '+905337013723',
      address: { '@type': 'PostalAddress', addressLocality: 'Isparta', addressCountry: 'TR' },
      geo: { '@type': 'GeoCoordinates', latitude: '37.7648', longitude: '30.5566' },
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '08:00', closes: '20:00' }],
      sameAs: ['https://instagram.com/kineticperformans'], priceRange: '₺₺',
    },
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: 'KINETIC Performans', publisher: { '@id': `${siteUrl}/#organization` }, inLanguage: 'tr-TR' },
    { '@type': 'Person', '@id': `${siteUrl}/#trainer`, name: 'Abdusselam Karahan', jobTitle: 'Baş Antrenör & Kurucu', worksFor: { '@id': `${siteUrl}/#organization` }, alumniOf: 'Burdur Mehmet Akif Ersoy Üniversitesi' },
  ],
}

// ── Google Analytics Measurement ID — kendi ID'nizi buraya girin ──
const GA_ID = 'G-XXXXXXXXXX'

=======
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

>>>>>>> af95c5e01727726729b8998b768eba18a609e6f0
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
<<<<<<< HEAD
        {/* JSON-LD Structured Data */}
        <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} strategy="beforeInteractive" />

        {/* Google Analytics — consent-first (varsayılan: reddedildi, banner onayı gerekiyor) */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          // Consent Mode v2: Varsayılan DENIED — cookie banner onayı gerekiyor
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            wait_for_update: 2000
          });
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}} />

        {/* Microsoft Clarity — kendi ID'nizi buraya girin */}
        <Script id="clarity-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "XXXXXXXXXX");
        `}} />
      </head>
      <body className={`${manrope.variable} ${montserrat.variable} font-sans bg-[#f9f9f9] text-[#0a0a0a] antialiased overflow-x-hidden`}>
        <PageTransition>
          {children}
        </PageTransition>
=======
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
>>>>>>> af95c5e01727726729b8998b768eba18a609e6f0
      </body>
    </html>
  )
}
