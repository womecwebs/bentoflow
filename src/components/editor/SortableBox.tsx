import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'motion/react';
import { Trash2, GripVertical, ArrowUp, ArrowDown, GripHorizontal } from 'lucide-react';
import { BentoBox, GridConfig } from '../../types';

interface SortableBoxProps {
  box: BentoBox;
  index: number;
  config: GridConfig;
  isPreview: boolean;
  toolSlug?: string;
  removeBox: (id: string) => void;
  updateBox: (id: string, data: Partial<BentoBox>) => void;
  moveBox: (id: string, direction: 'up' | 'down') => void;
  handleResizeStart: (e: React.MouseEvent, box: BentoBox) => void;
  boxesCount: number;
}

export const SortableBox: React.FC<SortableBoxProps> = ({ 
  box, 
  index, 
  config, 
  isPreview, 
  toolSlug, 
  removeBox, 
  updateBox, 
  moveBox,
  handleResizeStart,
  boxesCount
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: box.id });

  const getDynamicStyle = () => {
    switch (toolSlug) {
      case 'css-shadow-generator':
        return {
          boxShadow: `0 ${(config.shadowBlur || 20) / 2}px ${config.shadowBlur || 20}px ${config.shadowSpread || -5}px rgba(0, 0, 0, ${config.shadowOpacity || 0.3})`,
          backgroundColor: '#ffffff',
        };
      case 'glassmorphism-ui-generator':
        return {
          backdropFilter: `blur(${config.glassBlur || 10}px)`,
          backgroundColor: `rgba(255, 255, 255, ${config.glassOpacity || 0.1})`,
          border: '1px solid rgba(255, 255, 255, 0.2)',
        };
      case 'css-gradient-generator':
        const gradient = config.gradientType === 'linear' 
          ? `linear-gradient(${config.gradientAngle || 135}deg, ${config.gradientStart || '#667eea'} 0%, ${config.gradientEnd || '#764ba2'} 100%)`
          : `radial-gradient(circle, ${config.gradientStart || '#667eea'} 0%, ${config.gradientEnd || '#764ba2'} 100%)`;
        return {
          background: gradient,
        };
      default:
        return {
          backgroundColor: box.color,
        };
    }
  };

  const dynamicStyle = getDynamicStyle();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    gridColumn: `span ${box.w}`,
    gridRow: `span ${box.h}`,
    borderRadius: `${config.radius}px`,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.5 : 1,
    ...dynamicStyle,
    color: toolSlug === 'css-shadow-generator' ? '#000000' : '#ffffff',
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      className={`group relative flex flex-col p-4 overflow-hidden ${isDragging ? 'shadow-2xl ring-2 ring-emerald-500' : ''}`}
    >
      {/* Drag Handle */}
      {!isPreview && (
        <div 
          {...attributes} 
          {...listeners}
          className="absolute top-2 left-2 p-1.5 bg-black/20 hover:bg-black/40 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-30"
          title="Drag to reorder"
        >
          <GripHorizontal size={12} />
        </div>
      )}

      {/* A11y Number */}
      {toolSlug === 'bento-grid-a11y-checker' && (
        <div className="absolute top-2 left-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg border border-white/20 z-20">
          {index + 1}
        </div>
      )}

      {/* Controls */}
      {!isPreview && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button 
            onClick={() => moveBox(box.id, 'up')}
            disabled={index === 0}
            className="p-1.5 bg-black/20 hover:bg-black/40 rounded-lg text-white transition-colors disabled:opacity-20"
            title="Move Up"
          >
            <ArrowUp size={12} />
          </button>
          <button 
            onClick={() => moveBox(box.id, 'down')}
            disabled={index === boxesCount - 1}
            className="p-1.5 bg-black/20 hover:bg-black/40 rounded-lg text-white transition-colors disabled:opacity-20"
            title="Move Down"
          >
            <ArrowDown size={12} />
          </button>
          <button 
            onClick={() => removeBox(box.id)}
            className="p-1.5 bg-black/20 hover:bg-black/40 rounded-lg text-white transition-colors"
            title="Delete"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}

      <div className="mt-auto">
        {isPreview ? (
          <span className="text-white font-bold text-sm">{box.title}</span>
        ) : (
          <input 
            value={box.title}
            onChange={(e) => updateBox(box.id, { title: e.target.value })}
            className="bg-transparent text-white font-bold text-sm focus:outline-none w-full"
          />
        )}
      </div>

      {/* Resize Handle */}
      {!isPreview && (
        <div 
          onMouseDown={(e) => handleResizeStart(e, box)}
          className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize flex items-center justify-center text-white/20 hover:text-white/60 transition-colors z-10"
        >
          <GripVertical size={12} className="rotate-45" />
        </div>
      )}
    </motion.div>
  );
};
