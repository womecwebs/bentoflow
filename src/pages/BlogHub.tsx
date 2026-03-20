import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { SEO } from '../components/seo/SEO';

const BlogHub: React.FC = () => {
  // Schema for CollectionPage
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "BentoFlow Design Blog",
    "description": "The ultimate resource for Bento Grid layouts, modular UI design, and modern web trends in 2026.",
    "url": "https://bentoflow.pro/blog",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": blogPosts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://bentoflow.pro/blog/${post.slug}`
      }))
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
      <SEO 
        title="Design Blog | BentoFlow Pro - Modular UI & Bento Grids"
        description="Explore the latest trends in Bento Grid layouts, modular UI design, and modern web development. Insights from the creators of BentoFlow."
        ogImage="https://picsum.photos/seed/blog-hub/1200/630"
        schema={collectionSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4 uppercase tracking-wider"
          >
            Design Blog
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            Insights on <span className="text-emerald-400">Modular UI</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl"
          >
            The 2026 guide to Bento Grids, responsive design, and the future of web layouts.
          </motion.p>
        </header>

        {/* Bento Grid Layout for Posts */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {blogPosts.map((post, index) => {
            // Determine grid span based on index for a "stunning" bento feel
            let span = "md:col-span-4";
            if (index === 0) span = "md:col-span-8 md:row-span-2";
            if (index === 1) span = "md:col-span-4 md:row-span-1";
            if (index === 2) span = "md:col-span-4 md:row-span-1";
            if (index === 5) span = "md:col-span-6 md:row-span-1";
            if (index === 6) span = "md:col-span-6 md:row-span-1";

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`${span} group relative bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all duration-500`}
              >
                <Link to={`/blog/${post.slug}`} className="block h-full">
                  <div className="relative h-full flex flex-col">
                    {/* Image */}
                    <div className={`relative overflow-hidden ${index === 0 ? 'h-64 md:h-full' : 'h-48'}`}>
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>

                    {/* Content Overlay for Large Card */}
                    <div className={`${index === 0 ? 'absolute bottom-0 left-0 right-0 p-8' : 'p-6 flex-grow flex flex-col'}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-semibold uppercase tracking-wider text-zinc-300">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.datePublished).toLocaleDateString()}
                        </div>
                      </div>

                      <h2 className={`${index === 0 ? 'text-3xl md:text-4xl' : 'text-xl'} font-bold mb-3 group-hover:text-emerald-400 transition-colors`}>
                        {post.title}
                      </h2>

                      <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
                        {post.description}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-400">
                            {post.author[0]}
                          </div>
                          <span className="text-xs text-zinc-500">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Read More <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* Newsletter / CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 rounded-[2.5rem] bg-emerald-500 relative overflow-hidden text-black"
        >
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">Stay ahead of the grid.</h2>
            <p className="text-lg font-medium mb-8 opacity-80">
              Get the latest design trends, modular UI tips, and BentoFlow updates delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-grow px-6 py-4 rounded-2xl bg-white/20 border border-black/10 placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/20"
              />
              <button className="px-8 py-4 rounded-2xl bg-black text-white font-bold hover:bg-zinc-900 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
        </motion.section>
      </div>
    </div>
  );
};

export default BlogHub;
