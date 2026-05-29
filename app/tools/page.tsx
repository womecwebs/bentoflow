import type { Metadata } from 'next';
import ToolsClient from '@/components/ToolsClient';

export const metadata: Metadata = {
  title: 'Developer Utilities & Micro Tools Workspace | BentoFlow Pro',
  description: 'Explore our catalog of custom micro-tools and developer utilities designed to make Bento composition easier. Export CSS mesh, frosted glass styles, and grid patterns.',
  keywords: [
    'bento developer tools',
    'css shadow generator',
    'glassmorphic bento generator',
    'tailwind spacing calibrator',
    'bento grid cv creator'
  ],
  openGraph: {
    title: 'Developer Utilities & Micro Tools Workspace',
    description: '40+ custom-built responsive developer web components and styling frameworks. Simplify your design workflow with premium visual builders.',
    url: 'https://bentoflow-pro.vercel.app/tools',
    siteName: 'BentoFlow Pro',
    type: 'website'
  }
};

export default function ToolsHubPage() {
  return (
    <div className="min-h-screen bg-zinc-950/20 py-8 sm:py-12 relative z-10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        
        {/* Dynamic Client View rendering with sidebar filters */}
        <ToolsClient />
        
      </div>
    </div>
  );
}
