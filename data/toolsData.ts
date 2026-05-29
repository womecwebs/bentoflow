import { 
  Sparkles, 
  Image, 
  Grid, 
  Layers, 
  Compass, 
  Feather, 
  Maximize, 
  Cpu, 
  BookOpen, 
  Sliders, 
  Activity, 
  Smartphone,
  Hash,
  Palette,
  Layout,
  Eye
} from 'lucide-react';

export interface DeveloperTool {
  slug: string;
  title: string;
  category: string;
  framework: 'tailwind' | 'css' | 'universal';
  shortDescription: string;
  longDescription: string;
  ctaText: string;
  metaTitle: string;
  metaDesc: string;
  iconName: 'Image' | 'Grid' | 'Layers' | 'Compass' | 'Feather' | 'Maximize' | 'Cpu' | 'Sliders' | 'Smartphone' | 'Palette' | 'Layout';
}

export const TOOLS_CATEGORIES = [
  'All Utilities',
  'HTML & CSS',
  'Grid Layout',
  'Glassmorphism UI',
  'CSS Shadow',
  'CSS Gradient',
  'Bento Tailwind',
  'Shopify Liquid',
  'Bento Portfolio',
  'Bento Grid',
  'iOS Control'
];

export const TOOLS: DeveloperTool[] = [
  {
    slug: 'ai-bento-builder',
    title: 'AI Bento Builder & Website Creator',
    category: 'Bento Grid',
    framework: 'tailwind',
    shortDescription: 'Unleash artificial intelligence prompts to generate premium, fully responsive bento grid websites and dynamic dashboards instantly.',
    longDescription: 'Our revolutionary AI Bento Builder uses simple prompts to orchestrate elegant layout nodes, color schemes, and semantic Tailwind markup. Export production-ready bento systems seamlessly.',
    ctaText: 'Launch AI Bento Builder',
    metaTitle: 'AI Bento Builder & Website Creator | BentoFlow Engine',
    metaDesc: 'Generate stunning bento layout prototypes, portfolios, and rich landing screens with zero manual coding. Turn raw prompts into full-fidelity HTML, Tailwind, and React.',
    iconName: 'Layout'
  },
  {
    slug: 'glassmorphism-bento-card',
    title: 'Glassmorphism Bento Card Creator',
    category: 'Glassmorphism UI',
    framework: 'tailwind',
    shortDescription: 'Develop stunning glassmorphism layouts with adjustable saturation filters, background blurs, and translucent border glow scales.',
    longDescription: 'Create frosted-glass aesthetic cards that look gorgeous on top of vibrant gradient background meshes. Dynamically control backing blur radius, backdrop transparency, and high-contrast ambient text contrast parameters.',
    ctaText: 'Generate Glass Card Code',
    metaTitle: 'Glassmorphism Bento Card Generator | Free Frosted Glass Card Tailwind Maker',
    metaDesc: 'Build premium translucent CSS cards using backdrop-blur and border highlights. Instant Tailwind CSS stylesheet outputs.',
    iconName: 'Layers'
  },
  {
    slug: 'css-shadow-generator',
    title: 'CSS Custom Shadow Layering Tool',
    category: 'CSS Shadow',
    framework: 'css',
    shortDescription: 'Layer multiple fine-tuned ambient drop shadows to craft 3D visual depth and realistic box elevations.',
    longDescription: 'Replicate modern tactile card physics by overlapping 3-5 smooth box-shadow outlines. Fine-tune blur radii, horizontal shifts, and overlay colors to make bento cells float softly off the host page.',
    ctaText: 'Export Box Shadows CSS',
    metaTitle: 'CSS Shadow Generator - Multi-layered Box Shadows for Bento Cards',
    metaDesc: 'Design rich 3D shadows by layering gradients. Achieve editorial-grade card depth easily.',
    iconName: 'Feather'
  },
  {
    slug: 'gradient-mesh-compiler',
    title: 'Bento Gradient Mesh Designer',
    category: 'CSS Gradient',
    framework: 'css',
    shortDescription: 'Generate futuristic dynamic multi-point glowing ambient background meshes in clean CSS codes.',
    longDescription: 'Paint beautiful custom-seeded glass backdrops by placing radiant glowing spheres across precise coordinates. Exports responsive CSS radial radial-gradient backgrounds for your portfolio panels.',
    ctaText: 'Weave Gradient Mesh',
    metaTitle: 'CSS Gradient Mesh Compiler | Free Neon Radial-Gradient Generator',
    metaDesc: 'Generate smooth multi-stop ambient backdrops. Perfect for tech product showcase pages.',
    iconName: 'Palette'
  },
  {
    slug: 'bento-mockup-designer',
    title: 'Bento Mockup & Showcase Designer',
    category: 'Bento Grid',
    framework: 'tailwind',
    shortDescription: 'Create interactive multi-device dashboards, upload mock images, and customize shadows or borders.',
    longDescription: 'Assemble beautiful interactive multi-device mockups and showcase grids on a dynamic bento canvas. Upload custom project images, adjust grid cell row/column alignments, fine-tune background blur, border-radius, and shadow intensities before exporting production-ready markup or custom image composites.',
    ctaText: 'Design Showcase Mockup',
    metaTitle: 'Bento Mockup Designer - Customizable Visual Showcase Builder',
    metaDesc: 'Create high-fidelity interactive bento mockups for SaaS products and developer portfolios. Upload local assets and export components instantly.',
    iconName: 'Layout'
  },
  {
    slug: 'svg-box-customizer',
    title: 'SVG Path & Icon Box Customizer',
    category: 'HTML & CSS',
    framework: 'universal',
    shortDescription: 'Paste raw SVG or choose popular framework icons, then optimize scaling, hover animations, and glow parameters.',
    longDescription: 'A utility to style, wrap, and optimize custom SVG assets or framework icons (Lucide/Radix/Remix) inside rigid grids. Tweak padding ratios, border-radius, active hover scaling animations, border gradients, and background alpha layers with live code updates.',
    ctaText: 'Customize SVG Wrappers',
    metaTitle: 'SVG Path & Icon Box Customizer | Interactive Tailwind SVG Wrapper Maker',
    metaDesc: 'Convert raw SVG code streams into responsive, gorgeous centered grid icons with micro-interactions and glowing borders.',
    iconName: 'Layout'
  },
  {
    slug: 'flex-to-grid-converter',
    title: 'CSS Flexbox to Grid Matrix Converter',
    category: 'Grid Layout',
    framework: 'css',
    shortDescription: 'A parsing workspace that translates raw flexbox containers or lists into rigid, high-performance responsive CSS Grid markup.',
    longDescription: 'Paste your legacy flex-wrapped lists or stacked CSS tags to instantly receive beautifully optimized, responsive CSS Grid definitions. Features side-by-side workspace visuals showing input items mapped to custom column-span structures.',
    ctaText: 'Convert Flex layout to Grid',
    metaTitle: 'CSS Flexbox to Grid Matrix Converter | Online Parsing Utility',
    metaDesc: 'Upgrade unorganized CSS flexbox wrappers into structured multi-span CSS Grid matrix templates instantly.',
    iconName: 'Grid'
  },
  {
    slug: 'color-palette-explorer',
    title: 'Color Palette Grid Explorer',
    category: 'CSS Gradient',
    framework: 'tailwind',
    shortDescription: 'Create harmonious dynamic palettes (Monochromatic, Complementary) and map variables onto asymmetric visual bento layers.',
    longDescription: 'Generate gorgeous, contrast-compliant color themes dynamically. Interactively preview how selected core accent, secondary, border, and background hex combinations look in an active bento dashboard layout before extending your tailwind.config file.',
    ctaText: 'Explore & Export Palette',
    metaTitle: 'Color Palette Grid Explorer | Tailwind Theme Color Mapping Tool',
    metaDesc: 'Build premium contrasting color palettes and test theme mappings on active five-box bento preview components in real-time.',
    iconName: 'Palette'
  },
  {
    slug: 'link-in-bio-preview',
    title: 'Social Media Link-In-Bio Preview Engine',
    category: 'Bento Portfolio',
    framework: 'tailwind',
    shortDescription: 'Assemble beautifully organized responsive profile link cards and simulated feeds inside a modern mobile layout canvas.',
    longDescription: 'A specialized builder to compile sleek modular link-in-bio portals. Drag-and-drop link slots, inject mock feeds, map profile pictures, and adjust border aesthetics on a simulated desktop and mobile aspect ratio preview screen.',
    ctaText: 'Build Modular Bio links',
    metaTitle: 'Bento Link-In-Bio Preview Engine & Layout Maker',
    metaDesc: 'Compile modular link-in-bio layouts containing social networks profiles, profile photo containers, and mini-grids. Instantly export responsive HTML/CSS structures.',
    iconName: 'Smartphone'
  },
  {
    slug: 'border-radius-matcher',
    title: 'Interactive Nested Border Radius Matcher',
    category: 'Bento Tailwind',
    framework: 'tailwind',
    shortDescription: 'Solve nested card rounding distortion dynamically using geometric math ratios to ensure neat container symmetry.',
    longDescription: 'Keep nested elements aligned without ugly rounding gaps. Simply enter parent border-radius and inner padding stats to solve the exact geometric formula (R_inner = R_outer - padding). Features side-by-side custom responsive widgets displaying uniform rounding behaviors in real-time.',
    ctaText: 'Calculate Rounding Match',
    metaTitle: 'Interactive Nested Border Radius Matcher & Calculator | BentoFlow',
    metaDesc: 'Perfect nested border-radius distortion with automated geometric calculations. Export clean Tailwind CSS classes matching standard guidelines.',
    iconName: 'Sliders'
  },
  {
    slug: 'breakpoint-simulator',
    title: 'Responsive Breakpoint Layout Simulator',
    category: 'Bento Grid',
    framework: 'universal',
    shortDescription: 'Project layout structures concurrently across 3 side-by-side devices (Mobile, Tablet, Desktop) to track responsive fluidity.',
    longDescription: 'A multi-viewport simulation console built for frontend engineers. Define column spans or layout dimensions, then visualize how they scale concurrently across mobile, tablet, and desktop viewports side-by-side.',
    ctaText: 'Simulate Grid Breakpoints',
    metaTitle: 'Responsive Breakpoint Layout Simulator | CSS responsive grids previews',
    metaDesc: 'Simulate responsive mobile, tablet, and desktop layout sizes concurrently. Test auto-flow configurations across multi-device viewports.',
    iconName: 'Layers'
  },
  {
    slug: 'glassmorphism-designer',
    title: 'CSS Glassmorphism Container Designer',
    category: 'Glassmorphism UI',
    framework: 'css',
    shortDescription: 'Fine-tune frosted glass layers with backdrop-blur, background gradients, transparency ratios, and subtle outer glares.',
    longDescription: 'Generate state-of-the-art translucent, frosted layers designed for digital cards. Control backing blurs, glow offsets, border alpha transparency, and text contrast. Renders over a toggleable mesh, returning copyable pure CSS grids stylesheet definitions.',
    ctaText: 'Calibrate Frosted Container',
    metaTitle: 'CSS Glassmorphism UI Card Designer & Backdrop-blur Code Maker',
    metaDesc: 'Build high-fidelity glassmorphic digital cells. Control blur levels, ambient gradient glows, and transparent grid colors.',
    iconName: 'Layers'
  },
  {
    slug: 'grid-heights-fixer',
    title: 'Dynamic Grid Row Heights Fixer',
    category: 'Grid Layout',
    framework: 'tailwind',
    shortDescription: 'Specifies layout column heights and margins to balance content assets and prevent multi-span overflows.',
    longDescription: 'Ensure layout content rows remain balanced across different viewport dimensions. Input mock copy sizes, image aspect ratios, or column metrics to compute perfect minmax auto-row bounds and auto-flow dense constraints to secure clean grids margins.',
    ctaText: 'Fix Grid Heights Balance',
    metaTitle: 'Dynamic Grid Row Heights Fixer & Padding Balancer',
    metaDesc: 'Balance layout heights automatically. Analyze aspect ratios, configure minmax bounds, and prevent image or text box overflows.',
    iconName: 'Maximize'
  },
  {
    slug: 'mesh-gradient-mixer',
    title: 'Dark UI Mesh Gradient Background Mixer',
    category: 'CSS Gradient',
    framework: 'css',
    shortDescription: 'Mix up to 4 dynamic color anchor coordinates to compile high-end neon mesh gradient backgrounds for dark interfaces.',
    longDescription: 'Synthesize custom atmospheric glowing gradient backdrops by shifting radial color spheres. Drag and configure vector color lights to obtain copy-pasteable CSS background-image codes optimized for bento layouts.',
    ctaText: 'Mix Neon Mesh Gradient',
    metaTitle: 'CSS Mesh Gradient Mixer | Premium Dark Glow Background Maker',
    metaDesc: 'Mix multiple radial coordinate lights into cohesive, gorgeous background glows designed for landing pages and portfolio screens.',
    iconName: 'Palette'
  }
];
