import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
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
  metadataBase: new URL('https://bentoflow.netlify.app'),
  openGraph: {
    title: 'BentoFlow Pro | High-Performance Bento Grid Builder',
    description: 'The ultimate SaaS platform for generating high-performance, accessible, and SEO-optimized Bento Grids for Tailwind CSS, portfolios, and Shopify.',
    url: 'https://bentoflow.netlify.app',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
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

