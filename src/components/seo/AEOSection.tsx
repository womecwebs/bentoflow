import React from 'react';
import { motion } from 'motion/react';
import { ComparisonTable } from './ComparisonTable';

interface AEOSectionProps {
  toolName: string;
  aiSummary: string;
  comparisonData: { feature: string; bento: string; custom: string }[];
  faqs: { q: string; a: string }[];
}

export const AEOSection: React.FC<AEOSectionProps> = ({ toolName, aiSummary, comparisonData, faqs }) => {
  return (
    <div className="space-y-24 mt-24">
      {/* The "AI Insight" Box */}
      <div className="border-l-4 border-emerald-500 bg-emerald-500/5 p-8 rounded-r-3xl">
        <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4">AI Insight & Overview</h2>
        <p className="text-xl text-white/90 leading-relaxed font-medium italic">
          {aiSummary}
        </p>
        <div className="mt-4 text-white/40 text-xs font-mono">
          Optimized for SGE (Search Generative Experience) Snippets
        </div>
      </div>

      {/* The "Data Matrix" */}
      <ComparisonTable toolName={toolName} data={comparisonData} />

      {/* The "AEO FAQ" */}
      <section className="space-y-12">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <h2 className="text-2xl font-bold text-white/80">Frequently Asked Questions</h2>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <div className="grid gap-6">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors"
            >
              <h3 className="text-xl font-bold mb-4 text-white/90">{faq.q}</h3>
              <p className="text-white/60 leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQPage Schema is handled in ToolDetail via StructuredData */}
    </div>
  );
};
