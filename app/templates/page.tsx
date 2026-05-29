import type { Metadata } from 'next';
import TemplatesClient from '@/components/TemplatesClient';

export const metadata: Metadata = {
  title: 'Free Bento Grid Layout Templates & Visual Presets | BentoFlow',
  description: 'Explore our catalog of high-performance Bento Grid structural layout templates. Instantly copy code coordinates for Tailwind, React, and raw CSS grids.',
  keywords: [
    'bento grid templates',
    'free bento layouts',
    'ready-made grids tailwind',
    'portfolio bento layout preview',
    'SaaS grid templates dashboard'
  ],
  openGraph: {
    title: 'Free Bento Grid Layout Templates catalog | BentoFlow',
    description: 'Find premium responsive bento templates. Import layouts into our visual grid editor with one click.',
    url: 'https://bentoflow-pro.vercel.app/templates',
    siteName: 'BentoFlow Pro',
    type: 'website',
  }
};

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-zinc-950/20 py-8 sm:py-12 relative z-10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        
        {/* Templates Visual Grid Hub mounting point */}
        <TemplatesClient />
        
      </div>
    </div>
  );
}
