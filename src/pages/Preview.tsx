import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Template } from '../data/templates';
import { Loader2, ArrowLeft, LayoutGrid, Zap, ShoppingCart, Smartphone } from 'lucide-react';
import { DownloadButton } from '../components/marketplace/DownloadButton';

export const Preview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('templates')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        const configData = data.config_json || data.config_data || { boxes: [], config: {} };
        const mappedTemplate: Template = {
          id: data.id,
          name: data.name,
          price_usd: data.price || 0,
          is_premium: data.is_premium,
          difficulty: data.difficulty || 'Normal',
          type: data.type || 'grid',
          download_available: data.download_available || false,
          config_data: {
            boxes: configData.boxes || [],
            config: {
              columns: configData.config?.columns || 12,
              gap: configData.config?.gap || 16,
              radius: configData.config?.radius || 12,
              autoFlow: configData.config?.autoFlow || 'row'
            }
          },
          config_json: {
            html: configData.html || configData.html_content,
            html_content: configData.html_content,
            full_code: configData.full_code
          }
        };

        setTemplate(mappedTemplate);
      } catch (error) {
        console.error('Error fetching template:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="text-emerald-500 animate-spin" size={48} />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-white">Template not found</h1>
        <button 
          onClick={() => navigate('/marketplace')}
          className="text-emerald-400 hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Marketplace
        </button>
      </div>
    );
  }

  const htmlContent = template.config_json?.full_code || template.config_json?.html_content || template.config_json?.html;

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-[100]">
      {/* Header */}
      <div className="h-16 bg-zinc-900 border-b border-white/10 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/marketplace')}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white leading-none">{template.name}</h1>
            <p className="text-xs text-white/40 mt-1">Live Preview Mode</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-white/5 rounded-lg p-1 border border-white/10 mr-4">
            <button 
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              title="Desktop View"
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              title="Mobile View"
            >
              <Smartphone size={16} />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-white/40 text-sm mr-4">
            <Zap size={14} className="text-emerald-500" />
            Tailwind CSS Ready
          </div>
          <button
            onClick={() => {
              // Assuming loadTemplate and navigate are handled via context if needed, 
              // but for now just go back to editor with state or similar
              navigate('/editor'); 
            }}
            className="px-5 py-2 bg-white text-black rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-zinc-200 transition-colors"
          >
            <LayoutGrid size={16} />
            Customize
          </button>
          <DownloadButton 
            template={template}
            className="px-5 py-2 bg-emerald-500 text-white rounded-lg font-bold text-sm hover:bg-emerald-600 transition-colors"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-black overflow-hidden flex justify-center p-4 md:p-8">
        <div className={`h-full transition-all duration-500 ease-in-out ${viewMode === 'mobile' ? 'w-[375px] border-x-8 border-y-[16px] border-zinc-800 rounded-[40px] shadow-2xl' : 'w-full'}`}>
          {htmlContent ? (
            <iframe 
            srcDoc={`
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
                  <style>
                    body { margin: 0; padding: 0; background: #000; color: #fff; min-height: 100vh; }
                    ::-webkit-scrollbar { width: 8px; }
                    ::-webkit-scrollbar-track { background: #000; }
                    ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
                    ::-webkit-scrollbar-thumb:hover { background: #444; }
                  </style>
                </head>
                <body>
                  ${htmlContent}
                </body>
              </html>
            `}
            className="w-full h-full border-none"
            title="Live Preview"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 flex-col gap-4">
            <LayoutGrid size={48} />
            <p>No HTML preview available for this template</p>
          </div>
        )}
      </div>
    </div>
  </div>
);
};
