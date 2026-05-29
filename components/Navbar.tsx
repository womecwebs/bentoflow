'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Sparkles, Menu, X, Github } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Grid Generator', href: '/generator' },
    { name: 'Templates', href: '/templates' },
    { name: 'AI Bento Builder', href: '/tools/ai-bento-builder' },
    { name: 'More Tools', href: '/tools' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Area */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* Outer visual gradient layer matching screenshots */}
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
                <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-zinc-950 transition-colors group-hover:bg-zinc-900">
                  <LayoutGrid className="h-4.5 w-4.5 text-zinc-100 transition-colors group-hover:text-blue-400" />
                </div>
              </div>
              <span className="text-lg font-semibold tracking-tight text-white font-sans sm:text-xl">
                Bento<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-bold">Flow</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-white relative py-1 ${
                    isActive ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Trigger / CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Find us on GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <Link
              href="/generator"
              className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[1px] text-xs font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="flex items-center gap-1.5 rounded-full bg-zinc-950 px-4 py-2 transition-all hover:bg-transparent">
                <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
                Build Layout Free
              </span>
            </Link>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
              aria-label="BentoFlow on GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white focus:outline-none transition-all"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open developer navigation menu</span>
              {isOpen ? (
                <X className="block h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="block h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-900 bg-zinc-950/98 backdrop-blur-xl animate-fade-in" id="mobile-menu">
          <div className="space-y-1.5 px-4 pt-2 pb-5">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-zinc-900 text-white font-semibold'
                      : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="border-t border-zinc-900 mt-4 pt-4">
              <Link
                href="/generator"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/10 transition-all hover:brightness-110"
              >
                <Sparkles className="h-4 w-4" />
                Build Layout Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
