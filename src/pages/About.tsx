import React from 'react';
import { motion } from 'motion/react';
import { SEO } from '../components/seo/SEO';
import { Sparkles, Zap, Shield, Heart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-8">
      <SEO 
        title="About Us"
        description="Learn more about BentoFlow Pro and our mission to revolutionize web design with AI."
      />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-16"
        >
          <header className="text-center space-y-6">
            <h1 className="text-7xl font-bold tracking-tighter">Design at the <br /> <span className="text-emerald-500">Speed of Thought.</span></h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              BentoFlow Pro was born from a simple idea: making high-end modular design accessible to everyone through AI and intuitive tools.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-[32px] space-y-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-500">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-bold">Our Mission</h3>
              <p className="text-white/60">
                To empower designers and developers with tools that automate the tedious parts of layout design, allowing them to focus on creativity and user experience.
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-[32px] space-y-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500">
                <Shield size={24} />
              </div>
              <h3 className="text-2xl font-bold">Trust & Security</h3>
              <p className="text-white/60">
                We prioritize the security of your designs and transactions. Built on top of industry-leading technologies like Supabase and ClickPesa.
              </p>
            </div>
          </div>

          <section className="text-center space-y-8 py-12">
            <h2 className="text-4xl font-bold">Built for the Modern Web</h2>
            <div className="flex flex-wrap justify-center gap-12 opacity-40">
              <div className="flex items-center gap-2 font-bold text-2xl italic">React</div>
              <div className="flex items-center gap-2 font-bold text-2xl italic">Tailwind</div>
              <div className="flex items-center gap-2 font-bold text-2xl italic">Supabase</div>
              <div className="flex items-center gap-2 font-bold text-2xl italic">Gemini AI</div>
            </div>
          </section>

          <footer className="bg-emerald-500 rounded-[48px] p-16 text-center text-black">
            <Heart className="mx-auto mb-6" size={48} fill="currentColor" />
            <h2 className="text-4xl font-bold mb-6">Join the Revolution</h2>
            <p className="text-xl font-medium mb-8 opacity-80">
              Start building your next masterpiece today.
            </p>
            <button className="bg-black text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-zinc-900 transition-all">
              Get Started for Free
            </button>
          </footer>
        </motion.div>
      </div>
    </main>
  );
};
