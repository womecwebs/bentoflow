import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Search, Zap, Layout, Shield, Globe, Cpu, BarChart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SEOContent = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
              The Future of Web Design
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              Why BentoFlow Pro is the <span className="text-emerald-500">Ultimate AI Website Builder</span> for Google Search Visibility
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed">
              In an era dominated by Answer Engine Optimization (AEO) and rapid AI evolution, your website needs more than just a template. It needs a high-performance, SEO-first architecture.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/generator" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-2xl transition-all flex items-center gap-2 group">
                Start Building with AI
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/tools" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all">
                Explore Developer Tools
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-invert prose-emerald max-w-none">
            <h2 className="text-3xl font-bold mb-8 text-white">1. The Paradigm Shift: From Static Templates to AI-Driven Architecture</h2>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              The internet is changing. Traditional website builders like Wix, Squarespace, and WordPress have long relied on heavy, bloated codebases and rigid templates that struggle to keep up with modern performance standards. As Google shifts its focus toward <strong>Core Web Vitals</strong> and <strong>Answer Engine Optimization (AEO)</strong>, the technical foundation of your site has never been more critical.
            </p>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              BentoFlow Pro represents a fundamental shift in how websites are conceived and constructed. By leveraging advanced AI models, we don't just "generate" a layout; we architect a high-performance system designed for the modern web. Our AI understands the nuances of semantic HTML, accessibility, and lightning-fast load times, ensuring that your site isn't just beautiful—it's a search engine powerhouse.
            </p>

            <h2 className="text-3xl font-bold mt-16 mb-8 text-white">2. Why Bento Grids are the Secret Weapon for SEO</h2>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              You've likely noticed the "Bento Grid" trend popularized by Apple and high-end tech landing pages. Beyond the aesthetic appeal, Bento layouts offer significant structural advantages for search engines. By organizing content into clear, modular "cells," you create a highly scannable environment for both users and crawlers.
            </p>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              Google's algorithms are increasingly sophisticated at identifying the relationship between different content blocks. The Bento structure provides a clear hierarchy and logical grouping of information, which directly improves your site's <strong>semantic relevance</strong>. When our AI generates a Bento layout, it optimizes the placement of your H1, H2, and body text to maximize keyword density without sacrificing readability.
            </p>

            <div className="my-16 p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="text-xl font-bold mb-4 text-emerald-400 flex items-center gap-2">
                <Zap size={24} />
                The Performance Advantage
              </h3>
              <p className="text-white/70 leading-relaxed">
                Websites built with BentoFlow Pro consistently achieve 95+ scores on Google PageSpeed Insights. Our AI-driven code generation eliminates unnecessary JavaScript bloat, optimizes image delivery, and ensures that your Largest Contentful Paint (LCP) is under 1.5 seconds.
              </p>
            </div>

            <h2 className="text-3xl font-bold mt-16 mb-8 text-white">3. AEO: The New Frontier of Search</h2>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              Search is no longer just about a list of blue links. With the rise of AI Overviews and voice search, we are entering the age of <strong>Answer Engine Optimization</strong>. Users want direct answers, and search engines are looking for structured data that can be easily parsed and presented.
            </p>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              BentoFlow Pro is built with AEO at its core. Every site generated by our AI includes automatic Schema.org markup, ensuring that your content is "AI-ready." Whether it's an FAQ section, a product review, or a service description, our builder structures the data in a way that makes it highly likely to be featured in Google's AI-generated snippets.
            </p>

            <h2 className="text-3xl font-bold mt-16 mb-8 text-white">4. Comparison: BentoFlow Pro vs. Traditional Builders</h2>
            <div className="overflow-x-auto my-10">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-4 font-bold text-white/40 uppercase text-xs tracking-widest">Feature</th>
                    <th className="py-4 font-bold text-emerald-500 uppercase text-xs tracking-widest">BentoFlow Pro</th>
                    <th className="py-4 font-bold text-white/40 uppercase text-xs tracking-widest">Traditional Builders</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-white/5">
                    <td className="py-4 text-white/60">Code Quality</td>
                    <td className="py-4 font-bold">Clean, Minified, AI-Optimized</td>
                    <td className="py-4 text-white/40">Bloated, Plugin-Heavy</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 text-white/60">Page Speed</td>
                    <td className="py-4 font-bold">95-100 (Lighthouse)</td>
                    <td className="py-4 text-white/40">40-70 (Average)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 text-white/60">SEO Architecture</td>
                    <td className="py-4 font-bold">Semantic Bento Structure</td>
                    <td className="py-4 text-white/40">Generic Block Layouts</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 text-white/60">AEO Readiness</td>
                    <td className="py-4 font-bold">Built-in Schema & Structure</td>
                    <td className="py-4 text-white/40">Requires Manual Plugins</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold mt-16 mb-8 text-white">5. The Psychology of the Bento Grid</h2>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              Why do users love Bento grids? It comes down to <strong>cognitive load</strong>. In a world of information overload, the Bento grid provides a sense of order and containment. Each cell represents a single idea or call to action, allowing the user to process information in bite-sized chunks.
            </p>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              This improved user experience (UX) translates directly into better SEO metrics. When users find your site easy to navigate, your bounce rate drops, and your "dwell time" increases. Google interprets these signals as a sign of high-quality content, further boosting your rankings.
            </p>

            <h2 className="text-3xl font-bold mt-16 mb-8 text-white">6. Advanced Customization for Developers</h2>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              While our AI handles the heavy lifting, we believe in giving developers full control. Our "Developer Utility Suite" (available on the Tools page) allows you to fine-tune every aspect of your Bento grid. From custom CSS Grid generators to Glassmorphic shadow designers, we provide the tools you need to create a truly unique digital experience.
            </p>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              Our Multi-Framework Exporter ensures that you can take your designs anywhere. Whether you're working with Tailwind CSS, Bootstrap, or Vanilla CSS, BentoFlow Pro generates clean, production-ready code that integrates seamlessly into your existing workflow.
            </p>

            <h2 className="text-3xl font-bold mt-16 mb-8 text-white">7. Security and Reliability</h2>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              SEO isn't just about keywords; it's about trust. A slow or insecure site will never rank on the first page of Google. BentoFlow Pro sites are built on a modern, serverless architecture that is inherently more secure than traditional CMS platforms. With no database to hack and no plugins to update, you can rest easy knowing your site is safe and always online.
            </p>

            <h2 className="text-3xl font-bold mt-16 mb-8 text-white">8. The Future of AI in Web Development</h2>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              We are only at the beginning of the AI revolution in web development. As AI models become more sophisticated, the gap between AI-generated sites and manual coding will continue to widen. BentoFlow Pro is at the forefront of this change, constantly updating our algorithms to incorporate the latest best practices in design, performance, and SEO.
            </p>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              By choosing BentoFlow Pro, you're not just building a website for today; you're future-proofing your digital presence for the AI-driven web of tomorrow.
            </p>

            <h2 className="text-3xl font-bold mt-16 mb-8 text-white">9. Conclusion: Why Settle for Less?</h2>
            <p className="text-lg text-white/70 mb-12 leading-relaxed">
              In the competitive landscape of Google search, every millisecond and every semantic tag counts. Don't let a sub-par website builder hold your business back. Experience the power of AI-driven Bento grids and see why BentoFlow Pro is the preferred choice for high-performance, SEO-optimized web design.
            </p>

            <div className="bg-zinc-900 rounded-[2rem] p-12 text-center border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-3xl font-bold mb-6 relative z-10">Ready to dominate Google Search?</h3>
              <p className="text-white/60 mb-8 max-w-xl mx-auto relative z-10">
                Join thousands of developers and entrepreneurs who are building the future with BentoFlow Pro.
              </p>
              <Link to="/generator" className="inline-flex items-center gap-2 px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-2xl transition-all relative z-10">
                Generate Your Site Now
                <Sparkles size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer SEO Links */}
      <footer className="py-20 bg-zinc-900/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="font-bold mb-6 text-white/40 uppercase text-xs tracking-widest">Solutions</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><Link to="/generator" className="hover:text-emerald-400 transition-colors">AI Website Builder</Link></li>
                <li><Link to="/bento-editor" className="hover:text-emerald-400 transition-colors">Bento Grid Editor</Link></li>
                <li><Link to="/marketplace" className="hover:text-emerald-400 transition-colors">Template Marketplace</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white/40 uppercase text-xs tracking-widest">Tools</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><Link to="/tools" className="hover:text-emerald-400 transition-colors">CSS Grid Generator</Link></li>
                <li><Link to="/tools" className="hover:text-emerald-400 transition-colors">Shadow Designer</Link></li>
                <li><Link to="/tools" className="hover:text-emerald-400 transition-colors">Gradient Maker</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white/40 uppercase text-xs tracking-widest">Resources</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><Link to="/seo-guide" className="hover:text-emerald-400 transition-colors">SEO Best Practices</Link></li>
                <li><Link to="/seo-guide" className="hover:text-emerald-400 transition-colors">AEO Optimization</Link></li>
                <li><Link to="/seo-guide" className="hover:text-emerald-400 transition-colors">Web Performance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white/40 uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><Link to="/" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
                <li><Link to="/" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
                <li><Link to="/" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Layout size={16} className="text-black" />
              </div>
              <span className="font-bold text-xl tracking-tight">BentoFlow <span className="text-emerald-500">Pro</span></span>
            </div>
            <p className="text-white/20 text-xs">
              © 2026 BentoFlow Pro. All rights reserved. Built with AI for the next generation of web.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
