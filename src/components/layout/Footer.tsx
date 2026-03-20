import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, Twitter, Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <LayoutGrid className="text-black" size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">BentoFlow <span className="text-emerald-500">Pro</span></span>
            </Link>
            <p className="text-white/40 max-w-sm leading-relaxed">
              The ultimate AI-powered Bento grid builder for modern web designers. Create, customize, and deploy stunning layouts in seconds.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <Github size={18} />
              </a>
              <a href="mailto:support@bentoflow.pro" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><Link to="/editor" className="hover:text-emerald-400 transition-colors">Grid Editor</Link></li>
              <li><Link to="/marketplace" className="hover:text-emerald-400 transition-colors">Marketplace</Link></li>
              <li><Link to="/community" className="hover:text-emerald-400 transition-colors">Community Gallery</Link></li>
              <li><Link to="/tools" className="hover:text-emerald-400 transition-colors">Design Tools</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-emerald-400 transition-colors">Design Blog</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/seo-guide" className="hover:text-emerald-400 transition-colors">SEO Guide</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs">
            © 2026 BentoFlow Pro. All rights reserved. Built with passion for the modern web.
          </p>
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-white/20">
            <span>Status: Operational</span>
            <span>Version: 2.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
