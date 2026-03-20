import React from 'react';
import { useGrid } from '../../context/GridContext';
import { useAuth } from '../../context/AuthContext';
import { Plus, Copy, LayoutGrid, Settings2, Lock, Check, Zap, Eye, EyeOff, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PricingToggle } from './PricingToggle';
import { CheckoutModal } from '../marketplace/CheckoutModal';

export const Sidebar: React.FC = () => {
  const { boxes, config, addBox, isPremiumTemplate, isUnlocked, unlockTemplate, updateConfig, currentTemplateId, isPreview, setIsPreview } = useGrid();
  const { user } = useAuth();
  const [format, setFormat] = React.useState<'tailwind' | 'css'>('tailwind');
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const generateCode = () => {
    if (format === 'tailwind') {
      return `<div className="grid grid-cols-${config.columns} gap-[${config.gap}px]">\n  ${boxes.map(b => `<div className="col-span-${b.w} row-span-${b.h} rounded-[${config.radius}px]" style={{ backgroundColor: '${b.color}' }}>${b.title}</div>`).join('\n  ')}\n</div>`;
    } else {
      return `.bento-grid {\n  display: grid;\n  grid-template-columns: repeat(${config.columns}, 1fr);\n  gap: ${config.gap}px;\n}\n\n${boxes.map((b, i) => `.item-${i} {\n  grid-column: span ${b.w};\n  grid-row: span ${b.h};\n  background-color: ${b.color};\n  border-radius: ${config.radius}px;\n}`).join('\n\n')}`;
    }
  };

  const handleExport = async () => {
    if (isPremiumTemplate && !isUnlocked) {
      try {
        const response = await fetch('/api/payments/initiate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            templateId: currentTemplateId, 
            price: 15,
            userId: user?.id
          })
        });
        const data = await response.json();
        if (data.checkout_url) {
          window.location.href = data.checkout_url;
        }
      } catch (error) {
        console.error('Payment initiation failed:', error);
      }
      return;
    }
    
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="w-full h-full border-r border-white/10 bg-zinc-900/50 backdrop-blur-xl p-6 flex flex-col gap-8 overflow-y-auto">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-white/40 flex items-center gap-2">
            <LayoutGrid size={14} />
            Workspace
          </h2>
          <button 
            onClick={() => setIsPreview(!isPreview)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
              isPreview ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/40 hover:text-white'
            }`}
          >
            {isPreview ? <EyeOff size={12} /> : <Eye size={12} />}
            {isPreview ? 'Exit Preview' : 'Live Preview'}
          </button>
        </div>

        <Link 
          to="/tools/ai-bento-grid-builder"
          className="w-full flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-3 rounded-xl font-bold hover:bg-emerald-500/20 transition-all mb-4 group"
        >
          <Sparkles size={18} className="group-hover:scale-110 transition-transform" />
          Use AI Bento Grid Builder
        </Link>

        <button
          onClick={addBox}
          disabled={isPreview}
          className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-bold hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={18} />
          Add Bento Box
        </button>
      </div>

      <div>
        <h2 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
          <Settings2 size={14} />
          Configuration
        </h2>
        <div className={`space-y-6 ${isPreview ? 'opacity-50 pointer-events-none' : ''}`}>
          <PricingToggle isPro={isPremiumTemplate} onToggle={() => {}} />
          
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-white/70">Grid Columns</label>
              <span className="text-xs text-white/40 font-mono">{config.columns}</span>
            </div>
            <input 
              type="range" min="1" max="12" value={config.columns}
              onChange={(e) => updateConfig({ columns: parseInt(e.target.value) })}
              className="w-full accent-emerald-500"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-white/70">Grid Gap</label>
              <span className="text-xs text-white/40 font-mono">{config.gap}px</span>
            </div>
            <input 
              type="range" min="0" max="40" value={config.gap}
              onChange={(e) => updateConfig({ gap: parseInt(e.target.value) })}
              className="w-full accent-emerald-500"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-white/70">Corner Radius</label>
              <span className="text-xs text-white/40 font-mono">{config.radius}px</span>
            </div>
            <input 
              type="range" min="0" max="30" value={config.radius}
              onChange={(e) => updateConfig({ radius: parseInt(e.target.value) })}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="pt-4 border-t border-white/5">
            <button
              onClick={() => updateConfig({ autoFlow: config.autoFlow === 'dense' ? 'row' : 'dense' })}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                config.autoFlow === 'dense' 
                  ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
                  : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-widest">Magic Auto Layout</span>
              <div className={`w-8 h-4 rounded-full relative transition-colors ${config.autoFlow === 'dense' ? 'bg-emerald-500' : 'bg-white/20'}`}>
                <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${config.autoFlow === 'dense' ? 'right-1' : 'left-1'}`} />
              </div>
            </button>
            <p className="text-[10px] text-white/30 mt-2 px-2">
              Automatically fills grid gaps using the CSS <code className="text-emerald-400/60">dense</code> algorithm.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-white/10">
        <div className="flex bg-white/5 p-1 rounded-xl mb-4">
          <button 
            onClick={() => setFormat('tailwind')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${format === 'tailwind' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
          >
            Tailwind
          </button>
          <button 
            onClick={() => setFormat('css')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${format === 'css' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
          >
            Vanilla CSS
          </button>
        </div>

        <div className="relative group/code">
          <pre className={`bg-black/40 p-4 rounded-xl text-[10px] font-mono text-white/40 overflow-hidden h-32 transition-all ${isPremiumTemplate && !isUnlocked ? 'blur-md select-none' : ''}`}>
            {generateCode()}
          </pre>
          
          {isPremiumTemplate && !isUnlocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm rounded-xl border border-white/5">
              <Lock className="text-emerald-400 mb-2" size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 text-center px-4">Premium Template Unlock Required</span>
            </div>
          )}
        </div>

        <button 
          onClick={handleExport}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all shadow-lg mt-4 ${
            copied ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20'
          }`}
        >
          {isPremiumTemplate && !isUnlocked ? <Zap size={18} fill="currentColor" /> : (copied ? <Check size={18} /> : <Copy size={18} />)}
          {isPremiumTemplate && !isUnlocked ? 'Buy Now to Unlock Code' : (copied ? 'Copied!' : 'Copy Code')}
        </button>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        template={{ id: currentTemplateId || 'current', name: 'Premium Template', price_usd: 15 }}
        onSuccess={unlockTemplate}
      />
    </aside>
  );
};
