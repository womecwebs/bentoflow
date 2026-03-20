import React, { useState } from 'react';
import { Copy, Check, Code as CodeIcon, Terminal } from 'lucide-react';

interface ToolInterfaceProps {
  label: string;
  code: string;
}

export const ToolInterface: React.FC<ToolInterfaceProps> = ({ label, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-3">
          <Terminal size={18} className="text-emerald-400" />
          <span className="text-sm font-bold text-white/80">{label}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-xs font-bold text-white/60 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-400" />
              Copied!
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy Code
            </>
          )}
        </button>
      </div>
      <div className="p-8 overflow-x-auto">
        <pre className="font-mono text-sm text-emerald-400/90 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
      <div className="px-8 py-4 bg-emerald-500/5 border-t border-white/10 flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/60">Production Ready Output</span>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
        </div>
      </div>
    </div>
  );
};
