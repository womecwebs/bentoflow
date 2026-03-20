import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Bookmark, Clock, ArrowRight } from 'lucide-react';
import { blogPosts, BlogPost as BlogPostType } from '../data/blog';
import { SEO } from '../components/seo/SEO';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
    } else {
      // If post not found, redirect to blog hub
      navigate('/blog');
    }
  }, [slug, navigate]);

  if (!post) return null;

  // Schema for BlogPosting
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://bentoflow.pro/blog/${post.slug}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "BentoFlow Pro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bentoflow.pro/logo.png"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
      <SEO 
        title={`${post.title} | BentoFlow Design Blog`}
        description={post.description}
        ogImage={post.image}
        schema={blogPostingSchema}
        keywords={post.keywords}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-400 transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              {post.category}
            </span>
            <div className="flex items-center gap-1 text-sm text-zinc-500">
              <Clock className="w-4 h-4" />
              5 min read
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-lg font-bold text-emerald-400">
                {post.author[0]}
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-200">{post.author}</div>
                <div className="text-xs text-zinc-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.datePublished).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-xl bg-zinc-900 border border-white/5 hover:border-emerald-500/30 transition-all">
                <Share2 className="w-5 h-5 text-zinc-400" />
              </button>
              <button className="p-2 rounded-xl bg-zinc-900 border border-white/5 hover:border-emerald-500/30 transition-all">
                <Bookmark className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-12 border border-white/5">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Key Takeaways - AEO Optimized */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 mb-12"
        >
          <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-emerald-500 rounded-full" />
            Key Takeaways
          </h2>
          <ul className="space-y-3">
            {post.takeaways.map((takeaway, i) => (
              <li key={i} className="flex gap-3 text-zinc-300">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                {takeaway}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Article Body */}
        <article className="prose prose-invert prose-emerald max-w-none mb-16">
          <div 
            className="text-zinc-300 leading-relaxed space-y-6 text-lg"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>

        {/* Internal Links & CTAs */}
        <footer className="pt-12 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Link 
              to="/generator" 
              className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/30 transition-all group"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">AI Bento Generator</h3>
              <p className="text-sm text-zinc-500 mb-4">Ready to build your own? Try our powerful AI-driven modular layout tool.</p>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                Build Now <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
            <Link 
              to="/marketplace" 
              className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/30 transition-all group"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">Premium Marketplace</h3>
              <p className="text-sm text-zinc-500 mb-4">Browse high-quality, production-ready bento templates for your next project.</p>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                Browse Templates <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>

          {/* Related Posts */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8">Related Reading</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {blogPosts
                .filter(p => p.id !== post.id && p.category === post.category)
                .slice(0, 2)
                .map(related => (
                  <Link 
                    key={related.id} 
                    to={`/blog/${related.slug}`}
                    className="group"
                  >
                    <div className="aspect-video rounded-2xl overflow-hidden mb-4 border border-white/5">
                      <img 
                        src={related.image} 
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                    <h4 className="font-bold group-hover:text-emerald-400 transition-colors">{related.title}</h4>
                  </Link>
                ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="p-12 rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-white/10 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Bento Revolution</h2>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
              BentoFlow is the #1 platform for modular UI design. Start building your responsive grid layouts today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/generator" 
                className="px-8 py-4 rounded-2xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors"
              >
                Get Started for Free
              </Link>
              <Link 
                to="/community" 
                className="px-8 py-4 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors border border-white/10"
              >
                View Community Gallery
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BlogPost;
