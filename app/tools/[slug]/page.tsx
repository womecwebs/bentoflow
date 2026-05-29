import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle, 
  Layers, 
  Server, 
  Zap, 
  ExternalLink,
  Laptop,
  Check,
  ShieldAlert,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { TOOLS } from '@/data/toolsData';
import ToolWorkspaceClient from '@/components/ToolWorkspaceClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TOOLS.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: 'Developer Tool Not Found | BentoFlow',
    };
  }

  return {
    title: `${tool.title} | Free Online Developer Utility Tool`,
    description: tool.longDescription,
    keywords: [
      `${tool.slug} generator`,
      'bento code layout tools',
      'developer CSS utility stylesheet compiler'
    ],
    openGraph: {
      title: `${tool.title} | Free Online Developer Utility Tool`,
      description: tool.shortDescription,
      url: `https://bentoflow.pro/tools/${tool.slug}`,
      type: 'article'
    }
  };
}

export default async function ToolDynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  // Dual affiliate marketing options
  const partnerAffiliates = [
    {
      title: 'Hostinger Premium',
      bullet: 'High-Performance Cloud',
      description: 'Host static or fullstack bento portfolios, image-heavy grid apps with 99.9% uptime guarantees.',
      url: 'https://hostinger.com',
      badge: 'Highly Recommended'
    },
    {
      title: 'Namecheap Domains',
      bullet: 'Secure Brand Names',
      description: 'Find premium .COM and .IO domains to publish your newly exported bento grid templates instantly.',
      url: 'https://namecheap.mobi',
      badge: 'Best Value'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950/20 py-8 sm:py-12 relative z-10 text-left">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        
        {/* Navigation row */}
        <div className="mb-8">
          <Link 
            href="/tools" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Developer Tools List
          </Link>
        </div>

        {/* Master Detail Grid splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDEBAR: DETAILED DOCUMENTATION AND CONVERTING HOSTING PARTNER SHIELDS */}
          <aside className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Header info card */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-805 bg-zinc-90 text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                {tool.category} Utility
              </span>

              <h1 className="text-3xl sm:text-4.5xl font-extrabold tracking-tight text-white leading-tight">
                {tool.title}
              </h1>
              
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {tool.longDescription}
              </p>
            </div>

            {/* Backlink to general generator */}
            <div className="pt-2 border-t border-zinc-900 space-y-3">
              <Link
                href="/generator"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-750 text-xs text-white font-bold transition-transform hover:scale-[1.01]"
              >
                <Layers className="h-4 w-4 text-purple-400" />
                Open Standard Layout Generator
              </Link>
            </div>

            {/* Technical checklist boxes */}
            <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/45 space-y-4">
              <div className="flex items-center gap-1.5">
                <Laptop className="h-4.5 w-4.5 text-blue-400" />
                <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  Utility Specs & Features
                </h4>
              </div>
              <ul className="space-y-3">
                <li className="flex gap-2.5 text-xs text-zinc-350 leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  Instantly compiled CSS & HTML properties.
                </li>
                <li className="flex gap-2.5 text-xs text-zinc-350 leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  Responsive CSS grid & Tailwind preset classes matching standard layout templates.
                </li>
                <li className="flex gap-2.5 text-xs text-zinc-350 leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  No login, credit credentials or sign-up states required for exports.
                </li>
              </ul>
            </div>

            {/* CONVERTING AFFILIATES SECTION */}
            <div className="space-y-4">
              <div className="border-b border-zinc-900 pb-2">
                <h3 className="text-xs font-bold text-zinc-400 uppercase font-mono tracking-wider">
                  Recommended Domain & Web Hosting Options
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {partnerAffiliates.map((affNode, index) => (
                  <div 
                    key={index}
                    className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950/60 flex flex-col justify-between text-left group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-emerald-400 border border-zinc-850 font-bold">
                          {affNode.badge}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white mb-0.5">{affNode.title}</h4>
                      <p className="text-[10px] text-zinc-500 font-mono tracking-wide leading-tight mb-3">{affNode.bullet}</p>
                      <p className="text-[10px] text-zinc-400 leading-relaxed mb-4">{affNode.description}</p>
                    </div>

                    <a
                      href={affNode.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="w-full inline-flex items-center justify-center gap-1 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-805 text-[10px] text-zinc-300 font-semibold transition-colors"
                    >
                      Visit Hosting Page
                      <ExternalLink className="h-3 w-3 text-zinc-500" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </aside>

          {/* RIGHT VIEWPORT PANEL: RENDER TOOL WORKSPACE COMPONENT */}
          <main className="lg:col-span-7">
            <ToolWorkspaceClient tool={tool} />
          </main>

        </div>

      </div>
    </div>
  );
}
