import { BentoBox, GridConfig } from '../types';

export interface Template {
  id: string;
  name: string;
  price_usd: number;
  preview_image?: string;
  difficulty: 'Simple' | 'Normal' | 'Advanced';
  is_premium: boolean;
  type: 'grid' | 'website';
  category?: 'SaaS Dashboards' | 'Modern Portfolios' | 'Waitlist Pages' | 'Minimalist Grids';
  download_available: boolean;
  config_data: {
    boxes: BentoBox[];
    config: GridConfig;
  };
  config_json?: {
    html?: string;
    html_content?: string;
    full_code?: string;
  };
}

const generateDefaultHtml = (template: Omit<Template, 'config_json'>) => {
  const { boxes, config } = template.config_data;
  const gap = config.gap || 16;
  const radius = config.radius || 12;
  
  return `
    <div class="grid grid-cols-12 gap-[${gap}px] p-[${gap}px] h-full bg-zinc-950">
      ${boxes.map(box => `
        <div 
          style="grid-column: span ${box.w}; grid-row: span ${box.h}; background-color: ${box.color}; border-radius: ${radius}px;"
          class="flex flex-col justify-end p-4 border border-white/5 overflow-hidden group"
        >
          <div class="opacity-40 group-hover:opacity-100 transition-opacity">
            <h4 class="text-white font-bold text-xs truncate">${box.title || 'Component'}</h4>
            <div class="w-8 h-0.5 bg-white/20 mt-1"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
};

