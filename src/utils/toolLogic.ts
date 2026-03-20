import { BentoBox, GridConfig } from '../types';

export const generateToolCode = (slug: string, boxes: BentoBox[], config: GridConfig, format: 'tailwind' | 'css' | 'react' | 'bootstrap' | 'special' = 'special') => {
  // Special Tool-specific logic (takes precedence for some tools)
  if (format === 'special' || slug === 'glassmorphism-ui-generator' || slug === 'grid-layout-generator' || slug === 'html-css-grid-generator' || slug === 'css-shadow-generator' || slug === 'css-gradient-generator') {
    switch (slug) {
      case 'grid-layout-generator':
        return `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(${config.columns}, 1fr);\n  grid-template-rows: repeat(${Math.ceil(boxes.length / config.columns) * 2}, 100px);\n  gap: ${config.gap}px;\n}`;

      case 'glassmorphism-ui-generator':
        if (format === 'tailwind') {
          return `bg-white/[${config.glassOpacity}] backdrop-blur-[${config.glassBlur}px] border border-white/20 rounded-[${config.radius}px] shadow-xl`;
        }
        return `.glass-card {\n  backdrop-filter: blur(${config.glassBlur}px);\n  background: rgba(255, 255, 255, ${config.glassOpacity});\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: ${config.radius}px;\n  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);\n}`;

      case 'html-css-grid-generator':
        return `<!-- HTML -->\n<div class="grid-container">\n  ${boxes.map((b, i) => `<div class="grid-item item-${i}">${b.title}</div>`).join('\n  ')}\n</div>\n\n/* CSS */\n.grid-container {\n  display: grid;\n  grid-template-columns: repeat(${config.columns}, 1fr);\n  gap: ${config.gap}px;\n}\n.grid-item {\n  background: #eee;\n  padding: 20px;\n  border-radius: ${config.radius}px;\n}`;

      case 'css-shadow-generator':
        return `.shadow-box {\n  box-shadow: ${config.shadowOffsetX}px ${config.shadowOffsetY}px ${config.shadowBlur}px ${config.shadowSpread}px ${config.shadowColor}${Math.round((config.shadowOpacity || 0.3) * 255).toString(16).padStart(2, '0')};\n  border-radius: ${config.radius}px;\n  background: white;\n}`;

      case 'css-gradient-generator':
        const gradient = config.gradientType === 'linear' 
          ? `linear-gradient(${config.gradientAngle}deg, ${config.gradientStart} 0%, ${config.gradientEnd} 100%)`
          : `radial-gradient(circle, ${config.gradientStart} 0%, ${config.gradientEnd} 100%)`;
        return `.gradient-bg {\n  background: ${gradient};\n  border-radius: ${config.radius}px;\n}`;
      
      case 'bento-tailwind-generator':
        return `grid grid-cols-${config.columns} gap-${config.gap / 4}`;
      
      case 'shopify-bento-liquid':
        return `{% schema %}\n{\n  "name": "Bento Grid",\n  "settings": [\n    { "type": "range", "id": "gap", "label": "Gap", "default": ${config.gap} },\n    { "type": "range", "id": "columns", "label": "Columns", "min": 1, "max": 12, "default": ${config.columns} }\n  ],\n  "blocks": [\n    { "type": "bento_item", "name": "Bento Item", "settings": [...] }\n  ]\n}\n{% endschema %}\n\n<div class="shopify-bento-grid" style="display: grid; grid-template-columns: repeat({{ section.settings.columns }}, 1fr); gap: {{ section.settings.gap }}px;">\n  {% for block in section.blocks %}\n    <div class="bento-item" style="grid-column: span {{ block.settings.width }}; grid-row: span {{ block.settings.height }};">\n      {{ block.settings.content }}\n    </div>\n  {% endfor %}\n</div>`;

      case 'bento-portfolio-wireframer':
        return `<div class="portfolio-grid" style="display: grid; grid-template-columns: repeat(${config.columns}, 1fr); gap: ${config.gap}px;">\n  ${boxes.map(b => `<div class="portfolio-item" style="grid-column: span ${b.w}; grid-row: span ${b.h}; background: #eee; border-radius: ${config.radius}px;">\n    <img src="placeholder.jpg" alt="${b.title}" style="width: 100%; height: 100%; object-fit: cover;" />\n  </div>`).join('\n  ')}\n</div>`;

      case 'react-bento-component-factory':
        return `import React from 'react';\nimport { LayoutGrid, Star, Heart, Zap } from 'lucide-react';\n\ntype BentoItem = {\n  id: string;\n  w: number;\n  h: number;\n  title: string;\n  color: string;\n};\n\nexport const BentoComponent: React.FC = () => {\n  const items: BentoItem[] = ${JSON.stringify(boxes, null, 2)};\n\n  return (\n    <div className="grid grid-cols-${config.columns} gap-${config.gap / 4} p-4 bg-black">\n      {items.map((item) => (\n        <div \n          key={item.id} \n          className={\`col-span-\${item.w} row-span-\${item.h} p-6 rounded-[\${${config.radius}}px] flex flex-col justify-between\`}\n          style={{ backgroundColor: item.color }}\n        >\n          <LayoutGrid size={24} className="text-white/20" />\n          <h3 className="text-white font-bold text-xl">{item.title}</h3>\n        </div>\n      ))}\n    </div>\n  );\n};`;

      case 'bento-grid-a11y-checker':
        return `<!-- Accessibility Reading Order Map -->\n<div role="grid" aria-label="Bento Layout">\n  ${boxes.map((b, i) => `<div role="gridcell" aria-colspan="${b.w}" aria-rowspan="${b.h}" tabindex="0">\n    <!-- Reading Order: ${i + 1} -->\n    <h3>${b.title}</h3>\n  </div>`).join('\n  ')}\n</div>`;

      case 'ios-control-center-bento-style':
        return `.ios-container {\n  display: grid;\n  grid-template-columns: repeat(${config.columns}, 1fr);\n  gap: ${config.gap}px;\n}\n\n.ios-card {\n  backdrop-filter: blur(20px);\n  background: rgba(255, 255, 255, 0.1);\n  border-radius: ${config.radius}px;\n  -webkit-mask-image: -webkit-radial-gradient(white, black);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n}`;

      case 'bento-dashboard-ui-kit':
        return `import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';\n\n<div className="grid grid-cols-12 gap-6">\n  ${boxes.map(b => `<div className="col-span-${b.w} row-span-${b.h} bg-zinc-900 p-6 rounded-3xl">\n    <h4 className="text-white/40 text-xs font-bold uppercase mb-4">${b.title}</h4>\n    <div className="h-40 bg-white/5 rounded-xl flex items-center justify-center">\n      {/* Chart Placeholder */}\n      <span className="text-white/20 text-xs">Recharts Component</span>\n    </div>\n  </div>`).join('\n  ')}\n</div>`;

      case 'bento-print-layout-calculator':
        return `@media print {\n  :root {\n    --print-cols: ${config.columns};\n    --print-gap: ${config.gap / 4}mm;\n  }\n  .bento-print-container {\n    width: 210mm;\n    display: grid;\n    grid-template-columns: repeat(var(--print-cols), 1fr);\n    gap: var(--print-gap);\n  }\n  .bento-print-item {\n    border: 0.5pt solid #000;\n    padding: 5mm;\n    page-break-inside: avoid;\n  }\n}`;

      case 'bento-grid-css-variable-lab':
        return `:root {\n  --bento-gap: ${config.gap}px;\n  --bento-radius: ${config.radius}px;\n  --bento-columns: ${config.columns};\n  --bento-bg: #050505;\n}\n\n.bento-grid {\n  display: grid;\n  grid-template-columns: repeat(var(--bento-columns), 1fr);\n  gap: var(--bento-gap);\n}\n\n.bento-item {\n  border-radius: var(--bento-radius);\n}`;

      case 'magic-bento-auto-layout':
        return `.magic-grid {\n  display: grid;\n  grid-template-columns: repeat(${config.columns}, 1fr);\n  grid-auto-flow: dense;\n  grid-auto-rows: 100px;\n  gap: ${config.gap}px;\n}\n\n.magic-item {\n  /* Items will automatically fill gaps */\n  grid-column: span var(--w);\n  grid-row: span var(--h);\n}`;
    }
  }

  if (format === 'tailwind') {
    return `<div className="grid grid-cols-${config.columns} gap-[${config.gap}px]">\n  ${boxes.map(b => `<div className="col-span-${b.w} row-span-${b.h} rounded-[${config.radius}px]" style={{ backgroundColor: '${b.color}' }}>${b.title}</div>`).join('\n  ')}\n</div>`;
  }

  if (format === 'css') {
    return `.bento-grid {\n  display: grid;\n  grid-template-columns: repeat(${config.columns}, 1fr);\n  gap: ${config.gap}px;\n}\n\n${boxes.map((b, i) => `.item-${i} {\n  grid-column: span ${b.w};\n  grid-row: span ${b.h};\n  background-color: ${b.color};\n  border-radius: ${config.radius}px;\n}`).join('\n\n')}`;
  }

  if (format === 'bootstrap') {
    return `<div class="container">\n  <div class="row g-${Math.min(5, Math.floor(config.gap / 8))}">\n    ${boxes.map(b => `<div class="col-${Math.min(12, Math.floor(12 / config.columns * b.w))} mb-4">\n      <div class="p-3 border rounded" style="background-color: ${b.color}; border-radius: ${config.radius}px !important;">${b.title}</div>\n    </div>`).join('\n    ')}\n  </div>\n</div>`;
  }

  if (format === 'react') {
    return `import React from 'react';\n\nexport const BentoGrid = () => {\n  return (\n    <div style={{ \n      display: 'grid', \n      gridTemplateColumns: 'repeat(${config.columns}, 1fr)', \n      gap: '${config.gap}px' \n    }}>\n      ${boxes.map(b => `<div style={{ \n        gridColumn: 'span ${b.w}', \n        gridRow: 'span ${b.h}', \n        backgroundColor: '${b.color}', \n        borderRadius: '${config.radius}px', \n        padding: '20px' \n      }}>\n        ${b.title}\n      </div>`).join('\n      ')}\n    </div>\n  );\n};`;
  }

  return `// Default Bento Output\n<div className="grid grid-cols-${config.columns} gap-${config.gap / 4}">\n  ${boxes.map(b => `<div className="col-span-${b.w} row-span-${b.h}">${b.title}</div>`).join('\n  ')}\n</div>`;
};
