import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Sparkles, 
  Layers, 
  Bookmark,
  Share2,
  ChevronRight
} from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found | BentoFlow',
    };
  }

  return {
    title: `${post.title} | BentoFlow Editorial`,
    description: post.excerpt,
    keywords: [
      `${post.slug}`,
      'bento grid layouts article',
      'developer CSS guide styling tips'
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://bentoflow.pro/blog/${post.slug}`,
      type: 'article',
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related articles links inside sidebar
  const otherPosts = BLOG_POSTS.filter(p => p.slug !== slug);

  return (
    <div className="min-h-screen bg-zinc-950/20 py-8 sm:py-16 relative z-10 text-left animate-fade-in">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        
        {/* Back navigation */}
        <div className="mb-10">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Design Journals
          </Link>
        </div>

        {/* CORE SEMANTIC ARTICLE CONTAINER */}
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main textual reading lane (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Metadata & title banner */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-805 bg-zinc-90 text-[10px] font-mono font-bold text-[#22c55e] uppercase tracking-wider">
                {post.category} Journal
              </span>

              <h1 className="text-3xl sm:text-4.5xl font-extrabold tracking-tight text-white leading-tight font-sans">
                {post.title}
              </h1>

              {/* Editorial Author Panel */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 pt-3 border-t border-b border-zinc-900/60 py-4">
                <div className="flex items-center gap-1.5 font-sans">
                  <span className="h-7 w-7 rounded-full bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-wider font-semibold">
                    BF
                  </span>
                  <span className="font-semibold text-zinc-300">BentoFlow Editorial</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {post.publishedAt}
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </div>
              </div>
            </div>

            {/* HIGH QUALITY DOCUMENTATION PROSE / RICH TYPOGRAPHY WRAPPER */}
            <div className="prose prose-invert prose-zinc max-w-none text-zinc-300 space-y-6 text-sm sm:text-base leading-relaxed">
              
              {/* Parse and split core markdown headers */}
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-xl sm:text-2xl font-bold text-white pt-6 border-b border-zinc-900 pb-2 font-sans tracking-tight">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-base sm:text-lg font-bold text-[#22c55e] pt-4 font-sans tracking-tight">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('* ')) {
                  return (
                    <ul key={index} className="list-disc pl-5 space-y-2 text-zinc-400">
                      {paragraph.split('\n').map((li, liIdx) => (
                        <li key={liIdx}>{li.replace('* ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.startsWith('```')) {
                  // Custom clean dark code highlighter structure
                  const cleanText = paragraph.replace(/```[a-z]*/g, '').trim();
                  return (
                    <pre key={index} className="p-4 rounded-xl bg-zinc-900 border border-zinc-801 font-mono text-xs text-zinc-350 overflow-x-auto select-all leading-relaxed whitespace-pre">
                      {cleanText}
                    </pre>
                  );
                }
                return (
                  <p key={index} className="leading-relaxed text-zinc-400">
                    {paragraph}
                  </p>
                );
              })}

            </div>

          </div>

          {/* Sidebar recommendations pane (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Quick customizable layouts CTA advert */}
            <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/60 flex flex-col justify-between text-left relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <span className="p-2 border border-purple-500/20 bg-purple-500/10 text-purple-400 rounded-lg inline-block">
                  <Layers className="h-5 w-5" />
                </span>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Visual Workspace Layouts
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Build and export beautiful custom responsive grids matching modern brand specifications.
                  </p>
                </div>

                <Link
                  href="/generator"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-lg bg-white text-zinc-950 text-xs font-bold transition-transform hover:scale-[1.01] shadow-xl"
                >
                  Launch Editor Page
                  <ChevronRight className="h-4 w-4 text-zinc-950" />
                </Link>
              </div>
            </div>

            {/* Other active journals to read */}
            {otherPosts.length > 0 && (
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-4">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">
                  Related Read Files
                </h4>
                <div className="space-y-3">
                  {otherPosts.map((other) => (
                    <Link 
                      key={other.slug}
                      href={`/blog/${other.slug}`}
                      className="block p-3 rounded-xl hover:bg-zinc-900/40 border border-transparent hover:border-zinc-850 duration-200 transition-all text-left group"
                    >
                      <span className="text-[9px] font-mono text-[#22c55e] uppercase font-bold tracking-wider">{other.category}</span>
                      <h5 className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors mt-0.5 leading-snug line-clamp-2">
                        {other.title}
                      </h5>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Institutional copy license metadata */}
            <div className="p-4 text-left border border-zinc-900/60 rounded-xl bg-zinc-950/10">
              <p className="text-[10px] text-zinc-550 leading-relaxed">
                © {new Date().getFullYear()} BentoFlow Pro Publishing group. Standard creative educational licenses apply to all code layouts outputs.
              </p>
            </div>

          </aside>

        </article>

      </div>
    </div>
  );
}