const TEMPLATES_RAW: Template[] = [
  {
    id: 'minimal-portfolio',
    name: 'Minimalist Portfolio',
    price_usd: 0,
    difficulty: 'Simple',
    is_premium: false,
    type: 'grid',
    category: 'Minimalist Grids',
    download_available: false,
    config_data: {
      config: { gap: 16, radius: 12, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 8, h: 4, color: '#18181b', title: 'Main Project' },
        { id: '2', x: 8, y: 0, w: 4, h: 2, color: '#27272a', title: 'About Me' },
        { id: '3', x: 8, y: 2, w: 4, h: 2, color: '#3f3f46', title: 'Contact' },
      ]
    },
    config_json: {
      html: `
        <div class="grid grid-cols-12 gap-4 p-4 h-full bg-zinc-950">
          <div class="col-span-8 row-span-2 bg-zinc-900 rounded-xl p-6 border border-white/5 flex flex-col justify-end relative overflow-hidden group">
            <img src="https://picsum.photos/seed/portfolio1/800/600" class="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
            <div class="relative z-10">
              <h4 class="text-white font-bold text-xl">Main Project</h4>
              <p class="text-white/40 text-sm">Featured work 2026</p>
            </div>
          </div>
          <div class="col-span-4 bg-zinc-800 rounded-xl p-4 border border-white/5 flex items-center justify-center">
            <h4 class="text-white font-bold">About Me</h4>
          </div>
          <div class="col-span-4 bg-zinc-700 rounded-xl p-4 border border-white/5 flex items-center justify-center">
            <h4 class="text-white font-bold">Contact</h4>
          </div>
        </div>
      `
    }
  },
  {
    id: 'modern-blog-site',
    name: 'Modern Blog Template',
    price_usd: 0,
    difficulty: 'Simple',
    is_premium: false,
    type: 'website',
    category: 'Modern Portfolios',
    download_available: true,
    config_data: {
      config: { gap: 20, radius: 16, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 8, h: 6, color: '#111111', title: 'Featured Article' },
        { id: '2', x: 8, y: 0, w: 4, h: 3, color: '#222222', title: 'Sidebar Top' },
        { id: '3', x: 8, y: 3, w: 4, h: 3, color: '#333333', title: 'Sidebar Bottom' },
      ]
    },
    config_json: {
      html: `
        <div class="grid grid-cols-12 gap-5 p-5 h-full bg-black">
          <div class="col-span-8 bg-zinc-900 rounded-2xl p-8 border border-white/10 flex flex-col justify-between relative overflow-hidden">
             <img src="https://picsum.photos/seed/blog/800/600" class="absolute inset-0 w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" />
             <div class="relative z-10">
              <div class="w-12 h-1 bg-emerald-500 mb-4"></div>
              <h4 class="text-white font-bold text-3xl leading-tight">The Future of Bento Design in 2026</h4>
              <p class="text-white/60 mt-4 max-w-md">Exploring how modular layouts are taking over the web with high-density information grids.</p>
            </div>
            <div class="relative z-10 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-emerald-500"></div>
              <span class="text-white/80 text-sm font-medium">Alex Rivers</span>
            </div>
          </div>
          <div class="col-span-4 space-y-5">
            <div class="bg-zinc-800 rounded-2xl p-6 h-[calc(50%-10px)] border border-white/10 flex flex-col justify-center">
              <h4 class="text-white font-bold text-lg">Trending Topics</h4>
              <div class="mt-2 space-y-2">
                <div class="h-2 w-full bg-white/5 rounded"></div>
                <div class="h-2 w-3/4 bg-white/5 rounded"></div>
              </div>
            </div>
            <div class="bg-zinc-800 rounded-2xl p-6 h-[calc(50%-10px)] border border-white/10 flex flex-col justify-center">
              <h4 class="text-white font-bold text-lg">Newsletter</h4>
              <div class="mt-4 h-10 w-full bg-white/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      `
    }
  },
  {
    id: 'basic-linktree',
    name: 'Basic Link-in-Bio',
    price_usd: 0,
    difficulty: 'Simple',
    is_premium: false,
    type: 'grid',
    download_available: false,
    config_data: {
      config: { gap: 8, radius: 8, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 12, h: 2, color: '#111', title: 'Link 1' },
        { id: '2', x: 0, y: 2, w: 12, h: 2, color: '#111', title: 'Link 2' },
        { id: '3', x: 0, y: 4, w: 12, h: 2, color: '#111', title: 'Link 3' },
      ]
    },
    config_json: {
      html: `
        <div class="flex flex-col gap-3 p-6 h-full bg-zinc-950 items-center justify-center">
          <div class="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500 mb-6 shadow-xl shadow-emerald-500/20"></div>
          <div class="w-full max-w-xs space-y-3">
            <div class="bg-zinc-900 p-4 rounded-2xl text-white text-center border border-white/5 hover:bg-zinc-800 transition-colors cursor-pointer font-medium">Portfolio Website</div>
            <div class="bg-zinc-900 p-4 rounded-2xl text-white text-center border border-white/5 hover:bg-zinc-800 transition-colors cursor-pointer font-medium">Latest Case Study</div>
            <div class="bg-zinc-900 p-4 rounded-2xl text-white text-center border border-white/5 hover:bg-zinc-800 transition-colors cursor-pointer font-medium">Contact Me</div>
          </div>
        </div>
      `
    }
  },
  {
    id: 'simple-landing',
    name: 'Simple Landing Page',
    price_usd: 0,
    difficulty: 'Simple',
    is_premium: false,
    type: 'website',
    category: 'Waitlist Pages',
    download_available: true,
    config_data: {
      config: { gap: 24, radius: 24, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 12, h: 4, color: '#000', title: 'Hero' },
        { id: '2', x: 0, y: 4, w: 6, h: 4, color: '#111', title: 'Feature 1' },
        { id: '3', x: 6, y: 4, w: 6, h: 4, color: '#111', title: 'Feature 2' },
      ]
    },
    config_json: {
      html: `
        <div class="grid grid-cols-2 gap-6 p-8 h-full bg-zinc-950">
          <div class="col-span-2 bg-gradient-to-br from-zinc-800 to-zinc-900 text-white p-10 rounded-[40px] flex flex-col justify-center border border-white/5">
            <h4 class="text-4xl font-black tracking-tighter mb-2">BentoFlow Pro</h4>
            <p class="text-white/40">The ultimate grid builder for modern designers.</p>
          </div>
          <div class="bg-zinc-900 p-8 rounded-[40px] border border-white/5 flex flex-col justify-between">
            <div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h5 class="text-white font-bold mt-4">Secure by Default</h5>
          </div>
          <div class="bg-zinc-900 p-8 rounded-[40px] border border-white/5 flex flex-col justify-between">
            <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-10h-9l1-8z"/></svg>
            </div>
            <h5 class="text-white font-bold mt-4">Lightning Fast</h5>
          </div>
        </div>
      `
    }
  },
  {
    id: 'clean-dashboard',
    name: 'Clean Dashboard',
    price_usd: 0,
    difficulty: 'Normal',
    is_premium: false,
    type: 'grid',
    download_available: false,
    config_data: {
      config: { gap: 12, radius: 12, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 3, h: 6, color: '#111', title: 'Sidebar' },
        { id: '2', x: 3, y: 0, w: 9, h: 2, color: '#111', title: 'Top Bar' },
        { id: '3', x: 3, y: 2, w: 9, h: 4, color: '#111', title: 'Main Content' },
      ]
    }
  },
  {
    id: 'photo-gallery',
    name: 'Photo Gallery Grid',
    price_usd: 0,
    difficulty: 'Simple',
    is_premium: false,
    type: 'grid',
    download_available: false,
    config_data: {
      config: { gap: 4, radius: 4, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 4, h: 4, color: '#111', title: 'Photo 1' },
        { id: '2', x: 4, y: 0, w: 4, h: 4, color: '#111', title: 'Photo 2' },
        { id: '3', x: 8, y: 0, w: 4, h: 4, color: '#111', title: 'Photo 3' },
        { id: '4', x: 0, y: 4, w: 6, h: 4, color: '#111', title: 'Photo 4' },
        { id: '5', x: 6, y: 4, w: 6, h: 4, color: '#111', title: 'Photo 5' },
      ]
    }
  },
  {
    id: 'resume-bento',
    name: 'Bento Resume',
    price_usd: 0,
    difficulty: 'Normal',
    is_premium: false,
    type: 'grid',
    download_available: false,
    config_data: {
      config: { gap: 16, radius: 20, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 4, h: 4, color: '#111', title: 'Profile' },
        { id: '2', x: 4, y: 0, w: 8, h: 4, color: '#111', title: 'Experience' },
        { id: '3', x: 0, y: 4, w: 6, h: 3, color: '#111', title: 'Skills' },
        { id: '4', x: 6, y: 4, w: 6, h: 3, color: '#111', title: 'Education' },
      ]
    }
  },
  {
    id: 'dark-mode-landing',
    name: 'Dark Mode Landing',
    price_usd: 0,
    difficulty: 'Normal',
    is_premium: false,
    type: 'website',
    download_available: true,
    config_data: {
      config: { gap: 32, radius: 32, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 12, h: 6, color: '#000', title: 'Hero Section' },
        { id: '2', x: 0, y: 6, w: 4, h: 4, color: '#111', title: 'Feature A' },
        { id: '3', x: 4, y: 6, w: 4, h: 4, color: '#111', title: 'Feature B' },
        { id: '4', x: 8, y: 6, w: 4, h: 4, color: '#111', title: 'Feature C' },
      ]
    }
  },
  {
    id: 'mobile-app-showcase',
    name: 'Mobile App Showcase',
    price_usd: 0,
    difficulty: 'Normal',
    is_premium: false,
    type: 'grid',
    download_available: false,
    config_data: {
      config: { gap: 16, radius: 40, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 6, h: 10, color: '#111', title: 'App Screenshot' },
        { id: '2', x: 6, y: 0, w: 6, h: 5, color: '#111', title: 'Feature 1' },
        { id: '3', x: 6, y: 5, w: 6, h: 5, color: '#111', title: 'Feature 2' },
      ]
    }
  },
  {
    id: 'newsletter-signup',
    name: 'Newsletter Signup',
    price_usd: 0,
    difficulty: 'Simple',
    is_premium: false,
    type: 'grid',
    download_available: false,
    config_data: {
      config: { gap: 12, radius: 12, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 12, h: 4, color: '#111', title: 'Join our Newsletter' },
        { id: '2', x: 0, y: 4, w: 8, h: 2, color: '#222', title: 'Email Input' },
        { id: '3', x: 8, y: 4, w: 4, h: 2, color: '#00ff88', title: 'Subscribe' },
      ]
    }
  },
  {
    id: 'ios-control-center',
    name: 'iOS Control Center',
    price_usd: 12,
    difficulty: 'Normal',
    is_premium: true,
    type: 'grid',
    download_available: false,
    config_data: {
      config: { gap: 12, radius: 28, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 6, h: 4, color: '#1d1d1f', title: 'Connectivity' },
        { id: '2', x: 6, y: 0, w: 6, h: 4, color: '#1d1d1f', title: 'Music' },
        { id: '3', x: 0, y: 4, w: 3, h: 2, color: '#1d1d1f', title: 'Brightness' },
        { id: '4', x: 3, y: 4, w: 3, h: 2, color: '#1d1d1f', title: 'Volume' },
      ]
    }
  },
  {
    id: 'ecommerce-grid',
    name: 'E-commerce Showcase',
    price_usd: 15,
    difficulty: 'Normal',
    is_premium: true,
    type: 'grid',
    download_available: false,
    config_data: {
      config: { gap: 16, radius: 16, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 4, h: 6, color: '#111827', title: 'Featured Product' },
        { id: '2', x: 4, y: 0, w: 8, h: 3, color: '#1f2937', title: 'New Arrivals' },
        { id: '3', x: 4, y: 3, w: 4, h: 3, color: '#374151', title: 'Sale' },
        { id: '4', x: 8, y: 3, w: 4, h: 3, color: '#4b5563', title: 'Categories' },
      ]
    }
  },
  {
    id: 'apple-2026-event',
    name: 'The Apple 2026 Event',
    price_usd: 12,
    difficulty: 'Advanced',
    is_premium: true,
    type: 'grid',
    download_available: false,
    config_data: {
      config: { gap: 12, radius: 32, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 12, h: 6, color: 'rgba(255,255,255,0.05)', title: 'Hero Product' },
        { id: '2', x: 0, y: 6, w: 6, h: 4, color: 'rgba(255,255,255,0.03)', title: 'Feature A' },
        { id: '3', x: 6, y: 6, w: 6, h: 4, color: 'rgba(255,255,255,0.03)', title: 'Feature B' },
      ]
    }
  },
  {
    id: 'fintech-pro-dashboard',
    name: 'Fintech Pro Dashboard',
    price_usd: 15,
    difficulty: 'Advanced',
    is_premium: true,
    type: 'grid',
    download_available: false,
    config_data: {
      config: { gap: 10, radius: 16, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 3, h: 2, color: '#00ff88', title: 'Balance' },
        { id: '2', x: 3, y: 0, w: 9, h: 2, color: '#111', title: 'Market Trend' },
        { id: '3', x: 0, y: 2, w: 8, h: 6, color: '#111', title: 'Transactions' },
        { id: '4', x: 8, y: 2, w: 4, h: 6, color: '#111', title: 'Cards' },
      ]
    }
  },
  {
    id: 'minimalist-architect',
    name: 'Minimalist Architect Portfolio',
    price_usd: 9,
    difficulty: 'Simple',
    is_premium: true,
    type: 'grid',
    download_available: false,
    config_data: {
      config: { gap: 40, radius: 0, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 12, h: 8, color: '#fff', title: 'Project Alpha' },
        { id: '2', x: 0, y: 8, w: 6, h: 6, color: '#fafafa', title: 'Project Beta' },
        { id: '3', x: 6, y: 8, w: 6, h: 6, color: '#fafafa', title: 'Project Gamma' },
      ]
    }
  },
  {
    id: 'ai-saas-landing',
    name: 'AI SaaS Landing Page',
    price_usd: 14,
    difficulty: 'Normal',
    is_premium: true,
    type: 'website',
    download_available: true,
    config_data: {
      config: { gap: 20, radius: 24, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 12, h: 4, color: '#000', title: 'AI Hero' },
        { id: '2', x: 4, y: 4, w: 4, h: 4, color: '#7c3aed', title: 'AI Prompt Box' },
        { id: '3', x: 0, y: 4, w: 4, h: 4, color: '#111', title: 'Feature 1' },
        { id: '4', x: 8, y: 4, w: 4, h: 4, color: '#111', title: 'Feature 2' },
      ]
    }
  },
  {
    id: 'creator-link-bio',
    name: 'Creator Link-in-Bio',
    price_usd: 5,
    difficulty: 'Simple',
    is_premium: true,
    type: 'grid',
    download_available: false,
    config_data: {
      config: { gap: 12, radius: 99, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 12, h: 2, color: '#ff0050', title: 'TikTok' },
        { id: '2', x: 0, y: 2, w: 12, h: 2, color: '#e1306c', title: 'Instagram' },
        { id: '3', x: 0, y: 4, w: 12, h: 2, color: '#1da1f2', title: 'Twitter' },
      ]
    }
  },
  {
    id: 'premium-agency-site',
    name: 'Premium Agency Site',
    price_usd: 15,
    difficulty: 'Advanced',
    is_premium: true,
    type: 'website',
    download_available: true,
    config_data: {
      config: { gap: 24, radius: 32, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 12, h: 4, color: '#0f172a', title: 'Hero Section' },
        { id: '2', x: 0, y: 4, w: 4, h: 4, color: '#1e293b', title: 'Service 1' },
        { id: '3', x: 4, y: 4, w: 4, h: 4, color: '#1e293b', title: 'Service 2' },
        { id: '4', x: 8, y: 4, w: 4, h: 4, color: '#1e293b', title: 'Service 3' },
      ]
    }
  },
  {
    id: 'saas-dashboard-pro',
    name: 'SaaS Dashboard Pro',
    price_usd: 12,
    difficulty: 'Advanced',
    is_premium: true,
    type: 'grid',
    category: 'SaaS Dashboards',
    download_available: false,
    config_data: {
      config: { gap: 20, radius: 24, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 12, h: 2, color: '#09090b', title: 'Header Stats' },
        { id: '2', x: 0, y: 2, w: 8, h: 6, color: '#18181b', title: 'Main Chart' },
        { id: '3', x: 8, y: 2, w: 4, h: 3, color: '#27272a', title: 'Activity' },
        { id: '4', x: 8, y: 5, w: 4, h: 3, color: '#3f3f46', title: 'Users' },
      ]
    }
  },
  {
    id: 'startup-landing-page',
    name: 'Startup Landing Page',
    price_usd: 15,
    difficulty: 'Advanced',
    is_premium: true,
    type: 'website',
    download_available: true,
    config_data: {
      config: { gap: 24, radius: 40, columns: 12 },
      boxes: [
        { id: '1', x: 0, y: 0, w: 6, h: 8, color: '#020617', title: 'Product Visual' },
        { id: '2', x: 6, y: 0, w: 6, h: 4, color: '#0f172a', title: 'Features' },
        { id: '3', x: 6, y: 4, w: 6, h: 4, color: '#1e293b', title: 'Pricing' },
      ]
    }
  }
];

export const TEMPLATES_DATABASE: Template[] = TEMPLATES_RAW.map(t => ({
  ...t,
  config_json: t.config_json || { html: generateDefaultHtml(t) }
}));
