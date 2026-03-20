import React from 'react';
import { useGrid } from '../../context/GridContext';
import { Lock, Copy, Check, Terminal, Code2, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { generateToolCode } from '../../utils/toolLogic';

interface CodePreviewSectionProps {
  slug: string;
  isPremium: boolean;
  onUnlock: () => void;
}

export const CodePreviewSection: React.FC<CodePreviewSectionProps> = ({ slug, isPremium, onUnlock }) => {
  const { boxes, config, isUnlocked } = useGrid();
  const [activeTab, setActiveTab] = React.useState<'special' | 'tailwind' | 'css' | 'react'>('special');
  const [copied, setCopied] = React.useState(false);

  const generateCode = () => {
    return generateToolCode(slug, boxes, config, activeTab);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isPremium && !isUnlocked) {
    return (
      <div className="relative mt-12 rounded-[32px] overflow-hidden border border-white/10 bg-zinc-900/50 p-12 text-center">
        <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl flex flex-col items-center justify-center p-8">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
            <Lock className="text-emerald-400" size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4">Premium Template Logic</h3>
          <p className="text-white/40 max-w-md mb-8">
            This tool uses advanced algorithms and premium assets. Purchase to unlock full access to the source code and export features.
          </p>
          <button
            onClick={onUnlock}
            className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            Purchase to Unlock
            <Lock size={18} />
          </button>
        </div>
        <div className="opacity-10 pointer-events-none select-none">
          <pre className="text-left font-mono text-sm">
            {`// Premium Code Placeholder\n// Purchase to view full implementation\n\nclass BentoEngine {\n  constructor() {\n    this.secret = "********";\n  }\n}`}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 rounded-[32px] border border-white/10 bg-zinc-900/50 overflow-hidden">
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-white/5">
        <div className="flex gap-4">
          {(['special', 'tailwind', 'css', 'react'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-lg transition-all ${
                activeTab === tab ? 'bg-white text-black' : 'text-white/40 hover:text-white'
              }`}
            >
              {tab === 'special' ? 'Tool Output' : tab}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy Code'}
        </button>
      </div>
      <div className="p-8 overflow-x-auto">
        <pre className="font-mono text-sm text-white/80 leading-relaxed">
          <code>{generateCode()}</code>
        </pre>
      </div>
    </div>
  );
};
