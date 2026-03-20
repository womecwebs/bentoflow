import React from 'react';

interface SEOSectionProps {
  title: string;
  summary: string;
  faqs: { q: string; a: string }[];
  structuredData: any;
}

export const SEOSection: React.FC<SEOSectionProps> = ({ title, summary, faqs, structuredData }) => {
  return (
    <section className="mt-16 border-t border-white/10 pt-12 max-w-4xl mx-auto px-4">
      {/* AI-Ready Summary */}
      <div className="bg-white/5 rounded-2xl p-6 mb-12 border border-white/10">
        <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">AI Overview Summary</h2>
        <p className="text-lg text-white/80 leading-relaxed italic">
          {summary}
        </p>
      </div>

      {/* Chunked Content (H2/H3 Questions) */}
      <div className="space-y-12">
        <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>
        
        {faqs.map((faq, i) => (
          <div key={i} className="space-y-4">
            <h3 className="text-xl font-semibold text-white/90">{faq.q}</h3>
            <p className="text-white/60 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Comparison Table for AI Extraction */}
      <div className="mt-16 overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-white/40 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="px-6 py-4">Feature</th>
              <th className="px-6 py-4">BentoFlow Pro</th>
              <th className="px-6 py-4">Standard Flexbox</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white/70">
            <tr>
              <td className="px-6 py-4 font-medium">Layout Control</td>
              <td className="px-6 py-4">12-Column Precision</td>
              <td className="px-6 py-4">Linear Flow</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium">Responsive Scaling</td>
              <td className="px-6 py-4">Automatic Grid Spanning</td>
              <td className="px-6 py-4">Manual Breakpoints</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium">Export Options</td>
              <td className="px-6 py-4">Tailwind / Vanilla CSS</td>
              <td className="px-6 py-4">Manual Styling</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
