import React from 'react';
import { Link } from 'react-router-dom';
import { SEOSection } from '../components/layout/SEOSection';
import { LayoutGrid, Zap, Shield, Globe, ArrowRight, Sparkles, ShoppingBag, Wrench } from 'lucide-react';
import { motion } from 'motion/react';

export const Home: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "BentoFlow Pro",
    "operatingSystem": "Web",
    "applicationCategory": "DesignApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full bg-emerald-500/10 blur-[120px] -z-10" />
        
        {/* Animated Popping Card */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 5 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 1.5 
          }}
          className="absolute top-20 right-[10%] hidden lg:block z-20"
        >
          <div className="bg-emerald-500 text-black px-6 py-4 rounded-2xl font-bold shadow-2xl shadow-emerald-500/40 flex items-center gap-3 border-2 border-white/20">
            <Sparkles size={20} />
            <span>Create a full website with AI website builder</span>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-emerald-400 mb-8"
          >
            <Zap size={14} />
            <span>Next-Gen Bento Grid Builder</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
          >
            Design Stunning <br /> Bento Grids in Seconds.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            The ultimate SaaS platform for generating high-performance, accessible, and SEO-optimized Bento Grids for Tailwind CSS, Shopify, and Portfolios.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/editor" 
              className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2 group"
            >
              Start Building Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/marketplace" 
              className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
            >
              View Templates
            </Link>
          </motion.div>
        </div>
      </section>

      {/* AI Website Builder Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20">
              <Sparkles className="text-emerald-400" size={24} />
            </div>
            <h2 className="text-4xl font-bold mb-6">AI Website Builder</h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              Generate complete, multi-file websites in seconds. Our AI doesn't just write code; it crafts production-ready architectures with index.html, about.html, style.css, and script.js all perfectly synced.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Multi-file project generation',
                'Live real-time preview',
                'One-click ZIP export',
                'Clean, semantic code output'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/generator" className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
              Try the AI Builder <ArrowRight size={18} />
            </Link>
          </motion.div>
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] -z-10" />
            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="space-y-4">
                <div className="h-4 w-3/4 bg-white/10 rounded-full animate-pulse" />
                <div className="h-4 w-1/2 bg-white/10 rounded-full animate-pulse" />
                <div className="h-32 w-full bg-white/5 rounded-2xl animate-pulse" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-20 bg-white/5 rounded-xl animate-pulse" />
                  <div className="h-20 bg-white/5 rounded-xl animate-pulse" />
                  <div className="h-20 bg-white/5 rounded-xl animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Editor Section */}
      <section className="py-24 px-4 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-40 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center">
                <LayoutGrid className="text-emerald-400" size={32} />
              </div>
              <div className="h-60 bg-white/5 border border-white/10 rounded-2xl" />
            </div>
            <div className="space-y-4 pt-8">
              <div className="h-60 bg-white/5 border border-white/10 rounded-2xl" />
              <div className="h-40 bg-white/5 border border-white/10 rounded-2xl" />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10">
              <LayoutGrid className="text-white/60" size={24} />
            </div>
            <h2 className="text-4xl font-bold mb-6">Bento Grid Editor</h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              The most advanced visual editor for Bento layouts. Built on a precise 12-column system, it allows you to drag, resize, and style grid items with pixel-perfect accuracy.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-bold text-white mb-2">12-Column Precision</h4>
                <p className="text-sm text-white/40">Standardized grid system for perfect alignment across all devices.</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">Visual Styling</h4>
                <p className="text-sm text-white/40">Adjust borders, shadows, and glassmorphism effects in real-time.</p>
              </div>
            </div>
            <Link to="/editor" className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
              Open the Editor <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-sm text-emerald-400 mb-6">
                <Globe size={14} />
                <span>Global Community</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Join a Thriving <br /> Design Marketplace.
              </h2>
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                BentoFlow Pro isn't just a tool; it's a community. Share your designs, get inspired by others, and even monetize your layouts through our integrated marketplace.
              </p>
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <Shield size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Verified Creators</h4>
                    <p className="text-sm text-white/40">Every template in our marketplace is vetted for quality and performance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <Zap size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Instant Remix</h4>
                    <p className="text-sm text-white/40">Found a design you love? Remix it instantly and make it your own.</p>
                  </div>
                </div>
              </div>
              <Link to="/community" className="bg-emerald-500 text-black px-8 py-4 rounded-2xl font-bold hover:bg-emerald-400 transition-all inline-flex items-center gap-2">
                Explore the Community <ArrowRight size={20} />
              </Link>
            </motion.div>

            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-[120px] -z-10" />
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-square bg-zinc-900/50 border border-white/10 rounded-3xl overflow-hidden relative group"
                  >
                    <img 
                      src={`https://picsum.photos/seed/bento-${i}/400/400`} 
                      alt="Community Design"
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                    />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 mb-2" />
                      <div className="h-2 w-1/2 bg-white/20 rounded-full" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO & Performance Section */}
      <section className="py-24 px-4 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] -z-10" />
              <div className="bg-zinc-900/80 border border-white/10 rounded-[40px] p-10 backdrop-blur-2xl">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                      <Shield className="text-emerald-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold">SEO Score</h4>
                      <p className="text-xs text-white/40">Optimized for search</p>
                    </div>
                  </div>
                  <div className="text-3xl font-black text-emerald-400">100</div>
                </div>
                <div className="space-y-6">
                  {[
                    { label: 'Performance', value: 98 },
                    { label: 'Accessibility', value: 100 },
                    { label: 'Best Practices', value: 100 }
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">{stat.label}</span>
                        <span className="text-emerald-400 font-bold">{stat.value}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${stat.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-emerald-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 order-1 lg:order-2"
          >
            <h2 className="text-4xl font-bold mb-6">Built for Speed and Visibility.</h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              Every website and grid generated by BentoFlow Pro is optimized for core web vitals. We handle the complex SEO metadata, semantic HTML, and performance tuning so you don't have to.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-white mb-2">AEO Optimized</h4>
                <p className="text-sm text-white/40">Answer Engine Optimization ensures your content is ready for AI-driven search.</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">GEO Ready</h4>
                <p className="text-sm text-white/40">Generative Engine Optimization helps your designs stand out in the age of AI.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Monetization Section */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl font-bold mb-6">Monetize Your Creativity.</h2>
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                Turn your design skills into a revenue stream. Our integrated marketplace allows you to sell your bento layouts and website templates to a global audience.
              </p>
              <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-8 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <ShoppingBag className="text-emerald-400" size={24} />
                  </div>
                  <h4 className="font-bold text-xl">ClickPesa Payments</h4>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  Seamless payment integration for creators. Receive payments instantly from anywhere in the world with secure, low-fee transactions.
                </p>
              </div>
              <Link to="/marketplace" className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
                Start Selling Today <ArrowRight size={18} />
              </Link>
            </motion.div>
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-[120px] -z-10" />
              <div className="bg-zinc-900/50 border border-white/10 rounded-[40px] p-12 backdrop-blur-xl">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <span className="text-white/40 uppercase tracking-widest text-xs font-bold">Recent Sales</span>
                    <span className="text-emerald-400 text-xs font-bold">Live Feed</span>
                  </div>
                  {[
                    { user: 'Sarah D.', amount: 49, time: '2m ago' },
                    { user: 'Alex M.', amount: 29, time: '15m ago' },
                    { user: 'DesignStudio', amount: 99, time: '1h ago' }
                  ].map((sale, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30" />
                        <div>
                          <p className="font-bold text-sm">{sale.user}</p>
                          <p className="text-[10px] text-white/20 uppercase font-bold tracking-tighter">Template Purchase</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-400 font-bold">${sale.amount}</p>
                        <p className="text-[10px] text-white/20">{sale.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace & Tools Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Marketplace & Specialized Tools</h2>
          <p className="text-white/60 max-w-2xl mx-auto">Access a library of premium templates and specialized generators for every platform.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-zinc-900 border border-white/10 rounded-3xl hover:border-emerald-500/30 transition-all">
            <ShoppingBag className="text-emerald-400 mb-6" size={32} />
            <h3 className="text-2xl font-bold mb-4">Template Marketplace</h3>
            <p className="text-white/60 mb-6">
              Browse through dozens of free and premium Bento templates. From personal portfolios to high-converting SaaS landing pages, find the perfect starting point for your project.
            </p>
            <Link to="/marketplace" className="text-sm font-bold text-emerald-400 hover:underline">Explore Marketplace →</Link>
          </div>
          <div className="p-8 bg-zinc-900 border border-white/10 rounded-3xl hover:border-emerald-500/30 transition-all">
            <Wrench className="text-emerald-400 mb-6" size={32} />
            <h3 className="text-2xl font-bold mb-4">Developer Tools</h3>
            <p className="text-white/60 mb-6">
              Specialized generators for Tailwind CSS, Shopify Liquid, and React. Export clean, production-ready code that integrates seamlessly with your existing tech stack.
            </p>
            <Link to="/tools" className="text-sm font-bold text-emerald-400 hover:underline">View All Tools →</Link>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-24 px-4 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Tools</h2>
              <p className="text-white/60">Specialized generators for your specific platform.</p>
            </div>
            <Link to="/tools" className="text-emerald-400 font-bold flex items-center gap-2 hover:text-emerald-300 transition-colors">
              View All Tools
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { slug: 'bento-tailwind-generator', title: 'Tailwind Generator', desc: 'Utility-first grid classes.' },
              { slug: 'shopify-bento-liquid', title: 'Shopify Liquid', desc: 'Dynamic theme sections.' },
              { slug: 'react-bento-component-factory', title: 'React Factory', desc: 'Type-safe components.' },
              { slug: 'ios-control-center-bento-style', title: 'iOS Style', desc: 'Glassmorphism & Squircles.' }
            ].map((tool) => (
              <Link 
                key={tool.slug}
                to={`/tools/${tool.slug}`}
                className="p-6 bg-zinc-900 border border-white/10 rounded-2xl hover:border-emerald-500/50 transition-all group"
              >
                <h3 className="font-bold mb-2 group-hover:text-emerald-400 transition-colors">{tool.title}</h3>
                <p className="text-xs text-white/40 mb-4">{tool.desc}</p>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/60 flex items-center gap-1">
                  Launch <ArrowRight size={10} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Section */}
      <SEOSection 
        title="The Future of Bento Grid Generation"
        summary="BentoFlow Pro is a high-performance SaaS platform designed for developers and designers to create stunning Bento Grids. Featuring programmatic SEO tools, a template marketplace, and seamless payment integration via ClickPesa, it simplifies the process of building modern, grid-based layouts for portfolios, Shopify stores, and Tailwind CSS projects."
        faqs={[
          { q: "How do I export Bento Grids to Tailwind?", a: "Simply design your grid in our visual editor, then toggle the 'Copy Code' button to 'Tailwind'. Our system generates utility-first classes that you can paste directly into your project." },
          { q: "Is BentoFlow Pro mobile-responsive?", a: "Yes. Every grid generated is built on a responsive 12-column system that automatically adapts to smaller viewports using CSS Grid auto-flow logic." },
          { q: "Can I use templates for commercial projects?", a: "Commercial licenses are available for all marketplace templates. You can unlock these features using our integrated ClickPesa payment gateway." }
        ]}
        structuredData={structuredData}
      />

      {/* Comprehensive Footer */}
      <footer className="bg-zinc-950 border-t border-white/10 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="text-black" size={24} />
                </div>
                <span className="text-2xl font-bold tracking-tighter">BentoFlow Pro</span>
              </Link>
              <p className="text-white/40 max-w-sm mb-8 leading-relaxed">
                The world's most advanced Bento Grid generation platform. Empowering designers and developers to build high-performance, SEO-optimized layouts in seconds.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'GitHub', 'Discord', 'LinkedIn'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all">
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-white/20 rounded-sm" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6">Platform</h4>
              <ul className="space-y-4">
                <li><Link to="/editor" className="text-white/40 hover:text-emerald-400 transition-colors">Grid Editor</Link></li>
                <li><Link to="/generator" className="text-white/40 hover:text-emerald-400 transition-colors">AI Website Builder</Link></li>
                <li><Link to="/marketplace" className="text-white/40 hover:text-emerald-400 transition-colors">Marketplace</Link></li>
                <li><Link to="/community" className="text-white/40 hover:text-emerald-400 transition-colors">Community</Link></li>
                <li><Link to="/pricing" className="text-white/40 hover:text-emerald-400 transition-colors">Pro Membership</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">AI Builders</h4>
              <ul className="space-y-4">
                <li><Link to="/tools/bento-tailwind-generator" className="text-white/40 hover:text-emerald-400 transition-colors">Tailwind AI</Link></li>
                <li><Link to="/tools/shopify-bento-liquid" className="text-white/40 hover:text-emerald-400 transition-colors">Shopify Liquid AI</Link></li>
                <li><Link to="/tools/react-bento-component-factory" className="text-white/40 hover:text-emerald-400 transition-colors">React Component AI</Link></li>
                <li><Link to="/tools/ios-control-center-bento-style" className="text-white/40 hover:text-emerald-400 transition-colors">iOS Style AI</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Resources</h4>
              <ul className="space-y-4">
                <li><Link to="/docs" className="text-white/40 hover:text-emerald-400 transition-colors">Documentation</Link></li>
                <li><Link to="/blog" className="text-white/40 hover:text-emerald-400 transition-colors">Design Blog</Link></li>
                <li><Link to="/support" className="text-white/40 hover:text-emerald-400 transition-colors">Support Center</Link></li>
                <li><Link to="/api" className="text-white/40 hover:text-emerald-400 transition-colors">API Reference</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/20 text-xs">
              &copy; 2026 BentoFlow Pro. All rights reserved. Built with precision for the modern web.
            </p>
            <div className="flex gap-8">
              <Link to="/privacy" className="text-white/20 text-xs hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-white/20 text-xs hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="text-white/20 text-xs hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};
