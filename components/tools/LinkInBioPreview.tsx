'use client';

import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Settings, 
  Smartphone, 
  Sparkles, 
  RefreshCw,
  Plus,
  Trash2,
  Twitter,
  Instagram,
  Github,
  Link as LinkIcon,
  Eye,
  SlidersHorizontal,
  Youtube,
  Linkedin,
  Clock,
  Heart,
  TrendingUp,
  Share2
} from 'lucide-react';

interface BioNode {
  id: string;
  type: 'profile' | 'social_feed' | 'link' | 'analytics';
  title: string;
  url?: string;
  iconName?: string;
  span: 'col-span-1' | 'col-span-2'; // size of cell
  clicksSimulated: number;
  pulseHighlight: boolean;
}

const INITIAL_NODES: BioNode[] = [
  { id: '1', type: 'profile', title: 'Alex Carter • Tech Architect', span: 'col-span-2', clicksSimulated: 4325, pulseHighlight: false },
  { id: '2', type: 'social_feed', title: 'Building next-gen responsive bento portfolios. Clean, fast, beautiful.', span: 'col-span-2', clicksSimulated: 1042, pulseHighlight: false },
  { id: '3', type: 'analytics', title: 'Interactive Growth Metrics', span: 'col-span-2', clicksSimulated: 0, pulseHighlight: false },
  { id: '4', type: 'link', title: 'Find My Software Projects', url: 'https://github.com', iconName: 'Github', span: 'col-span-1', clicksSimulated: 254, pulseHighlight: true },
  { id: '5', type: 'link', title: 'Watch design videos', url: 'https://youtube.com', iconName: 'Youtube', span: 'col-span-1', clicksSimulated: 121, pulseHighlight: false },
];

