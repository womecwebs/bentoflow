import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReaddyPromoModal from '@/components/ReaddyPromoModal';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'BentoFlow Pro | High-Performance Bento Grid Builder & Generator',
  description: 'Create stunning, responsive, and SEO-optimized Bento Grids for Tailwind CSS, portfolios, and Shopify in seconds with our advanced developer-first visual editor.',
  keywords: [
    'Bento Grid Generator',
    'Bento design layout',
    'Tailwind CSS Grid Builder',
    'portfolio bento templates',
    'Shopify bento design',
    'SSR Next.js visual generator'
  ],
  authors: [{ name: 'BentoFlow Pro Team' }],
  metadataBase: new URL('https://bentoflow-pro.vercel.app'),
  openGraph: {
    title: 'BentoFlow Pro | High-Performance Bento Grid Builder',
    description: 'The ultimate SaaS platform for generating high-performance, accessible, and SEO-optimized Bento Grids for Tailwind CSS, portfolios, and Shopify.',
    url: 'https://bentoflow-pro.vercel.app',
    siteName: 'BentoFlow Pro',
    images: [
      {
        url: 'https://picsum.photos/seed/bentoflow/1200/630',
        width: 1200,
        height: 630,
        alt: 'BentoFlow Pro Workspace Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BentoFlow Pro | High-Performance Bento Grid Builder',
    description: 'Design stunning bento grid layouts in seconds. Copy clean Tailwind CSS, React, or responsive HTML code with pristine layout density.',
    images: ['https://picsum.photos/seed/bentoflow/1200/630'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Google Site Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SDFMW8BE8R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SDFMW8BE8R');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col antialiased">
        {/* Ambient Grid overlay and glowing light effects */}
        <div className="fixed inset-0 bg-grid-pattern bg-ambient-glow pointer-events-none -z-50 opacity-100" />
        
        {/* Navigation Bar */}
        <Navbar />

        {/* Global children content area */}
        <main className="flex-grow flex flex-col relative z-10 w-full">
          {children}
        </main>

        {/* Dynamic SEO Link Footer */}
        <Footer />

        {/* High-Converting Readdy.ai Interactive Promo Modal */}
        <ReaddyPromoModal />
      </body>
    </html>
  );
}

