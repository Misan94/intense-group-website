import type { Metadata } from 'next'
import { DM_Serif_Display, Quicksand } from 'next/font/google'
import StructuredData from '@/components/StructuredData'
import AppWrapper from '@/components/AppWrapper'
import './globals.css'

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-serif',
  display: 'swap',
})

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-quicksand',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Intense Group - A decade of growth, creativity, data & AI',
    template: '%s | Intense Group'
  },
  description: 'We unite strategy, performance, creative, data, and MarTech to move brands forward across Africa and Europe.',
  keywords: [
    'marketing agency',
    'growth marketing',
    'creative agency',
    'data-driven marketing',
    'AI marketing',
    'performance marketing',
    'brand strategy',
    'digital marketing',
    'MarTech',
    'creator marketing'
  ],
  authors: [{ name: 'Intense Group' }],
  creator: 'Intense Group',
  publisher: 'Intense Group',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://intensegroup.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Intense Group - A decade of growth, creativity, data & AI',
    description: 'We unite strategy, performance, creative, data, and MarTech to move brands forward across Africa and Europe.',
    url: 'https://intensegroup.com',
    siteName: 'Intense Group',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Intense Group - Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intense Group - A decade of growth, creativity, data & AI',
    description: 'We unite strategy, performance, creative, data, and MarTech to move brands forward across Africa and Europe.',
    images: ['/twitter-image.jpg'],
    creator: '@intensegroup',
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${quicksand.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="font-quicksand antialiased">
        <StructuredData />
        <AppWrapper>
          <div className="min-h-screen bg-white">
            {children}
          </div>
        </AppWrapper>
      </body>
    </html>
  )
}
