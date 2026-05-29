import React from 'react';
import Link from 'next/link';
import { LayoutGrid, Twitter, Github, Mail, Globe, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-zinc-900 bg-zinc-950 pt-16 pb-12 overflow-hidden z-10">
      {/* Subtle bottom glowing corner element */}
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Branded Mission, Socials & Active Copyright */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-blue-500 to-purple-500 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[3px] bg-zinc-950 group-hover:bg-transparent transition-colors">
                  <LayoutGrid className="h-3.5 w-3.5 text-zinc-100 group-hover:text-zinc-950 transition-colors" />
                </div>
              </div>
              <span className="text-base font-semibold text-white tracking-tight">
                Bento<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">Flow</span> Pro
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mt-1">
              The high-performance developer-first bento grid generator. Assemble production-ready layout systems, responsive portfolios, and interactive dashboard views with native Tailwind CSS compiler support.
            </p>
            <div className="flex items-center gap-3.5 mt-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all border border-zinc-800/50"
                aria-label="Follow BentoFlow on Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all border border-zinc-800/50"
                aria-label="Browse BentoFlow Source Code on GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="mailto:support@bentoflow.pro"
                className="p-1.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all border border-zinc-800/50"
                aria-label="Email BentoFlow support"
              >
                <Mail className="h-4 w-4" />
              </a>
              <Link
                href="/"
                className="p-1.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all border border-zinc-800/50"
                aria-label="Platform global status"
              >
                <Globe className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Core Utility Navigation Maps */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-200 tracking-wider uppercase mb-5 font-mono">
              Core Utilities
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/generator"
                  className="group flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  <ArrowRight className="h-3 w-3 text-zinc-600 transition-transform group-hover:translate-x-0.5" />
                  Grid Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="group flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  <ArrowRight className="h-3 w-3 text-zinc-600 transition-transform group-hover:translate-x-0.5" />
                  Layout Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/generator"
                  className="group flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  <ArrowRight className="h-3 w-3 text-zinc-600 transition-transform group-hover:translate-x-0.5" />
                  Interactive Editor Sandbox
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="group flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  <ArrowRight className="h-3 w-3 text-zinc-600 transition-transform group-hover:translate-x-0.5" />
                  Community Showcase Grid
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Targeted Programmatic Landing Links */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-200 tracking-wider uppercase mb-5 font-mono">
              SEO landing & Templates
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/templates/developer-portfolio-bento"
                  className="group flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-all hover:translate-x-0.5"
                >
                  Developer Portfolio Layout
                </Link>
              </li>
              <li>
                <Link
                  href="/templates/saas-analytics-dashboard"
                  className="group flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-all hover:translate-x-0.5"
                >
                  SaaS Analytics Console
                </Link>
              </li>
              <li>
                <Link
                  href="/templates/minimal-link-in-bio"
                  className="group flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-all hover:translate-x-0.5"
                >
                  Minimal Link-in-Bio Canvas
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="group flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-all hover:translate-x-0.5"
                >
                  Showcase & Custom Presets
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Framework & Platform Output Information */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold text-zinc-200 tracking-wider uppercase mb-1 font-mono">
              Framework Details
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              BentoFlow compiles production-grade outputs built strictly on semantic, raw HTML5 structures and robust CSS Grid coordinates.
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                Tailwind v4
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                React TSX
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                HTML5 Semantics
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                WCAG Compliant
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright notice area */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-zinc-900 mt-12 pt-8 gap-4">
          <p className="text-[11px] text-zinc-500 font-sans tracking-wide">
            &copy; {currentYear} BentoFlow Pro. All rights reserved. Precision-built for the crawlable, modern web ecosystem.
          </p>
          <div className="flex gap-4 text-[11px] text-zinc-500">
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="/" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
