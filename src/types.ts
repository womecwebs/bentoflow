export interface BentoBox {
  id: string;
  x: number; // 0-11
  y: number;
  w: number; // 1-12
  h: number;
  color: string;
  content?: string;
  title?: string;
}

export interface GridConfig {
  gap: number;
  radius: number;
  columns: number;
  autoFlow?: 'dense' | 'row';
  autoRows?: number;
  // New properties for generators
  shadowBlur?: number;
  shadowSpread?: number;
  shadowOpacity?: number;
  shadowColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  glassBlur?: number;
  glassOpacity?: number;
  glassBgColor?: string;
  gradientStart?: string;
  gradientEnd?: string;
  gradientAngle?: number;
  gradientType?: 'linear' | 'radial';
}

export type ExportFormat = 'tailwind' | 'css' | 'bootstrap';
