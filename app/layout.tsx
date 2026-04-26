import type { Metadata } from 'next'
import { Montserrat, Manrope } from 'next/font/google'
import Script from 'next/script'
import PageTransition from './components/PageTransition'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' })
const manrope    = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })

const siteUrl = 'https://kineticperformans.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'KINETIC | Spor ve Performans Yönetimi', template: '%s | KINETIC Performans' },
  description: "Atletizm temelli bilimsel metotlarla birebir performans koçluğu, BESYO/POMEM sınav hazırlığı ve takım eğitimleri.",
  keywords: ['performans koçluğu','atletizm antrenmanı','BESYO hazırlık','POMEM parkur','sprint antrenmanı','spor koçu','KINETIC performans'],
  authors: [{ name: 'Abdusselam Karahan' }],
  creator: 'KINETIC Performans Yönetimi',
  openGraph: {
    type: 'website', locale: 'tr_TR', url: siteUrl, siteName: 'KINETIC Performans',
    title: 'KINETIC | Spor ve Performans Yönetimi',
    description: "Atletizm temelli bilimsel metotlarla birebir performans koçluğu.",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'KINETIC Performans Yönetimi' }],
  },
  twitter: { card: 'summary_large_image', title: 'KINETIC | Performans Yönetimi', description: "BESYO/POMEM ve elite performans koçluğu.", images: ['/og-image.jpg'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: siteUrl },
  icons: { icon: '/favicon.ico', shortcut: '/favicon.ico' },
}

const services = [
  {
    name: 'Birebir Performans Koçluğu',
    description: 'Amatör veya profesyonel sporcular için maksimum hız, patlayıcı güç ve branşa özgü kondisyon yüklemeleri.',
    serviceType: 'Performance Coaching',
  },
  {
    name: 'BESYO & POMEM Parkur Eğitimi',
    description: 'Saniyelerin hayat değiştirdiği sınavlar için taktiksel driller, sıçrama mekaniği ve hata sıfırlama çalışmaları.',
    serviceType: 'Exam Preparation',
  },
  {
    name: 'Seminer & Takım Ölçümleri',
    description: 'Kulüpler ve okullar için antrenman bilimi seminerleri, fiziksel uygunluk testleri ve takım taramaları.',
    serviceType: 'Team Assessment',
  },
]

const faqs = [
  {
    q: 'Sadece profesyonel sporcularla mı çalışıyorsunuz?',
    a: 'Hayır. Spora yeni başlayan, sağlıklı bir yaşama adım atmak isteyen veya BESYO/POMEM gibi özel parkur sınavlarına hazırlanan herkesle, seviyelerine uygun şekilde çalışıyoruz.',
  },
  {
    q: 'Antrenmanlar nerede yapılıyor?',
    a: "Programın türüne göre uygun atletizm pistlerinde, parklarda veya anlaşmalı spor tesislerinde saha uygulamalarımızı gerçekleştiriyoruz.",
  },
  {
    q: 'Beslenme programı yazıyor musunuz?',
    a: 'Performans koçluğu antrenman bilimine odaklanır. Beslenme konusunda genel stratejik tavsiyeler vermekle birlikte, klinik diyet programları için uzman diyetisyenlerle ortaklaşa ilerlemeyi tercih ediyoruz.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'KINETIC Performans Yönetimi', url: siteUrl,
      description: "Atletizm temelli bilimsel metotlarla birebir performans koçluğu.",
      logo: `${siteUrl}/favicon.ico`,
      image: `${siteUrl}/og-image.jpg`,
      telephone: '+905337013723',
      address: { '@type': 'PostalAddress', addressCountry: 'TR' },
      sameAs: ['https://instagram.com/kineticperformans'],
      areaServed: { '@type': 'Country', name: 'Türkiye' },
      makesOffer: services.map((s, i) => ({
        '@type': 'Offer',
        '@id': `${siteUrl}/#service-${i + 1}`,
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.description,
          serviceType: s.serviceType,
          provider: { '@id': `${siteUrl}/#organization` },
          areaServed: { '@type': 'Country', name: 'Türkiye' },
        },
      })),
    },
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: 'KINETIC Performans', publisher: { '@id': `${siteUrl}/#organization` }, inLanguage: 'tr-TR' },
    { '@type': 'Person', '@id': `${siteUrl}/#trainer`, name: 'Abdusselam Karahan', jobTitle: 'Baş Antrenör & Kurucu', worksFor: { '@id': `${siteUrl}/#organization` }, alumniOf: 'Burdur Mehmet Akif Ersoy Üniversitesi' },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

// ── Google Analytics Measurement ID — kendi ID'nizi buraya girin ──
const GA_ID = 'G-XXXXXXXXXX'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
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
      </body>
    </html>
  )
}
