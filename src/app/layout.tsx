import type { Metadata } from 'next'
import { Figtree, Noto_Sans_SC } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
})

const notoSans = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '唐小侠 - 糖尿病终身伙伴',
  description: '专为中老年人设计的糖尿病管理平台，真人护理团队全天候服务，让控糖不再是孤独的修行。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${figtree.variable} ${notoSans.variable}`}>
      <body className="bg-background font-sans text-text-primary min-h-screen flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-lg z-50">
          跳转到主要内容
        </a>
        <Navigation />
        <main id="main-content" className="flex-grow mt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
