import React from 'react';
import { motion } from 'motion/react';
import { SEO } from '../../components/seo/SEO';

export const TermsOfService: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-8">
      <SEO 
        title="Terms of Service"
        description="Read the terms and conditions for using BentoFlow Pro."
      />
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="text-5xl font-bold tracking-tighter">Terms of Service</h1>
          <p className="text-white/60">Last Updated: March 16, 2026</p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
            <p className="text-white/60 leading-relaxed">
              By accessing or using BentoFlow Pro, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">2. Use License</h2>
            <p className="text-white/60 leading-relaxed">
              Permission is granted to use our tools for personal or commercial design projects. You may not reverse engineer the software or use it to build a competing service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">3. Marketplace Transactions</h2>
            <p className="text-white/60 leading-relaxed">
              All sales on the BentoFlow Marketplace are final. We act as a platform connecting designers and buyers. Payouts to designers are subject to our verification process and platform fees.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">4. Disclaimer</h2>
            <p className="text-white/60 leading-relaxed">
              The materials on BentoFlow Pro are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">5. Limitations</h2>
            <p className="text-white/60 leading-relaxed">
              In no event shall BentoFlow Pro or its suppliers be liable for any damages arising out of the use or inability to use the materials on our platform.
            </p>
          </section>
        </motion.div>
      </div>
    </main>
  );
};