export default function LinkInBioPreview() {
  const [nodes, setNodes] = useState<BioNode[]>(INITIAL_NODES);
  const [profileName, setProfileName] = useState<string>('Alex Carter');
  const [bioTagline, setTagline] = useState<string>('Bento Designer & Frontend Architect');
  const [themeStyle, setThemeStyle] = useState<'emerald' | 'cyber' | 'glass' | 'sunset'>('glass');
  const [copied, setCopied] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newUrl, setNewUrl] = useState<string>('https://');
  const [newSize, setNewSize] = useState<'col-span-1' | 'col-span-2'>('col-span-1');
  const [newIcon, setNewIcon] = useState<string>('LinkIcon');
  const [pulseNew, setPulseNew] = useState<boolean>(false);
  const [exportTab, setExportTab] = useState<'tailwind' | 'react' | 'html-css'>('tailwind');

  // Simulated traffic stats
  const totalViewsSimUser = 12450;
  const totalClicksSim = nodes.reduce((acc, curr) => acc + curr.clicksSimulated, 0);
  const averageCtr = ((totalClicksSim / totalViewsSimUser) * 100).toFixed(1);

  const addNode = () => {
    if (!newTitle) return;
    const newNode: BioNode = {
      id: Date.now().toString(),
      type: 'link',
      title: newTitle,
      url: newUrl,
      iconName: newIcon,
      span: newSize,
      clicksSimulated: Math.floor(Math.random() * 20) + 1,
      pulseHighlight: pulseNew
    };
    setNodes([...nodes, newNode]);
    setNewTitle('');
    setNewUrl('https://');
    setPulseNew(false);
  };

  const removeNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
  };

  const incrementClick = (id: string) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, clicksSimulated: n.clicksSimulated + 1 } : n));
  };

  const getThemeClasses = () => {
    switch (themeStyle) {
      case 'emerald':
        return {
          mainBg: 'bg-emerald-950/20 border-emerald-900/50',
          cardBg: 'bg-emerald-950/40 border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-950/60',
          textAccent: 'text-emerald-400',
          btnAccent: 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
        };
      case 'cyber':
        return {
          mainBg: 'bg-cyan-950/20 border-cyan-900/50',
          cardBg: 'bg-cyan-950/40 border-cyan-500/20 hover:border-cyan-400/40 hover:bg-cyan-950/60',
          textAccent: 'text-cyan-400',
          btnAccent: 'bg-cyan-500 text-zinc-950 hover:bg-cyan-400'
        };
      case 'sunset':
        return {
          mainBg: 'bg-rose-950/20 border-rose-900/50',
          cardBg: 'bg-rose-950/40 border-rose-500/20 hover:border-rose-450/40 hover:bg-rose-950/60',
          textAccent: 'text-rose-455',
          btnAccent: 'bg-rose-500 text-white hover:bg-rose-450'
        };
      default: // glass sleek
        return {
          mainBg: 'bg-zinc-955/20 border-zinc-900/60',
          cardBg: 'bg-zinc-900/40 border-zinc-850/60 hover:border-zinc-700/60 hover:bg-zinc-900/80',
          textAccent: 'text-zinc-100',
          btnAccent: 'bg-zinc-100 text-zinc-950 hover:bg-white'
        };
    }
  };

  const getExportCode = () => {
    const activePalette = getThemeClasses();
    switch (exportTab) {
      case 'tailwind':
        return `<!-- Responsive Modular Link-In-Bio Card Bundle -->
<div className="w-full max-w-[360px] mx-auto p-5 rounded-[44px] bg-zinc-950 border border-zinc-900 shadow-2xl relative overflow-hidden">
  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
  
  <div className="relative z-10 text-center space-y-4">
    <!-- Profile Card header node -->
    <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-850">
      <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-tr from-emerald-500 via-purple-500 to-blue-500 p-0.5 mb-3 flex items-center justify-center font-bold text-white">AC</div>
      <h3 className="text-sm font-extrabold text-white">${profileName}</h3>
      <p className="text-[11px] text-zinc-400 mt-1">${bioTagline}</p>
    </div>

    <!-- Modular Interactive Bento Links -->
    <div className="grid grid-cols-2 gap-3">
      ${nodes.map(node => {
        if (node.type === 'profile') return null;
        if (node.type === 'social_feed') {
          return `<!-- Feed Widget -->
      <div className="col-span-2 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-left">
        <span className="text-[9px] font-mono text-zinc-500 uppercase font-black block mb-1">Latest Stream Update</span>
        <p className="text-[11px] text-zinc-300 leading-relaxed">${node.title}</p>
      </div>`;
        }
        if (node.type === 'analytics') return null;

        const pulseClass = node.pulseHighlight ? ' animate-pulse' : '';
        return `<!-- Interactive Link Item -->
      <div className="${node.span} p-4 rounded-2xl ${activePalette.cardBg} transition-colors border text-left flex flex-col justify-between min-h-[110px]${pulseClass}">
        <h4 className="text-[11px] font-bold text-white tracking-tight leading-snug">${node.title}</h4>
        <a href="${node.url}" target="_blank" className="text-[10px] font-bold ${activePalette.textAccent} block mt-3 hover:underline">Launch &rarr;</a>
      </div>`;
      }).filter(Boolean).join('\n      ')}
    </div>
  </div>
</div>`;

      case 'react':
        return `import React from 'react';

export default function MobileBioProfile() {
  return (
    <div className="max-w-[360px] mx-auto p-5 rounded-[44px] bg-[#0c0c0e] border border-zinc-900 text-center text-left relative overflow-hidden shadow-2xl">
      <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800 mb-4">
        <h3 className="text-xs font-bold text-white">${profileName}</h3>
        <p className="text-[10px] text-zinc-400 mt-1">${bioTagline}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        ${nodes.filter(n => n.type === 'link').map(node => `
        <div className="${node.span} p-4 rounded-xl bg-zinc-900 border border-zinc-850 flex flex-col justify-between min-h-[105px]">
          <h4 className="text-xs text-white font-bold">${node.title}</h4>
          <a href="${node.url}" target="_blank" className="text-[10px] text-emerald-400 font-bold block mt-3">Link &rarr;</a>
        </div>`).join('\n        ')}
      </div>
    </div>
  );
}`;

      case 'html-css':
        return `<div class="bio-mobile-card">
  <div class="bio-header">
    <h3>${profileName}</h3>
    <p>${bioTagline}</p>
  </div>
  <div class="bio-links-grid">
    ${nodes.filter(n => n.type === 'link').map(n => `
    <div class="bio-link-slot">
      <h4>${n.title}</h4>
      <a href="${n.url}" target="_blank">Open Link &rarr;</a>
    </div>`).join('\n    ')}
  </div>
</div>

<style>
.bio-mobile-card {
  max-width: 360px;
  margin: 0 auto;
  padding: 24px;
  background-color: #0c000c;
  border: 1px solid #1a1a24;
  border-radius: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  font-family: sans-serif;
}
.bio-header {
  padding: 20px;
  background-color: #121218;
  border-radius: 20px;
  margin-bottom: 20px;
  text-align: center;
}
.bio-links-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.bio-link-slot {
  padding: 16px;
  background-color: #121218;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>`;
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getExportCode()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full text-left space-y-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Editor controls */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/80 backdrop-blur-sm space-y-6">
            
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900">
              <Smartphone className="h-5 w-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Bio Builders Console</h3>
                <p className="text-[11px] text-zinc-500">Inject interactive profile panels & links streams</p>
              </div>
            </div>

            {/* Profile Identity fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Profile Username</span>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full text-xs text-white bg-zinc-900 border border-zinc-850 px-3 py-2.5 rounded-lg focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Headline Tagline</span>
                <input
                  type="text"
                  value={bioTagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full text-xs text-white bg-zinc-900 border border-zinc-850 px-3 py-2.5 rounded-lg focus:outline-none"
                />
              </div>
            </div>

            {/* Visual themes selector */}
            <div className="space-y-2 pt-1">
              <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Select visual theme style
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Sleek Glass', val: 'glass' },
                  { label: 'Emerald Mint', val: 'emerald' },
                  { label: 'Cyber Teal', val: 'cyber' },
                  { label: 'Sunset Rise', val: 'sunset' }
                ].map((th) => (
                  <button
                    key={th.val}
                    onClick={() => setThemeStyle(th.val as any)}
                    className={`py-1.5 rounded-lg text-[10px] font-semibold transition-all border ${
                      themeStyle === th.val
                        ? 'bg-zinc-900 border-zinc-650 text-white font-bold'
                        : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-zinc-350'
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Live Stack controller */}
            <div className="space-y-3 pt-3 border-t border-zinc-900">
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Organize Bio Links Stack ({nodes.length})
              </span>

              <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                {nodes.map((node) => (
                  <div 
                    key={node.id}
                    className="flex justify-between items-center p-3 rounded-lg border border-zinc-900/60 bg-zinc-950/40 text-xs"
                  >
                    <div className="truncate pr-4 flex-1">
                      <span className="text-[8px] font-mono bg-zinc-900 text-zinc-450 uppercase rounded px-1.5 py-0.5 mr-2">
                        {node.type}
                      </span>
                      <span className="text-zinc-350 font-bold">{node.title}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-zinc-550 block">🏷️ {node.clicksSimulated} click</span>
                      {node.type !== 'profile' && node.type !== 'social_feed' && node.type !== 'analytics' && (
                        <button
                          onClick={() => removeNode(node.id)}
                          className="text-rose-500 hover:text-rose-450 p-1 rounded transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick adding container link card form */}
            <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/35 space-y-3 pt-4">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Add Interactive Link Slot
              </span>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Link Title (e.g. Find My Newsletter)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs text-white bg-zinc-900 border border-zinc-850 px-2.5 py-2.5 rounded-lg focus:outline-none"
                />
                
                <input
                  type="text"
                  placeholder="Target Destination URL"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full text-xs text-white bg-zinc-900 border border-zinc-850 px-2.5 py-2.5 rounded-lg focus:outline-none"
                />

                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-zinc-550 uppercase">Grid Width Span</span>
                    <select
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value as any)}
                      className="w-full text-xs text-zinc-400 bg-zinc-900 border border-zinc-850 p-1.5 rounded"
                    >
                      <option value="col-span-1">Col Span 1 (Half Wide)</option>
                      <option value="col-span-2">Col Span 2 (Banner Width)</option>
                    </select>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-zinc-550 uppercase">Icon Vector template</span>
                    <select
                      value={newIcon}
                      onChange={(e) => setNewIcon(e.target.value)}
                      className="w-full text-xs text-zinc-400 bg-zinc-900 border border-zinc-850 p-1.5 rounded"
                    >
                      <option value="LinkIcon">Link Chain</option>
                      <option value="Twitter">Twitter Logo</option>
                      <option value="Github">Github Logo</option>
                      <option value="Youtube">Youtube Play</option>
                      <option value="Linkedin">LinkedIn Logo</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pt-1.5">
                  <input
                    type="checkbox"
                    id="pulseHighlightCheck"
                    checked={pulseNew}
                    onChange={(e) => setPulseNew(e.target.checked)}
                    className="rounded text-emerald-400 focus:ring-opacity-0 focus:ring-0 cursor-pointer h-3.5 w-3.5"
                  />
                  <label htmlFor="pulseHighlightCheck" className="text-[10px] font-mono text-zinc-400 cursor-pointer select-none">
                    Apply Pulse Glow highlight to attract CTR
                  </label>
                </div>

                <button
                  type="button"
                  onClick={addNode}
                  className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs rounded-xl transition-all duration-200 mt-2 flex items-center justify-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Link Widget Cell
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Live Interactive device simulator preview */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/45 min-h-[520px] flex flex-col items-center justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.20]" />

            <div className="flex justify-between items-center pb-4 border-b border-zinc-900/40 relative z-10 w-full mb-6">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-100 font-bold">Interactive Device Preview</span>
              </div>
              <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/10 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider block">
                Adaptive Screen Simulator Active
              </span>
            </div>

            {/* Simulator details and live traffic panel */}
            <div className="w-full max-w-[340px] grid grid-cols-3 gap-2.5 relative z-10 mb-4 bg-zinc-950/80 p-2.5 border border-zinc-900/50 rounded-2xl font-mono text-[9px] text-zinc-400 text-left">
              <div>
                <span className="text-zinc-550 block select-none">DAILY REACH</span>
                <span className="text-xs font-bold text-white font-sans">{totalViewsSimUser.toLocaleString()} views</span>
              </div>
              <div>
                <span className="text-zinc-550 block select-none">LINK CLICKS</span>
                <span className="text-xs font-bold text-emerald-400 font-sans">{totalClicksSim} clicks</span>
              </div>
              <div>
                <span className="text-zinc-550 block select-none">SIMULATED CTR</span>
                <span className="text-xs font-bold font-sans text-indigo-400">{averageCtr}% CTR</span>
              </div>
            </div>

            {/* Smart Phone Simulator Device container */}
            <div className="w-full max-w-[340px] rounded-[48px] border-[5px] border-zinc-900 bg-[#08080a] p-4.5 shadow-2xl relative text-left py-7 overflow-hidden my-auto">
              
              {/* Camera Notch decoration */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 h-4 w-24 bg-zinc-900 rounded-full z-20 flex items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-950 block mr-5" />
                <span className="h-1 w-6 rounded-full bg-zinc-950 block" />
              </div>

              {/* Layout components inside device simulator */}
              <div className="relative z-10 pt-4 space-y-4">
                
                {/* Header card node */}
                <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-850/80 text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                  
                  {/* Circular Avatar */}
                  <div className="h-14 w-14 mx-auto rounded-full bg-gradient-to-tr from-emerald-400 via-rose-500 to-indigo-500 p-0.5 mb-2.5 flex items-center justify-center font-bold text-white text-[11px] uppercase tracking-wider relative">
                    AC
                  </div>

                  <h3 className="text-xs font-extrabold text-white leading-tight">{profileName || 'Alex Carter'}</h3>
                  <p className="text-[9px] text-zinc-455 mt-1 font-mono tracking-wide leading-relaxed">{bioTagline || 'Bento & UI Specialist'}</p>
                </div>

                {/* Grid items */}
                <div className="grid grid-cols-2 gap-2.5">
                  {nodes.map((node) => {
                    if (node.type === 'profile') return null;
                    const activeTheme = getThemeClasses();

                    if (node.type === 'social_feed') {
                      return (
                        <div key={node.id} className="col-span-2 p-3.5 rounded-2xl bg-zinc-950 border border-zinc-900 text-left relative overflow-hidden group">
                          <div className="flex items-center gap-1 pb-1 mb-1.5 border-b border-zinc-900 text-zinc-550 text-[8px] font-mono uppercase font-black">
                            <Clock className="h-3 w-3 text-emerald-400" />
                            <span>Live Announcement Feed</span>
                          </div>
                          <p className="text-[10px] text-zinc-350 leading-relaxed font-sans">{node.title}</p>
                        </div>
                      );
                    }

                    if (node.type === 'analytics') {
                      return (
                        <div key={node.id} className="col-span-2 p-3 rounded-2xl bg-zinc-900/40 border border-dashed border-zinc-850 text-left flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-emerald-400" />
                            <div>
                              <span className="text-[10px] font-bold text-white block">Slick Ctr Boosting Enabled</span>
                              <span className="text-[8px] font-mono text-zinc-500 block">Click widgets to trigger events</span>
                            </div>
                          </div>
                          
                          <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-mono px-2 py-0.5 rounded font-black uppercase">
                            LIVE
                          </span>
                        </div>
                      );
                    }

                    // Render standard dynamic Link Item
                    const highlightClass = node.pulseHighlight ? ' ring-1 ring-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)] animate-pulse' : '';
                    return (
                      <div 
                        key={node.id} 
                        onClick={() => incrementClick(node.id)}
                        className={`${node.span} p-4 rounded-2xl ${activeTheme.cardBg} border cursor-pointer select-none transition-all duration-150 text-left flex flex-col justify-between min-h-[105px] group relative ${highlightClass}`}
                      >
                        {/* Circle badge of clicks metrics on each link */}
                        <span className="absolute top-2 right-2 rounded-full px-1.5 py-0.5 bg-black/40 text-[7px] font-mono text-zinc-500 tracking-wide font-black">
                          {node.clicksSimulated} clicks
                        </span>

                        <div className="space-y-1 mt-1 pr-6">
                          <h4 className="text-[10px] sm:text-[11px] font-bold text-white tracking-tight leading-snug truncate">
                            {node.title}
                          </h4>
                        </div>

                        <span className={`text-[9px] font-bold ${activeTheme.textAccent} hover:underline inline-flex items-center gap-0.5 block mt-3`}>
                          Open Node Slot &rarr;
                        </span>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

            {/* Dynamic Exporter tabs */}
            <div className="relative z-10 w-full border-t border-zinc-900/60 pt-4 space-y-4">
              <div className="flex justify-between items-center bg-zinc-950/80 p-1.5 rounded-xl border border-zinc-900/60 w-full col-span-2">
                <div className="flex gap-1.5">
                  {(['tailwind', 'react', 'html-css'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setExportTab(tab)}
                      className={`text-[10px] font-mono tracking-wide px-3 py-1.5 rounded-lg transition-all ${
                        exportTab === tab
                          ? 'bg-zinc-900 text-white font-bold border-b-2 border-emerald-500'
                          : 'text-zinc-550 hover:text-zinc-350'
                      }`}
                    >
                      {tab === 'tailwind' ? 'Tailwind HTML' : tab === 'react' ? 'React components' : 'Static HTML & CSS'}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={handleCopyCode}
                  className={`inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-450 text-zinc-950 font-bold rounded-lg text-[10px] px-3.5 py-1.5 transition-colors`}
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <pre className="p-3 bg-zinc-900 border border-zinc-850 rounded-xl font-mono text-[10px] text-zinc-400 overflow-x-auto select-all max-h-[140px] leading-relaxed whitespace-pre font-normal text-left">
                {getExportCode()}
              </pre>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
