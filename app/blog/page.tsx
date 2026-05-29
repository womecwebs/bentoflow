import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  Sparkles,
  BookMarked,
  Layers, 
  Compass
} from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogData';

export const metadata: Metadata = {
  title: 'Bento Grid Design Guides & Educational Blog | BentoFlow Pro',
  description: 'Master professional Bento grid composition. Read our analytical design journals regarding responsive layout practices, SaaS marketing architectures, and custom Tailwind setups.',
  keywords: [
    'bento design guide',
    'modern portfolio blog',
    'UX layouts case studies',
    'bento box design secrets'
  ],
  openGraph: {
    title: 'Bento Grid Design Guides & Educational Blog',
    description: 'Expert-level design principles, coding templates, and optimization guides to supercharge your web layout. Complete, fast server-side outputs.',
    url: 'https://bentoflow.pro/blog',
    siteName: 'BentoFlow Pro',
    type: 'website'
  }
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-zinc-950/20 py-8 sm:py-16 relative z-10 text-left animate-fade-in">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* BRAND EDUCATIONAL BLOG HEADER MODULE */}
        <div className="flex flex-col gap-5 max-w-2xl border-b border-zinc-900 pb-10 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 w-fit">
            <BookMarked className="h-3.5 w-3.5 text-purple-400" />
            Bento design Guides
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-none">
            Grid Design & Craft.
          </h1>
          <p className="text-sm sm:text-base text-zinc-405 leading-relaxed font-sans font-medium">
            Learn the structural techniques for high-density information layout templates. Explore real case studies from Apple, Stripe, and modern creators.
          </p>
        </div>

        {/* ARTICLES MAIN SECTION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {BLOG_POSTS.map((post) => (
            <article 
              key={post.slug}
              className="group flex flex-col justify-between p-7 sm:p-8 rounded-2xl border border-zinc-900 bg-zinc-950/50 hover:bg-zinc-950/85 hover:border-zinc-800 hover:shadow-2xl transition-all duration-300 relative text-left"
            >
              <div className="absolute inset-0 bg-grid-pattern-dense opacity-[0.04] pointer-events-none" />

              <div className="space-y-4 relative z-10">
                
                {/* Categorization & Metadata headers */}
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider font-bold">
                  <span className="text-[#22c55e]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2 text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Article Name and paragraph excerpt */}
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

              </div>

              {/* Action triggering bar */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-900/60 relative z-10">
                <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold">
                  Educational Journal
                </span>

                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-850 hover:border-zinc-700 text-xs font-bold text-zinc-300 group-hover:text-white transition-all duration-200"
                >
                  Read Journal
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

            </article>
          ))}
        </div>

        {/* Dynamic callout banner card at bottom */}
        <div className="mt-16 p-8 rounded-2xl border border-dashed border-zinc-900 bg-zinc-950/30 text-center flex flex-col items-center justify-center gap-4">
          <span className="p-3 bg-zinc-900 border border-zinc-800 text-emerald-400 rounded-full">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </span>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">Have a design layout challenge?</h4>
            <p className="text-xs text-zinc-500 max-w-sm">Use our custom visual generator tools suite to implement bento structures dynamically.</p>
          </div>
          <Link
            href="/generator"
            className="px-4 py-2 bg-zinc-90 w-fit rounded-lg border border-zinc-850 text-xs text-zinc-350 hover:text-white font-bold transition-all"
          >
            Start Designing
          </Link>
        </div>

      </div>
    </div>
  );
}
