import React, { createContext, useContext, useState, useCallback } from 'react';
import { BentoBox, GridConfig } from '../types';
import { supabase } from '../lib/supabase';

interface GridContextType {
  boxes: BentoBox[];
  config: GridConfig;
  isPremiumTemplate: boolean;
  isUnlocked: boolean;
  isPreview: boolean;
  currentTemplateId: string | null;
  addBox: () => void;
  removeBox: (id: string) => void;
  updateBox: (id: string, updates: Partial<BentoBox>) => void;
  updateConfig: (updates: Partial<GridConfig>) => void;
  loadTemplate: (template: any) => void;
  unlockTemplate: () => void;
  setIsPreview: (value: boolean) => void;
  moveBox: (id: string, direction: 'up' | 'down') => void;
  reorderBoxes: (startIndex: number, endIndex: number) => void;
}

const GridContext = createContext<GridContextType | undefined>(undefined);

export const GridProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [boxes, setBoxes] = useState<BentoBox[]>([
    { id: '1', x: 0, y: 0, w: 4, h: 2, color: '#3b82f6', title: 'Feature One' },
    { id: '2', x: 4, y: 0, w: 8, h: 2, color: '#10b981', title: 'Feature Two' },
    { id: '3', x: 0, y: 2, w: 12, h: 2, color: '#f59e0b', title: 'Main Banner' },
  ]);

  const [config, setConfig] = useState<GridConfig>({
    gap: 16,
    radius: 12,
    columns: 12,
    autoFlow: 'row',
    autoRows: 100,
    shadowBlur: 20,
    shadowSpread: -5,
    shadowOpacity: 0.3,
    shadowColor: '#000000',
    shadowOffsetX: 0,
    shadowOffsetY: 10,
    glassBlur: 10,
    glassOpacity: 0.1,
    glassBgColor: '#3b82f6',
    gradientStart: '#667eea',
    gradientEnd: '#764ba2',
    gradientAngle: 135,
    gradientType: 'linear',
  });

  const [isPremiumTemplate, setIsPremiumTemplate] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(null);

  const checkPurchaseStatus = useCallback(async (templateId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(`/api/purchases/check?templateId=${templateId}`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      const data = await response.json();
      if (data.purchased) {
        setIsUnlocked(true);
      }
    } catch (error) {
      console.error('Failed to check purchase status:', error);
    }
  }, []);

  const addBox = useCallback(() => {
    const newBox: BentoBox = {
      id: Math.random().toString(36).substr(2, 9),
      x: 0,
      y: boxes.length * 2,
      w: 4,
      h: 2,
      color: '#6366f1',
      title: 'New Box',
    };
    setBoxes(prev => [...prev, newBox]);
  }, [boxes]);

  const removeBox = useCallback((id: string) => {
    setBoxes(prev => prev.filter(box => box.id !== id));
  }, []);

  const updateBox = useCallback((id: string, updates: Partial<BentoBox>) => {
    setBoxes(prev => prev.map(box => box.id === id ? { ...box, ...updates } : box));
  }, []);

  const updateConfig = useCallback((updates: Partial<GridConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const loadTemplate = useCallback((template: any) => {
    setBoxes(template.config_data.boxes);
    setConfig(template.config_data.config);
    setIsPremiumTemplate(template.is_premium);
    setCurrentTemplateId(template.id);
    
    if (template.is_premium) {
      checkPurchaseStatus(template.id);
    } else {
      setIsUnlocked(true);
    }
  }, [checkPurchaseStatus]);

  const moveBox = useCallback((id: string, direction: 'up' | 'down') => {
    setBoxes(prev => {
      const index = prev.findIndex(box => box.id === id);
      if (index === -1) return prev;
      
      const newBoxes = [...prev];
      if (direction === 'up' && index > 0) {
        [newBoxes[index], newBoxes[index - 1]] = [newBoxes[index - 1], newBoxes[index]];
      } else if (direction === 'down' && index < newBoxes.length - 1) {
        [newBoxes[index], newBoxes[index + 1]] = [newBoxes[index + 1], newBoxes[index]];
      }
      return newBoxes;
    });
  }, []);

  const reorderBoxes = useCallback((startIndex: number, endIndex: number) => {
    setBoxes(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, []);

  const unlockTemplate = useCallback(() => {
    setIsUnlocked(true);
  }, []);

  return (
    <GridContext.Provider value={{ 
      boxes, 
      config, 
      isPremiumTemplate, 
      isUnlocked, 
      isPreview,
      currentTemplateId,
      addBox, 
      removeBox, 
      updateBox, 
      updateConfig, 
      loadTemplate,
      unlockTemplate,
      setIsPreview,
      moveBox,
      reorderBoxes
    }}>
      {children}
    </GridContext.Provider>
  );
};

export const useGrid = () => {
  const context = useContext(GridContext);
  if (!context) throw new Error('useGrid must be used within a GridProvider');
  return context;
};
