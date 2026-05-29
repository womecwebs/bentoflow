import type { Metadata } from 'next';
import { Shield, Eye, Lock, RefreshCw, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Rights | BentoFlow Creator Platform',
  description: 'Understand how BentoFlow handles user data, cookie logs, Google Analytics 4 systems, affiliate partnerships, and user verification files.',
  keywords: [
    'BentoFlow privacy policy',
    'User data guidelines',
    'Google Analytics compliance',
    'Affiliate network disclosures'
  ],
  robots: {
    index: true,
    follow: true,
  }
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'May 29, 2026';

  return (
    <div className="w-full min-h-screen text-zinc-100 py-16 px-4 md:px-8 max-w-4xl mx-auto space-y-12 animate-fade-in">
      
      {/* Title Header area */}
      <header className="space-y-4 border-b border-zinc-900 pb-8 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-mono">
          <Shield className="h-3.5 w-3.5" />
          <span>SECURITY PROTOCOLS IN EFFECT</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-sans">
          Privacy Policy & Data Security
        </h1>
        <div className="flex justify-between items-center text-xs font-mono text-zinc-500">
          <span>Version 1.0</span>
          <span>Last Updated: {lastUpdated}</span>
        </div>
      </header>

      {/* Main Legal Clauses Prose container */}
      <main className="space-y-10 text-left leading-relaxed text-zinc-300 text-sm">
        
        {/* Intro */}
        <section className="bg-zinc-950/40 p-6 rounded-2xl border border-zinc-900 space-y-3">
          <h2 className="text-white font-bold text-base flex items-center gap-2">
            <Eye className="h-4 w-4 text-emerald-400" />
            <span>Scope & Acceptance</span>
          </h2>
          <p className="text-zinc-400">
            Welcome to **BentoFlow** (accessible via our primary domain addresses). Security and privacy are embedded deep within our visual layout compile infrastructure. This privacy document describes exactly why and how we catalog specific web parameters, manage session files, coordinate with third-party tracking networks, and handle authentication queries.
          </p>
          <p className="text-zinc-400 font-normal">
            By interacting with our 10+ interactive micro-utilities (including the AI Bento Grid Generator, Layout Breakpoint Simulators, and Nesting Rounding calculators), you consent to the rules outlined in this disclosure.
          </p>
        </section>

        {/* Section 1: Information Collection */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white tracking-tight border-b border-zinc-900 pb-2">
            Section 1: Information Collection & Log Protocols
          </h2>
          <p>
            BentoFlow follows standardized logging protocols. Whenever visitors activate layout features (such as adjusting card dimensions or color palettes), specific technical parameters are parsed:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-400 text-xs font-mono">
            <li>Internet Protocol (IP) address strings and viewport width heights (required to test grid breakpoints).</li>
            <li>Browser user agents and operating system indicators (e.g. Google Chrome, GPTBot agents, Apple Safari).</li>
            <li>Timestamp coordinates of layout generation commands.</li>
            <li>Layout inputs (such as colors, spacing metrics, and columns arrays). No user code is kept without explicit download triggers.</li>
          </ul>
          
          <h3 className="text-sm font-semibold text-zinc-200 mt-4">Google Analytics 4 (GA4) Integration</h3>
          <p className="text-zinc-400">
            We employ Google Analytics 4 tracking. GA4 handles anonymous interactive behavior streams—including active tool clicks, copy-code events, and template preview selections. This tool does not store raw personally identifiable inputs; it merely helps our team detect which visual builders require optimization updates.
          </p>
        </section>

        {/* Section 2: Data Usage */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white tracking-tight border-b border-zinc-900 pb-2">
            Section 2: Layout Processing & Data Usage Logic
          </h2>
          <p>
            The non-sensitive data and layout metadata processed inside our server-side API routes is exclusively utilized to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20">
              <span className="block text-white font-semibold text-xs mb-1">Grid Calculation Support</span>
              <p className="text-xs text-zinc-400">Running advanced geometric code matching tests to ensure that outer/inner curvature proportions avoid distortion gaps.</p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20">
              <span className="block text-white font-semibold text-xs mb-1">Caching Compiler Outputs</span>
              <p className="text-xs text-zinc-400">Temporarily caching generated CSS and React export snippets during active sessions to facilitate fast downloads.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Third-Party Affiliate Disclosures */}
        <section className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-900 space-y-4">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            <Layers className="h-4.5 w-4.5 text-blue-400" />
            <span>Section 3: Third-Party Affiliate Program Disclosures</span>
          </h2>
          <p className="text-zinc-400">
            BentoFlow participates in several premium developer, registrar, hosting, and SaaS referral marketing programs. To cover our high rendering server compile expenses and keep our dev tools free, we may include tracking link-outs. If you purchase items through our referrals, we may receive a commission. 
          </p>
          <p className="text-zinc-400">
            We explicitly declare active affiliate tracking networks with the following target software programs:
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs cursor-default">
            <div className="p-2.5 rounded-lg border border-zinc-900 bg-zinc-900/45 text-white hover:border-zinc-805 transition-colors">
              Hostinger
            </div>
            <div className="p-2.5 rounded-lg border border-zinc-900 bg-zinc-900/45 text-white hover:border-zinc-805 transition-colors">
              Namecheap
            </div>
            <div className="p-2.5 rounded-lg border border-zinc-900 bg-zinc-900/45 text-white hover:border-zinc-805 transition-colors">
              Webflow
            </div>
            <div className="p-2.5 rounded-lg border border-zinc-900 bg-zinc-900/45 text-white hover:border-zinc-805 transition-colors">
              Expedia Group
            </div>
          </div>

          <p className="text-[11px] text-zinc-550 leading-relaxed font-mono">
            These external platforms operate under distinct security and privacy blueprints. We highly recommend visiting their respective administrative policies to read their independent cookie declarations before purchase.
          </p>
        </section>

        {/* Section 4: User Authentication Rights */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white tracking-tight border-b border-zinc-900 pb-2">
            Section 4: Authentication Credentials & Rights Management
          </h2>
          <p>
            When utilizing optional persistent storage features inside BentoFlow (such as saving custom mockup states, bookmarking templates, or hosting customized profiles), authentication actions are secured by enterprise architecture:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-400">
            <li>
              <strong>Supabase & Firebase Security:</strong> All persistent database logs, security schemas, and password files are locked under Google Firebase and Supabase database security rules. We never read or store raw password credentials.
            </li>
            <li>
              <strong>Crawl Rules compliance:</strong> If you delete your account or submit a removal request under CCPA or GDPR, our backend synchronizes immediately, erasing user-specific entries and references permanently.
            </li>
          </ul>
        </section>

        {/* Section 5: Security Audits */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white tracking-tight border-b border-zinc-900 pb-2">
            Section 5: Active Security Infrastructure
          </h2>
          <p>
            We implement multiple layers of security to prevent unauthorized access or data leaks:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 flex gap-3">
              <Lock className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-white font-semibold text-xs">Encryption in Transit</span>
                <p className="text-xs text-zinc-400 mt-1">All interactive layouts data streams mapped through our domains use standard TLS encryption keys.</p>
              </div>
            </div>
            <div className="flex-1 p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 flex gap-3">
              <RefreshCw className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-white font-semibold text-xs">Automated Cleansing</span>
                <p className="text-xs text-zinc-400 mt-1">Sessions expire within 24 hours for unregistered accounts to avoid cookie bloat.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact info for privacy concerns */}
        <section className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-3">
          <span className="font-mono text-[10px] text-zinc-500 uppercase block">Privacy and compliance channels:</span>
          <p className="text-xs text-zinc-400 leading-normal">
            If you have questions regarding these privacy rules, need to submit an index removal, or require details regarding cookie opt-outs, coordinate directly with our operations team:
          </p>
          <code className="text-emerald-400 font-mono text-xs select-all block">
            privacy@bentoflow-pro.vercel.app
          </code>
        </section>

      </main>

      {/* Trust Signoff Accent */}
      <footer className="text-center text-xs text-zinc-650 border-t border-zinc-900/60 pt-8 font-mono">
        BentoFlow Network Controls. Certified CCPA & GDPR compliant.
      </footer>

    </div>
  );
}
