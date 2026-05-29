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
  Briefcase,
  Play
} from 'lucide-react';
import { TEMPLATES } from '@/data/templatesData';
import TemplateWorkspacePreview from '@/components/TemplateWorkspacePreview';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TEMPLATES.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = TEMPLATES.find((t) => t.slug === slug);

  if (!template) {
    return {
      title: 'Template Not Found | BentoFlow',
    };
  }

  return {
    title: `${template.title} - Free Responsive Bento Grid Layout | BentoFlow`,
    description: `Visually build, customize and export Tailwind, React, or CSS Grid code for ${template.title}. ${template.description}`,
    keywords: [
      `${template.slug} grid`,
      'bento code layout preset',
      'tailwind bento block configuration',
      'interactive web layouts compiler'
    ],
    openGraph: {
      title: `${template.title} - Free Responsive Bento Grid Layout | BentoFlow`,
      description: template.description,
      url: `https://bentoflow.pro/templates/${template.slug}`,
      type: 'article',
    }
  };
}

export default async function TemplatePage({ params }: PageProps) {
  const { slug } = await params;
  const template = TEMPLATES.find((t) => t.slug === slug);

  if (!template) {
    notFound();
  }

  // Affiliate recommendations dataset specific to detail view page
  const recommendations = [
    {
      title: 'Hostinger Cloud',
      bullet: 'High-Speed Grid Hosting',
      description: 'Ultra-secured cloud hosting optimized for fast Next.js templates and single-screen static bento profiles.',
      url: 'https://hostinger.com',
      icon: Server,
      iconColor: 'text-purple-400'
    },
    {
      title: 'Vercel Edge',
      bullet: 'Edge Deploy in Seconds',
      description: 'Push your exported Tailwind or React layout straight to production with lightning-fast CD pipelines.',
      url: 'https://vercel.com',
      icon: Zap,
      iconColor: 'text-emerald-400'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950/20 py-8 sm:py-12 relative z-10 text-left">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        
        {/* Back navigation */}
        <div className="mb-8">
          <Link 
            href="/templates" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Templates Catalog
          </Link>
        </div>

        {/* Master Details layout splitting */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: DETAILED DOCUMENTATION & OPTIMIZIED MONETIZATION AFFILIATES */}
          <aside className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Template Header block */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-805 bg-zinc-90 w-fit text-xs text-zinc-300 font-sans">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {template.category} Preset
              </span>

              <h1 className="text-3xl sm:text-4.5xl font-extrabold tracking-tight text-white leading-none">
                {template.title}
              </h1>
              
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {template.longDescription}
              </p>
            </div>

            {/* PRIMARY CALL TO ACTION BUTTON -> WORKSPACE REDIRECT */}
            <div className="pt-2 border-t border-zinc-900">
              <Link
                href={`/generator?template=${template.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white text-zinc-950 text-xs sm:text-sm font-bold shadow-2xl transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <Play className="h-4 w-4 fill-current text-zinc-950" />
                Customize in Visual Grid Workspace
              </Link>
              <p className="text-[10px] text-zinc-500 font-mono mt-2.5 text-center">
                Instant mount coordinates. Free, zero credential configurations required.
              </p>
            </div>

            {/* Optimization Checklist features */}
            <div className="space-y-4 p-5 sm:p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40">
              <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                Structural Specifications
              </h3>
              <ul className="space-y-3">
                {template.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-xs text-zinc-300 leading-relaxed font-sans">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Monetization partner boxes */}
            <div className="space-y-4">
              <div className="border-b border-zinc-900 pb-2">
                <h3 className="text-xs font-bold text-zinc-400 uppercase font-mono tracking-wider">
                  Recommended Deployment Partners
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendations.map((rec, idx) => {
                  const Icon = rec.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950/80 hover:border-zinc-800 transition-all flex flex-col justify-between text-left group"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className={`p-2 rounded-lg bg-zinc-900 border border-zinc-850 ${rec.iconColor}`}>
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="text-[8px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-500 border border-zinc-850 font-semibold">
                            Recommended
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white mb-1 leading-tight">{rec.title}</h4>
                        <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">{rec.description}</p>
                      </div>

                      <a
                        href={rec.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-805 text-[10px] text-zinc-300 font-semibold transition-all"
                      >
                        Visit Platform
                        <ExternalLink className="h-3 w-3 text-zinc-500" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

          </aside>

          {/* RIGHT COLUMN: INTERACTIVE VIEWPORT PREVIEW CANVAS AND CODE HIGHLIGHT */}
          <main className="lg:col-span-7">
            <TemplateWorkspacePreview template={template} />
          </main>

        </div>

      </div>
    </div>
  );
}
