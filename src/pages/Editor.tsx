import React, { useState } from 'react';
import { BentoEditor } from '../components/editor/BentoEditor';
import { Sidebar } from '../components/editor/Sidebar';
import { MetaTags } from '../components/seo/MetaTags';
import { Menu, X } from 'lucide-react';

export const Editor: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-[#050505] relative">
      <MetaTags 
        title="Bento Grid Editor"
        description="Design and customize your own Bento grid layouts with our intuitive drag-and-drop editor. Export to Tailwind CSS or CSS in seconds."
        keywords="bento editor, grid builder, layout designer, tailwind grid, bento box design"
      />
      
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-[100] w-14 h-14 bg-emerald-500 text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
 
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
 
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-[90] lg:z-0
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
        w-80 h-full bg-[#050505] border-r border-white/10
      `}>
        <Sidebar />
      </div>
 
      <div className="flex-1 h-full overflow-y-auto">
        <BentoEditor />
      </div>
    </div>
  );
};
