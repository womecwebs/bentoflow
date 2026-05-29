export interface TemplateGridItem {
  id: string;
  title: string;
  subtitle: string;
  colSpan: number;
  rowSpan: number;
  bgColor: string;
  bgClass: string;
  accentColor: string;
}

export interface Template {
  slug: string;
  title: string;
  description: string;
  category: 'Webpage Layouts' | 'Portfolios' | 'Software Graphics';
  longDescription: string;
  columns: number;
  gridGap: number;
  borderRadius: number;
  magicDense: boolean;
  layoutState: TemplateGridItem[];
  features: string[];
}

export const TEMPLATES: Template[] = [
  {
    slug: 'developer-portfolio',
    title: 'Developer Portfolio Layout',
    description: 'An editorial-grade showcase grid engineered for developers, full-stack engineers, and visual creators.',
    category: 'Portfolios',
    longDescription: 'A modern structural visual CV featuring dedicated case study highlights, stack cards, responsive media integrations, and active online status nodes. Crafted to present technical prowess and custom credentials in single-screen visual density.',
    columns: 12,
    gridGap: 16,
    borderRadius: 16,
    magicDense: false,
    features: [
      'Proportional 12-column visual grid standard',
      'Dynamic spotlight showcase blocks',
      'Dedicated technical tech-stack badge groups',
      'Integrated contact quick-action nodes'
    ],
    layoutState: [
      {
        id: 'p-1',
        title: 'Project Showcase Focus',
        subtitle: 'Dynamic portfolio node showing high-traffic applications, user engagements, and live system architectures.',
        colSpan: 8,
        rowSpan: 2,
        bgColor: '#3b82f6',
        bgClass: 'bg-blue-600',
        accentColor: 'text-blue-200'
      },
      {
        id: 'p-2',
        title: 'Bio & Global Reach',
        subtitle: 'Based in London. Crafting high-performance digital experiences and accessible interfaces.',
        colSpan: 4,
        rowSpan: 2,
        bgColor: '#8b5cf6',
        bgClass: 'bg-purple-600',
        accentColor: 'text-purple-200'
      },
      {
        id: 'p-3',
        title: 'Tech Stack Expertise',
        subtitle: 'React, Next.js, Framer Motion, and Tailwind CSS.',
        colSpan: 4,
        rowSpan: 1,
        bgColor: '#10b981',
        bgClass: 'bg-emerald-600',
        accentColor: 'text-emerald-100'
      },
      {
        id: 'p-4',
        title: 'Let&apos;s Build Together',
        subtitle: 'Available for core full-stack freelance contracts.',
        colSpan: 4,
        rowSpan: 1,
        bgColor: '#ec4899',
        bgClass: 'bg-pink-600',
        accentColor: 'text-pink-200'
      },
      {
        id: 'p-5',
        title: 'Platform Real-Time Status',
        subtitle: 'All API nodes fully operational.',
        colSpan: 4,
        rowSpan: 1,
        bgColor: '#f59e0b',
        bgClass: 'bg-amber-500',
        accentColor: 'text-amber-100'
      }
    ]
  },
  {
    slug: 'saas-landing-grid',
    title: 'SaaS Feature Landing Grid',
    description: 'A conversion-focused structure designed to showcase core parameters, key services, and feature modules.',
    category: 'Webpage Layouts',
    longDescription: 'The ultimate marketing landing module engineered to convert cold visitors into platform signups. Positions a primary value proposition card at the vanguard, supported by technical capability nodes and performance data representation panels.',
    columns: 12,
    gridGap: 20,
    borderRadius: 12,
    magicDense: true,
    features: [
      'Engineered for maximum user-engagement rates',
      'Uses Tailwind gap optimizations',
      'Clean typography layout structures',
      'Perfect structural integration for modern landing roots'
    ],
    layoutState: [
      {
        id: 's-1',
        title: 'Analytics Performance Engine',
        subtitle: 'Process billions of log streams securely. Extract rich database indexes, speed scores, and automated reports in milliseconds.',
        colSpan: 12,
        rowSpan: 2,
        bgColor: '#10b981',
        bgClass: 'bg-emerald-600',
        accentColor: 'text-emerald-100'
      },
      {
        id: 's-2',
        title: 'Live Server Telemetry Logs',
        subtitle: 'Configure real-time trace logging files securely across redundant server nodes.',
        colSpan: 6,
        rowSpan: 2,
        bgColor: '#3b82f6',
        bgClass: 'bg-blue-600',
        accentColor: 'text-blue-200'
      },
      {
        id: 's-3',
        title: 'Serverless Global Scale CDN',
        subtitle: 'Ensure rapid local response times globally using Edge locations in over 180 countries.',
        colSpan: 6,
        rowSpan: 2,
        bgColor: '#8b5cf6',
        bgClass: 'bg-purple-600',
        accentColor: 'text-purple-200'
      }
    ]
  },
  {
    slug: 'app-dashboard-frame',
    title: 'Enterprise Dashboard Telemetry Console',
    description: 'High-density terminal metrics console optimized for administrator dashboard panels and telemetry tracking.',
    category: 'Software Graphics',
    longDescription: 'A technical control system optimized to show data density across multiple tracking blocks simultaneously. Specifically styled with a slate-toned backdrop to represent a professional network analytics panel.',
    columns: 12,
    gridGap: 16,
    borderRadius: 12,
    magicDense: false,
    features: [
      'High density bento composition matrix',
      'Optimal contrast for reading text data logs',
      'Perfect symmetry for administrative screens',
      'Pre-configured dark-mode aesthetic styling'
    ],
    layoutState: [
      {
        id: 'd-1',
        title: 'Active Network Traffic Overview',
        subtitle: 'Monitored packages distribution flowing through persistent proxy routing nodes.',
        colSpan: 8,
        rowSpan: 2,
        bgColor: '#6366f1',
        bgClass: 'bg-indigo-600',
        accentColor: 'text-indigo-200'
      },
      {
        id: 'd-2',
        title: 'Secure System Log File Console',
        subtitle: 'Audit logs compiled under SOC2 guidelines.',
        colSpan: 4,
        rowSpan: 2,
        bgColor: '#27272a',
        bgClass: 'bg-zinc-800',
        accentColor: 'text-zinc-300'
      },
      {
        id: 'd-3',
        title: 'Database Latency Indexes',
        subtitle: 'Average response: 11ms globally.',
        colSpan: 4,
        rowSpan: 2,
        bgColor: '#f59e0b',
        bgClass: 'bg-amber-500',
        accentColor: 'text-amber-100'
      },
      {
        id: 'd-4',
        title: 'Core Server Threads & Performance',
        subtitle: 'Load: 24%. Memory: 4.1GB / 16GB. Temperature metrics within safe limits.',
        colSpan: 8,
        rowSpan: 2,
        bgColor: '#10b981',
        bgClass: 'bg-emerald-600',
        accentColor: 'text-emerald-100'
      }
    ]
  },
  {
    slug: 'graphic-analytics-card',
    title: 'High-Contrast Infographics Grid',
    description: 'A colorful, highly proportional dashboard layouts for stunning visual presentation summaries.',
    category: 'Software Graphics',
    longDescription: 'Specifically compiled to offer content creators and statistical designers a sleek, proportional grid container. Best utilized for dynamic slides, technical report articles, and public infographic publications.',
    columns: 12,
    gridGap: 12,
    borderRadius: 8,
    magicDense: true,
    features: [
      'Dense aesthetic structure optimized for slides',
      'Vivid, complementary color assignments',
      'Compact, readable content sections',
      'Adjustable card margins and custom offsets'
    ],
    layoutState: [
      {
        id: 'g-1',
        title: 'Daily Active Session tracker',
        subtitle: 'Steady rise in monthly retained users reaching peak levels.',
        colSpan: 4,
        rowSpan: 2,
        bgColor: '#ec4899',
        bgClass: 'bg-pink-600',
        accentColor: 'text-pink-250'
      },
      {
        id: 'g-2',
        title: 'User Conversion & Retention Rates',
        subtitle: 'Industry-leading 45.2% retention achieved.',
        colSpan: 4,
        rowSpan: 2,
        bgColor: '#3b82f6',
        bgClass: 'bg-blue-600',
        accentColor: 'text-blue-200'
      },
      {
        id: 'g-3',
        title: 'Marketing Acquisition Funnels',
        subtitle: 'SEO organic traffic represents 70% of inflows.',
        colSpan: 4,
        rowSpan: 2,
        bgColor: '#8b5cf6',
        bgClass: 'bg-purple-600',
        accentColor: 'text-purple-200'
      },
      {
        id: 'g-4',
        title: 'Redundant Server Load Distribution',
        subtitle: 'Fully-balanced container clusters handling incoming network loads with zero latency peaks.',
        colSpan: 12,
        rowSpan: 1,
        bgColor: '#27272a',
        bgClass: 'bg-zinc-800',
        accentColor: 'text-zinc-300'
      }
    ]
  },
  {
    slug: 'link-in-bio-minimal',
    title: 'Minimal Link-in-Bio Canvas',
    description: 'An elegant personal links micro-page optimized for social bios and fast mobile navigation.',
    category: 'Portfolios',
    longDescription: 'An efficient, mobile-responsive layout designed for creators, designers, and influencers to host all key profile connections in a single grid. Ensures lightning-fast load times and crisp readability on all mobile screens.',
    columns: 12,
    gridGap: 12,
    borderRadius: 24,
    magicDense: false,
    features: [
      'Mobile-first layout viewport proportions',
      'Elegant, pill-like rounded styling lines',
      'Clean social media link integrations',
      'Low data-weight asset files'
    ],
    layoutState: [
      {
        id: 'l-1',
        title: 'Creative Director Bio',
        subtitle: 'Crafting premium web styles, design assets, and video content for global brands.',
        colSpan: 12,
        rowSpan: 2,
        bgColor: '#6366f1',
        bgClass: 'bg-indigo-600',
        accentColor: 'text-indigo-200'
      },
      {
        id: 'l-2',
        title: 'Explore Design Case Studies',
        subtitle: 'Browse official YouTube channel.',
        colSpan: 6,
        rowSpan: 1,
        bgColor: '#ec4899',
        bgClass: 'bg-pink-600',
        accentColor: 'text-pink-105'
      },
      {
        id: 'l-3',
        title: 'Official Vector Merch Shop',
        subtitle: 'Get customized posters & icon packs.',
        colSpan: 6,
        rowSpan: 1,
        bgColor: '#f59e0b',
        bgClass: 'bg-amber-500',
        accentColor: 'text-amber-105'
      },
      {
        id: 'l-4',
        title: 'Join Creative Discord Node',
        subtitle: 'Work with developers, designers and authors within a friendly team.',
        colSpan: 12,
        rowSpan: 1,
        bgColor: '#3b82f6',
        bgClass: 'bg-blue-600',
        accentColor: 'text-blue-105'
      }
    ]
  }
];
