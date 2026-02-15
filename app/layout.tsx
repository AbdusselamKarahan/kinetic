import type { Metadata } from 'next'
import { Montserrat, Manrope } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export const metadata: Metadata = {
  title: 'KINETIC | Spor ve Performans Yönetimi',
  description: 'Isparta profesyonel atletizm eğitimleri ve performans koçluğu.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${manrope.variable} ${montserrat.variable} font-sans bg-[#f9f9f9] text-[#0a0a0a] antialiased`}>
        {children}
      </body>
    </html>
  )
}