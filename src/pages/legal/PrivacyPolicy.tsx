import React from 'react';
import { motion } from 'motion/react';
import { SEO } from '../../components/seo/SEO';

export const PrivacyPolicy: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-8">
      <SEO 
        title="Privacy Policy"
        description="Learn how BentoFlow Pro handles your data and protects your privacy."
      />
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="text-5xl font-bold tracking-tighter">Privacy Policy</h1>
          <p className="text-white/60">Last Updated: March 16, 2026</p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">1. Information We Collect</h2>
            <p className="text-white/60 leading-relaxed">
              We collect information you provide directly to us when you create an account, use our tools, or communicate with us. This includes your name, email address, and any design configurations you save on our platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
            <p className="text-white/60 leading-relaxed">
              We use the information we collect to provide, maintain, and improve our services, to process transactions, and to communicate with you about updates and features.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">3. Data Security</h2>
            <p className="text-white/60 leading-relaxed">
              We use Supabase for authentication and database management, which employs industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">4. Third-Party Services</h2>
            <p className="text-white/60 leading-relaxed">
              We use third-party services like ClickPesa for payment processing. These services have their own privacy policies, and we encourage you to read them.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">5. Contact Us</h2>
            <p className="text-white/60 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at support@bentoflow.pro.
            </p>
          </section>
        </motion.div>
      </div>
    </main>
  );
};
